import express from "express";
import { authController, googleMapController } from "./main";
import { router as photoRouter } from "./routers/PhotoRouter";
import { router as commentAndLikeRouter } from "./routers/CommentAndLikeRouter";
import { router as userRouter } from "./routers/UserRouter";

export const routes = express.Router();

routes.use("/", userRouter);
routes.use("/photos", photoRouter);
routes.use("/photos", commentAndLikeRouter);

routes.post("/loginWeb", authController.loginWeb);
routes.post("/loginRN", authController.loginRN);
routes.get("/login/google", authController.loginGoogle);

routes.get("/googleMapMarkers", googleMapController.getMarkers);

// routes.get('/getGoogleMapMarkersInfoConfig', googleMapController.getMarkersInfoConfig);
