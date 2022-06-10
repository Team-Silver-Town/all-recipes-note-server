const Ingredient = require("../models/Ingredient");
const Unit = require("../models/Unit");

exports.handleIngredientsData = async (ingredients, mongoSession) => {
  const ingredientsData = [];

  const addValidIngredients = async (ingredients) => {
    for await (const data of ingredients) {
      const splitData = data.split("-");
      const ingredientName = splitData[0];
      const portion = splitData[1];
      const unitName = splitData[2];

      let ingredient = await Ingredient.findOne({
        name: ingredientName.trim(),
      });
      let unit = await Unit.findOne({ name: unitName.trim() });

      if (!ingredient) {
        ingredient = await Ingredient.create(
          [
            {
              name: ingredientName,
            },
          ],
          { session: mongoSession },
        );
      }

      if (!unit) {
        unit = await Unit.create([{ name: unitName }], {
          session: mongoSession,
        });
      }

      ingredientsData.push(`${ingredientName}-${portion}-${unitName}`);
    }
  };

  await addValidIngredients(ingredients);

  return ingredientsData;
};
