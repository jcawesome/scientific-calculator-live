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

function sinFunc(angle) {
    if (angleUnit === "rad") {
        return Math.sin(angle);
    } else {
        return Math.sin(angle * Math.PI / 180);
    }
}

function cosFunc(angle) {
    if (angleUnit === "rad") {
        return Math.cos(angle);
    } else {
        return Math.cos(angle * Math.PI / 180);
    }
}

function tanFunc(angle) {
    if (angleUnit === "rad") {
        return Math.tan(angle);
    } else {
        return Math.tan(angle * Math.PI / 180);
    }
}

function arcsinFunc(angle) {
    if (angleUnit === "rad") {
        return Math.asin(angle);
    } else {
        return (Math.asin(angle) * 180) / Math.PI;
    }
}

function arccosFunc(angle) {
    if (angleUnit === "rad") {
        return Math.acos(angle);
    } else {
        return (Math.acos(angle) * 180) / Math.PI;
    }
}

function arctanFunc(angle) {
    if (angleUnit === "rad") {
        return Math.atan(angle);
    } else {
        return (Math.atan(angle) * 180) / Math.PI;
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
        document.getElementById("ln-btn").innerHTML = "e<sup>x</sup>";
        document.getElementById("log-btn").innerHTML = "10<sup>x</sup>";
        document.getElementById("sqrt-btn").innerHTML = "x<sup>2</sup>";
        document.getElementById("xy-btn").innerHTML = "<sup>y</sup>√x";
    } else {
        inverseBtn.classList.add("btn-secondary");
        inverseBtn.classList.remove("btn-primary");
        document.getElementById("sin-btn").innerHTML = "sin";
        document.getElementById("cos-btn").innerHTML = "cos";
        document.getElementById("tan-btn").innerHTML = "tan";
        document.getElementById("ans-btn").innerHTML = "ANS";
        document.getElementById("ln-btn").innerHTML = "ln";
        document.getElementById("log-btn").innerHTML = "log";
        document.getElementById("sqrt-btn").innerHTML = "√";
        document.getElementById("xy-btn").innerHTML = "x<sup>y</sup>";
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
                return (match === "sin") ? "sinFunc" : "arcsinFunc";
            })
            .replace(/\barccos\b|cos/g, function (match) {
                return (match === "cos") ? "cosFunc" : "arccosFunc";
            })
            .replace(/\barctan\b|tan/g, function (match) {
                return (match === "tan") ? "tanFunc" : "arctanFunc";
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

        console.log("convertedValue:", convertedValue)
        const result = eval(convertedValue);
        // console.log("result", result);
        currentValue = result.toString();
        return currentValue;
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            const value = button.innerText;

            console.log("button value:", value)
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
                } else if (value == "ex") {
                    currentValue += `e**`;
                    display.value = currentValue;
                } else if (value == "10x") {
                    currentValue += `10**`;
                    display.value = currentValue;
                } else if (value == "x2") {
                    currentValue += `**2`;
                    display.value = currentValue;
                } else if (value == "y√x") {
                    currentValue = `Math.pow(${currentValue}, 1/`;
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
