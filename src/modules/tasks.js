import { uid } from 'uid';

export function createTask(title,
                          priority='', // Low, High, Urgent
                          startDate='2024-08-22', // Default to today
                          dueDate='2024-09-02', // Default to today
                          status='Not started', // Not started, In progress, Completed
                          notes='',
                          category,
                          id=uid()
                          ) {
  return {
    title,
    priority,
    startDate,
    dueDate,
    status,
    notes,
    category,
    id
  }
}

export const tasks = {
  '07412829b78': {
    title: 'Work on todo list',
    priority: 'High',
    startDate: undefined,
    dueDate: undefined,
    status: 'In progress',
    notes: undefined,
    category: undefined
  },
  '7412829b78d': {
    title: 'Clean up room',
    priority: 'Medium',
    startDate: '8/20/24',
    dueDate: '8/20/24',
    status: 'Not started',
    notes: undefined,
    category: undefined
  },
  '412829b78d7': {
    title: 'Work on todo list',
    priority: 'High',
    startDate: '8/20/24',
    dueDate: '8/26/24',
    status: 'In progress',
    notes: undefined,
    category: undefined
  },
}



// export default class Task {
//   constructor(title,
//               priority='', // Low, High, Urgent
//               startDate='2024-08-22', // Default to today
//               dueDate='2024-09-02', // Default to today
//               status='Not started', // Not started, In progress, Completed
//               notes='',
//               category,
//               id=uid()) {
//     this.title = title;
//     this.priority = priority;
//     this.startDate = startDate;
//     this.dueDate = dueDate;
//     this.status = status;
//     this.notes = notes;
//     this.category = category;

//     this.id = id;
//   }
// }
