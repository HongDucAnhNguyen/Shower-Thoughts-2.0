import express from "express";
import {
  create_thoughts,
  get_all_thoughts,
  update_thoughts,
  delete_thoughts,
} from "../controllers/thoughts-controllers.js";
const router = express.Router();

router.get("/", get_all_thoughts);
router.post("/", create_thoughts);
router.patch("/:id", update_thoughts);
router.delete("/:id", delete_thoughts);
export default router;
