import { TaskManager } from "js/models/task-manager.js";

import { TodayList } from "js/models/today-list.js";
import { TomorrowList } from "js/models/tomorrow-list.js";
import { WeekList } from "js/models/week-list.js";

import { format, addDays } from "date-fns";

function printTasks(tasks, marker, title="") {
  title ? console.log(title) : ``;
  tasks.forEach(task => {
    console.log(`${marker} ${task.id} ${task.description} (${format(task.date, "MMM d, y")})`);
  });
}

function printList(list) {
  printTasks(list.getTasks(), "-", list.title);
  printTasks(list.getCompletedTasks(), "+");
}

const today = new TodayList(true);
const tomorrow = new TomorrowList(true);
const week = new WeekList(true);

today.createTask("buy eggs");
today.createTask("call doctor");
today.createTask("pack lunch");

tomorrow.createTask("read page");
tomorrow.createTask("fill forms");
tomorrow.createTask("shower");

week.createTask("go to appointment", null);
week.createTask("volunteer at shop", addDays(Date.now(), 2));
week.createTask("reflect and plan", addDays(Date.now(), 7));
week.createTask("important thing I should do now", addDays(Date.now(), 1));
week.createTask("not that important, will get around to it", addDays(Date.now(), 8));
week.createTask("will have to get to it at some point", addDays(Date.now(), 4));

const task1 = today.findTask(0);
const task2 = tomorrow.findTask(3);
const task3 = week.findTask(6);

TaskManager.toggleTaskComplete(task1, true);
TaskManager.toggleTaskComplete(task1, false);
TaskManager.moveTask(today.id, task1.id, 0);
TaskManager.removeTask(task1.id);

TaskManager.toggleTaskComplete(task2, true);
TaskManager.toggleTaskComplete(task2, false);
TaskManager.moveTask(tomorrow.id, task2.id, 0);
TaskManager.removeTask(task2.id);

TaskManager.toggleTaskComplete(task3, true);
TaskManager.toggleTaskComplete(task3, false);
TaskManager.moveTask(week.id, task3.id, 0);
TaskManager.removeTask(task3.id);

printList(today);
printList(tomorrow);
printList(week);

// create more list classes and test it out
// implement project
// test it out more with projectszz
// start working with html and css