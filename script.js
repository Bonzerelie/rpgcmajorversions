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

// Game-specific elements (you should customize each game content like note buttons, prompts, etc.)
const playRefBtn = document.getElementById('play-reference');
const replayNoteBtn = document.getElementById('replay-note');
const nextBtn = document.getElementById('next-button');
const resetScoreBtn = document.getElementById('reset-score');
const promptText = document.getElementById('prompt');
const noteButtons = document.querySelectorAll('.blue-button');
const displayNotesBtn = document.getElementById('display-notes');
const displayDegreesBtn = document.getElementById('display-degrees');
const scaleLabel = document.getElementById('scale-label');
const octaveLabel = document.getElementById('octave-label');

// Score display elements
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalCount = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');

// Game-specific variables
let currentNote = '';
let audio = new Audio();
let correct = 0;
let incorrect = 0;
let isAnswered = false;
let showDegrees = false;
let noteRange = [];

// Mapping for different note ranges
const noteMapOneOctave = {
  'C': ['c4'],
  'D': ['d4'],
  'E': ['e4'],
  'F': ['f4'],
  'G': ['g4'],
  'A': ['a4'],
  'B': ['b4']
};

const noteMapTwoOctave = {
  'C': ['c3', 'c4'],
  'D': ['d3', 'd4'],
  'E': ['e3', 'e4'],
  'F': ['f3', 'f4'],
  'G': ['g3', 'g4'],
  'A': ['a3', 'a4'],
  'B': ['b3', 'b4']
};

const noteMapThreeOctave = {
  'C': ['c3', 'c4', 'c5'],
  'D': ['d3', 'd4', 'd5'],
  'E': ['e3', 'e4', 'e5'],
  'F': ['f3', 'f4', 'f5'],
  'G': ['g3', 'g4', 'g5'],
  'A': ['a3', 'a4', 'a5'],
  'B': ['b3', 'b4', 'b5']
};

const degreeMap = {
  'C': '1st',
  'D': '2nd',
  'E': '3rd',
  'F': '4th',
  'G': '5th',
  'A': '6th',
  'B': '7th'
};

// Selecting the correct note range based on game choice
function setNoteRange(gameType) {
  if (gameType === 'one-octave') {
    noteRange = Object.values(noteMapOneOctave).flat();
  } else if (gameType === 'two-octave') {
    noteRange = Object.values(noteMapTwoOctave).flat();
  } else if (gameType === 'three-octave') {
    noteRange = Object.values(noteMapThreeOctave).flat();
  }
}

// Get note name based on filename
function getNoteName(filename) {
  for (const [name, files] of Object.entries(noteMapOneOctave)) {
    if (files.includes(filename)) return name;
  }
  for (const [name, files] of Object.entries(noteMapTwoOctave)) {
    if (files.includes(filename)) return name;
  }
  for (const [name, files] of Object.entries(noteMapThreeOctave)) {
    if (files.includes(filename)) return name;
  }
  return '';
}

// Play note audio
function playNote(noteFile) {
  audio.src = `audio/${noteFile}.mp3`;
  audio.play();
}

// Start Game Function
function startGame(gameType) {
  startScreen.classList.add('hidden');
  if (gameType === 'one-octave') {
    oneOctaveGame.classList.remove('hidden');
  } else if (gameType === 'two-octave') {
    twoOctaveGame.classList.remove('hidden');
  } else if (gameType === 'three-octave') {
    threeOctaveGame.classList.remove('hidden');
  }
  setNoteRange(gameType);
  loadNewNote();
}

// Load a new note for the game
function loadNewNote() {
  isAnswered = false;
  noteButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'incorrect');
  });
  currentNote = noteRange[Math.floor(Math.random() * noteRange.length)];
  playNote(currentNote);
  promptText.textContent = 'Which note was played?';
  nextBtn.disabled = true;
}

// Handle the answer when a note button is clicked
function handleAnswer(e) {
  if (isAnswered) return;
  isAnswered = true;

  const selected = e.target.getAttribute('data-note');
  const correctName = getNoteName(currentNote);

  if (selected === correctName) {
    correct++;
    e.target.classList.add('correct');
    promptText.textContent = showDegrees
      ? `Correct! ✅ The note was the ${degreeMap[correctName]} scale degree`
      : `Correct! ✅ The note was ${correctName}`;
  } else {
    incorrect++;
    e.target.classList.add('incorrect');
    const correctBtn = [...noteButtons].find(btn => btn.getAttribute('data-note') === correctName);
    if (correctBtn) correctBtn.classList.add('correct');
    promptText.textContent = showDegrees
      ? `Incorrect! ❌ The note was the ${degreeMap[correctName]} scale degree`
      : `Incorrect! ❌ The note played was actually ${correctName}`;
  }

  updateScore();
  nextBtn.disabled = false;
  noteButtons.forEach(btn => btn.disabled = true);
}

// Update the score display
function updateScore() {
  const total = correct + incorrect;
  correctCount.textContent = correct;
  incorrectCount.textContent = incorrect;
  totalCount.textContent = total;
  accuracyDisplay.textContent = total ? ((correct / total) * 100).toFixed(1) + '%' : '0.0%';
}

// Reset the score to zero
function resetScore() {
  correct = 0;
  incorrect = 0;
  updateScore();
}

// Toggle between notes and scale degrees
function toggleDisplay(mode) {
  showDegrees = mode === 'degrees';
  noteButtons.forEach(btn => {
    const note = btn.getAttribute('data-note');
    btn.textContent = showDegrees ? degreeMap[note] : note;
  });
  displayNotesBtn.classList.toggle('selected', !showDegrees);
  displayDegreesBtn.classList.toggle('selected', showDegrees);
}

// Event Listeners
oneOctaveBtn.addEventListener('click', () => startGame('one-octave'));
twoOctaveBtn.addEventListener('click', () => startGame('two-octave'));
threeOctaveBtn.addEventListener('click', () => startGame('three-octave'));

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

playRefBtn.addEventListener('click', () => playNote('c4'));
replayNoteBtn.addEventListener('click', () => playNote(currentNote));
nextBtn.addEventListener('click', loadNewNote);
resetScoreBtn.addEventListener('click', resetScore);

noteButtons.forEach(btn => btn.addEventListener('click', handleAnswer));
displayNotesBtn.addEventListener('click', () => toggleDisplay('notes'));
displayDegreesBtn.addEventListener('click', () => toggleDisplay('degrees'));
