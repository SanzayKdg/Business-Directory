export const roles = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.user_role)) {
      return next(
        res.status(403).json({
          success: false,
          message: `You are not authorized. Please login as ${roles} to access this reqource. `,
        })
      );
    }

    next();
  };
};
