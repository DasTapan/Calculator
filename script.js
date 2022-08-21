let answer = 0;
let fuse = false;
let underCharacterLimit = true;
let inputLength = 0;

const displayDiv = document.querySelector('.display-div');
const allButtons = document.querySelectorAll('.button-input');
const digitButtons = document.querySelectorAll('.digit-button');
const nonDigitButtons = document.querySelectorAll('.non-digit');
const resultButton = document.querySelector('#equal');

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
    }
    else console.log('akala kusmanda');
})

function checkInput(e) {
    preventMultiOperator(e);

    if (inputLength < 14) {
        inputLength++;
        return true;
    } else return false;
}

function preventMultiOperator(e) {
    if (e.target.className.match(/ non-digit /)) {
        console.log('multi operator prevented');
        nonDigitButtons.forEach(button => button.disabled = true);
    }

    if (e.target.className.match(/ digit-button/)) {
        console.log('operator puni leutile');
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
    switch (operation) {
        case '+':
            answer = add(firstNumber, secondNumber);
            console.log(answer);
            break;

        case '-':
            answer = sub(firstNumber, secondNumber);
            console.log(answer);
            break;

        case '/':
            answer = div(firstNumber, secondNumber);
            console.log(answer);
            break;

        case '*':
            answer = multi(firstNumber, secondNumber);
            console.log(answer);

        default:
            break;
    }
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