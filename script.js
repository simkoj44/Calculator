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

function updateDisplayed() {
    displayed = String(displayed);

    if (displayed.indexOf('.') != -1) {
        if ((displayed.length - (displayed.indexOf('.')) - 1) > 4) {
            value = parseFloat(displayed);
            rounded = value.toFixed(4);
            displayed = String(rounded);
        }
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
    displayed = displayed.slice(0, -1);
    updateDisplayed();
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (displayed == 'Error: Dividing by 0') {
            displayed = '0';
        }
        if (displayed == '0') {
            displayed = '';
        }
        displayed += e.target.value;
        updateDisplayed();  
    });
});

function addDecimal() {
    if (displayed == 'Error: Dividing by 0') {
        displayed = '0';
    }
    if (displayed == '') {
        displayed += '0';
    }
    if (displayed.indexOf('.') == -1 ) {
        displayed += '.';
    }
    updateDisplayed();
}

const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (operator != '') {
            num2 = displayed;
            operate();
            operator = e.target.value;
            displayed = '';
        } else {
            num1 = displayed;
            operator = e.target.value;
            displayed = '';
        }
        equation = num1 + ' ' + operator;
        equationDisplay.textContent = equation;
    });
});

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
    num1 = displayed;
    updateDisplayed();
}

function subtract(val1, val2) {
    displayed = val1 - val2;
    num1 = displayed;
    updateDisplayed();
}

function multiply(val1, val2) {
    displayed = val1 * val2;
    num1 = displayed;
    updateDisplayed();
}

function divide(val1, val2) {
    if (val2 == 0) {
        displayed = "Error: Dividing by 0";
        num1 = '';
        num2 = '';
        operator = '';
        updateDisplayed();
        return;
    }
    displayed = val1 / val2;
    num1 = displayed;
    updateDisplayed();
}