let subDisplay = document.querySelector('#subDisplay');
let display = document.querySelector('#display');
let currentValue = '';
let equation = [];


let digits = document.querySelectorAll('.digit')
digits.forEach(digit => digit.addEventListener('click', () => {
    if (digit.value == 0 && currentValue != 0) {
        currentValue += digit.value;
    }
    else if (digit.value == 0 && currentValue.length > 0) {
        currentValue += digit.value;
    }
    else if (digit.value != 0) {
        currentValue += digit.value;
        }
    subDisplay.textContent = currentValue
}));


let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (currentValue.indexOf('.') == -1) {
        if (!currentValue) {
            currentValue = '0.';
        }
        else {
            currentValue += decimal.value;
        }
    subDisplay.textContent = currentValue
}});


let clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    currentValue = '';
    subDisplay.textContent = '';
    display.textContent = '';
});


let del = document.querySelector('.delete')
del.addEventListener('click', () => {
    if (currentValue == '0.') {
        currentValue = currentValue.slice(0, -2);
        subDisplay.textContent = currentValue;
    }
    else {
        currentValue = currentValue.slice(0, -1);
        subDisplay.textContent = currentValue;
    }
});