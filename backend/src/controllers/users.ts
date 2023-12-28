import sendToken from "../@helpers/sendToken.js";
import { TypeOrmConfig } from "../@config/typeorm.config.js";
import { User } from "../entity/user.entity.js";
import { UpdateUserDto } from "../dtos/user.dto.js";

// ------------------------------ GET MY PROFILE ----------------------------------------------
export const profile = async (req: any, res: any, next: any) => {
    try {
      const user = await TypeOrmConfig.getRepository(User).findOne({
        where: {
          _id: req.user._id,
        },
      });
      // send token as response
      sendToken(user, 200, res, `Welcome ${user?.full_name}`);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // ------------------------------ UPDATE PROFILE ----------------------------------------------
  export const updateProfile = async (req: any, res: any, next: any) => {
    const { full_name, email, phone_number, avatar, dob, gender, address } =
      req.body;
  
    // const avatar = req.file
    const { id } = req.params.id;
  
    // check if user exists
    const user = await TypeOrmConfig.getRepository(User).findOneBy(id);
  
    if (!user)
      return next(
        res.status(400).json({ success: false, message: "User doesnot exists." })
      );
  
    const payload = new UpdateUserDto();
  
    if (Object.keys(payload).length === 0 && !avatar) {
      return next(
        res.status(400).json({ success: false, message: "No data submitted." })
      );
    }
  };
  // ------------------------------ DELETE PROFILE ----------------------------------------------
  