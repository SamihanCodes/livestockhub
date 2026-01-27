const pool = require("../config/db");

// ✅ Create new listing (WITH IMAGES)
const createListing = async (
  seller_id,
  animal_type,
  breed,
  age,
  price,
  description,
  images
) => {
  const query = `
    INSERT INTO listings 
    (seller_id, animal_type, breed, age, price, description, images)
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
    RETURNING *;
  `;

  const values = [
    seller_id,
    animal_type,
    breed,
    age,
    price,
    description,
    JSON.stringify(images),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};



// ✅ Get all active listings with highest bid (BUYERS)
const getAllListingsWithHighestBid = async () => {
  const query = `
    SELECT 
      listings.*,
      users.name AS seller_name,
      COALESCE(MAX(bids.amount), 0) AS highest_bid
    FROM listings
    JOIN users ON listings.seller_id = users.id
    LEFT JOIN bids ON listings.id = bids.listing_id
    WHERE listings.status = 'active'
    GROUP BY listings.id, users.name
    ORDER BY listings.created_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

// ✅ Get listings by seller
const getListingsBySeller = async (seller_id) => {
  const query = `
    SELECT *
    FROM listings
    WHERE seller_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [seller_id]);
  return result.rows;
};

// ✅ Update listing status (seller only)
const updateListingStatus = async (listing_id, seller_id, status) => {
  const query = `
    UPDATE listings
    SET status = $1
    WHERE id = $2 AND seller_id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [
    status,
    listing_id,
    seller_id,
  ]);

  return result.rows[0];
};

// ✅ Update listing details (EDIT LISTING)
const updateListing = async (
  id,
  seller_id,
  animal_type,
  breed,
  age,
  price,
  description
) => {
  const query = `
    UPDATE listings
    SET
      animal_type = $1,
      breed = $2,
      age = $3,
      price = $4,
      description = $5
    WHERE id = $6 AND seller_id = $7
    RETURNING *;
  `;

  const values = [
    animal_type,
    breed,
    age,
    price,
    description,
    id,
    seller_id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// ✅ Advanced search & filter listings
const searchListings = async (filters) => {
  let query = `
    SELECT 
      listings.*,
      COALESCE(MAX(bids.amount), 0) AS highest_bid
    FROM listings
    LEFT JOIN bids ON listings.id = bids.listing_id
    WHERE listings.status = 'active'
  `;

  const values = [];
  let idx = 1;

  if (filters.animal_type) {
    query += ` AND listings.animal_type ILIKE $${idx++}`;
    values.push(`%${filters.animal_type}%`);
  }

  if (filters.breed) {
    query += ` AND listings.breed ILIKE $${idx++}`;
    values.push(`%${filters.breed}%`);
  }

  if (filters.minPrice) {
    query += ` AND listings.price >= $${idx++}`;
    values.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    query += ` AND listings.price <= $${idx++}`;
    values.push(filters.maxPrice);
  }

  query += `
    GROUP BY listings.id
    ORDER BY listings.created_at DESC;
  `;

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  createListing,
  getAllListingsWithHighestBid,
  getListingsBySeller,
  updateListingStatus,
  updateListing,
  searchListings,
};
