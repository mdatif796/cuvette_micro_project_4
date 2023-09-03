let res = document.getElementById("result");

let btns = document.getElementsByClassName("btn");
btns = Array.from(btns);

let expressionContainer = [];

let isOperator = false;

const setResult = () => {
  return expressionContainer.length ? expressionContainer.join("") : 0;
};

const evaluate = () => {
  if (isOperator) {
    return;
  }
  let ans = expressionContainer.length ? eval(expressionContainer.join("")) : 0;
  res.innerText = ans;
  expressionContainer = [ans];
  isOperator = false;
};

const checkOperator = (operator) => {
  if (
    !expressionContainer.length ||
    isOperator ||
    expressionContainer[expressionContainer.length - 1] == "."
  ) {
    return;
  }

  if (expressionContainer[expressionContainer.length - 1] == operator) {
    return;
  }
  expressionContainer.push(` ${operator} `);
  isOperator = true;
  res.innerText = setResult();
};

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "=":
        evaluate();
        break;
      case ".":
        expressionContainer.length &&
          expressionContainer[expressionContainer.length - 1] != "." &&
          expressionContainer.push(".");
        res.innerText = setResult();
        break;
      case "RESET":
        res.innerText = 0;
        isOperator = false;
        expressionContainer = [];
        break;
      case "x":
        checkOperator("*");
        break;
      case "+":
        checkOperator("+");
        break;
      case "-":
        checkOperator("-");
        break;
      case "/":
        checkOperator("/");
        break;
      case "DEL":
        let last = expressionContainer.pop();
        if (/[*-/+]/.test(last)) {
          isOperator = false;
        }
        res.innerText = setResult();
        break;
      default:
        expressionContainer.push(e.target.innerText);
        isOperator = false;
        res.innerText = setResult();
        break;
    }
  });
});
