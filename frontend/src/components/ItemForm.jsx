import React, { useState, useEffect } from 'react';
import { createItem, updateItem, getItem } from '../api/itemApi';

export default function ItemForm({ selectedId, onSaved }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedId) {
      setLoading(true);
      getItem(selectedId)
        .then(res => {
          setForm(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching item:', err);
          setError('Failed to load item');
          setLoading(false);
        });
    }
  }, [selectedId]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const action = selectedId ? updateItem(selectedId, form) : createItem(form);
    action
      .then(() => {
        setForm({ name: '', description: '' });
        onSaved();
        setLoading(false);
      })
      .catch(err => {
        console.error('Error saving item:', err);
        setError('Failed to save item. Make sure the backend server is running.');
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter item name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter item description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows="3"
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className={`btn ${selectedId ? 'btn-warning' : 'btn-success'}`}
        disabled={loading}
      >
        {loading ? 'Saving...' : selectedId ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
