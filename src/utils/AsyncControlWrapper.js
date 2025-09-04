// src/utils/asyncControlWrapper.js

export const asyncControlWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
