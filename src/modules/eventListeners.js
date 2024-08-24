import { setTaskDialog, addTaskCard, updateTaskCardTitle } from "./domManipulation";
import { createTask, tasks } from './tasks'

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

const taskCards = document.querySelectorAll('.task-cards .card');

function closeAndUpdate() {
  dialog.close();
}

export function addTaskModalEvent(cardDom) {
  cardDom.addEventListener('click', (e) => {
    const taskId = e.currentTarget.id;
    setTaskDialog(tasks[taskId], taskId);
    dialog.showModal();
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
  addTaskCard(task);
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
  const taskId = dialog.dataset.value;
  tasks[taskId].title = newTitle;
  updateTaskCardTitle(taskId, newTitle);

  // Future feature

  // titleChanged = true;
  // setTimeout(() => {
  //   if (titleChanged) {
  //     updateTaskCardTitle(taskId, newTitle);
  //   }
  //   titleChanged = false;
  // }, 1000)

});