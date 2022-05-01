"use strict";
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
// Create one todo
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
// Delete one todo
const deleteTodo = (event) => {
    const todoTarget = event.currentTarget;
    const todoText = todoTarget.previousElementSibling.textContent;
    const todoToBeDeleted = todoTarget.parentElement;
    document.querySelector(".todos-list").removeChild(todoToBeDeleted);
    const index = todoArray.findIndex((item) => item.text === todoText);
    todoArray.splice(index, 1);
    howManyTodosLeft();
};
// Reset TodoList and update it with new content
const updateTodoList = (array) => {
    document.querySelector("#todo-list").innerHTML = "";
    array.forEach((todo) => createTodo(todo));
};
const clearCompleted = () => {
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
const filterTodoList = (event) => {
    let filteredArray = [];
    const target = event.target;
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
// Updates HTML element displaying remaining todos
const howManyTodosLeft = () => {
    let counter = 0;
    todoArray.forEach((item) => (item.active ? (counter += 1) : ""));
    const response = todoArray.length === 0
        ? "No items left"
        : `${counter} items left`;
    document.querySelector("#remaining-todos").textContent = response;
};
// Theme switch
const changeThemeToDark = () => {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
};
const changeThemeToLight = () => {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
};
const themeToggle = () => {
    localStorage.getItem("theme") === "light"
        ? changeThemeToDark()
        : changeThemeToLight();
    document
        .querySelectorAll("header img")
        .forEach((img) => img.classList.toggle("disappear"));
};
// Detects user prefered theme and saves the info
const detectUserPreferedTheme = () => {
    if (localStorage.getItem("theme") === "light")
        return;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("theme", "light");
        themeToggle();
    }
    else {
        localStorage.setItem("theme", "light");
    }
};
// Change filter display depending on screen size
const filterCheck = () => {
    const filterWrapperInside = document.querySelector(".filter-wrapper-inside");
    const filterWrapperOutside = document.querySelector(".filter-wrapper-outside");
    if (window.innerWidth <= 768) {
        filterWrapperOutside.appendChild(document.querySelector(".todos-list__filter"));
    }
    else {
        filterWrapperInside.appendChild(document.querySelector(".todos-list__filter"));
    }
};
// Starting functions
const addEventListeners = () => {
    var _a;
    form.addEventListener("submit", mainInputHandler);
    document
        .querySelectorAll(".todos-list__filter a")
        .forEach((link) => link.addEventListener("click", filterTodoList));
    (_a = document
        .querySelector(".todos-list__clear")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", clearCompleted);
    document
        .querySelector("header button")
        .addEventListener("click", themeToggle);
    window.addEventListener("resize", filterCheck);
};
const init = () => {
    detectUserPreferedTheme();
    addEventListeners();
};
init();
