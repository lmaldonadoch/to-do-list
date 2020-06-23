const FormForProject = (() => {
  const container = document.getElementById('project');
  const render = () => {
    const form = document.createElement('form');
    form.classList.add('form', 'project-form');
    form.setAttribute('id', 'project-form');
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('form-element-container');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.classList.add('label');
    titleLabel.innerHTML = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.classList.add('title-input');
    titleInput.required = true;

    titleDiv.append(titleLabel, titleInput);

    form.append(titleDiv);
    container.appendChild(form);
  };
  return { render };
})();

export default FormForProject;
