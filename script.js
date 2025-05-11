const display = document.getElementById('display');
let current = '0';
let operator = null;
let operand = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = current;
}

function inputDigit(digit) {
  if (resetNext) {
    current = digit;
    resetNext = false;
  } else {
    current = current === '0' ? digit : current + digit;
  }
  updateDisplay();
}

function inputDot() {
  if (!current.includes('.')) {
    current += '.';
    updateDisplay();
  }
}

function clearAll() {
  current = '0';
  operator = null;
  operand = null;
  resetNext = false;
  updateDisplay();
}

function backspace() {
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
  updateDisplay();
}

function inputOperator(op) {
  if (operator && !resetNext) {
    compute();
  }
  operand = parseFloat(current);
  operator = op;
  resetNext = true;
}

function compute() {
  if (!operator || operand === null) return;
  let result = 0;
  const num = parseFloat(current);
  switch (operator) {
    case '+': result = operand + num; break;
    case '-': result = operand - num; break;
    case '*': result = operand * num; break;
    case '/': result = num === 0 ? 'Error' : operand / num; break;
    default: result = num;
  }
  current = (result === 'Error') ? 'Error' : parseFloat(result.toFixed(8)).toString();
  operator = null;
  operand = null;
  resetNext = true;
  updateDisplay();
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  updateDisplay();
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    if (!isNaN(action)) {
      inputDigit(action);
    } else if (action === '.') {
      inputDot();
    } else if (['+', '-', '*', '/'].includes(action)) {
      inputOperator(action);
    } else if (action === '=') {
      compute();
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'back') {
      backspace();
    } else if (action === 'percent') {
      percent();
    }
  });
});

updateDisplay();
