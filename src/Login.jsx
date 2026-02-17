import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}