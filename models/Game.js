
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String,
  releaseYear: Number
});

module.exports = mongoose.model('Game', gameSchema);
