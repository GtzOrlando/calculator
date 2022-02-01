const operation = document.querySelector('.operation');
const answer = document.querySelector('.answer');

const add = function(a,b) {return a+b};
const subtract = function(a,b) {return a-b};
const multiply = function(a,b) {return a*b};
const divide = function(a,b) {return a/b};
const isANum = /[0-9,.]/;
let value = ["0"];
let display = value.join(''); 
let previewAnswer = "0";

function addNumber(a) {
    if (value.length == 1) {
        if (value[value.length-1] == 0) {
            value.pop();
            value.push(a);
            display = value.join('');
            operation.textContent = display; 
        } else {
            value.push(a);
            display = value.join('');
            operation.textContent = display; 
        }
    } else if (value.length > 1 && !isANum.test(value[value.length-2]) && value[value.length-1] == 0) {
        value.pop();
        value.push(a);
        display = value.join('');value.length
        operation.textContent = display; 
    }  else {
        value.push(a);
        display = value.join('');value.length
        operation.textContent = display;    
    }
}

function addCero(a) {
    if (value.length > 1) {
        if (value[value.length-1] == 0) {
            if (isANum.test(value[value.length-2])) {
                value.push(a);
                display = value.join('');
                operation.textContent = display; 
            }
        } else {
            value.push(a);
            display = value.join('');
            operation.textContent = display; 
        }
    } else if (value[0] > 0) {
        value.push(a);
        display = value.join('');
        operation.textContent = display; 
    }
}

function addSymbol(a) {
    if (value.length == 1 && value[0] == 0 && a == "+") {
    } else if (value.length == 1 && value[0] == 0 && a == "-") {
        value[0] = "-";
        display = value.join('');
        operation.textContent = display;
    } else if (!isANum.test(value[value.length-1]) || value[value.length-1] == ".") {
        if(value[value.length-1] != a) {
            value[value.length-1] = a;
            display = value.join('');
            operation.textContent = display; 
        }
    } else {
        value.push(a);
        display = value.join('');
        operation.textContent = display; 
    }
}

function addPoint(a) {
    if (value[value.length-1] != ".") {
        if (!isANum.test(value[value.length-1])) {
            value.push('0');
            value.push(a);
            display = value.join('');
            operation.textContent = display;   
        } else {
            value.push(a);
            display = value.join('');
            operation.textContent = display; 
        }
    }
}

function erase() {
    if (value.length == 1) {
        value[0] = "0";
        doCalcs();
        display = value.join('');
        operation.textContent = display;
    } else {
        value.pop();
        doCalcs();
        display = value.join('');
        operation.textContent = display;
    }
}

function eraseAll() {
    value = ["0"];
    doCalcs();
    display = value.join('');
    operation.textContent = display;
}

function enter() {
    let newValue = [];
    previewAnswer = String(previewAnswer);
    for (m=0;m<previewAnswer.length;m++) {
        newValue.push(previewAnswer.charAt(m));
    }
    value = newValue;
    doCalcs();
    display = value.join('');
    operation.textContent = display;
}

function doCalcs() {
    divideAddSubtract();
    answer.textContent = previewAnswer;
}

function divideAddSubtract() {
    let allSums = value;
    let counts = 0;
    let total = "";

    for (i=0; i < allSums.length; i++) {
        if (allSums[i] == "+" || allSums[i] == "-") {
            counts += 1;
        }
    }
    
    if (counts > 0) {
        let number = "";
        for (l=0; l < allSums.length; l++) { 
            if (allSums[l] == "+" || allSums[l] == "-") {
                number = doMultiplyAndDivide(number);
                total += number;
                total += allSums[l];
                number = "";
            } else {
                number += allSums[l];
            }
        }
        number = doMultiplyAndDivide(number);
        total += number;
        previewAnswer = doAddsAndSubtracts(total);
    } else {
        previewAnswer = (allSums.join(''));
        previewAnswer = doMultiplyAndDivide(previewAnswer);
    }
}

function doMultiplyAndDivide(string) {
    let counts = 0;
    let total = string;
    for (i=0; i < string.length; i++) {
        if (string[i] == "x" || string[i] == "/") {
            counts += 1;
        }
    }
    
    for (i=counts; i >= 0; i--) {
    
        let number = "";
    
        if (string[0] == "x") {
            string = string.slice(1);
            if (string.includes("x")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total *= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else if (string.includes("/")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total *= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else {
                total *= +string;
            }
        } else if (string[0] == "/") {
            string = string.slice(1);
            if (string.includes("/")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total /= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else if (string.includes("x")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total /= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else {
                total /= +string;  
            }
        } else {
            for(j=0;j < string.length ; j++) {
                if (isANum.test(string[j])) {
                    number += string[j];
                } else {
                    total = +number;
                    string = string.slice(j);
                    break;
                }
            }
        }
    }
    return total;
}

function doAddsAndSubtracts(string) {
    let counts = 0;
    let total = 0;
    for (i=0; i < string.length; i++) {
        if (string[i] == "+" || string[i] == "-") {
            counts += 1;
        }
    }
    
    for (i=counts; i >= 0; i--) {
    
        let number = "";
    
        if (string[0] == "+") {
            string = string.slice(1);
            if (string.includes("+")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total += +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else if (string.includes("-")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total += +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else {
                total += +string;
            }
        } else if (string[0] == "-") {
            string = string.slice(1);
            if (string.includes("-")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total -= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else if (string.includes("+")) {
                for(j=0;j < string.length ; j++) {
                    if (isANum.test(string[j])) {
                        number += string[j];
                    } else {
                        total -= +number;
                        string = string.slice(j);
                        break;
                    }
                }
            } else {
                total -= +string;  
            }
        } else {
            for(j=0;j < string.length ; j++) {
                if (isANum.test(string[j])) {
                    number += string[j];
                } else {
                    total += +number;
                    string = string.slice(j);
                    break;
                }
            }
        }
    }
    return total;
}


window.addEventListener('keydown', logKey);

function logKey(e) {
    if (e.keyCode == 96 || e.keyCode == 97 || e.keyCode == 98 || e.keyCode == 99 || e.keyCode == 100 || e.keyCode == 101 || e.keyCode == 102 || e.keyCode == 103 || e.keyCode == 104 || e.keyCode == 105 || e.keyCode == 110 || e.keyCode == 107 || e.keyCode == 68 || e.keyCode == 109 || e.keyCode == 106 || e.keyCode == 46) {
        document.querySelector(`button[data-key2="${e.keyCode}"]`).click();
    } else {
        document.querySelector(`button[data-key="${e.keyCode}"]`).click();
    }
}
