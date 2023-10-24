const previousOperationText = document.querySelector("#previous-operation") as HTMLElement;
const currentOperationText = document.querySelector("#current-operation") as HTMLElement;
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    private previousOperationText: HTMLElement;
    private currentOperationText: HTMLElement;
    private currentOperation: string;

    constructor(previousOperationText: HTMLElement, currentOperationText: HTMLElement) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit: string) {
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation: string) {
        let result: number | undefined;

        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                result = previous + current;
                this.updateScreen(result, operation, current, previous);
                break;
            case "-":
                result = previous - current;
                this.updateScreen(result, operation, current, previous);
                break;
            case "*":
                result = previous * current;
                this.updateScreen(result, operation, current, previous);
                break;
            case "/":
                result = previous / current;
                this.updateScreen(result, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                let operationResult = this.previousOperationText.innerText.split(" ")[1];
                this.processOperation(operationResult);
                this.currentOperationText.innerText = this.previousOperationText.innerText.slice(0, -1);
                this.previousOperationText.innerText = "";
                break;
            default:
                return;
        }
    }

    updateScreen(
        operationValue: number | null = null,
        operation: string | null = null,
        current: number | null = null,
        previous: number | null = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previous === 0) {
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation: string) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = (e.target as HTMLElement).innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
