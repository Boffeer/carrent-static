import {getClickedNotBeyondElement} from "../../helpers.b/get-helpers.js"

// Кастомный select

const CLASSES = {
  component: 'select',
  componentActive: 'select--active',
  input: 'select__input',
  toggle: 'select__toggle',
  toggleSelected: 'select__toggle--selected',
  option: 'select__option',
  optionActive: 'select__option--active',
  init: 'is-init',
}

const selectNodes = document.querySelectorAll(`.${CLASSES.component}`);

function initSelects(selectNodes) {
  selectNodes.forEach(selectNode => {
    if (selectNode.classList.contains(CLASSES.init)) return;

    const inputNode = selectNode.querySelector(`.${CLASSES.input}`);
    const toggleNode = selectNode.querySelector(`.${CLASSES.toggle}`);
    const optionNodes = [...selectNode.querySelectorAll(`.${CLASSES.option}`)];

    toggleNode.addEventListener('click', handleToggle);


    optionNodes.forEach((optionNode, index, arr) => {
      optionNode.addEventListener('click', () => {
        optionNodes.forEach(optionNode => optionNode.classList.remove(CLASSES.optionActive));
        optionNode.classList.add(CLASSES.optionActive);
        inputNode.selectedIndex = index + 1;
        toggleNode.classList.add(CLASSES.toggleSelected);
        toggleNode.textContent = optionNode.textContent;
      });
    });

    function handleToggle(evt) {
      evt.stopPropagation();
      selectNode.classList.toggle(CLASSES.componentActive);

      if (selectNode.classList.contains(CLASSES.componentActive)) {
          toggleNode.removeEventListener('click', handleToggle);
          document.addEventListener('click', handleDocument);
      }
    }

    function handleDocument(e) {
      selectNode.classList.remove(CLASSES.componentActive);

      document.removeEventListener('click', handleDocument);
      selectNode.addEventListener('click', handleToggle);
    }

    selectNode.classList.add(CLASSES.init)
  });
}
initSelects(selectNodes);
