// @ts-ignore
import express from "express";

import { verifyToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/me", verifyToken, async (req: any, res: any, next: any) => {
  try {
    res.status(200).json({
      message: "User fetched successfully.",
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
});

export { router };
