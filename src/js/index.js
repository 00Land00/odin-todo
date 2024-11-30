import "styles/general-sans.css";
import "styles/reset.css";
import "styles/layout.css";
import "styles/sidebar.css";
import "styles/content-area.css";

import { initializeFormComponent } from "js/controllers/form-controller.js";
import { initializeDateSwitchComponent } from "js/controllers/date-controller";
import { initializeProjectComponent } from "js/controllers/project-controller.js";

window.addEventListener("DOMContentLoaded", () => {
  // fetch from local storage (storage-manager.js)
    // go through all tasks, for each completed task, if datecompleted has passed over 1 day, do not include it any longer
    // create functions that will be called by other managers to trigger the storing process

  initializeFormComponent();

  initializeDateSwitchComponent();

  initializeProjectComponent();

  // updateProjectTitle()
  // displayProjects()
});
