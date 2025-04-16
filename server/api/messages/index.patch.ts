import { User } from "~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try{
    await mongoose.connect("mongodb://localhost:27017/chat");

    const updatedUser = await User.findOneAndUpdate(
        { name: body.name },
        {
            $set: {
                friends: body.friends
            }
        }
    );
    return { body: updatedUser };
  } catch(e) {
    console.error(e);
  }

});