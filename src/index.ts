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

form.addEventListener("submit", mainInputHandler);

// Todo creation

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

const updateTodo = (array: Todo[]): void => {
  document.querySelector("#todo-list")!.innerHTML = "";
  array.forEach((todo) => createTodo(todo));
};

const clearCompleted = (): void => {
  todoArray = todoArray.filter((todo) => todo.active === true);
  updateTodo(todoArray);
};

const filterTodo = (event: Event): void => {
  let filteredArray: Todo[] = [];
  const target = event.target! as HTMLElement;
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
  updateTodo(filteredArray);
};

document
  .querySelectorAll(".todos-list__filter a")!
  .forEach((link) => link.addEventListener("click", filterTodo));

document
  .querySelector(".todos-list__button")
  ?.addEventListener("click", clearCompleted);

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

const howManyTodosLeft = (): void => {
  let counter = 0 as number;
  todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
  const response =
    todoArray.length === 0
      ? "No items left"
      : (`${counter} items left` as string);
  document.querySelector("#remaining-todos")!.textContent = response;
};
