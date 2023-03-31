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
    return (a / b).toFixed(8);
}

function readNum(num, button) {
    num *= 10;
    num += Number(button.textContent);
    display.textContent = num;
    return num;
}

function readOper(oper, button) {
    oper = button.textContent;
    return oper;
}

const numButtons = document.querySelectorAll('#number');
const operButtons = document.querySelectorAll('#operator');
const clearAll = document.querySelector('#clear-all');
const clear = document.querySelector('#clear');
const bspace = document.querySelector('#bspace');
const display = document.querySelector('#display');

let num = 0;
let nextNum = 0;
let oper = '';
let nextOper = '';
let clicked1 = false;
let clicked2 = false;
let clickedOper = false;

numButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (clicked1 == false) {
            num = readNum(num, button);
        }

        else if (clicked2 == false) {
            clickedOper = true;
            nextNum = readNum(nextNum, button);
        }
    });
});

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (clickedOper == false) {
            oper = readOper(oper, button);
            clicked1 = true;

            operButtons.forEach(button => button.style.filter = 'brightness(100%)');
            button.style.filter = 'brightness(85%)';
        }

        else if (clicked2 == false) {
            nextOper = readOper(nextOper, button);
            clicked2 = true;

            operButtons.forEach(button => button.style.filter = 'brightness(100%)');
            button.style.filter = 'brightness(85%)';
            display.textContent = operate(oper, Number(num), Number(nextNum));
        }
    });
});

function operate(sign, a, b) {

    if (nextOper != '=') {
        clicked2 = false;
        clickedOper = false;
        nextNum = 0;
        oper = nextOper;
    }

    else if (nextOper == '=') {
        clicked1 = false;
        clicked2 = false;
        clickedOper = false;
        nextNum = 0;

        operButtons.forEach(button => button.style.filter = 'brightness(100%)');
    }

    if (sign == '+') {
        num = add(a, b);
        return add(a, b);
    }
    
    else if (sign == '-') {
        num = substract(a, b);
        return substract(a, b);
    }

    else if (sign == '*') {
        num = multiply(a, b);
        return multiply(a, b);
    }

    else if (sign == '/') {
        num = divide(a, b);
        return divide(a, b);
    }
    
}


clearAll.addEventListener('click', () => {
    num = 0;
    nextNum = 0;
    clicked1 = false;
    clicked2 = false;

    display.textContent = 0;
});

clear.addEventListener('click', () => {
    if (clickedOper == false) {
        num = 0;
        clicked1 = false;
        display.textContent = 0;
    }

    else if (clicked2 == false) {
        nextNum = 0;
        display.textContent = 0;
    }
});

bspace.addEventListener('click', () => {
    if (clickedOper == false) {
        num = Math.trunc(num/10);
        clicked1 = false;
        display.textContent = num;
    }

    else if (clicked2 == false) {
        nextNum = Math.trunc(nextNum/10);
        display.textContent = nextNum;
    }

});