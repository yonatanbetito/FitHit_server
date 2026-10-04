import fs from "fs/promises";

const userWorkoutsPath = "data/userWorkouts.json";

// get Workouts for a specific user on a specific date
async function getWorkoutsByUserIdAndDate(userId, date) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");

    const userWorkouts = JSON.parse(data);

    // return workouts for the specific date, or empty arrays if date doesn't exist
    if (userWorkouts[String(userId)] && userWorkouts[String(userId)][date]) {
      return userWorkouts[String(userId)][date];
    }
    return { workoutsDone: [], workoutsToDo: [] };
  } catch (error) {
    console.error("Error fetching user Workouts:", error);
    throw error;
  }
}

// backward compatibility - get all workouts for a user (for migration)
async function getWorkoutsByUserId(userId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    return userWorkouts[String(userId)] || {};
  } catch (error) {
    console.error("Error fetching user Workouts:", error);
    throw error;
  }
}

// add a workout to a user for a specific date
async function addWorkoutToUser(userId, workout, date) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    const newWorkout = {
      exerciseId: workout.id,
      title: workout.title,
      category: workout.category,
      description: workout.description,
      media: workout.media,
      completed: workout.completed || false,
    };

    // if user not found, create new one
    if (!userWorkouts[String(userId)]) {
      userWorkouts[String(userId)] = {};
    }

    // if date doesn't exist for this user, create it
    if (!userWorkouts[String(userId)][date]) {
      userWorkouts[String(userId)][date] = {
        workoutsDone: [],
        workoutsToDo: [],
      };
    }

    // add to correct list based on completion status
    if (newWorkout.completed === true) {
      userWorkouts[String(userId)][date].workoutsDone.push(newWorkout);
    } else {
      userWorkouts[String(userId)][date].workoutsToDo.push(newWorkout);
    }

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return newWorkout;
  } catch (error) {
    console.error("Error adding workout to user:", error);
    throw error;
  }
}

// mark a workout completed/not completed for a specific date
async function markWorkoutCompleted(userId, exerciseId, completed, date) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    if (!userWorkouts[String(userId)]) {
      throw new Error("User not found");
    }

    if (!userWorkouts[String(userId)][date]) {
      throw new Error("No workouts for this date");
    }

    let workout = null;

    // delete from workoutsToDo
    const todoIndex = userWorkouts[String(userId)][date].workoutsToDo.findIndex(
      (workout) => String(workout.exerciseId) === String(exerciseId),
    );

    if (todoIndex !== -1) {
      workout = userWorkouts[String(userId)][date].workoutsToDo.splice(
        todoIndex,
        1,
      )[0];
    } else {
      // delete from workoutsDone
      const doneIndex = userWorkouts[String(userId)][
        date
      ].workoutsDone.findIndex(
        (workout) => String(workout.exerciseId) === String(exerciseId),
      );

      if (doneIndex !== -1) {
        workout = userWorkouts[String(userId)][date].workoutsDone.splice(
          doneIndex,
          1,
        )[0];
      }
    }

    if (!workout) {
      throw new Error("Workout not found for this user on this date");
    }

    // update status
    workout.completed = completed;
    if (completed) {
      userWorkouts[String(userId)][date].workoutsDone.push(workout);
    } else {
      userWorkouts[String(userId)][date].workoutsToDo.push(workout);
    }

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return workout;
  } catch (error) {
    console.error("Error marking workout as completed:", error);
    throw error;
  }
}

// delete a workout from a user for a specific date
async function deleteWorkoutFromUser(userId, exerciseId, date) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    if (!userWorkouts[String(userId)]) {
      throw new Error("User not found");
    }

    if (!userWorkouts[String(userId)][date]) {
      throw new Error("No workouts for this date");
    }

    // check if done or toDo list and delete
    const inDone = userWorkouts[String(userId)][date].workoutsDone.some(
      (workout) => String(workout.exerciseId) === String(exerciseId),
    );
    if (inDone) {
      userWorkouts[String(userId)][date].workoutsDone = userWorkouts[
        String(userId)
      ][date].workoutsDone.filter(
        (workout) => String(workout.exerciseId) !== String(exerciseId),
      );
    } else {
      userWorkouts[String(userId)][date].workoutsToDo = userWorkouts[
        String(userId)
      ][date].workoutsToDo.filter(
        (workout) => String(workout.exerciseId) !== String(exerciseId),
      );
    }

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
  } catch (error) {
    console.error("Error deleting workout from user:", error);
    throw error;
  }
}

export default {
  getWorkoutsByUserId,
  getWorkoutsByUserIdAndDate,
  addWorkoutToUser,
  markWorkoutCompleted,
  deleteWorkoutFromUser,
};
