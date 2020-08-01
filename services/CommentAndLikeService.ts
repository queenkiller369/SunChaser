import Knex from "knex";
// import { ICommentAndLike } from "./models";

//ts by Tony
export class CommentAndLikeService {
  constructor(private knex: Knex) {}

  async getTotalComments() {
    // select photos.id, count(comments.id) as total_comments from photos
    // join comments on comments.photo_id = photos.id
    // group by photos.id
    const comments = await this.knex
      .column("photos.id")
      .select()
      .count("comments.id as total_comments")
      .from("photos")
      .join("comments", "photos.id", "comments.photo_id")
      .groupBy("photos.id");
    return comments;
  }

  async getTotalLikes() {
    // select photos.id, count(comments.id) as total_comments from photos
    // join comments on comments.photo_id = photos.id
    // group by photos.id
    const likes = await this.knex
      .column("photos.id")
      .select()
      .count("likes.id as total_likes")
      .from("photos")
      .join("likes", "photos.id", "likes.photo_id")
      .groupBy("photos.id");
    return likes;
  }

  async likePhoto(photoId: number, userId: number) {
    const result = await this.knex("likes").insert({
      photo_id: photoId,
      user_id: userId,
    });
    return result;
  }

  async unLikePhoto(photoId: number, userId: number) {
    const result = await this.knex("likes")
      .del()
      .where("photo_id", photoId)
      .where("user_id", userId);
    return result;
  }

  async getCommentsByPhotoId(photoId: number) {
    const result = this.knex
      .column("comments.*", "users.username")
      .select()
      .from("comments")
      .join("users", "comments.user_id", "users.id")
      .where("photo_id", photoId)
      .orderBy("created_at", "asc");
    return result;
  }

  async commentPhoto(content: string, photoId: number, userId: number) {
    const [commentId] = await this.knex("comments")
      .insert({
        content,
        photo_id: photoId,
        user_id: userId,
      })
      .returning("id");
    return commentId as number;
  }

  //   async updateCommentAndLikes(title: string, photoID: number) {
  //     await this.knex("photos").update("title", title).where("id", photoID);
  //   }

  async deleteComments(commentId: number) {
    await this.knex("comments").del().where("id", commentId);
  }
}
