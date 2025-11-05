import express from "express";
import {
  getUserWorkouts,
  addWorkoutToUser,
  markWorkoutCompleted,
} from "../controllers/userWorkouts.js";

const router = express.Router();

// get workouts for a specific user
router.get("/userWorkouts/:userId", getUserWorkouts);
// add a workout to a user
router.post("/userWorkouts", addWorkoutToUser);
// mark a workout as completed
router.put("/userWorkouts/complete", markWorkoutCompleted);

export default router;
