const addTaskBtn = document.getElementById('submitTo');
const deskTaskInput = document.getElementById('inputTo');
const todoWrapper = document.querySelector('.todo-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElements = [];

function Task(description) {
	this.description = description;
	this.completed = false;
}

const createTemplate = (task, index) => {
	return `
	<div class="todo-item">
		<div class="description">${task.description}</div>
		<div class="buttons">
			<button onclick="deleteTask(${index})" class="brn-delete">Удалить</button>
		</div>
	</div>
	`
}

const fillHTMLList = () => {
	todoWrapper.innerHTML = '';
	if (tasks.length != 0) {
		tasks.forEach((item, index) => {
			todoWrapper.innerHTML += createTemplate(item, index);
		});
		todoItemElements = document.querySelectorAll('.todo-item');
	}
}

fillHTMLList();


const uppdateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value));
	uppdateLocal();
	fillHTMLList();
	deskTaskInput.value = ''
}) 

const deleteTask = index => {
	todoItemElements[index].classList.add('delition');
	setTimeout(() => {
		tasks.splice(index, 1);
		uppdateLocal();
		fillHTMLList();
	}, 700)
}