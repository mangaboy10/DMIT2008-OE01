import expenses from './expense-data.js';

const expenseContainer = document.getElementById('expense-container');
const searchBox = document.getElementById('searchbox');
const expenseForm = document.getElementById('expense-form-add');
const submitButton = document.getElementById('submitter');

function renderExpenses(expenseData) {
  expenseContainer.innerHTML = expenseData.map(
    (expense) => `
      <div class="card">
        <div class="header">
          <div>
            <div class="title">${expense.title}</div>
            <div class="meta category">${expense.category}</div>
          </div>
          <div class="amount">$${expense.amount}</div>
        </div>
        <div class="meta date">${expense.date}</div>
        <div class="actions">
          <button class="edit-btn" data-id="${expense.id}">Edit</button>
          <button class="delete-btn" data-id="${expense.id}">Delete</button>
        </div>
      </div>
    `
  ).join("")
}


function addExpense({title, category, date, amount}) {
  const maxId = expenses.reduce(
    (highest, expense) => Math.max(highest, expense.id),
    0
  );

  expenses.push({
    id: maxId + 1,  // tada!
    title,
    category,
    date,
    amount
  });
}

function updateExpense(id, fields) {
  const expense = expenses.find((expense) => expense.id === id);
  if (expense) Object.assign(expense, fields); 
}

function deleteExpense(id) {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index !== -1) expenses.splice(index, 1) 
}

function searchExpenses(query) {
  const q = query.toLowerCase();
  return expenses.filter(
    (expense) => expense.title.toLowerCase().includes(q)
  );
}

// FUNCTIONS: form ------------------------------------------------------------
function readFormData() {
  return {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    amount: parseFloat(document.getElementById("amount").value),
  };
}

function populateForm(expense) {
  document.getElementById("title").value = expense.title;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("date").value = expense.date;
  document.getElementById("category").value = expense.category;
  document.getElementById("expense-id").value = expense.id;

  submitButton.innerText = "Save";
}

function validateFormData ({ title, category, date, amount }) {
  return title && category && date && !isNaN(amount);
}

function resetForm() {
  expenseForm.reset();
  submitButton.innerText = "Add Expense";
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formFields = readFormData();

  if (!validateFormData(formFields)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (submitButton.innerText === "Add Expense") {
    addExpense(formFields);
  } else {
    const id = parseInt(document.getElementById("expense-id").value);
    updateExpense(id, formFields);
  }

  renderExpenses(expenses);
  resetForm();
}

function handleSearch(event) {
  const filteredExpenses = searchExpenses(event.target.value);
  renderExpenses(filteredExpenses);
}

function handleExpenseContainerClick(event) {
  const id = parseInt(event.target.dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    deleteExpense(id);
    renderExpenses(expenses);
  } else if (event.target.classList.contains("edit-btn")) {
    const expense = expenses.find((e) => e.id === id);
    if (expense) populateForm(expense);
  }
}


expenseForm.addEventListener("submit", handleFormSubmit);
searchBox.addEventListener("input", handleSearch);
expenseContainer.addEventListener("click", handleExpenseContainerClick);

document.addEventListener("DOMContentLoaded", (event) => { 
  renderExpenses(expenses);
});

