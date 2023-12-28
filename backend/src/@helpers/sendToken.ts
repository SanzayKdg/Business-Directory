import { COOKIE_EXPIRE } from "../@config/constants.config.js";

const sendToken = (
  user: any,
  status_code: number,
  res: any,
  message: string
) => {
  const token = user.getJWTToken();
  // options for cookie
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // save in cookie
  res
    .status(status_code)
    .cookie("token", token, options)
    .json({ success: true, message });
};

export default sendToken;
