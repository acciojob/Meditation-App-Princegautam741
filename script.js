const app = document.getElementById('app');
const meditationVideo = document.getElementById('meditation-video');
const meditationAudio = document.getElementById('meditation-audio');
const soundAButton = document.getElementById('soundA');
const soundBButton = document.getElementById('soundB');
const timeButtons = document.querySelectorAll('.time-select button');
const timeDisplay = document.querySelector('.time-display');
const playButton = document.querySelector('.play');

let meditationTime = 600; // Initial meditation time in seconds (10 minutes)
let timerInterval;

// Function to update the time display
function updateTimeDisplay() {
    const minutes = Math.floor(meditationTime / 60);
    const seconds = meditationTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to switch the meditation sound
soundAButton.addEventListener('click', () => {
    meditationAudio.src = 'Sounds/beach.mp3';
});

soundBButton.addEventListener('click', () => {
    meditationAudio.src = 'Sounds/rain.mp3';
});

// Function to handle time selection
timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTime = button.id;
        switch (selectedTime) {
            case 'smaller-mins':
                meditationTime = 120; // 2 minutes
                break;
            case 'medium-mins':
                meditationTime = 300; // 5 minutes
                break;
            case 'long-mins':
                meditationTime = 600; // 10 minutes
                break;
        }
        updateTimeDisplay();
    });
});

// Function to play and pause meditation
playButton.addEventListener('click', () => {
    if (meditationAudio.paused) {
        meditationAudio.play();
        meditationVideo.play();
        timerInterval = setInterval(() => {
            meditationTime--;
            if (meditationTime === 0) {
                clearInterval(timerInterval);
                meditationAudio.pause();
                meditationVideo.pause();
                playButton.textContent = 'Play';
            }
            updateTimeDisplay();
        }, 1000);
        playButton.textContent = 'Pause';
    } else {
        meditationAudio.pause();
        meditationVideo.pause();
        clearInterval(timerInterval);
        playButton.textContent = 'Play';
    }
});
