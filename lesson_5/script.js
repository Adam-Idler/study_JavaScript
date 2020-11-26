'use strict';

let isNumber = function(n)  {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, 
income = 'Подработка курьером',
addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', ''),
deposit = confirm('Есть ли у Вас депозит в банке?', ''), 
mission = 100000,
budgetDay;

let start = function(data, question) {
	do {
		data = prompt(question);
	} while (!isNumber(data));
	return data;
};

money = +start(money, 'Ваш месячный доход?');

let expenses = [];

const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', '');
				sum += +start(sum, 'Во сколько это обойдется?');
		}
    return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

const showTypeOf = function(data) {
    console.log(data, typeof data);
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};

budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = function() {
  	if (budgetDay >= 1200) return 'У Вас высокий уровень дохода!';
    else if ( (budgetDay >= 600) && (budgetDay < 1200) ) return 'У вас средний уровень дохода.';
    else if ( (budgetDay >= 0) && (budgetDay < 600) ) return 'К сожалению у вас уровень дохода ниже среднего';
    else return 'Что-то пошло не так';
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц: ', expensesAmount);
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
if (getTargetMonth() >= 0)
console.log('Вы достигните цель за ' + getTargetMonth() + ' месяцев');
else console.log('Цель не будет достигнута');
console.log('Бюджет на день: ', budgetDay); 
console.log(getStatusIncome());
