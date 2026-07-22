/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const boardgamesPath = path.join(__dirname, 'data', 'boardgames.json');
const gamesPath = path.join(__dirname, 'data', 'games.json');

const readJSON = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
};

const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// GET /api/boardgames - List board games catalog for autocompletion
app.get('/api/boardgames', (req, res) => {
  const games = readJSON(boardgamesPath, []);
  res.json({ games });
});

// POST /api/boardgames - Add a new board game to catalog
app.post('/api/boardgames', (req, res) => {
  const { name, image_url } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Game name is required' });
  }

  const boardgames = readJSON(boardgamesPath, []);
  const newGame = {
    id: String(Date.now()),
    name: name.trim(),
    image_url: image_url || ''
  };

  boardgames.push(newGame);
  writeJSON(boardgamesPath, boardgames);
  res.status(201).json(newGame);
});

// PUT /api/boardgames/:id - Update an existing board game in catalog
app.put('/api/boardgames/:id', (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Game name is required' });
  }

  let boardgames = readJSON(boardgamesPath, []);
  const index = boardgames.findIndex((g) => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Game not found' });
  }

  boardgames[index] = {
    ...boardgames[index],
    name: name.trim(),
    image_url: image_url !== undefined ? image_url.trim() : boardgames[index].image_url
  };

  writeJSON(boardgamesPath, boardgames);
  res.json(boardgames[index]);
});

// DELETE /api/boardgames/:id - Remove a board game from catalog
app.delete('/api/boardgames/:id', (req, res) => {
  const { id } = req.params;
  let boardgames = readJSON(boardgamesPath, []);
  boardgames = boardgames.filter((game) => game.id !== id);
  writeJSON(boardgamesPath, boardgames);
  res.json({ message: 'Game removed successfully' });
});

// GET /api/games - List tracked game matches
app.get('/api/games', (req, res) => {
  const trackedGames = readJSON(gamesPath, []);
  res.json(trackedGames);
});

// POST /api/games - Track a new game match
app.post('/api/games', (req, res) => {
  const match = req.body;
  if (!match || !match.nameOfGame) {
    return res.status(400).json({ error: 'Valid game data is required' });
  }

  const trackedGames = readJSON(gamesPath, []);
  const newMatch = {
    ...match,
    id: match.id || String(Date.now())
  };

  trackedGames.unshift(newMatch);
  writeJSON(gamesPath, trackedGames);
  res.status(201).json(newMatch);
});

// DELETE /api/games/:id - Delete a tracked game match
app.delete('/api/games/:id', (req, res) => {
  const { id } = req.params;
  let trackedGames = readJSON(gamesPath, []);
  trackedGames = trackedGames.filter((game) => game.id !== id);
  writeJSON(gamesPath, trackedGames);
  res.json({ message: 'Match deleted successfully' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Tabula Rasa Backend API running at http://localhost:${PORT}`);
  });
}

module.exports = app;
