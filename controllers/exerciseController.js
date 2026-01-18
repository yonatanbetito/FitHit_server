import exerciseService from "../services/exerciseService.js";

// get all exercises
export async function getAllExercises(req, res) {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({
      error: "eror fetching exercises",
      message: error.message,
    });
  }
}

// get exercises by category
export async function getExercisesByCategory(req, res) {
  try {
    const { category } = req.params;
    const exercises = await exerciseService.getExercisesByCategory(category);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({
      error: "error fetching exercises by category",
      message: error.message,
    });
  }
}
