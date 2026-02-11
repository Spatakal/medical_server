CREATE TABLE medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name VARCHAR(150) NOT NULL,
  brand_name VARCHAR(100),
  category VARCHAR(50),
  salt_composition TEXT NOT NULL,
  strength VARCHAR(50),
  price NUMERIC(10,2) CHECK (price >= 0),
  stock_quantity INT CHECK (stock_quantity >= 0),
  expiry_date DATE,
  requires_prescription BOOLEAN DEFAULT false,
  usage_instructions TEXT,
  side_effects TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
