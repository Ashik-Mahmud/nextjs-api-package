import connectDB from "@/utils/ConnectDB";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  res.status(400).json({ message: "Error" });
};

export default connectDB(handler);
