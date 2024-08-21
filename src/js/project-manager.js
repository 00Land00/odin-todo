import { Project } from "js/models/projects.js";

class _ProjectManager {
  constructor() {
    this._projects = [];
  }

  createProject(name, color) {
    const newProject = new Project(name, color);
    this._projects.push(newProject);
  }

  findProject(projectId) {
    return this._projects.find((project) => project.id === projectId);
  }

  updateProject(projectId, newName, newColor) {
    const project = findProject(projectId);
    project.name = newName;
    project.newColor = newColor;
  }

  removeProject(projectId) {
    this._projects = this._projects.filter(
      (project) => project.id !== projectId
    );
  }

  getProjects() {
    return this._projects;
  }
}

const ProjectManager = new _ProjectManager();
export { ProjectManager };
