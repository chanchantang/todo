import * as domMan from "./domManipulation";
import { tasks, createAndAddTask, updateTask } from './tasks'
import { addCategory } from "./categories";

export const dialogListener = (function() {
  const taskDialog = document.querySelector(".task-dialog");
  const taskDialogCloseButton = document.querySelector(".task-dialog .dialog-close");

  const newCategory = document.querySelector('#new-category-button');
  const categoryDialog = document.querySelector('.category-dialog');
  const categoryDialogCloseButton = document.querySelector(".category-dialog .dialog-close");

  function closeAndUpdate(dialog) {
    dialog.close();
  }

  function addCloseDialogListeners(dialog, dialog_id, closeButton) {
    // if you click outside the dialog, it will close it
    dialog.addEventListener('click', (e) => {
      if (e.target.id == dialog_id) {
        closeAndUpdate(dialog);
      }
    });

    closeButton.addEventListener('click', () => {
      closeAndUpdate(dialog);
    });
  }

  /**
   * Category Dialog
   */

  newCategory.addEventListener('click', () => {
    categoryDialog.showModal();
  });

  addCloseDialogListeners(categoryDialog, 'category-dialog', categoryDialogCloseButton);

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
      closeAndUpdate(categoryDialog);
    } else {
      // error message
    }
  });

  /**
   * Task Dialog
   */

  const addTaskModalEvent = (cardDom) => {
    cardDom.addEventListener('click', (e) => {
      const taskId = e.currentTarget.id;
      domMan.setTaskDialog(tasks[taskId], taskId);
      taskDialog.showModal();
    });
  }

  addCloseDialogListeners(taskDialog, 'task-dialog', taskDialogCloseButton);

  const dialogTitle = document.querySelector('.task-dialog .dialog-title');
  const dialogNotes = document.querySelector('.task-dialog .dialog-notes');
  const dialogPriority = document.querySelector('.task-dialog .dialog-priority');
  const dialogStatus = document.querySelector('.task-dialog .dialog-status');
  const dialogDueDate = document.querySelector('.task-dialog .dialog-due-date');
  const dialogCategory = document.querySelector('.task-dialog .dialog-category');

  function addTaskChangeListener(dom, property) {
    dom.addEventListener('input', () => {
      const newValue = dom.value;
      if (!newValue) return;

      const taskId = taskDialog.dataset.value;
      updateTask(taskId, property, newValue);
    });
  }

  addTaskChangeListener(dialogNotes, 'notes');
  addTaskChangeListener(dialogPriority, 'priority');
  addTaskChangeListener(dialogStatus, 'status');
  addTaskChangeListener(dialogDueDate, 'dueDate');
  addTaskChangeListener(dialogCategory, 'category');

  dialogTitle.addEventListener('input', () => {
    const newTitle = dialogTitle.value;
    if (!newTitle) return;
    const taskId = taskDialog.dataset.value;
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

  const dialogDueDateDiv = document.querySelector('.dialog-due-date-div');
  dialogDueDateDiv.addEventListener('click', () => {
    dialogDueDate.showPicker();
  });

  return { addTaskModalEvent };
})();

export const taskbarListener = (function() {
  const sidebarCollapse = document.querySelector('.sidebar-collapse');
  const sidebarOpen = document.querySelector('.sidebar-open');
  const sidebar = document.querySelector('.sidebar')
  sidebarCollapse.addEventListener("click", () => {
    sidebar.classList.add('hidden');
    sidebarOpen.classList.remove('hidden');
  });

  sidebarOpen.addEventListener("click", () => {
    sidebar.classList.remove('hidden');
    sidebarOpen.classList.add('hidden');
  });


  const allTasksButton = document.querySelector('.category-all-tasks');
  allTasksButton.addEventListener("click", () => {
    // maybe move this to a single function
    domMan.hideAllTaskCards();
    domMan.displayAllTaskCards();
  });

  const addCategoryButtonEvent = (dom) => {
    dom.addEventListener('click', () => {
      // maybe move this to a single function
      domMan.hideAllTaskCards();
      domMan.displayTaskCardByCategory(dom.dataset.value);
    });
  }
  return { addCategoryButtonEvent };
})();

export const tasksContainerListener = (function() {

  const addStatusToggleEvent = (dom) => {
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

  const newTaskForm = document.querySelector('.new-task-form');
  const newTaskTitle = document.querySelector('.new-task-form > input');

  newTaskForm.addEventListener("submit", (e) => {
    if (!newTaskTitle.value) return;

    const task = createAndAddTask(newTaskTitle.value);
    domMan.displayTaskCard(task);
    newTaskForm.reset();
  });

  const taskCardsCategory = document.querySelector('.task-cards-category');
  taskCardsCategory.addEventListener("input", () => {
    // call categories.rename()
    // change name in sidebar
  });


  return { addStatusToggleEvent };
})();