import { ListTemplate } from "js/models/list-template.js";
import { TaskManager } from "js/models/task-manager.js";
import { EventManager } from "js/models/event-manager.js";

import { add, isSameDay } from "date-fns";

export class TomorrowList extends ListTemplate {
  constructor(showTitle) {
    super("Tomorrow", showTitle);

    EventManager.on("task-add", this.addTask.bind(this));
    EventManager.on("task-remove", super.removeTask.bind(this));
    EventManager.on("task-update", this.updateTask.bind(this));
    EventManager.on("task-completeToggle", this.toggleTaskComplete.bind(this));
  }

  getTomorrow() {
    return add(Date.now(), { days: 1 });
  }

  createTask(description, project = null) {
    const tomorrow = this.getTomorrow();
    super.createTask(description, tomorrow, project);
  }

  addTask(task) {
    const tomorrow = this.getTomorrow();
    if (isSameDay(tomorrow, task.date)) {
      super.addTask(task);
    }
  }

  updateTask(taskId, updatedTask) {
    const tomorrow = this.getTomorrow();
    if (isSameDay(tomorrow, updatedTask.date)) {
      super.updateTask(updatedTask);
      return;
    }

    super.deleteTask(taskId);
  }

  toggleTaskComplete(task, value) {
    const tomorrow = this.getTomorrow();
    if (isSameDay(tomorrow, task.date)) {
      super.toggleTaskComplete(task, value);
    }
  }

  getTasks() {
    const tomorrow = this.getTomorrow();
    this._tasks = this._tasks.filter(task => {
      if(!isSameDay(tomorrow, task.date)) {
        TaskManager.addTask(task, task.project);
      }

      return isSameDay(tomorrow, task.date);
    });
    return super.getTasks();
  }
}