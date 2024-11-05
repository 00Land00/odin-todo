import { format, addDays } from "date-fns";

import { DateManager } from "js/managers/date-manager";
import { TOMORROW, UPCOMING } from "js/constants/dateConstants.js";

import { TaskManager } from "js/managers/task-manager";
import { displayTasks } from "js/views/task-view";

function setDateMin() {
  const dateElement = document.querySelector(".task-date-input");

  const today = new Date();
  let formattedDate = today;

  if (DateManager.dateConstant === TOMORROW) {
    formattedDate = addDays(today, 1);
  } else if (DateManager.dateConstant === UPCOMING) {
    formattedDate = addDays(today, 2);
  }

  formattedDate = format(formattedDate, "yyyy-MM-dd");

  dateElement.min = formattedDate;
  dateElement.value = formattedDate;
}

function taskFormEventHandler() {
  const formElement = document.querySelector(".task-form");
  const formInputElement = document.querySelector(".task-input");
  const formData = new FormData(formElement);

  const taskName = formData.get('name');
  const taskPriority = formData.get('priority');
  const taskDate = formData.get('date');
  const taskProject = formData.get('project');

  formInputElement.value = ``;

  TaskManager.createTask(taskName, taskPriority, taskDate, taskProject);
  displayTasks();
}

function initializeFormComponent() {
  setDateMin();

  const formElement = document.querySelector(".task-form");
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    taskFormEventHandler();
  });

  // we should add a close button to clear the text too perhaps, then we add the event handler here
}

export { initializeFormComponent, setDateMin };