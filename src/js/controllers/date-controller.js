import { DateManager } from "js/managers/date-manager";
import { setDateMin } from "js/controllers/form-controller";
import { displayTasks } from "js/views/task-view";

function dateSwitchEH() {
  const dateTitleElement = document.querySelector(".task-header-title");
  dateTitleElement.innerHTML = DateManager.dateConstant;

  setDateMin();

  displayTasks();
}

function initializeDateSwitchComponent() {
  const prevDateElement = document.querySelector(".nav-prev");
  const nextDateElement = document.querySelector(".nav-next");

  prevDateElement.addEventListener("click", () => {
    DateManager.getPrev();
    dateSwitchEH();
  });
  nextDateElement.addEventListener("click", () => {
    DateManager.getNext();
    dateSwitchEH();
  });
}

export { initializeDateSwitchComponent };