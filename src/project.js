export default class Project {
  constructor(title) {
    this.title = title;
    this.todo = [];
    this.render = () => {
      console.log('here');
    };
  }

  save(array) {
    localStorage.setItem('projects', JSON.stringify(array));
  }

  // renderToDo() {
  //   //renderizar el boton
  //   //renderizar los todos
  //   console.log('here');
  //   hello;
  // }
}
