const listingModel = require("../models/listingModel");

// ✅ CREATE LISTING (WITH IMAGES)
const createListing = async (req, res) => {
  try {
    // 🔍 DEBUG (keep for now, remove later)
   console.log("FILES STRINGIFIED:", JSON.stringify(req.files, null, 2));
console.log("FILES RAW:", req.files);


    const seller_id = req.user.id;
    const { animal_type, breed, age, price, description } = req.body;

    // 🛑 Basic validation
    if (!animal_type || !price) {
      return res.status(400).json({
        message: "Animal type and price are required",
      });
    }

    // 🖼️ Cloudinary image paths
    const images = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    const listing = await listingModel.createListing(
      seller_id,
      animal_type,
      breed || null,
      age || null,
      price,
      description || null,
      images
    );

    res.status(201).json(listing);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

// ✅ GET ALL ACTIVE LISTINGS (BUYERS)
const getAllListings = async (req, res) => {
  try {
    const listings =
      await listingModel.getAllListingsWithHighestBid();
    res.status(200).json(listings);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

// ✅ GET SELLER'S OWN LISTINGS
const getMyListings = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const listings = await listingModel.getListingsBySeller(seller_id);
    res.status(200).json(listings);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

// ✅ UPDATE LISTING STATUS
const updateListingStatus = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "sold"].includes(status)) {
      return res.status(400).json({
        message: "Status must be 'active' or 'sold'",
      });
    }

    const updatedListing =
      await listingModel.updateListingStatus(
        id,
        seller_id,
        status
      );

    if (!updatedListing) {
      return res
        .status(404)
        .json({ message: "Not found or unauthorized" });
    }

    res.json(updatedListing);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

// ✅ EDIT LISTING DETAILS (NO IMAGE CHANGE HERE)
const updateListing = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { id } = req.params;
    const { animal_type, breed, age, price, description } = req.body;

    const updated = await listingModel.updateListing(
      id,
      seller_id,
      animal_type,
      breed,
      age,
      price,
      description
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Not found or unauthorized" });
    }

    res.json(updated);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

// ✅ SEARCH & FILTER LISTINGS
const searchListings = async (req, res) => {
  try {
    const { animal_type, minPrice, maxPrice, breed } = req.query;

    const listings = await listingModel.searchListings({
      animal_type,
      minPrice,
      maxPrice,
      breed,
    });

    res.status(200).json(listings);
  } catch (error) {
  console.error("Create listing error FULL:", {
    message: error.message,
    stack: error.stack,
    pg: error
  });
  return res.status(500).json({ error: error.message });
}

};

module.exports = {
  createListing,
  getAllListings,
  getMyListings,
  updateListingStatus,
  updateListing,
  searchListings,
};
