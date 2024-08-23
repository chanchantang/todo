import { createTask, tasks } from './tasks'
import { addTaskModalEvent } from "./eventListeners";





const taskCards = document.querySelector('.task-cards');

const dialogTitle = document.querySelector('.task-dialog .dialog-title');
const dialogStatus = document.querySelector('.task-dialog .dialog-status');
const dialogPriority = document.querySelector('.task-dialog .dialog-priority');
const dialogDueDate = document.querySelector('.task-dialog .dialog-due-date');
const dialogCategory = document.querySelector('.task-dialog .dialog-category');
const dialogCloseButton = document.querySelector('.task-dialog button');

export function setTaskDialog(task) {
  dialogTitle.value = task.title;
  dialogStatus.value = task.status;
  dialogPriority.value = task.priority;
  dialogDueDate.value = task.dueDate;
  dialogCategory.value = task.category;
}

const cards = document.querySelector('.task-cards');

export function addTaskCard(task) {
  const newElement = document.createElement('div');
  newElement.classList.add('card');
  newElement.id = `${task.id}`;

  let cardInfo = `
    <div class="card-title">${task.title}</div>
    <div class="card-desc">${task.desc} Out of order</div>
    <div class="card-priority">${task.priority}</div>
    <div class="card-start-date">${task.startDate}</div>
    <div class="card-due-date">${task.dueDate}</div>
    <div class="card-status">${task.status}</div>
  `

  newElement.innerHTML += cardInfo;

  addTaskModalEvent(newElement);

  cards.appendChild(newElement);
}

export function addAllTaskCards() {
  for (const [id, task] of Object.entries(tasks)) {
    const newTask = createTask(task.title, task.priority, task.startDate, task.dueDate, task.status, task.notes, task.category, id);
    addTaskCard(newTask);
  }
}