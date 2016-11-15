
-- Delete tables
DROP TABLE IF EXISTS challenges_tags;
DROP TABLE IF EXISTS challenges;

-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  org_id INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table
-- CREATE TABLE IF NOT EXISTS challenges_tags (
--   tag_id INTEGER REFERENCES tags (id),
--   challenge_id INTEGER REFERENCES challenges (id)
-- );
