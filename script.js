const numberButtons = document.querySelectorAll('.numbers');
const displayDiv = document.getElementById('display');
const operatorButtons = document.querySelectorAll('.arithmatic');
const result = document.getElementById('result');
const acButton = document.getElementById('ac');
const navigation = document.getElementById('navigation');
const navigationButtons = navigation.querySelectorAll('.output');
let count = 0;
let latestValue = '';
let inputArray = [];

//disable the '=' button untill number is inputed
result.disabled = true;

//diable selcting opeartor at the beginning
operatorButtons.forEach(operator => operator.disabled = true);

numberButtons.forEach(number => number.addEventListener('click', function (event) {
    /* monkey patch to clear the dummy display text */
    if (count == 0) {
        displayDiv.textContent = '';
    } count++;
    displayDiv.textContent += event.target.innerText;
    latestValue += event.target.innerText;
    result.disabled = false;
    operatorButtons.forEach(operator => operator.disabled = false);
}));

operatorButtons.forEach(operator => operator.addEventListener('click', function (event) {
    displayDiv.textContent += event.target.innerText;
    latestValue += event.target.innerText;

    splitInput(latestValue);
    //check for existing pair of numbers

    if (inputArray.length == 3) {
        let ans = operate(inputArray);
        //check for division by zero
        if (typeof ans == 'string') {
            displayDiv.textContent = ans;
            enableOnlyACbutton();
        } else {
            displayDiv.textContent = String(ans) + event.target.innerText;
            inputArray = [];
            inputArray.push(ans);
            inputArray.push(operator.innerText.charCodeAt());
            latestValue = '';
        }
    }
}));

result.addEventListener('click', function (event) {
    let secondNum = Number(latestValue);
    inputArray.push(secondNum);
    let answer = operate(inputArray);
    if (typeof answer == 'string') enableOnlyACbutton();
    displayDiv.textContent = String(answer);
    latestValue = answer;
    inputArray = [];
})

acButton.addEventListener('click', () => {
    console.log('khi khi');
    count = 0;
    displayDiv.textContent = '';
    displayDiv.textContent = '0';
    latestValue = '';
    inputArray = [];
    reEnableValidButtons();
})

function splitInput(string) {
    if (inputArray.length == 2) {
        let lastNum = Number(string.slice(0, string.length - 1));
        inputArray.push(lastNum);
    } else {
        let firstNum = Number(string.slice(0, string.length - 1));
        inputArray.push(firstNum);
        let operator = string.slice(string.length - 1).charCodeAt();
        inputArray.push(operator);
        //clear the latest value
        latestValue = '';
    }
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
            let ans = 0;
            if (array[2] == 0) {
                return 'Are Murkha!';
            } else {
                ans = array[0] / array[2];
                ans = ans.toFixed(3);
                return Number(ans);
            }
            break;

        //ascii code of html entity &times    
        case 215:
            return array[0] * array[2];
            break;
    }
}

//only AC button valid to RESET after divison by zero
function enableOnlyACbutton() {
    numberButtons.forEach(number => number.disabled = true);
    operatorButtons.forEach(operator => operator.disabled = true);
    navigationButtons.forEach(navButton => {
        if (!(navButton.getAttribute('id') == 'ac')) navButton.disabled = true;
    })
}

function reEnableValidButtons() {
    numberButtons.forEach(number => number.disabled = false);
    operatorButtons.forEach(operator => operator.disabled = true);
    navigationButtons.forEach(navButton => {
        if (!(navButton.getAttribute('id') == 'ac')) navButton.disabled = true;
    });
}