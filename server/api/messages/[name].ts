import { Message } from "~/server/models/message.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  const sender = getQuery(event).sender
  let messages = Message.find({
    $or: [
      { receiver: name, sender: sender },
      { receiver: sender, sender: name }
    ]
  }).exec();  
  return messages
})