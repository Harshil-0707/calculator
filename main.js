let firstVal = "";
let secondVal = "";
let operator = "";
const numBtn = document.querySelectorAll(".numBtn");
const funcBtns = document.querySelectorAll(".funcBtn");
const userInput = document.querySelector(".userInput");
const operatorBtn = document.querySelectorAll(".operator");

funcBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const funcBtnChar = getChar(e);
    operator
      ? (secondVal = clearInput(funcBtnChar, secondVal))
      : (firstVal = clearInput(funcBtnChar, firstVal));
  });
});

function clearInput(funcBtn, value) {
  let updateValue = value;
  if (funcBtn === "C") {
    userInput.value = "0";
    value = "";
  } else {
    if (userInput.value.length >= 1) {
      userInput.value = value.slice(0, -1);
      updateValue = value.slice(0, -1);
      value = updateValue;
      if (userInput.value.length == 0) {
        userInput.value = "0";
        value = "";
      }
    }
  }
  return value;
}

numBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const numBtnChar = getChar(e);
    switch (numBtnChar) {
      case ".":
        operator
          ? (secondVal = addDot(numBtnChar, secondVal))
          : (firstVal = addDot(numBtnChar, firstVal));
        break;
      default:
        operator
          ? (secondVal = addNum(numBtnChar, secondVal))
          : (firstVal = addNum(numBtnChar, firstVal));
    }
  });
});

function addDot(dot, value) {
  if (!userInput.value.includes(".")) {
    value += dot;
    userInput.value += dot;
  }
  return value;
}

function addNum(num, value) {
  console.log(value);
  value += num;
  userInput.value = value;
  return value;
}

function getChar(e) {
  return e.currentTarget.innerText;
}
