CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS rsvps;
DROP TABLE IF EXISTS hotspots;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id serial PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL
);

CREATE TABLE events(
    id serial PRIMARY KEY,
    date date NOT NULL,
    location GEOGRAPHY(Point, 4326),
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE hotspots(
    id serial PRIMARY KEY,
    location GEOGRAPHY(Point, 4326),
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE rsvps(
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id int NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    status text NOT NULL,
    PRIMARY KEY (user_id, event_id)
);

CREATE TABLE favorites(
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id int NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, event_id)
)
