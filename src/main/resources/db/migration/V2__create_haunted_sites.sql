CREATE TABLE IF NOT EXISTS haunted_sites (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  img_url TEXT NOT NULL,
  website_url TEXT,
  coordinates VARCHAR
)