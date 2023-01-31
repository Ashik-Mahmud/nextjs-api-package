import { verifyToken } from "@/middlewares/VerifyToken";
import User from "@/models/UserModel";
import connectDB from "@/utils/ConnectDB";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await verifyToken(req, res);
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ err: "Please add all the fields" });
        }
        if (!validateEmail(email)) {
          return res.status(400).json({ err: "Invalid emails" });
        }

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default connectDB(handler);
