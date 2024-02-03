const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');

const technologies = [
	{title: 'HTML', description: 'HTML Text', type: 'html', done: false},
	{title: 'CSS', description: 'CSS Text', type: 'css', done: false},
	{title: 'JavaScript', description: 'JavaScript Text', type: 'javascript', done: false},
	{title: 'Git', description: 'Git Text', type: 'git', done: false},
	{title: 'React', description: 'React Text', type: 'react', done: false},
];

content.addEventListener('click', openModal);
backdrop.addEventListener('click', closeModal);

function openModal() {
	modal.classList.add('open');
}

function closeModal() {
	modal.classList.remove('open');
}

let html = '';

for (let i = 0; i < technologies.length; i++) {
	html += `
        <div class="card">
            <h3>HTML</h3>
        </div>
    `;
}

content.innerHTML += html;