import './style.css';
import Form from './form';
import ToDo from './todo';
import FormForProject from './formForProject';
import Project from './project';

const Main = (() => {
  // load localStorage
  let projects = JSON.parse(localStorage.getItem('projects'));
  let lastProject = JSON.parse(localStorage.getItem('lastProject'));

  if (projects == null || projects.length === 0) {
    projects = [new Project('Your first project', [])];
  } else {
    const dummy = [...projects];
    projects = [];
    for (let i = 0; i < dummy.length; i += 1) {
      const timmy = [];
      dummy[i].toDo.forEach((todo) => {
        timmy.push(
          new ToDo(
            todo.title,
            todo.description,
            todo.dueDate,
            todo.priority,
            todo.check,
          ),
        );
      });
      projects.push(new Project(dummy[i].title, timmy));
    }
  }

  if (
    projects.filter((project) => project.title === lastProject).length === 0
  ) {
    lastProject = projects[0].title;
  }

  // save last project

  const saveLastProject = (project) => {
    localStorage.setItem('lastProject', JSON.stringify(project.title));
  };

  // validates project is filled out

  const validateProject = () => {
    const form = document.getElementById('project-form');
    const project = new Project(form[0].value);

    projects.push(project);
    return project.save(projects);
  };

  // validates ToDo and creates a new one

  const validateToDo = (project = null, toDo = null) => {
    const form = document.getElementById('todo-form');

    let newToDo = null;

    if (toDo === null) {
      newToDo = new ToDo(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].value,
      );
    } else {
      toDo.title = form[0].value;
      toDo.description = form[1].value;
      toDo.dueDate = form[2].value;
      toDo.priority = form[3].value;
    }

    if (newToDo) {
      project.toDo.push(newToDo);
    }

    project.save(projects);
    return saveLastProject(project);
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
    submit.onclick = () => validateToDo(project, toDo);
    if (toDo === null) {
      submit.innerHTML = 'Create Task';
    } else {
      form[0].value = toDo.title;
      form[1].value = toDo.description;
      form[2].value = toDo.dueDate;
      form[3].value = toDo.priority;
      submit.innerHTML = 'Save Changes';
    }

    return form.appendChild(submit);
  };

  // render todo info on click

  const toDoInfo = (toDo, project) => {
    const div = document.getElementById(`todo-div-${toDo.title.replace(/\s/g, '')}`);

    const testElem = document.getElementsByClassName(
      `${toDo.title.replace(/\s/g, '')}`,
    );
    if (testElem.length > 0) {
      [...testElem].forEach((elem) => {
        elem.parentNode.removeChild(elem);
      });
      return false;
    }

    const descriptionPar = document.createElement('p');
    descriptionPar.innerHTML = `${toDo.description}`;
    descriptionPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const dueDatePar = document.createElement('p');
    dueDatePar.innerHTML = `<i class="fas fa-calendar"></i> ${toDo.dueDate.toString()}`;
    dueDatePar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const priorityCheck = document.createElement('div');
    priorityCheck.classList.add(
      'priority-check-container',
      `${toDo.title.replace(/\s/g, '')}`,
    );

    const priorityPar = document.createElement('p');
    priorityPar.innerHTML = `Priority: ${toDo.priority}`;
    priorityPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    const checkPar = document.createElement('p');
    if (toDo.check === true) {
      checkPar.innerHTML = 'Task Completed';
    } else {
      checkPar.innerHTML = 'Pending Task';
    }

    checkPar.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    priorityCheck.append(priorityPar, checkPar);

    const todoButtons = document.createElement('div');
    todoButtons.classList.add('todoButtons');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete Task';
    deleteButton.classList.add(`${toDo.title.replace(/\s/g, '')}`);
    deleteButton.onclick = () => {
      project.removeToDo(toDo);
      project.save(projects);
      window.location.reload();
    };

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit Task';
    editButton.classList.add(`${toDo.title.replace(/\s/g, '')}`);

    editButton.onclick = () => {
      renderForm(project, toDo);
    };

    todoButtons.append(editButton, deleteButton);

    return div.append(descriptionPar, dueDatePar, priorityCheck, todoButtons);
  };

  // rendering to do from selected project + button

  const renderToDo = (project) => {
    const div = document.getElementById('project-content');
    div.innerHTML = '';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    const addToDoButton = document.createElement('button');
    addToDoButton.innerHTML = '<i class="fas fa-plus"></i> Add Task';
    addToDoButton.onclick = () => {
      renderForm(project);
    };

    const deleteProject = document.createElement('button');
    deleteProject.innerHTML = '<i class="fas fa-minus"></i> Delete Project';
    deleteProject.onclick = () => {
      project.deleteProject(projects);
      window.location.reload();
    };

    buttonsContainer.append(addToDoButton, deleteProject);
    div.appendChild(buttonsContainer);

    project.sortByPriority();
    project.toDo.forEach((e) => {
      const toDoDiv = document.createElement('div');
      toDoDiv.setAttribute('id', `todo-div-${e.title.replace(/\s/g, '')}`);
      toDoDiv.classList.add('to-do-container');
      const link = document.createElement('a');
      const wrapper = document.createElement('div');
      const checkBox = document.createElement('button');
      checkBox.classList.add('checkbutton');
      checkBox.onclick = () => {
        e.checkOn();
        project.save(projects);
        window.location.reload();
      };

      link.onclick = () => {
        toDoInfo(e, project);
      };
      if (e.check === false) {
        checkBox.innerHTML = '<i class="fas fa-times"></i>';
        checkBox.classList.add('red');
      } else {
        checkBox.innerHTML = '<i class="fas fa-check"></i>';
        checkBox.classList.add('green');
      }

      link.innerHTML = e.title;
      wrapper.append(checkBox, link);
      wrapper.classList.add('whopper');
      toDoDiv.appendChild(wrapper);
      div.appendChild(toDoDiv);
    });
  };

  // renders project form

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

    return form.appendChild(submit);
  };

  // render base
  const component = () => {
    const addProjectButton = document.createElement('button');
    const divProject = document.getElementById('project');

    addProjectButton.innerHTML = 'Add Project';
    addProjectButton.onclick = formForProject;
    addProjectButton.classList.add('add-project-button');

    divProject.appendChild(addProjectButton);

    // Render projects

    if (projects != null) {
      const projectsDiv = document.createElement('div');
      projectsDiv.setAttribute('id', 'projects-container');
      projectsDiv.classList.add('projects-container');

      for (let i = 0; i <= projects.length - 1; i += 1) {
        const link = document.createElement('a');

        link.onclick = () => {
          const linksList = document.getElementsByClassName('project-link');
          [...linksList].forEach(eachLink => {
            eachLink.classList.remove('active');
          });

          link.classList.add('active');

          renderToDo(projects[i]);
        };
        link.innerHTML = projects[i].title;
        link.classList.add('project-link');

        projectsDiv.appendChild(link);
      }
      divProject.appendChild(projectsDiv);

      if (lastProject) {
        const currentProject = projects.filter(
          (project) => project.title === lastProject,
        );
        renderToDo(currentProject[0]);
      }
    }
  };

  return { component };
})();

export default Main;
