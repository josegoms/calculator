function add(n1, n2) {
    let operation = Number(n1) + Number(n2);
    return operation;
}
function subtract(n1, n2) {
    let operation = Number(n1) - Number(n2);
    return operation;
}
function multiply(n1, n2) {
    let operation = Number(n1) * Number(n2);
    return operation;
}
function divide(n1, n2) {
    let operation = Number(n1) / Number(n2);
    return operation;
}
function operate(n1, op, n2) {
    let result;

    switch (op) {
        case "+":
            result = add(n1, n2);
            break;
        case "-":
            result = subtract(n1, n2);
            break;
        case "/":
            result = divide(n1, n2);
            break;
        case "*":
            result = multiply(n1, n2);
            break;
    }
    return result;
}

let num1;
let num2;
let operator;
let result;

const numbers = document.querySelector(".numbers");
const signal = document.querySelector(".add-buttons");
const panel = document.querySelector(".display");

numbers.addEventListener("click", (event) => {
    if (operator === undefined) {

        if (num1 === undefined) {
            num1 = event.target.value;
            panel.textContent = `${num1}`;
        } else {
            num1 += event.target.value;
            panel.textContent = `${num1}`;
        }
    } 
    else if (operator !== undefined) {
        if (operator === "/" && event.target.value === "0") {
            panel.textContent = "Go back to kindergarten, bro";
        }
        else if (num2 === undefined) {
            num2 = event.target.value;
            panel.textContent += `${num2}`;
        } else {
            num2 += event.target.value;
            panel.textContent = "";
            panel.textContent = `${num1}${operator}${num2}`;
        }
    }
});

signal.addEventListener("click", (event) => {
    if (event.target.value === "clear") {
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        panel.textContent = "";
    }
    else if (event.target.value === "=") {
        if (num1 !== undefined && num2 !== undefined && operator !== undefined) {
            result = operate(num1, operator, num2);
            panel.textContent = `${result}`;
        }
    }
    else if (event.target.value !== "=" && operator === undefined) {
        operator = event.target.value;
        panel.textContent += `${operator}`;
    }
    else if (operator !== undefined && num2 !== undefined) {
        result = operate(num1, operator, num2);
        num1 = result;
        num2 = undefined;
        operator = event.target.value;
        panel.textContent = `${num1}${operator}`;
    }
});

