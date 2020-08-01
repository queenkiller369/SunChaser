import { Request, Response } from "express";
import { CommentAndLikeService } from "../services/CommentAndLikeService";

export class CommentAndLikeController {
  constructor(private commentAndLikeService: CommentAndLikeService) {} //private io: SocketIO.Server

  getTotalLikes = async (req: Request, res: Response) => {
    try {
      const result = await this.commentAndLikeService.getTotalLikes();
      res.json(result);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getTotalComments = async (req: Request, res: Response) => {
    try {
      const result = await this.commentAndLikeService.getTotalComments();
      res.json(result);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  likePhoto = async (req: Request, res: Response) => {
    try {
      const photoId = parseInt(req.params.id);
      console.log("LIKE");
      if (req.session?.user) {
        const userId = req.session.user.id;
        await this.commentAndLikeService.likePhoto(photoId, userId);
        res.json({ success: true });
      } else if (req.user) {
        const userId = req.user.id;
        await this.commentAndLikeService.likePhoto(photoId, userId);
        res.json({ success: true });
      } else {
        res.json({ message: "No user" });
      }
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  unlikePhoto = async (req: Request, res: Response) => {
    try {
      const photoId = parseInt(req.params.id);
      if (req.session) {
        const userId = req.session.user.id;
        await this.commentAndLikeService.unLikePhoto(photoId, userId!);
        res.json({ success: true });
      } else if (req.user) {
        const userId = req.user?.id;
        await this.commentAndLikeService.unLikePhoto(photoId, userId!);
        res.json({ success: true });
      } else {
        res.json({ message: "No user" });
      }
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getCommentsByPhotoId = async (req: Request, res: Response) => {
    try {
      const photoId = parseInt(req.params.id);
      const comments = await this.commentAndLikeService.getCommentsByPhotoId(
        photoId
      );
      res.json(comments);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  commentPhoto = async (req: Request, res: Response) => {
    try {
      const content = req.body.content;
      const photoId = parseInt(req.params.id);
      if (req.user) {
        const userId = req.user.id;
        await this.commentAndLikeService.commentPhoto(content, photoId, userId);
        res.json({ success: true });
      } else if (req.session?.user) {
        const userId = req.session?.user.id;
        await this.commentAndLikeService.commentPhoto(content, photoId, userId);
        res.json({ success: true });
      }
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  // updatePhotos = async (req: Request, res:Response) => {
  //     try {
  //         const photoId = parseInt(req.params.id);
  //         if (isNaN(photoId)) {
  //             res.status(400).json({ msg: "Hey, the input id is not a number!!"});
  //             return;
  //         }
  //         const { title } = req.body;
  //         await this.photoService.updatePhotos(title, photoId);
  //         res.json({ success: true});
  //     }catch(e){
  //         console.error(e.message);
  //         res.status(500).json({message: "Oops. You've got an internal server error!!"});
  //     }
  // };

  // deletePhotos = async (req: Request, res: Response) => {
  //     try {
  //        const photoId = parseInt(req.params.id);
  //        if (isNaN(photoId)) {
  //            res.status(400).json({"Hey, the input id is not a number!!"});
  //            return;
  //        }
  //        await this.photoService.deletePhotos(photoId);
  //        res.json({ success: true});
  //     }catch(e){
  //         console.error(e.message);
  //         res.status(500).json({message: "Oops. You've got an internal server error!!"});
  //     }
  // };
}
