const once = {
    once : true
};

let listOfOperations = [];
let setOfValues = [];
let screenValue = '';
let input = '';
let firstNum = 0;



const screenDisplay = document.querySelector('h2');
const history = document.querySelector('h3');
const decButton = document.querySelector('.button.decimal');
const negButton = document.querySelector('.button.negative');

function add(input, numberTwo) {
    return input + numberTwo;
}

function subtract(input, numberTwo) {
    return input - numberTwo;
}

function multiply(input, numberTwo) {
    return input * numberTwo;
}

function divide(input, numberTwo) {
    if(input == 0 && numberTwo !== 0) {
        return 0;
    } else if(Number.isNaN(input / numberTwo)){
        return screenDisplay.textContent('NaN NOT ALLOWED');
    } else {
        return input / numberTwo;
    }
}

function operate(operator, value) {
    switch (operator) {
        case '*':
            return multiply(firstNum, value);
        case '/':
            return divide(firstNum, value);
        case '+':
            return add(firstNum, value);
        case '-':
            return subtract(firstNum, value);
    }
}

function initialize() {
    initButtons('.button.number');
    initButtons('.button.operator');
    initButtons('.button.cancel');
    initButtons('.button.decimal');
    initButtons('.button.equal');

    initDecimalButton();
    initNegativeButton();
}

function initButtons(buttonType) {
    const buttons = document.querySelectorAll(buttonType);
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            switch(buttonType) {
                case '.button.number':
                    numberButton(button.innerHTML);
                    break;
                case '.button.operator':
                    operatorButton(button.innerHTML);
                    break;
                case '.button.cancel':
                    cancelButton();
                    break;
                case '.button.equal':
                    equalButton(button.innerHTML);
                    break;
            }
        });
    });
}

function createArray(operator, array) {
    if(!input == 0) {
        array.push(+input);
        array.push(operator);
        firstNum = +input;
        
        listOfOperations.push(array);
        input = '';
    }
}

function numberButton(value) {
    input += value;

    updateScreen(value);
    console.log(input);
}

function operatorButton(value) {
    let tempOp = [];

    switch(value) {
        case '÷':
            createArray('/', tempOp);

            initDecimalButton();
            break;

        case '×':
            createArray('*', tempOp);
            
            initDecimalButton();
            break;

        case '+':
            createArray('+', tempOp);

            initDecimalButton();
            break;

        case '-':
            createArray('-', tempOp);
            
            initDecimalButton();
            break;
    }
    updateScreen(value);
}

function negativeButton() {
    console.log(setOfValues);
    console.log(listOfOperations);
}

function initNegativeButton() {
    negButton.addEventListener('click', () => {
        negativeButton();
    });
}

function decimalButton(value) {
    input += value;
    updateScreen(value);
}

function initDecimalButton() {
    decButton.addEventListener('click', () => {
        decimalButton(decButton.innerHTML);
    }, once);
}

function cancelButton() {

}

function equalButton() {
    let tempOp = [];
    createArray('=', tempOp);

    firstNum = listOfOperations[0][0];
    screenValue = listOfOperations.reduce ((total, current) => {
        return total + operate(current[0], current[1]);
    })
    console.log(screenValue);
}

function updateLog() {
    let log = inputList;
    log = log.reduce((string, current) => {
        return string + current.toString();
    });

    history.textContent = log;
}

function updateScreen(value) {
    screenValue += value;
    screenDisplay.textContent = screenValue;
}

initialize();