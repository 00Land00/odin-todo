import { TODAY, TOMORROW, UPCOMING } from "js/constants/dateConstants.js";

class _DateManager {
  constructor() {
    this._dateConstant = 0;
    this._dateArr = [TODAY, TOMORROW, UPCOMING];
  }

  get dateConstant() {
    return this._dateArr[this._dateConstant];
  }

  set dateConstant(newDateConstant) {
    if (dateConstant !== TODAY && dateConstant !== TOMORROW && dateConstant !== UPCOMING) {
      console.error("[ERROR] New date constant is not a valid date constant value");
      return;
    }

    this._dateConstant = this._dateArr.indexOf(newDateConstant);
  }

  shiftDateConstant(newDateConstant) {
    this._dateConstant = (newDateConstant + this._dateArr.length) % this._dateArr.length;
  }
  
  getPrev() {
    this.shiftDateConstant(this._dateConstant - 1);
    return this.dateConstant;
  }

  getNext() {
    this.shiftDateConstant(this._dateConstant + 1);
    return this.dateConstant;
  }
}

const DateManager = new _DateManager();
export { DateManager };