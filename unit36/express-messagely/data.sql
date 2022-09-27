DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL DEFAULT NOW(),
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL DEFAULT NOW(),
    read_at timestamp with time zone
);


INSERT INTO users (username, password, first_name, last_name, phone)
  VALUES ('batman', 'batpass', 'Bruce', 'Wayne', '333-333-3333'),
         ('harley', 'hahalaughpass', 'Harley', 'Quinn', '333-444-4444');

INSERT INTO messages (from_username, to_username, body)
    VALUES ('batman', 'harley', 'This is message a message to Harley'),
           ('harley', 'batman', 'Message to Batman goes here');

