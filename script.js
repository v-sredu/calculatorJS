let lastNumber = document.querySelector(".last-result");
let resultCalculation = document.querySelector(".calculation");
let buttons = document.querySelectorAll("button");

let value;
let numberOne;
let numberTwo;
let operant = null;


for (let button of buttons) {
    button.addEventListener("click", function () {
        value = button.value;
        calculateWrapper(value);
    }
    )
}

document.addEventListener("keydown", function (evt) {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Escape", "Backspace", "%", "+", "-", "*", "/", "=", "Enter", ".", ","].includes(evt.key)) {
        calculateWrapper(evt.key);
    }
})

function calculateWrapper(value) {
    numberOne = lastNumber.textContent;
    numberTwo = resultCalculation.textContent;
    if (isNaN(value)) {
        if (numberTwo === "0" || numberTwo === "0" && value === "0") {
            resultCalculation.textContent = "";
        }
        resultCalculation.textContent += value;
    } else if (value === "." || value === ",") {
        if (!numberTwo.includes(".")) {
            resultCalculation.textContent += ".";
        }
    } else if (["+", "-", "*", "/"].includes(value)) {
        if (operant == null) {
            lastNumber.textContent = numberTwo;
        } else {
            lastNumber.textContent = script(operant);
        }
        operant = value;
        resultCalculation.textContent = "0";
    } else if (value === "%") {
        resultCalculation.textContent = script(value);
    } else if (value === "C" || value === "Backspace") {
        resultCalculation.textContent = resultCalculation.textContent.slice(0, resultCalculation.textContent.length - 1);
        if (resultCalculation.textContent === "") {
            resultCalculation.textContent = "0";
        }
    } else if (value === "AC" || value === "Escape") {
        resultCalculation.textContent = "0";
        lastNumber.textContent = "0";
        operant = null;
    } else if (value === "=" || value === "Enter") {
        if (operant != null) {
            resultCalculation.textContent = script(operant);
        }
        lastNumber.textContent = "0";
        operant = null;
    }
}

function script(operant) {
    numberOne = Number(lastNumber.textContent);
    numberTwo = Number(resultCalculation.textContent);
    switch (operant) {
        case "+":
            return +(numberOne + numberTwo).toFixed(3);
        case "-":
            return +(numberOne - numberTwo).toFixed(3);
        case "*":
            return +(numberOne * numberTwo).toFixed(3);
        case "/":
            if (numberTwo == "0") {
                alert("на ноль делить нельзя");
                return 0
            }
            return +(numberOne / numberTwo).toFixed(3);
        case "%":
            return +(numberTwo / 100).toFixed(3);
    }
}
