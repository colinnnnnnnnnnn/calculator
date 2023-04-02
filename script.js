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

function readNum(num, button, float) {
    if (!float) {
        num *= 10;
        num += Number(button.textContent);
    }

    else if (float && floatDigit <= 8) {
        num += Number(button.textContent) / Math.pow(10, floatDigit);
        num = Number(num.toFixed(floatDigit));
        floatDigit++;
    }
    
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
const dot = document.querySelector('#dot');
const display = document.querySelector('#display');

let num = 0;
let nextNum = 0;
let oper = '';
let nextOper = '';
let clicked1 = false;
let clicked2 = false;
let clickedOper = false;
let float1 = false;
let float2 = false;
let floatDigit = 1;

numButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (clicked1 == false) {
            num = readNum(num, button, float1);
            float2 = false;
        }

        else if (clicked2 == false) {
            clickedOper = true;
            nextNum = readNum(nextNum, button, float2);
            float1 = false;
        }
    });
});

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (clickedOper == false) {
            if (button.textContent != '=') {
                oper = readOper(oper, button);
                clicked1 = true;
            
                operButtons.forEach(button => button.style.filter = 'brightness(100%)');
                button.style.filter = 'brightness(85%)';    
            }
        }

        else if (clicked2 == false) {
            nextOper = readOper(nextOper, button);
            clicked2 = true;

            if (button.textContent != '=') {
                operButtons.forEach(button => button.style.filter = 'brightness(100%)');
                button.style.filter = 'brightness(85%)';    
            }
            display.textContent = operate(oper, Number(num), Number(nextNum));
        }
    });
});

function operate(sign, a, b) {

    float1 = false;
    float2 = false;

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

dot.addEventListener('click', () => {
    if (clicked1 == false && float1 == false) {
        floatDigit = 1;
        float1 = true;
    }

    else if (clicked2 == false && float2 == false) {
        floatDigit = 1;
        float2 = true;
    }
});

clearAll.addEventListener('click', () => {
    float1 = false;
    float2 = false;
    num = 0;
    nextNum = 0;
    clicked1 = false;
    clicked2 = false;

    display.textContent = 0;
    operButtons.forEach(button => button.style.filter = 'brightness(100%)');
});

clear.addEventListener('click', () => {
    if (clickedOper == false) {
        num = 0;
        clicked1 = false;
        display.textContent = 0;
        operButtons.forEach(button => button.style.filter = 'brightness(100%)');
    }

    else if (clicked2 == false) {
        nextNum = 0;
        display.textContent = 0;
    }

    float1 = false;
    float2 = false;
    
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


    operButtons.forEach(button => button.style.filter = 'brightness(100%)');
});