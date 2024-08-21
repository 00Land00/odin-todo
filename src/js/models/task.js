import { ProjectManager } from "js/project-manager.js";

import { isPast, isBefore } from "date-fns";

export class Task {
  static nextId = 0;

  constructor(description, date, projectId) {
    this._id = Task.nextId++;

    this._description = description;
    this._date = date;
    this._projectId = projectId;

    this._dateCompleted = null;
    this._completed = false;
  }

  get id() {
    return this._id;
  }

  get description() {
    return this._description;
  }
  set description(newDescription) {
    if (typeof newDescription !== "string") {
      console.error("[ERROR] New description is not a string.");
      return;
    }

    if (!newDescription) {
      console.error("[ERROR] Description cannot be empty.");
      return;
    }

    this._description = newDescription;
  }
  get date() {
    return this._date;
  }
  set date(newDate) {
    if (!(newDate instanceof Date)) {
      console.error("[ERROR] New date is not a Date object.");
      return;
    }

    if (isPast(newDate)) {
      console.error("[ERROR] Cannot change the date to the past.");
      return;
    }

    this._date = newDate;
  }
  get projectId() {
    return this._projectId;
  }
  set projectId(newProjectId) {
    if (typeof newProjectId !== "number") {
      console.error("[ERROR] New project id is not a number");
      return;
    }

    if (!ProjectManager.findProject(newProjectId)) {
      console.error("[ERROR] New project id does not exist.");
      return;
    }

    this._projectId = newProjectId;
  }

  get dateCompleted() {
    return this._dateCompleted;
  }
  set dateCompleted(newDateCompleted) {
    if (newDateCompleted === null) {
      this._dateCompleted = null;
      return;
    }

    if (!(newDateCompleted instanceof Date)) {
      console.error("[ERROR] New completed date is not a Date object.");
      return;
    }

    if (isBefore(newDateCompleted, this.date)) {
      console.error(
        "[ERROR] Completion date cannot occur before the date this task was created."
      );
      return;
    }

    this._dateCompleted = newDateCompleted;
  }
  get completed() {
    return this._completed;
  }
  set completed(isCompleted) {
    this._completed = Boolean(isCompleted);
  }
}
