// @ts-ignore
import express from "express";
import Joi from "joi";

import { verifyToken } from "../middlewares/auth.middleware";
import {
  createProject,
  deleteProject,
  readProjects,
  updateProject,
} from "../controllers/projects.controller";
import { validate } from "../middlewares/validate";
import { PROJECT_STATUS } from "../constants";

const router = express.Router();

router.post(
  "/",
  [
    verifyToken,
    validate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.string().required(),
        image: Joi.string().required(),
        tags: Joi.array().required(),
        gitHubRepoLink: Joi.string().required(),
        liveUrl: Joi.string().required(),
      }),
    }),
  ],
  async (req: any, res: any, next: any) => {
    try {
      await createProject(req.body, req.user);

      res
        .status(200)
        .json({ message: "Project created successfully.", data: {} });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  [
    verifyToken,
    validate({
      query: Joi.object({
        projectStatus: Joi.string().required(),
      }),
    }),
  ],
  async (req: any, res: any, next: any) => {
    const { projectStatus } = req.query;

    try {
      const { rows: projects } = await readProjects(
        req.user.userId,
        projectStatus
      );

      res.status(200).json({
        message: "Projects fetched successfully.",
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:projectId",
  [
    verifyToken,
    validate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.string().required(),
        image: Joi.string().required(),
        tags: Joi.array().required(),
        gitHubRepoLink: Joi.string().required(),
        liveUrl: Joi.string().required(),
        status: Joi.string()
          .valid(
            PROJECT_STATUS.ACTIVE,
            PROJECT_STATUS.ARCHIVED,
            PROJECT_STATUS.COMPLETED,
            PROJECT_STATUS.DELETED
          )
          .required(),
      }),
      params: Joi.object({
        projectId: Joi.string().required(),
      }),
    }),
  ],
  async (req: any, res: any, next: any) => {
    try {
      const updatedProject = await updateProject(req.body, req.params);

      res.status(200).json({
        message: "User updated successfully.",
        data: { updatedProject },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:projectId",
  [
    verifyToken,
    validate({
      params: Joi.object({
        projectId: Joi.string().required(),
      }),
    }),
  ],
  async (req: any, res: any, next: any) => {
    const { projectId } = req.params;
    try {
      await deleteProject(projectId);

      res.status(200).json({
        message: "Project deleted successfully.",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
