import { TodayList } from "js/models/today-list.js";
import { TaskManager } from "js/models/task-manager.js";
import { EventManager } from "js/models/event-manager.js";

export class ProjectTodayList extends TodayList {
  constructor(title, showTitle, project, baseList) {
    super(title, showTitle);
    this.project = project;
    this.baseList = baseList;

    EventManager.on("task-add", this.addTask.bind(this));
    EventManager.on("task-remove", super.removeTask.bind(this));
    EventManager.on("task-update", this.updateTask.bind(this));
    EventManager.on("task-completeToggle", this.toggleTaskComplete.bind(this));
  }

  createTask(description, date, project = null) {
    if (this.project === project) {
      super.createTask(description, date, project);
    }
  }

  addTask(task) {
    if (this.project === project) {
      super.addTask(task);
    }
  }

  updateTask(taskId, updatedTask) {
    if (this.project === project) {
      super.updateTask(updatedTask);
      return;
    }

    super.deleteTask(taskId);
  }

  toggleTaskComplete(task, value) {
    if (this.project === project) {
      super.toggleTaskComplete(task, value);
    }
  }

  getTasks() {
    this._tasks = this._tasks.filter(task => {
      if(!this.project === project) {
        TaskManager.addTask(task, task.project);
      }

      return this.project === project;
    });
    return super.getTasks();
  }
}