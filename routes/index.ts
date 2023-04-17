// @ts-ignore
import express from "express";

import { error } from "../middlewares/error";
import { router as authRoutes } from "./auth.route";
import { router as usersRoutes } from "./users.route";
import { router as projectsRoutes } from "./projects.route";

const router = express.Router();

router.use(function (req: any, res: any, next: any) {
  if (req.method == "OPTIONS") {
    return res.json();
  } else {
    next();
  }
});

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/projects", projectsRoutes);

router.use(error);

export default router;
