let firstVal = "";
let operator = "";
let secondVal = "";
const span = document.querySelector("span");
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
        if (operator) {
          secondVal = addNum(numBtnChar, secondVal);
          span.textContent = `${firstVal} ${operator} ${secondVal}`;
        } else {
          firstVal = addNum(numBtnChar, firstVal);
        }
    }
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const userChoiceOperator = getChar(e);
    if (userChoiceOperator === "=") {
      calculate(operator);
    } else {
      operator = userChoiceOperator;
      span.textContent = firstVal + " " + operator;
    }
  });
});

function calculate(operatorSign) {
  signs = {
    "+": +firstVal + +secondVal,
    "-": +firstVal - +secondVal,
    "÷": +firstVal / +secondVal,
    "×": +firstVal * +secondVal,
    "%": (+firstVal * +secondVal) / 100,
  };
  userInput.value = signs[operatorSign];
  firstVal = userInput.value;
  secondVal = "";
}

function clearInput(funcBtn, value) {
  let updateValue = value;
  if (funcBtn === "C") {
    userInput.value = "0";
    span.textContent = "";
    clearValues();
  } else {
    if (userInput.value.length >= 1) {
      userInput.value = value.slice(0, -1);
      updateValue = value.slice(0, -1);
      value = updateValue;
      if (userInput.value.length == 0) {
        userInput.value = "0";
        clearValues();
      }
      span.textContent = value;
    }
  }
  return value;
}

function clearValues() {
  firstVal = "";
  secondVal = "";
  operator = "";
  value = "";
}

function addDot(dot, value) {
  if (!userInput.value.includes(".")) {
    value += dot;
    userInput.value += dot;
  }
  return value;
}

function addNum(num, value) {
  value += num;
  userInput.value = value;
  return value;
}

function getChar(e) {
  return e.currentTarget.innerText;
}
