//Init types and variables
interface Todo {
  text: string;
  active: boolean;
}
let todoArray: Todo[] = [
  {
    text: 'This is from local storage',
    active: true,
  },
  {
    text: 'This is completed',
    active: false,
  },
];
if (JSON.parse(localStorage.getItem('todo-list')!).length === 0) {
  localStorage.setItem('todo-list', JSON.stringify(todoArray));
} else {
  todoArray = JSON.parse(localStorage.getItem('todo-list')!);
}
const filterLinks = [...document.querySelectorAll('.todos-list__filter a')] as HTMLAnchorElement[];

// Main search bar
const form: HTMLFormElement = document.querySelector('#main-input-form')!;
const completedFilter = document.getElementById('completed-filter') as HTMLAnchorElement;
const mainInputHandler = (event: Event): void => {
  const mainInput: HTMLInputElement = document.querySelector('#main-input')!;
  event.preventDefault();
  if (mainInput.value) {
    const newTodo: Todo = {
      text: mainInput.value,
      active: true,
    };
    todoArray.push(newTodo);
    localStorage.setItem('todo-list', JSON.stringify(todoArray));
    howManyTodosLeft();
    if (!completedFilter.classList.contains('active-filter')) {
      createTodoHTML(newTodo);
    }
    form.reset();
  }
};

// Create one todo html
const template: Node = document.querySelector('template')!.content.cloneNode(true);
const todoLI: ChildNode = template.childNodes[1];

const createTodoHTML = (todo: Todo): void => {
  const newLI = todoLI.cloneNode(true) as HTMLLIElement;
  newLI.querySelector('p')!.textContent = todo.text;
  todo.active ? '' : newLI.querySelector('.todo__circle')!.classList.add('checked');

  newLI.querySelector('.todo__close')!.addEventListener('click', deleteTodo);
  newLI.querySelector('.todo__circle')!.addEventListener('click', checkTodo);

  document.querySelector('#todo-list')!.appendChild(newLI);
};

// Delete one todo
const deleteTodo = (event: Event): void => {
  const todoTarget = event.currentTarget as HTMLLIElement;
  const todoText = todoTarget.previousElementSibling!.textContent as string;
  const todoToBeDeleted = todoTarget.parentElement! as HTMLLIElement;
  document.querySelector('.todos-list')!.removeChild(todoToBeDeleted);

  const index: number = todoArray.findIndex((item: Todo) => item.text === todoText);
  todoArray.splice(index, 1);

  localStorage.setItem('todo-list', JSON.stringify(todoArray));
  howManyTodosLeft();
};

// Reset TodoList and update it with new content
const updateTodoList = (array: Todo[] | null): void => {
  document.querySelector('#todo-list')!.innerHTML = '';
  array?.forEach((todo) => createTodoHTML(todo));
};

const clearCompleted = (): void => {
  todoArray = todoArray.filter((todo) => todo.active === true);
  localStorage.setItem('todo-list', JSON.stringify(todoArray));
  updateTodoList(todoArray);

  filterLinks.forEach((item) => item.classList.remove('active-filter'));
  document.querySelectorAll('.todos-list__filter a')[0].classList.add('active-filter');
};

// Filter todo list function
const filterTodoList = (event: Event): void => {
  let filteredArray: Todo[] = [];
  const target = event.target! as HTMLAnchorElement;
  filterLinks.forEach((item) => item.classList.remove('active-filter'));
  target.classList.add('active-filter');
  switch (target.textContent) {
    case 'All':
      filteredArray = todoArray.slice();
      break;
    case 'Active':
      filteredArray = todoArray.filter((todo) => todo.active === true);
      break;
    case 'Completed':
      filteredArray = todoArray.filter((todo) => todo.active === false);
      break;
  }
  updateTodoList(filteredArray);
};

// Check Todo List
const checkTodo = (event: Event): void => {
  const todoCircle = event.currentTarget as HTMLDivElement;
  const todoDescription = todoCircle.nextElementSibling as HTMLParagraphElement;
  const todoText = todoDescription.textContent as string;
  todoCircle.classList.toggle('checked');
  todoDescription.classList.toggle('checked');

  const index: number = todoArray.findIndex((item: Todo) => item.text === todoText);
  todoArray[index].active = !todoArray[index].active;

  localStorage.setItem('todo-list', JSON.stringify(todoArray));
  howManyTodosLeft();
};

// Updates HTML element displaying remaining todos
const howManyTodosLeft = (): void => {
  let counter = 0 as number;
  todoArray.forEach((item) => (item.active ? (counter += 1) : ''));
  const response = todoArray.length === 0 ? 'No items left' : (`${counter} items left` as string);
  document.querySelector('#remaining-todos')!.textContent = response;
};

// Theme switch

const changeThemeToDark = (): void => {
  document.body.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
};
const changeThemeToLight = (): void => {
  document.body.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
};

const themeToggle = (): void => {
  localStorage.getItem('theme') === 'light' ? changeThemeToDark() : changeThemeToLight();

  document.querySelectorAll('header img')!.forEach((img) => img.classList.toggle('disappear'));
};

// Detects user prefered theme and saves the info
const detectUserPreferedTheme = (): void => {
  if (localStorage.getItem('theme') === 'light') return;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem('theme', 'light');
    themeToggle();
  } else {
    localStorage.setItem('theme', 'light');
  }
};

// Change filter display depending on screen size

const filterCheck = (): void => {
  const filterWrapperInside = document.querySelector('.filter-wrapper-inside');
  const filterWrapperOutside = document.querySelector('.filter-wrapper-outside');
  if (window.innerWidth <= 768) {
    filterWrapperOutside!.appendChild(document.querySelector('.todos-list__filter')!);
  } else {
    filterWrapperInside!.appendChild(document.querySelector('.todos-list__filter')!);
  }
};

// Starting functions

const addEventListeners = (): void => {
  form.addEventListener('submit', mainInputHandler);
  filterLinks.forEach((link) => link.addEventListener('click', filterTodoList));
  document.querySelector('.todos-list__clear')?.addEventListener('click', clearCompleted);
  document.querySelector('header button')!.addEventListener('click', themeToggle);
  window.addEventListener('resize', filterCheck);
};

const init = (): void => {
  detectUserPreferedTheme();
  addEventListeners();
  updateTodoList(JSON.parse(localStorage.getItem('todo-list')!));
  howManyTodosLeft();
};

init();
