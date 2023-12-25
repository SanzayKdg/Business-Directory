import { User } from "../entity/user.entity.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../@config/constants.config.js";
import { TypeOrmConfig } from "../@config/typeorm.config.js";

export const is_authenticated = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;
    const decoded_data: any = jwt.verify(token, JWT_SECRET);
    req.user = await TypeOrmConfig.getRepository(User).findOneBy({
      id: decoded_data.id,
    });

    next();
  } catch (error: any) {
    return next(
      res.status(500).json({
        success: false,
        message: error.message,
      })
    );
  }
};
