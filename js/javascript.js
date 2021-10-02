let inputList = [];
let tempValue = '';
let inputLength = 0;
const screenDisplay = document.querySelector('h2');

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

function cutIntoOperateInput () {
    
}

function initialize() {
    initButtons('.button.number');
    initButtons('.button.operator');
    initButtons('.button.cancel');
    initButtons('.button.negative');
    initButtons('.button.decimal');
    initButtons('.button.equal');
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
                case '.button.negative':
                    negativeButton(button.innerHTML);
                    break;
                case '.button.decimal':
                    decimalButton(button.innerHTML);
                    break;
                case '.button.equal':
                    equalButton(button.innerHTML);
                    break;
            }
            console.log(tempValue);
        });
    });
}

function numberButton(value) {
    tempValue += value;
    screenDisplay.textContent += value;
    inputLength++;
}

function operatorButton(value) {
    inputList.push(+tempValue);
    tempValue = 0;

    switch(value) {
        case '÷':
            inputList.push('/');
            inputLength++;
            screenDisplay.textContent += '÷';
            break;
        case '×':
            inputList.push('*');
            inputLength++;
            screenDisplay.textContent += '×';
            break;
        case '+':
            inputList.push('+');
            inputLength++;
            screenDisplay.textContent += '+';
            break;
        case '-':
            inputList.push('-');
            inputLength++;
            screenDisplay.textContent += '-';
            break;
    }
}

function negativeButton(value) {
    console.log(inputList);
}

function decimalButton(value) {
    inputList.push(value);
}

function cancelButton() {
    console.log('Clearing list!');

    for(let i = 0; i < inputList.length; i++ ) {
        inputList.pop();
    }

    screenDisplay.textContent = '';

    console.log('list is now: ' + inputList);
}

function equalButton() {
    inputList.push(+tempValue);
    tempValue = 0;

    inputList.push('=');
    inputLength++;

    screenDisplay.textContent = '';
    console.log('EQUALED!');
}

initialize();