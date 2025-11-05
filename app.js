import express from "express";
import cors from "cors";
import router from "./routes/exercisesRouter.js";
import profileRouter from "./routes/profileRouter.js";
import userWorkoutsRouter from "./routes/userWorkoutsRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());

// Routes
app.use("/", router);
app.use("/", profileRouter);
app.use("/", userWorkoutsRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FitHit Server is running on port ${PORT}`);
});
