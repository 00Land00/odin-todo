import { ProjectManager } from "js/managers/project-manager.js";

import { isPast, isToday, isBefore } from "date-fns";

export class Task {
  static nextId = 0;

  /*
    priority:
      0 = none
      1 = low
      2 = moderate
      3 = high
  */

  constructor(name, priority, date, projectId) {
    this._id = Task.nextId++;

    this._name = name;
    this._priority = priority;
    this._date = date;
    this._projectId = projectId;

    this._dateCreated = Date.now();
    this._dateCompleted = null;
    this._completed = false;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  set name(newName) {
    if (typeof newName !== "string") {
      console.error("[ERROR] New name is not a string.");
      return;
    }

    if (!newName) {
      console.error("[ERROR] name cannot be empty.");
      return;
    }

    this._name = newName;
  }
  get priority() {
    return this._priority;
  }
  set priority(newPriority) {
    if (typeof newPriority !== "number") {
      console.error("[ERROR] New priority is not a number.");
      return;
    }

    if (newPriority > 3 || newPriority < 0) {
      console.error("[ERROR] New priority is an invalid value outside of 0 to 3 (inclusive)");
      return;
    }

    this._priority = newPriority;
  }
  get date() {
    return this._date;
  }
  set date(newDate) {
    if (!(newDate instanceof Date)) {
      console.error("[ERROR] New date is not a Date object.");
      return;
    }
    
    if (isPast(newDate) && !isToday(newDate)) {
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

  get dateCreated() {
    return this._dateCreated;
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
  
    if (isBefore(newDateCompleted, this.dateCreated)) {
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
