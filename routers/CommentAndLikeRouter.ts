import express from "express";
import { commentAndLikeController, isLoggedInRN } from "../main";
// import { isLoggedInWeb } from "../guards";

export const router = express.Router();

router.get("/totalLikes", commentAndLikeController.getTotalLikes);
router.post("/RN/like/:id", commentAndLikeController.likePhoto);
router.put(
  "/RN/unlike/:id",
  isLoggedInRN,
  commentAndLikeController.unlikePhoto
);

router.post("/like/:id", commentAndLikeController.likePhoto);
router.put("/unlike/:id", commentAndLikeController.unlikePhoto);

router.get("/totalComments", commentAndLikeController.getTotalComments);
router.get("/comments/:id", commentAndLikeController.getCommentsByPhotoId);
router.post("/comment/:id", commentAndLikeController.commentPhoto);
