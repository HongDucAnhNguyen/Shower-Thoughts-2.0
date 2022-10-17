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

export const create_thoughts = (req, res) => {
  try {
    const thought = req.body;
    console.log(thought);
    thoughtCard
      .create({
        ...thought,
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
    console.log(`deleted thought with id: ${id}`);
    //return a json object containing a message to make the browser render the change
    res.json({ message: "thought deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
