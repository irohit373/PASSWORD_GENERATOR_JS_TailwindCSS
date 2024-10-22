const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";

let passwordLength = 10;

let checkCount = 0;
handleSlider();
setindicator("#ccc");
// handleSlider();

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');

    // Hide the toast after 2 seconds
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, 2000);
}

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setindicator(color) {
    indicator.style.backgroundColor = color;
    // indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
 
function getRanInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumberr(){
    return getRanInteger(0.9);
}

function generateLowerCase() {
    return String.fromCharCode(getRanInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRanInteger(65,91));
}

function generateSymbol() {
    const randNum = getRanInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper & hasLower && (hasNum || hasSym) && passwordLength>=0) {
        setindicator("#0f0");
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >=0
    ){
        setindicator("#ff0");
    }else{
        setindicator("#f00");
    }
}

function shufflePassword(array){
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function copyText() {
    const text = document.getElementById("passwd_display");
    text.select();
     navigator.clipboard.writeText(text.value).then(() => {
        console.log('Text copied to clipboard');
        showToast();
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}


function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();  
})

console.log("Starting the Journey98");

generateBtn.addEventListener('click', () => {
    console.log("Starting the Journey");
   
    if(checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("Starting the Journey");
    password="";


    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumberr();
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumberr);
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    for (let i=0; i < funcArr.length; i++) {
        password += funcArr[i]();
        
    }

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
         let randIndex = getRanInteger(0, funcArr.length);
         password += funcArr[randIndex]();
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    console.log("hp");
    

    calcStrength();
});






