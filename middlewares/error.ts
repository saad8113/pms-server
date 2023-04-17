import winston from "winston"; //for logging errors

export const error = (err: any, req: any, res: any, next: any) => {
  winston.error(err.message, err);
  console.log(err.message, err);
  res.status(err.statusCode || 500).json({
    status: false,
    message: err.message || "Something went wrong!",
  });
};
