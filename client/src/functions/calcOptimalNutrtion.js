const necessaryCalories = (weight, height, man) => {
  if (man === true) {
    return ((66.47 + 13.75 * weight + 5.003 * height) * 1.375).toFixed(0);
  } else if (man === false) {
    return ((655.1 + 9.563 * weight + 1.85 * height) * 1.375).toFixed(0);
  }
};

const necessaryProteins = (weight) => {
  return (weight * 1.3).toFixed(0);
};

const necessaryFats = (weight) => {
  return (weight * 0.5).toFixed(0);
};

const necessaryCarbs = (necessaryCalories) => {
  return (necessaryCalories / 8).toFixed(0);
};

const necessaryNutrition = (weight, height, man) => {
  const calories = necessaryCalories(weight, height, man);
  const proteins = necessaryProteins(weight);
  const fats = necessaryFats(weight);
  const carbs = necessaryCarbs(calories);

  return { calories, proteins, fats, carbs };
};

export default necessaryNutrition;
