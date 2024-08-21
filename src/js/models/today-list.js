import { ListTemplate } from "js/models/list-template.js";
import { EventManager } from "js/models/event-manager.js";

import { isPast, isToday } from "date-fns";

export class TodayList extends ListTemplate {
  constructor(showTitle) {
    super("Today", showTitle);

    EventManager.on("task-add", this.addTask.bind(this));
    EventManager.on("task-remove", super.removeTask.bind(this));
    EventManager.on("task-update", this.updateTask.bind(this));
    EventManager.on("task-completeToggle", this.toggleTaskComplete.bind(this));
  }

  createTask(description, project = null) {
    super.createTask(description, Date.now(), project);
  }

  addTask(task) {
    if (isPast(task.date) || isToday(task.date)) {
      super.addTask(task);
    }
  }

  updateTask(taskId, updatedTask) {
    if (isPast(updatedTask.date) || isToday(task.date)) {
      super.updateTask(taskId, updatedTask);
      return;
    }

    super.deleteTask(taskId);
  }

  toggleTaskComplete(task, value) {
    if (isPast(task.date) || isToday(task.date)) {
      super.toggleTaskComplete(task, value);
    }
  }
}
