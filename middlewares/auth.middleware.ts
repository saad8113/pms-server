// @ts-ignore
import * as jwt from "jsonwebtoken";

import { getCurrentUser } from "../controllers/users.controller";

const JWT_PRIVATE_KEY = "891237PMS8712983";

const decodeToken = (token: any) => {
  return jwt.verify(token, JWT_PRIVATE_KEY);
};

const verifyToken = async (req: any, res: any, next: any) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(401).send("A token is required for authentication");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;

    const user = await getCurrentUser(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authenticated, profile not found!" });
    }

    req.user = user;
  } catch (err: any) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export { verifyToken };
