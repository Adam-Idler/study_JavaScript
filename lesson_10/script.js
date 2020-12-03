'use strict';

let add = document.querySelector('.adv'),
    body = document.querySelector('body'),
    books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    elementsSecond = book[0].querySelectorAll('li'),
    elementsFive = book[5].querySelectorAll('li'),
    elemSix = book[2].querySelectorAll('li'),
    newChapter = document.createElement('li');

books.prepend(book[1]);
book[2].before(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

body.style.backgroundImage = "url(./image/fon.jpg)";
book[4].querySelector('a').innerText = 'Книга 3. this и Прототипы Объектов';
add.remove();

elementsSecond[3].after(elementsSecond[6]);
elementsSecond[6].after(elementsSecond[8]);
elementsSecond[9].after(elementsSecond[2]);

elementsFive[1].after(elementsFive[9]);
elementsFive[4].after(elementsFive[2]);
elementsFive[7].after(elementsFive[5]);

newChapter.innerHTML = 'Глава 8: За пределами ES6';
elemSix[8].after(newChapter);
