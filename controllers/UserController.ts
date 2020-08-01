import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  getCurrentUser = (req: Request, res: Response) => {
    if (req.session?.user) {
      res.json(req.session.user);
    } else if (req.user) {
      res.json(req.user);
    }
  };

  getSunriseAndSunset = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getSunriseAndSunset();
      res.json(result);
    } catch (e) {
      console.error(e.message);
    }
  };

  getWeatherForecast = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getWeatherForecast();
      res.json(result);
    } catch (e) {
      console.error(e.message);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const body = {
        user_email: req.body.email,
        user_password: req.body.password,
        user_name: req.body.username,
        user_role: "user",
      };
      console.log(req.body);
      const userId = await this.userService.createUser(body);
      res.json({ updated: userId });
    } catch (e) {
      console.error(e.message);
      if (e.detail.includes("exists")) {
        res.json({ message: "Email already registered" });
      }
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      if (req.session) {
        // console.log(req.session.user);
        delete req.session.user;
      }
      res.redirect("/?accSuccess=Log+Out+Successfully");
    } catch (e) {
      console.log(e.message);
    }
  };
}
