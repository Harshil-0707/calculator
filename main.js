let firstVal = "";
let operator = "";
let secondVal = "";
let inputValue = "";
const span = document.querySelector("span");
const numBtn = document.querySelectorAll(".numBtn");
const funcBtns = document.querySelectorAll(".funcBtn");
const userInput = document.querySelector(".userInput");
const operatorBtn = document.querySelectorAll(".operator");

// Handle <input> tag clear Events
funcBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const funcBtnChar = e.currentTarget.innerText;
    operator
      ? (secondVal = clearInput(funcBtnChar, secondVal))
      : (firstVal = clearInput(funcBtnChar, firstVal));
  });
});

// Clear value for <input> tag
function clearInput(funcBtn, value) {
  if (funcBtn === "C") {
    userInput.value = "0";
    span.textContent = "";
    value = "";
    clearValues();
  } else {
    console.log(userInput.value.length);
    if (userInput.value.length >= 1) {
      value = userInput.value.slice(0, -1);
      userInput.value = value;
      if (userInput.value.length == 0) {
        userInput.value = "0";
        clearValues();
      }
      span.textContent = value;
    }
  }
  return value;
}

// For keyBoard Events

document.body.addEventListener("keydown", handleKeyBoardEvent);

// Handle KeyBoard Events
function handleKeyBoardEvent(e) {
  if (+e.key) {
    inputValue += +e.key;
    userInput.value = inputValue;
    span.textContent = inputValue;
    checkOperator(e.key);
  } else if (e.key === "Backspace") {
    if (operator) {
      inputValue = clearInput(e.key, inputValue);
      secondVal = inputValue;
    } else {
      inputValue = clearInput(e.key, inputValue);
      firstVal = inputValue;
    }
  } else if (e.key === "Enter") {
    calculate(operator);
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "%"
  ) {
    operator = e.key;
    span.textContent = `${firstVal} ${operator}`;
    calculate(e.key);
  }
}

// Append Dot or Number to <input> tag
numBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const numBtnChar = e.currentTarget.innerText;
    switch (numBtnChar) {
      case ".":
        operator
          ? (secondVal = addDot(numBtnChar, secondVal))
          : (firstVal = addDot(numBtnChar, firstVal));
        break;
      default:
        checkOperator(numBtnChar);
    }
  });
});

// Check if operator variable contains any operator
function checkOperator(numBtnChar) {
  if (operator) {
    secondVal = addNum(numBtnChar, secondVal);
    span.textContent = `${firstVal} ${operator} ${secondVal}`;
  } else {
    firstVal = addNum(numBtnChar, firstVal);
  }
}

// Get operator
operatorBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const userChoiceOperator = e.currentTarget.innerText;
    if (userChoiceOperator === "=") {
      calculate(operator);
    } else {
      operator = userChoiceOperator;
      span.textContent = `${firstVal} ${operator}`;
    }
  });
});

// Logic to Evaluate any operator
function calculate(operatorSign) {
  signs = {
    "+": +firstVal + +secondVal,
    "-": +firstVal - +secondVal,
    "/": +firstVal / +secondVal,
    "*": +firstVal * +secondVal,
    "%": (+firstVal * +secondVal) / 100,
  };
  if (operatorSign === "×") {
    operatorSign = "*";
  } else {
    if (operatorSign === "÷") {
      operatorSign = "/";
    }
  }
  if (secondVal && firstVal) {
    userInput.value = signs[operatorSign];
    firstVal = userInput.value;
    secondVal = "";
  }
}

// Clear all values
function clearValues() {
  firstVal = "";
  operator = "";
  secondVal = "";
  inputValue = "";
}

// Append Dot
function addDot(dot, value) {
  if (!userInput.value.includes(".")) {
    value += dot;
    userInput.value += dot;
  }
  return value;
}

// Append Number
function addNum(num, value) {
  value += num;
  userInput.value = value;
  span.textContent = value;
  return value;
}
