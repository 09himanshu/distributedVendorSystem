
export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode
  const status = err.status
  const message = err.message

  try {
    res.status(statusCode).send({
      status: status,
      statusCode,
      message,
    });
  } catch (err) {
    res.status(statusCode).send({
      status: status,
      statusCode,
      message,
    });
  }
};