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

numberButtons.forEach(number => number.addEventListener('click', function (event) {
    /* monkey patch to clear the dummy display text */
    if (count == 0) {
        displayDiv.textContent = '';
    } count++;
    displayDiv.textContent += event.target.innerText;
    console.log(`display:${displayDiv.textContent}`);
}));

operatorButtons.forEach(operator => operator.addEventListener('click', function (event) {
    displayDiv.textContent += event.target.innerText;
    console.log(`withOperator: ${displayDiv.textContent}`);
    makeNumber(displayDiv.textContent);
    //check for existing pair of numbers
    if (inputArray.length == 3) {
        let ans = operate(inputArray);
        displayDiv.textContent = ans;
        inputArray = [];
        inputArray.push(ans);
        inputArray.push(operator.innerText.charCodeAt());
        count = 0;
    }
    console.table(inputArray);
}));

result.addEventListener('click', function (event) {
    let secondNum = Number(displayDiv.textContent);
    inputArray.push(secondNum);
    let answer = operate(inputArray);
    displayDiv.textContent = answer;
    inputArray = [];
    console.log(`array: ${inputArray}`);
})

acButton.addEventListener('click', () => {
    count = 0;
    displayDiv.textContent = '';
})

function makeNumber(string) {
    console.table(inputArray);
    if (inputArray.length == 2) {
        console.log('aichi');
        let lastNum = Number(string.slice(0, string.length - 1));
        inputArray.push(lastNum);
    } else {
        console.log('pasichi');
        let firstNum = Number(string.slice(0, string.length - 1));
        inputArray.push(firstNum);
        let operator = string.slice(string.length - 1).charCodeAt();
        inputArray.push(operator);
        //clean the display
        displayDiv.textContent = '';
    }
    // console.log(`display: ${displayDiv.textContent}`);
    console.table(inputArray);
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