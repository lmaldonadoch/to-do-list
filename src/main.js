import _ from 'lodash';
import './style.css';
import Form from './form';
import ToDo from './todo';

const Main = (() => {
  const component = () => {
    const addToDoButton = document.createElement('button');
    const div = document.getElementById('project-content');

    addToDoButton.innerHTML = 'Add Todo';
    addToDoButton.onclick = renderForm;

    div.appendChild(addToDoButton);
  };

  const renderForm = () => {
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

    console.log(toDo);
    hello;
  };

  return { component };
})();

export default Main;
