import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(process.env.SALT));
};

export const comparePassword = async (
  enteredPassword: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

export const generateJsonWebToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
