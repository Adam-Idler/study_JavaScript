'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    inputText = document.querySelectorAll('.data input[type="text"]'),
    inputs = document.querySelectorAll('input[type="text"]'),
    
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
        this.budget = +salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        if (salaryAmount.value) {
            inputText = document.querySelectorAll('.data input[type="text"]');
            inputText.forEach(function(item) {
                item.disabled = true;
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
        }
    },
    reset: function() {
        for (let i = 1; i < expensesItems.length; i++) expensesItems[i].parentNode.removeChild(expensesItems[i]);
        for (let i = 1; i < incomeItems.length; i++) incomeItems[i].parentNode.removeChild(incomeItems[i]);
        expensesPlus.style.display = 'block';
        incomePlus.style.display = 'block';
        inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(function(item) {
            item.disabled = false;
            item.value = '';
        });
        cancel.style.display = 'none';
        start.style.display = 'block';
        
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth =  0;
        appData.expensesMonth = 0;
        appData.income = {};
        appData.incomeMonth = 0;
        appData.addIncome = [];
        appData.expenses = {};
        appData.addExpenses = [];
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
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
        expensesItems.forEach(function() {
            let itemExpenses = expensesTitle.value;
            let cashExpenses = expensesAmount.value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        }); 
    },
    getIncome: function() {
        incomeItems.forEach(function() {
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
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        let targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (!isNaN(targetMonth)) return targetMonth;
        return 0;
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    addEventListenerPlaceholder: function() {
        placeholderName = document.querySelectorAll('input[placeholder="Наименование"]');
        for (let i = 0; i < placeholderName.length; i++) {
            let name = placeholderName[i]; 
            name.addEventListener('input', function(){
                name.value = name.value.replace(/[0-9A-Za-z]/, '');
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

salaryAmount.addEventListener('input',  appData.checkSalary);
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('mousemove', appData.changeRangeValue);
periodSelect.addEventListener('mousemove', function() { 
    if (salaryAmount.value) resultIncomePeriod.value = appData.calcSavedMoney(); 
});
appData.addEventListenerPlaceholder();
