// 1. import the data from the file (in lieu of e.g. a database / REST API)
import expenses from './expense-data.js';

// 2. grab relevant DOM elements
const expenseContainer = document.getElementById('expense-container');
const searchBox = document.getElementById('searchbox');
const expenseForm = document.getElementById('expense-form-add');
const submitButton = document.getElementById('submitter');

// FUNCTIONS: HTML rendering --------------------------------------------------
// 3. render out data into a grid of cards
function renderExpenses(expenseData) {
  // last thing: our current rendering actually re-renders the entire container's DOM
  // *for every single expense* in the array! So "just adding 1 expense" to an array of
  // 50 existing expenses would mean 51 re-renders total D:

  // So, we just need to make sure we only replace expenseContainer.innerHTML *once*.
  // If we use .map(), we can do it all in one go:
  expenseContainer.innerHTML = expenseData.map(
    // the map itself builds an *array* of individual HTML snippets per expense, which isn't valid HTML
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
  ).join("") // so we just join every element together into one string :)
  // Note how we no longer had to clear innerHTML first! We're no longer appending to it; we overwrite it completely
}


// FUNCTIONS: expenses array logic -----------------------------------------
// 5 + 7. handle adding, editing, and deleting expenses
function addExpense({title, category, date, amount}) {
  /* Using (expenses.length + 1) for the ID is *super* risky and *will* cause constant bugs,
     because it assumes that the length of the array must determine the highest ID. It doesn't:
       [1, 2, 3, 4, 5]
       --> delete the third expense
       [1, 2, 4, 5]
       --> create a new expense, currently using id = expenses.length + 1
       [1, 2, 4, 5, 5]

     They're completely unrelated!

     Instead: every time we add an expense, just look at the current highest ID and add 1 to it.

     I said you'd rarely use reduce (at least compared to map & filter), but it's perfect here!
     -> refresher:
         map walks through an array, and applies a function to each element, returning a new array.
         filter walks through an array, looks at whether some condition is true (for each element), and returns only those elements.
         reduce walks through an array, carrying a running value from one element to the next, and returns that running value (not an array) at the end.
  */
  const maxId = expenses.reduce(  // so this is: "walk me through the expenses array,"
    (highest, expense) => Math.max(highest, expense.id), // "for my running value & each expense, use whatever's larger as the running value,"
    0  // *start* that running value at 0,
    // and store the final value in 'maxId'.
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
  // Object.assign(target, source) overwrites target object with properties from source
}

function deleteExpense(id) {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index !== -1) expenses.splice(index, 1) 
  // if no index is found, findIndex returns -1
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
    return; // we can use "if-return" rather than "if-else" to immediately exit this block of logic
  }

  if (submitButton.innerText === "Add Expense") {
    addExpense(formFields);
  } else {
    const id = parseInt(document.getElementById("expense-id").value);
    updateExpense(id, formFields);
  }

  // we can re-render/reset at the end here, cleanly,
  // because we only reach this point in the code if the inputs were valid!
  renderExpenses(expenses);
  resetForm();
}

// FUNCTIONS: user input/interaction ------------------------------------------
// 6 + 7. (ha ha) handle searching + edit/delete button clicks
function handleSearch(event) {
  const filteredExpenses = searchExpenses(event.target.value);
  renderExpenses(filteredExpenses);
}

function handleExpenseContainerClick(event) {
  // if there's no ID attribute for the click, this would just be undefined
  const id = parseInt(event.target.dataset.id); // and voila! data-* in the HTML just becomes dataset.* here.

  if (event.target.classList.contains("delete-btn")) {
    deleteExpense(id);
    renderExpenses(expenses);
  } else if (event.target.classList.contains("edit-btn")) {
    const expense = expenses.find((e) => e.id === id);
    if (expense) populateForm(expense);
  }
}


// LISTENERS ------------------------------------------------------------------
expenseForm.addEventListener("submit", handleFormSubmit);
searchBox.addEventListener("input", handleSearch);
expenseContainer.addEventListener("click", handleExpenseContainerClick);

document.addEventListener("DOMContentLoaded", (event) => { 
  renderExpenses(expenses);
});
// wrapping renderExpenses in this listener guarantees that the whole DOM is loaded
// before we start trying to inject into the UI — otherwise, we haven no guarantee of that!
