import { ListTemplate } from "js/models/list-template.js";
import { TaskManager } from "js/models/task-manager.js";
import { EventManager } from "js/models/event-manager.js";

import { isAfter, addDays } from "date-fns";

export class FutureList extends ListTemplate {
  constructor(showTitle) {
    super("Future", showTitle);

    EventManager.on("task-add", this.addTask.bind(this));
    EventManager.on("task-remove", super.removeTask.bind(this));
    EventManager.on("task-update", this.updateTask.bind(this));
    EventManager.on("task-completeToggle", this.toggleTaskComplete.bind(this));
  }

  afterThisWeek(date) {
    return isAfter(date, addDays(Date.now(), 7));
  }

  createTask(description, date, project = null) {
    if (!date) {
      date = addDays(Date.now(), 8);
    }

    if (this.afterThisWeek(date)) {
      super.createTask(description, date, project);
    }
  }

  addTask(task) {
    if (this.afterThisWeek(task.date)) {
      super.addTask(task);
    }
  }

  updateTask(taskId, updatedTask) {
    if (this.afterThisWeek(updatedTask.date)) {
      super.updateTask(updatedTask);
      return;
    }

    super.deleteTask(taskId);
  }

  toggleTaskComplete(task, value) {
    if (this.afterThisWeek(task.date)) {
      super.toggleTaskComplete(task, value);
    }
  }

  getTasks() {
    this._tasks = this._tasks.filter(task => {
      if(!this.afterThisWeek(task.date)) {
        TaskManager.addTask(task, task.project);
      }

      return this.afterThisWeek(task.date);
    });
    return super.getTasks();
  }
}