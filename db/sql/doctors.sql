CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_name VARCHAR(150) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  qualification VARCHAR(100),
  experience_years INT CHECK (experience_years >= 0),
  phone VARCHAR(15) UNIQUE,
  email VARCHAR(150) UNIQUE,
  clinic_address TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
