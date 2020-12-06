'use strict';

let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

    resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
    resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
    resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
    resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
    resultTargetMonth = document.getElementsByClassName('target_month-value')[0],

    placeholderName = document.querySelectorAll('input[placeholder="Наименование"]'),
    placeholderSum = document.querySelectorAll('input[placeholder = "Сумма"]'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('input.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('input.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    cloneExpensesItem = expensesItems[0].cloneNode(true),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    cloneIncomeItem = incomeItems[0].cloneNode(true),

    isNumber = function(n)  {
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
    },

    checkingString = function(data, question) {
        do {
            data = prompt(question);
        } while (!isString(data));
        return data;
    },

    appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    checkSalary: function() {
        if (!salaryAmount.value) {
            start.disabled = 'disabled';
            start.style.cursor = 'not-allowed';
        } else {
            start.style.cursor = 'pointer';
            start.disabled = null;
        }
    },
    changeRangeValue: function() {
        periodAmount.innerText = periodSelect.value;
    },
    showResult: function() {
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = appData.budgetDay;
        resultExpensesMonth.value = appData.expensesMonth;
        resultAdditionalExpenses.value = appData.addExpenses.join(', ');
        resultAdditionalIncome.value = appData.addIncome.join(', ');
        periodSelect.addEventListener('mousemove', appData.showResult);
        resultIncomePeriod.value = appData.calcSavedMoney();
        resultTargetMonth.value = appData.getTargetMonth();
        
    },
    addExpensesBlock: function () {
        let cloneExp = cloneExpensesItem.cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExp, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        appData.addEventListenerPlaceholder();
        if (expensesItems.length === 3) expensesPlus.style.display = 'none';
    },
    addIncomeBlock: function () {
       let cloneInc = cloneIncomeItem.cloneNode(true);
       incomeItems[0].parentNode.insertBefore(cloneInc, incomePlus);
       incomeItems = document.querySelectorAll('.income-items');
       appData.addEventListenerPlaceholder();
       if (incomeItems.length === 3) incomePlus.style.display = 'none';
    },
    getExpenses: function () {
        expensesItems.forEach(function(item) {
            let itemExpenses = expensesTitle.value;
            let cashExpenses = expensesAmount.value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        }); 
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = incomeTitle.value,
                cashIncome  = incomeAmount.value;
                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }
        });

    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        for (let i = 0; i < additionalIncomeItem.length; i++) { 
            let addIncome = additionalIncomeItem[i].value.split(',');
            addIncome.forEach(function(item){
                item = item.trim();
                if (item !== '') {
                    appData.addIncome.push(item);
                }
            });
        }
    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        let targetMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
        if (!isNaN(targetMonth)) return targetMonth;
        return 0;
    },

    // getStatusIncome: function() {
    //     if (appData.budgetDay >= 1200) return 'У Вас высокий уровень дохода!';
    //     else if ( (appData.budgetDay >= 600) && (appData.budgetDay < 1200) ) return 'У вас средний уровень дохода.';
    //     else if ( (appData.budgetDay >= 0) && (appData.budgetDay < 600) ) return 'К сожалению у вас уровень дохода ниже среднего';
    //     else return 'Что-то пошло не так';
    // },
    // getInfoDeposit: function() {
    //     if (appData.deposit) {
    //         appData.percentDeposit = +start(appData.percentDeposit, 'Какой годовой процент?');
    //         appData.moneyDeposit = +start(appData.moneyDeposit, 'Какая сумма заложена?');
    //     }
    // },
    
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    addEventListenerPlaceholder: function() {
        placeholderName = document.querySelectorAll('input[placeholder="Наименование"]');
        for (let i = 0; i < placeholderName.length; i++) {
            let name = placeholderName[i]; 
            name.addEventListener('input', function(){
                name.value = name.value.replace(/[1-9A-Za-z]/, '');
            });
        }
        placeholderSum = document.querySelectorAll('input[placeholder="Сумма"]');
        for (let i = 0; i < placeholderSum.length; i++) {
            let sum = placeholderSum[i];
            sum.addEventListener('input', function(){
                sum.value = sum.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
            });
        }
    },
};

salaryAmount.addEventListener('input', appData.checkSalary);
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('mousemove', appData.changeRangeValue);
appData.addEventListenerPlaceholder();
