// Script


// Set global variables for the displayed content, operands (num1 and num2), operator, and displayed equation
let displayed = '0';
let num1 =  '';
let operator = '';
let num2 = '';
let equation = '';

// Setup display variables to display content to calculator window
const numberDisplay = document.querySelector('#displayed-number');
numberDisplay.textContent = displayed;
const equationDisplay = document.querySelector('#displayed-equation');
equationDisplay.textContent = equation;

// Add events om keystrokes for relevant keys
window.addEventListener('keydown', handleKeyboardInput)
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') addDecimal();
    if (e.key === '=' || e.key === 'Enter') {
        equals();
        // Prevent the Enter key from selecting a button in focus
        e.preventDefault();
    } 
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === '+' || e.key === '-' || e.key === '/') setOperator(e.key);
    if (e.key === '*') setOperator('x');
}

// Update the displayed string in numberDisplay
function updateDisplayed() {
    displayed = String(displayed);
    // If the string is too big to fit in the display window, convert to exponential notation
    if (displayed.length > 14) {
        displayed = Number.parseFloat(displayed).toExponential(2);
    }
    // If the display string is empty, set it to 0
    if (displayed.length == 0) {
        displayed = '0';
    }
    numberDisplay.textContent = displayed;
}

// Clear all variables/reset calculator
function clearNumber() {
    displayed = '0';
    operator = '';
    num1 = '';
    num2 = '';
    equation = '';
    equationDisplay.textContent = equation;
    updateDisplayed();
}

// Delete the final number on the display
function deleteNumber() {
    // Clear whole display on delete if it is in exponential notation ('e'), Infinity, or NaN
    if (displayed.indexOf('e') != -1 || displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        displayed = '0';
    }
    // Remove final character
    displayed = displayed.slice(0, -1);
    updateDisplayed();
}

// Add events on button click for numberButtons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        appendNumber(e.target.value);
    });
});

// Append the chosen number to the end of the display
function appendNumber(value) {
    // Remove leading 0 if the value is 0
    if (displayed == '0') {
        displayed = '';
    }
    // Exit function if the display is Infinity or NaN
    if (displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        return;
    }
    // If the display is in exponential notation, convert back to a full numeric string before appending number
    if (displayed.indexOf('e') != -1) {
        displayed = parseFloat(displayed);
        // If the value is greater than the max supported value for floats in JavaScript, convert displayed back to a Strong and exit function without appending number
        if (Math.abs(displayed) > 1000000000000000000000n) {
            displayed = String(displayed);
            return;
        }
    }
    displayed = String(displayed);
    displayed += value;
    updateDisplayed();  
}

// Add a decimal to the end of the display
function addDecimal() {
    // If the display is empty, add a leading 0 before decimal
    if (displayed == '') {
        displayed += '0';
    }
    // Exit function without adding decimal if display is in exponential notation ('e'), Infinity, or NaN
    if (displayed.indexOf('e') != -1 || displayed.indexOf('I') != -1 || displayed.indexOf('N') != -1) {
        return;
    }
    // Check to see if there is already a decimal place before adding decimal
    if (displayed.indexOf('.') == -1 ) {
        displayed += '.';
    }
    updateDisplayed();
}

// Add events on button click for operators
const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        setOperator(e.target.value);
    });
});

// Sets global variables for operator and num1/num2
function setOperator(value) {
    // If we have previously selected an operator, set num2 from the display and call operate function
    // Afterwards, update the operator global variable with the new operator and clear display queue
    if (operator != '') {
        num2 = displayed;
        operate();
        operator = value;
        displayed = '';
    // If we do not have a prior operator, set num1 from the display, update the global operator variable, and clear display queue
    } else {
        num1 = displayed;
        operator = value;
        displayed = '';
    }
    // Preview the (incomplete) equation in the equationDisplay
    equation = num1 + ' ' + operator;
    equationDisplay.textContent = equation;
}

// Called on '=' => check to see if we have a full expression before calling the operate function
function equals() {
    if (num1 && operator) {
        num2 = displayed;
        operate();
    }
}

// Call the appropriate operation function with num1 and num2 as arguments
function operate() {
    // Confirm that num1 and num2 are not empty strings before proceeding with operation
    if (num1 && num2) {
        // Display the complete equation in the equationDisplay
        equation = num1 + ' ' + operator + ' ' + num2 + ' = ';
        equationDisplay.textContent = equation;
        // Convert num1 and num2 from strings to floats
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        // Determine which operation function to call and pass num1/num2 as arguments
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
        // After completing operation, reset operator and num2
        operator = '';
        num2 = '';
    }
}

// Perform addition on chosen values, round the result, save the result as num1, and update the display
function add(val1, val2) {
    displayed = val1 + val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

// Perform subtraction on chosen values, round the result, save the result as num1, and update the display
function subtract(val1, val2) {
    displayed = val1 - val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

// Perform multiplication on chosen values, round the result, save the result as num1, and update the display
function multiply(val1, val2) {
    displayed = val1 * val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}

// Perform division on chosen values, round the result, save the result as num1, and update the display
function divide(val1, val2) {
    displayed = val1 / val2;
    displayed = Math.round(displayed * 1000) / 1000;
    num1 = displayed;
    updateDisplayed();
}