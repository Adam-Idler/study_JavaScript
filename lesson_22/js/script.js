'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted, todoContainer) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoContainer = document.querySelector(todoContainer);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }
  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }
  render() {
    this.todoList.textContent  = '';
    this.todoCompleted.textContent  = '';
    this.input.value = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }
  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key; 
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }
  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else alert('Нельзя добавить пустое дело');
  }
  deleteItem(key) {
    for (let [keyToDo, value] of this.todoData) {
      if (keyToDo  === key) {
        this.todoData.delete(keyToDo);
        this.render();
      }
    }
  }
  completedItem(key) {
    for (let [keyToDo, value] of this.todoData) {
      if (keyToDo  === key) {
        if (value.completed === false)
          value.completed = true;
        else if (value.completed === true)
        value.completed = false;
        this.render();
      }
    }
  }
  handler() {
    this.todoContainer.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      let keyOfTarget = target.parentNode.parentNode.key;
      if (target.matches('.todo-remove')) this.deleteItem(keyOfTarget);
      else if(target.matches('.todo-complete')) this.completedItem(keyOfTarget);
    });
  }
  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  init() { 
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.handler();
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();