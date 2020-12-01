'use strict';

let isNumber = function(n)  {
	return !isNaN(parseFloat(n)) && isFinite(n);
},

    isString = function(s) {
    return !isNumber(s);
},

    capitalize = function(str) {
        let x = "";
        for (let i = 0; i < str.length; i++) {
            if (str[i - 1] === " " || i === 0) {
                x += str[i].toUpperCase();
            } else {
                x += str[i].toLowerCase();
            }
        }
        return x;
};

let money,
    start = function(data, question) {
        do {
            data = prompt(question);
        } while (!isNumber(data));
        return data;
    },
    checkingString = function(data, question) {
        do {
            data = prompt(question);
        } while (!isString(data));
        return data;
    };

//money = +start(money, 'Ваш месячный доход?');

let calculate = document.getElementById('start'),
    addExpensesPlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),

    resultBudgetMonth = document.getElementsByClassName('budget_month-value'),
    resultBudgeDay = document.getElementsByClassName('budget_day-value'),
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value'),
    resultAdditionalIncome = document.getElementsByClassName('additional_income-value'),
    resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value'),
    resultIncomePeriod = document.getElementsByClassName('income_period-value'),
    resultTargetMonth = document.getElementsByClassName('target_month-value'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('input.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('input.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник дохода?')) {
            let itemIncome, cashIncome;
            itemIncome = checkingString(itemIncome, 'Какой у вас дополнительный заработок?');
            cashIncome = start(cashIncome, 'Сколько в месяц вы зарабатываете на этом?');
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассматриваемый период через запятую', '');
        appData.addExpenses = capitalize(addExpenses).split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let exp;
            appData.expenses[checkingString(appData.expenses, 'Введите обязательную статью расходов')] = +start(exp, 'Во сколько это обойдется');
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
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = +start(appData.percentDeposit, 'Какой годовой процент?');
            appData.moneyDeposit = +start(appData.moneyDeposit, 'Какая сумма заложена?');
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

//appData.asking();
//appData.getBudget();
//appData.getExpensesMonth();
//appData.getInfoDeposit();


// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log(key, appData[key]);
// }

// console.log('Расходы за месяц: ', appData.expensesMonth);
// if (appData.getTargetMonth() >= 0)
//     console.log('Вы достигните цель за ' + appData.getTargetMonth() + ' месяцев');
// else 
//     console.log('Цель не будет достигнута'); 
// console.log(appData.getStatusIncome());
// console.log('Возможные расходы: ', appData.addExpenses.join(', '));
