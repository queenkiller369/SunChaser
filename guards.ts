import { Request, Response, NextFunction } from "express";
import { Bearer } from "permit";
import { UserService } from "./services/UserService";
import jwtSimple from "jwt-simple";
import jwt from "./jwt";

export const isLoggedInWeb = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session) {
    if (req.session.user) {
      next();
      return;
    }
  }
  res.redirect("/");
};

export const createIsLoggedInRN = (
  permit: Bearer,
  userService: UserService
) => {
  return (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = permit.check(req);

        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const user = await userService.getUserById(payload.id);

        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        if (roles.indexOf(user.role) > -1) {
          return res.status(403).json({ error: "Permission Denied" });
        }

        // delete the password from the data previously got from database
        req.user = user;
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;

        return next();
      } catch (e) {
        console.error(e);
        return res.status(401).json({ error: "Permission Denied" });
      }
    };
  };
};
