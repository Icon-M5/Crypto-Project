import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCryptos } from '../api/api';
import { HiTrendingUp, HiSparkles, HiPlus } from 'react-icons/hi';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const { data } = await getAllCryptos();
        if (data.success) setCryptos(data.data.slice(0, 8));
      } catch (err) {
        console.error('Failed to fetch cryptos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (cap) => {
    if (!cap) return '—';
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  return (
    <div className="page-fade-in">
      <div className="page-container">
        <section className="hero">
          <span className="hero-badge">🚀 Live Market Data</span>
          <h1>
            The Future of<br />
            <span className="gradient-text">Digital Assets</span>
          </h1>
          <p>Track real-time prices, discover top gainers, and manage your crypto portfolio — all in one platform.</p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary btn-lg">
              <HiSparkles /> Explore Market
            </Link>
            <Link to="/add-crypto" className="btn btn-secondary btn-lg">
              <HiPlus /> Add Asset
            </Link>
          </div>
        </section>

        <div className="stats-bar">
          <div className="card stat-card">
            <div className="stat-value">{cryptos.length > 0 ? '20+' : '—'}</div>
            <div className="stat-label">Tradable Assets</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Market Access</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">Real-time</div>
            <div className="stat-label">Price Updates</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value">Secure</div>
            <div className="stat-label">JWT Protected</div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <h2 className="section-title">Trending Assets</h2>
            <p className="section-subtitle">Top performing cryptocurrencies right now</p>
          </div>
          <Link to="/explore" className="btn btn-secondary btn-sm">
            View All <HiTrendingUp />
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading market data...</p>
          </div>
        ) : cryptos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No data available</h3>
            <p>Seed the database to see crypto data here.</p>
          </div>
        ) : (
          <div className="crypto-table-container">
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th style={{ textAlign: 'right' }}>24h Change</th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((c, i) => (
                  <tr key={c._id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{i + 1}</td>
                    <td>
                      <div className="crypto-name-cell">
                        <img src={c.image} alt={c.name} className="crypto-icon" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div>
                          <div className="crypto-name">{c.name}</div>
                          <div className="crypto-symbol">{c.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="crypto-price">{formatPrice(c.price)}</td>
                    <td className="crypto-market-cap">{formatMarketCap(c.marketCap)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`crypto-change ${c.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {c.change24h >= 0 ? '+' : ''}{c.change24h.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
