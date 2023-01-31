import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export const verifyToken = async (
  req: NextApiRequest & { user?: any },
  res: NextApiResponse
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ err: "Invalid Authentication" });
  }
  const decoded = await jwt.verify(token, process.env.jwtSecret as string);
  req.user = decoded;
  return decoded;
};
