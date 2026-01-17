const pool = require("../config/db");

// Buyer places a bid
const createBid = async (listing_id, buyer_id, amount) => {
  const query = `
    INSERT INTO bids (listing_id, buyer_id, amount)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [listing_id, buyer_id, amount]);
  return result.rows[0];
};

// Seller views bids on their listings
const getBidsBySeller = async (seller_id) => {
  const query = `
    SELECT 
      bids.id,
      bids.amount,
      bids.status,
      bids.created_at,
      users.email AS buyer_email,
      listings.animal_type,
      listings.price AS listing_price
    FROM bids
    JOIN listings ON bids.listing_id = listings.id
    JOIN users ON bids.buyer_id = users.id
    WHERE listings.seller_id = $1
    ORDER BY bids.amount DESC, bids.created_at DESC;
  `;
  const result = await pool.query(query, [seller_id]);
  return result.rows;
}
const acceptBid = async (bid_id, seller_id) => {
  const query = `
    UPDATE bids
    SET status = 'accepted'
    WHERE id = $1
      AND listing_id IN (
        SELECT id FROM listings WHERE seller_id = $2
      )
    RETURNING *;
  `;
  const result = await pool.query(query, [bid_id, seller_id]);
  return result.rows[0];
};


module.exports = {
  createBid,
  getBidsBySeller,
  acceptBid,
};
