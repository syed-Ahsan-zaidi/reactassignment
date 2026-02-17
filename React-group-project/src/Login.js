import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Requirement: Validate inputs before saving/checking
    if (email === "ayesha.com" && password === "123456") {
      onLogin(); // Successful login
    } else {
      alert("Ghalat credentials! Try: ayesha@glow.com / 123456");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-pink-400">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">💄 Makeup Login</h2>
        <input type="email" placeholder="Email Address" className="w-full p-2 mb-4 border rounded" 
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-6 border rounded" 
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition">Sign In</button>
      </form>
    </div>
  );
};

export default Login;