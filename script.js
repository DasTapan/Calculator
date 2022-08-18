let answer = 0;
let fuse = false;

const displayDiv = document.querySelector('.display-div');
const allButtons = document.querySelectorAll('.button-input');

allButtons.forEach(button => button.addEventListener('click', function() {
    console.log(`Pressed key: ${button.getAttribute('id')}`);
    if(!fuse) {
        displayDiv.textContent = button.textContent;
        fuse = true;
    } else displayDiv.textContent += button.textContent;

}))

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