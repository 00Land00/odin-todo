import "styles/general-sans.css";
import "styles/reset.css";
import "styles/layout.css";
import "styles/sidebar.css";
import "styles/content-area.css";

// connect the logic for projects
  // that will handle the logic for adding projects

import { initializeFormComponent } from "js/controllers/form-controller.js";
import { initializeDateSwitchComponent } from "js/controllers/date-controller";

window.addEventListener("DOMContentLoaded", () => {
  initializeFormComponent();

  initializeDateSwitchComponent();

  // get project sidebar
  // on click toggle

  // get add project element
  // on click

  // get home button
  // on click

  // get data (local storage TODO)
  // display projects
  // display today and then we pass nothing so it defaults to everything
});
