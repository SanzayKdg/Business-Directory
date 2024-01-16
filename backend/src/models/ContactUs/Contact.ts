import mongoose from "mongoose";
import validator from "validator";
export const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter your first name."],
    validate: [validator.isAlpha, "Please enter a valid email address"],

  },
  last_name: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number."],

  },
  message: {
    type: String,
    required: [true, "Please enter your message."],
  },
});

const ContactUs = mongoose.model("ContactUS", contactSchema);

export default ContactUs;
