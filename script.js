const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
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
const modeSelect = document.getElementById('mode-select');

const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalCount = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');

let currentNote = '';
let audio = new Audio();
let correct = 0;
let incorrect = 0;
let isAnswered = false;
let showDegrees = false;
let currentMode = 'full-octave';

const noteMap = {
  'C': ['c4', 'c5', 'c6'],
  'D': ['d4', 'd5', 'd6'],
  'E': ['e4', 'e5', 'e6'],
  'F': ['f4', 'f5', 'f6'],
  'G': ['g4', 'g5', 'g6'],
  'A': ['a4', 'a5', 'a6'],
  'B': ['b4', 'b5', 'b6']
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

startButton.addEventListener('click', startGame);


function updateNoteRange() {
  switch (currentMode) {
    case 'full-octave':
      return ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    case 'mid-range':
      return ['C', 'D', 'E', 'F', 'G'];
    case 'short-range':
      return ['C', 'D', 'E'];
    default:
      return ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  }
}

function getNoteName(filename) {
  for (const [name, files] of Object.entries(noteMap)) {
    if (files.includes(filename)) return name;
  }
  return '';
}

function playNote(noteFile) {
  audio.src = `audio/${noteFile}.mp3`;
  audio.play();
}

function startGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  loadNewNote();
}

function updateNoteButtonLabels() {
  noteButtons.forEach(btn => {
    const note = btn.getAttribute('data-note');
    btn.textContent = showDegrees ? degreeMap[note] : note;
  });
}

function loadNewNote() {
  isAnswered = false;
  noteButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'incorrect');
  });
  
  const validNotes = updateNoteRange();
  currentNote = validNotes[Math.floor(Math.random() * validNotes.length)];
  playNote(currentNote);
  promptText.textContent = 'Which note was played?';
  nextBtn.disabled = true;
}

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
      ? `Incorrect! ❌ The note was the ${degreeMap[correctName]} scale
