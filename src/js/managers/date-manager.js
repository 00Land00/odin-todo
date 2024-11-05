import { TODAY, TOMORROW, UPCOMING } from "js/constants/dateConstants.js";

class _DateManager {
  constructor() {
    this._dateConstant = TODAY;
  }

  get dateConstant() {
    return this._dateConstant;
  }

  set dateConstant(newDateConstant) {
    if (dateConstant !== TODAY && dateConstant !== TOMORROW && dateConstant !== UPCOMING) {
      console.error("[ERROR] New date constant is not a valid date constant value");
      return;
    }

    this._dateConstant = newDateConstant;
  }
}

const DateManager = new _DateManager();
export { DateManager };