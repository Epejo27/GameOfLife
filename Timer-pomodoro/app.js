const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.start-button');
const actName = document.querySelector('.act-name');
const Push = document.querySelector('.Push');
const Pull = document.querySelector('.Pull');
const Leg = document.querySelector('.Leg');

let Interval;
let isDoing = true;
let exerciseNumber = 0
let exercise;

const startW = (exerciseList) => {
    exercise = exerciseList;
    isDoing = true;

    Push.remove();
    Pull.remove();
    Leg.remove();

    actName.textContent = exercise[0][0];
    startBtn.textContent = 'Done';
    document.querySelector('.circle-wrapper').classList.remove('hidden');
    startBtn.addEventListener('click', appTimer);
}

const appTimer = () => {
    if(isDoing) {
        isDoing = false;
        let minutes = exercise[exerciseNumber][1] * 60;
        let seconds = exercise[exerciseNumber][2];
        let totalSeconds = minutes + seconds;

        const updateSeconds = () => {
            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds%60;

            if(minutesLeft === 0 && secondsLeft === 0) { // rest is done, now doing
                bells.play();
                clearInterval(Interval);
                isDoing = true
                actName.textContent = exercise[exerciseNumber+1][0];
                startBtn.textContent = 'Done';
                exerciseNumber++;
            } else { // still resting
                actName.textContent = 'Next: ' + exercise[exerciseNumber+1][0];
                if(secondsLeft < 10) {
                    startBtn.textContent = minutesLeft + ':0' + secondsLeft;
                } else {
                    startBtn.textContent = minutesLeft + ':' + secondsLeft;
                }
            }
        } 
        Interval = setInterval(updateSeconds, 1000);
    } else {
        alert('Wait for rest time!');
    }
}

const PushList = [
    ['Archer Push Up x 8', 2, 30],
    ['Full Ring Dips x 8', 2, 30],
    ['Assisted Ring Dips x 12', 2, 30],
    ['Assisted Ring Dips x 12', 2, 30],
    ['Chair Dips x 12', 2, 30],
    ['Chair Dips x 12', 2, 30],
    ['Chair Dips x 12', 2, 30],
    ['Pike Push Up x 12', 2, 30],
    ['Pike Push Up x 12', 2, 30],
    ['Pike Push Up x 12', 2, 30],
    ['Leg Raise x 12', 2, 0],
    ['Leg Raise x 12', 2, 0],
];

const PullList = [
    ['Assisted Pull Up x 8', 2, 30],
    ['Assisted Pull Up x 8', 2, 30],
    ['Assisted Pull Up x 8', 2, 30],
    ['Australian Pull Up x 12', 2, 30],
    ['Australian Pull Up x 12', 2, 30],
    ['Australian Pull Up x 12', 2, 30],
    ['Hanging Knee Raise x 12', 2, 0],
    ['Hanging Knee Raise x 12', 2, 0],
    ['Hollow Body Hang x 60', 2, 0],
    ['Hollow Body Hang x 60', 2, 0],
];

const LegList = [
    ['Bulgarian Split Squat x 12', 2, 30],
    ['Bulgarian Split Squat x 12', 2, 30],
    ['Bulgarian Split Squat x 12', 2, 30],
    ['Front Staggered Squat x 12', 2, 30],
    ['Front Staggered Squat x 12', 2, 30],
    ['Front Staggered Squat x 12', 2, 30],
    ['Compact Leg Lift x 12', 2, 0],
    ['Compact Leg Lift x 12', 2, 0],
];


Push.addEventListener('click', () => startW(PushList));
Pull.addEventListener('click', () => startW(PullList));
Leg.addEventListener('click', () => startW(LegList));