CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount NUMERIC(10,2) CHECK (total_amount >= 0),
  payment_method VARCHAR(30)
    CHECK (payment_method IN ('COD','UPI','CARD')),
  payment_status VARCHAR(30)
    CHECK (payment_status IN ('pending','paid','failed')),
  order_status VARCHAR(30)
    CHECK (order_status IN ('placed','shipped','delivered','cancelled')),
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
);
