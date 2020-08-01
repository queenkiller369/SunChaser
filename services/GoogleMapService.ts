import Knex from "knex";
import { MapMarkers } from "./models";
// import { MapMakersConfig } from "./models";

export class GoogleMapService {
    constructor(private knex: Knex) {}

    // select photos.id, photos.image, photos.title, photos.description, photos.location, photos.district, photos.updated_at, photos.latitude, photos.longitude, users.username from photos left join users on photos.user_id = users.id order by photos.updated_at desc;

    async getMarkers(){
        const mapMarkers: MapMarkers[] = await this.knex
        .select("photos.id", "photos.image", "photos.title", "photos.description", "photos.location", "photos.district", "photos.created_at", "photos.latitude", "photos.longitude", "photos.status", "photos.environment", "users.username")
        .from("photos")
        .leftJoin("users", "photos.user_id", "users.id")
        .orderBy("created_at", "desc");
        // console.log(mapMarkers);
        return mapMarkers;
    }

}