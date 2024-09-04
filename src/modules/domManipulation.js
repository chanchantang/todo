import { createTask, tasks } from './tasks'
import { dialogListener, taskbarListener, tasksContainerListener } from "./eventListeners";
import { categories } from './categories';

const taskCards = document.querySelector('.task-cards');

const dialog = document.getElementById('task-dialog');
const dialogTitle = document.querySelector('.task-dialog .dialog-title');
const dialogNotes = document.querySelector('.task-dialog .dialog-notes')
const dialogStatus = document.querySelector('.task-dialog .dialog-status');
const dialogPriority = document.querySelector('.task-dialog .dialog-priority');
const dialogDueDate = document.querySelector('.task-dialog .dialog-due-date');
const dialogDueDatePlaceholder = document.querySelector('.due-date-placeholder');
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
  dialogNotes.value = task.notes;
  dialogStatus.value = task.status;
  dialogPriority.value = task.priority;

  dialogDueDate.value = task.dueDate;
  dialogDueDatePlaceholder.innerHTML = dialogDueDate.value;

  dialogCategory.value = task.category;
}

const categoryContainer = document.querySelector('.category-container');
// should be called display category button in sidebar and add event listener
export function displayCategory(categoryName) {
  const categorySection = document.createElement('div');
  categorySection.classList.add('category-section');
  categorySection.dataset.value = categoryName;

  // const icon; // if i wanna add an icon

  const categoryButton = document.createElement('button');
  categoryButton.innerHTML = categoryName;

  taskbarListener.addCategoryButtonEvent(categorySection);

  categorySection.appendChild(categoryButton);

  categoryContainer.appendChild(categorySection);
  // newCategory.classList.add(categoryName);
}

export function displayAllCategories() {
  for (const category of categories) {
    displayCategory(category);
  }
}

export function displayTaskCard(task) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('task-card');
  cardDiv.id = `${task.id}`;

  const statusCheckbox = document.createElement('input');
  statusCheckbox.type = 'checkbox';
  statusCheckbox.dataset.value = task.id;
  if (task.status == 'Completed') {
    statusCheckbox.checked = true;
  }
  tasksContainerListener.addStatusToggleEvent(statusCheckbox);

  const cardTitleDiv = document.createElement('div');
  cardTitleDiv.classList.add('card-title');
  cardTitleDiv.innerHTML = task.title;

  cardDiv.append(statusCheckbox);
  cardDiv.append(cardTitleDiv);

  dialogListener.addTaskModalEvent(cardDiv);

  taskCards.appendChild(cardDiv);
}

export function displayAllTaskCards() {
  taskCategoryTitle.value = 'All my tasks';
  taskCategoryTitle.disabled = true;

  for (const [id, task] of Object.entries(tasks)) {
    displayTaskCard(task);
  }
}

const taskCategoryTitle = document.querySelector('.task-cards-category');
export function displayTaskCardByCategory(category) {
  taskCategoryTitle.value = category; // maybe move this to a new function
  taskCategoryTitle.disabled = false;

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
  const allTaskCards = document.querySelectorAll('.task-card');
  allTaskCards.forEach(taskCard => {
    if (taskCard.id == id) {
      taskCard.remove();
    }
  });
}

export function hideAllTaskCards() {
  const allTaskCards = document.querySelectorAll('.task-card');
  allTaskCards.forEach(taskCard => {
    taskCard.remove();
  });
}