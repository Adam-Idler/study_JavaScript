'use strict';
// Начало первого задания
let money, income, addExpenses, deposit, mission, period;

money = 45000;
income = 'Подработка курьером';
addExpenses = 'Еда, Бензин, Интернет';
deposit = true;
period = 6;
mission = 100000;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));
// Начало второго задания
money = prompt('Ваш месячный доход?', '');
addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', '');
deposit = confirm('Есть ли у Вас депозит в банке?', '');
let expenses1, expenses2, amount1, amount2;
expenses1 = prompt('Введите обязательную статью расходов', '');
amount1 = prompt('Во сколько это обойдется?', '');
expenses2 = prompt('Введите обязательную статью расходов', '');
amount2 = prompt('Во сколько это обойдется?', '');

let budgetMounth;
budgetMounth  = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMounth);

let achievingGoal = Math.ceil(mission / budgetMounth);
console.log('Цель будет достигнута за ' + achievingGoal + ' месяцев');

let budgetDay = Math.floor(budgetMounth / 30);
console.log('Бюджет на день: ', budgetDay); 

if (budgetDay >= 1200) console.log('У Вас высокий уровень дохода!');
else if ( (budgetDay >= 600) && (budgetDay < 1200) ) console.log('У вас средний уровень дохода.');
else if ( (budgetDay >= 0) && (budgetDay < 600) ) console.log('К сожалению у вас уровень дохода ниже среднего');
else console.log('Что-то пошло не так');
