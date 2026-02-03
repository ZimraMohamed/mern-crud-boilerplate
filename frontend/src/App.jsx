import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [editId, setEditId] = useState(null);

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1 className="text-center text-primary">CRUD Boilerplate  by Zimra :)(Vite & React)</h1>
      </div>
      <ItemForm selectedId={editId} onSaved={() => setEditId(null)} />
      <ItemList onEdit={setEditId} />
    </div>
  );
}