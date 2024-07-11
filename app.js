const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    if (event.target.classList.contains('number')) {
      handleNumber(value);
    }

    if (event.target.classList.contains('operator')) {
      handleOperator(value);
    }

    if (event.target.classList.contains('equals')) {
      handleEquals();
    }

    if (value === 'C') {
      clearDisplay();
    }
  });
});

function handleNumber(number) {
  if (waitingForSecondOperand) {
    currentInput = number;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? number : currentInput + number;
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = compute(firstOperand, inputValue, operator);
    currentInput = `${result}`;
    firstOperand = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
  updateDisplay();
}

function handleEquals() {
  const inputValue = parseFloat(currentInput);

  if (operator && !waitingForSecondOperand) {
    const result = compute(firstOperand, inputValue, operator);
    currentInput = `${result}`;
    firstOperand = result;
    operator = null;
  }

  updateDisplay();
}

function compute(firstOperand, secondOperand, operator) {
  if (isNaN(firstOperand) || isNaN(secondOperand)) return;

  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function updateDisplay() {
  display.innerText = currentInput;
}

function clearDisplay() {
  currentInput = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}