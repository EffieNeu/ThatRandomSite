const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for leaderboard (resets on server restart)
// For production, you might want to use a database like MongoDB or PostgreSQL
let leaderboard = [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Helper function to read leaderboard
function readLeaderboard() {
  return leaderboard;
}

// Helper function to write leaderboard
function writeLeaderboard(newLeaderboard) {
  leaderboard = newLeaderboard;
  return true;
}

// GET /api/leaderboard - Get current leaderboard
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = readLeaderboard();
  res.json(leaderboard);
});

// POST /api/leaderboard - Add new score
app.post('/api/leaderboard', (req, res) => {
  const { name, time } = req.body;
  
  if (!name || !time || typeof time !== 'number') {
    return res.status(400).json({ error: 'Name and time are required' });
  }
  
  const leaderboard = readLeaderboard();
  
  // Add new score
  const newScore = {
    name: name.trim(),
    time: time,
    date: new Date().toISOString()
  };
  
  leaderboard.push(newScore);
  
  // Sort by time (ascending - lower is better)
  leaderboard.sort((a, b) => a.time - b.time);
  
  // Keep only top 10
  const top10 = leaderboard.slice(0, 10);
  
  if (writeLeaderboard(top10)) {
    res.json({ success: true, leaderboard: top10 });
  } else {
    res.status(500).json({ error: 'Failed to save leaderboard' });
  }
});

// GET /api/check-record - Check if a time qualifies for leaderboard
app.get('/api/check-record', (req, res) => {
  const { time } = req.query;
  
  if (!time || isNaN(time)) {
    return res.status(400).json({ error: 'Valid time is required' });
  }
  
  const leaderboard = readLeaderboard();
  const timeNum = parseInt(time);
  
  // Check if time qualifies (top 10 or leaderboard has less than 10 entries)
  const qualifies = leaderboard.length < 10 || timeNum < leaderboard[leaderboard.length - 1].time;
  
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
