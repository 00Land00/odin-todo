import { Task } from "js/models/task.js";

class _TaskManager {
  constructor() {
    this._tasks = [];
  }

  createTask(description, date, projectId) {
    const newTask = new Task(description, date, projectId);
    this._tasks.push(newTask);
  }

  findTask(taskId) {
    return this._tasks.find(task => task.id === taskId);
  }

  updateTask(taskId, newDescription, newDate, newProjectId) {
    const task = findTask(taskId);
    task.description = newDescription;
    task.date = newDate;
    task.projectId = newProjectId;
  }

  removeTask(taskId) {
    this._tasks = this._tasks.filter(task => task.id !== taskId);
  }

  toggleTask(taskId) {
    const task = findTask(taskId);
    task.completed = !task.completed;
    task.dateCompleted = task.completed ? new Date() : null;
  }

  getTasks() {
    return this._tasks;
  }
}

const TaskManager = new _TaskManager();
export { TaskManager };