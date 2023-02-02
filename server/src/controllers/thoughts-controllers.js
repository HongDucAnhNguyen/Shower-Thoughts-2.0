import thoughtCard from "../models/Thoughts.js";
import mongoose from "mongoose";
import axios from "axios";
export const get_all_thoughts = async (req, res) => {
  const { page } = req.query;
  //get all thoughts should be refactored to get thoughts per page, limit = 4? 6?
  try {
    const limit_thoughts = 4;
    //offset math
    const startIndexAtPage = (Number(page) - 1) * limit_thoughts;
    //total amount of documents present in database
    const totalThoughts = await thoughtCard.countDocuments({});
    const allThoughts = await thoughtCard
      .find()
      .sort({ _id: -1 })
      .limit(limit_thoughts)
      .skip(startIndexAtPage);

    //find/retrieve all documents, sort by id latest creation to oldest and limit the number of thoughts returned - 4 per page
    //if there are previous thoughts, skip to first thoughts of current page
    res.json({
      data: allThoughts, //array
      currentPage: Number(page),
      totalPages: Math.ceil(totalThoughts / limit_thoughts), //total number of pages
    });
  } catch (error) {
    console.log(error);
  }
};
export const get_thought_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("not a valid id");
    }
    const thoughtRetrieved = await thoughtCard.findById(id);
    res.status(200).json(thoughtRetrieved);
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
      //match by title, message or creator name
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

export const fetchReddit = (req, res) => {
  axios
    .get("https://www.reddit.com/r/Showerthoughts.json")
    .then((result) => {
      const data_children_size = result.data.data.dist;
      console.log(data_children_size);

      let { title, url } =
        result.data.data.children[
          Math.floor(Math.random() * (data_children_size - 0) + 0)
        ]?.data;
      console.log(title, url);

      res.json({ title: title, url: url });
    })
    .catch((error) => console.log(error));
};
