import { ProjectManager } from "js/managers/project-manager.js";

import { createProjectSectionHeader, updateProjectTitle, displayProjects } from "js/views/project-view.js";

import ToggleUp from "media/chevron-up.svg";
import ToggleDown from "media/chevron-down.svg";

function toggleProjectInputVisibility(projectId, isEditing) {
  const projectItemElement = document.querySelector(`#project-${projectId}`);
  const projectInputElement = projectItemElement.querySelector(".project-input");
  const projectNameElement = projectItemElement.querySelector(".project-name");

  isEditing ? projectInputElement.classList.remove("removed") : projectInputElement.classList.add("removed");
  isEditing ? projectNameElement.classList.add("removed") : projectNameElement.classList.remove("removed");
}

function projectClickEH() {
  if (ProjectManager.curProjectId === this.id) {
    const projectItemElement = document.querySelector(`#project-${this.id}`);
    if (!projectItemElement) {
      return;
    }
    
    toggleProjectInputVisibility(this.id, true);

    const projectInputElement = projectItemElement.querySelector(".project-input");
    projectInputElement.focus();

    return;
  }

  ProjectManager.curProjectId = this.id;
  updateProjectTitle();
  displayProjects();
}

function projectSaveNewName(projectId) {
  const projectItemElement = document.querySelector(`#project-${projectId}`);
  const projectInputElement = projectItemElement.querySelector(".project-input");
  const inputValue = projectInputElement.value.trim();

  toggleProjectInputVisibility(projectId, false);
  if (inputValue === "") {
    return;
  }

  ProjectManager.updateProject(projectId, inputValue, "#000000");
  updateProjectTitle();
  displayProjects();
}

function projectRenameEnterEH(event) {
  if (ProjectManager.curProjectId !== this.id) {
    return;
  }

  if (event.key === "Enter") {
    projectSaveNewName(this.id);
  }
}

function projectRenameClickOutsideEH() {
  if (ProjectManager.curProjectId !== this.id) {
    return;
  }

  projectSaveNewName(this.id);
}

function projectDeleteEH(event) {
  ProjectManager.removeProject(this.id);
  ProjectManager.curProjectId = 0;

  updateProjectTitle();
  displayProjects();
  event.stopPropagation();
}

function projectAddEH() {
  ProjectManager.createProject("New Project", "#000000");
  updateProjectTitle();
  displayProjects();
}

function projectExpandToggleEH() {
  ProjectManager.isExpanded = !ProjectManager.isExpanded;

  const expandIcon = document.querySelector(".section-toggle-icon");
  ProjectManager.isExpanded ? expandIcon.src = ToggleDown : expandIcon.src = ToggleUp;

  const sectionContentElement = document.querySelector(".section-content");
  ProjectManager.isExpanded ? sectionContentElement.classList.remove("hidden") : sectionContentElement.classList.add("hidden");
  
  displayProjects();
}

function homeButtonClickEH() {
  ProjectManager.curProjectId = 0;
  updateProjectTitle();
  displayProjects();
}

function initializeProjectComponent() {
  updateProjectTitle();
  createProjectSectionHeader();

  const sectionHeaderElement = document.querySelector(".section-header");
  sectionHeaderElement.addEventListener("click", projectExpandToggleEH);

  const homeButtonElement = document.querySelector(".sidebar-item");
  homeButtonElement.addEventListener("click", homeButtonClickEH);
}

export { initializeProjectComponent, projectClickEH, projectRenameEnterEH, projectRenameClickOutsideEH, projectDeleteEH, projectAddEH };