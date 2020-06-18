import _ from 'lodash';
import './style.css';
import Form from './form';
import ToDo from './todo';
import FormForProject from './formForProject';
import Project from './project';

const Main = (() => {
  let projects = JSON.parse(localStorage.getItem('projects'));
  if (projects == null) {
    projects = [];
  } else {
    let dummy = [...projects];
    console.log(dummy);
    projects = [];
    for (let i = 0; i < dummy.length; i += 1) {
      console.log('here');
      projects.push(new Project(dummy[i].title, dummy[i].toDo));
    }
  }

  console.log(projects);
  console.log(projects[0] instanceof Project);

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

    // Render projects

    if (projects != null) {
      const projectsDiv = document.createElement('div');
      projectsDiv.setAttribute('id', 'projects-container');
      projectsDiv.classList.add('projects-container');

      for (let i = 0; i <= projects.length - 1; i += 1) {
        let link = document.createElement('a');

        link.onclick = () => {
          console.log(projects[i]);
          renderToDo(projects[i]);
        };
        link.innerHTML = projects[i].title;

        projectsDiv.appendChild(link);
      }
      divProject.appendChild(projectsDiv);
    }
  };

  const renderToDo = (project) => {
    const toDoDiv = document.getElementById('project-content');
    console.log(project);
    project.toDo.push('one', 'two', 'three');
    project.toDo.forEach((e) => {
      let link = document.createElement('a');
      link.innerHTML = e;
      toDoDiv.appendChild(link);
    });
  };

  const validateProject = () => {
    const form = document.getElementById('project-form');
    if (form[0].value === '') {
      alert('Title must be filled out');
      return false;
    }
    const project = new Project(form[0].value);

    projects.push(project);
    project.save(projects);
    window.location.reload();
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
    submit.onclick = validateProject;
    submit.innerHTML = 'Create Project';

    form.appendChild(submit);
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
