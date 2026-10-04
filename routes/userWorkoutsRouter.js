import express from "express";

import {
  getUserWorkouts,
  addWorkoutToUser,
  markWorkoutCompleted,
  deleteWorkoutFromUser,
} from "../controllers/userWorkoutsController.js";

const router = express.Router();

// get Workouts for a specific user on a specific date
router.get("/userWorkouts/:userId/:date", getUserWorkouts);
// add a workout to a user
router.post("/userWorkouts", addWorkoutToUser);
// mark workout completed/not completed for a specific date
router.patch(
  "/userWorkouts/:userId/:exerciseId/:date/complete",
  markWorkoutCompleted,
);
// delete a workout from a user for a specific date
router.delete("/userWorkouts/:userId/:exerciseId/:date", deleteWorkoutFromUser);

export default router;
