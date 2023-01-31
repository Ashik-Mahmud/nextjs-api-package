import User from "@/models/UserModel";
import connectDB from "@/utils/ConnectDB";
import { generateToken } from "@/utils/GenerateToken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ err: "Please add all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ err: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ err: "Incorrect password" });
        }
        const token = await generateToken(user?._id);

        const {
          password: pass,
          verifyToken,
          verifyTokenExpire,
          resetPasswordExpire,
          resetPasswordToken,
          ...data
        } = user.toObject();
        res.status(201).json({ success: true, data: { user: data, token } });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default connectDB(handler);
