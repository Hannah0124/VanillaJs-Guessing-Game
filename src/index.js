const rangeForm = document.querySelector('.js-range-form'),
	numForm = document.querySelector('.js-number-form'),
	guessNumInput = document.querySelector('.js-number-input'),
	rangeInput = document.querySelector('.js-range-input'),
	rangeText = document.querySelector('.js-range-text'),
	result = document.querySelector('.js-result'),
	winner = document.querySelector('.js-winner');

const MAX_NUM_LS = 'maxNumber',
	GUESS_NUM_LS = 'guessNumber',
	SCORE_LS = 'score';

// test
class countScore {
	constructor() {
		this.user = 0;
		this.machine = 0;
	}
}

let score = new countScore();

function saveMaxNum() {
	localStorage.setItem(MAX_NUM_LS, rangeInput.value);
}

function saveGuessNum() {
	localStorage.setItem(GUESS_NUM_LS, guessNumInput.value);
}

function saveScore() {
	localStorage.setItem(SCORE_LS, JSON.stringify(score));
}

function handleRange(e) {
	e.preventDefault();
	const rangeNum = rangeInput.value;
	rangeText.innerText = `Generate a number between 0 and ${rangeNum}`;
	saveMaxNum();
}

function generateMachineNum() {
	const maxFromLs = localStorage.getItem(MAX_NUM_LS);
	let max = rangeInput.value + 1;
	if (maxFromLs !== null) {
		max = parseInt(maxFromLs, 10) + 1;
	}
	return Math.floor(Math.random() * Math.floor(max));
}

function handleSubmit(e) {
	e.preventDefault();
	// User guesses a number
	const guessNum = guessNumInput.value;
	// Generate a random number
	const machineNum = generateMachineNum();
	saveGuessNum();

	// Display result
	result.innerText = `You chose: ${guessNum}, the machine chose: ${machineNum}`;

	if (parseInt(guessNum, 10) === machineNum) {
		winner.innerText = 'You won!';
		winner.classList.add('green');
		winner.classList.remove('red');
		score.user += 1;
		saveScore();
	} else {
		winner.innerText = 'You lost!';
		winner.classList.add('red');
		winner.classList.remove('green');
		score.machine += 1;
		saveScore();
	}

	// Display scores
	const scoresFromLs = localStorage.getItem(SCORE_LS);
	const scoresObj = JSON.parse(scoresFromLs);
	const userScore = scoresObj.user;
	const machineScore = scoresObj.machine;

	const userSection = document.querySelector('.user-score');
	const machineSection = document.querySelector('.machine-score');
	userSection.innerText = userScore;
	machineSection.innerText = machineScore;
}

function init() {
	rangeForm.addEventListener('input', handleRange);
	numForm.addEventListener('submit', handleSubmit);
}

init();
