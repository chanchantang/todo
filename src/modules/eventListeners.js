import * as domMan from "./domManipulation";
import { createTask, tasks } from './tasks'
import { categories } from "./categories";

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

const taskCards = document.querySelectorAll('.task-cards .card');

function closeAndUpdate() {
  dialog.close();
}

export function addTaskModalEvent(cardDom) {
  cardDom.addEventListener('click', (e) => {
    const taskId = e.currentTarget.id;
    domMan.setTaskDialog(tasks[taskId], taskId);
    dialog.showModal();
  });
}

export function addCategoryButtonEvent(buttonDom) {
  buttonDom.addEventListener('click', (e) => {
    domMan.hideAllTaskCards();
    domMan.displayTaskCardByCategory(buttonDom.dataset.value);
  });
}

// if you click outside the dialog, it will close it
dialog.addEventListener('click', (e) => {
  if (e.target.id == 'task-dialog') {
    closeAndUpdate();
  }
});

closeButton.addEventListener("click", () => {
  closeAndUpdate();
});

const newTaskForm = document.querySelector('.new-task-form');
const newTaskTitle = document.querySelector('.new-task-form > input');

newTaskForm.addEventListener("submit", (e) => {
  if (!newTaskTitle.value) return;

  const task = createTask(newTaskTitle.value);
  tasks[task.id] = task;
  domMan.displayTaskCard(task);
  newTaskForm.reset();
});

const dialogTitle = document.querySelector('.dialog-title');
const dialogPriority = document.querySelector('.dialog-priority');
const dialogStatus = document.querySelector('.dialog-status');
const dialogDueDate = document.querySelector('.dialog-due-date');
const dialogCategory = document.querySelector('.dialog-category');

function addTaskChangeListener(dom, property) {
  dom.addEventListener('input', () => {
    const newValue = dom.value;
    if (!newValue) return;
    const taskId = dialog.dataset.value;
    tasks[taskId][property] = newValue;
  });
}

addTaskChangeListener(dialogPriority, 'priority');
addTaskChangeListener(dialogStatus, 'status');
addTaskChangeListener(dialogDueDate, 'dueDate');
addTaskChangeListener(dialogCategory, 'category');

// also changes ui
dialogTitle.addEventListener('input', () => {
  const newTitle = dialogTitle.value;
  if (!newTitle) return;
  const taskId = dialog.dataset.value;
  tasks[taskId].title = newTitle;
  domMan.updateTaskCardTitle(taskId, newTitle);

  // Future feature

  // titleChanged = true;
  // setTimeout(() => {
  //   if (titleChanged) {
  //     updateTaskCardTitle(taskId, newTitle);
  //   }
  //   titleChanged = false;
  // }, 1000)

});

const newCategoryForm = document.querySelector('.new-category-form');
const newCategoryTitle = document.querySelector('.new-category-form > input');
newCategoryForm.addEventListener('submit', () => {
  // need to add check for duplicate categories
  const newCategory = newCategoryTitle.value;
  if (!newCategory) return;
  domMan.displayCategory(newCategory);
  categories.push(newCategory);
  newCategoryForm.reset();
});