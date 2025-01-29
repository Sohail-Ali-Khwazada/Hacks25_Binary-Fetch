import express from "express";
import { postHandler, submitPost, getPost, addTask } from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";
const router = express.Router();

router.post("/create-post", protectRoute, postHandler)
router.post('/submit-post/:postId', protectRoute, submitPost);
router.get('/get-posts', protectRoute, getPost);
router.post("/addTask",addTask);
export default router;