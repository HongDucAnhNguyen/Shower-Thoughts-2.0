import thoughtCard from "../models/Thoughts.js";
import mongoose from "mongoose";

export const get_all_thoughts = async (req, res) => {
  try {
    const allThoughts = await thoughtCard.find();
    res.json(allThoughts);
  } catch (error) {
    console.log(error);
  }
};
export const get_thoughts_by_search = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    console.log(searchQuery);
    const search_key = new RegExp(searchQuery, "i"); //case insensitive regex match pattern
    const thoughts = await thoughtCard.find({
      //matching either of these three
      //match by title, message or creator
      $or: [
        { title: { $regex: search_key } },
        { message: { $regex: search_key } },
        { name: { $regex: search_key } },
      ],
    });

    res.json(thoughts);

    console.log(thoughts);
  } catch (error) {
    console.log(error);
  }
};

export const create_thoughts = (req, res) => {
  try {
    const thought = req.body;
    // console.log(thought);
    thoughtCard
      .create({
        ...thought,
        creator: req.userId,
      })
      .then((result) => {
        res.json(result);
      });
    console.log("created thought successfully");
  } catch (error) {
    console.log(error);
  }
};

export const update_thoughts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("no matching id found");
    }
    const thought_updated = await thoughtCard.findByIdAndUpdate(id, req.body, {
      //new true means put the content of body in new obj
      new: true,
    });
    //now thought_updated stores content of that new obj
    res.json(thought_updated); //send it back as json
  } catch (error) {
    console.log(error);
  }
};

export const delete_thoughts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("id not found");
    }
    await thoughtCard.findByIdAndDelete(id);
    res.status(200).json({ message: `thought deleted with the id of ${id}` });
    console.log(`thought deleted with the id of ${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const heart_thoughts = async (req, res) => {
  try {
    const id = req.params.id;
    //if user has not logged in/ registered an account
    //resulting in no userId property then return message
    if (!req.userId) {
      return res.json({ message: "user unauthenticated" });
    }
    //if there is no id for some reason
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id");
    }
    //get the thought with id in params
    const thought = await thoughtCard.findById(id);
    //get the index of that id in likes array
    const index = thought.likes.findIndex((id) => id === String(req.userId));
    //if there is no matching id
    if (index === -1) {
      //heart the post by adding the id to the likes array
      thought.likes.push(req.userId);
    } else {
      //post can only be liked once by a user, if id already exists in likes array
      //dislike the post, removing the id (like) from array
      thought.likes = thought.likes.filter((id) => id !== String(req.userId));
    }
    const thought_updated = await thoughtCard.findByIdAndUpdate(id, thought, {
      new: true,
    });
    res.json(thought_updated);
  } catch (error) {
    console.log(error);
  }
};
