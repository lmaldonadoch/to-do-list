import _ from 'lodash';
import './style.css';
import Form from './form';

function component() {
  const addToDoButton = document.createElement('button');
  const div = document.getElementById('project-content');

  addToDoButton.innerHTML = "Add Todo";
  addToDoButton.onclick = Form.render;

  div.appendChild(addToDoButton);

  console.log(div);
}

component();
