import express from "express";
import {
  create_thoughts,
  get_all_thoughts,
  update_thoughts,
  delete_thoughts,
} from "../controllers/thoughts-controllers.js";
import authorize from "../middleware/authorization.js";
const router = express.Router();

router.get("/", get_all_thoughts);
router.post("/", authorize, create_thoughts);

//id property for req.params specified
router.patch("/:id", authorize, update_thoughts);
router.delete("/:id", authorize, delete_thoughts);
export default router;
