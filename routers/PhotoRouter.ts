import express from "express";
import { upload, photoController, isLoggedInRN } from "../main";
import { isLoggedInWeb } from "../guards";

export const router = express.Router();

router.get("/", photoController.getPhotosByUpdatedAt);
router.get("/user/:id", photoController.getPhotosByUserId);
router.get("/likes", photoController.getPhotosByLikes);
router.get("/comments", photoController.getPhotosByComments);
router.get("/district/:district", photoController.getPhotosByDistrict);
router.get("/liked", photoController.getLikedPhotos);

router.delete("/:id", photoController.deletePhoto);

router.post(
  "/addPhoto",
  isLoggedInWeb,
  upload.single("image"),
  photoController.addPhotos
);
router.post(
  "/addPhoto",
  isLoggedInRN(["user", "admin"]),
  upload.single("image"),
  photoController.addPhotos
);
