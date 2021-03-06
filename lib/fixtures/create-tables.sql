-- Create table
CREATE TABLE IF NOT EXISTS organisations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  mission_statement TEXT,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS organisations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  mission_statement TEXT,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  user_type VARCHAR(100) NOT NULL CHECK (user_type IN ('admin', 'content-owner', 'primary', 'secondary', 'view-only')),
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(100),
  password VARCHAR(100),
  org_id INTEGER REFERENCES organisations (id),
  job_title VARCHAR(80),
  last_login BIGINT,
  active BOOLEAN NOT NULL,
  logo_url TEXT,
  account_activated BOOLEAN NOT NULL,
  notification_email BOOLEAN NOT NULL DEFAULT true,
  consent BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false
);

-- Create table
CREATE TABLE IF NOT EXISTS challenges (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  org_id INTEGER REFERENCES organisations (id) NOT NULL,
  creator_id INTEGER REFERENCES people (id) NOT NULL,
  active BOOLEAN NOT NULL
);

-- Create table
CREATE TABLE IF NOT EXISTS tags_challenges (
  tags_id INTEGER,
  challenges_id INTEGER REFERENCES challenges (id) on delete cascade on update cascade
);

-- Create table
CREATE TABLE IF NOT EXISTS locations_challenges (
  locations_id INTEGER,
  challenges_id INTEGER REFERENCES challenges (id)
);

-- Create table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  author_id INTEGER REFERENCES people (id),
  comment TEXT NOT NULL,
  flagged BOOLEAN NOT NULL,
  author_flag INTEGER REFERENCES people (id),
  challenge_id INTEGER REFERENCES challenges (id),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  active BOOLEAN NOT NULL
);
