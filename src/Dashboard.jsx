import { useAuth } from './AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        {/* یہاں .email لکھنا لازمی ہے */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome, {user?.email}! 👋
        </h2>
        
        <button 
          onClick={logout} 
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;