'use strict';
let isNumber = function(n)  {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(data, question) {
        do {
            data = prompt(question);
        } while (!isNumber(data));
        return data;
    };

money = +start(money, 'Ваш месячный доход?');

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    ExpensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', '');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов', '')] = +start(sum, 'Во сколько это обойдется?');
            console.log(i);
		}
        //return sum;
    },
};

appData.asking();

let expenses = [];

appData.getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', '');
				sum += +start(sum, 'Во сколько это обойдется?');
		}
    return sum;
}

let expensesAmount = appData.getExpensesMonth();

appData.getAccumulatedMonth = function() {
    return money - expensesAmount;
}

let accumulatedMonth = appData.getAccumulatedMonth();

appData.getTargetMonth = function() {
    return Math.ceil(appData.mission / accumulatedMonth);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

appData.getStatusIncome = function() {
    if (budgetDay >= 1200) return 'У Вас высокий уровень дохода!';
    else if ( (budgetDay >= 600) && (budgetDay < 1200) ) return 'У вас средний уровень дохода.';
    else if ( (budgetDay >= 0) && (budgetDay < 600) ) return 'К сожалению у вас уровень дохода ниже среднего';
    else return 'Что-то пошло не так';
}

console.log('Расходы за месяц: ', expensesAmount);
console.log('Возможные расходы: ', );
if (appData.getTargetMonth() >= 0)
    console.log('Вы достигните цель за ' + appData.getTargetMonth() + ' месяцев');
else 
    console.log('Цель не будет достигнута');
console.log('Бюджет на день: ', budgetDay); 
console.log(appData.getStatusIncome());
