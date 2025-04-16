import { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});
  
export const Account = model("Account", AccountSchema);