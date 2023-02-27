let subDisplay = document.querySelector('#subDisplay');
let display = document.querySelector('#display');
let currentValue = '';
let equation = [];


let digits = document.querySelectorAll('.digit')
digits.forEach(digit => digit.addEventListener('click', () => {
    if (digit.value == 0 && currentValue.trim().length != 0) {
        currentValue += digit.value;
    }
    //else if (digit.value == 0 && currentValue.length > 0) {
    //    currentValue += digit.value;
    //}
    else if (digit.value != 0) {
        currentValue += digit.value;
        }
    subDisplay.textContent = equation.join(' ') + ' ' + currentValue
}));


let operators = document.querySelectorAll('.operator')
operators.forEach(operator => operator.addEventListener('click', () => {
    if (operator.value !== '=' && currentValue != 0) {
        equation.push(currentValue);
        equation.push(operator.value);
        currentValue = '';
        subDisplay.textContent = equation.join(' ');
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


let clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    currentValue = '';
    equation = [];
    subDisplay.textContent = '';
    display.textContent = '';
});


let del = document.querySelector('.delete')
del.addEventListener('click', () => {
    if (currentValue == ' 0.' || currentValue == ' ') {
        console.log('1st')
        currentValue = currentValue.slice(0, -2);
    }
    else if (currentValue && currentValue !== ' ') {
        currentValue = currentValue.slice(0, -1);

    }
    else if (!currentValue && equation.length > 0) {
        console.log('2nd')
        currentValue = equation.pop().trim();
        currentValue = currentValue.slice(0, -1);
    }
    subDisplay.textContent = equation.join(' ') + ' ' + currentValue;
});