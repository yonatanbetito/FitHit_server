import fs from "fs/promises";

const userWorkoutsPath = "data/userWorkouts.json";
// get workouts for a specific user
export async function getWorkoutsByUserId(userId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");

    const userWorkouts = JSON.parse(data);

    //return 2 list done/to do
    return userWorkouts[userId] || { workoutsDone: [], workoutsToDo: [] };
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
      completed: workout.completed || false,
    };

    //if not found creat new one
    if (!userWorkouts[String(userId)]) {
      userWorkouts[String(userId)] = {
        workoutsDone: [],
        workoutsToDo: [],
      };
    }

    //check and add to correct one
    if (newWorkout.completed === true) {
      userWorkouts[String(userId)].workoutsDone.push(newWorkout);
    } else {
      userWorkouts[String(userId)].workoutsToDo.push(newWorkout);
    }

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return newWorkout;
  } catch (error) {
    console.error("Error adding workout to user:", error);
    throw error;
  }
}

// mark a workout completed/not completed
export async function markWorkoutCompleted(userId, exerciseId, completed) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    if (!userWorkouts[String(userId)]) {
      throw new Error("User not found");
    }

    let workout = null;

    //delete from workoutsToDo
    const todoIndex = userWorkouts[String(userId)].workoutsToDo.findIndex(
      (w) => String(w.exerciseId) === String(exerciseId)
    );

    if (todoIndex !== -1) {
      workout = userWorkouts[String(userId)].workoutsToDo.splice(
        todoIndex,
        1
      )[0];
    } else {
      //delete from workoutsDone
      const doneIndex = userWorkouts[String(userId)].workoutsDone.findIndex(
        (w) => String(w.exerciseId) === String(exerciseId)
      );

      if (doneIndex !== -1) {
        workout = userWorkouts[String(userId)].workoutsDone.splice(
          doneIndex,
          1
        )[0];
      }
    }

    if (!workout) {
      throw new Error("Workout not found for this user");
    }

    //update status
    workout.completed = completed;
    if (completed) {
      userWorkouts[String(userId)].workoutsDone.push(workout);
    } else {
      userWorkouts[String(userId)].workoutsToDo.push(workout);
    }

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
    return workout;
  } catch (error) {
    console.error("Error marking workout as completed:", error);
    throw error;
  }
}

// delete a workout from a user
export async function deleteWorkoutFromUser(userId, exerciseId) {
  try {
    const data = await fs.readFile(userWorkoutsPath, "utf8");
    const userWorkouts = JSON.parse(data);

    if (!userWorkouts[String(userId)]) {
      throw new Error("User not found");
    }

    //remove from workoutsToDo
    userWorkouts[String(userId)].workoutsToDo = userWorkouts[
      String(userId)
    ].workoutsToDo.filter(
      (workout) => String(workout.exerciseId) !== String(exerciseId)
    );

    //delete from workoutsDone
    userWorkouts[String(userId)].workoutsDone = userWorkouts[
      String(userId)
    ].workoutsDone.filter(
      (workout) => String(workout.exerciseId) !== String(exerciseId)
    );

    await fs.writeFile(userWorkoutsPath, JSON.stringify(userWorkouts, null, 2));
  } catch (error) {
    console.error("Error deleting workout from user:", error);
    throw error;
  }
}

export default {
  getWorkoutsByUserId,
  addWorkoutToUser,
  markWorkoutCompleted,
  deleteWorkoutFromUser,
};
