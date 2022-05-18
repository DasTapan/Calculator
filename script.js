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