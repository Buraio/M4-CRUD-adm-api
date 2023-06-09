CREATE DATABASE user_adm_permission;

CREATE TABLE IF NOT EXISTS users(
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(120) NOT NULL,
  "admin" BOOLEAN NOT NULL DEFAULT FALSE,
  "active" BOOLEAN NOT NULL DEFAULT TRUE
);

SELECT * FROM users
WHERE "email" = %L;

INSERT INTO
  users(%I)
VALUES(%L)
RETURNING id, name, email, admin, active;

SELECT * FROM users
WHERE "email" = $1;

UPDATE users
SET "active" = FALSE
WHERE "id" = $1 AND "active" = TRUE;

UPDATE users
SET "active" = TRUE
WHERE "id" = $1 AND "active" = FALSE;

UPDATE users
SET(%I) = ROW(%L)
WHERE "id" = $1 AND "active" = TRUE;