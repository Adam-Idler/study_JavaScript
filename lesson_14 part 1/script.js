'use strict';

let body = document.querySelector('body'),
    newDiv;

function DomElement() {
    this.selector = prompt('Введите . или #') + 'test';
    this.height = 50;
    this.width = 50;
    this.bg = 'red';
    this.fontSize = 50;
}

DomElement.prototype.createBlock = function(text) {
    if (this.selector[0] === '.') {
        newDiv = document.createElement('div');
        newDiv.classList.add(this.selector.slice(1));
        console.log(newDiv);
    } else if (this.selector[0] === '#') {
        newDiv = document.createElement('div');
        newDiv.setAttribute('id', this.selector.slice(1));
        console.log(newDiv);
        
    } else {
        alert('Селектор должен начинаться либо с "." либо с "#"');
    }
    body.appendChild(newDiv);
    newDiv.style.cssText = `height: ${this.height}vh;
                          width: ${this.width}vh;
                          background: ${this.bg};
                          font-size: ${this.fontSize}px;`;
    newDiv.innerHTML = text;
    
};

const newSelector = new DomElement();

newSelector.createBlock('Какой-то блок');
