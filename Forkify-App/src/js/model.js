import { async } from "regenerator-runtime";
export let state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

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
