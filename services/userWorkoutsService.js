import fs from "fs/promises";

const userWorkoutsPath = "data/userWorkouts.json";
;

// get workouts for a specific user
export async function getWorkoutsByUserId(userId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");

    const userWorkouts = JSON.parse(data);
    // console.log("user workouts:", userWorkouts);

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
      exerciseId: workout.id,
      title: workout.title,
      category: workout.category,
      description: workout.description,
      media: workout.media,
      completed: false,
    };
    if (!userWorkouts[String(userId)]) {
      userWorkouts[String(userId)] = [];
    }

    // Add the workout to the user's array
    userWorkouts[String(userId)].push(newWorkout);

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
    // userWorkouts[workoutIndex].completedDate = new Date().toISOString();

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
