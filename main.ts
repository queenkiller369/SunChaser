import express from "express";
import expressSession from "express-session";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import Knex from "knex";
import socketIO from "socket.io"; // No use
import http from "http";
import { createIsLoggedInRN, isLoggedInWeb } from "./guards";
import redis from "redis";
import AsyncRedis from "async-redis";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { PhotoService } from "./services/PhotoService";
import { PhotoController } from "./controllers/PhotoController";
import { CommentAndLikeService } from "./services/CommentAndLikeService";
import { CommentAndLikeController } from "./controllers/CommentAndLikeController";
import { GoogleMapService } from "./services/GoogleMapService";
import { GoogleMapController } from "./controllers/GoogleMapController";
import { AuthController } from "./controllers/AuthController";
import { Bearer } from "permit";
import dotenv from "dotenv";

const client = redis.createClient();
const asyncRedisClient = AsyncRedis.decorate(client);

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

dotenv.config();
// import grant from 'grant-express';
const grant = require("grant-express");

const app = express();
const server = new http.Server(app);
export const io = socketIO(server);

app.use(
  expressSession({
    secret: "Tecky Cohort9 2nd and 3rd Project Group3",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${file.mimetype.split("/")[1]}`
    );
  },
});
export const upload = multer({ storage });

app.use(
  grant({
    defaults: {
      protocol: "http",
      // "host": "localhost:8080",
      host: process.env.GOOGLE_CLIENT_HOST || "",
      transport: "session",
      state: true,
    },
    google: {
      key: process.env.GOOGLE_CLIENT_ID || "",
      secret: process.env.GOOGLE_CLIENT_SECRET || "",
      scope: ["profile", "email"],
      callback: "/login/google",
    },
  })
);

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}

const userService = new UserService(knex, asyncRedisClient);
export const userController = new UserController(userService);

const photoService = new PhotoService(knex);
export const photoController = new PhotoController(photoService);

const commentAndLikeService = new CommentAndLikeService(knex);
export const commentAndLikeController = new CommentAndLikeController(
  commentAndLikeService
);

const googleMapService = new GoogleMapService(knex);
export const googleMapController = new GoogleMapController(googleMapService);
export const authController = new AuthController(userService);

const permit = new Bearer({
  query: "access_token",
});

export const isLoggedInRN = createIsLoggedInRN(permit, userService);

// app.use(`${API_VERSION}/students`, studentRoutes);
import { routes } from "./routes";
app.use("/", routes);
app.use(express.static("public"));
app.use(isLoggedInWeb, express.static("protected"));

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "public/404.html"));
});

server.listen(8080, function () {
  console.log("Express listening at http://localhost:8080");
});

io.on("connection", function (socket) {
  // console.log(socket);
});
