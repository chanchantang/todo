import { uid } from 'uid';

export function createTask(title,
                          priority='', // Low, High, Urgent
                          startDate='2024-08-22', // Default to today
                          dueDate='2024-09-02', // Default to today
                          status='Not started', // Not started, In progress, Completed
                          notes='',
                          category='Personal',
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
    startDate: '2024-08-22',
    dueDate: '2024-09-02',
    status: 'In progress',
    notes: '',
    category: 'Work',
    id: '07412829b78'
  },
  '7412829b78d': {
    title: 'Clean up room',
    priority: 'Low',
    startDate: '2024-08-20',
    dueDate: '2024-08-20',
    status: 'Completed',
    notes: '',
    category: 'Personal',
    id: '7412829b78d'
  },
  '412829b78d7': {
    title: 'Pick school courses',
    priority: 'Urgent',
    startDate: '2024-08-20',
    dueDate: '2024-08-26',
    status: 'Not started',
    notes: '',
    category: 'School',
    id: '412829b78d7'
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
