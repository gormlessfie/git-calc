const once = {
    once : true
};

let inputList = [];
let tempValue = '';

const screenDisplay = document.querySelector('h2');
const history = document.querySelector('h3');
const decButton = document.querySelector('.button.decimal');
const negButton = document.querySelector('.button.negative');

function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function multiply(numberOne, numberTwo) {
    return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    if(numberOne == 0 && numberTwo !== 0) {
        return 0;
    } else if(Number.isNaN(numberOne / numberTwo)){
        return alert('Error! Dividing by 0 is not allowed.');
    } else {
        return numberOne / numberTwo;
    }
}

function operate(operator, values) {
    switch (operator) {
        case '*':
            return multiply(values[0], values[2]);
        case '/':
            return divide(values[0], values[2]);
        case '+':
            return add(values[0], values[2]);
        case '-':
            return subtract(values[0], values[2]);
    }
}

function cutIntoOperateInput() {

}

function initialize() {
    initButtons('.button.number');
    initButtons('.button.operator');
    initButtons('.button.cancel');
    initButtons('.button.negative');
    initButtons('.button.decimal');
    initButtons('.button.equal');

    decButton.addEventListener('click', () => {
        decimalButton(decButton.innerHTML);
    }, once);
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
            console.log(inputList);
        });
    });
}

function numberButton(value) {
    tempValue += value;
    screenDisplay.textContent += value;
}

function operatorButton(value) {
    inputList.push(+tempValue);
    tempValue = 0;

    switch(value) {
        case '÷':
            inputList.push('/');
            screenDisplay.textContent += '÷';

            decButton.addEventListener('click', () => {
                decimalButton(decButton.innerHTML);
            }, once);
            break;
        case '×':
            inputList.push('*');
            screenDisplay.textContent += '×';

            decButton.addEventListener('click', () => {
                decimalButton(decButton.innerHTML);
            }, once);
            break;
        case '+':
            inputList.push('+');
            screenDisplay.textContent += '+';

            decButton.addEventListener('click', () => {
                decimalButton(decButton.innerHTML);
            }, once);
            break;
        case '-':
            inputList.push('-');
            screenDisplay.textContent += '-';

            decButton.addEventListener('click', () => {
                decimalButton(decButton.innerHTML);
            }, once);
            break;
    }
}

function negativeButton(value) {
    tempValue = value.concat(tempValue);
}

function decimalButton(value) {
    tempValue += value;
    screenDisplay.textContent += '.';
}

function cancelButton() {
    console.log('Clearing list!');

    inputList.length = 0;
    screenDisplay.textContent = '';
    history.textContent = '';
    console.log('list is now: ' + inputList);

        decButton.addEventListener('click', () => {
        decimalButton(decButton.innerHTML);
    }, once);
}

function equalButton() {
    inputList.push(+tempValue);
    inputList.push('=');

    tempValue = '';
    screenDisplay.textContent = '';

    decButton.addEventListener('click', () => {
        decimalButton(decButton.innerHTML);
    }, once);

    updateLog();
}

function updateLog() {
    let log = inputList;
    log = log.reduce((string, current) => {
        return string + current.toString();
    });

    history.textContent = log;
}

initialize();