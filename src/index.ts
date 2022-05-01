//Init types and variables
interface Todo {
  text: string;
  active: boolean;
}

let todoArray: Todo[] = [];

// Main search bar
const form: HTMLFormElement = document.querySelector("#main-input-form")!;

const mainInputHandler = (event: Event): void => {
  const mainInput: HTMLInputElement = document.querySelector("#main-input")!;
  event.preventDefault();
  if (mainInput.value) {
    const newTodo: Todo = {
      text: mainInput.value,
      active: true,
    };
    todoArray.push(newTodo);
    howManyTodosLeft();
    createTodo(newTodo);
    form.reset();
  }
};

// Create one todo

const template: Node = document
  .querySelector("template")!
  .content.cloneNode(true);

const todoLI: ChildNode = template.childNodes[1];

const createTodo = (todo: Todo): void => {
  const newLI = todoLI.cloneNode(true) as HTMLElement;

  newLI.querySelector("p")!.textContent = todo.text;

  todo.active
    ? ""
    : newLI.querySelector(".todo__circle")!.classList.add("checked");

  newLI.querySelector(".todo__close")!.addEventListener("click", deleteTodo);
  newLI.querySelector(".todo__circle")!.addEventListener("click", checkTodo);

  document.querySelector("#todo-list")!.appendChild(newLI);
};

// Delete one todo
const deleteTodo = (event: Event): void => {
  const todoTarget = event.currentTarget as HTMLElement;
  const todoText = todoTarget.previousElementSibling!.textContent as string;
  const todoToBeDeleted: HTMLElement = todoTarget.parentElement!;
  document.querySelector(".todos-list")!.removeChild(todoToBeDeleted);

  const index: number = todoArray.findIndex(
    (item: Todo) => item.text === todoText
  );
  todoArray.splice(index, 1);

  howManyTodosLeft();
};

// Reset TodoList and update it with new content
const updateTodoList = (array: Todo[]): void => {
  document.querySelector("#todo-list")!.innerHTML = "";
  array.forEach((todo) => createTodo(todo));
};

const clearCompleted = (): void => {
  todoArray = todoArray.filter((todo) => todo.active === true);
  updateTodoList(todoArray);
  document
    .querySelectorAll(".todos-list__filter a")
    .forEach((item) => item.classList.remove("active-filter"));
  document
    .querySelectorAll(".todos-list__filter a")[0]
    .classList.add("active-filter");
};

// Filter todo list function
const filterTodoList = (event: Event): void => {
  let filteredArray: Todo[] = [];
  const target = event.target! as HTMLElement;
  document
    .querySelectorAll(".todos-list__filter a")
    .forEach((item) => item.classList.remove("active-filter"));
  target.classList.add("active-filter");
  switch (target.textContent) {
    case "All":
      filteredArray = todoArray.slice();
      break;
    case "Active":
      filteredArray = todoArray.filter((todo) => todo.active === true);
      break;
    case "Completed":
      filteredArray = todoArray.filter((todo) => todo.active === false);
      break;
  }
  updateTodoList(filteredArray);
};

// Check Todo List
const checkTodo = (event: Event): void => {
  const todoCircle = event.currentTarget as HTMLElement;
  const todoDescription = todoCircle.nextElementSibling as HTMLElement;
  const todoText = todoDescription.textContent as string;
  todoCircle.classList.toggle("checked");
  todoDescription.classList.toggle("checked");

  const index: number = todoArray.findIndex(
    (item: Todo) => item.text === todoText
  );
  todoArray[index].active = !todoArray[index].active;

  howManyTodosLeft();
};

// Updates HTML element displaying remaining todos
const howManyTodosLeft = (): void => {
  let counter = 0 as number;
  todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
  const response =
    todoArray.length === 0
      ? "No items left"
      : (`${counter} items left` as string);
  document.querySelector("#remaining-todos")!.textContent = response;
};

// Theme switch

const changeThemeToDark = (): void => {
  document.body.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
};
const changeThemeToLight = (): void => {
  document.body.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
};

const themeToggle = (): void => {
  localStorage.getItem("theme") === "light"
    ? changeThemeToDark()
    : changeThemeToLight();

  document
    .querySelectorAll("header img")!
    .forEach((img) => img.classList.toggle("disappear"));
};

// Detects user prefered theme and saves the info
const detectUserPreferedTheme = (): void => {
  if (localStorage.getItem("theme") === "light") return;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localStorage.setItem("theme", "light");
    themeToggle();
  } else {
    localStorage.setItem("theme", "light");
  }
};

// Change filter display depending on screen size

const filterCheck = (): void => {
  const filterWrapperInside = document.querySelector(".filter-wrapper-inside");
  const filterWrapperOutside = document.querySelector(
    ".filter-wrapper-outside"
  );
  if (window.innerWidth <= 768) {
    filterWrapperOutside!.appendChild(
      document.querySelector(".todos-list__filter")!
    );
  } else {
    filterWrapperInside!.appendChild(
      document.querySelector(".todos-list__filter")!
    );
  }
};

// Starting functions

const addEventListeners = (): void => {
  form.addEventListener("submit", mainInputHandler);
  document
    .querySelectorAll(".todos-list__filter a")
    .forEach((link) => link.addEventListener("click", filterTodoList));

  document
    .querySelector(".todos-list__clear")
    ?.addEventListener("click", clearCompleted);
  document
    .querySelector("header button")!
    .addEventListener("click", themeToggle);
  window.addEventListener("resize", filterCheck);
};

const init = (): void => {
  detectUserPreferedTheme();
  addEventListeners();
};

init();
