export const categories = ['Personal', 'Work', 'School'];

export function addCategory(category) {
  if (categories.includes(category)) {
    return false;
  }
  categories.push(category);
  return true;
}

export function renameCategory(category, newName) {
  if (categories.includes(newName)) {
    return false;
  }
  categories[categories.indexOf(category)] = newName;
  // rename all tasks with that the old category name to the new one
}

export function deleteCategory() {

}