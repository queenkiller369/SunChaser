// ts by CHiT

import { Request, Response } from "express";
import { GoogleMapService } from "../services/GoogleMapService";

export class GoogleMapController{
    constructor(private googleMapService: GoogleMapService){}

    getMarkers = async (req: Request, res: Response) => {
        try {
            const markers = await this.googleMapService.getMarkers();
            res.json(markers);
            
          } catch (e) {
            console.error(e.message);
          }
    };

}


