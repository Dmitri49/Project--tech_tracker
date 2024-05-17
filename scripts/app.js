const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');
const form = document.querySelector('#form');

const APP_TITLE = document.title;

const technologies = [];

content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeModal);
modal.addEventListener('change', toggleTech);
form.addEventListener('submit', createTech);

function openCard(event) {
	const data = event.target.dataset;
	const tech = technologies.find(t => t.type === data.type);
	if (!tech) return;

	openModal(toModal(tech), tech.title);
}

function toModal(tech) {
	const checked = tech.done ? 'checked' : '';
	return `
		<h2>${tech.title}</h2>
		<p>${tech.description}</p>
		<hr />
		<div class="modal-container">
			<div>
				<input type="checkbox" id="done" ${checked} data-type="${tech.type}"/>
				<label for="done">Выучил</label>
  			</div>
  			<div class="remove-btn" id="remove" data-type="${tech.type}">Delete</div>
		</div>
		
	`;
}

function toggleTech(event) {
	const type = event.target.dataset.type;
	const tech = technologies.find(t => t.type === type);
	tech.done = event.target.checked;

	init();
}

function openModal(html, title = APP_TITLE) {
	document.title = `${title} | ${APP_TITLE}`;
	modal.innerHTML = html;
	modal.classList.add('open');

	const removeBtn = document.querySelector('#remove');
	removeBtn.addEventListener('click', removeTech);
}

function closeModal() {
	document.title = APP_TITLE;
	modal.classList.remove('open');
}

function init() {
	renderCards();
	renderProgress();
}

function renderCards() {
	if (technologies.length === 0) {
		content.innerHTML = '<p class="empty">Добавить первую технологию</p>';
	} else {
		content.innerHTML = technologies.map(toCard).join('');
	}
}

function toCard(tech) {
	let doneClass = tech.done ? 'done' : '';

	return `
		<div class="card ${doneClass}" data-type="${tech.type}">
			<h3 data-type="${tech.type}">${tech.title}</h3>
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
			doneCount += 1;
		}
	}

	return Math.round((100 * doneCount) / technologies.length);
}

function isInvalid(title, description) {
	return !title.value || !description.value;
}

function createTech(event) {
	event.preventDefault();

	const title = event.target.title;
	const description = event.target.description;

	if (isInvalid(title, description)) {
		if (!title.value) title.classList.add('invalid');
		if (!description.value) description.classList.add('invalid');

		setTimeout(() => {
			title.classList.remove('invalid');
			description.classList.remove('invalid');
		}, 2000);
		return;
	}

	for (const tech of technologies) {
		if (tech.type === title.value.toLowerCase()) {
			alert('this technology has already been added');
			title.value = '';
			description.value = '';
			return;
		}
	}

	const newTech = {
		title: title.value,
		description: description.value,
		done: false,
		type: title.value.toLowerCase()
	};

	technologies.push(newTech);

	title.value = '';
	description.value = '';
	init();
}

function removeTech(event) {
	const type = event.target.dataset.type;
	const index = technologies.findIndex(t => t.type === type);
	technologies.splice(index, 1);

	closeModal();
	init();
}

init();