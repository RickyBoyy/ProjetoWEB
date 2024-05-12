-- Insert data into the user table
INSERT INTO "user" (user_name, user_password, user_description, profile_pic)
VALUES
  ('john_doe', 'password123', 'Sample user description', 'john_doe.jpg'),
  ('jane_smith', 'password456', 'Another user description', 'jane_smith.jpg'),
  ('mike_jackson', 'password789', 'Yet another user description', 'mike_jackson.jpg');

-- Insert data into the games table
INSERT INTO games (game_name, game_description, game_cover, game_rating)
VALUES
  ('Game A', 'Sample game description', 'game_a_cover.jpg', 4),
  ('Game B', 'Another game description', 'game_b_cover.jpg', 5),
  ('Game C', 'Yet another game description', 'game_c_cover.jpg', 3);

-- Insert data into the tags table
INSERT INTO tags (tag_name)
VALUES
  ('Action'),
  ('Adventure'),
  ('RPG');

-- Insert data into the tag_utilizador table
INSERT INTO tag_utilizador (utilizador_id, tag_id)
VALUES
  (1, 1), -- user_id 1 tagged with tag_id 1
  (2, 2), -- user_id 2 tagged with tag_id 2
  (3, 3); -- user_id 3 tagged with tag_id 3

-- Insert data into the tag_game table
INSERT INTO tag_game (game_id, tag_game_id)
VALUES
  (1, 1), -- game_id 1 tagged with tag_id 1
  (2, 2), -- game_id 2 tagged with tag_id 2
  (3, 3); -- game_id 3 tagged with tag_id 3

-- Insert data into the tag_community table
INSERT INTO tag_community (community_id, tag_community_id)
VALUES
  (1, 1), -- community_id 1 tagged with tag_id 1
  (2, 2), -- community_id 2 tagged with tag_id 2
  (3, 3); -- community_id 3 tagged with tag_id 3

-- Insert data into the community table
INSERT INTO community (community_name, community_description)
VALUES
  ('Community A', 'Sample community description'),
  ('Community B', 'Another community description'),
  ('Community C', 'Yet another community description');

-- Insert data into the post table
INSERT INTO post (post_title, post_url, user_id, community_id)
VALUES
  ('Post 1', 'http://example.com/post1', 1, 1), -- post by user_id 1 in community_id 1
  ('Post 2', 'http://example.com/post2', 2, 2), -- post by user_id 2 in community_id 2
  ('Post 3', 'http://example.com/post3', 3, 3); -- post by user_id 3 in community_id 3

-- Insert data into the reviews table
INSERT INTO reviews (review_description, review_rating, user_id, game_id)
VALUES
  ('Great game!', 5, 1, 1), -- review by user_id 1 for game_id 1
  ('Awesome game!', 4, 2, 2), -- review by user_id 2 for game_id 2
  ('Not bad', 3, 3, 3); -- review by user_id 3 for game_id 3

-- Insert data into the videos table
INSERT INTO videos (video_title, video_description, game_id)
VALUES
  ('Video 1', 'Sample video description', 1), -- video for game_id 1
  ('Video 2', 'Another video description', 2), -- video for game_id 2
  ('Video 3', 'Yet another video description', 3); -- video for game_id 3
