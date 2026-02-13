import { Router } from "express";
import { createPost, deletepost, getpost, updatepost } from "../controllers/post.controller.js";
const router = Router();

router.route('/create').post(createPost);
router.route('/getposts').get(getpost);
router.route('/update/:id').patch(updatepost);
router.route('/delete/:id').delete(deletepost);

export default router;