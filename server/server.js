const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get all participants (for voting list)
app.get('/api/participants', (req, res) => {
  try {
    const participants = db.getParticipants();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register a new participant
app.post('/api/register', (req, res) => {
  const { name, projectName, info } = req.body;
  if (!name || !projectName) {
    return res.status(400).json({ error: 'Nome e Nome do Projeto são obrigatórios.' });
  }
  try {
    db.addParticipant(name, projectName, info);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote for a project
app.post('/api/vote', (req, res) => {
  const { participantId, voterName, voterEmail } = req.body;
  if (!participantId || !voterName || !voterEmail) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  try {
    db.addVote(participantId, voterName, voterEmail);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get results
app.get('/api/results', (req, res) => {
  try {
    const results = db.getResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
