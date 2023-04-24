var inverseMode = false;
console.log("inverseMode:",inverseMode);

function toggleInverseMode() {
    inverseMode = !inverseMode;
    var inverseBtn = document.getElementById("inverse-btn");
    if (inverseMode) {
      inverseBtn.classList.add("btn-primary");
      inverseBtn.classList.remove("btn-secondary");
    //   inverseBtn.innerHTML = "INV (on)";
      document.getElementById("sin-btn").innerHTML = "sin<sup>-1</sup>";
    } else {
      inverseBtn.classList.add("btn-secondary");
      inverseBtn.classList.remove("btn-primary");
    //   inverseBtn.innerHTML = "INV (off)";
      document.getElementById("sin-btn").innerHTML = "sin";
    }
  }


function xFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}
        
document.addEventListener('DOMContentLoaded', function () {
    console.log('The DOM is ready!')
    const display = document.getElementById('calc-display')
    const buttons = document.getElementsByClassName('btn')

    let currentValue = ""
    let ANS = 0;
    let char = "";

    function evaluateResult(){
        console.log("currentValue:",currentValue)
        console.log("ANS:",ANS)
        const convertedValue = currentValue
            .replace("×","*")
            .replace("÷","/")
            .replace("%","*0.01")
            .replace(/\barcsin\b|sin/g, function(match) {
                return (match === "sin") ? "Math.sin" : "Math.asin";
              })
            .replace("cos","Math.cos")
            .replace("tan","Math.tan")
            .replace("log","Math.log10")
            .replace("ln","Math.log")
            .replace("π","Math.PI")
            .replace("e","Math.E")           
            .replace("√","Math.sqrt")
            .replace("ANS",ANS)
            .replace(/(\d+)!/g, (match, num) => xFact(num))
            .replace(/(\d+)EXP(\d+)/g, (match, base, exponent) => `${base} * 10**${exponent}`)
        
        console.log("convertedValue:",convertedValue)

        const result = eval(convertedValue);
        currentValue = result.toString();
        return currentValue;
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            const value = button.innerText;

            console.log("button value:",value)
            try{
                if (value == "CE") {
                    currentValue="";
                    display.value = currentValue;
                } else if(value=="Inv"){
                    console.log("Inverse Buttons")
                    toggleInverseMode();
                } else if(value=="ANS"){
                    currentValue += "ANS";
                    display.value = currentValue;
                } else if(value=="sin-1"){
                    currentValue += `arcsin`;
                    display.value = currentValue;
                } else if(value=="xy"){
                    currentValue += `**`;
                    display.value = currentValue;
                } else if(value=="x!"){
                    currentValue += "!";
                    display.value = currentValue;
                } else if(value=="="){
                    evaluateResult();
                    display.value=currentValue
                    ANS = currentValue;
                    console.log("ANS:",ANS)
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
  