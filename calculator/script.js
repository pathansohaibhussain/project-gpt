let display = document.getElementById("display");
let currentInput = "";

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = "";
    display.value = "";
}

function calculateResult() {
    try {
        let result = eval(currentInput);
        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = "Error";
    }
}

function calculateSquare() {
    try {
        let result = eval(currentInput) ** 2;
        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = "Error";
    }
}

function calculateSquareRoot() {
    try {
        let result = Math.sqrt(eval(currentInput));
        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = "Error";
    }
}

function deleteLastCharacter() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}
