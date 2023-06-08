// Script

let displayed = 0;
const display = document.querySelector('#displayed-number');
display.textContent = displayed;

function clearNumber() {
    displayed = 0;
    console.log(displayed);
    display.textContent = displayed;
}