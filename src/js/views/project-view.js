import { ProjectManager } from "js/managers/project-manager.js";

import { projectClickEH, projectRenameEnterEH, projectRenameClickOutsideEH, projectDeleteEH, projectAddEH } from "js/controllers/project-controller.js";

import { displayTasks } from "js/views/task-view.js";

import ToggleIcon from "media/chevron-up.svg";
import DeleteOutline from "media/delete-outline.svg";
import AddIcon from "media/plus.svg";

function createProjectSectionHeader() {
  const projectSectionElement = document.querySelector(".section-header");
  projectSectionElement.innerHTML = `
    <span class="section-title">PROJECTS</span>
    <img
      class="section-toggle-icon"
      src="${ToggleIcon}"
      alt="toggle dropdown"
    />
  `;
}

function updateProjectTitle() {
  const curProject = ProjectManager.findProject(ProjectManager.curProjectId);
  const projectTitleElement = document.querySelector(".project-header");
  const innerHTML = `
    <h1 class="project-title">${curProject.name === "None" ? "HOME" : curProject.name.toUpperCase()}</h1>
    <span class="project-indicator" style="background-color: ${curProject.color};"></span>
  `;
  projectTitleElement.innerHTML = innerHTML;
}

function createProjectElement(projectId, name, color) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("section-item");
  projectElement.classList.add("project-item");
  projectElement.id = `project-${projectId}`;
  projectElement.dataset.projectId = projectId;

  const innerHTML = `
    <div class="project-content">
      <span class="project-indicator" style="background-color: ${color};"></span>
      <span class="project-name">${name.toUpperCase()}</span>
      <input type="text" class="project-input removed" placeholder="${name}" />
    </div>
    <img
      class="project-delete-icon"
      src="${DeleteOutline}"
      alt="project delete icon"
    />
  `;
  projectElement.innerHTML = innerHTML;

  return projectElement;
}

function attachProjectEventHandlers(projectElement, project) {
  projectElement.addEventListener("click", projectClickEH.bind(project));

  const deleteElement = projectElement.querySelector(".project-delete-icon");
  deleteElement.addEventListener("click", projectDeleteEH.bind(project));

  const inputElement = projectElement.querySelector(".project-input");
  inputElement.addEventListener("keydown", projectRenameEnterEH.bind(project));

  inputElement.addEventListener("blur", projectRenameClickOutsideEH.bind(project));
}

function createProject(project) {
  const projectElement = createProjectElement(project.id, project.name, project.color);
  attachProjectEventHandlers(projectElement, project);

  return projectElement;
}

function createAddProjectElement() {
  const addProjectElement = document.createElement("div");
  addProjectElement.classList.add("section-item");
  addProjectElement.classList.add("add-project");

  const innerHTML = `
    <img
      class="add-project-icon"
      src="${AddIcon}"
      alt="add project"
    />
    <span class="add-project-label">ADD PROJECT</span>
  `;
  addProjectElement.innerHTML = innerHTML;

  return addProjectElement;
}

function createAddProject() {
  const addProjectElement = createAddProjectElement();
  addProjectElement.addEventListener("click", projectAddEH);

  return addProjectElement;
}

function displayProjects() {
  if (!ProjectManager.isExpanded) {
    return;
  }
  const projectListElement = document.querySelector(".section-content");

  const projectList = ProjectManager.getProjects();
  projectListElement.innerHTML = ``;
  projectList.forEach((project) => {
    if (!project.id) {
      return;
    }
    const projectElement = createProject(project);
    projectListElement.appendChild(projectElement);
  });
  const addProjectElement = createAddProject();
  projectListElement.appendChild(addProjectElement);

  displayTasks();
}

export { createProjectSectionHeader, updateProjectTitle, displayProjects };