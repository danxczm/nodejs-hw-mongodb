import createHttpError from 'http-errors';

export default (req, res) => {
  if (res.status(404)) {
    createHttpError(404, 'Route not found!');
  }
};
