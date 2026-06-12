import expenses from './expense-data.js';

// custom components
import './components/ExpenseSearch.js';
import './components/ExpenseForm.js';
import './components/ExpenseList.js';
// ExpenseCard is only used/imported by ExpenseList, not here

// grab our DOM elements
const form   = document.querySelector('expense-form');
const search = document.querySelector('expense-search');
const list   = document.querySelector('expense-list');

// function addExpense({title, category, date, amount}) {
//   const maxId = expenses.reduce(
//     (highest, expense) => Math.max(highest, expense.id),
//     0
//   );

//   expenses.push({
//     id: maxId + 1,  // tada!
//     title,
//     category,
//     date,
//     amount
//   });
// }

// function updateExpense(id, fields) {
//   const expense = expenses.find((expense) => expense.id === id);
//   if (expense) Object.assign(expense, fields); 
// }

// function searchExpenses(query) {
//   const q = query.toLowerCase();
//   return expenses.filter(
//     (expense) => expense.title.toLowerCase().includes(q)
//   );
// }

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const formFields = readFormData();

//   if (!validateFormData(formFields)) {
//     alert("Please fill in all fields correctly.");
//     return;
//   }
//   // we'll need to include this somehow:
//   // if (submitButton.innerText === "Add Expense") {
//   //   addExpense(formFields);
//   // } else {
//   //   const id = parseInt(document.getElementById("expense-id").value);
//   //   updateExpense(id, formFields);
//   // }

//   // renderExpenses(expenses);
//   resetForm();
// }

// function handleSearch(event) {
//   const filteredExpenses = searchExpenses(event.target.value);
//   renderExpenses(filteredExpenses);
// }

// function handleExpenseContainerClick(event) {
//   const id = parseInt(event.target.dataset.id);

//   if (event.target.classList.contains("delete-btn")) {
//     deleteExpense(id);
//     renderExpenses(expenses);
//   } else if (event.target.classList.contains("edit-btn")) {
//     const expense = expenses.find((e) => e.id === id);
//     if (expense) populateForm(expense);
//   }
// }


// expenseContainer.addEventListener("click", handleExpenseContainerClick);

// here's where I'll listen for the custom events, since it's where my single-source-of-truth expenses array
// lives.
document.addEventListener(
  'expense-delete',
  (event) => {
    const index = expenses.findIndex((expense) => expense.id === event.detail.id);
    if (index !== -1) expenses.splice(index, 1);
    // ^ this is just logic relocated from the deleteExpense helper function.
    // the only thing I need to do is change the data in the expense container.
    list.expenses = [...expenses] 
    // ^ instead of manually triggering a re-render (data change -> rerender is now automatic in ExpenseList),
    //   I need to make the ExpenseList.expenses aware of the new data.
  }
)

document.addEventListener('DOMContentLoaded', () => {
  // list is the ExpenseList object I sniped from the DOM at the start of the page.
  // ExpenseList.expenses is the private field set up in that component to receive an expense array.
  // Because it's a private field, the new data passes through the setter function I wrote to automatically
  // re-render whenever the data gets changed.
  // -> we do [...expenses] to copy the expenses in, rather than pass this array, so we don't risk accidentally mutating it.
  list.expenses = [...expenses];
});
