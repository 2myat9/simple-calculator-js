let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const display = document.querySelector(".display");

display.innerText = buffer;

document.querySelector(".controls").addEventListener("click", function (event) {
  // to distinguish symbols and numbers, check if data attribute "symbol" exists
  if (event.target.dataset.symbol) {
    buttonClick(event.target.dataset.symbol);
  } else {
    buttonClick(event.target.innerText);
  }
});

const buttonClick = (value) => {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
};

const handleSymbol = (value) => {
  switch (value) {
    case "AC":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "equal":
      if (previousOperator == null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;

      // add "" to render buffer as a string
      buffer = `${runningTotal}`;
      runningTotal = 0;
      break;
    case "backspace":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
};

const handleNumber = (value) => {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
};

const handleMath = (value) => {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
};

const flushOperation = (intBuffer) => {
  switch (previousOperator) {
    case "add":
      runningTotal += intBuffer;
      break;
    case "subtract":
      runningTotal -= intBuffer;
      break;
    case "multiply":
      runningTotal *= intBuffer;
      break;
    case "divide":
      runningTotal /= intBuffer;
      break;
  }
};

const reRender = () => {
  display.innerText = buffer;
};
