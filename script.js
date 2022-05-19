const numberButtons = document.querySelectorAll('.numbers');
const displayDiv = document.getElementById('display');
const operatorButtons = document.querySelectorAll('.arithmatic');
const result = document.getElementById('result');
const acButton = document.getElementById('ac');
let count = 0;
let inputArray = [];

// console.log(numberButtons);
// console.log(displayDiv);
// console.log(operatorButtons);

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

result.addEventListener('click', function(event) {
    let secondNum = Number(displayDiv.textContent);
    console.log(secondNum, typeof secondNum);
    inputArray.push(secondNum);
    console.table(inputArray);
    let answer = operate(inputArray);
    console.log(answer);
    displayDiv.textContent = answer;
    inputArray = [];
})

acButton.addEventListener('click',() => {
    count = 0;
    displayDiv.textContent = '';
})

function makeNumber(string) {
    let firstNum = Number(string.slice(0, string.length-1));
    inputArray.push(firstNum); 
    let operator = string.slice(string.length-1).charCodeAt();
    inputArray.push(operator);
    console.table(inputArray);
    //clean the display
    displayDiv.textContent = '';
};

function display(event) {
    displayDiv.textContent += event.target.innerText;
};

function operate(array) {
    switch (array[1]) {
        //ascii code of html entity &plus
        case 43:
            return array[0] + array[2];
            break;
        //ascii code of html entity &minus    
        case 8722:
            return array[0] - array[2];
            break;
        
        //ascii code of html entity &divide    
        case 247:
            return array[0] / array[2];
            break;
        
        //ascii code of html entity &times    
        case 215:
            return array[0] * array[2];
            break;
    }
}