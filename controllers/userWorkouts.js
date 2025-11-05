import userWorkoutsService from "../services/userWorkoutsService.js";

// get workouts for a specific user
export async function getUserWorkouts(req, res) {
  try {
    const { userId } = req.params;
    const workouts = await userWorkoutsService.getWorkoutsByUserId(userId);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// add a workout to a user
export async function addWorkoutToUser(req, res) {
  try {
    const { userId, workout } = req.body;
    const newWorkout = await userWorkoutsService.addWorkoutToUser(
      userId,
      workout
    );
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// mark a workout as completed
export async function markWorkoutCompleted(req, res) {
  try {
    const { userId, exerciseId } = req.body;
    const updatedWorkout = await userWorkoutsService.markWorkoutCompleted(
      userId,
      exerciseId
    );
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { getUserWorkouts, addWorkoutToUser, markWorkoutCompleted };
