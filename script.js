let captchaText = document.querySelector('#captcha');
let ctx = captchaText.getContext("2d");

// Set canvas size
captchaText.width = 300;
captchaText.height = 80;

// Updated font and style
ctx.font = "bold 30px Inter";
ctx.fillStyle = "#6366f1";

let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');

let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function generateCaptcha() {
    let emptyArr = [];
    for (let i = 1; i <= 6; i++) {
        emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    
    // Add visual noise
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    
    // Add background lines
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * captchaText.width, Math.random() * captchaText.height);
        ctx.lineTo(Math.random() * captchaText.width, Math.random() * captchaText.height);
        ctx.strokeStyle = "#e2e8f0";
        ctx.stroke();
    }
    
    // Add text with slight rotation
    ctx.save();
    ctx.translate(captchaText.width/3, captchaText.height/1.8);
    ctx.rotate(Math.random() * 0.1 - 0.05);
    ctx.fillText(emptyArr.join(''), 0, 0);
    ctx.restore();
    
    return emptyArr.join('');
}

let c = generateCaptcha();

userText.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        validateCaptcha();
    }
});

submitButton.addEventListener('click', validateCaptcha);
refreshButton.addEventListener('click', function() {
    userText.value = "";
    c = generateCaptcha();
    output.innerHTML = "";
    output.classList.remove("correctCaptcha", "incorrectCaptcha");
});

function validateCaptcha() {
    if (userText.value === c) {
        output.classList.remove("incorrectCaptcha");
        output.classList.add("correctCaptcha");
        output.innerHTML = "Verification successful!";
    } else {
        output.classList.remove("correctCaptcha");
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Please try again";
    }
}
