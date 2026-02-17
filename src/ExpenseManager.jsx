import { useState, useEffect } from "react";

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ amount: "", category: "Food", date: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // LocalStorage میں ڈیٹا محفوظ کرنا
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExpenses(expenses.map(ex => ex.id === editingId ? { ...form, id: editingId } : ex));
      setEditingId(null);
    } else {
      setExpenses([...expenses, { ...form, id: Date.now() }]);
    }
    setForm({ amount: "", category: "Food", date: "", description: "" });
  };

  const deleteExpense = (id) => setExpenses(expenses.filter(ex => ex.id !== id));

  const startEdit = (ex) => {
    setForm(ex);
    setEditingId(ex.id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Expense Management</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <input type="number" placeholder="Amount" className="p-2 border rounded" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <select className="p-2 border rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option>Food</option>
          <option>Rent</option>
          <option>Inventory</option>
          <option>Salary</option>
          <option>Bills</option>
        </select>
        <input type="date" className="p-2 border rounded" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <input type="text" placeholder="Description" className="p-2 border rounded" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button className={`md:col-span-2 py-2 rounded text-white font-bold ${editingId ? 'bg-orange-500' : 'bg-green-600'}`}>
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* List Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((ex) => (
              <tr key={ex.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{ex.date}</td>
                <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{ex.category}</span></td>
                <td className="p-3 font-bold">${ex.amount}</td>
                <td className="p-3 text-gray-600">{ex.description}</td>
                <td className="p-3 text-center space-x-2">
                  <button onClick={() => startEdit(ex)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => deleteExpense(ex.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length === 0 && <p className="text-center py-4 text-gray-500">No expenses recorded yet.</p>}
      </div>
    </div>
  );
}