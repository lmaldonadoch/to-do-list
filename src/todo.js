export default class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = false;
  }

  checkOn() {
    if(this.check === false ) {
      this.check = true;
    } else {
      this.check = false;
    }

    console.log("check on clicked");
  }
}
