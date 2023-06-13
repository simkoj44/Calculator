// Script

let displayed = '0';
let num1 =  '';
let operator = '';
let num2 = '';
let equation = '';

const numberDisplay = document.querySelector('#displayed-number');
numberDisplay.textContent = displayed;

const equationDisplay = document.querySelector('#displayed-equation');
equationDisplay.textContent = equation;

window.addEventListener('keydown', handleKeyboardInput)
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') addDecimal();
    if (e.key === '=' || e.key === 'Enter') equals();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === '+' || e.key === '-' || e.key === '/') setOperator(e.key);
    if (e.key === '*') setOperator('x');
}

function updateDisplayed() {
    displayed = String(displayed);
    if (displayed.length > 14) {
        displayed = Number.parseFloat(displayed).toExponential(2);
    }
    if (displayed.length == 0) {
        displayed = '0';
    }
    numberDisplay.textContent = displayed;
}

function clearNumber() {
    displayed = '0';
    operator = '';
    num1 = '';
    num2 = '';
    updateDisplayed();

    equation = '';
    equationDisplay.textContent = equation;
}

function deleteNumber() {
    // Clear number on delete if it is in exponential notation ('e'), Infinity, or NaN
    if (displayed.indexOf('e') != -1 || displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        displayed = '0';
    }

    // Remove final character
    displayed = displayed.slice(0, -1);
    updateDisplayed();
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        appendNumber(e.target.value);
    });
});

function appendNumber(value) {
    if (displayed == '0') {
        displayed = '';
    }
    if (displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        return;
    }
    if (displayed.indexOf('e') != -1) {
        displayed = parseFloat(displayed);
        if (displayed > 1000000000000000000000n) {
            displayed = String(displayed);
            return;
        }
    }
    displayed = String(displayed);
    displayed += value;
    updateDisplayed();  
}

function addDecimal() {
    if (displayed == '') {
        displayed += '0';
    }
    if (displayed.indexOf('e') != -1 || displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        return;
    }
    if (displayed.indexOf('.') == -1 ) {
        displayed += '.';
    }
    updateDisplayed();
}

const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        setOperator(e.target.value);
    });
});

function setOperator(value) {
    if (operator != '') {
        num2 = displayed;
        operate();
        operator = value;
        displayed = '';
    } else {
        num1 = displayed;
        operator = value;
        displayed = '';
    }
    equation = num1 + ' ' + operator;
    equationDisplay.textContent = equation;
}

function equals() {
    if (num1 && operator) {
        num2 = displayed;
        operate();
    }
}

function operate() {
    if (num1 && num2) {

        equation = num1 + ' ' + operator + ' ' + num2 + ' = ';
        equationDisplay.textContent = equation;

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        
        switch (operator) {
            case '+':
                add(num1, num2);
                break;
            case '-':
                subtract(num1, num2);
                break;
            case 'x':
                multiply(num1, num2);
                break;
            case '/':
                divide(num1, num2);
                break;
            default:
                break;
        }
        operator = '';
        num2 = '';
    }
}

function add(val1, val2) {
    displayed = val1 + val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

function subtract(val1, val2) {
    displayed = val1 - val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

function multiply(val1, val2) {
    displayed = val1 * val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

function divide(val1, val2) {
    displayed = val1 / val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}