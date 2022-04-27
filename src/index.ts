interface Todo {
  text: string;
  active: boolean;
}

const todoArray: Todo[] = [];

const mainInput: HTMLInputElement | null =
  document.querySelector("#main-input");

const form: HTMLFormElement | null = document.querySelector("#main-input-form");

const mainInputHandler = (event: Event): void => {
  event.preventDefault();
  mainInput?.value
    ? todoArray.push({
        text: mainInput.value,
        active: true,
      })
    : "";
  form?.reset();

  document.querySelector(
    "#remaining-todos"
  )?.textContent = `${todoArray.length} items left`;

  createTodos(mainInput?.value);
};

form?.addEventListener("submit", mainInputHandler);

const template: any = document
  .querySelector("template")
  ?.content.cloneNode(true);

const todoLI: any = template?.children[0];

const createTodos = (text: string): void => {
  const newLI: HTMLLIElement = todoLI;

  newLI.querySelector("p")?.textContent = text;

  document.querySelector("#todo-list")?.appendChild(newLI.cloneNode(true));
};
