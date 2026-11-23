const inputBox = document.getElementById("input_box");
// console.log(inputBox);

// Display numbers and operators
const handleShowInput = (input) => {
    const currentValue = inputBox.value;
    // console.log(typeof currentValue);
    const lastChar = currentValue.slice(-1);// to check for consecutive operators in line 24 
    // console.log(currentValue , "," , lastChar);
    
    // prevent two decimal points in the same number
    if(input === "."){
        const currentNumber = currentValue.split(/[+\-*/]/).pop();// matches any single basic arithmetic operator character: +, -, *, or /.
        // console.log(currentNumber);

        if(currentNumber.includes('.')){
            // console.log("two decimal points in the same number detected");
            return;
        }
    }

    // prevent consecutive operators
    if(["+" , "-" , "*" , "/"].includes(input)){
        if(currentValue === "" || ["+" , "-" , "*" , "/"].includes(lastChar)){
            return;
        }
    }
    
    // inputBox.value = inputBox.value + input;
    inputBox.value += input;
    // console.log(inputBox.value);
};


const calculateResult = () => {
    const expression = inputBox.value;// 2+3*4

    if(expression === "") return;

    // convert the expression into numbers and operators
    const tokens = expression.match(/\d*\.?\d+|[+\-*/]/g);// (["2", "+", "3", "*", "4"];)
    // console.log(tokens);

    if(!tokens || tokens.join("") !== expression){
        inputBox.value = "Error";
        return;
    }

    // check whether numbers and operators are in the correct order
    if(tokens.length % 2 === 0 || 
        tokens.some((token,index) => index % 2 === 0 ? isNaN(Number(token)) 
        : !["+","-","*","/"].includes(token))){
        inputBox.value = "Error";
        return;
    }

    // perform M and D 1st
    const numbers = [Number(tokens[0])];
    // console.log(numbers);

    const operators = [];

    for(let i=1;i<tokens.length;i+=2){
        const operator = tokens[i];
        const nextNumber = Number(tokens[i+1]);
        // console.log(operator , "," , nextNumber);

        if(operator === "*"){
            numbers[numbers.length - 1] *= nextNumber;
        }
        else if(operator === "/"){
            if(nextNumber === 0){
                inputBox.value = "Error";
                return;
            }

            numbers[numbers.length - 1] /= nextNumber;
        }
        else{
            operators.push(operator);
            numbers.push(nextNumber);
        }
    }

    // then perform A and S
    let result = numbers[0];
    // console.log(result);

    for(let i=0;i<operators.length;i++){
        if(operators[i] === "+"){
            result += numbers[i+1];
        }
        else{
            result -= numbers[i+1];
        }
    }

    inputBox.value = Number.isFinite(result) ? String(Number(result.toPrecision(12))) : "Error";
}

// Clear the input
const clearInput = () => {
    inputBox.value = "";
};