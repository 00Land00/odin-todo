import { parse } from "date-fns";

import { Task } from "js/models/task.js";
import { saveTasksToLocalStorage } from "js/managers/storage-manager.js";

class _TaskManager {
  constructor() {
    this._tasks = [];
  }

  createTask(name, priority, date, projectId) {
    const newTask = new Task(name, Number(priority), parse(date, "yyyy-MM-dd", new Date()), Number(projectId));
    this._tasks.push(newTask);

    saveTasksToLocalStorage();
  }

  findTask(taskId) {
    return this._tasks.find((task) => task.id === taskId);
  }

  updateTask(taskId, newName, newPriority, newDate, newProjectId) {
    const task = this.findTask(taskId);
    task.name = newName;
    task.priority = Number(newPriority);
    task.date = parse(newDate, "yyyy-MM-dd", new Date());
    task.projectId = Number(newProjectId);

    saveTasksToLocalStorage();
  }

  removeTask(taskId) {
    this._tasks = this._tasks.filter((task) => task.id !== taskId);

    saveTasksToLocalStorage();
  }

  toggleTask(taskId) {
    const task = this.findTask(taskId);
    task.completed = !task.completed;
    task.dateCompleted = task.completed ? new Date() : null;

    saveTasksToLocalStorage();
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(newTasks) {
    this._tasks = newTasks;
  }
}

const TaskManager = new _TaskManager();
export { TaskManager };
