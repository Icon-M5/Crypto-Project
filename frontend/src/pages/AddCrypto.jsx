import { useState } from 'react';
import { addCrypto } from '../api/api';
import toast from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi';

const AddCrypto = () => {
  const [form, setForm] = useState({ name: '', symbol: '', price: '', image: '', change24h: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.symbol || !form.price || !form.image || form.change24h === '') {
      return toast.error('Please fill in all fields');
    }
    setLoading(true);
    try {
      const { data } = await addCrypto({
        ...form,
        price: parseFloat(form.price),
        change24h: parseFloat(form.change24h),
      });
      if (data.success) {
        toast.success(data.message || 'Cryptocurrency added!');
        setForm({ name: '', symbol: '', price: '', image: '', change24h: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add cryptocurrency');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in page-container">
      <div className="add-crypto-container">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>Add New Cryptocurrency</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Add a new digital asset to the platform</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="crypto-name">Name</label>
              <input id="crypto-name" className="form-input" type="text" name="name" placeholder="e.g. Bitcoin" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="crypto-symbol">Symbol</label>
              <input id="crypto-symbol" className="form-input" type="text" name="symbol" placeholder="e.g. BTC" value={form.symbol} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="crypto-price">Price (USD)</label>
              <input id="crypto-price" className="form-input" type="number" name="price" step="any" placeholder="e.g. 50000" value={form.price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="crypto-image">Image URL</label>
              <input id="crypto-image" className="form-input" type="url" name="image" placeholder="https://example.com/icon.png" value={form.image} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="crypto-change">24h Change (%)</label>
              <input id="crypto-change" className="form-input" type="number" name="change24h" step="any" placeholder="e.g. +2.5 or -1.3" value={form.change24h} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              <HiPlus /> {loading ? 'Adding...' : 'Add Cryptocurrency'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrypto;
