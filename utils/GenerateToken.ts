import jwt from "jsonwebtoken";

export const generateToken = async (id: string) => {
  return await jwt.sign({ id }, process.env.jwtSecret as string, {
    expiresIn: "30d",
  });
};
