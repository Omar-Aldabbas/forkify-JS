import * as modal from './modal.js';
import recipeView from "./views/recipeView.js";

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
console.log('TEST');

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    await modal.loadRecipe(id);
    // const { recipe } = modal.state;
    recipeView.render(modal.state.recipe);
  } catch (error) {
    alert(error);
  }
};

// controlRecipe();
['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
