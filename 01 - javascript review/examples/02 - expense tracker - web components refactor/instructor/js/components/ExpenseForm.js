class ExpenseForm extends HTMLElement {
    /* What do we need in here?
    - render - a method to render the HTML
    - connectedCallback - what should happen when the element loads into the DOM (initialisation)
    - form-specific logic
    */

    connectedCallback() {
        this.render(); // render it first, so the selectors actually have HTML to read from
        this.form = this.querySelector('form');
        this.submitButton = this.querySelector('#submitter');
        this.form.addEventListener('submit', this.handleSubmit)
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const fields = this.readFormData();

      if (!this.validateFormData(fields)) {
        alert("Please fill in all fields correctly.");
        return;
      }

      // we don't have access to expenses anymore, so we'll need to figure something out
      // for how to push the form inputs back to main.js, where one central instance of the expenses
      // can be modified by this form.
      // (TBD)

      this.reset();      
    }

    reset() {
        this.form.reset();
        this.submitButton.innerText = "Add Expense";
    }

    readFormData() {
      return {
        id:       parseInt(this.querySelector('#expense-id').value),
        title:    this.querySelector("#title").value,
        category: this.querySelector("#category").value,
        date:     this.querySelector("#date").value,
        amount:   parseFloat(this.querySelector("#amount").value),
      };
    }

    populateForm(expense) {
      this.querySelector("#title").value      = expense.title;
      this.querySelector("#amount").value     = expense.amount;
      this.querySelector("#date").value       = expense.date;
      this.querySelector("#category").value   = expense.category;
      this.querySelector("#expense-id").value = expense.id;

      this.submitButton.innerText = "Save";
    }

    validateFormData ({ title, category, date, amount }) {
      return title && category && date && !isNaN(amount);
    }

    render() {
        this.innerHTML = `
        <div class="form-container">
          <h2>Add Expense</h2>
          <form id="expense-form-add">
            <input type="text" id="title" placeholder="Title" required />
            <input
              type="text"
              pattern="^\d*(\.\d{0,2})?$"
              id="amount"
              placeholder="Amount"
              required
            />
            <input type="date" id="date" placeholder="Date" required />
            <select id="category" required>
              <option value="" disabled selected>Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Education">Education</option>
              <option value="Bills">Bills</option>
              <option value="Clothing">Clothing</option>
              <option value="Hobbies">Hobbies</option>
              <option value="Travel">Travel</option>
              <option value="Groceries">Groceries</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
            <input type="hidden" id="expense-id" value="0" />
            <button type="submit" id="submitter">Add Expense</button>
          </form>
        </div>
        `
    }
}

customElements.define('expense-form', ExpenseForm) // ('html-name', ClassName)