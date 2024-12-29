CREATE TABLE terms
(
    id          serial PRIMARY KEY,
    title       varchar(255) NOT NULL,
    description text,
    source      text
);

CREATE TABLE relationships
(
    id serial PRIMARY KEY,
    source_id int NOT NULL REFERENCES terms (id) on delete CASCADE,
    target_id int NOT NULL REFERENCES terms (id) on delete CASCADE,
    relation  varchar(255),
    unique (source_id, target_id)
);
