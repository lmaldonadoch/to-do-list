export default class ToDo {
  constructor(title, description, dueDate, priority, check = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = check;
  }

  checkOn() {
    if (this.check === false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
