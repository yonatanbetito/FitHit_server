import userWorkoutsService from "../services/userWorkoutsService.js";

// get Workouts for a specific user on a specific date
export async function getUserWorkouts(req, res) {
  try {
    const { userId, date } = req.params;
    const Workouts = await userWorkoutsService.getWorkoutsByUserIdAndDate(
      userId,
      date,
    );
    res.json(Workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// add a workout to a user for a specific date
export async function addWorkoutToUser(req, res) {
  try {
    const { userId, workout, date } = req.body;
    const newWorkout = await userWorkoutsService.addWorkoutToUser(
      userId,
      workout,
      date,
    );
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// mark a workout as completed/not completed for a specific date
export async function markWorkoutCompleted(req, res) {
  try {
    const { userId, exerciseId, date } = req.params;
    const { completed } = req.body;
    const updatedWorkout = await userWorkoutsService.markWorkoutCompleted(
      userId,
      exerciseId,
      completed,
      date,
    );
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a workout from a user for a specific date
export async function deleteWorkoutFromUser(req, res) {
  try {
    const { userId, exerciseId, date } = req.params;
    await userWorkoutsService.deleteWorkoutFromUser(userId, exerciseId, date);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
