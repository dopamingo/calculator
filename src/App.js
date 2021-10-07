"use strict";

function App() {

  let firstValue = "",
  secondValue = "",
  readySecond = false,
  operator = "",
  displayValue = "0";

  const $ = (selector) => document.querySelector(selector);

  const addNumber = (clickedNumber) => {
    if (!readySecond) {
      if (clickedNumber === "sign") {
        if (firstValue === "") {
          firstValue = "-"
          displayValue = "-0";
        }
        else if (firstValue === "-"){
          firstValue = "";
          displayValue = "0";
        } else {
          firstValue *= -1;
          displayValue = firstValue;
        }
      } else {
        firstValue += clickedNumber;
        displayValue = firstValue;
      }
      $(".display").innerHTML = displayValue;
    } else {
      if (clickedNumber === "sign") {
        if (secondValue === "") {
          secondValue = "-"
          displayValue = "-0";
        }
        else if (secondValue === "-"){
          secondValue = "";
          displayValue = "0";
        } else {
          secondValue *= -1;
          displayValue = secondValue;
        }
      } else {
        secondValue += clickedNumber;
        displayValue = secondValue;
      }
      $(".display").innerHTML = displayValue;
    }
  }

  const addOperator = (clickedOperator) => {
    if (!firstValue)
      return;
    if (!readySecond)
      readySecond = true;
    calculate();
    operator = clickedOperator;
    secondValue = "";
  }

  const calculate = () => {
    if (!secondValue)
      return;
    switch (operator) {
      case "+":
        displayValue = parseInt(firstValue) + parseInt(secondValue);
        break;
      case "-":
        displayValue = parseInt(firstValue) - parseInt(secondValue);
        break;
      case "/":
        displayValue = parseInt(firstValue) / parseInt(secondValue);
        break;
      case "*":
        displayValue = parseInt(firstValue) * parseInt(secondValue);
        break;
      default:
        displayValue;
    }
    $(".display").innerHTML = displayValue;
    firstValue = displayValue;
  }

  const enter = () => {
    if (!readySecond || !secondValue) {
      firstValue = "";
      operator = "";
      readySecond = false;
    }
    calculate();
  }

  const clear = () => {
    firstValue = "";
    secondValue = "";
    readySecond = false;
    operator = "";
    displayValue = "0"
    $(".display").innerHTML = displayValue;
  }

  $(".calculator").addEventListener("click", (e) => {
    if (e.target.nodeName !== 'BUTTON')
      return;
    if (e.target.classList.contains('number'))
      addNumber(e.target.value);
    if (e.target.classList.contains('operator'))
      addOperator(e.target.value);
    if (e.target.classList.contains('enter'))
      enter();
    if (e.target.classList.contains('clear'))
      clear();
    console.log(`${firstValue} ${operator} ${secondValue} readyNext: ${readySecond} display: ${displayValue}`);
  });
 
};

App();