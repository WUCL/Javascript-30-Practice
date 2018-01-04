let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')


function timer(sec) {
	clearInterval(countdown)

	const now = Date.now();
	const then = now + sec * 1000;

	displayTimeLeft(sec);
	displayEndTime(then);
	countdown = setInterval(() => {
		const secLeft = Math.round((then - Date.now()) / 1000);

		// Stop if time up
		if(secLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secLeft);
		
	}, 1000);
}

function displayTimeLeft(sec) {
	const minutes = Math.floor(sec / 60);
	const remainderSecs = sec % 60;
	const display = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;

	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
})