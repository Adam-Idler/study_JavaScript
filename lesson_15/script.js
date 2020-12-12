'use strict';
document.addEventListener('DOMContentLoaded', () => {
    let inputText = document.querySelectorAll('.data input[type="text"]'),
        inputs = document.querySelectorAll('input[type="text"]'),
        placeholderName = document.querySelectorAll('input[placeholder="Наименование"]'),
        placeholderSum = document.querySelectorAll('input[placeholder = "Сумма"]'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItems = document.querySelectorAll('.income-items');

    const start = document.getElementById('start'),
        cancel = document.getElementById('cancel'),
        incomePlus = document.getElementsByTagName('button')[0],
        expensesPlus = document.getElementsByTagName('button')[1],
        btnPlus = document.querySelectorAll('.btn_plus'),
        additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
        resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0],
        resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
        resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
        resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
        resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
        resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
        resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
        salaryAmount = document.querySelector('.salary-amount'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent'),
        depositCheck = document.querySelector('#deposit-check'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');

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
            if (salaryAmount.value) {
                this.getExpInc();
                this.getExpensesMonth();
                this.getIncomeMonth();
                this.getBudget();
                this.getAddExpInc();
                this.showResult();
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
        addExpIncBlock() {
            btnPlus.forEach((item) => {
                item.addEventListener('click', () => {
                    const itemButton = item.className.split(' ')[1],
                        itemStr = itemButton.split('_')[0],
                        itemPlus = document.querySelector(`.${itemButton}`),
                        allItems = document.querySelectorAll(`.${itemStr}-items`);
                    let cloneItem = document.querySelectorAll(`.${itemStr}-items`)[0].cloneNode(true);
                    cloneItem.childNodes[1].value = ''; 
                    cloneItem.childNodes[3].value = '';
                    item.parentNode.insertBefore(cloneItem, itemPlus);
                    this.addEventListenerPlaceholder();
                    if (allItems.length === 2) itemPlus.style.display = 'none';
                    
                    incomeItems = document.querySelectorAll('.income-items');
                    expensesItems = document.querySelectorAll('.expenses-items');
                    });
            });
        }
        getExpInc() {
            const count = item => {
                const startStr = item.className.split('-')[0],
                    itemTitle = item.querySelector(`.${startStr}-title`).value,
                    itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== '') {      
                    this[startStr][itemTitle] = itemAmount;
                }
            };
            incomeItems.forEach(count);
            expensesItems.forEach(count);
            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
            for (const key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getAddExpInc() {
            let i = 0;
            const addItem = item => {
                const itemName = item.className.split('_')[1].split('-')[0];
                if (itemName === 'income') {
                    let addIncome = additionalIncomeItem[i].value.split(',');
                    i++;
                    addIncome.forEach((item) => {
                        item = item.trim();
                        if (item !== '') {
                        this.addIncome.push(item);
                        }
                    });
                } else {
                    let addExpenses = additionalExpensesItem.value.split(',');
                    addExpenses.forEach((item) => {
                        item = item.trim();
                        if (item !== '') {
                        this.addExpenses.push(item);
                        }
                    });
                }
            };
            additionalIncomeItem.forEach(addItem);
            addItem(additionalExpensesItem);
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
            periodSelect.addEventListener('mousemove', this.changeRangeValue);
            periodSelect.addEventListener('mousemove', () => { 
                if (salaryAmount.value) resultIncomePeriod.value = this.calcSavedMoney(); 
            });
            this.addExpIncBlock();
            this.addEventListenerPlaceholder();
        }
    }

    const appData = new AppData();
    
    appData.eventListeners();
});