const numberButtons = document.querySelectorAll('.numbers');
const displayDiv = document.getElementById('display');
const operatorButtons = document.querySelectorAll('.arithmatic');
let count = 0;

console.log(numberButtons);
console.log(displayDiv);
console.log(operatorButtons);

numberButtons.forEach(number => number.addEventListener('click', function(event) {
    /* monkey patch to clear the dummy display text */
    if(count == 0) {
        displayDiv.textContent = '';
    } count++; 
    display(event);
}));

operatorButtons.forEach(operator => operator.addEventListener('click', function(event) {
    displayDiv.textContent += event.target.innerText;
    console.log(displayDiv.textContent);
    makeNumber(displayDiv.textContent);
}));

function makeNumber(string) {
    let firstNum = Number(string.slice(0, string.length-1)); 
    console.log(firstNum, typeof firstNum);
    let operator = string.slice(string.length-1);
    console.log(operator,typeof operator);
};

function display(event) {
    displayDiv.textContent += event.target.innerText;
};

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case '+':
            return firstNum + secondNum;
            break;

        case '-':
            return firstNum - secondNum;
            break;

        case '/':
            return firstNum / secondNum;
            break;

        case '*':
            return firstNum * secondNum;
            break;
    }
}