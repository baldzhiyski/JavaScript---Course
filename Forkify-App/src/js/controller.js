import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = recipeView.parentElement;

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipies = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    recipeView.renderSpiner;

    // Loading recipe
    await model.loadRecipe(recipeId);

    // Render the recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipies);
};

init();
