import icon from 'url:../../img/icons.svg';

export default class View {
    _data;

    /**
     * render the received object to dom
     * @param {object | object[]} data  the data to be reneder e.g(recipe)
     * @param {boolean} [render = true] if flase create markup strings
     * @returns {undefined | string} a markup string is returned if render= false
     * @this {object} view instances
     * @author Oluwadunsin oluwasakin
     * @todo wrap up implementation
     */
   
    render(data, render = true){

        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkUp();
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    } 

    update(data){
        this._data = data;
        const newMarkup = this._generateMarkUp();

        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElement = Array.from(newDom.querySelectorAll('*'));
        const curElement = Array.from(this._parentElement.querySelectorAll('*'));
        console.log(newElement);
        console.log(curElement);

        newElement.forEach((newEl, i) => {
            const curEL = curElement[i];
            console.log( curEL , newEl.isEqualNode(curEL));

                //update changed text
            if(!newEl.isEqualNode(curEL) && newEl.firstChild ?.nodeValue.trim() !== ''){
                curEL.textContent = newEl.textContent;
            }

                //update attribute
            if(!newEl.isEqualNode(curEL)) {
                Array.from(newEl.attributes).forEach(attr => 
                    curEL.setAttribute(attr.name, attr.value)
                );
            }
        })

    

    }
    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner () {
      const markup = `
      <div class="spinner">
      <svg>
        <use href="${icon}#icon-loader"></use>
      </svg>
    </div> 
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }

    renderError(message = this._errorMessage){
      const markup = `
      <div class="error">
            <div>
              <svg>
                <use href=" ${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._succesMessage){
      const markup = `
      <div class="error">
            <div>
              <svg>
                <use href=" ${icon}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

}