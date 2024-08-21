import { ListTemplate } from "js/models/list-template.js";

export class Project {
  static curId = 0;

  constructor(name) {
    this._id = Project.curId++;
    this._name = name;
    this._lists = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  set name(newName) {
    if (!newName) {
      console.error("[ERROR] Project name cannot be empty.");
      return;
    }
    this._name = newName;
  }

  addList(list) {
    if (!(list instanceof ListTemplate)) {
      console.error("[ERROR] Given list is not a List object");
      return;
    }

    this._lists.push(list);
  }

  removeList(listId) {
    this._lists = this._lists.filter(list => list.id !== listId);
  }

  getLists() {
    return this._lists;
  }
}
