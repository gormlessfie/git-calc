const once = {
    once : true
};

let listOfOperations = [];
let adjustedList = [];
let screenValue = '';
let input = '';
let pressed = false;



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
    }
    console.log(array);
}

function numberButton(value) {
    if(screenValue !== input) {
        screenValue = '';
        screenDisplay.textContent = screenValue;
    }
    input += value;
    updateScreen(value);
}

function operatorButton(value) {
    if(!pressed) {
        perButton(value);
        updateScreen(value);
        
        pressed = true;
        console.log(pressed);
    } else {
        perButton(value);
        pressed = false;
        
        console.log(pressed);
        adjustedList = listOfOperations.splice(0, listOfOperations.length -1);
        screenValue = '';
        screenDisplay.textContent = screenValue;
        let result = writeValueIntoArray();
        updateScreen(result);
        updateScreen(value);

    }
}

function perButton(value) {
    switch(value) {
        case '÷':
            pushArray('/', listOfOperations);
            initDecimalButton();
            break;

        case '×':
            pushArray('*', listOfOperations);
            initDecimalButton();
            break;

        case '+':
            pushArray('+', listOfOperations);
            initDecimalButton();
            break;

        case '-':
            pushArray('-', listOfOperations);
            initDecimalButton();
            break;
    }
}

function negativeButton() {
    console.log(listOfOperations);
}

function initNegativeButton() {
    if(negButton.get)
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
    clearHistory();
}

function equalButton() {
    console.log(input);
    pushArray('=', listOfOperations);
    adjustedList = listOfOperations.splice(0, listOfOperations.length -1);

    let result = writeValueIntoArray();
    clearHistory();
    updateScreen(result);
}

function clearHistory() {
    listOfOperations.length = 0;
    adjustedList.length = 0;
    screenValue = '';
    screenDisplay.textContent = screenValue;
    input = '';
    pressed = false;
}

function writeValueIntoArray() {
    let splicedArray = spliceArray(adjustedList, 0);
    console.log(splicedArray);

    let result = calculateArray(splicedArray);
    console.log(result);

    adjustedList.splice(0, 0, result);

    listOfOperations.splice(0,0,adjustedList[0]);
    console.log(adjustedList);

    return result;
}

function calculateArray(array) {
    return operate(array);
}
function spliceArray(list, index) {
    return list.splice(index, 3);
}

function updateScreen(value) {
    screenValue += value;
    screenDisplay.textContent = screenValue;
}

initialize();