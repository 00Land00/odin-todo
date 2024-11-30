import { addDays, isAfter } from "date-fns";

import { Project } from "js/models/project.js";
import { ProjectManager } from "js/managers/project-manager.js";

import { Task } from "js/models/task.js";
import { TaskManager } from "js/managers/task-manager.js";

function loadLocalStorage() {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  if (projects.length) {
    projects = projects.map((project) => {
      return Object.assign(new Project(project._name, project._color), project);
    });

    ProjectManager.setProjects(projects);
  } else {
    ProjectManager.createProject("None", "#000000");
  }

  const today = new Date();
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filteredTasks = tasks.filter((task) => {
    return !task._completed || isAfter(addDays(task._dateCompleted, 1), today);
  });
  
  if (filteredTasks.length) {
    filteredTasks = filteredTasks.map((task) => {
      return Object.assign(
        new Task(task._name, task._priority, task._date, task._projectId),
        task
      );
    });
    
    TaskManager.setTasks(filteredTasks);
  }
}

function saveProjectsToLocalStorage() {
  const projects = ProjectManager.getProjects();
  localStorage.setItem("projects", JSON.stringify(projects));
}

function saveTasksToLocalStorage() {
  const tasks = TaskManager.getTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export {
  loadLocalStorage,
  saveProjectsToLocalStorage,
  saveTasksToLocalStorage,
};
