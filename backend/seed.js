const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Crypto = require('./models/Crypto');

dotenv.config();

const cryptoData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 96432.51,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: 2.34,
    marketCap: 1900000000000,
    volume24h: 28000000000,
    addedAt: new Date('2024-01-01'),
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: 1.85,
    marketCap: 415000000000,
    volume24h: 15000000000,
    addedAt: new Date('2024-01-01'),
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 1.0,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    change24h: 0.01,
    marketCap: 95000000000,
    volume24h: 45000000000,
    addedAt: new Date('2024-01-15'),
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    price: 612.45,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    change24h: 3.12,
    marketCap: 94000000000,
    volume24h: 1800000000,
    addedAt: new Date('2024-02-01'),
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 178.92,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: 5.67,
    marketCap: 82000000000,
    volume24h: 3200000000,
    addedAt: new Date('2024-02-15'),
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 2.18,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    change24h: -1.23,
    marketCap: 125000000000,
    volume24h: 5600000000,
    addedAt: new Date('2024-01-10'),
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.72,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    change24h: 4.56,
    marketCap: 25000000000,
    volume24h: 890000000,
    addedAt: new Date('2024-03-01'),
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 38.45,
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    change24h: 7.89,
    marketCap: 15000000000,
    volume24h: 750000000,
    addedAt: new Date('2024-03-15'),
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.165,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    change24h: -2.45,
    marketCap: 24000000000,
    volume24h: 1200000000,
    addedAt: new Date('2024-01-20'),
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.82,
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    change24h: 3.21,
    marketCap: 11000000000,
    volume24h: 450000000,
    addedAt: new Date('2024-02-20'),
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 15.67,
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    change24h: 6.78,
    marketCap: 9500000000,
    volume24h: 620000000,
    addedAt: new Date('2024-04-01'),
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.58,
    image: 'https://assets.coingecko.com/coins/images/4713/large/polygon.png',
    change24h: -0.89,
    marketCap: 5400000000,
    volume24h: 320000000,
    addedAt: new Date('2024-04-10'),
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    price: 84.32,
    image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
    change24h: 1.45,
    marketCap: 6200000000,
    volume24h: 410000000,
    addedAt: new Date('2024-01-05'),
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    price: 12.34,
    image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap.png',
    change24h: 8.92,
    marketCap: 7400000000,
    volume24h: 280000000,
    addedAt: new Date('2024-05-01'),
  },
  {
    name: 'Cosmos',
    symbol: 'ATOM',
    price: 9.15,
    image: 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    change24h: 2.67,
    marketCap: 3500000000,
    volume24h: 190000000,
    addedAt: new Date('2024-05-15'),
  },
  {
    name: 'Stellar',
    symbol: 'XLM',
    price: 0.112,
    image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
    change24h: -3.14,
    marketCap: 3200000000,
    volume24h: 150000000,
    addedAt: new Date('2024-06-01'),
  },
  {
    name: 'Pepe',
    symbol: 'PEPE',
    price: 0.0000125,
    image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
    change24h: 12.45,
    marketCap: 5200000000,
    volume24h: 980000000,
    addedAt: new Date('2025-01-10'),
  },
  {
    name: 'Render',
    symbol: 'RNDR',
    price: 8.42,
    image: 'https://assets.coingecko.com/coins/images/11636/large/rndr.png',
    change24h: 9.87,
    marketCap: 4300000000,
    volume24h: 340000000,
    addedAt: new Date('2025-02-01'),
  },
  {
    name: 'Sui',
    symbol: 'SUI',
    price: 1.85,
    image: 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg',
    change24h: 11.23,
    marketCap: 5800000000,
    volume24h: 720000000,
    addedAt: new Date('2025-03-01'),
  },
  {
    name: 'Aptos',
    symbol: 'APT',
    price: 9.67,
    image: 'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png',
    change24h: 4.15,
    marketCap: 4100000000,
    volume24h: 260000000,
    addedAt: new Date('2025-04-01'),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    // Insert seed data
    const inserted = await Crypto.insertMany(cryptoData);
    console.log(`Successfully seeded ${inserted.length} cryptocurrencies`);

    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
