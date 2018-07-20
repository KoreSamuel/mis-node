export default (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: '未登录或token已过期',
        info: {
          error: err.originalError ? err.originalError.message : err.message,
        }
      };
    } else {
      throw err;
    }
  });
}