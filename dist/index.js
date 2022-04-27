"use strict";
var _a;
const todoArray = [];
const mainInput = document.querySelector("#main-input");
const form = document.querySelector("#main-input-form");
const mainInputHandler = (event) => {
    var _a;
    event.preventDefault();
    (mainInput === null || mainInput === void 0 ? void 0 : mainInput.value)
        ? todoArray.push({
            text: mainInput.value,
            active: true,
        })
        : "";
    form === null || form === void 0 ? void 0 : form.reset();
    (_a = document.querySelector("#remaining-todos")) === null || _a === void 0 ? void 0 : _a.textContent = `${todoArray.length} items left`;
    createTodos(mainInput === null || mainInput === void 0 ? void 0 : mainInput.value);
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", mainInputHandler);
const template = (_a = document
    .querySelector("template")) === null || _a === void 0 ? void 0 : _a.content.cloneNode(true);
const todoLI = template === null || template === void 0 ? void 0 : template.children[0];
const createTodos = (text) => {
    var _a, _b;
    const newLI = todoLI;
    (_a = newLI.querySelector("p")) === null || _a === void 0 ? void 0 : _a.textContent = text;
    (_b = document.querySelector("#todo-list")) === null || _b === void 0 ? void 0 : _b.appendChild(newLI.cloneNode(true));
};
