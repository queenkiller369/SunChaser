// ts by Woody
export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
}

// ts by Tony
export interface IPhoto {
  id: number;
  image: string;
  username: string;
  title: string;
  updated_at: Date;
  description: string;
  location: string;
  district: string;
  latitude: number;
  longitude: number;
  total_comment: number;
}


export interface ICommentAndLike {
  id: number;
  content: string;
  total_comments: number;
  total_likes: number;
}


// ts by CHiT
export interface MapMarkers{
  id: number;
  image: string;
  title: string;
  description: string;
  location: string;
  district: string;
  created_at: Date;
  user_id: number;
  latitude: number;
  longitude: number;
  username: string;
}
