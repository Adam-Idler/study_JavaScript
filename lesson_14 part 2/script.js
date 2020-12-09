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
    depositCheck = document.querySelector('#deposit-check'),
    
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
    };

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function() {
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
};
AppData.prototype.reset = function() {
    for (let i = 1; i < expensesItems.length; i++) expensesItems[i].remove();
    for (let i = 1; i < incomeItems.length; i++) incomeItems[i].remove();
    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(function(item) {
        item.disabled = false;
        item.value = '';
    });
    cancel.style.display = 'none';
    start.style.display = 'block';
    depositCheck.checked = false;

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth =  0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
AppData.prototype.checkSalary = function() {
    if (!salaryAmount.value) {
        start.disabled = 'disabled';
        start.style.cursor = 'not-allowed';
    } else {
        start.style.cursor = 'pointer';
        start.disabled = null;
    }
};
AppData.prototype.changeRangeValue = function() {
    periodAmount.innerText = periodSelect.value;
};
AppData.prototype.showResult = function() {
    const _this = this;
    resultBudgetMonth.value = _this.budgetMonth;
    resultBudgetDay.value = _this.budgetDay;
    resultExpensesMonth.value = _this.expensesMonth;
    resultAdditionalExpenses.value = _this.addExpenses.join(', ');
    resultAdditionalIncome.value = _this.addIncome.join(', ');
    
    resultIncomePeriod.value = _this.calcSavedMoney();
    resultTargetMonth.value = _this.getTargetMonth();
};
AppData.prototype.addExpensesBlock = function () {
    const _this = this;
    let cloneExp = cloneExpensesItem.cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExp, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    _this.addEventListenerPlaceholder();
    if (expensesItems.length === 3) expensesPlus.style.display = 'none';
};
AppData.prototype.addIncomeBlock = function () {
   const _this = this;
   let cloneInc = cloneIncomeItem.cloneNode(true);
   incomeItems[0].parentNode.insertBefore(cloneInc, incomePlus);
   incomeItems = document.querySelectorAll('.income-items');
   _this.addEventListenerPlaceholder();
   if (incomeItems.length === 3) incomePlus.style.display = 'none';
};
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function() {
        let itemExpenses = expensesTitle.value;
        let cashExpenses = expensesAmount.value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          _this.expenses[itemExpenses] = cashExpenses;
        }
    }); 
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function() {
        let itemIncome = incomeTitle.value,
            cashIncome  = incomeAmount.value;
            if (itemIncome !== '' && cashIncome !== '') {      
              _this.income[itemIncome] = cashIncome;
            }
    });
};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
          _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    for (let i = 0; i < additionalIncomeItem.length; i++) { 
        let addIncome = additionalIncomeItem[i].value.split(',');
        addIncome.forEach(function(item){
            item = item.trim();
            if (item !== '') {
              _this.addIncome.push(item);
            }
        });
    }
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    let targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    if (!isNaN(targetMonth)) return targetMonth;
    return 0;
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.addEventListenerPlaceholder = function() {
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
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    salaryAmount.addEventListener('input',  _this.checkSalary);
    start.addEventListener('click', _this.start.bind(_this));
    cancel.addEventListener('click', _this.reset.bind(_this));
    expensesPlus.addEventListener('click', _this.addExpensesBlock.bind(_this));
    incomePlus.addEventListener('click', _this.addIncomeBlock.bind(_this));
    periodSelect.addEventListener('mousemove', _this.changeRangeValue);
    periodSelect.addEventListener('mousemove', function() { 
    if (salaryAmount.value) resultIncomePeriod.value = _this.calcSavedMoney(); 
    });
    _this.addEventListenerPlaceholder();
};

const appData = new AppData();

appData.eventListeners();
