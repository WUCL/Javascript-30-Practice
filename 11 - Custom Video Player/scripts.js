/* Get element */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* Build function */
function togglePlay(e) {
	video[video.paused ? 'play' : 'pause' ]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	console.log(this.dataset);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	console.log(this.value);
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime) / (video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	console.log(scrubTime)
	video.currentTime = scrubTime;
}

function toggleScreen() {
	/* I only integrate Chrome version... */
	console.log(document.webkitFullscreenElement)
	if(!document.webkitFullscreenElement) {
		player.webkitRequestFullScreen();
	} else {
		document.webkitExitFullscreen();
	}
}

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => {
	range.addEventListener('input', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', toggleScreen);