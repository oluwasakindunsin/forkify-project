 import { async } from "regenerator-runtime";
 import { API_URL , RESULT_PER_PAGE } from "./config.js";
 import { getJSON } from "./helpers.js";
 
 export const state = {
    recipe : {},
    search : {
        query : '',
        result : [],
        page:  1,
        resultPerPage : RESULT_PER_PAGE,
    },
    bookmarks : [],
};

 export const loadRecipe = async function (id){
    try{
  const data = await getJSON(`${API_URL}${id}`);

  const {recipe} = data.data;

  state.recipe = {
  id : recipe.id,
  title : recipe.title,
  publisher: recipe.publisher,
  sourceUrl : recipe.source_url,
  image : recipe.image_url,
  servings: recipe.servings,
  cookingTime : recipe.cooking_time,
  ingredients : recipe.ingredients
 }

 if(state.bookmarks.some(bookmark => bookmark.id === id))
     state.recipe.bookmarked = true;
    else
    state.recipe.bookmarked = false;

 console.log(recipe);
}catch(err){
    console.error(`${err} 💥💥💥`)
    throw err;
}
}


export const loadSearchResult = async function(query){
    try{
        state.search.query = query;
        const data =  await getJSON(`${API_URL}?search=${query}`);
        console.log(data);
    
        state.search.result = data.data.recipes.map(rec => {
            return {
                id : rec.id,
                title : rec.title,
                publisher: rec.publisher,
                image : rec.image_url,
            }
        })

    }catch(err){
        console.error(`${err} 💥💥💥`)
    throw err;

    }
};

export const getSearchResultPage = function (page = state.search.page){

        state.search.page = page
        const start = ( page - 1) * state.search.resultPerPage; // 0
        const end = page * state.search.resultPerPage ; // 9

        return state.search.result.slice(start,end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing=> {
        ing.quantity = (ing.quantity * newServings)/ state.recipe.servings;
    })


    state.recipe.servings = newServings;
}

const persitsBookmark = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const addBookmarks = function(recipe){
    // add bookmark
    state.bookmarks.push(recipe);

    //mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persitsBookmark()
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1)

    //mark current recipe not bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persitsBookmark()
}

const init = function(){
 const storage  =  localStorage.getItem('bookmarks');
 if(storage) state.bookmarks = JSON.parse('bookmarks');

}
init();

export const uploadRecipe = async function(newRecipe){
    console.log(Object.entries(newRecipe)) 
    // const ingredients = Object.entries(newRecipe).filter(entry )

}