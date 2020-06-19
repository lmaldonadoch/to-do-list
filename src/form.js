const Form = (() => {
  const container = document.getElementById('project-content');
  const render = () => {
    const form = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('id', 'todo-form');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('form-element-container');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.classList.add('label');
    titleLabel.innerHTML = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.classList.add('title-input');

    titleDiv.append(titleLabel, titleInput);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('form-element-container');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.classList.add('label');
    descriptionLabel.innerHTML = 'Description';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.classList.add('description-input');

    descriptionDiv.append(descriptionLabel, descriptionInput);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('form-element-container');

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.classList.add('label');
    dueDateLabel.innerHTML = 'Due date';
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.classList.add('dueDate-input');

    dueDateDiv.append(dueDateLabel, dueDateInput);

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('form-element-container');

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.classList.add('label');
    priorityLabel.innerHTML = 'Priority';
    const priorityInput = document.createElement('input');
    priorityInput.setAttribute('type', 'number');
    priorityInput.classList.add('priority-input');

    priorityDiv.append(priorityLabel, priorityInput);

    form.append(titleDiv, descriptionDiv, dueDateDiv, priorityDiv);

    container.appendChild(form);
  };
  return { render };
})();

export default Form;
