'use strict';

let inputText = document.querySelectorAll('.data input[type="text"]'),
    inputs = document.querySelectorAll('input[type="text"]'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    placeholderName = document.querySelectorAll('input[placeholder="Наименование"]'),
    placeholderSum = document.querySelectorAll('input[placeholder = "Сумма"]');

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeAmount = document.querySelector('input.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('input.expenses-amount'),
    cloneExpensesItem = expensesItems[0].cloneNode(true),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositCheck = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cloneIncomeItem = incomeItems[0].cloneNode(true);

class AppData {
    constructor() {
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
    }
    start() {
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
    }
    resetFunction() {
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
    }
    checkSalary() {
        if (!salaryAmount.value) {
            start.disabled = 'disabled';
            start.style.cursor = 'not-allowed';
        } else {
            start.style.cursor = 'pointer';
            start.disabled = null;
        }
    }
    changeRangeValue() {
        periodAmount.innerText = periodSelect.value;
    }
    showResult() {
        
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = this.budgetDay;
        resultExpensesMonth.value = this.expensesMonth;
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        resultAdditionalIncome.value = this.addIncome.join(', ');
        
        resultIncomePeriod.value = this.calcSavedMoney();
        resultTargetMonth.value = this.getTargetMonth();
    }
    addExpensesBlock() {
        
        let cloneExp = cloneExpensesItem.cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExp, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        this.addEventListenerPlaceholder();
        if (expensesItems.length === 3) expensesPlus.style.display = 'none';
    }
    addIncomeBlock() {
       
       let cloneInc = cloneIncomeItem.cloneNode(true);
       incomeItems[0].parentNode.insertBefore(cloneInc, incomePlus);
       incomeItems = document.querySelectorAll('.income-items');
       this.addEventListenerPlaceholder();
       if (incomeItems.length === 3) incomePlus.style.display = 'none';
    }
    getExpenses() {
        
        expensesItems.forEach(() => {
            let itemExpenses = expensesTitle.value;
            let cashExpenses = expensesAmount.value;
            if (itemExpenses !== '' && cashExpenses !== '') {
              this.expenses[itemExpenses] = cashExpenses;
            }
        }); 
    }
    getIncome() {
        
        incomeItems.forEach(() => {
            let itemIncome = incomeTitle.value,
                cashIncome  = incomeAmount.value;
                if (itemIncome !== '' && cashIncome !== '') {      
                  this.income[itemIncome] = cashIncome;
                }
        });
    }
    getAddExpenses() {
        
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
              this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        
        for (let i = 0; i < additionalIncomeItem.length; i++) { 
            let addIncome = additionalIncomeItem[i].value.split(',');
            addIncome.forEach((item) => {
                item = item.trim();
                if (item !== '') {
                  this.addIncome.push(item);
                }
            });
        }
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        let targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (!isNaN(targetMonth)) return targetMonth;
        return 0;
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    addEventListenerPlaceholder() {
        placeholderName = document.querySelectorAll('input[placeholder="Наименование"]');
        for (let i = 0; i < placeholderName.length; i++) {
            let name = placeholderName[i]; 
            name.addEventListener('input', () => {
                name.value = name.value.replace(/[0-9A-Za-z]/, '');
            });
        }
        placeholderSum = document.querySelectorAll('input[placeholder="Сумма"]');
        for (let i = 0; i < placeholderSum.length; i++) {
            let sum = placeholderSum[i];
            sum.addEventListener('input', () => {
                sum.value = sum.value.replace(/[A-Za-zА-Яа-яЁё]/, '');
            });
        }
    }
    eventListeners() {
        
        salaryAmount.addEventListener('input',  this.checkSalary);
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.resetFunction.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('mousemove', this.changeRangeValue);
        periodSelect.addEventListener('mousemove', () => { 
            if (salaryAmount.value) resultIncomePeriod.value = this.calcSavedMoney(); 
        });
        this.addEventListenerPlaceholder();
    }
}

const appData = new AppData();

appData.eventListeners();
