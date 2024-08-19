import { EventManager } from "js/models/event-manager.js";

class _TaskManager {
  addTask(task, project=null) {
    EventManager.emit("task-add", task, project);
  }

  removeTask(task) {
    EventManager.emit("task-remove", task);
  }

  updateTask(taskId, updatedTask) {
    EventManager.emit("task-update", taskId, updatedTask);
  }

  toggleTaskComplete(task, value) {
    EventManager.emit("task-completeToggle", task, value);
  }
}

// making it so that only one exists
const TaskManager = new _TaskManager();
export { TaskManager };