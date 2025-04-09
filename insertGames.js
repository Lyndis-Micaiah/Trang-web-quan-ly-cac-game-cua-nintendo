// insertGames.js
const mongoose = require('mongoose');
const Game = require('./models/Game'); // Import model từ gameModel.js

const games = [
    { title: 'Super Mario Bros.', platform: 'NES', price: 30, description: 'The original Super Mario Bros. game', imageUrl: '/resources/images/Super_Mario_Bros.png', releaseYear: 1985 },
    { title: 'The Legend of Zelda', platform: 'NES', price: 50, description: 'First entry in the Zelda series', imageUrl: '/resources/images/The_Legend_of_Zelda.png', releaseYear: 1986 },
    { title: 'Metroid', platform: 'NES', price: 40, description: 'A sci-fi adventure featuring Samus Aran', imageUrl: '/resources/images/Metroid.jpg', releaseYear: 1986 },
    { title: 'Super Mario World', platform: 'SNES', price: 60, description: 'A classic Mario platformer on the SNES', imageUrl: '/resources/images/Super_Mario_World.png', releaseYear: 1990 },
    { title: 'The Legend of Zelda: A Link to the Past', platform: 'SNES', price: 70, description: 'Zelda adventure in a top-down perspective', imageUrl: '/resources/images/The_Legend_of_Zelda_A_Link_to_the_Past.jpg', releaseYear: 1991 },
    { title: 'Super Metroid', platform: 'SNES', price: 65, description: 'A side-scrolling action-adventure game featuring Samus', imageUrl: '/resources/images/Super_Metroid.jpg', releaseYear: 1994 },
    { title: 'Super Mario 64', platform: 'N64', price: 80, description: 'A revolutionary 3D Mario game', imageUrl: '/resources/images/Super_Mario_64.jpg', releaseYear: 1996 },
    { title: 'The Legend of Zelda: Ocarina of Time', platform: 'N64', price: 90, description: 'A 3D open world adventure game', imageUrl: '/resources/images/The_Legend_of_Zelda_Ocarina_of_Time.jpg', releaseYear: 1998 },
    { title: 'GoldenEye 007', platform: 'N64', price: 75, description: 'A first-person shooter based on the Bond movie', imageUrl: '/resources/images/GoldenEye007.jpg', releaseYear: 1997 },
    { title: 'Super Smash Bros.', platform: 'N64', price: 50, description: 'A fighting game featuring Nintendo characters', imageUrl: '/resources/images/Super_Smash_Bros.jpg', releaseYear: 1999 },
    { title: 'Pokémon Red', platform: 'Game Boy', price: 40, description: 'First Pokémon game in the series', imageUrl: '/resources/images/Pokemon_Red.jpg', releaseYear: 1996 },
    { title: 'Pokémon Gold', platform: 'Game Boy Color', price: 45, description: 'The second generation of Pokémon games', imageUrl: '/resources/images/Pokemon_Gold.jpg', releaseYear: 1999 },
    { title: 'The Legend of Zelda: Link’s Awakening', platform: 'Game Boy', price: 35, description: 'A top-down Zelda adventure on the Game Boy', imageUrl: '/resources/images/The_Legend_of_Zelda_Links_Awakening.jpg', releaseYear: 1993 },
    { title: 'Animal Crossing', platform: 'GameCube', price: 55, description: 'A social simulation game', imageUrl: '/resources/images/Animal_Crossing.png', releaseYear: 2001 },
    { title: 'Super Mario Sunshine', platform: 'GameCube', price: 60, description: 'A 3D Mario platformer on the GameCube', imageUrl: '/resources/images/Super_Mario_Sunshine.png', releaseYear: 2002 },
    { title: 'The Legend of Zelda: Wind Waker', platform: 'GameCube', price: 70, description: 'A cel-shaded Zelda adventure game', imageUrl: '/resources/images/The_Legend_of_Zelda_The_Wind_Waker.jpg', releaseYear: 2002 },
    { title: 'Pokémon Diamond', platform: 'NDS', price: 50, description: 'A mainline Pokémon game on the Nintendo DS', imageUrl: '/resources/images/Pokemon_Diamond.jpg', releaseYear: 2006 },
    { title: 'New Super Mario Bros.', platform: 'NDS', price: 40, description: 'A traditional Mario platformer for the DS', imageUrl: '/resources/images/New_Super_Mario_Bros.jpg', releaseYear: 2006 },
    { title: 'The Legend of Zelda: Phantom Hourglass', platform: 'NDS', price: 55, description: 'A Zelda adventure on the Nintendo DS', imageUrl: '/resources/images/The_Legend_of_Zelda_Phantom_Hourglass.jpg', releaseYear: 2007 },
    { title: 'Super Mario Kart DS', platform: 'NDS', price: 50, description: 'A racing game featuring Mario and friends', imageUrl: '/resources/images/Mario_Kart_DS.jpg', releaseYear: 2005 },
    { title: 'Pokémon Black', platform: 'NDS', price: 60, description: 'A later Pokémon title for the Nintendo DS', imageUrl: '/resources/images/Pokemon_Black.png', releaseYear: 2010 }
];
  
async function insertGames() {
  try {
    await Game.insertMany(games);
    console.log('20 games have been added successfully!');
  } catch (error) {
    console.log('Error inserting games:', error);
  }
}

// Kết nối MongoDB và thêm games
mongoose.connect('mongodb+srv://admin:Anime4life@cluster0.dsyrigi.mongodb.net/jwt_app?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    insertGames();
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
