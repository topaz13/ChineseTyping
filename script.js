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
var deleteButton = document.getElementById("DeleteButton");
var answerButton = document.getElementById("AnswerButton");
var wordTable = document.getElementById("WordTable");
var helpButton = document.getElementById("help-btn");
var answerButton = document.getElementById("anser-btn");
var serachButton = document.getElementById("serch-img");
var popup = document.getElementById("popup");

const BASE_SERCH_URL = "https://cjjc.weblio.jp/content/";

var currentWordIndex;

function Init() {
  // Button Events
  var elms = document.getElementsByClassName("AlphabetButton");
  for (let index = 0; index < elms.length; index++) {
    const element = elms[index];
    element.addEventListener("click", () => {
      if (element.textContent == "一声") {
        AddSisei(1);
        return;
      }
      if (element.textContent == "二声") {
        AddSisei(2);
        return;
      }
      if (element.textContent == "三声") {
        AddSisei(3);
        return;
      }
      if (element.textContent == "四声") {
        AddSisei(4);
        return;
      }
      inputElement.value = inputElement.value + element.textContent;
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

  helpButton.addEventListener("click", () => {
    console.log("Help is clicked");
    var popup = document.getElementById("popup");
    console.log(popup);
    popup.style.display = "block";
    // console.log("Help is clicked");
  });

  answerButton.addEventListener("click", () => {
    console.log("answer is clicked");
    ShowAnswer();
  });

  serachButton.addEventListener("click", () => {
    console.log(" imaga is clicked");
    var url = BASE_SERCH_URL + kanjiData[currentWordIndex][0];
    url = encodeURI(url);
    window.open(url, "_blank");
  });

  popup.addEventListener("click", () => {
    console.log("pop up is clicked");
    popup.style.display = "none";
  });

  currentWordIndex = 0;
  inputElement.value = "";

  generateWord();
}

function ShowAnswer() {
  inputElement.value = "";
  var kanji = kanjiData[currentWordIndex][0];
  var pinyin = kanjiData[currentWordIndex][1];
  var wayaku = kanjiData[currentWordIndex][2];
  AddData(kanji, pinyin, wayaku, true);
  currentWordIndex++;
  generateWord();
}

function AddData(kanji, pinyin, wayaku, isWrongAnswer) {
  var tr = document.createElement("tr");
  tr.className = "Table-Body-Row";
  if (isWrongAnswer) {
    tr.className = "Table-Body-Row WrongAnswer";
  }
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  td1.innerText = kanji;
  td1.className = "Table-Body-Row-Cell";
  td2.innerText = pinyin;
  td2.className = "Table-Body-Row-Cell";
  td3.innerText = wayaku;
  td3.className = "Table-Body-Row-Cell";
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  console.log(wordTable);
  if (wordTable.children.length > 0) {
    wordTable.insertBefore(tr, wordTable.firstChild);
  } else {
    wordTable.append(tr);
  }
}

document.addEventListener("keydown", keydown_ivent);
function keydown_ivent(e) {
  if (e.code == "Backspace") {
    console.log("WWWWW");
    if (inputElement.value.length > 0) {
      console.log("WWWWW");
    }
  }
  if (e.code == "Enter") {
    PressedEnter();
  }
}
// KEY PRESSED
document.addEventListener("keypress", keypress_ivent);
function keypress_ivent(e) {
  return;
  console.log(e);
  if (97 <= e.keyCode && e.keyCode <= 122) {
    if (e.key == "a") {
      OnClickedBoin(0);
      return;
    }
    if (e.key == "e") {
      OnClickedBoin(1);
      return;
    }
    if (e.key == "o") {
      OnClickedBoin(2);
      return;
    }
    if (e.key == "i") {
      OnClickedBoin(3);
      return;
    }
    if (e.key == "u") {
      OnClickedBoin(4);
      return;
    }
    if (e.key == "v") {
      OnClickedBoin(5);
      return;
    }
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
  if (e.key == "7") {
    AddData();
  }
  return false;
}

inputElement.addEventListener("input", checkInput);
function OnClickedBoin(index) {
  if (inputElement.value < 1) {
    if (sisei[index][0] == "v") {
      inputElement.value = inputElement.value + "ü";
      return;
    }
    inputElement.value = inputElement.value + sisei[index][0];
    return;
  }
  var lastCharacter = inputElement.value[inputElement.value.length - 1];
  for (let x = 0; x < sisei.length; x++) {
    const element = sisei[x];
    for (let y = 0; y < element.length; y++) {
      var elm = element[y];
      if (elm == "v") {
        elm = "ü";
      }
      if (elm == lastCharacter) {
        // ここで入れ替えの処理を行う
        if (element[0] == sisei[index][0]) {
          var nextCharacter = element[(y + 1) % 5];
          inputElement.value = inputElement.value.substring(
            0,
            inputElement.value.length - 1
          );
          if (nextCharacter == "v") {
            inputElement.value = inputElement.value + "ü";
            return;
          }
          inputElement.value = inputElement.value + nextCharacter;
          return;
        }
      }
    }
  }
  if (sisei[index][0] == "v") {
    inputElement.value = inputElement.value + "ü";
    return;
  }
  inputElement.value = inputElement.value + sisei[index][0];
}

function generateWord() {
  if (currentWordIndex >= kanjiData.length) {
    endGame();
    return;
  }
  wordElement.textContent = kanjiData[currentWordIndex][0];
}

function InputAlphabet(chara) {
  if (chara == "a") {
    OnClickedBoin(0);
    return;
  }
  if (chara == "e") {
    OnClickedBoin(1);
    return;
  }
  if (chara == "o") {
    OnClickedBoin(2);
    return;
  }
  if (chara == "i") {
    OnClickedBoin(3);
    return;
  }
  if (chara == "u") {
    OnClickedBoin(4);
    return;
  }
  if (chara == "v") {
    OnClickedBoin(5);
    return;
  }
  inputElement.value = inputElement.value + chara;
}

function PressedEnter() {
  if (
    inputElement.value.trim() ===
    kanjiData[currentWordIndex][1].replace(/\s+/g, "")
  ) {
    inputElement.value = "";
    var kanji = kanjiData[currentWordIndex][0];
    var pinyin = kanjiData[currentWordIndex][1];
    var wayaku = kanjiData[currentWordIndex][2];
    AddData(kanji, pinyin, wayaku, false);
    currentWordIndex++;
    generateWord();
  } else {
    console.log("failed");
  }
}

// 入力があるたびに』処理を行う。
function checkInput() {
  var lastChara = inputElement.value[inputElement.value.length - 1];
  if (lastChara == null) return;
  if (lastChara.length <= 0) return;
  var code = lastChara.codePointAt(0);

  // アルファベットの入力
  if (97 <= code && code <= 122) {
    inputElement.value = inputElement.value.substring(
      0,
      inputElement.value.length - 1
    );
    InputAlphabet(lastChara);
    return;
  } else {
    // 他の入力は消す
    inputElement.value = inputElement.value.substring(
      0,
      inputElement.value.length - 1
    );
    return;
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
