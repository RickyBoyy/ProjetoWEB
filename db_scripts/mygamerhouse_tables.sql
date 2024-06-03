
CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_displayname VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_description text,
  profile_pic VARCHAR(255)
);
CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  game_name VARCHAR(100) NOT NULL,
  game_description Text not null,
  game_cover VARCHAR(255) NOT NULL,
  game_rating INT NOT NULL
);

CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  tag_name VARCHAR(50) NOT NULL
);

CREATE TABLE tag_utilizador (
  utilizador_id INT NOT NULL,
  tag_id INT NOT NULL,
  CONSTRAINT tag_utilizador_fk_user FOREIGN KEY (utilizador_id) REFERENCES user(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT tag_utilizador_fk_tags FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE tag_game (
  game_id INT NOT NULL,
  tag_game_id INT NOT NULL,
  CONSTRAINT tag_game_fk_games FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT tag_game_fk_tags FOREIGN KEY (tag_game_id) REFERENCES tags(tag_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

Create table Events (
  event_id SERIAL PRIMARY key,
  event_name VARCHAR(50) not null,
  event_img text,
  event_location geometry,
  event_time Timestamp,
  event_description text,
  event_user_id int not null,
  CONSTRAINT event_fk_user FOREIGN key (event_user_id) REFERENCES "user"(user_id)

);

CREATE TABLE community (
  community_id SERIAL PRIMARY KEY,
  community_name VARCHAR(50) NOT NULL,
  community_description Text not null,
  community_user_id int not null,
  community_image text,
  CONSTRAINT community_fk_user FOREIGN KEY (community_user_id) REFERENCES "user"(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION

);

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  post_title VARCHAR(50) NOT NULL,
  post_url VARCHAR(255),
  user_id INT NOT NULL,
  community_id INT NOT NULL,
  CONSTRAINT post_fk_user FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT post_fk_community FOREIGN KEY (community_id) REFERENCES community(community_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE Table reviews (

  review_id SERIAL PRIMARY KEY,
  review_description Text not null,
  review_rating int not null,
  user_id int not null,
  game_id int not null,
  CONSTRAINT review_fk_user FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT review_fk_game FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE NO ACTION ON UPDATE NO ACTION



);
Create table Events (
  event_id SERIAL PRIMARY key,
  event_name VARCHAR(50) not null,
  event_img text,
  event_location geometry,
  event_time Timestamp,
  event_description text,
  event_user_id int not null,
  CONSTRAINT event_fk_user FOREIGN key (event_user_id) REFERENCES "user"(user_id)

);

