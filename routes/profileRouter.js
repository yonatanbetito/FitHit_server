import express from "express";

import { Login, updateProfileField } from "../controllers/profileController.js";

const router = express.Router();

router.get("/Login", Login);
router.patch("/profiles/:id", updateProfileField);

export default router;
