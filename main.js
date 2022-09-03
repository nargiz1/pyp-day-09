"use strict";

const addBtn = document.getElementById("add-button");
const saveBtn = document.getElementById("save-button");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let current;
addBtn.disabled = true;
saveBtn.disabled = true;

input.addEventListener("keyup", function () {
  if (input.value !== "") {
    if (current == undefined) {
      addBtn.disabled = false;
    } else if (current.firstElementChild.innerText !== input.value) {
      saveBtn.disabled = false;
    }
  }
});

addBtn.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    let todo = {
      id: Math.random().toString(16).slice(2),
      text: input.value,
    };
    createLi(todo.text, todo.id);
  } else {
    alert("Todo cannot be empty!");
  }
});

saveBtn.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    current.firstElementChild.innerText = input.value;
    console.log(current);
    current.lastElementChild.firstElementChild.style.display = "inline-block";
    current.lastElementChild.firstElementChild.nextElementSibling.style.display =
      "none";
    current = undefined;
    resetInput();
  } else {
    alert("cannot be empty");
  }
});

function createLi(text, id) {
  let todoElement = document.createElement("li");
  todoElement.setAttribute("todoId", id);

  let todoText = document.createElement("h2");
  todoText.innerText = text;

  let btnsWrapper = document.createElement("div");
  btnsWrapper.classList.add("btns-wrapper");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("delete-button");

  deleteBtn.addEventListener("click", function () {
    todoList.removeChild(this.parentElement.parentElement);
    if (current == this.parentElement.parentElement) {
      resetInput();
    }
  });

  let updateBtn = document.createElement("button");
  updateBtn.classList.add("delete-button");
  updateBtn.innerHTML = `<i class="bi bi-pen-fill"></i>`;
  updateBtn.addEventListener("click", function () {
    if (current == undefined) {
      current = this.parentElement.parentElement;
      console.log(current);
      addBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
      input.value =
        this.parentElement.parentElement.firstElementChild.innerText;
      this.style.display = "none";
      this.nextElementSibling.style.display = "inline-block";
    } else {
      alert("Update this todo first");
    }
  });

  let cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.style.display = "none";
  cancelBtn.addEventListener("click", function () {
    resetInput();
    cancelBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
  });

  todoElement.append(todoText);
  btnsWrapper.append(updateBtn);
  btnsWrapper.append(cancelBtn);
  btnsWrapper.append(deleteBtn);
  todoElement.append(btnsWrapper);
  todoList.append(todoElement);
  resetInput();
}

function resetInput() {
  input.value = "";
  saveBtn.disabled = true;
  saveBtn.style.display = "none";
  addBtn.style.display = "inline-block";
  addBtn.disabled = true;
  current = undefined;
}
