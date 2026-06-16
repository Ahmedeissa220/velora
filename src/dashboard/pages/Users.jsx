import { useState, useEffect } from "react";
import { Search, Trash2, Download, Loader2, AlertCircle, Users as UsersIcon, UserCheck, Shield, UserX, Upload, UserPlus, X } from "lucide-react";
import * as XLSX from "xlsx";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Customer", status: "Active" });

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Users from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        userList.sort((a, b) => new Date(b.date) - new Date(a.date));

        setUsers(userList);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firebase fetch error:", err);
        setError("Failed to fetch users from database.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.id?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (err) {
      console.error("API delete failed", err);
      setError("Failed to delete user.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { status });
    } catch (err) {
      console.error("API update failed", err);
      setError("Failed to update status.");
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role });
    } catch (err) {
      console.error("API update failed", err);
      setError("Failed to update role.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userToAdd = {
        id: `#USR-${Math.floor(Math.random() * 10000)}`,
        name: newUser.name || "New User",
        email: newUser.email || "user@example.com",
        role: newUser.role,
        status: newUser.status,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      
      await addDoc(collection(db, "users"), userToAdd);
      
      setIsAddModalOpen(false);
      setNewUser({ name: "", email: "", role: "Customer", status: "Active" });
    } catch (err) {
      console.error("API add user failed", err);
      setError("Failed to add user.");
    }
  };

  const exportCSV = () => {
    const rows = [
      ["User ID", "Name", "Email", "Role", "Status", "Joined Date"],
      ...users.map((u) => [u.id, u.name, u.email, u.role, u.status, u.date]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      const newUsers = json.map(row => ({
        id: row["User ID"] || `#USR-${Math.floor(Math.random() * 10000)}`,
        name: row["Name"] || "Imported User",
        email: row["Email"] || "",
        role: row["Role"] || "Customer",
        status: row["Status"] || "Active",
        date: row["Joined Date"] || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }));

      // Upload to Firebase
      try {
        for (const user of newUsers) {
          await addDoc(collection(db, "users"), user);
        }
      } catch (err) {
        console.error("Failed to import users", err);
        setError("Failed to import some users.");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = null;
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: <UsersIcon size={24} className="text-blue-500 dark:text-blue-400" />,
      bg: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      title: "Active",
      value: users.filter((u) => u.status === "Active").length,
      icon: <UserCheck size={24} className="text-emerald-500 dark:text-emerald-400" />,
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
    },
    {
      title: "Admins",
      value: users.filter((u) => u.role === "Admin").length,
      icon: <Shield size={24} className="text-purple-500 dark:text-purple-400" />,
      bg: "bg-purple-100 dark:bg-purple-500/10",
    },
    {
      title: "Banned",
      value: users.filter((u) => u.status === "Banned").length,
      icon: <UserX size={24} className="text-red-500 dark:text-red-400" />,
      bg: "bg-red-100 dark:bg-red-500/10",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20";
      case "Inactive": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20";
      case "Banned": return "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20";
      default: return "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "text-purple-700 dark:text-purple-400";
      case "Moderator": return "text-blue-700 dark:text-blue-400";
      default: return "text-slate-600 dark:text-slate-300";
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Users Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track user accounts</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="flex-1 lg:flex-none flex items-center gap-2 bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 px-4 py-2.5 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input
              placeholder="Search users..."
              className="bg-transparent outline-none w-full text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-slate-900/60 backdrop-blur-xl dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/5 px-4 py-2.5 rounded-2xl font-medium transition-all shadow-sm"
          >
            <Download size={18} className="text-blue-500 dark:text-blue-400" /> CSV
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-4 py-2.5 rounded-2xl font-medium transition-all shadow-sm"
          >
            <Download size={18} /> Excel
          </button>

          <label className="flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-600/20 dark:hover:bg-indigo-600/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 px-4 py-2.5 rounded-2xl font-medium transition-all shadow-sm cursor-pointer">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Upload size={18} /> Import
          </label>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2.5 rounded-2xl font-medium transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.title} className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all">
            <div className={`p-4 rounded-2xl ${item.bg} shadow-inner`}>
              {item.icon}
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.title}</p>
              <h2 className="text-3xl font-bold mt-1 text-slate-800 dark:text-slate-100">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">Loading users from Firebase...</p>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-6 m-4 rounded-2xl border border-red-200 dark:border-red-500/20">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Search className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-3" />
            <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300">No users found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-white/5">
                <tr>
                  <th className="px-6 py-5 font-semibold">User ID</th>
                  <th className="px-6 py-5 font-semibold">Name</th>
                  <th className="px-6 py-5 font-semibold">Email</th>
                  <th className="px-6 py-5 font-semibold">Role</th>
                  <th className="px-6 py-5 font-semibold">Status</th>
                  <th className="px-6 py-5 font-semibold">Joined</th>
                  <th className="px-6 py-5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{user.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`appearance-none bg-transparent font-semibold text-sm outline-none cursor-pointer transition-colors ${getRoleColor(user.role)}`}
                      >
                        <option value="Customer" className="text-slate-800">Customer</option>
                        <option value="Moderator" className="text-slate-800">Moderator</option>
                        <option value="Admin" className="text-slate-800">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className={`appearance-none px-4 py-1.5 rounded-full font-medium text-xs outline-none cursor-pointer transition-colors ${getStatusColor(user.status)}`}
                      >
                        <option value="Active" className="bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">Active</option>
                        <option value="Inactive" className="bg-white dark:bg-slate-800 text-yellow-600 dark:text-yellow-400">Inactive</option>
                        <option value="Banned" className="bg-white dark:bg-slate-800 text-red-600 dark:text-red-400">Banned</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{user.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all ${
                currentPage === index + 1
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-white/10">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-white/5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Add New User</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input required type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input required type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="john@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option value="Customer">Customer</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Banned">Banned</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]">
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
