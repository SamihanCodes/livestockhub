CREATE TABLE interests (
  id SERIAL PRIMARY KEY,
  listing_id INT NOT NULL,
  buyer_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_listing
    FOREIGN KEY (listing_id)
    REFERENCES listings(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_buyer
    FOREIGN KEY (buyer_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_interest
    UNIQUE (listing_id, buyer_id)
);
