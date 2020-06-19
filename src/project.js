import _ from 'lodash';
export default class Project {
  constructor(title, toDo = []) {
    this.title = title;
    this.toDo = toDo;
  }

  save(array) {
    localStorage.setItem('projects', JSON.stringify(array));
  }

  removeToDo(toDo) {
    const newProject = _.remove(this.toDo, function (n) {
      return toDo.title === n.title;
    });
    return newProject;
  }

  addToDo(newToDo) {
    this.toDo.push(newToDo);
  }

  sortByPriority() {
    this.toDo.sort((a, b) => {
      return a.priority - b.priority;
    });
  }
}
