import { isPast } from "date-fns";

export class Task {
  static curId = 0;

  constructor(description, date, project = null) {
    this._id = Task.curId++;
    this._description = description;

    this._date = date;
    this._dateCompletion = null;

    this._project = project;

    this._isComplete = false;
  }

  get id() {
    return this._id;
  }

  get dateCompletion() {
    return this._dateCompletion;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    if (!newDescription) {
      console.error("[ERROR] Task description cannot be empty.");
      return;
    }
    this._description = newDescription;
  }

  get date() {
    return this._date;
  }

  set date(newDate) {
    if (isPast(newDate)) {
      console.error("[ERROR] Cannot set the date in the past.");
      return;
    }
    this._date = newDate;
  }

  get position() {
    return this._position;
  }

  set position(newPosition) {
    this._position = newPosition;
  }

  get project() {
    return this._project;
  }

  set project(newProject) {
    if (!newProject) {
      console.error("[ERROR] Invalid project.");
      return;
    }
    this._project = newProject;
  }

  get isComplete() {
    return this._isComplete;
  }

  set isComplete(value) {
    this._isComplete = Boolean(value);
    this._dateCompletion = this.isComplete ? Date.now() : null;
  }
}
