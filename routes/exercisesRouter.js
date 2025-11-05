import express from "express";
import {
  getAllExercises,
  getExercisesByCategory,
} from "../controllers/exerciseController.js";

const router = express.Router();

// get all exercises
router.get("/exercises", getAllExercises);
// get exercises by category
router.get("/exercises/:category", getExercisesByCategory);

export default router;
