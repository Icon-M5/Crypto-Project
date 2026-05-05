const Crypto = require('../models/Crypto');

// @desc    Get all cryptocurrencies
// @route   GET /api/crypto
// @access  Public
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({}).sort({ marketCap: -1 });
    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching cryptocurrencies',
      error: error.message,
    });
  }
};

// @desc    Get top gainers (highest 24h change)
// @route   GET /api/crypto/gainers
// @access  Public
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } })
      .sort({ change24h: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching top gainers',
      error: error.message,
    });
  }
};

// @desc    Get new listings (most recently added)
// @route   GET /api/crypto/new
// @access  Public
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find({})
      .sort({ addedAt: -1, createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching new listings',
      error: error.message,
    });
  }
};

// @desc    Add a new cryptocurrency
// @route   POST /api/crypto
// @access  Public
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate required fields
    if (!name || !symbol || price === undefined || !image || change24h === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, symbol, price, image, change24h',
      });
    }

    // Check if crypto with same symbol already exists
    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(400).json({
        success: false,
        message: `A cryptocurrency with symbol "${symbol.toUpperCase()}" already exists`,
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
      price: parseFloat(price),
      image,
      change24h: parseFloat(change24h),
      addedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: `${name} (${symbol.toUpperCase()}) added successfully`,
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error adding cryptocurrency',
      error: error.message,
    });
  }
};

// @desc    Get single crypto by ID
// @route   GET /api/crypto/:id
// @access  Public
const getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found',
      });
    }
    res.status(200).json({
      success: true,
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching cryptocurrency',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
  getCryptoById,
};
