let answer = 0;
let fuse = false;
let underCharacterLimit = true;
let inputLength = 0;
let dummyValueHolder = '';
let firstNumber, secondNumber = 0;
let operator = '';

const displayDiv = document.querySelector('.display-div');
const allButtons = document.querySelectorAll('.button-input');
const digitButtons = document.querySelectorAll('.digit-button');
const nonDigitButtons = document.querySelectorAll('.non-digit');
const resultButton = document.querySelector('#equal');
const acButton = document.querySelector('#ac');

//disable non-digit keys until a digit is clicked
nonDigitButtons.forEach(button => {
    button.disabled = true;
    button.classList.remove('click-effect');
});

allButtons.forEach(button => button.addEventListener('click', function (e) {
    console.log(`Pressed key: ${button.getAttribute('id')}`);
    // console.log(`Prevailing Class: ${button.getAttribute('class')}`);

    if (checkInput(e)) {
        if (!fuse) {
            displayDiv.textContent = button.textContent;
            fuse = true;

            nonDigitButtons.forEach(button => {
                button.disabled = false;
                button.classList.add('click-effect');
            })
        } else displayDiv.textContent += button.textContent;

    } else {
        console.log('Overflow reached');
        digitButtons.forEach(button => button.disabled = true);
        displayDiv.textContent += button.textContent;

        if (/ non-digit /.test(button.className)) {
            console.log('unlocked');
            digitButtons.forEach(button => button.disabled = false);
            inputLength = 13;
        }
    }
}))

resultButton.addEventListener('click', function () {
    console.log('banaste dakila gaja');
    if (checkExpression()) {
        console.log('mo bhai munda re suna kalasa');
        dummyValueHolder = displayDiv.textContent.substring(0, displayDiv.textContent.length - 1);
        console.log(`Eithu haba khela: ${dummyValueHolder}`);
        const charArr = dummyValueHolder.split(/[+-\/*]/);
        console.table(charArr);

        let operatorPositionIndex = 0;
        operatorPositionIndex = dummyValueHolder.search(/[+-\/*]/);

        operator = dummyValueHolder.charAt(operatorPositionIndex);
        firstNumber = + charArr[0];
        secondNumber = + charArr[1];
        console.log(`first number: ${firstNumber}`);
        console.log(`operator: ${operator}`);
        console.log(`second number: ${secondNumber}`);

        answer = operate(firstNumber, operator, secondNumber);
        console.log(`Answer is: ${answer}`);
        displayDiv.textContent = answer;
    }
    else {
        displayDiv.textContent = displayDiv.textContent.substring(0, displayDiv.textContent.length - 1);
        console.log('akala kusmanda');
    }
})

acButton.addEventListener('click', function () {
    answer = 0;
    fuse = false;
    underCharacterLimit = true;
    inputLength = 0;
    dummyValueHolder = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = '';

    displayDiv.textContent = 0;
})

function checkInput(e) {
    preventMultiOperator(e);

    if (inputLength < 14) {
        inputLength++;
        return true;
    } else return false;
}

function preventMultiOperator(e) {
    if (/ non-digit /.test(e.target.className)) {
        // console.log('multi operator prevented');
        nonDigitButtons.forEach(button => button.disabled = true);
    }

    if (/ digit-button/.test(e.target.className)) {
        // console.log('operator puni leutile');
        nonDigitButtons.forEach(button => button.disabled = false);
    }
}

function checkExpression() {
    let currentExpression = displayDiv.textContent;
    let expressionLength = currentExpression.length;
    currentExpression = currentExpression.substring(0, expressionLength - 1);

    console.log(`Current expression: ${displayDiv.textContent}`);
    console.log(`Dekha re toka: ${currentExpression}`);

    if (/[*+\/-]/.test(currentExpression)) return true;
    else return false;
}

function operate(firstNumber, operation, secondNumber) {
    let result = 0;
    switch (operation) {
        case '+':
            result = add(firstNumber, secondNumber);
            console.log(result);
            break;

        case '-':
            result = sub(firstNumber, secondNumber);
            console.log(result);
            break;

        case '/':
            result = div(firstNumber, secondNumber);
            console.log(result);
            break;

        case '*':
            result = multi(firstNumber, secondNumber);
            console.log(result);

        default:
            break;
    }
    return result;
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function div(a, b) {
    return a / b;
}

function multi(a, b) {
    return a * b;
}