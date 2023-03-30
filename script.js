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

function readNum(num, button) {
    num *= 10;
    num += Number(button.textContent);
    return num;
}

function readOper(oper, button) {
    oper = button.textContent;
    return oper;
}

const numButtons = document.querySelectorAll('#number');
const operButtons = document.querySelectorAll('#operator');

let num = 0;
let nextNum = 0;
let oper = '';
let nextOper = '';
let clicked1 = false;
let clicked2 = false;

numButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (clicked1 == false) {
            num = readNum(num, button);
        }

        else if (clicked2 == false) {
            nextNum = readNum(nextNum, button);
        }

        
    });
});

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (clicked1 == false) {
            oper = readOper(oper, button);
            clicked1 = true;
        }

        else if (clicked2 == false) {
            nextOper = readOper(nextOper, button);
            clicked2 = true;

            console.log('Num1 = ' + num);
            console.log('Num2 = ' + nextNum);
            console.log('Oper1 = ' + oper);
            console.log('Oper2 = ' + nextOper);

            console.log('Result = ' + operate(oper, Number(num), Number(nextNum)));

        }

        
    })
});


function operate(sign, a, b) {

    if (nextOper != '=') {
        clicked2 = false;
        nextNum = 0;
        oper = nextOper;
    }

    else if (nextOper == '=') {
        clicked1 = false;
        clicked2 = false;
        nextNum = 0;
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