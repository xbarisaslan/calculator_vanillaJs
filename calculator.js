class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear()}
    
    clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    }

    del(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1)
    //0 dan -1'e kadar olan yer displayde kalsın demek.
}

    appendNumber(number){
    if (number === "." && this.currentOperand.includes (".")) return; 
    this.currentOperand = this.currentOperand.toString() + number.toString();
}

    chooseOperation(operation){
    if (this.currentoperand === '') return;        
    if (this.previousOperand !== '') {this.compute()}
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
}

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ""
        return floatNumber.toLocaleString("en")
    }

    updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }
    else {
        this.previousOperandTextElement.innerText = ""
    }
}

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
        case '+' : computation = prev + current
            break
        case '-' : computation = prev - current
            break
        case '*' : computation = prev * current
            break
        case '÷' : computation = prev / current
            break
        default : return
        }  
    this.currentOperand = computation
    this.previousOperand = ""
    this.operation = undefined
        }
}

const numberButtons = document.querySelectorAll ('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector ('[data-all-clear]');
const equalsButton = document.querySelector ('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    })
  })

  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    })
  })

  
clearButton.addEventListener('click' , () =>
{   calculator.clear();
    calculator.updateDisplay();
}
)

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click' , ()=>{
calculator.del();
calculator.updateDisplay();
})