import express from "express";

import {
  create_thoughts,
  get_all_thoughts,
  update_thoughts,
  delete_thoughts,
  heart_thoughts,
  get_thought_by_id,
  get_thoughts_by_search,
  fetchReddit,
} from "../controllers/thoughts-controllers.js";
import authorize from "../middleware/authorization.js";
const router = express.Router();
router.get("/", get_all_thoughts); //refactor route
router.get("/reddit", fetchReddit);
router.get("/details/:id", get_thought_by_id);
router.get("/search", get_thoughts_by_search);
router.post("/", authorize, create_thoughts);

//id property for req.params specified
router.patch("/:id", authorize, update_thoughts);
router.delete("/:id", authorize, delete_thoughts);
router.patch("/:id/hearts", authorize, heart_thoughts);
export default router;
