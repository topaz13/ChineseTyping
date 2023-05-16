// 単語のリスト
var words = ["apple", "banana", "cherry", "dragonfruit", "elderberry"];
var kanjiData;

var sisei = [
  ["a", "ā", "á", "ǎ", "à"],
  ["e", "ē", "é", "ě", "è"],
  ["o", "ō", "ó", "ǒ", "ò"],
  ["i", "ī", "í", "ǐ", "ì"],
  ["u", "ū", "ú", "ǔ", "ù"],
  ["v", "ǖ", "ǘ", "ǚ", "ǜ"],
];

var wordElement = document.getElementById("word");
var inputElement = document.getElementById("input");
var startButton = document.getElementById("start-btn");
// var scoreElement = document.getElementById("score");
var state = "READY";

var currentWordIndex;
// var score;

// startButton.addEventListener("click", startGame);

function Init() {
  // button
  var elms = document.getElementsByClassName("AlphabetButton");
  console.log(elms.length);
  for (let index = 0; index < elms.length; index++) {
    const element = elms[index];
    // element.bu
    element.addEventListener("click", () => {
      console.log(inputElement.value);
      inputElement.value = inputElement.value + element.textContent;
      console.log(element.textContent);
    });
  }
}

function startGame() {
  currentWordIndex = 0;

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
  // if (inputElement.value.trim() === kanjiData[currentWordIndex][1]) {
  if (inputElement.value.trim() === "www") {
    inputElement.value = "";
    currentWordIndex++;
    generateWord();
  }
  var inputText = inputElement.value.trim();
  var lastIndex = inputText.length;
  console.log(inputText);
  console.log(lastIndex);
  if (inputText[lastIndex - 1] == "1") {
    AddSisei(1);
  }
  if (inputText[lastIndex - 1] == "2") {
    AddSisei(2);
  }
  if (inputText[lastIndex - 1] == "3") {
    AddSisei(3);
  }
  if (inputText[lastIndex - 1] == "4") {
    AddSisei(4);
  }
}

function AddSisei(siseiValue) {
  var inputText = inputElement.value.trim();
  var lastIndex = inputText.length;
  if (inputText.length >= 2) {
    var changedCharacter = inputText[lastIndex - 2];
    console.log(changedCharacter);
    for (let index = 0; index < sisei.length; index++) {
      const target = sisei[index][0];
      if (target == changedCharacter) {
        inputElement.value =
          inputText.substring(0, lastIndex - 2) + sisei[index][siseiValue];
        break;
      }
    }
  }
}

function endGame() {
  wordElement.textContent = "ゲーム終了";
  inputElement.disabled = true;
  // startButton.disabled = false;
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
Init();
