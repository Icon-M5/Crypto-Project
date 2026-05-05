const express = require('express');
const router = express.Router();
const {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
  getCryptoById,
} = require('../controllers/cryptoController');

// Specific routes must come before parameterized routes
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);

// General CRUD routes
router.route('/').get(getAllCryptos).post(addCrypto);
router.get('/:id', getCryptoById);

module.exports = router;
