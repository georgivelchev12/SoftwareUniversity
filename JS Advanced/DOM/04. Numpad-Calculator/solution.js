function solve() {
    let operations = {
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "+": (a, b) => a + b,
        "-": (a, b) => a - b
    }
    let expressionOutput = document.querySelector("#expressionOutput");
    let resultOutput = document.querySelector("#resultOutput");
    document.querySelector(".keys").addEventListener("click", e => {
        if (e.target.value == "=") {
            let pattern = /(?<leftNum>[0-9]+(\.[0-9]+)?)(?<sign>[/*-+])(?<rightNum>[0-9]+(\.[0-9]+)?)/g
            if ((valid = pattern.exec(expressionOutput.textContent.split(" ").join(""))) !== null) {
                let left = Number(valid.groups.leftNum);
                let right = Number(valid.groups.rightNum);
                resultOutput.textContent = operations[valid.groups.sign](left, right);
            }
            else {
                resultOutput.textContent = "NaN";
            }
        }
        else {
            if (Object.keys(operations).includes(e.target.value)) {
                expressionOutput.textContent += " " + e.target.value + " "
            }
            else {
                expressionOutput.textContent += e.target.value;
            }
        }
    })
    document.querySelector("#calculator > div.top > button").addEventListener("click", () => {
        expressionOutput.textContent = "";
        resultOutput.textContent = "";
    })
}