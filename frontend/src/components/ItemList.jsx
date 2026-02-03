import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemApi';

export default function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = () => {
    setLoading(true);
    setError(null);
    getItems()
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
        setError('Failed to connect to backend. Make sure the server is running on http://localhost:5000');
        setLoading(false);
      });
  };
  useEffect(fetch, []);

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <strong>Connection Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {items.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No items yet. Create one using the form above.
        </div>
      ) : (
        <ul className="list-group">
          {items.map(it => (
            <li key={it._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{it.name}</strong> – {it.description}
              </div>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(it._id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteItem(it._id).then(fetch)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
