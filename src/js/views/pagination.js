import icon from 'url:../../img/icons.svg';
import View from './view.js'

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkUp(){
        const currentPage = this._data.page;
        const numpages = Math.ceil(this._data.result.length / this._data.resultPerPage);
        console.log(numpages);

        //page 1 , and there other pages
        if(currentPage  === 1 && numpages > 1) {
             return `
             <button class="btn--inline pagination__btn--next">
             <span>Page ${currentPage + 1 }</span>
             <svg class="search__icon">
               <use href="${icon}#icon-arrow-right"></use>
             </svg>
             `
        } 

        
        // last page
        if(currentPage === numpages){
            return ` 
            <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1 }</span>
            </button> 
          `;
        }
        // otherpage 
        if(currentPage  < numpages){
            return ` 
            <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
              </svg>
              <span>Page ${currentPage - 1 }</span>
              </button> 
              
              <button class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1 }</span>
              <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
              </svg>
              `;
              
            }
          //page 1 , and no other pages
          return '';
   }
}

export default new paginationView();