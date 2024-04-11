import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const chatSchema = new Schema(
  {
    advice: {
      type: String,
      required: true,
    },
    conversation: [
      {
        query: {
          type: String,
        },
        response: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

chatSchema.plugin(mongooseAggregatePaginate);

export const Chat = mongoose.model("Chat", chatSchema);
