import { AppError } from "../utils/error.utils.js"

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode
  const message = err.message
  const status = err.status
  try {
    res.status(statusCode).send({
      status: status,
      statusCode,
      message
    })
  } catch (err) {
    res.status(500).send({
      status: "error",
      statusCode: 500,
      message: message
    })
  }
}