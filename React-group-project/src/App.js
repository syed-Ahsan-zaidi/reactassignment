import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('glow_final_bright');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [user, setUser] = useState({ email: '', password: '' });
  const [form, setForm] = useState({ id: null, name: '', brand: '', price: '', quantity: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('glow_final_bright', JSON.stringify(products));
  }, [products]);

  // Restricted Admin-Only Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    if (user.email === "ayesha@glow.com" && user.password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("⚠️ ACCESS DENIED: This portal is for Admin (ayesha@glow.com) only.");
    }
  };

  const handleAction = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === form.id ? form : p));
      setIsEditing(false);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: '', brand: '', price: '', quantity: '' });
  };

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Poppins', sans-serif", background: '#fffcfc' }}>
        {/* Brand Side with Premium Image */}
        <div style={{ 
          flex: 1.2, 
          backgroundImage: "url('https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1888&auto=format&fit=crop')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '60px', 
          position: 'relative' 
        }} className="hidden lg:flex">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(219, 39, 119, 0.2), rgba(0,0,0,0.4))' }}></div>
          <div style={{ position: 'relative', zIndex: 1, color: 'white' }}>
            <h1 style={{ fontSize: '6.5rem', fontWeight: 'bold', fontStyle: 'italic', margin: 0, textShadow: '2px 2px 20px rgba(0,0,0,0.3)' }}>Glow ✨</h1>
            <p style={{ letterSpacing: '8px', textTransform: 'uppercase', color: '#ffebf2', fontWeight: 'bold' }}>Admin Management</p>
          </div>
        </div>

        {/* Login Side */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', padding: '50px', background: 'white', borderRadius: '40px', boxShadow: '0 25px 60px rgba(219, 39, 119, 0.12)', border: '1px solid #ffebf2' }}>
            <h2 style={{ color: '#db2777', fontSize: '2.2rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px', fontSize: '0.9rem' }}>Please enter <b>Admin</b> credentials</p>
            
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#db2777', marginLeft: '5px' }}>EMAIL ADDRESS</label>
                <input type="email" placeholder="ayesha@glow.com" style={{ width: '100%', padding: '16px', marginTop: '5px', borderRadius: '15px', border: '1px solid #fce7f3', backgroundColor: '#fff9fb', outline: 'none' }} onChange={e => setUser({...user, email: e.target.value})} required />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#db2777', marginLeft: '5px' }}>PASSWORD</label>
                <input type="password" placeholder="••••••" style={{ width: '100%', padding: '16px', marginTop: '5px', borderRadius: '15px', border: '1px solid #fce7f3', backgroundColor: '#fff9fb', outline: 'none' }} onChange={e => setUser({...user, password: e.target.value})} required />
              </div>
              <button type="submit" style={{ width: '100%', padding: '18px', background: 'linear-gradient(45deg, #db2777, #f472b6)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(219, 39, 119, 0.2)' }}>
                Enter Portal
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Section
  return (
    <div style={{ background: '#fffafa', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <nav style={{ padding: '20px 60px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 5px 20px rgba(219, 39, 119, 0.05)' }}>
        <h1 style={{ color: '#db2777', margin: 0, fontStyle: 'italic', fontSize: '2rem', fontWeight: 'bold' }}>Glow ✨</h1>
        <button onClick={() => setIsLoggedIn(false)} style={{ padding: '10px 30px', borderRadius: '50px', border: 'none', background: '#db2777', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
      </nav>

      <div style={{ padding: '50px', display: 'flex', flexWrap: 'wrap', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Bright & Clean Form */}
        <div style={{ flex: '0 0 380px', background: 'white', padding: '40px', borderRadius: '35px', boxShadow: '0 15px 40px rgba(219, 39, 119, 0.05)', border: '1px solid #fff0f6' }}>
          <h2 style={{ marginBottom: '30px', color: '#333', fontSize: '1.6rem', borderLeft: '5px solid #db2777', paddingLeft: '15px' }}>
            {isEditing ? "Update Stock" : "New Entry"}
          </h2>
          <form onSubmit={handleAction}>
            <input placeholder="Item Name" style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '12px', border: '1px solid #fce7f3', background: '#fffdfd' }} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input placeholder="Brand Name" style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '12px', border: '1px solid #fce7f3', background: '#fffdfd' }} value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
              <input placeholder="Price" type="number" style={{ width: '60%', padding: '15px', borderRadius: '12px', border: '1px solid #fce7f3' }} value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              <input placeholder="Qty" type="number" style={{ width: '40%', padding: '15px', borderRadius: '12px', border: '1px solid #fce7f3' }} value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} required />
            </div>
            <button style={{ width: '100%', padding: '18px', background: '#db2777', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>
              {isEditing ? "SAVE CHANGES" : "ADD TO STOCK"}
            </button>
          </form>
        </div>

        {/* Inventory Cards */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {products.map(p => (
            <div key={p.id} style={{ background: 'white', padding: '30px', borderRadius: '35px', border: '1px solid #fff0f6', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#db2777', textTransform: 'uppercase', letterSpacing: '2px' }}>{p.brand}</span>
              <h3 style={{ margin: '10px 0', fontSize: '1.5rem', color: '#222' }}>{p.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                 <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#db2777', margin: 0 }}>Rs. {p.price}</p>
                 <span style={{ padding: '6px 15px', background: '#fff0f6', color: '#db2777', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>STOCK: {p.quantity}</span>
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                <button onClick={() => {setForm(p); setIsEditing(true)}} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#f0f9ff', color: '#0369a1', fontWeight: 'bold', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteProduct(p.id)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#fff1f2', color: '#be123c', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;