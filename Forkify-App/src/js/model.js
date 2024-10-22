import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { getJSON } from "./helper.js";
export let state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);

    state.recipe = createRecipeObject(data);
  } catch (e) {
    alert(e);
  }
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
