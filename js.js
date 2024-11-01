let currentDayId = ""; 

function addExpense(dayId) {
    currentDayId = dayId; 
    document.getElementById("expenseModal").style.display = "flex"; 
}

document.addEventListener("DOMContentLoaded", loadExpenses);

function closeModal() {
    document.getElementById("expenseModal").style.display = "none";
}
  
function submitExpense() {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    addExpenseToList(description, amount);
    saveExpenseToLocalStorage(description, amount, currentDayId);
}
  
function addExpenseToList(description, amount, currDay=currentDayId) {
    if (description && amount) {
        const expenseList = document.querySelector(`#${currDay} .expenses-list`);
        const listItem = document.createElement("li");
        const des = document.createElement("span");
        const money = document.createElement("span");
        des.textContent = description;
        money.textContent = `${amount}$`;

        listItem.appendChild(des);
        listItem.appendChild(money);
        expenseList.appendChild(listItem);
        getTotal(currDay);
        
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        closeModal(); 
    } 
    else {
      alert("Please enter both description and amount.");
    }
}

function getTotal(currDay=currentDayId) {
    let total = document.getElementById("total");
    let values = JSON.parse(localStorage.getItem(`${currDay}Amount`)) || [];
    let sum = 0;
    values.forEach(num => {
        sum += Number(num);
    });
    let totalSum = document.getElementById("totalSum");
    totalSum.textContent = `${sum}`;
}

function saveExpenseToLocalStorage(description, amount, currentDayId) {
    let dayDescription = JSON.parse(localStorage.getItem(`${currentDayId}Description`)) || [];
    let dayAmount = JSON.parse(localStorage.getItem(`${currentDayId}Amount`)) || [];
    dayDescription.push(description);
    dayAmount.push(amount);
    localStorage.setItem(`${currentDayId}Description`, JSON.stringify(dayDescription));
    localStorage.setItem(`${currentDayId}Amount`, JSON.stringify(dayAmount));
}

function loadExpenses() {
    days = ["saturday", "sunday", 'monday', "tuesday", "wednesday", "thursday", "friday"];
    days.forEach(day => {
        let dayDescription = JSON.parse(localStorage.getItem(`${day}Description`)) || [];
        let dayAmount = JSON.parse(localStorage.getItem(`${day}Amount`)) || [];   
        for (let i = 0; i < dayAmount.length; i++) {
            addExpenseToList(dayDescription[i], dayAmount[i], day);
        }
    });
}

function reset() {
    localStorage.clear();
    location.reload();
}