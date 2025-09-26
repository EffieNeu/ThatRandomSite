const express = require('express');
const cors = require('cors');
const path = require('path');
// Leaderboard removed: no Redis needed

const app = express();
const PORT = process.env.PORT || 3000;

// Leaderboard removed: Redis client and key removed

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Leaderboard removed

// Leaderboard endpoints removed

// Leaderboard endpoints removed

// Leaderboard endpoints removed

// Serve the main game page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'reaction.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
