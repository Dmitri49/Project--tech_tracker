const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');

const technologies = [
	{ title: 'HTML', description: 'HTML Text', type: 'html', done: true },
	{ title: 'CSS', description: 'CSS Text', type: 'css', done: true },
	{ title: 'JavaScript', description: 'JavaScript Text', type: 'javascript', done: false },
	{ title: 'Git', description: 'Git Text', type: 'git', done: false },
	{ title: 'React', description: 'React Text', type: 'react', done: false },
];

content.addEventListener('click', openModal);
backdrop.addEventListener('click', closeModal);

function openModal() {
	modal.classList.add('open');
}

function closeModal() {
	modal.classList.remove('open');
}

function init() {
	renderCards();
	renderProgress();
}

function renderCards() {
	if (technologies.length === 0) {
		content.innerHTML = '<p class="empty">Add first technologie</p>';
	} else {
		content.innerHTML = technologies.map(toCard).join('');
	}
}

function toCard(tech) {
	let doneClass = tech.done ? 'done' : '';

	return `
		<div class="card ${doneClass}">
			<h3>${tech.title}</h3>
		</div>
	`;
}

function renderProgress() {
	const persent = computeProgressPersent();
	let background;

	if (persent <= 33) {
		background = '#e75a5a';
	} else if (persent > 33 && persent <= 66) {
		background = '#f99415';
	} else {
		background = '#73ba3c';
	}

	progress.style.width = `${persent}%`;
	progress.style.background = background;
	progress.textContent = persent ? `${persent}%` : '';
}

function computeProgressPersent() {
	if (technologies.length === 0) return 0;
	
	let doneCount = 0;
	for (const tech of technologies) {
		if (tech.done) {
			// eslint-disable-next-line no-unused-vars
			doneCount += 1;
		}
	}

	return Math.round((100 * doneCount) / technologies.length);
}


init();