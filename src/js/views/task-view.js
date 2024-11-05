import { isToday, isTomorrow, isAfter, startOfTomorrow, format } from "date-fns";

import { toggleTaskEH, deleteTaskEH, priorityChangeEH, dateChangeEH, projectChangeEH } from "js/controllers/task-controller.js";

import { TaskManager } from "js/managers/task-manager";
import { ProjectManager } from "js/managers/project-manager";
import { DateManager } from "js/managers/date-manager.js";

import { TODAY, TOMORROW, UPCOMING } from "js/constants/dateConstants.js";

import CheckboxBlankOutline from "media/checkbox-blank-outline.svg";
import CheckboxMarked from "media/checkbox-marked.svg";
import DeleteOutline from "media/delete-outline.svg";

function filterByDate(taskList) {
  switch(DateManager.dateConstant) {
    case TODAY:
      taskList = taskList.filter((task) => {
        return isToday(task.date);
      });
      break;
  
    case TOMORROW: 
      taskList = taskList.filter((task) => {
        return isTomorrow(task.date);
      });
      break;

    case UPCOMING:
      taskList = taskList.filter((task) => {
        return isAfter(task.date, startOfTomorrow);
      });
      break;
  }

  return taskList;
}

function filterByProject(taskList) {
  const projectId = ProjectManager.curProjectId;
  if (!projectId) {
    return taskList;
  }

  return taskList.filter((task) => {
    return task.projectId === projectId;
  })
}

function compareTask(taskA, taskB) {
  if (taskA.completed || taskB.completed) {
    let completeFlag = 0;
    if (taskA.completed) {
      completeFlag += 1;
    }
    if (taskB.completed) {
      completeFlag -= 1;
    }

    if (!completeFlag) {
      return taskA.dateCompleted - taskB.dateCompleted;
    }
    return completeFlag;
  }

  if (taskA.priority === taskB.priority) {
    return taskA.dateCreated - taskB.dateCreated;
  }

  return taskB.priority - taskA.priority;
}

function createTaskElement(taskId, name, date, priority, completed) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-item");
  taskElement.dataset.taskId = taskId;

  const innerHTML = `
    <div class="task-content">
      <img
        src="${completed ? CheckboxMarked : CheckboxBlankOutline}"
        alt="${completed ? 'marked' : 'blank'} checkbox icon"
        class="task-checkbox"
      />
      <p class="task-title">${name}</p>
      <img
        src="${DeleteOutline}"
        alt="delete icon"
        class="task-delete-icon"
      />
    </div>
    <div class="task-options-group">
      <div class="task-priority">
        <label for="task-priority-select-${taskId}">Priority:</label>
        <select
          id="task-priority-select-${taskId}"
          name="priority"
          class="task-select"
        >
          <option value="0" ${priority === 0 ? 'selected' : ''}>None</option>
          <option value="1" ${priority === 1 ? 'selected' : ''}>Low</option>
          <option value="2" ${priority === 2 ? 'selected' : ''}>Medium</option>
          <option value="3" ${priority === 3 ? 'selected' : ''}>High</option>
        </select>
      </div>

      <div class="task-date">
        <label for="task-date-input-${taskId}">Date:</label>
        <input
          id="task-date-input-${taskId}"
          type="date"
          name="date"
          class="task-date-input"
          value="${format(date, "yyyy-MM-dd")}"
        />
      </div>

      <div class="task-project">
        <label for="task-project-select-${taskId}">Project:</label>
        <select
          id="task-project-select-${taskId}"
          name="project"
          class="task-select"
        >
        </select>
      </div>
    </div>
  `;
  taskElement.innerHTML = innerHTML;
  
  return taskElement;
}

function createProjectOptionsElement(projectId) {
  console.log(ProjectManager.getProjects());
  let projectList = [...ProjectManager.getProjects()];
  projectList = projectList.map((project) => {
    return `<option value="${project.id}" ${project.id === projectId ? 'selected' : ''}>${project.name}</option>`;
  });

  return projectList.reduce((optionStr, option) => {
    return optionStr + option;
  }, '');
}

function createProjectOptions(taskElement, task) {
  const projectSelectElement = taskElement.querySelector(`#task-project-select-${task.id}`);
  const optionsInnerHTML = createProjectOptionsElement(task.projectId);
  projectSelectElement.innerHTML = optionsInnerHTML;
}

function attachTaskEventHandlers(taskElement, task) {
  const checkboxElement = taskElement.querySelector(".task-checkbox");
  const taskNameElement = taskElement.querySelector(".task-title");
  checkboxElement.addEventListener("click", toggleTaskEH.bind(task));
  taskNameElement.addEventListener("click", toggleTaskEH.bind(task));

  const deleteElement = taskElement.querySelector(".task-delete-icon");
  deleteElement.addEventListener("click", deleteTaskEH.bind(task));

  const priorityElement = taskElement.querySelector(`#task-priority-select-${task.id}`);
  priorityElement.addEventListener("change", priorityChangeEH.bind(task));

  const dateElement = taskElement.querySelector(".task-date-input");
  dateElement.addEventListener("change", dateChangeEH.bind(task));

  const projectElement = taskElement.querySelector(`#task-project-select-${task.id}`);
  projectElement.addEventListener("change", projectChangeEH.bind(task));
}

function createTask(task) {
  const taskElement = createTaskElement(task.id, task.name, task.date, task.priority, task.completed);
  createProjectOptions(taskElement, task);
  attachTaskEventHandlers(taskElement, task);

  return taskElement;
}

function displayTasks() {
  const taskListElement = document.querySelector(".task-body");

  let taskList = TaskManager.getTasks();
  taskList = filterByDate(taskList);
  taskList = filterByProject(taskList);
  taskList = taskList.sort(compareTask);
  
  taskListElement.innerHTML = ``;
  taskList.forEach((task) => {
    const taskElement = createTask(task);
    taskListElement.append(taskElement);
  });
}

export { displayTasks };