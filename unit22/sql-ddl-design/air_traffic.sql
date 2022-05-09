-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id VARCHAR(3) PRIMARY KEY,
  name TEXT NOT NULL,
  country INT NOT NULL REFERENCES countries(id)
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INT NOT NULL REFERENCES airlines(id) ON DELETE SET NULL,
  origin VARCHAR(3) NOT NULL REFERENCES cities(id) ON DELETE SET NULL,
  destination VARCHAR(3) NOT NULL REFERENCES cities(id) ON DELETE SET NULL,
  international BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO airlines (name)
VALUES
  ('United'), ('British Airways'), ('Delta'), ('TUI Fly Belgium'),
  ('Air China'), ('American Airlines'), ('Avianca Brasil');

INSERT INTO countries (name)
VALUES
  ('United States'),('Japan'), ('France'), ('UAE'), ('Brazil'),
  ('United Kingdom'), ('Mexico'), ('Morocco'), ('China'), ('Chile');

INSERT INTO cities (id, name, country)
VALUES
  ('WAS', 'Washington DC', 1),
  ('TYO', 'Tokyo', 2),
  ('LAX', 'Los Angeles', 1),
  ('PAR', 'Paris', 3),
  ('DXB', 'Dubai', 4),
  ('NYC', 'New York', 1),
  ('CID', 'Cedar Rapids', 1),
  ('CLT', 'Charlotte', 1),
  ('GRU', 'Sao Paolo', 5),
  ('SEA', 'Seattle', 1),
  ('LON', 'London', 6),
  ('LAS', 'Las Vegas', 1),
  ('MEX', 'Mexico City', 7),
  ('CAS', 'Casablanca', 8),
  ('PEK', 'Beijing', 9),
  ('CHI', 'Chicago', 1),
  ('MSY', 'New Orleans', 1),
  ('SCL', 'Santiago', 10);

INSERT INTO tickets
   (first_name, last_name, seat, departure, arrival, airline_id, origin, destination, international)
VALUES
  ('Jennifer', 'Finch', '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 'WAS', 'SEA', false),
  ('Thadeus', 'Gathercoal', '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 'TYO', 'LON', true),
  ('Sonja', 'Pauley', '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 'LAX', 'LAS', false),
  ('Jennifer', 'Finch', '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 'SEA', 'MEX', true),
  ('Waneta', 'Skeleton', '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 'PAR', 'CAS', false),
  ('Thadeus', 'Gathercoal', '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 'DXB', 'PEK', true),
  ('Berkie', 'Wycliff', '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 'NYC', 'CLT', false),
  ('Alvin', 'Leathes', '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 'CID', 'CHI', false),
  ('Berkie', 'Wycliff', '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 'CLT', 'MSY', false),
  ('Cory', 'Squibbes', '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 'GRU', 'SCL', true);