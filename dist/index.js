"use strict";
var _a;
const todoArray = [];
const mainInput = document.querySelector("#main-input");
const form = document.querySelector("#main-input-form");
const mainInputHandler = (event) => {
    event.preventDefault();
    if (mainInput === null || mainInput === void 0 ? void 0 : mainInput.value) {
        todoArray.push({
            text: mainInput === null || mainInput === void 0 ? void 0 : mainInput.value,
            active: true,
        });
        document.querySelector("#remaining-todos").textContent =
            HowManyItemsLeft();
        createTodos(mainInput.value);
        form.reset();
    }
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", mainInputHandler);
const template = (_a = document
    .querySelector("template")) === null || _a === void 0 ? void 0 : _a.content.cloneNode(true);
const todoLI = template.childNodes[1];
const createTodos = (text) => {
    var _a, _b, _c;
    const newLI = todoLI.cloneNode(true);
    newLI.querySelector("p").textContent = text;
    (_a = newLI.querySelector(".todo__close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", deleteTodo);
    (_b = newLI.querySelector(".todo__circle")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", checkTodo);
    (_c = document.querySelector("#todo-list")) === null || _c === void 0 ? void 0 : _c.appendChild(newLI);
};
const deleteTodo = (event) => {
    const todoTarget = event.currentTarget;
    const todoText = todoTarget.previousElementSibling.textContent;
    const todoToBeDeleted = todoTarget.parentElement;
    document.querySelector(".todos-list").removeChild(todoToBeDeleted);
    const index = todoArray.findIndex((item) => item.text === todoText);
    todoArray.splice(index, 1);
    document.querySelector("#remaining-todos").textContent = HowManyItemsLeft();
};
const checkTodo = (event) => {
    const todoCircle = event.currentTarget;
    const todoDescription = todoCircle.nextElementSibling;
    const todoText = todoDescription.textContent;
    todoCircle.classList.toggle("checked");
    todoDescription.classList.toggle("checked");
    const index = todoArray.findIndex((item) => item.text === todoText);
    todoArray[index].active = !todoArray[index].active;
    document.querySelector("#remaining-todos").textContent = HowManyItemsLeft();
};
const HowManyItemsLeft = () => {
    let counter = 0;
    todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
    const response = todoArray.length === 0
        ? "No items left"
        : `${counter} items left`;
    return response;
};
