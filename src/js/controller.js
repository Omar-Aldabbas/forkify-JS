import * as modal from './modal.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';


if(module.hot) {
  module.hot.accept();
}


const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    await modal.loadRecipe(id);
    // const { recipe } = modal.state;
    recipeView.render(modal.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    const query = searchView.getQuery();
    if (!query) return;

    await modal.loadSearchResults(query);
    // console.log(modal.state.search.results);
    resultsView.render(modal.state.search.results)
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
