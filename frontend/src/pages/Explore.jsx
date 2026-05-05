import { useState, useEffect } from 'react';
import { getAllCryptos } from '../api/api';

const Explore = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getAllCryptos();
        if (data.success) setCryptos(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = cryptos.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (p) => {
    if (p < 0.01) return `$${p.toFixed(6)}`;
    if (p < 1) return `$${p.toFixed(4)}`;
    return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatCap = (c) => {
    if (!c) return '—';
    if (c >= 1e12) return `$${(c/1e12).toFixed(2)}T`;
    if (c >= 1e9) return `$${(c/1e9).toFixed(2)}B`;
    if (c >= 1e6) return `$${(c/1e6).toFixed(2)}M`;
    return `$${c.toLocaleString()}`;
  };

  return (
    <div className="page-fade-in page-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Explore All Assets</h1>
          <p className="section-subtitle">All tradable cryptocurrencies on the platform</p>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner"></div><p className="loading-text">Loading assets...</p></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">🔍</div><h3>No results found</h3><p>Try a different search term.</p></div>
      ) : (
        <div className="crypto-table-container">
          <table className="crypto-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Price</th><th>Market Cap</th><th style={{textAlign:'right'}}>24h Change</th></tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c._id}>
                  <td style={{color:'var(--text-muted)',fontWeight:500}}>{i+1}</td>
                  <td>
                    <div className="crypto-name-cell">
                      <img src={c.image} alt={c.name} className="crypto-icon" onError={e=>{e.target.style.display='none';}} />
                      <div><div className="crypto-name">{c.name}</div><div className="crypto-symbol">{c.symbol}</div></div>
                    </div>
                  </td>
                  <td className="crypto-price">{formatPrice(c.price)}</td>
                  <td className="crypto-market-cap">{formatCap(c.marketCap)}</td>
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

export default Explore;
