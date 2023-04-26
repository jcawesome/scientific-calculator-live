var inverseMode = false;
// console.log("inverseMode:", inverseMode);
var angleUnit = "rad";


function toggleRadDeg() {
    var radBtn = document.getElementById("rad-btn");
    var degBtn = document.getElementById("deg-btn");

    if (angleUnit == "rad") {
        angleUnit = "deg"; // update the button label
        radBtn.classList.remove('active');
        degBtn.classList.add('active');
    } else {
        angleUnit = "rad"; // update the button label
        degBtn.classList.remove('active');
        radBtn.classList.add('active');
    }
}

function toggleInverseMode() {
    inverseMode = !inverseMode;
    var inverseBtn = document.getElementById("inverse-btn");
    if (inverseMode) {
        inverseBtn.classList.add("btn-primary");
        inverseBtn.classList.remove("btn-secondary");
        document.getElementById("sin-btn").innerHTML = "sin<sup>-1</sup>";
        document.getElementById("cos-btn").innerHTML = "cos<sup>-1</sup>";
        document.getElementById("tan-btn").innerHTML = "tan<sup>-1</sup>";
        document.getElementById("ans-btn").innerHTML = "RND";
    } else {
        inverseBtn.classList.add("btn-secondary");
        inverseBtn.classList.remove("btn-primary");
        document.getElementById("sin-btn").innerHTML = "sin";
        document.getElementById("cos-btn").innerHTML = "cos";
        document.getElementById("tan-btn").innerHTML = "tan";
        document.getElementById("ans-btn").innerHTML = "ANS";
    }
}

function addToHistory(str) {
    var history = document.getElementById("history");
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(str));
    history.appendChild(li);
    //   document.getElementById("historyModal").querySelector("ul").appendChild(li);
}

function xFact(num) {
    var rval = 1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('The DOM is ready!')
    const display = document.getElementById('calc-display')
    const buttons = document.getElementsByClassName('btn')
    var history = document.getElementById("history");


    let currentValue = ""
    let ANS = 0;
    let char = "";

    function evaluateResult() {
        // console.log("currentValue:", currentValue)
        // console.log("ANS:", ANS)
        
        const convertedValue = currentValue
            .replace("×", "*")
            .replace("÷", "/")
            .replace("%", "*0.01")
            .replace(/\barcsin\b|sin/g, function (match) {
                return (match === "sin") ? "Math.sin" : "Math.asin";
            })
            .replace(/\barccos\b|cos/g, function (match) {
                return (match === "cos") ? "Math.cos" : "Math.acos";
            })
            .replace(/\barctan\b|tan/g, function (match) {
                return (match === "tan") ? "Math.tan" : "Math.atan";
            })
            .replace("log", "Math.log10")
            .replace("ln", "Math.log")
            .replace("π", "Math.PI")
            .replace("e", "Math.E")
            .replace("√", "Math.sqrt")
            .replace("ANS", ANS)
            .replace("RND", "(Math.random() * (1 - 0) + 0).toFixed(6)")
            .replace(/(\d+)!/g, (match, num) => xFact(num))
            .replace(/(\d+)EXP(\d+)/g, (match, base, exponent) => `${base} * 10**${exponent}`)

        // console.log("convertedValue:", convertedValue)
        
        const result = eval(convertedValue);
        console.log("result",result);
        var updResult = result;
        if (angleUnit=="deg"){
            updResult = result * (180 / Math.PI);
        }
        console.log("updResult",updResult);
        currentValue = updResult.toString();
        console.log("currentValue",currentValue);
        return currentValue;
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            const value = button.innerText;

            // console.log("button value:", value)
            try {
                if (value == "AC") {
                    currentValue = "";
                    display.value = currentValue;
                } else if (value == "Inv") {
                    toggleInverseMode();
                } else if (value == "Rad" | value == "Deg") {
                    toggleRadDeg();
                } else if (value == "ANS") {
                    currentValue += "ANS";
                    display.value = currentValue;
                } else if (value == "sin-1") {
                    currentValue += `arcsin`;
                    display.value = currentValue;
                } else if (value == "cos-1") {
                    currentValue += `arccos`;
                    display.value = currentValue;
                } else if (value == "tan-1") {
                    currentValue += `arctan`;
                    display.value = currentValue;
                } else if (value == "xy") {
                    currentValue += `**`;
                    display.value = currentValue;
                } else if (value == "x!") {
                    currentValue += "!";
                    display.value = currentValue;
                } else if (value == "=" | value == "RND") {
                    if (value == "RND") {
                        currentValue += value;
                    }
                    expression = currentValue;
                    // console.log("expression:", expression)
                    evaluateResult();
                    display.value = currentValue
                    ANS = currentValue;
                    // console.log("ANS:", ANS)
                    var histString = expression + " = " + ANS;
                    addToHistory(histString)
                    // console.log("histString:", histString)
                }
                else {

                    currentValue += value;
                    display.value = currentValue;
                }
            } catch (error) {
                console.error(error);
                currentValue = "ERROR";
                display.value = currentValue;
            }


        })
    }
});
