'use strict';

const wrapper = document.querySelector('.wrapper');

let date = new Date,
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    newYear = new Date('31 dec 2020'),
    arrDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    period = (hours >= 0) ? (hours <= 6) ? 'Мирной ночи' : (hours <= 12) ? 'Добрейшее утречко' : (hours <= 18) ? 'Доброго денечка' : 'Добрейший вечерек' : '';

wrapper.innerHTML = `${period} <br>
                        Сегодня: ${arrDay[date.getDay()]} <br>
                        Текущее время: ${date.toLocaleTimeString('en')} <br>
                        До Нового Года осталось ${Math.ceil((newYear.getTime() - date.getTime()) / 3600000 / 24)} дней`;
