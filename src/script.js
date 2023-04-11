
        document.addEventListener('DOMContentLoaded', function () {
            console.log('The DOM is ready!')
            const display = document.getElementById('calc-display')
            const buttons = document.getElementsByClassName('btn')

            let currentValue = ""

            function evaluateResult(){
                const convertedValue = currentValue
                    .replace("×","*")
                    .replace("÷","/")
                    .replace("%","*0.01")
                    .replace("sin","Math.sin")
                    .replace("cos","Math.cos")
                    .replace("log","Math.log10")
                    .replace("ln","Math.log")
                    .replace("π","Math.PI")
                    .replace("e","Math.E")
                    .replace("tan","Math.tan")
                    .replace("sqrt","Math.sqrt")

                const result = eval(convertedValue)
                currentValue = result.toString()
                display.value=currentValue
            }

            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                button.addEventListener('click', function () {
                    const value = button.innerText;

                    try{
                        if (value == "AC") {
                            currentValue="";
                            display.value = currentValue;
                        } else if(value=="="){
                            evaluateResult();
                        }
                        else {
                        
                            currentValue += value;
                            display.value = currentValue;
                        }
                    } catch (error){
                        console.error(error);
                        currentValue = "ERROR";
                        display.value = currentValue;
                    }

                    
                })
            }
        });
  