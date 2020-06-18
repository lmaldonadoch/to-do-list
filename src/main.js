import _ from 'lodash';
import './style.css';
import Form from './form';
import ToDo from './todo';
import FormForProject from './formForProject';
import Project from './project';

const Main = (() => {
  //load localStorage
  let projects = JSON.parse(localStorage.getItem('projects'));
  if (projects == null) {
    projects = [];
  } else {
    let dummy = [...projects];
    projects = [];
    for (let i = 0; i < dummy.length; i += 1) {
      projects.push(new Project(dummy[i].title, dummy[i].toDo));
    }
  }

  //render base

  const component = () => {
    const addProjectButton = document.createElement('button');
    const divProject = document.getElementById('project');

    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.onclick = formForProject;

    divProject.appendChild(addProjectButton);

    // Render projects

    if (projects != null) {
      const projectsDiv = document.createElement('div');
      projectsDiv.setAttribute('id', 'projects-container');
      projectsDiv.classList.add('projects-container');

      for (let i = 0; i <= projects.length - 1; i += 1) {
        let link = document.createElement('a');

        link.onclick = () => {
          renderToDo(projects[i]);
        };
        link.innerHTML = projects[i].title;

        projectsDiv.appendChild(link);
      }
      divProject.appendChild(projectsDiv);
    }
  };

  // rendering to do from selected project + button

  const renderToDo = (project) => {
    const addToDoButton = document.createElement('button');
    const div = document.getElementById('project-content');

    addToDoButton.innerHTML = 'Add Todo';
    addToDoButton.onclick = () => {
      renderForm(project);
    };

    div.appendChild(addToDoButton);

    const toDoDiv = document.getElementById('project-content');
    project.sortByPriority();
    project.toDo.forEach((e) => {
      console.log(e);
      let link = document.createElement('a');
      link.innerHTML = e.title;
      toDoDiv.appendChild(link);
    });
  };

  // validates project is filled out

  const validateProject = () => {
    const form = document.getElementById('project-form');
    if (form[0].value === '') {
      alert('Title must be filled out');
      return false;
    }
    const project = new Project(form[0].value);

    projects.push(project);
    project.save(projects);
    // window.location.reload();
  };

  // validates ToDo and creates a new one

  const validateToDo = (project) => {
    const form = document.getElementById('todo-form');
    if (
      form[0].value === '' ||
      form[1].value === '' ||
      form[2].value === '' ||
      form[3].value === ''
    ) {
      alert('Form should be completely filled out.');
      return false;
    }
    const toDo = new ToDo(
      form[0].value,
      form[1].value,
      form[2].value,
      form[3].value
    );

    project.toDo.push(toDo);
    project.save(projects);
    // window.location.reload();
  };

  //renders project form

  const formForProject = () => {
    const validateForm = document.getElementById('project-form');
    if (validateForm) {
      validateForm.parentNode.removeChild(validateForm);
      return false;
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

  // renders todo form

  const renderForm = (project) => {
    const validateForm = document.getElementById('todo-form');
    if (validateForm) {
      validateForm.parentNode.removeChild(validateForm);
      return false;
    }

    Form.render();

    const form = document.getElementById('todo-form');

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.classList.add('form-button');
    submit.onclick = () => {
      validateToDo(project);
    };
    submit.innerHTML = 'Create To-Do';

    form.appendChild(submit);
  };

  return { component };
})();

export default Main;
