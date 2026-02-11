CREATE TABLE diseases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disease_name VARCHAR(150) UNIQUE NOT NULL,
  symptoms TEXT NOT NULL,
  description TEXT,
  severity_level VARCHAR(20)
    CHECK (severity_level IN ('mild','moderate','severe')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
