// Elements for Start Screen and Game Screens
const startScreen = document.getElementById('start-screen');
const oneOctaveBtn = document.getElementById('one-octave-btn');
const twoOctaveBtn = document.getElementById('two-octave-btn');
const threeOctaveBtn = document.getElementById('three-octave-btn');

const oneOctaveGame = document.getElementById('one-octave-game');
const twoOctaveGame = document.getElementById('two-octave-game');
const threeOctaveGame = document.getElementById('three-octave-game');

const backBtnOne = document.getElementById('back-btn-1');
const backBtnTwo = document.getElementById('back-btn-2');
const backBtnThree = document.getElementById('back-btn-3');

// Event listeners for Start Screen
oneOctaveBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  oneOctaveGame.classList.remove('hidden');
  // Initialize One Octave Game
});

twoOctaveBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  twoOctaveGame.classList.remove('hidden');
  // Initialize Two Octave Game
});

threeOctaveBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  threeOctaveGame.classList.remove('hidden');
  // Initialize Three Octave Game
});

// Back button handlers
backBtnOne.addEventListener('click', () => {
  oneOctaveGame.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

backBtnTwo.addEventListener('click', () => {
  twoOctaveGame.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

backBtnThree.addEventListener('click', () => {
  threeOctaveGame.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

// Example Game Logic for One Octave Game
// Your existing game logic for the three versions would go here (you can reuse the existing code and just modify the note range and octaves accordingly)

// Note that you'll need to implement game logic specific to each version
// For example, for the One Octave Game, the note range will be C4-C5
