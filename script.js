// Script

let displayed = ['0'];
const display = document.querySelector('#displayed-number');
display.textContent = displayed;

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (displayed[0] == '0') {
            if (!(displayed.length > 1 && displayed[1] == '.')) {
                displayed.shift();
            }
        }
        displayed.push(e.target.value);
        updateDisplayed();
    });
});

function clearNumber() {
    displayed = ['0'];
    updateDisplayed();
}

function deleteNumber() {
    displayed.pop();
    updateDisplayed();
}

function addDecimal() {
    if (displayed.indexOf('.') == -1 ) {
        displayed.push('.');
    }
    updateDisplayed();
}

function updateDisplayed() {
    if (displayed.length == 0) {
        displayed = ['0'];
    }
    display.textContent = displayed.join('');
}