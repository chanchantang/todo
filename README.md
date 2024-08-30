### Todo (literally):
- Have a way to add tasks ✅
Need to change where adding tasks occur, should be within tasks.js
- Have a way to view tasks ✅
- Remove / delete tasks

- Have a way to edit tasks:
When the user closes modal (advantages could be performance and if the user does not want changes to occur)
    or
Immediately when updating task ✅

- Add categories for tasks ✅
Need to change so that adding categories is done within categories.js with duplicate checking ✅
- Have a way to view tasks by category ✅
- Remove / delete categories
Have to decide what to do with tasks within the category, get deleted or moved (probably moved to the general category)
- Rename categories
May need to add an id to categories as well

- Add checkbox for completion
this is a binary option, need to decide whether to have only 'Not started' and 'Completed' or all three
maybe instead save the last status and when toggling, toggles between completed and the last status

- Make it pretty
Add new font (apple?)
Sidebar
    - Icon to hide and open
Modal
Task container

- Move add task stickied to the bottom of the div?

- Add local storage

- Move completed items to the bottom of the list

### Issues
- When adding new tasks within a certain category, the default category for the task should be that
- Background image is taking too long to load, solutions: change image, lazy loading?, etc
- The icon is not part of the selector when choosing dates
- Long list names will show that way in the tags

### Bugs
- When updating the category of a task, it is not instantly removed from being displayed
- Handle task/categories that go over the space limit

### Extra Features

- Add numbers next to categories to show number of tasks

- Changing names to empty should have an error message

- Adding duplicate categories should give error message

- Change dates to include time

- View tasks by date
- Sort tasks by priority/date created

- Make sure uid are unique, either by updating tasks map or checking before setting

- Ability to add categories when editing tasks

- Add animations / effects

- Add subtasks with suggestions

- Add timed update to UI when editing task

- Maybe instead of a modal popup for editing, add a side window which displays details

- Make sure code is consistent, ex: ' and ", or coding wise with SOLID principles
Find out when to use id or class for event listeners

- Change the looks on mobile

- Add different popups for selection of category
- Maybe change dialog to a div

- Clicking category header hides buttons

- Convert everything to dataset value instead of id

- Add a line through text for completed tasks