const pool = require("../config/db");

// Buyer shows interest in a listing
const createInterest = async (listing_id, buyer_id) => {
  const query = `
    INSERT INTO interests (listing_id, buyer_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [
    listing_id,
    buyer_id,
  ]);

  return result.rows[0];
};

// Seller views interests on their listings
const getInterestsBySeller = async (seller_id) => {
  const query = `
    SELECT 
      interests.id,
      interests.created_at,
      users.name AS buyer_name,
      users.email AS buyer_email,
      listings.animal_type,
      listings.price
    FROM interests
    JOIN listings ON interests.listing_id = listings.id
    JOIN users ON interests.buyer_id = users.id
    WHERE listings.seller_id = $1
    ORDER BY interests.created_at DESC;
  `;

  const result = await pool.query(query, [seller_id]);
  return result.rows;
};

module.exports = {
  createInterest,
  getInterestsBySeller,
};