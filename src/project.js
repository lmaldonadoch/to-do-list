import Form from './form';
export default class Project {
  constructor(title, toDo = []) {
    this.title = title;
    this.toDo = toDo;
  }

  save(array) {
    localStorage.setItem('projects', JSON.stringify(array));
  }

  addToDo(newToDo) {
    this.toDo.push(newToDo);
  }

  sortByPriority() {
    this.toDo.sort((a, b) => {
      console.log(a.priority, b.priority);
      return a.priority - b.priority;
    });
  }
}
