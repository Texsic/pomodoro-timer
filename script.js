let timer;
let totalSeconds = 15*60;
let secondsLeft = totalSeconds;
let isPaused = false;
let timerRunning = false;

function toggleStartPause() {
    const startPauseButton = document.querySelector('.control-buttons button');
    
    if (!timerRunning) {
        startTimer();
        startPauseButton.textContent = 'Pause';
    } else {
        togglePauseResume();
    }
}

function startTimer() {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
    timerRunning = true;
}

function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutes, seconds);

 if (secondsLeft === 0 ) {
        clearInterval(timer);
        timerRunning = false;
        alert('Time is up! Take a break.');
        resetTimer();
    } else if (!isPaused) {
        secondsLeft--;
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function togglePauseResume() { 
    const pauseResumeButton = document.querySelector('.control-buttons button'); 
    isPaused = !isPaused; 

    if (isPaused) { 
        clearInterval(timer); 
        pauseResumeButton.textContent = 'Resume'; 
    } else { 
        startTimer(); 
        pauseResumeButton.textContent = 'Pause'; 
    } 
}

function resetTimer() {
    clearInterval(timer);
    secondsLeft = totalSeconds;
    isPaused = false;
    timerRunning = false;

    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(Math.floor(totalSeconds / 60), totalSeconds % 60);

    const startPauseButton = document.querySelector('.control-buttons button');
    startPauseButton.textContent = 'Start';
}

function setTimer() {
    const newTime = prompt('Enter new time in minutes:');

    if (!isNaN(newTime) && newTime > 0) {
        totalSeconds = newTime * 60;
        resetTimer();
    } else {
        alert('Invalid input. Please enter a valid number greater than 0.');
    }
}