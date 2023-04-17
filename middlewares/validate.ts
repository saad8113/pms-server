export const validate =
  ({ body: bodySchema, params: paramSchema, query: querySchema }: any) =>
  (req: any, res: any, next: any) => {
    let error;

    const { body, params, query } = req;

    if (bodySchema) {
      const result = bodySchema.validate(body);
      error = result.error;
    }

    if (paramSchema) {
      const result = paramSchema.validate(params);
      error = result.error;
    }

    if (querySchema) {
      const result = querySchema.validate(query);
      error = result.error;
    }

    if (error == null) {
      return next();
    }

    const { details } = error;

    const message = details.map((i: any) => i.message).join(",");

    return res.status(422).json({ message });
  };
