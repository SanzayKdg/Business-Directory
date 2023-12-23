import { SendMailOptions, createTransport } from "nodemailer";
import { SMTP_INFO } from "../@config/constants.config.js";

const transporter = createTransport({
  host: SMTP_INFO.host,
  port: SMTP_INFO.port,
  secure: true,
  auth: {
    user: SMTP_INFO.user,
    pass: SMTP_INFO.password,
  },
});

export const sendmail = async (options: SendMailOptions) => {
  try {
    options.from = {
      name: "BizHub",
      address: SMTP_INFO.user,
    };

    const result = await transporter.sendMail(options);
    console.log("Send mail success", result);
  } catch (error:any) {
    console.log("Send mail error", error);
  }
};
