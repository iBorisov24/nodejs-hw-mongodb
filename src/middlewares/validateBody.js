import createHttpError from 'http-errors';
export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.error('Validation Error:', error);
      next(
        createHttpError(
          400,
          error.details.map((err) => err.message).join(', '),
        ),
      );
    }
  };
};
