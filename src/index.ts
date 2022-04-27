interface Todo {
  text: string | null;
  active: boolean;
}

const todoArray: Todo[] = [];

const mainInput: HTMLInputElement | null =
  document.querySelector("#main-input");

const form: HTMLFormElement | null = document.querySelector("#main-input-form");

const mainInputHandler = (event: Event): void => {
  event.preventDefault();
  if (mainInput?.value) {
    todoArray.push({
      text: mainInput?.value,
      active: true,
    });

    document.querySelector("#remaining-todos")!.textContent =
      HowManyItemsLeft();

    createTodos(mainInput!.value);

    form!.reset();
  }
};

form?.addEventListener("submit", mainInputHandler);

const template: Node | undefined = document
  .querySelector("template")
  ?.content.cloneNode(true);

const todoLI: ChildNode = template!.childNodes[1];

const createTodos = (text: string): void => {
  const newLI = todoLI.cloneNode(true) as HTMLElement;

  newLI.querySelector("p")!.textContent = text;

  newLI.querySelector(".todo__close")?.addEventListener("click", deleteTodo);
  newLI.querySelector(".todo__circle")?.addEventListener("click", checkTodo);

  document.querySelector("#todo-list")?.appendChild(newLI);
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

  document.querySelector("#remaining-todos")!.textContent = HowManyItemsLeft();
};

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

  document.querySelector("#remaining-todos")!.textContent = HowManyItemsLeft();
};

const HowManyItemsLeft = (): string => {
  let counter = 0 as number;
  todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
  const response =
    todoArray.length === 0
      ? "No items left"
      : (`${counter} items left` as string);
  return response;
};
