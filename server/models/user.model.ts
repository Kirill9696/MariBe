import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    friends: Array
  });
  
export const User = model("User", UserSchema);