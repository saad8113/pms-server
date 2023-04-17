import { client } from "../startup/postgreSQL";

const getCurrentUser = async (userId: any) => {
  const {
    rows: [user],
  } = await client.query(
    `Select * from "Users" where "userId"=${userId}`
  );

  return user;
};

export { getCurrentUser };
