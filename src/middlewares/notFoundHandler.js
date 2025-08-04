// src/middlewares/notFoundHandler.js

import createHttpError from 'http-errors';

export const notFoundHandler = (req, res) => {
  if (res.status(404)) {
    createHttpError(404, 'Route not found!');
  }
};
