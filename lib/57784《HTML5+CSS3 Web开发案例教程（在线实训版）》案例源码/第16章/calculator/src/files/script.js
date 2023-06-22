import { Calculator } from './calculator-engine.js'
let calculator = new Calculator;

new Vue({
    el: '#app',
    data: calculator,
    computed: {
        screenValue: () => calculator.screen.substring(0, 13)
    },
    methods: {
        keyPressed(event) {
            const { target } = event;

            if (!target.matches("button")) {
                return;
            }

            if (target.classList.contains("operator")) {
                calculator.inputOperator(target.value);
            } else if (target.classList.contains("decimal")) {
                calculator.inputDecimal(target.value);
            } else if (target.classList.contains("all-clear")) {
                calculator.reset();
            } else {
                calculator.inputDigit(target.value);
            }
        }
    }
})
