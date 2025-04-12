
const router = require('express').Router();
const Game = require('../models/Game');
const authMiddleware = require('../middleware/authMiddleware');

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

// Route bảo vệ yêu cầu JWT
router.get('/', authMiddleware, async (req, res) => {
  const platform = req.query.platform;

  try {
      let games;
      if (platform) {
          games = await Game.find({ platform: platform });
      } else {
          games = await Game.find();
      }
      res.json(games);
  } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ message: 'Error fetching games' });
  }
});

module.exports = router;
