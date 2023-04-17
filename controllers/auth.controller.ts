// @ts-ignore
import createError from "http-errors";
// @ts-ignore
import * as jwt from "jsonwebtoken";

import { client } from "../startup/postgreSQL";

const JWT_PRIVATE_KEY = "891237PMS8712983";

const registerUser = async ({ email, password, firstName, lastName }: any) => {
  const userId = Math.floor(100000 + Math.random() * 900000);

  const {
    rows: [userEmail],
  } = await client.query(`Select email from "Users" where "email"='${email}'`);

  if (userEmail) {
    throw createError(400, "This email belongs to another user!");
  }

  const registerUserQuery = `insert into "Users"("userId", "email", "password", "firstName", "lastName")
                       values(${userId}, '${email}', '${password}', '${firstName}', '${lastName}')`;

  await client.query(registerUserQuery);

  const {
    rows: [user],
  } = await client.query(`Select * from "Users" where "userId"=${userId}`);

  client.end;

  return { token: createToken({ userId: user.userId }), user };
};

const loginUser = async (email: any, password: any) => {
  const {
    rows: [user],
  } = await client.query(
    `Select "userId", "email", "password", "firstName", "lastName"  from "Users" where "email"='${email}'`
  );

  if (!user) {
    throw createError(400, "Invalid email or password!");
  }

  if (password !== user.password) {
    throw createError(400, "Invalid email or password!");
  }

  return { token: createToken({ userId: user.userId }), user };
};

const createToken = (data: any) => jwt.sign(data, JWT_PRIVATE_KEY);

export { registerUser, loginUser, createToken };
