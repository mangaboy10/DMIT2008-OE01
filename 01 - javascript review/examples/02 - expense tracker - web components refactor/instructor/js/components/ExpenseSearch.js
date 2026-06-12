class ExpenseSearch extends HTMLElement {
    /* What do we need in here?
       - connectedCallback ('what should happen initially when this element loads into the DOM')
       - render method (renders the HTML, instead of it being in index.html)
    */

    connectedCallback () {
        // this fires when element initially loads into the DOM
        this.render();
        this.querySelector('#searchbox').addEventListener('input', this.handleSearch);
    }

    handleSearch() {
        // we don't know how we're going to handle the search yet, because we need 
        // to figure out how to keep the expense array in main.js (if we import it into
        // every component that needs it, any changes to that array only apply to that file)
    }

    render() {
        // this is a function we'll manually call every time we need to render/re-render
        // when we get to React, most (re-)rendering happens *automatically*
        this.innerHTML = `
        <div class="form-container">
          <input type="search" id="searchbox" placeholder="Search" />
        </div>
        `
    }
}

customElements.define('expense-search', ExpenseSearch)
