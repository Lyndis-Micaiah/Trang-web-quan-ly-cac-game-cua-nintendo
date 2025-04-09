
const router = require('express').Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
  try {
    const { platform } = req.query;
    const query = platform ? { platform } : {};
    const games = await Game.find(query);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
