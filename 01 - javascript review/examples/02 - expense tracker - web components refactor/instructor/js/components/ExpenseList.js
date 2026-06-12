// ExpenseList renders a grid of <expense-card> elements plus a running total.
// It expects one property (not attribute) to be set by main.js:
//   list.expenses = [ ...arrayOfExpenseObjects ]

import './ExpenseCard.js';

class ExpenseList extends HTMLElement {
  #expenses = []; 
  // store the array of expenses as a private field
  // this way, only functions within ExpenseList can alter its contents

  // private fields need getters and setters (read/write methods)
  get expenses() {
    return this.#expenses;
  }

  set expenses(data) {
    this.#expenses = data;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  // we can calculate the total pretty neatly here
  #getTotal() {
    return this.#expenses
      .reduce((sum, expense) => sum + expense.amount, 0)
      .toFixed(2);
  }

  render() {
    const total = this.#getTotal();

    // build the entire grid of cards as an array of HTML strings and join it into one big string
    // this way, we only hit the DOM (and re-render it) once
    const cards = this.#expenses.map((expense) => `
      <expense-card
        expense-id="${expense.id}"
        title="${expense.title}"
        amount="${expense.amount}"
        date="${expense.date}"
        category="${expense.category}"
      ></expense-card>
    `).join('');

    this.innerHTML = `
      <div class="expense-list">
        <h2>Expenses (Total: <span id="total-expenses">${total}</span> $)</h2>
        <div class="expense-container">
          ${cards}
        </div>
      </div>
    `;
  }
}

customElements.define('expense-list', ExpenseList);
