'use strict';

let money, income, addExpenses, deposit, mission, period;

money = 45000;
income = 'Подработка курьером';
addExpenses = 'Еда, Бензин, Интернет';
deposit = true;
mission = 500000;
period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split());

let budgetDay = money / 30;
console.log(budgetDay); 