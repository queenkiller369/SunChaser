create table  users(
    id SERIAL primary key,
    username varchar(255),
    password varchar(255),
    name varchar(255),
    created_at timestamp,
    updated_at timestamp
)

craete table photos(
    id SERIAL primary key,
    title VARCHAR(255) NOT NULL,
    description varchar(255),
    user_id integer,
    foreign key (user_id) references users(id),
    location_id integer,
    foreign key(locations_id) references locations(id),
    created_at timestamp,
    updated_at timestamp,
    likes integer
)

create table locations (
    id SERIAL primary key,
    latitude float,
    longtitude float,
    districts varchar(255)
)

create table commemnts (
    id SERIAL primary key,
    content varchar(255),
    photo_id INTEGER,
    foreign key (photo_id) references photos(id),
    user_id INTEGER,
    foreign key (user_id) references users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

getRecentPhotos
select  filename, username, photos.created_at from photos join users on users.id = photos.user_id
join  districts on districts.id = photos.district_id


addPhotos 
insert into photos (filename, title, description,  cretaed_at, updated_at ,user_id, district_id, latitude, longitude)
values 


select  image, username, photos.updated_at,photos.id,title,description,district,location,  from photos 
join users on users.id = photos.user_id
join comments on comments.photo_id = photos.id

select photos.id, comments.content, comments.id, count(comments.id) as total_comments from photos join comments on comments.photo_id = photos.id group by photos.id
