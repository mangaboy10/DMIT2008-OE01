//Instruction On expense-tracker-code-explained.md
//Instruction On expense-tracker-code-explained.md

import theExpenses from "./expense-data";

// 2. Grab the element DOM elements
const expenseContainer = document.getElementById("expense-container");

const searchItem = document.getElementById('searchbox');
const expenseForm = document.getElementById('expense-form-add'); 

//3. render out data into a grid of cards
function renderExpenses(expenseData){
    console.log(expenseData)
    // clear out existing 

    expenseContainer.innerHTML = "";

    expenseData.forEach(
        // for a given expense,
        (expense) => {
            expenseContainer.innerHTML += `
             <div class="card" id="${expense.id}">
              <div class="header">
                <div>
                  <div class="title">${expense.title}</div>
                  <div class="meta category">${expense.category}</div>
                </div>
                <div class="amount">${expense.amount}</div>
              </div>
              <div class="meta date">${expense.date}</div>
              <div class="actions">
                <button class="edit-btn" id="${expense.id}">Edit</button>
                <button class="delete-btn" id="${expense.id}">Delete</button>
              </div>
            </div>
            `
        }
    )
}

// 4. call the function to actually do the render
renderExpenses(theExpenses);


5. // form submission
function submitExpense() {

}

expenseForm.addEventListener("submit", submitExpense);

