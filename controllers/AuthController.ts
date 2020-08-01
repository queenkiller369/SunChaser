import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import jwtSimple from "jwt-simple";
import { checkPassword } from "../hash";
import jwt from "../jwt";
import fetch from 'node-fetch';

export class AuthController {
  public constructor(private userService: UserService) {}

  public loginRN = async (req: Request, res: Response) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: "No email or password" });
      }

      const user = await this.userService.getUserByEmail(req.body.email);

      if (!user) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      if (!(await checkPassword(req.body.password, user.password))) {
        return res.status(401).json({ error: "Incorrect email or password" });
      }

      const payload = {
        id: user.id,
      };

      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      return res.json({
        token: token,
        user: user,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Unknown error" });
    }
  };

  loginGoogle = async (req: Request, res: Response) => {
    try {
      const accessToken = req.session?.grant.response.access_token;
      // res.json({access_token: accessToken});

      const fetchRes = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await fetchRes.json();

      const body = {
        userEmail: result.email,
        userName: result.name,
        userRole: "user",
      };

      await this.userService.loginGoogle(body, req);
      
      res.redirect("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  loginWeb = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (user && (await checkPassword(password, user.password))) {
        if (req.session) {
          req.session.user = user;
        }
        res.redirect("/");
      } else {
        res.status(401).redirect("/?error=Login+Failed!");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
}
