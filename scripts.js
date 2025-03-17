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
function freshStart() {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
}
function handleNumbersSection(event) {
    
    if (result !== undefined || panel.textContent === "Go back to kindergarten, bro") {
        result = undefined;
        freshStart();
        panel.textContent = "";
    }
    if (event.target.value === "delete" || event.key === "Backspace") {
        if (operator === undefined && num1 !== undefined) {
            let tempNum1 = num1;
            num1 = undefined;
            num1 = tempNum1.slice(0, -1);
        }
        else if (operator !== undefined) {
            if (num2 === undefined) {
                operator = undefined;
            } else {
                let tempNum2 = num2;
                num2 = undefined;
                num2 = tempNum2.slice(0, -1);
            }
        }
        let tempPanel = panel.textContent;
        panel.textContent = tempPanel.slice(0, -1);
        return;
    }
    if (operator === undefined) {

        if (num1 === undefined && (event.target.value !== "." || event.key !== ".")) {
            num1 = (event.target.value || event.key);
            panel.textContent = `${num1}`;
        }
        else if (num1 !== undefined) {
            num1 += (event.target.value || event.key);
            panel.textContent = `${num1}`;
        }
    } 
    else if (operator !== undefined) {
        if (operator === "/" && (event.target.value === "0" || event.key === "0")) {
            panel.textContent = "Go back to kindergarten, bro";
        }
        else if (num2 === undefined && (event.target.value !== "." || event.key !== ".")) {
            num2 = (event.target.value || event.key);
            panel.textContent += `${num2}`;
        }
        else if (num2 !== undefined) {
            num2 += (event.target.value || event.key);
            panel.textContent = `${num1}${operator}${num2}`;
        }
    }
}
function handleAddButtonsCase(event) {
    if (event.target.value === "clear" || event.key === "Delete") {
        freshStart();
        panel.textContent = "";
    }
    else if (event.target.value === "=" || event.key === "Enter") {
        if (num1 !== undefined && num2 !== undefined && operator !== undefined) {
            result = operate(num1, operator, num2);
            panel.textContent = `${result}`;
        }
    }
    else if ((event.target.value !== "=" || event.key !== "Enter") && operator === undefined) {
        operator = (event.target.value || event.key);
        panel.textContent += `${operator}`;
    }
    else if (operator !== undefined && num2 !== undefined) {
        result = operate(num1, operator, num2);
        num1 = result;
        result = undefined;
        num2 = undefined;
        operator = (event.target.value || event.key);
        panel.textContent = `${num1}${operator}`;
    }
}

let num1;
let num2;
let operator;
let result;

document.querySelectorAll("button").forEach(button => {
    button.setAttribute("tabindex", "-1")
    button.addEventListener("click", (event) => event.target.blur());
});

document.addEventListener("keydown", (event) => {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
    document.activeElement.blur();
});

const numbers = document.querySelector(".numbers");
const signal = document.querySelector(".add-buttons");
const panel = document.querySelector(".display");

numbers.addEventListener("click", handleNumbersSection);
signal.addEventListener("click", handleAddButtonsCase);
window.addEventListener("keydown",(event) => {
    const allowedNumbersKeys = [".", "Backspace"];
    const allowedAddButtonKeys = ["Delete", "+", "-", "*", "/", "Enter"];
    const functionKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
    
    if (functionKeys.includes(event.key)) {
        return;
    }
    if (/\d/.test(event.key) || allowedNumbersKeys.includes(event.key)) {
        handleNumbersSection(event);
    }
    else if (allowedAddButtonKeys.includes(event.key)) {
        handleAddButtonsCase(event);
    }
});
