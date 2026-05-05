import { useState, useEffect } from 'react';
import { getNewListings } from '../api/api';
import { HiSparkles } from 'react-icons/hi';

const NewListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getNewListings();
        if (data.success) setListings(data.data);
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

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="page-fade-in page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title"><HiSparkles style={{color:'var(--accent-primary)', verticalAlign:'middle'}} /> New Listings</h1>
          <p className="section-subtitle">Most recently added cryptocurrencies, newest first</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div><p className="loading-text">Loading new listings...</p></div>
      ) : listings.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">✨</div><h3>No new listings</h3><p>New cryptocurrencies will appear here when added.</p></div>
      ) : (
        <div className="crypto-table-container">
          <table className="crypto-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Price</th><th>Added</th><th style={{textAlign:'right'}}>24h Change</th></tr>
            </thead>
            <tbody>
              {listings.map((c, i) => (
                <tr key={c._id}>
                  <td style={{color:'var(--text-muted)',fontWeight:500}}>{i+1}</td>
                  <td>
                    <div className="crypto-name-cell">
                      <img src={c.image} alt={c.name} className="crypto-icon" onError={e=>{e.target.style.display='none';}} />
                      <div><div className="crypto-name">{c.name}</div><div className="crypto-symbol">{c.symbol}</div></div>
                    </div>
                  </td>
                  <td className="crypto-price">{formatPrice(c.price)}</td>
                  <td className="crypto-market-cap">{formatDate(c.addedAt || c.createdAt)}</td>
                  <td style={{textAlign:'right'}}>
                    <span className={`crypto-change ${c.change24h>=0?'positive':'negative'}`}>
                      {c.change24h>=0?'+':''}{c.change24h.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewListings;
