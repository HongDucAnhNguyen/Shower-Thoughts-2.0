import mongoose from "mongoose";

const thoughtSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
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
