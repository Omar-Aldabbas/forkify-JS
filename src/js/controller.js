import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getsearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
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

    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getsearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getsearchResultsPage(goToPage));
  console.log(model.getsearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  // Update the recipe state
  model.updateServings(updateTo);

  // Update the recipeView
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
