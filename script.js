// 単語のリスト
var words = ["apple", "banana", "cherry", "dragonfruit", "elderberry"];
var kanjiData;

var wordElement = document.getElementById("word");
var inputElement = document.getElementById("input");
var startButton = document.getElementById("start-btn");
// var scoreElement = document.getElementById("score");
var state = "READY";

var currentWordIndex;
// var score;

startButton.addEventListener("click", startGame);

function startGame() {
  currentWordIndex = 0;
  // score = 0;
  // scoreElement.textContent = "スコア: " + score;

  inputElement.value = "";
  inputElement.focus();

  generateWord();
}

function generateWord() {
  if (currentWordIndex >= kanjiData.length) {
    endGame();
    return;
  }
  wordElement.textContent = kanjiData[currentWordIndex][0];
}

inputElement.addEventListener("input", checkInput);

function checkInput() {
  if (inputElement.value.trim() === kanjiData[currentWordIndex][1]) {
    // score++;
    // scoreElement.textContent = "スコア: " + score;

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

//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
  console.log("hogeho");
  var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
  req.open("get", "./sample.csv", true); // アクセスするファイルを指定
  req.send(null); // HTTPリクエストの発行

  console.log("hogeho");

  // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
  req.onload = function () {
    convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
  };
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) {
  // 読み込んだCSVデータが文字列として渡される
  var result = []; // 最終的な二次元配列を入れるための配列
  var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

  // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
  for (var i = 0; i < tmp.length; ++i) {
    result[i] = tmp[i].split(",");
  }

  kanjiData = result;
}

getCSV(); //最初に実行される
