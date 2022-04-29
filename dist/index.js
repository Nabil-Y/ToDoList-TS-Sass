"use strict";
var _a;
let todoArray = [];
// Main search bar
const form = document.querySelector("#main-input-form");
const mainInputHandler = (event) => {
    const mainInput = document.querySelector("#main-input");
    event.preventDefault();
    if (mainInput.value) {
        const newTodo = {
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
const template = document
    .querySelector("template")
    .content.cloneNode(true);
const todoLI = template.childNodes[1];
const createTodo = (todo) => {
    const newLI = todoLI.cloneNode(true);
    newLI.querySelector("p").textContent = todo.text;
    todo.active
        ? ""
        : newLI.querySelector(".todo__circle").classList.add("checked");
    newLI.querySelector(".todo__close").addEventListener("click", deleteTodo);
    newLI.querySelector(".todo__circle").addEventListener("click", checkTodo);
    document.querySelector("#todo-list").appendChild(newLI);
};
const deleteTodo = (event) => {
    const todoTarget = event.currentTarget;
    const todoText = todoTarget.previousElementSibling.textContent;
    const todoToBeDeleted = todoTarget.parentElement;
    document.querySelector(".todos-list").removeChild(todoToBeDeleted);
    const index = todoArray.findIndex((item) => item.text === todoText);
    todoArray.splice(index, 1);
    howManyTodosLeft();
};
const updateTodo = (array) => {
    document.querySelector("#todo-list").innerHTML = "";
    array.forEach((todo) => createTodo(todo));
};
const clearCompleted = () => {
    todoArray = todoArray.filter((todo) => todo.active === true);
    updateTodo(todoArray);
};
const filterTodo = (event) => {
    let filteredArray = [];
    const target = event.target;
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
    .querySelectorAll(".todos-list__filter a")
    .forEach((link) => link.addEventListener("click", filterTodo));
(_a = document
    .querySelector(".todos-list__button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", clearCompleted);
const checkTodo = (event) => {
    const todoCircle = event.currentTarget;
    const todoDescription = todoCircle.nextElementSibling;
    const todoText = todoDescription.textContent;
    todoCircle.classList.toggle("checked");
    todoDescription.classList.toggle("checked");
    const index = todoArray.findIndex((item) => item.text === todoText);
    todoArray[index].active = !todoArray[index].active;
    howManyTodosLeft();
};
const howManyTodosLeft = () => {
    let counter = 0;
    todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
    const response = todoArray.length === 0
        ? "No items left"
        : `${counter} items left`;
    document.querySelector("#remaining-todos").textContent = response;
};
