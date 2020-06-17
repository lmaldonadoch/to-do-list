import _ from 'lodash';
import './style.css';
import Form from './form';
import ToDo from './todo';
import FormForProject from './formForProject';
import Project from './project';

const Main = (() => {
  const component = () => {
    const addToDoButton = document.createElement('button');
    const div = document.getElementById('project-content');

    addToDoButton.innerHTML = 'Add Todo';
    addToDoButton.onclick = renderForm;

    const addProjectButton = document.createElement('button');
    const divProject = document.getElementById('project');

    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.onclick = formForProject;

    divProject.appendChild(addProjectButton);
    div.appendChild(addToDoButton);
  };

  const formForProject = () => {
    const validateForm = document.getElementById('project-form');
    if (validateForm) {
      validateForm.parentNode.removeChild(validateForm);
    }

    FormForProject.render();

    const form = document.getElementById('project-form');

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.classList.add('form-button');
    submit.onclick = createProject;
    submit.innerHTML = 'Create Project';

    form.appendChild(submit);
  };

  const createProject = () => {
    const form = document.getElementById('project-form');
    const project = new Project(form[0].value);
  };

  const renderForm = () => {
    const validateForm = document.getElementById('todo-form');
    if (validateForm) {
      validateForm.parentNode.removeChild(validateForm);
    }

    Form.render();

    const form = document.getElementById('todo-form');

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.classList.add('form-button');
    submit.onclick = createToDo;
    submit.innerHTML = 'Create To-Do';

    form.appendChild(submit);
  };

  const createToDo = () => {
    const form = document.getElementById('todo-form');
    const toDo = new ToDo(
      form[0].value,
      form[1].value,
      form[2].value,
      form[3].value
    );
  };

  return { component };
})();

export default Main;
