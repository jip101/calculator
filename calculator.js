let subDisplay = document.querySelector('#subDisplay');
let display = document.querySelector('#display');
let currentValue = '';
let equation = [];


let digits = document.querySelectorAll('.digit');
digits.forEach(digit => digit.addEventListener('click', () => {
    if (digit.value == 0 && (currentValue.trim().length != 0 || currentValue != 0)) {
        currentValue += digit.value;
    }
    else if (!currentValue || !isNaN(currentValue)) {
        currentValue += digit.value;
    }
    else if (isNaN(currentValue) || (!currentValue && equation.length > 0)) {
        equation.push(currentValue);
        currentValue = digit.value;
    }
    subDisplay.textContent = equation.join(' ') + ' ' + currentValue
}));


let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', () => {
    if (operator.value !== '=' && currentValue) {
        equation.push(currentValue);
        equation.push(operator.value);
        currentValue = '';
        subDisplay.textContent = equation.join(' ');
    }
    else if (operator.value !== '=' && !isNaN(equation[equation.length - 1])) {
        equation.push(operator.value);
        subDisplay.textContent = equation.join(' ');
    }
    else if (operator.value === '=') {
        if (currentValue) {
            equation.push(currentValue);
        }
        equationCopy = [...equation];
        ans = calculate(equationCopy);
        currentValue = equation.pop();
        if (ans == 'error') {
            display.textContent = 'ERROR: CANNOT DIVIDE BY 0';
        }
        else if (isNaN(ans)) {
            display.textContent = 'SYNTAX ERROR';
        }
        else {
            display.textContent = ans;
        }
    }
}));


let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (currentValue.indexOf('.') == -1) {
        if (!currentValue || currentValue == ' ') {
            currentValue = ' 0.';
        }
        else {
            currentValue += decimal.value;
        }
    subDisplay.textContent = equation.join(' ') + ' ' + currentValue
}});


let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    currentValue = '';
    equation = [];
    subDisplay.textContent = '';
    display.textContent = '';
});


let del = document.querySelector('.delete');
del.addEventListener('click', () => {
    if (!currentValue && equation.length > 0) {
        currentValue = equation.pop();
        currentValue = currentValue.trim().slice(0, -1);
        if (!isNaN(equation[equation.length - 1])){
            currentValue = equation.pop();
        }

    }
    else if (currentValue.trim() == '0.' || currentValue == ' ') {
        currentValue = currentValue.trim().slice(0, -2);
    }
    else if (currentValue) {
        currentValue = currentValue.trim().slice(0, -1);
    }
    subDisplay.textContent = equation.join(' ') + ' ' + currentValue;
});


function calculate (equationCopy) {
    while (equationCopy.includes('*') || equationCopy.includes('/')) {
        if (equationCopy.includes('*') && equationCopy.includes('/')) {
            let multIndex = equationCopy.indexOf('*')
            let divIndex = equationCopy.indexOf('/')
            if (multIndex > divIndex) {
                let temp = division(equationCopy[divIndex - 1], equationCopy[divIndex + 1])
                if (temp == 'error') {
                    return 'error'
                }
                equationCopy.splice((divIndex - 1), 3, temp)
            }
            else {
                let temp = multiplication(equationCopy[multIndex - 1], equationCopy[multIndex + 1])
                equationCopy.splice((multIndex - 1), 3, temp)
            }
        }
        else if (equationCopy.includes('*')) {
            let multIndex = equationCopy.indexOf('*'); 
            let temp = multiplication(equationCopy[multIndex - 1], equationCopy[multIndex + 1]);
            equationCopy.splice((multIndex - 1), 3, temp);
        }
        else if (equationCopy.includes('/')) {
            let divIndex = equationCopy.indexOf('/');
            let temp = division(equationCopy[divIndex - 1], equationCopy[divIndex + 1]);
            if (temp == 'error') {
                return 'error'
            }
            equationCopy.splice((divIndex - 1), 3, temp);
        }
    }
    while (equationCopy.includes('+') || equationCopy.includes('-')) {
        if (equationCopy.includes('+') && equationCopy.includes('-')) {
            let addIndex = equationCopy.indexOf('+')
            let subIndex = equationCopy.indexOf('-')
            if (addIndex > subIndex) {
                let temp = substraction(equationCopy[subIndex - 1], equationCopy[subIndex + 1])
                equationCopy.splice((subIndex - 1), 3, temp)
            }
            else {
                let temp = addition(equationCopy[addIndex - 1], equationCopy[addIndex + 1])
                equationCopy.splice((addIndex - 1), 3, temp)
            }
        }
        else if (equationCopy.includes('+')) {
            let addIndex = equationCopy.indexOf('+'); 
            let temp = addition(equationCopy[addIndex - 1], equationCopy[addIndex + 1]);
            equationCopy.splice((addIndex - 1), 3, temp);
        }
        else if (equationCopy.includes('-')) {
            let subIndex = equationCopy.indexOf('-');
            let temp = substraction(equationCopy[subIndex - 1], equationCopy[subIndex + 1]);
            equationCopy.splice((subIndex - 1), 3, temp);
        }

    }

    return equationCopy[0];
}


function division (a, b) {
    if (b == 0) {
        return 'error';
    }
    else {
        return +a / +b;
    }
}

function multiplication (a,b) {
    return +a * +b;
}

function addition (a,b) {
    return +a + +b;
}

function substraction (a,b) {
    return +a - +b;
}