// 単語のリスト
var words = ["apple", "banana", "cherry", "dragonfruit", "elderberry"];

var wordElement = document.getElementById("word");
var inputElement = document.getElementById("input");
var startButton = document.getElementById("start-btn");
var scoreElement = document.getElementById("score");

var currentWordIndex;
var score;

startButton.addEventListener("click", startGame);

function startGame() {
  currentWordIndex = 0;
  score = 0;
  scoreElement.textContent = "スコア: " + score;

  inputElement.value = "";
  inputElement.focus();

  generateWord();
}

function generateWord() {
  if (currentWordIndex >= words.length) {
    endGame();
    return;
  }

  wordElement.textContent = words[currentWordIndex];
}

inputElement.addEventListener("input", checkInput);

function checkInput() {
  if (inputElement.value.trim() === words[currentWordIndex]) {
    score++;
    scoreElement.textContent = "スコア: " + score;

    inputElement.value = "";
    currentWordIndex++;
    generateWord();
  }
}

function endGame() {
  wordElement.textContent = "ゲーム終了";
  inputElement.disabled = true;
  startButton.disabled = false;
}
