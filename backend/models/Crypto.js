const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a cryptocurrency name'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Please provide a symbol'],
      trim: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    change24h: {
      type: Number,
      required: [true, 'Please provide 24h change percentage'],
    },
    marketCap: {
      type: Number,
      default: 0,
    },
    volume24h: {
      type: Number,
      default: 0,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Crypto', cryptoSchema);
