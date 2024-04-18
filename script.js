let hrDisplay = document.getElementById('hr');
let minDisplay = document.getElementById('min');
let secDisplay = document.getElementById('sec');

let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let stopBtn = document.getElementById('stopBtn');
let restartBtn = document.getElementById('restartBtn');
let countdownInterval;

let message = document.getElementById('message');

let clickhere = document.getElementById('clickhere');


hrDisplay.textContent = '00 :';
minDisplay.textContent = '00 :';
secDisplay.textContent = '00';

function hambaropen() {
    bar1.style.width = "75%";
    bar1.style.top = "0";
    bar1.style.left = "0";
    bar1.style.transform = "rotate(0deg)";

    bar2.style.top = "50%";
    bar2.style.width = "100%";
    bar2.style.transform = "rotate(0deg) translateY(-50%)";

    bar3.style.width = "75%";
    bar3.style.bottom = "0";
    bar3.style.right = "0";
    bar3.style.transform = "rotate(0deg)";

    container.style.transform = "translateY(-100%)";
    hambool = false;
}

function hambarclose() {
    bar1.style.transform = "rotate(45deg)";
    bar1.style.top = "17%";
    bar1.style.left = "-13%";

    bar2.style.transform = "rotate(-45deg)";
    bar2.style.width = "156%";
    bar2.style.left = "-27%";
    bar2.style.top = "45%";

    bar3.style.transform = "rotate(45deg)";
    bar3.style.bottom = "17%";
    bar3.style.right = "-16%";

    container.style.transform = "translateY(0)";
    hambool = true;
}

function startCountdown() {
    let hours = parseInt(hoursInput.value);
    let minutes = parseInt(minutesInput.value);
    let seconds = parseInt(secondsInput.value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert('Please enter valid numbers for hours, minutes, and seconds.');
        return;
    }

    countdownInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    clearInterval(countdownInterval);
                    alert('Countdown completed!');
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }

        hrDisplay.textContent = formatTime(hours) + ':';
        minDisplay.textContent = formatTime(minutes) + ':';
        secDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function resetTimer() {
    clearInterval(countdownInterval);
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    hrDisplay.textContent = '00 :';
    minDisplay.textContent = '00 :';
    secDisplay.textContent = '00';
    message.textContent = 'Timer reset';
    setInterval(() => {
        message.textContent = '';
    }, 1000);
}

let isPaused = false;

stopBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    isPaused = true;
    message.textContent = 'Timer is paused';
    setInterval(() => {
        message.textContent = '';
    }, 1000);
});

setInterval(() => {
    clickhere.style.display = 'none';
}, 3000);

restartBtn.addEventListener('click', () => {
    if (isPaused) {
        startCountdown();
        isPaused = false;
    }
    message.textContent = 'Timer Started';
    clickhere.style.display = 'inline-block';

    setInterval(() => {
        message.textContent = '';
    }, 1000);

    setInterval(() => {
        clickhere.style.display = 'none';
    }, 3000);

});


function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

startBtn.addEventListener('click', () => {
    startCountdown();
    if (hoursInput.value == 0 && minutesInput.value == 0 && secondsInput.value == 0) {
        message.textContent = 'Please enter Values';
    }
    setTimeout(() => {
        message.textContent = '';
    }, 1000);
    container.style.transform = "translateY(-100%)";

    hambaropen();
});

resetBtn.addEventListener('click', resetTimer);

let container = document.getElementById('container');
let ham = document.getElementById('ham');
let bar1 = document.getElementById('bar1');
let bar2 = document.getElementById('bar2');
let bar3 = document.getElementById('bar3');
let hambool = false;

ham.addEventListener("click", () => {
    if (hambool == false) {
        hambarclose();
    } else {
        hambaropen();
    }
});
