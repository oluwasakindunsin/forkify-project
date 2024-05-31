import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import paginationView from './views/pagination.js';

import 'core-js/stable'; //prolyfilling everything 
import 'regenerator-runtime/runtime'; // prolyfilling asyn await

if(module. hot){
  module.hot.accept();
}

/**
 * 
 * @returns 
 */

const controlRecipes = async  function (){
  
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    
    if(!id) return; //guard clause
    recipeView.renderSpinner();

    // update result view to mark selected page
    recipeView.update(model.getSearchResultPage())
    bookmarkView.update(model.state.bookmarks);
    
    //loading recipe Api
    await model.loadRecipe(id);
    
    // rendering recipe api
    recipeView.render(model.state.recipe) 
   
  }catch(err){
    // recipeView.renderError(`${err} 💥💥💥`);
    // console.error(err);
    debugger;
    
  }
};

const controlSearchResult = async function(){
  try{

    resultView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if(!query) return;
    // load search result
    await model.loadSearchResult(query);
    //render result
   
    // resultView.render(model.state.search.result); ALL THE RESULTS
    resultView.render(model.getSearchResultPage(4));

    //Render initial pagination
    paginationView.render(model.state.search)




  }catch(err){
    console.log(err)
  }
}

const controlServings = function(newServings){
  // update servings in state
  model.updateServings(newServings)

  // update recipe view
  // recipeView.render(model.state.recipe) 
  recipeView.update(model.state.recipe) 
}

const controlAddBookmark = function(){
  //add or remove bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

    //update recipe view
  recipeView.update(model.state.recipe)

  // render bookmark
  bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe = function(newRecipe){
  


//upload recipe 
model.uploadRecipe(newRecipe);
}

const init = function(){ 
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHanderUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult);
  addRecipeView.addHandlerUpload(controlAddRecipe)

};
init()