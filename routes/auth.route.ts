// @ts-ignore
import express from "express";
import Joi from "joi";

import { validate } from "../middlewares/validate";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/register",
  validate({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  }),
  async (req: any, res: any, next: any) => {
    try {
      const userWithToken = await registerUser(req.body);

      res.status(200).json({
        message: "User registered successfully.",
        data: userWithToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validate({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req: any, res: any, next: any) => {
    const { email, password } = req.body;

    try {
      const userWithToken = await loginUser(email, password);

      res.status(200).json({
        message: "User Logged in successfully.",
        data: userWithToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
