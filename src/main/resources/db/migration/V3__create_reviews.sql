CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255),
  rating INTEGER NOT NULL,
  comment TEXT,
  haunted_site_id BIGINT REFERENCES haunted_sites(id)
);