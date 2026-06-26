class ExpenseCard extends HTMLElement {

  static get observedAttributes() { // this tells us which attributes we're monitoring for change
    return ['expense-id', 'title', 'amount', 'date', 'category'];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
    // someElement.isConnected is a built-in way to ensure it's been loaded into the DOM
  }

  #handleClick = (event) => {
    const id = parseInt(this.getAttribute('expense-id'));

    if (event.target.classList.contains('edit-btn')) {
      // somehow send the edit information to the form
    }

    if (event.target.classList.contains('delete-btn')) {
      console.log("ExpenseCard.#handleClick: got a delete click")
      this.dispatchEvent( // fire an event:
        new CustomEvent(  // we can make custom events, not just 'change', 'input', 'submit', 'click', etc.
          "expense-delete", // param1: name of custom event
          {                 // param2: data/metadata for the event (packed inside an object)
            bubbles: true,       // bubbles true/false: event can propagate up through the DOM. if false, can't propagate above this shadow DOM boundary.
            detail:  { id },     // detail: the data/'payload' I'm sending with the event. (kind of like "event.target.value")
          }
        )   
      )
    }
  };

  render() {
    const title    = this.getAttribute('title')      ?? '';  // ternary: "X if X else Y", "value if value else empty string"
    const amount   = this.getAttribute('amount')     ?? '0';
    const date     = this.getAttribute('date')       ?? '';
    const category = this.getAttribute('category')   ?? '';
    const id       = this.getAttribute('expense-id');

    this.className = 'card';
    this.innerHTML = `
      <div class="header">
        <div>
          <div class="title">${title}</div>
          <div class="meta category">${category}</div>
        </div>
        <div class="amount">$${amount}</div>
      </div>
      <div class="meta date">${date}</div>
      <div class="actions">
        <button class="edit-btn"   data-id="${id}">Edit</button>
        <button class="delete-btn" data-id="${id}">Delete</button>
      </div>
    `;
  }
}

customElements.define('expense-card', ExpenseCard);
