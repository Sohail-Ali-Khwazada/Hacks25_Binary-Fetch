import express from "express";
import { postHandler, submitPost } from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { addTask } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create-post", protectRoute, postHandler)
router.post('/submit-post/:postId', protectRoute, submitPost);
router.post("/addTask",addTask);
export default router;