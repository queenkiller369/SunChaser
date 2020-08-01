import express from "express";
import { userController, isLoggedInRN } from "../main";
import { isLoggedInWeb } from "../guards";

export const router = express.Router();

router.get("/suntimes", userController.getSunriseAndSunset);
router.get("/weather", userController.getWeatherForecast);
router.post("/createUser", userController.createUser);
router.get("/logout", userController.logout);
router.get("/user", isLoggedInWeb, userController.getCurrentUser);
router.get(
  "/user",
  isLoggedInRN(["user", "admin"]),
  userController.getCurrentUser
);
