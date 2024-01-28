let seconds = 0;
let tens = 0;
let mins = 0;
let lapNumber = 1;
let interval;
let isRunning = false; // Flag to track whether the stopwatch is running

let getSeconds = document.querySelector('.seconds');
let getTens = document.querySelector('.tens');
let getMins = document.querySelector('.mins');
let btnToggle = document.querySelector('.btn-toggle'); // Combined start/stop button
let btnReset = document.querySelector('.btn-reset');
let btnLap = document.querySelector('.btn-lap');
let lapsContainer = document.querySelector('.laps-container');

function updateButtonText() {
    btnToggle.textContent = isRunning ? 'Stop' : 'Start';
}

function startStopwatch() {
    interval = setInterval(() => {
        tens++;

        if (tens <= 9) {
            getTens.innerHTML = '0' + tens;
        } else {
            getTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            getSeconds.innerHTML = (seconds <= 9) ? '0' + seconds : seconds;
            tens = 0;
            getTens.innerHTML = '00';
        }

        if (seconds > 59) {
            mins++;
            getMins.innerHTML = (mins <= 9) ? '0' + mins : mins;
            seconds = 0;
            getSeconds.innerHTML = '00';
        }
    }, 10);
}

function toggleStopwatch() {
    if (isRunning) {
        clearInterval(interval);
    } else {
        startStopwatch();
    }
    isRunning = !isRunning;
    updateButtonText();
}

function resetStopwatch() {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    mins = 0;
    lapNumber = 1;
    getSeconds.innerHTML = '00';
    getTens.innerHTML = '00';
    getMins.innerHTML = '00';
    lapsContainer.innerHTML = ''; // Clear laps
    isRunning = false;
    updateButtonText();
}

function addLap() {
    if (isRunning || seconds !== 0 || tens !== 0 || mins !== 0) {
        let lapTime = `${getMins.innerHTML}:${getSeconds.innerHTML}.${getTens.innerHTML}`;

        let lapElement = document.createElement('p');
        lapElement.innerHTML = `Lap ${lapNumber}: ${lapTime}`;

        lapsContainer.appendChild(lapElement);
        lapNumber++;
    }
}

btnToggle.addEventListener('click', toggleStopwatch);
btnReset.addEventListener('click', resetStopwatch);
btnLap.addEventListener('click', addLap);
