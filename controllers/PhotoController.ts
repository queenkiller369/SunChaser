import { Request, Response } from "express";
import { PhotoService } from "../services/PhotoService";

export class PhotoController {
  constructor(private photoService: PhotoService) {} //private io: SocketIO.Server

  getPhotosByUpdatedAt = async (req: Request, res: Response) => {
    // total record
    // total page
    // current page
    try {
      let page = parseInt(req.query.page as string);
      if (isNaN(page)) {
        page = 1;
      }
      const { total, photos } = await this.photoService.getPhotosByUpdatedAt(
        page
      );

      res.json({
        total,
        total_page: Math.ceil(total / 10),
        current_page: page,
        photos,
      });
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getPhotosByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const photos = await this.photoService.getPhotosByUserId(userId);
      res.json(photos);
      res.status(401).json({ message: "Please login" });
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!" });
    }
  };

  getPhotosByDistrict = async (req: Request, res: Response) => {
    try {
      const district = req.params.district;
      const photos = await this.photoService.getPhotosByDistrict(district);
      res.json(photos);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getPhotosByLikes = async (req: Request, res: Response) => {
    try {
      const photos = await this.photoService.getPhotosByLikes();
      res.json(photos);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getPhotosByComments = async (req: Request, res: Response) => {
    try {
      const photos = await this.photoService.getPhotosByComments();
      res.json(photos);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };

  getLikedPhotos = async (req: Request, res: Response) => {
    try {
      if (req.session?.user) {
        const userId = req.session.user.id;
        const photos = await this.photoService.getLikedPhotos(userId);
        res.json(photos);
      } else if (req.user) {
        const userId = req.user.id;
        const photos = await this.photoService.getLikedPhotos(userId);
        res.json(photos);
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

  addPhotos = async (req: Request, res: Response) => {
    try {
      if (typeof req.file === "undefined") {
        res.json(400).json({ message: "invalid input" });
        return;
      }
      const userId = req.session?.user.id;
      const filename = req.file.filename;

      const body = {
        photo_title: req.body.title,
        photo_description: req.body.description,
        photo_created_at: req.body.created_at,
        photo_district: req.body.district,
        photo_location: req.body.location,
        photo_latitude: req.body.latitude,
        photo_longitude: req.body.longitude,
        photo_environment: req.body.environment,
        photo_userId: userId,
        photo_status: "shown",
      };

      const photoId = await this.photoService.addPhotos(body, filename);

      res.json({ success: true, message: `Photo id ${photoId} uploaded` });
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

  deletePhoto = async (req: Request, res: Response) => {
    try {
      const photoId = parseInt(req.params.id);
      if (isNaN(photoId)) {
        res.status(400).json({ msg: "Hey, the input id is not a number!!" });
        return;
      }
      await this.photoService.deletePhoto(photoId);
      res.json({ success: true });
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: "Oops. You've got an internal server error!!" });
    }
  };
}
