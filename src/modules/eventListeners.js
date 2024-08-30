import * as domMan from "./domManipulation";
import { createTask, tasks, createAndAddTask, updateTask } from './tasks'
import { categories, addCategory } from "./categories";

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog .dialog-close");

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
    // maybe move this to a single function
    domMan.hideAllTaskCards();
    domMan.displayTaskCardByCategory(buttonDom.dataset.value);
  });
}

export function addStatusToggleEvent(dom) {
  dom.addEventListener('click', (e) => {
    e.stopImmediatePropagation(); // stops the opening of the dialog
    // updateTask(taskId, property, newValue);
    if (dom.checked) {
      updateTask(dom.dataset.value, 'status', 'Completed');
    } else {
      updateTask(dom.dataset.value, 'status', 'In progress');
    }
    console.log(dom.checked);
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

  const task = createAndAddTask(newTaskTitle.value);
  domMan.displayTaskCard(task);
  newTaskForm.reset();
});

const dialogTitle = document.querySelector('.dialog-title');
const dialogNotes = document.querySelector('.dialog-notes');
const dialogPriority = document.querySelector('.dialog-priority');
const dialogStatus = document.querySelector('.dialog-status');
const dialogDueDate = document.querySelector('.dialog-due-date');
const dialogCategory = document.querySelector('.dialog-category');

function addTaskChangeListener(dom, property) {
  dom.addEventListener('input', () => {
    const newValue = dom.value;
    if (!newValue) return;

    const taskId = dialog.dataset.value;
    updateTask(taskId, property, newValue);
  });
}

addTaskChangeListener(dialogNotes, 'notes');
addTaskChangeListener(dialogPriority, 'priority');
addTaskChangeListener(dialogStatus, 'status');
addTaskChangeListener(dialogDueDate, 'dueDate');
addTaskChangeListener(dialogCategory, 'category');

// also changes ui
dialogTitle.addEventListener('input', () => {
  const newTitle = dialogTitle.value;
  if (!newTitle) return;
  const taskId = dialog.dataset.value;
  updateTask(taskId, 'title', newTitle);
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
  const newCategory = newCategoryTitle.value;
  if (!newCategory) return;

  if (addCategory(newCategory)) {
    domMan.displayCategory(newCategory);
    domMan.appendCategoryDialog(newCategory);
    // consider putting these two functions into 1
    newCategoryForm.reset();
  } else {
    // error message
  }
});


const sidebarIcon = document.querySelector('.sidebar-icon');
const sidebar = document.querySelector('.sidebar')
sidebarIcon.addEventListener("click", () => {
  sidebar.classList.toggle('hidden');
});

const allTasksButton = document.querySelector('.category-all-tasks');
allTasksButton.addEventListener("click", () => {
  domMan.hideAllTaskCards();
  domMan.displayAllTaskCards();
});

const taskCardsCategory = document.querySelector('.task-cards-category');
taskCardsCategory.addEventListener("input", () => {
  // call categories.rename()
  // change name in sidebar
});


const test1 = document.querySelector('.dialog-due-date-div');
test1.addEventListener('click', () => {
  dialogDueDate.showPicker();
});