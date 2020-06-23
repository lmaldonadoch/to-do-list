import _ from 'lodash';

export default class Project {
  constructor(title, toDo = []) {
    this.title = title;
    this.toDo = toDo;
  }

  save(array) {
    localStorage.setItem('projects', JSON.stringify(array));
    return this;
  }

  removeToDo(toDo) {
    const newProject = _.remove(this.toDo, (n) => toDo === n);
    return newProject;
  }

  addToDo(newToDo) {
    this.toDo.push(newToDo);
  }

  sortByPriority() {
    this.toDo.sort((a, b) => a.priority - b.priority);
  }

  deleteProject(projects) {
    const newProjects = projects.filter((project) => project !== this);
    this.save(newProjects);
    return newProjects;
  }
}
