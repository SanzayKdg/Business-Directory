import ContactUs from "../../models/ContactUs/Contact.js";
import { ContactUSDto } from "./dto/ContactDto.js";
import { validate } from "class-validator";

// ---------------------- ADD NEW CONTACT US MESSAGE (PUBLC -- NO-AUTH) ---------------------------------
export const newMessage = async (req: any, res: any, next: any) => {
  try {
    const { first_name, last_name, email, phone, message } = req.body;

    await ContactUs.create({
      first_name,
      last_name,
      email,
      phone,
      message,
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
