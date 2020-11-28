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
    expensesMonth: 0,
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
        for (let i = 0; i < 2; i++) {
            let exp;
            appData.expenses[prompt('Введите обязательную статью расходов', '')] = +start(exp, 'Во сколько это обойдется');
		}
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.expensesMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) return 'У Вас высокий уровень дохода!';
        else if ( (appData.budgetDay >= 600) && (appData.budgetDay < 1200) ) return 'У вас средний уровень дохода.';
        else if ( (appData.budgetDay >= 0) && (appData.budgetDay < 600) ) return 'К сожалению у вас уровень дохода ниже среднего';
        else return 'Что-то пошло не так';
    },
};

appData.asking();
appData.getBudget();
appData.getExpensesMonth();

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key, appData[key]);
}

console.log('Расходы за месяц: ', appData.expensesMonth);
if (appData.getTargetMonth() >= 0)
    console.log('Вы достигните цель за ' + appData.getTargetMonth() + ' месяцев');
else 
    console.log('Цель не будет достигнута'); 
console.log(appData.getStatusIncome());
