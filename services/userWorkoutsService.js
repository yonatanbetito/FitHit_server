import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const userWorkoutsPath = path.resolve(
  process.env.USER_WORKOUTS_FILE_PATH || "data/userWorkouts.json"
);

// get workouts for a specific user
export async function getWorkoutsByUserId(userId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    return userWorkouts[userId] || [];
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw error;
  }
}

// add a workout to a user
export async function addWorkoutToUser(userId, workout) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    const newWorkout = {
      id: Date.now().toString(),
      userId,
      ...workout,
      completed: false,
      dateAdded: new Date().toISOString(),
    };

    userWorkouts.push(newWorkout);

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return newWorkout;
  } catch (error) {
    console.error("Error adding workout to user:", error);
    throw error;
  }
}

// mark a workout as completed
export async function markWorkoutCompleted(userId, exerciseId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    const workoutIndex = userWorkouts.findIndex(
      (workout) =>
        workout.userId === userId && workout.exerciseId === exerciseId
    );

    if (workoutIndex === -1) {
      throw new Error("Workout not found for this user");
    }

    userWorkouts[workoutIndex].completed = true;
    userWorkouts[workoutIndex].completedDate = new Date().toISOString();

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return userWorkouts[workoutIndex];
  } catch (error) {
    console.error("Error marking workout as completed:", error);
    throw error;
  }
}

export default {
  getWorkoutsByUserId,
  addWorkoutToUser,
  markWorkoutCompleted,
};
