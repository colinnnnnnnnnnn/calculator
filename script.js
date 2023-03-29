function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const numButtons = document.querySelectorAll('#number');
const operButtons = document.querySelectorAll('#operator');

let firstNum = 0;

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        firstNum *= 10;
        firstNum += Number(button.textContent);
        console.log(firstNum);
    })
})

function operate(sign, a, b) {

}