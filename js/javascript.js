const once = {
    once : true
};

let longList = [];
let screenValue = '';
let input = '';

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

function operate(arrayWithInfo) {
    switch (arrayWithInfo[1]) {
        case '*':
            return multiply(arrayWithInfo[0], arrayWithInfo[2]);
        case '/':
            return divide(arrayWithInfo[0], arrayWithInfo[2]);
        case '+':
            return add(arrayWithInfo[0], arrayWithInfo[2]);
        case '-':
            return subtract(arrayWithInfo[0], arrayWithInfo[2]);
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

function pushArray(operator, array) {
    if(!input == 0) {
        array.push(+input);
        array.push(operator);
        input = '';
    } else {
        array.push(operator);
    }
}

function numberButton(value) {
    input += value;
    updateScreen(value);
}

function operatorButton(value) {
    perButton(value);
    updateScreen(value);
}

function perButton(value) {
    switch(value) {
        case '÷':
            pushArray('/', longList);
            break;

        case '×':
            pushArray('*', longList);
            break;

        case '+':
            pushArray('+', longList);
            break;

        case '-':
            pushArray('-', longList);
            break;
    }
    console.log(longList);
}

function negativeButton(value) {
    if(!input.includes('-')) {
        input = value.concat(input);

        updateScreen(value);

        console.log(input);
        console.log(screenValue);
    } else {
        input = input.slice(1);
        updateScreen(value);
    }
}

function initNegativeButton() {
    negButton.addEventListener('click', () => {
        negativeButton('-');
    });
}

function decimalButton(value) {
    if(!input.includes('.')) {
        input += value;
        updateScreen(value);
    } else {

    }
}

function initDecimalButton() {
    decButton.addEventListener('click', () => {
        decimalButton(decButton.innerHTML);
    });
}

function cancelButton() {
    clearHistory();
}

function equalButton() {
    longList.push(+input);
    let result = calculateAndReplace(longList)[0];
    result.toFixed(8);
    input = '';

    screenValue = '';
    screenValue = result;
    screenDisplay.textContent = screenValue;

    longList.length = 0;
    longList.push(result);
}

function calculateAndReplace(listOfOperations) {
    let exp;
    let result;

    while(listOfOperations.includes('*')) {
    exp = listOfOperations.splice(getLocation(listOfOperations, '*'), 3, 'placeholder');
    result = operate(exp);
    
    listOfOperations.splice(listOfOperations.indexOf('placeholder'), 1, result);
    }

    while(listOfOperations.includes('/')) {
        exp = listOfOperations.splice(getLocation(listOfOperations, '/'), 3, 'placeholder');
        result = operate(exp);
        
        listOfOperations.splice(listOfOperations.indexOf('placeholder'), 1, result);
    }

    while(listOfOperations.includes('+')) {
        exp = listOfOperations.splice(getLocation(listOfOperations, '+'), 3, 'placeholder');
        result = operate(exp);
        
        listOfOperations.splice(listOfOperations.indexOf('placeholder'), 1, result);
    }

    while(listOfOperations.includes('-')) {
        exp = listOfOperations.splice(getLocation(listOfOperations, '-'), 3, 'placeholder');
        result = operate(exp);
        
        listOfOperations.splice(listOfOperations.indexOf('placeholder'), 1, result);
    }

    return listOfOperations;
}

function getLocation(list, operator) {
    return (list.indexOf(operator) - 1);
}

function clearHistory() {
    longList.length = 0;
    screenValue = '';
    screenDisplay.textContent = screenValue;
    input = '';
}

function updateScreen(value) {
    if(value == '-') {
        if(screenValue.includes('-')) {
            screenValue = screenValue.slice(1);
            screenDisplay.textContent = screenValue;
        } else {
            screenValue = value.concat(screenValue);
            screenDisplay.textContent = screenValue;
        }
    } else {
        screenValue += value;
        screenDisplay.textContent = screenValue;
    }
}

initialize();