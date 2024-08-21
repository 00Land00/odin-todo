import { Task } from "js/models/task.js";
import { TaskManager } from "js/models/task-manager.js";
import { EventManager } from "js/models/event-manager.js";

export class ListTemplate {
  static curId = 0;

  constructor(title, showTitle) {
    this._id = ListTemplate.curId++;
    this._title = title;
    this._tasks = [];
    this._completedTasks = [];

    this._showTitle = Boolean(showTitle);

    EventManager.on("task-moveWithin", this.moveTask.bind(this));
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    this._title = newTitle;
  }

  get showTitle() {
    return this._showTitle;
  }
  set showTitle(value) {
    this._showTitle = Boolean(value);
  }

  createTask(description, date, project = null) {
    const newTask = new Task(
      description,
      date,
      project
    );
    TaskManager.addTask(newTask, project);
  }

  addTask(task) {
    this._tasks.push(task);
  }

  insertTask(task, position) {
    if (position >= this._tasks.length && position < 0) {
      console.error("[ERROR] Invalid position for task");
      return;
    }

    this._tasks.splice(position, 0, task);
  }

  removeTask(id) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }

  findTask(id) {
    return this._tasks.find((task) => task.id === id);
  }

  updateTask(taskId, updatedTask) {
    if (taskId !== updatedTask.id) {
      console.error("[ERROR] Updated Task does not match the id.");
      return;
    }

    this.removeTask(taskId);
    this.addTask(updatedTask);
  }

  addCompletedTask(task) {
    this._completedTasks.push(task);
  }

  removeCompletedTask(id) {
    this._completedTasks = this._completedTasks.filter(
      (task) => task.id !== id
    );
  }

  isValidTask(task) {
    return true;
  }

  toggleTaskComplete(task, value) {
    task.isComplete = value;
    if (value) {
      this.removeTask(task.id);
      this.addCompletedTask(task);
      return;
    }
    this.removeCompletedTask(task.id);
    this.addTask(task);
  }

  moveTask(listId, taskId, newPosition) {
    if (listId !== this.id) {
      return;
    }

    if (newPosition >= this._tasks.length && newPosition < 0) {
      console.error("[ERROR] Invalid position for task");
      return;
    }

    const task = this.findTask(taskId);
    this.removeTask(taskId);
    this.insertTask(task, newPosition);
  }

  getTasks() {
    return this._tasks;
  }

  getCompletedTasks() {
    // have it so that any dateCompletion that have been over a day long is removed
    return this._completedTasks;
  }
}
