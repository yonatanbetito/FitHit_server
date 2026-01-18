import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const exercisesPath = path.resolve(
  process.env.EXERCISES_FILE_PATH || "data/exercises.json"
);

//get all from json file
async function getAllExercises() {
  try {
    const data = await fs.readFile(exercisesPath, "utf8");
    const exercises = JSON.parse(data);

    return exercises;
  } catch (error) {
    console.error("error fetching exercises:", error);
    throw error;
  }
}

//by category
async function getExercisesByCategory(category) {
  try {
    const exercises = await getAllExercises();
    const categoryLower = category.toLowerCase();
    const filteredExercises = exercises.filter(
      (exercise) => exercise.category.toLowerCase() === categoryLower
    );
    return filteredExercises;
  } catch (error) {
    console.error("error fetching exercises by category:", error);
    throw error;
  }
}

export default {
  getAllExercises,
  getExercisesByCategory,
};
