export {Calculator}

Array.prototype.top = function () {
    return this[this.length - 1];
};

class Calculator {
    constructor() {
        //public
        this.screen = "0",
        this.expression = "",

        //private
        this.operands = [],
        this.operators = ["#"],
        this.operandIsComplete = false,
        this.priority = {
            "+": { "+": ">", "-": ">", "*": "<", "/": "<", "(": "<", ")": ">", "=": ">" },
            "-": { "+": ">", "-": ">", "*": "<", "/": "<", "(": "<", ")": ">", "=": ">" },
            "*": { "+": ">", "-": ">", "*": ">", "/": ">", "(": "<", ")": ">", "=": ">" },
            "/": { "+": ">", "-": ">", "*": ">", "/": ">", "(": "<", ")": ">", "=": ">" },
            "(": { "+": "<", "-": "<", "*": "<", "/": "<", "(": "<", ")": "=", "=": "E" },
            ")": { "+": ">", "-": ">", "*": ">", "/": ">", "(": "E", ")": ">", "=": ">" },
            "#": { "+": "<", "-": "<", "*": "<", "/": "<", "(": "<", ")": "E", "=": "=" }
        };
    }

    //public
    inputDigit(digit) {
        if (this.screen.startsWith("ERROR")||this.expression.endsWith("=")) {
            this.reset();
        }

        if (!this.operandIsComplete) {
            this.screen =
                this.screen === "0" ? digit : this.screen + digit;
            return;
        }

        this.screen = digit;
        this.operandIsComplete = false;
    }

    inputDecimal(dot) {
        if (this.screen.startsWith("ERROR")||this.expression.endsWith("=")) {
            this.reset();
        } 

        if (this.operandIsComplete) {
            this.screen = "0.";
            this.operandIsComplete = false;
            return;
        }

        if (!this.screen.includes(dot)) {
            this.screen += dot;
        }
    }

    inputOperator(operator) {
        if (this.screen.startsWith("ERROR")) {
            this.reset();
        } else if(this.expression.endsWith("=")){
            this.reset('soft');
        }

        if (!this.operandIsComplete) {
            const inputValue = parseFloat(this.screen);
            this.operands.push(inputValue);
            this.operandIsComplete = true;
            this.expression +=  inputValue;
        }

        this.expression += this.convert(operator);
        let onceMore;
        do {
            onceMore = false;
            switch (this.priority[this.operators.top()][operator]) {
                case "<":
                    this.operators.push(operator);
                    break;
                case ">":
                    const right = this.operands.pop();
                    const left = this.operands.pop();
                    if (left == undefined) {      //right and operator could not be undefined
                        this.screen = "ERROR-1";  // 2+= 
                        break;
                    }
                    
                    const prevOperator = this.operators.pop();
                    const result = this.calculate(left, prevOperator, right);
                    if (result > 999999999999 || result < -999999999999) {
                        this.screen = "ERROR-2";
                        break;
                    }

                    this.operands.push(result);
                    this.screen = String(result);
                    onceMore = true;
                    break;
                case "=":
                    const op = this.operators.pop();
                    if(op == '#' && this.operands.length > 1)
                    {
                        this.screen = "ERROR-3";  // 2(3+4)=  
                    }
                    break;
                default:
                    this.screen = "ERROR-4";  // 2)  /  (=
                    break;
            }
        } while (onceMore);
    }

    reset() {
        this.softReset();
        this.screen = "0";
    }

    //private
    softReset(){
        this.expression = "";
        this.operands = [];
        this.operators = ["#"];
        this.operandIsComplete = false;
    }

    calculate(left, operator, right) {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            default:
                throw 'Unexpected operator.'
        }
    }

    convert(char){
        return char === '*' 
          ? '×' : char === '/' 
          ? '÷' : char;
    }
}