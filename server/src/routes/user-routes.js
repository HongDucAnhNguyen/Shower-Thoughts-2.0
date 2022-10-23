import express from "express";
import { login, register } from "../controllers/user-controllers.js";
const router = express.Router();

router.post("/login", login /**login function */);
router.post("/register", register /**register function */);
export default router;
