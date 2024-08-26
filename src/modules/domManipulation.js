import { createTask, tasks } from './tasks'
import { addTaskModalEvent, addCategoryButtonEvent } from "./eventListeners";
import { categories } from './categories';

const taskCards = document.querySelector('.task-cards');

const dialog = document.getElementById('task-dialog');
const dialogTitle = document.querySelector('.task-dialog .dialog-title');
const dialogStatus = document.querySelector('.task-dialog .dialog-status');
const dialogPriority = document.querySelector('.task-dialog .dialog-priority');
const dialogDueDate = document.querySelector('.task-dialog .dialog-due-date');
const dialogCategory = document.querySelector('.task-dialog .dialog-category');
// const dialogCloseButton = document.querySelector('.task-dialog button');

export function appendCategoryDialog(categoryName) {
  const newOption = document.createElement('option');
  newOption.innerHTML = categoryName;
  dialogCategory.appendChild(newOption);
}

export function appendAllCategoriesDialog() {
  for (const category of categories) {
    appendCategoryDialog(category);
  }
}

export function setTaskDialog(task, taskId) {
  dialog.dataset.value = taskId;

  dialogTitle.value = task.title;
  dialogStatus.value = task.status;
  dialogPriority.value = task.priority;
  dialogDueDate.value = task.dueDate;
  dialogCategory.value = task.category;
}

const sidebar = document.querySelector('.sidebar');
// should be called display in sidebar and add event listener
export function displayCategory(categoryName) {
  const newCategory = document.createElement('button');
  newCategory.innerHTML = categoryName;
  newCategory.dataset.value = categoryName;
  addCategoryButtonEvent(newCategory);
  sidebar.appendChild(newCategory);
  // newCategory.classList.add(categoryName);
}

export function displayAllCategories() {
  for (const category of categories) {
    displayCategory(category);
  }
}

export function displayTaskCard(task) {
  const newElement = document.createElement('div');
  newElement.classList.add('card');
  newElement.id = `${task.id}`;

  let cardInfo = `
    <div class="card-title">${task.title}</div>
    <div class="card-notes">Notes: ${task.notes}</div>
    <div class="card-priority">${task.priority}</div>
    <div class="card-start-date">${task.startDate}</div>
    <div class="card-due-date">${task.dueDate}</div>
    <div class="card-status">${task.status}</div>
    <div class="card-category">${task.category}</div>
  `

  newElement.innerHTML += cardInfo;

  addTaskModalEvent(newElement);

  taskCards.appendChild(newElement);
}

export function displayAllTaskCards() {
  for (const [id, task] of Object.entries(tasks)) {
    displayTaskCard(task);
  }
}

const taskCategoryTitle = document.querySelector('.task-cards-category');
export function displayTaskCardByCategory(category) {
  taskCategoryTitle.innerHTML = category; // maybe move this to a new function
  for (const [id, task] of Object.entries(tasks)) {
    if (task.category != category) continue;
    // const newTask = createTask(task.title, task.priority, task.startDate, task.dueDate, task.status, task.notes, task.category, id);
    displayTaskCard(task);
  }
}

export function updateTaskCardTitle(id, newTitle) {
  const allTaskCards = document.querySelectorAll('.card');
  allTaskCards.forEach(taskCard => {
    if (taskCard.id == id) {
      const cardTitle = taskCard.querySelector('.card-title');
      cardTitle.innerHTML = newTitle;
    }
  });
}

export function deleteTaskCard(id) {
  const allTaskCards = document.querySelectorAll('.card');
  allTaskCards.forEach(taskCard => {
    if (taskCard.id == id) {
      taskCard.remove();
    }
  });
}

export function hideAllTaskCards() {
  const allTaskCards = document.querySelectorAll('.card');
  allTaskCards.forEach(taskCard => {
    taskCard.remove();
  });
}