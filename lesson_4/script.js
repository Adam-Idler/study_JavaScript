'use strict';

let money,
income = 'Подработка курьером',
addExpenses,
deposit,
mission,
expenses1, 
expenses2, 
amount1, 
amount2,
budgetDay;

money = +prompt('Ваш месячный доход?', '');
addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', '');
mission = +prompt('Сколько собираетесь накопить?', '');
deposit = confirm('Есть ли у Вас депозит в банке?', '');
expenses1 = prompt('Введите обязательную статью расходов', '');
amount1 = +prompt('Во сколько это обойдется?', '');
expenses2 = prompt('Введите обязательную статью расходов', '');
amount2 = +prompt('Во сколько это обойдется?', '');

const showTypeOf = function(data) {
    console.log(data, typeof data)
};

const getExpensesMonth = function() {
    let expenses = 0;
    for (let i = 0; i < arguments.length; i++) expenses += arguments[i];
    return expenses;
};

const getAccumulatedMonth = function(income, expenses) {
    return income - expenses;
};

const getTargetMonth = function(mission, budgetMounth) {
    return Math.ceil(mission / budgetMounth)
};

const getStatusIncome = function() {
    if (budgetDay >= 1200) return 'У Вас высокий уровень дохода!';
    else if ( (budgetDay >= 600) && (budgetDay < 1200) ) return'У вас средний уровень дохода.';
    else if ( (budgetDay >= 0) && (budgetDay < 600) ) return 'К сожалению у вас уровень дохода ниже среднего';
    else return 'Что-то пошло не так';
};

let accumulatedMounth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

budgetDay = Math.floor(accumulatedMounth / 30);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2));
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMounth) + ' месяцев');
console.log('Бюджет на день: ', budgetDay); 
console.log(getStatusIncome());
