import Form from './form';
export default class Project {
  constructor(title) {
    this.title = title;
    this.toDo = [];
  }

  save(array) {
    localStorage.setItem('projects', JSON.stringify(array));
  }

  addToDo(newToDo) {
    this.todo.push(newToDo);
  }
}
