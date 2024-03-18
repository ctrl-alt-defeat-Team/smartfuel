const calcTotalNutrition = (cart) => {
  let totalNutrition = {
    energy: 0,
    fat: 0,
    carbohydrates: 0,
    sugars: 0,
    fiber: 0,
    proteins: 0,
  };
  cart.forEach((item) => {
    totalNutrition.energy += item.nutriments.energy * item.cartQuantity;
    totalNutrition.fat += item.nutriments.fat * item.cartQuantity;
    totalNutrition.carbohydrates +=
      item.nutriments.carbohydrates * item.cartQuantity;
    totalNutrition.sugars += item.nutriments.sugars * item.cartQuantity;
    totalNutrition.fiber += item.nutriments.fiber * item.cartQuantity;
    totalNutrition.proteins += item.nutriments.proteins * item.cartQuantity;
  });
  return totalNutrition;
};

export default calcTotalNutrition;
