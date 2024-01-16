import ContactUs from "../../models/ContactUs/Contact.js";
import { ContactUSDto } from "./dto/ContactDto.js";
import { validate } from "class-validator";

// ---------------------- ADD NEW CONTACT US MESSAGE (PUBLC -- NO-AUTH) ---------------------------------
export const newMessage = async (req: any, res: any, next: any) => {
  try {
    const { first_name, last_name, email, phone, message } = req.body;
    const payload = new ContactUSDto();
    payload.first_name = first_name;
    payload.last_name = last_name;
    payload.email = email;
    payload.phone = phone;
    payload.message = message;

    const errors = await validate(payload);

    if (errors.length > 0) {
      const validation_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});
      return next(
        res.status(400).json({ success: false, message: validation_error })
      );
    }

    await ContactUs.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    });

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL CONTACT US MESSAGE (ADMIN -- AUTH) ---------------------------------

export const getAllMessage = async (req: any, res: any, next: any) => {
  try {
    const messages = await ContactUs.find();

    if (messages.length < 0) {
      return next(
        res.status(404).json({ success: false, message: "Sorry. No message" })
      );
    }

    res.status(200).json({ success: true, messages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
