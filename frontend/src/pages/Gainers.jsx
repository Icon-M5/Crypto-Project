import { useState, useEffect } from 'react';
import { getTopGainers } from '../api/api';
import { HiTrendingUp } from 'react-icons/hi';

const Gainers = () => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTopGainers();
        if (data.success) setGainers(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const formatPrice = (p) => {
    if (p < 0.01) return `$${p.toFixed(6)}`;
    if (p < 1) return `$${p.toFixed(4)}`;
    return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="page-fade-in page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title"><HiTrendingUp style={{color:'var(--green)', verticalAlign:'middle'}} /> Top Gainers</h1>
          <p className="section-subtitle">Cryptocurrencies with the highest 24h price increase</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div><p className="loading-text">Loading gainers...</p></div>
      ) : gainers.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">📈</div><h3>No gainers found</h3><p>Check back later for top performing assets.</p></div>
      ) : (
        <div className="crypto-grid">
          {gainers.map((c, i) => (
            <div key={c._id} className="card crypto-grid-card">
              <img src={c.image} alt={c.name} className="crypto-icon" style={{width:44,height:44}} onError={e=>{e.target.style.display='none';}} />
              <div className="crypto-grid-info">
                <div className="crypto-name">{c.name}</div>
                <div className="crypto-symbol">{c.symbol}</div>
              </div>
              <div className="crypto-grid-price">
                <div className="price">{formatPrice(c.price)}</div>
                <span className="crypto-change positive">+{c.change24h.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gainers;
