SELECT photos.id, photos.image, users.username, photos.updated_at,
photos.title, photos.description, photos.district, 
photos.location, likes.user_id
FROM photos INNER JOIN users 
ON photos.user_id = users.id
LEFT JOIN likes ON likes.photo_id = photos.id
ORDER BY updated_at DESC;

GROUP BY image, username, photos.updated_at, photos.id,
title, description, district, location 