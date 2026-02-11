CREATE TABLE medicine_disease_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL,
  disease_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_medicine
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE,
  CONSTRAINT fk_disease
    FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE,
  CONSTRAINT unique_medicine_disease UNIQUE (medicine_id, disease_id)
);