import userWorkoutsService from "../services/userWorkoutsService.js";

// get Workouts for a specific user
export async function getUserWorkouts(req, res) {
  try {
    const { userId } = req.params;
    const Workouts = await userWorkoutsService.getWorkoutsByUserId(userId);
    res.json(Workouts);
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

// mark a workout as completed/not completed
export async function markWorkoutCompleted(req, res) {
  try {
    const { userId, exerciseId } = req.params;
    const { completed } = req.body;
    const updatedWorkout = await userWorkoutsService.markWorkoutCompleted(
      userId,
      exerciseId,
      completed
    );
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a workout from a user
export async function deleteWorkoutFromUser(req, res) {
  try {
    const { userId, exerciseId } = req.params;
    await userWorkoutsService.deleteWorkoutFromUser(userId, exerciseId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  getUserWorkouts,
  addWorkoutToUser,
  markWorkoutCompleted,
  deleteWorkoutFromUser,
};
