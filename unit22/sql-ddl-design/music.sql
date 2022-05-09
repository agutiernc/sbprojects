-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
)

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_date DATE NOT NULL,
  producer_id INT REFERENCES producers(id) ON DELETE SET NULL,
  artist_id INT REFERENCES artists(id) ON DELETE SET NULL
)

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
)

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  album_id INT REFERENCES albums(id) ON DELETE SET NULL,
);

INSERT INTO artists (name)
VALUES
  ('Hanson'), ('Queen'), ('Mariah Carey'), ('Boyz II Men'),
  ('Lady Gaga'), ('Bradley Cooper'), ('Nickelback'), ('Jay Z'),
  ('Alicia Keys'), ('Katy Perry'), ('Juicy J'), ('Maroon 5'),
  ('Christina Aguilera'), ('Avril Lavigne'), ('Destiny''s Child');

INSERT INTO albums (title)
VALUES
  ('Middle of Nowhere', '04-15-1997'),
  ('A Night at the Opera', '10-31-1975'),
  ('Daydream', '11-14-1995'),
  ('A Star Is Born', '09-27-2018'),
  ('Silver Side Up', '08-21-2001'),
  ('The Blueprint 3', '10-20-2009'),
  ('Prism', '12-17-2013'),
  ('Hands All Over', '06-21-2011'),
  ('Let Go', '05-14-2002'),
  ('The Writing''s on the Wall', '11-07-1999');

INSERT INTO producers (name)
VALUES
  ('Dust Brothers'), ('Stephen Lironi'), ('Roy Thomas Baker'), ('Walter Afanasieff'),
  ('Benjamin Rice'), ('Rick Parashar'), ('Al Shux'), ('Max Martin'),
  ('Cirkut'), ('Shellback'), ('Benny Blanco'), ('The Matrix'),
  ('Darkchild');


IINSERT INTO songs
  (title, duration_in_seconds, release_date, album_id)
VALUES
  ('MMMBop', 238, '04-15-1997', 1),
  ('Bohemian Rhapsody', 355, '10-31-1975', 2),
  ('One Sweet Day', 282, '11-14-1995', 3),
  ('Shallow', 216, '09-27-2018', 4),
  ('How You Remind Me', 223, '08-21-2001', 5),
  ('New York State of Mind', 276, '10-20-2009', 6),
  ('Dark Horse', 215, '12-17-2013', 7),
  ('Moves Like Jagger', 201, '06-21-2011', 8),
  ('Complicated', 244, '05-14-2002', 9),
  ('Say My Name', 240, '11-07-1999', 10);