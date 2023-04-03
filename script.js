function add(a, b) {
    return a + b;
}

function subtract(a, b) {
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

document.addEventListener('keydown', keyboard);
document.addEventListener('keydown', keyboardOper);

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

    if (nextOper != '=' && nextOper != 'Enter') {
        clicked2 = false;
        clickedOper = false;
        nextNum = 0;
        oper = nextOper;
    }

    else {
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
        num = subtract(a, b);
        return subtract(a, b);
    }

    else if (sign == '*') {
        num = multiply(a, b);
        return multiply(a, b);
    }

    else if (sign == '/') {

        if (b == 0) {
            float1 = false;
            float2 = false;
            num = 0;
            nextNum = 0;
            clicked1 = false;
            clicked2 = false;
            return 'retard';
        }

        num = divide(a, b);
        return divide(a, b);
    }
    
}

function readKeyboard(num, e, float) {
    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        if (!float) {
            num *= 10;
            num += Number(e.key);
        }
    
        else if (float && floatDigit <= 8) {
            num += Number(e.key) / Math.pow(10, floatDigit);
            num = Number(num.toFixed(floatDigit));
            floatDigit++;
        }
    }
    
    display.textContent = num;
    return num;
} 

function keyboard(e) {
    if (clicked1 == false) {
        num = readKeyboard(num, e, float1);
        float2 = false;
    }
    
    else if (clicked2 == false) {
        clickedOper = true;
        nextNum = readKeyboard(nextNum, e, float2);
        float1 = false;
    }

}

function readKeyboardOper(oper, e) {
    oper = e.key;
    return oper;
}

function keyboardOper(e) {
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '=' || e.key == 'Enter') {

        if (clickedOper == false) {
            if (e.key != 'Equal' && e.key != 'Enter') {
                oper = readKeyboardOper(oper, e);
                clicked1 = true;
            
                operButtons.forEach(button => button.style.filter = 'brightness(100%)');

            }
        }

        else if (clicked2 == false) {
            nextOper = readKeyboardOper(nextOper, e);
            clicked2 = true;

            if (e.key != 'Equal' && e.key != 'Enter') {
                operButtons.forEach(button => button.style.filter = 'brightness(100%)');

            }
            display.textContent = operate(oper, Number(num), Number(nextNum));
        }
    }
}

function dotFunc() {
    if (clicked1 == false && float1 == false) {
        floatDigit = 1;
        float1 = true;
    }

    else if (clicked2 == false && float2 == false) {
        floatDigit = 1;
        float2 = true;
    }

    display.textContent += '.';
}

function clearAllFunc() {
    float1 = false;
    float2 = false;
    num = 0;
    nextNum = 0;
    clicked1 = false;
    clicked2 = false;

    display.textContent = 0;
    operButtons.forEach(button => button.style.filter = 'brightness(100%)');
}

function clearFunc() {
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
}

function bspaceFunc() {
    floatDigit--;
    
    if (clickedOper == false) {
        let str = num.toString();

        if (str[str.length - 2] != '.') {
            num = Number(str.slice(0, -1));
        }

        else {
            num = Number(str.slice(0, -1));
            float1 = false;
        }

        clicked1 = false;
        display.textContent = num;
        operButtons.forEach(button => button.style.filter = 'brightness(100%)');
    }

    else if (clicked2 == false) {
        let str = nextNum.toString();

        if (str[str.length - 2] != '.') {
            nextNum = Number(str.slice(0, -1));
        }

        else {
            nextNum = Number(str.slice(0, -1));
            float2 = false;
        }

        display.textContent = nextNum;
        
    }
}


dot.addEventListener('click', dotFunc);
clearAll.addEventListener('click', clearAllFunc);
clear.addEventListener('click', clearFunc);
bspace.addEventListener('click', bspaceFunc);
