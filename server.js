const express = require('express');
const cors = require('cors');
const path = require('path');
const { Redis } = require('@upstash/redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Redis client and key
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const LEADERBOARD_KEY = 'reaction_leaderboard_v1';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Helper: read leaderboard (top 10) from Redis sorted set (ascending by time)
async function readLeaderboard() {
  // ZRANGE with WITHSCORES to get lowest (fastest) first
  const entries = await redis.zrange(LEADERBOARD_KEY, 0, 9, { withScores: true });
  // entries is an array like: [ { member: '...json...', score: 123 }, ... ]
  return entries.map((e) => {
    try {
      const obj = JSON.parse(e.member);
      return { name: obj.name, time: e.score, date: obj.date };
    } catch {
      return { name: String(e.member), time: e.score, date: new Date().toISOString() };
    }
  });
}

// GET /api/leaderboard - Get current leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await readLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

// POST /api/leaderboard - Add new score
app.post('/api/leaderboard', async (req, res) => {
  const { name, time } = req.body;
  
  if (!name || !time || typeof time !== 'number') {
    return res.status(400).json({ error: 'Name and time are required' });
  }

  const trimmedName = String(name).trim();
  const nowIso = new Date().toISOString();

  // Use time as score; member holds JSON with name and date
  await redis.zadd(LEADERBOARD_KEY, {
    score: time,
    member: JSON.stringify({ name: trimmedName, date: nowIso }),
  });

  // Trim to top 10 (keep 0..9)
  const total = await redis.zcard(LEADERBOARD_KEY);
  if (total > 10) {
    // Remove all beyond rank 9
    await redis.zremrangebyrank(LEADERBOARD_KEY, 10, -1);
  }

  const leaderboard = await readLeaderboard();
  res.json({ success: true, leaderboard });
});

// GET /api/check-record - Check if a time qualifies for leaderboard
app.get('/api/check-record', async (req, res) => {
  const { time } = req.query;
  
  if (!time || isNaN(time)) {
    return res.status(400).json({ error: 'Valid time is required' });
  }

  const timeNum = parseInt(time, 10);

  const count = await redis.zcard(LEADERBOARD_KEY);
  if (count < 10) {
    return res.json({ qualifies: true });
  }

  // Get worst (slowest) among current top (highest score)
  const worst = await redis.zrange(LEADERBOARD_KEY, -1, -1, { withScores: true });
  const worstScore = worst && worst[0] ? worst[0].score : Infinity;
  const qualifies = timeNum < worstScore;

  res.json({ qualifies });
});

// Serve the main game page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'reaction.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Leaderboard API available at http://localhost:${PORT}/api/leaderboard`);
});
