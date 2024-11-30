import { format } from "date-fns";

import { TaskManager } from "js/managers/task-manager.js";

import { displayTasks } from "js/views/task-view";

function toggleTaskEH() {
  TaskManager.toggleTask(this.id);
  displayTasks();
}

function deleteTaskEH(event) {
  TaskManager.removeTask(this.id);
  displayTasks();
  event.stopPropagation();
}

function priorityChangeEH(event) {
  TaskManager.updateTask(this.id, this.name, event.target.value, format(this.date, "yyyy-MM-dd"), this.projectId);
  displayTasks();
}

function dateChangeEH(event) {
  TaskManager.updateTask(this.id, this.name, this.priority, event.target.value, this.projectId);
  displayTasks();
}

function projectChangeEH(event) {
  TaskManager.updateTask(this.id, this.name, this.priority, format(this.date, "yyyy-MM-dd"), event.target.value);
  displayTasks();
}

export { toggleTaskEH, deleteTaskEH, priorityChangeEH, dateChangeEH, projectChangeEH };