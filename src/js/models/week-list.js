import { ListTemplate } from "js/models/list-template.js";
import { TaskManager } from "js/models/task-manager.js";
import { EventManager } from "js/models/event-manager.js";

import { isAfter, isBefore, addDays } from "date-fns";

export class WeekList extends ListTemplate {
  constructor(showTitle) {
    super("Week", showTitle);

    EventManager.on("task-add", this.addTask.bind(this));
    EventManager.on("task-remove", super.removeTask.bind(this));
    EventManager.on("task-update", this.updateTask.bind(this));
    EventManager.on("task-completeToggle", this.toggleTaskComplete.bind(this));
  }

  withinThisWeek(date) {
    return isAfter(date, addDays(Date.now(), 1)) && isBefore(date, addDays(Date.now(), 8));
  }

  createTask(description, date, project = null) {
    if (!date) {
      date = addDays(Date.now(), 2);
    }

    if (this.withinThisWeek(date)) {
      super.createTask(description, date, project);
    }
  }

  addTask(task) {
    if (this.withinThisWeek(task.date)) {
      super.addTask(task);
    }
  }

  updateTask(taskId, updatedTask) {
    if (this.withinThisWeek(updatedTask.date)) {
      super.updateTask(updatedTask);
      return;
    }

    super.deleteTask(taskId);
  }

  toggleTaskComplete(task, value) {
    if (this.withinThisWeek(task.date)) {
      super.toggleTaskComplete(task, value);
    }
  }

  getTasks() {
    this._tasks = this._tasks.filter(task => {
      if (!this.withinThisWeek(task.date)) {
        TaskManager.addTask(task, task.project);
      }

      return this.withinThisWeek(task.date);
    });
    return super.getTasks();
  }
}