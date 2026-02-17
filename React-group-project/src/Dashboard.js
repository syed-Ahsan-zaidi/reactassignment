import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout }) => {
  // Requirement: Maintain structured storage (Local Storage)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [form, setForm] = useState({ id: null, name: '', qty: '', price: '', desc: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(products));
  }, [products]);

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === form.id ? form : p));
      setIsEditing(false);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', qty: '', price: '', desc: '' });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Inventory Dashboard</h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form: Add/Edit Product */}
        <form onSubmit={handleSave} className="bg-white p-6 rounded shadow h-fit">
          <h2 className="font-bold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h2>
          <input placeholder="Product Name" className="w-full mb-2 p-2 border" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="number" placeholder="Quantity" className="w-full mb-2 p-2 border" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} required />
          <input type="number" placeholder="Price" className="w-full mb-2 p-2 border" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          <textarea placeholder="Description" className="w-full mb-2 p-2 border" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
          <button className="w-full bg-pink-500 text-white p-2 rounded">{isEditing ? "Update" : "Add"}</button>
        </form>

        {/* View Product List */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Name</th><th>Qty</th><th>Price</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b">
                  <td>{p.name}</td><td>{p.qty}</td><td>{p.price}</td>
                  <td>
                    <button onClick={() => {setForm(p); setIsEditing(true)}} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => setProducts(products.filter(x => x.id !== p.id))} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;