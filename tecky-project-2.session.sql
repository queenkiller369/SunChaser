select  filename, username, photos.created_at, photos.id from photos join users on users.id = photos.user_id
join  comments on comments.user_id = photos.user_id
join likes on likes.user_id = photos.user_id;



select * from photos join users on users.id = photos.user_id
join  districts on districts.id = photos.district_id

select photos.id, count(comments.id) as total_comments from photos 
join comments on comments.photo_id = photos.id
group by photos.id



select  image, username, photos.updated_at,photos.id,title,description,district,
location from photos join users on users.id = photos.user_id

select photos.id, comments.content, comments.id, count(comments.id) as total_comments from photos join comments on comments.photo_id = photos.id group by photos.id
