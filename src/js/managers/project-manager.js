import { Project } from "js/models/project.js";
import { saveProjectsToLocalStorage } from "js/managers/storage-manager.js";

class _ProjectManager {
  constructor() {
    this._projects = [];
    this._curProjectId = null;
    this._isExpanded = false;
  }

  get curProjectId() {
    return this._curProjectId;
  }

  set curProjectId(newCurProjectId) {
    if (typeof newCurProjectId !== "number") {
      console.error("[ERROR] New current project id is not a Number.");
      return;
    }

    this._curProjectId = newCurProjectId;
  }

  get isExpanded() {
    return this._isExpanded;
  }

  set isExpanded(newIsExpanded) {
    this._isExpanded = Boolean(newIsExpanded);
  }

  createProject(name, color) {
    const newProject = new Project(name, color);
    this._projects.push(newProject);
    this._curProjectId = newProject.id;

    saveProjectsToLocalStorage();
  }

  findProject(projectId) {
    return this._projects.find((project) => project.id === projectId);
  }

  updateProject(projectId, newName, newColor) {
    const project = this.findProject(projectId);
    project.name = newName;
    project.newColor = newColor;

    saveProjectsToLocalStorage();
  }

  removeProject(projectId) {
    this._projects = this._projects.filter(
      (project) => project.id !== projectId
    );

    saveProjectsToLocalStorage();
  }

  getProjects() {
    return this._projects;
  }

  setProjects(newProjects) {
    this._projects = newProjects;
    this.curProjectId = newProjects.length ? newProjects[0].id : null;
  }
}

const ProjectManager = new _ProjectManager();
export { ProjectManager };
