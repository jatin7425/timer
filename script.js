let hrDisplay = document.getElementById('hr');
let minDisplay = document.getElementById('min');
let secDisplay = document.getElementById('sec');
let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resumeBtn = document.getElementById('resumeBtn');
let restartBtn = document.getElementById('restartBtn');
let message = document.getElementById('message');
let clickhere = document.getElementById('clickhere');
let stopmusic = document.getElementById('stopmusic');
let stopmusicbtn = document.getElementById('stopmusicbtn');
let countdownInterval;
let isPaused = false;
let remainingHours = 0;
let remainingMinutes = 0;
let remainingSeconds = 0;
let music1 = new Audio('digital-alarm-clock-151920.mp3');
music1.loop = true;

hrDisplay.textContent = '00 :';
minDisplay.textContent = '00 :';
secDisplay.textContent = '00';

function hambaropen() {
    bar1.style.cssText = "width: 75%; top: 0; left: 0; transform: rotate(0deg);";
    bar2.style.cssText = "top: 50%; width: 100%; transform: rotate(0deg) translateY(-50%);";
    bar3.style.cssText = "width: 75%; bottom: 0; right: 0; transform: rotate(0deg);";
    container.style.transform = "translateY(-100%)";
    hambool = false;
}

function hambarclose() {
    bar1.style.cssText = "transform: rotate(45deg); top: 17%; left: -13%;";
    bar2.style.cssText = "transform: rotate(-45deg); width: 156%; left: -27%; top: 45%;";
    bar3.style.cssText = "transform: rotate(45deg); bottom: 17%; right: -16%;";
    container.style.transform = "translateY(0)";
    hambool = true;
}

function startCountdown() {
    let hours = parseInt(hoursInput.value);
    let minutes = parseInt(minutesInput.value);
    let seconds = parseInt(secondsInput.value);
    remainingHours = hours;
    remainingMinutes = minutes;
    remainingSeconds = seconds;
    countdownInterval = setInterval(updateCountdown, 1000);
}

function ShowEnd(params) {
    stopmusic.style.display = params
}

function updateCountdown() {
    if (remainingSeconds === 0) {
        if (remainingMinutes === 0) {
            if (remainingHours === 0) {
                clearInterval(countdownInterval);
                ShowEnd('flex');
                music1.play();
                return;
            }
            remainingHours--;
            remainingMinutes = 59;
        } else {
            remainingMinutes--;
        }
        remainingSeconds = 59;
    } else {
        remainingSeconds--;
    }
    hrDisplay.textContent = formatTime(remainingHours) + ':';
    minDisplay.textContent = formatTime(remainingMinutes) + ':';
    secDisplay.textContent = formatTime(remainingSeconds);
}

function resetTimer() {
    clearInterval(countdownInterval);
    hrDisplay.textContent = '00 :';
    minDisplay.textContent = '00 :';
    secDisplay.textContent = '00 ';
    message.textContent = 'Timer reset';
    setTimeout(() => { message.textContent = ''; }, 1000);
    remainingHours = remainingMinutes = remainingSeconds = 0;
}

function startCountdownWithRemainingTime() {
    countdownInterval = setInterval(updateCountdown, 1000);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

stopmusicbtn.addEventListener('click', () =>{
    ShowEnd('none');
    music1.pause();
});

setInterval(() => { clickhere.style.display = 'none'; }, 3000);

restartBtn.addEventListener('click', () => {
    resetTimer();
    startCountdown();
    message.textContent = 'Timer Reset';
    clickhere.style.display = 'inline-block';
    setTimeout(() => { message.textContent = ''; }, 1000);
    setInterval(() => { clickhere.style.display = 'none'; }, 3000);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    isPaused = true;
    message.textContent = 'Timer is paused';
    setTimeout(() => { message.textContent = ''; }, 1000);
});

resumeBtn.addEventListener('click', () => {
    if (!isPaused) return;
    startCountdownWithRemainingTime();
});

startBtn.addEventListener('click', () => {
    startCountdown();
    if (!(hoursInput.value || minutesInput.value || secondsInput.value)) message.textContent = 'Please enter Values';
    setTimeout(() => { message.textContent = ''; }, 1000);
    container.style.transform = "translateY(-100%)";
    hambaropen();
});

resetBtn.addEventListener('click', () => {
    [hoursInput, minutesInput, secondsInput].forEach(input => input.value = '');
    resetTimer();
});

let container = document.getElementById('container');
let ham = document.getElementById('ham');
let bar1 = document.getElementById('bar1');
let bar2 = document.getElementById('bar2');
let bar3 = document.getElementById('bar3');
let hambool = false;

ham.addEventListener("click", () => { hambool ? hambaropen() : hambarclose(); });
