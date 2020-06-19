import _ from 'lodash';
import './style.css';
import Form from './form';
import ToDo from './todo';
import FormForProject from './formForProject';
import Project from './project';

const Main = (() => {
  //load localStorage
  let projects = JSON.parse(localStorage.getItem('projects'));
  let lastProject = JSON.parse(localStorage.getItem('lastProject'));

  if (projects == null || projects.length === 0) {
    projects = [new Project('Your first project', [])];
  } else {
    let dummy = [...projects];
    projects = [];
    for (let i = 0; i < dummy.length; i += 1) {
      let timmy = [];
      dummy[i].toDo.forEach((todo) => {
        timmy.push(
          new ToDo(
            todo.title,
            todo.description,
            todo.dueDate,
            todo.priority,
            todo.check
          )
        );
      });
      projects.push(new Project(dummy[i].title, timmy));
    }
  }

  if (
    projects.filter((project) => {
      return project.title === lastProject;
    }).length === 0
  ) {
    lastProject = projects[0].title;
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

      if (lastProject) {
        let currentProject = projects.filter((project) => {
          return project.title === lastProject;
        });
        renderToDo(currentProject[0]);
      }
    }
  };

  // rendering to do from selected project + button

  const renderToDo = (project) => {
    const div = document.getElementById('project-content');
    div.innerHTML = '';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const addToDoButton = document.createElement('button');
    addToDoButton.innerHTML = 'Add Todo';
    addToDoButton.onclick = () => {
      renderForm(project);
    };

    const deleteProject = document.createElement('button');
    deleteProject.innerHTML = 'Delete Project';
    deleteProject.onclick = () => {
      project.deleteProject(projects);
      window.location.reload();
    };

    buttonsContainer.append(addToDoButton, deleteProject);
    div.appendChild(buttonsContainer);

    project.sortByPriority();
    project.toDo.forEach((e) => {
      let toDoDiv = document.createElement('div');
      toDoDiv.setAttribute('id', `todo-div-${e.title.replace(/\s/g, '')}`);
      let link = document.createElement('a');
      let wrapper = document.createElement('div');
      let checkBox = document.createElement('button');

      checkBox.onclick = () => {
        e.checkOn();
        project.save(projects);
        window.location.reload();
      };

      link.onclick = () => {
        toDoInfo(e, project);
      };
      if (e.check == true) {
        checkBox.innerHTML = 'Reset Task';
      } else {
        checkBox.innerHTML = 'Complete Task';
      }

      link.innerHTML = e.title;
      wrapper.append(link, checkBox);
      toDoDiv.appendChild(wrapper);
      div.appendChild(toDoDiv);
    });
  };

  // render todo info on click

  const toDoInfo = (toDo, project) => {
    const div = document.getElementById(
      `todo-div-${toDo.title.replace(/\s/g, '')}`
    );

    const testElem = document.getElementsByClassName(
      `${toDo.title.replace(/\s/g, '')}`
    );
    if (testElem.length > 0) {
      [...testElem].forEach((elem) => {
        elem.parentNode.removeChild(elem);
      });
      return false;
    }

    const descriptionPar = document.createElement('p');
    descriptionPar.innerHTML = `Description: ${toDo.description}`;
    descriptionPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const dueDatePar = document.createElement('p');
    dueDatePar.innerHTML = `Date: ${toDo.dueDate.toString()}`;
    dueDatePar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const priorityPar = document.createElement('p');
    priorityPar.innerHTML = `Priority: ${toDo.priority}`;
    priorityPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const checkPar = document.createElement('p');
    checkPar.innerHTML = `Check: ${toDo.check}`;
    checkPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete Todo';
    deleteButton.classList.add(`${toDo.title.replace(/\s/g, '')}`);
    deleteButton.onclick = () => {
      project.removeToDo(toDo);
      project.save(projects);
      window.location.reload();
    };

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit Todo';
    editButton.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    editButton.onclick = () => {
      renderForm(null, toDo);
    };

    div.append(
      descriptionPar,
      dueDatePar,
      priorityPar,
      checkPar,
      deleteButton,
      editButton
    );
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
  };

  // validates ToDo and creates a new one

  const validateToDo = (project = null, toDo = null) => {
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

    if (toDo === null) {
      const toDo = new ToDo(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].value
      );
    } else {
      toDo.title = form[0].value;
      toDo.description = form[1].value;
      toDo.dueDate = form[2].value;
      toDo.priority = form[3].value;
    }

    project.toDo.push(toDo);
    project.save(projects);
    saveLastProject(project);
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

  const renderForm = (project = null, toDo = null) => {
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
      validateToDo(project, toDo);
    };
    if (toDo === null) {
      submit.innerHTML = 'Create To-Do';
    } else {
      submit.innerHTML = 'Save changes';
    }

    form.appendChild(submit);
  };

  // save last project

  const saveLastProject = (project) => {
    localStorage.setItem('lastProject', JSON.stringify(project.title));
  };

  return { component };
})();

export default Main;
