import { verifyToken } from "@/middlewares/VerifyToken";
import User from "@/models/UserModel";
import connectDB from "@/utils/ConnectDB";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  // check user id valid or not
  if (!isValidObjectId(userId)) {
    return res.status(400).json({ err: "put the valid id." });
  }

  await verifyToken(req, res);

  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(400).json({ err: "User does not exist." });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const { name, avatar } = req.body;
        if (!name) {
          return res.status(400).json({ err: "Please add all the fields." });
        }
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { name, avatar },
          { new: true }
        ).select("-password");
        if (!user) {
          return res.status(400).json({ err: "User does not exist." });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    // delete
    case "DELETE":
      try {
        const user = await User.findById(userId);
        if (!user)
          return res
            .status(404)
            .send({ success: false, message: "user does not exist" });
        await user.remove();
        res.status(202).send({
          success: true,
          message: `User successfully removed.`,
        });
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
