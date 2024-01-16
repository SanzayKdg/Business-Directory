import { validate } from "class-validator";
import { ContactUSDto } from "../controllers/ContactUs/dto/ContactDto.js";

export const payloadValidator = async (
  res: any,
  next: any,
  payload: ContactUSDto
) => {
  try {
    console.log(payload);

    const errors = await validate(payload);
    if (errors.length > 0) {
      const validation_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});

      res.status(400).json({ success: false, message: validation_error });
    }
  } catch (error: any) {
    res.status(500).json({success: false, message : error.message})
  }
};
