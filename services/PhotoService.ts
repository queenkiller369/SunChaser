import Knex from "knex";
import { IPhoto } from "./models";

export class PhotoService {
  constructor(private knex: Knex) {}

  async getPhotosByUpdatedAt(page: number) {
    // select image, username, photos.updated_at,photos.id,title,description,district,location from photos join users on users.id = photos.user_id

    const createQuery = () =>
      this.knex("photos").join("users", "photos.user_id", "users.id")
      .leftJoin("comments", "comments.photo_id", "photos.id")
      .leftJoin("likes", "likes.photo_id", "photos.id");
    const result = await createQuery().count("*").first();
    const photos = await createQuery()
      .column(
        "photos.image",
        "users.username",
        "photos.updated_at",
        "photos.id",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .count("comments.id as total_comment")
      .count("likes.id as total_like")
      .groupBy(
        "users.username",
        "photos.id",
        "photos.image",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.updated_at",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .select()
      .orderBy("updated_at", "desc")
      .limit(10)
      .offset((page - 1) * 10);
    return {
      total: parseInt(result?.count as string),
      photos,
    };
  }

  async getPhotosByUserId(id: number) {
    // select  image, username, photos.updated_at,photos.id,title,description,district,location from photos join users on users.id = photos.user_id
    // where username = 'God Woody'
    // order by updated_at DESC

    const photos: IPhoto[] = await this.knex
      .column("users.username", "photos.*")
      .select()
      .from("photos")
      .join("users", "photos.user_id", "users.id")
      .where("photos.user_id", id)
      .orderBy("updated_at", "desc");
    return photos;
  }

  async getPhotosByDistrict(district: string) {
    // select  image, username, photos.updated_at,photos.id,title,description,photos.district,location from photos join users on users.id = photos.user_id
    // where photos.district = 'Tsuen Wan'
    // order by updated_at DESC

    const photos: IPhoto[] = await this.knex
      .column(
        "users.username",
        "photos.image",
        "photos.updated_at",
        "photos.id",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.status",
        "photos.environment"
      )
      .select()
      .from("photos")
      .join("users", "photos.user_id", "users.id")
      .where("photos.district", district)
      .orderBy("updated_at", "desc");
    return photos;
  }

  async getPhotosByComments() {
    // select  photos.image, users.username, photos.updated_at,photos.id ,count(comments.id) as total_comment, title,description,district,location from photos join users on users.id = photos.user_id
    // left join comments on comments.photo_id = photos.id
    // group by photos.image, users.username, photos.updated_at,photos.id, title,description,district,location
    //    order by total_comment DESC
    const photos = await this.knex
      .column(
        "users.username",
        "photos.id",
        "photos.image",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.updated_at",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .count("comments.id as total_comment")
      .select()
      .from("photos")
      .join("users", "photos.user_id", "users.id")
      .leftJoin("comments", "comments.photo_id", "photos.id")
      .groupBy(
        "users.username",
        "photos.id",
        "photos.image",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.updated_at",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .orderBy("total_comment", "desc");

    return photos;
  }

  async getPhotosByLikes() {
    // select  photos.image, users.username, photos.updated_at,photos.id ,count(likes.id) as total_like, title,description,district,location from photos join users on users.id = photos.user_id
    // left join likes on likes.photo_id = photos.id
    // group by photos.image, users.username, photos.updated_at,photos.id, title,description,district,location
    //   order by total_like DESC

    const photos = await this.knex
      .column(
        "users.username",
        "photos.id",
        "photos.image",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.updated_at",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .count("likes.id as total_like")
      .select()
      .from("photos")
      .join("users", "photos.user_id", "users.id")
      .leftJoin("likes", "likes.photo_id", "photos.id")
      .groupBy(
        "users.username",
        "photos.id",
        "photos.image",
        "photos.title",
        "photos.description",
        "photos.district",
        "photos.location",
        "photos.updated_at",
        "photos.user_id",
        "photos.status",
        "photos.environment"
      )
      .orderBy("total_like", "desc");

    return photos;
  }

  async getLikedPhotos(userId: number) {
    const result = await this.knex
      .column("photos.id", "likes.user_id")
      .select()
      .from("photos")
      .join("likes", "likes.photo_id", "photos.id")
      .where("likes.user_id", userId);
    console.log(result);
    return result;
  }

  // ts by Woody, revised by CHiT
  async addPhotos(
    body: {
      photo_title: string;
      photo_description: string;
      photo_created_at: Date;
      photo_district: string;
      photo_location: string;
      photo_latitude: number;
      photo_longitude: number;
      photo_userId: number;
      photo_environment: string;
      photo_status: string;
    },
    filename: string
  ) {
    const [photoId] = await this.knex("photos")
      .insert({
        title: body.photo_title,
        description: body.photo_description,
        district: body.photo_district,
        created_at: body.photo_created_at,
        updated_at: new Date(),
        location: body.photo_location,
        latitude: body.photo_latitude,
        longitude: body.photo_longitude,
        user_id: body.photo_userId,
        image: filename,
        environment: body.photo_environment,
        status: body.photo_status,
      })
      .returning("id");
    return photoId as number;
  }

  //ts by Woody
  async updatePhoto(title: string, photoId: number) {
    await this.knex("photos").update("title", title).where("id", photoId);
  }

  async deletePhoto(photoId: number) {
    await this.knex("comments").delete().where("photo_id", photoId);
    await this.knex("likes").delete().where("photo_id", photoId);
    await this.knex("photos").delete().where("id", photoId);
  }
}
