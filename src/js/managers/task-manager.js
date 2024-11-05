import { parse } from "date-fns";

import { Task } from "js/models/task.js";

class _TaskManager {
  constructor() {
    this._tasks = [];
  }

  createTask(name, priority, date, projectId) {
    const newTask = new Task(name, Number(priority), parse(date, "yyyy-MM-dd", new Date()), Number(projectId));
    console.log(newTask);
    this._tasks.push(newTask);
  }

  findTask(taskId) {
    return this._tasks.find((task) => task.id === taskId);
  }

  updateTask(taskId, newName, newPriority, newDate, newProjectId) {
    console.log(parse(newDate, "yyyy-MM-dd", Date.now()));
    const task = this.findTask(taskId);
    task.name = newName;
    task.priority = Number(newPriority);
    task.date = parse(newDate, "yyyy-MM-dd", new Date());
    task.projectId = Number(newProjectId);
  }

  removeTask(taskId) {
    this._tasks = this._tasks.filter((task) => task.id !== taskId);
  }

  toggleTask(taskId) {
    const task = this.findTask(taskId);
    task.completed = !task.completed;
    task.dateCompleted = task.completed ? new Date() : null;
  }

  getTasks() {
    return this._tasks;
  }
}

const TaskManager = new _TaskManager();
export { TaskManager };
