const asyncErrorCatcher = passedFunction => async (request, response, next) => {
  try {
    await passedFunction(request, response);
  } catch (error) {
    next(error);
  }
};

export default asyncErrorCatcher;
