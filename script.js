// ["漢字","拼音","意味"]
var kanjiData;

const sisei = [
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
var enterButton = document.getElementById("EnterButton");

var currentWordIndex;

function Init() {
  // Button Events
  var elms = document.getElementsByClassName("AlphabetButton");
  console.log(elms.length);
  for (let index = 0; index < elms.length; index++) {
    const element = elms[index];
    element.addEventListener("click", () => {
      console.log(inputElement.value);
      inputElement.value = inputElement.value + element.textContent;
      console.log(element.textContent);
      inputElement.focus();
    });
  }
  elms = document.getElementsByClassName("KeyButton");
  console.log(elms.length);
  for (let index = 0; index < elms.length; index++) {
    const element = elms[index];
    element.addEventListener("click", () => {
      console.log(inputElement.value);
      inputElement.value = inputElement.value + element.textContent;
      console.log(element.textContent);
    });
  }

  enterButton.addEventListener("click", () => {
    checkInput();
  });
  currentWordIndex = 0;
  inputElement.value = "";

  generateWord();
}

// KEY PRESSED
document.addEventListener("keypress", keypress_ivent);
document.addEventListener("keydown", keypress_ivent);
function keypress_ivent(e) {
  console.log(e);
  if (97 <= e.keyCode && e.keyCode <= 122) {
    inputElement.value = inputElement.value + e.key;
  }
  if (e.key == "1") {
    AddSisei(1);
  }
  if (e.key == "2") {
    AddSisei(2);
  }
  if (e.key == "3") {
    AddSisei(3);
  }
  if (e.key == "4") {
    AddSisei(4);
  }

  if (e.code == "Backspace") {
    console.log("WWWWW");
    if (inputElement.value.length > 0) {
      console.log("WWWWW");
      inputElement.value = inputElement.value.substring(
        0,
        inputElement.value.length - 1
      );
    }
  }

  return false;
}

function generateWord() {
  if (currentWordIndex >= kanjiData.length) {
    endGame();
    return;
  }
  wordElement.textContent = kanjiData[currentWordIndex][0];
}

function checkInput() {
  if (inputElement.value.trim() === kanjiData[currentWordIndex][1]) {
    inputElement.value = "";
    currentWordIndex++;
    generateWord();
  } else {
    console.log("failed");
  }
}

function AddSisei(siseiValue) {
  var inputText = inputElement.value.trim();
  var lastIndex = inputText.length;
  if (inputText.length >= 1) {
    var changedCharacter = inputText[lastIndex - 1];
    for (let index = 0; index < sisei.length; index++) {
      const target = sisei[index][0];
      if (target == changedCharacter) {
        inputElement.value =
          inputText.substring(0, lastIndex - 1) + sisei[index][siseiValue];
        break;
      }
    }
  }
}

//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
  var req = new XMLHttpRequest();
  req.open("get", "./pinyin.csv", true);
  req.send(null);
  req.onload = function () {
    convertCSVtoArray(req.responseText);
  };
}
function convertCSVtoArray(str) {
  console.log(str);
  var result = [];
  var tmp = str.split("\n");

  // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
  for (var i = 0; i < tmp.length; ++i) {
    result[i] = tmp[i].split(",");
  }
  kanjiData = result;

  Init();
}

getCSV(); //最初に実行される
