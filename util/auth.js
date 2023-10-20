import { sign } from "jsonwebtoken";
import { findOne } from "./models/User";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function signIn(email, password) {
  const user = await findOne({ email });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    // Passwords match, create a JWT token
    const token = sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    return { user, token };
  }

  return null; // Passwords do not match
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { signIn };
