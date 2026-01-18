import express from "express";

import {
  getUserWorkouts,
  addWorkoutToUser,
  markWorkoutCompleted,
  deleteWorkoutFromUser,
} from "../controllers/userWorkoutsController.js";

const router = express.Router();

// get Workouts for a specific user
router.get("/userWorkouts/:userId", getUserWorkouts);
// add a workout to a user
router.post("/userWorkouts", addWorkoutToUser);
// mark workout completed/not completed
router.patch(
  "/userWorkouts/:userId/:exerciseId/complete",
  markWorkoutCompleted
);
// delete a workout from a user
router.delete("/userWorkouts/:userId/:exerciseId", deleteWorkoutFromUser);

export default router;
