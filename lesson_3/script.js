'use strict';

let money, income, addExpenses, deposit, mission, 
period, budgetMounth, achievingGoal, budgetDay,
expenses1, expenses2, amount1, amount2, result;

money = 45000;
income = 'Подработка курьером';
addExpenses = 'Еда, Бензин, Интернет';
addExpenses = addExpenses.toLowerCase();
deposit = true;
period = 6;
mission = 100000;

money = +prompt('Ваш месячный доход?', '');
addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', '');
deposit = confirm('Есть ли у Вас депозит в банке?', '');
expenses1 = prompt('Введите обязательную статью расходов', '');
amount1 = +prompt('Во сколько это обойдется?', '');
expenses2 = prompt('Введите обязательную статью расходов', '');
amount2 = +prompt('Во сколько это обойдется?', '');

budgetMounth  = money - amount1 - amount2;
budgetDay = Math.floor(budgetMounth / 30);
achievingGoal = Math.ceil(mission / budgetMounth);

if (budgetDay >= 1200) result = 'У Вас высокий уровень дохода!';
else if ( (budgetDay >= 600) && (budgetDay < 1200) ) result = 'У вас средний уровень дохода.';
else if ( (budgetDay >= 0) && (budgetDay < 600) ) result = 'К сожалению у вас уровень дохода ниже среднего';
else result = 'Что-то пошло не так';

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.split(', '));
console.log(addExpenses.length);

console.log('Бюджет на месяц: ', budgetMounth);
console.log('Цель будет достигнута за ' + achievingGoal + ' месяцев');
console.log('Бюджет на день: ', budgetDay); 
console.log(result);
