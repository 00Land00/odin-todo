class _EventManager {
  constructor() {
    this.events = {};
  }

  on(eventName, callbackFn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callbackFn);
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(callbackFn => callbackFn(...args));
  }
}

// making it so that only one exists
const EventManager = new _EventManager();
export { EventManager };