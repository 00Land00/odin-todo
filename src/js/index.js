import "styles/general-sans.css";
import "styles/reset.css";
import "styles/layout.css";
import "styles/sidebar.css";
import "styles/content-area.css";

import { loadLocalStorage } from "js/managers/storage-manager.js";

import { initializeFormComponent } from "js/controllers/form-controller.js";
import { initializeDateSwitchComponent } from "js/controllers/date-controller";
import { initializeProjectComponent } from "js/controllers/project-controller.js";

import { displayTasks } from "js/views/task-view.js";

window.addEventListener("DOMContentLoaded", () => {
  loadLocalStorage();

  initializeFormComponent();

  initializeDateSwitchComponent();

  initializeProjectComponent();

  displayTasks();
});
