export class Project {
  static nextId = 0;

  constructor(name, color) {
    this._id = Project.nextId++;

    this._name = name;
    this._color = color;
  }

  isValidColor(color) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6})$/;
    return hexColorRegex.test(color);
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
      console.error("[ERROR] Name canont be empty.");
      return;
    }

    this._name = newName;
  }
  get color() {
    return this._color;
  }
  set color(newColor) {
    if (!this.isValidColor(newColor)) {
      console.error("[ERROR] New color is not a valid hexadecimal string.");
      return;
    }

    this._color = newColor;
  }
}
