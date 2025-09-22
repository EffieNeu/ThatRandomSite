# Reaction Time Game with Leaderboard

A fun reaction time game with a global leaderboard that tracks the top 10 fastest players.

## Features

- ⚡ Reaction time testing game
- 🏆 Global leaderboard (top 10)
- 📊 Real-time leaderboard updates
- 🎯 Record validation and name entry
- 💾 Persistent data storage
- 🌐 Multi-user support

## Setup Instructions

### Local Development

#### 1. Install Dependencies

First, make sure you have Node.js installed on your system. Then run:

```bash
npm install
```

This will install the required dependencies:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `nodemon` - Development server (optional)

#### 2. Start the Server

To start the server, run:

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

#### 3. Play the Game

1. Open your browser and go to `http://localhost:3000`
2. Read the instructions and click "Start Game"
3. Wait for the screen to turn green, then click as fast as you can!
4. If you make it to the top 10, you'll be prompted to enter your name

### Deploy to Vercel (Recommended)

#### 1. Push to GitHub

1. Create a new repository on GitHub
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

#### 2. Deploy with Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Node.js project
5. Click "Deploy" - no configuration needed!

Your game will be live at a URL like `https://your-project-name.vercel.app`

#### 3. Alternative: Deploy with Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build command: `npm install && npm run build` (if you add a build script)
5. Set publish directory: `.`
6. Click "Deploy site"

## How It Works

### Game Mechanics
- Click "Start Game" to begin
- Wait for the screen to turn from red to green
- Click as fast as possible when it turns green
- Your reaction time is measured in milliseconds

### Leaderboard System
- Only the top 10 fastest times are kept
- When you achieve a qualifying time, a modal appears asking for your name
- Records are stored in memory (resets when server restarts)
- The leaderboard updates in real-time for all players
- **Note**: For production use, consider adding a database for persistent storage

### API Endpoints

- `GET /api/leaderboard` - Get current leaderboard
- `POST /api/leaderboard` - Add new score (requires name and time)
- `GET /api/check-record?time=X` - Check if a time qualifies for leaderboard

## File Structure

```
├── reaction.html          # Main game page
├── server.js             # Express server with API
├── package.json          # Dependencies and scripts
├── leaderboard.json      # Leaderboard data (created automatically)
└── README.md            # This file
```

## Customization

You can modify the game by editing:
- **Game timing**: Change the random delay range in `getRandomDelay()`
- **Leaderboard size**: Modify the slice limit in `server.js`
- **Styling**: Update the CSS in the `<style>` section of `reaction.html`

## Troubleshooting

- **Port already in use**: Change the PORT in `server.js` or kill the process using port 3000
- **CORS errors**: Make sure the server is running and accessible
- **Leaderboard not loading**: Check browser console for errors and ensure server is running

Enjoy the game and try to get the fastest reaction time! 🏆
