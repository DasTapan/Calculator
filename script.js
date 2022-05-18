const numberButtons = document.querySelectorAll('.numbers');
const displayDiv = document.getElementById('display');
let count = 0;
console.log(numberButtons);
console.log(displayDiv);

numberButtons.forEach(number => number.addEventListener('click', function(event) {
    /* monkey patch to clear the dummy display text */
    if(count == 0) {
        displayDiv.textContent = '';
    } count++; 
    display(event);
}));

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