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
let currentMode = 0; // Default to no mode selected

// Define the note sets for each version of the game
const first3Notes = ['c4', 'd4', 'e4']; // First 3 notes
const first5Notes = ['c4', 'd4', 'e4', 'f4', 'g4']; // First 5 notes
const fullOctaveNotes = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5']; // Full octave notes including c5

// Function to get the current note set based on the mode selected
function getNoteSet() {
    if (currentMode === 3) return first3Notes;
    if (currentMode === 5) return first5Notes;
    return fullOctaveNotes; // Full octave (including c5)
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

  const noteSet = getNoteSet();
  currentNote = noteSet[Math.floor(Math.random() * noteSet.length)]; // Pick from the correct set

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
      ? `Incorrect! ❌ The note was the ${degreeMap[correctName]} scale degree`
      : `Incorrect! ❌ The note played was actually ${correctName}`;
  }

  updateScore();
  nextBtn.disabled = false;
  noteButtons.forEach(btn => btn.disabled = true);
}

function updateScore() {
  const total = correct + incorrect;
  correctCount.textContent = correct;
  incorrectCount.textContent = incorrect;
  totalCount.textContent = total;
  accuracyDisplay.textContent = total ? ((correct / total) * 100).toFixed(1) + '%' : '0.0%';
}

function resetScore() {
  correct = 0;
  incorrect = 0;
  updateScore();
}

function toggleDisplay(mode) {
  showDegrees = mode === 'degrees';
  updateNoteButtonLabels();
  displayNotesBtn.classList.toggle('selected', !showDegrees);
  displayDegreesBtn.classList.toggle('selected', showDegrees);
  scaleLabel.textContent = showDegrees ? 'Diatonic - Major Scale' : 'Diatonic - C Major Scale';
  octaveLabel.textContent = showDegrees ? 'One Octave (C4-C5)' : 'One Octave (C4-C5)';
  playRefBtn.textContent = showDegrees ? 'Play Reference (Tonic)' : 'Play Reference (C - Tonic)';
  promptText.textContent = 'Which note was played?';
}

// Set the mode when the player selects an option
document.getElementById('mode-3').addEventListener('click', () => {
  currentMode = 3; // First 3 notes only
  startGame();
});

document.getElementById('mode-5').addEventListener('click', () => {
  currentMode = 5; // First 5 notes only
  startGame();
});

document.getElementById('mode-8').addEventListener('click', () => {
  currentMode = 8; // Entire octave (including c5)
  startGame();
});

startButton.addEventListener('click', startGame);
playRefBtn.addEventListener('click', () => playNote('c4'));
replayNoteBtn.addEventListener('click', () => playNote(currentNote));
nextBtn.addEventListener('click', loadNewNote);
resetScoreBtn.addEventListener('click', resetScore);
noteButtons.forEach(btn => btn.addEventListener('click', handleAnswer));
displayNotesBtn.addEventListener('click', () => toggleDisplay('notes'));
displayDegreesBtn.addEventListener('click', () => toggleDisplay('degrees'));
