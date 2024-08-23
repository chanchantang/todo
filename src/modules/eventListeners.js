import { setTaskDialog, addTaskCard } from "./domManipulation";
import { createTask, tasks } from './tasks'

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

const taskCards = document.querySelectorAll('.task-cards .card');

export function addTaskModalEvent(cardDom) {
  cardDom.addEventListener('click', (e) => {
    setTaskDialog(tasks[e.currentTarget.id]);
    dialog.showModal();
  });
}

// if you click outside the dialog, it will close it
dialog.addEventListener('click', (e) => {
  if (e.target.id !== 'dialog-div') {
      dialog.close();
  }
});

closeButton.addEventListener("click", () => {
  dialog.close();
});





const newTaskForm = document.querySelector('.new-task-form');
const newTaskTitle = document.querySelector('.new-task-form > input');

newTaskForm.addEventListener("submit", (e) => {
  const task = createTask(newTaskTitle.value);
  tasks[task.id] = task;
  addTaskCard(task);
  newTaskForm.reset();
});