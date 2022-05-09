-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around TEXT NOT NULL,
  galaxy INT NOT NULL REFERENCES galaxies(id)
  moons TEXT[]
);

INSERT INTO galaxies (name) VALUES ('Milky Way');

INSERT INTO planets
  (name, orbital_period_in_years, orbits_around, galaxy, moons)
VALUES
  ('Earth', 1.00, 'The Sun', '{"The Moon"}'),
  ('Mars', 1.88, 'The Sun', '{"Phobos", "Deimos"}'),
  ('Venus', 0.62, 'The Sun', '{}'),
  ('Neptune', 164.8, 'The Sun', '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
  ('Proxima Centauri b', 0.03, 'Milky Way', '{}'),
  ('Gliese 876 b', 0.23, 'Gliese 876', '{}');