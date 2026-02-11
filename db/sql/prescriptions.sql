CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  doctor_name VARCHAR(150),
  prescription_image TEXT NOT NULL,
  extracted_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_prescription_user
    FOREIGN KEY (user_id) REFERENCES users(id)
);
