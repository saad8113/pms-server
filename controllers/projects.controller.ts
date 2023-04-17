import { PROJECT_STATUS } from "../constants";
import { client } from "../startup/postgreSQL";

const createProject = async (
  { name, description, startDate, image, tags, gitHubRepoLink, liveUrl }: any,
  { userId }: any
) => {
  const projectId = Math.floor(100000 + Math.random() * 900000);

  return client.query(`insert into "Projects"("projectId","userId","name","description","startDate","image","gitHubRepoLink","liveUrl","status")
values('${projectId}','${userId}', '${name}','${description}','${startDate}','${image}','${gitHubRepoLink}','${liveUrl}','${PROJECT_STATUS.ACTIVE}')`);
};

const readProjects = (userId: any, projectStatus: any) =>
  client.query(
    `Select * from "Projects" where "userId"=${userId} and "status"='${projectStatus}'`
  );

const updateProject = (
  {
    name,
    description,
    startDate,
    image,
    tags,
    gitHubRepoLink,
    liveUrl,
    status,
  }: any,
  { projectId }: any
) =>
  client.query(`update "Projects"
set "name" = '${name}',
"description" = '${description}',
"startDate" = '${startDate}',
"image" = '${image}',
"gitHubRepoLink" = '${gitHubRepoLink}',
"liveUrl" = '${liveUrl}',
"status" = '${status}'
where "projectId"=${projectId}`);

const deleteProject = (projectId: any) =>
  client.query(`update "Projects"
  set status = '${PROJECT_STATUS.DELETED}'
  where "projectId" = ${projectId}`);

export { createProject, readProjects, updateProject, deleteProject };
