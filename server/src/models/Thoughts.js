import mongoose from "mongoose";

const thoughtSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  //the likes array contains ids of every user that hearts the post in String type
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const thoughtCard = mongoose.model("thoughtCard", thoughtSchema);
export default thoughtCard;
