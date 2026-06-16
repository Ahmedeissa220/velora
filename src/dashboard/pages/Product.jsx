import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Search, Loader2, AlertCircle } from "lucide-react";
import { db } from "../../firebase";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";



export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    img: "",
    discription: "",
  });



  // Fetch Products
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
        setLoading(false);
      },
      (error) => {
        console.log("Firestore error:", error);
        setError("Failed to load products");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Search filter
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Add / Update Product
  const handleSubmit = async () => {
    if (!form.title || !form.price) return;

    setIsSubmitting(true);

    try {
      const productData = {
        title: form.title,
        price: Number(form.price),
        img: form.img || "",
        discription: form.discription || "",
        updatedAt: Date.now(),
      };

      if (editId) {
        // UPDATE PRODUCT
        const productRef = doc(db, "products", editId);

        await updateDoc(productRef, productData);

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editId ? { ...p, ...productData } : p
          )
        );
      } else {
        // ADD PRODUCT
        const docRef = await addDoc(
          collection(db, "products"),
          {
            ...productData,
            createdAt: Date.now(),
          }
        );

        setProducts((prev) => [
          ...prev,
          {
            id: docRef.id,
            ...productData,
          },
        ]);
      }
    } catch (err) {
      console.warn("Firebase operation failed:", err);
    } finally {
      setIsSubmitting(false);
      setForm({ title: "", price: "", img: "", discription: "" });
      setEditId(null);
      setIsOpen(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (err) {
      console.warn("Delete failed:", err);
      setError("Failed to delete product");
    }
  };

  // Open Edit Modal
  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
    setIsOpen(true);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Products Catalog
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your store inventory</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          {/* Search Input */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
            <Search size={18} className="text-slate-400 dark:text-slate-400" />
            <input
              placeholder="Search products..."
              className="bg-transparent outline-none w-full sm:w-48 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setEditId(null);
              setForm({ title: "", price: "", img: "", discription: "" });
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/25 px-5 py-2.5 rounded-2xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* State Handlers (Loading / Error) */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 animate-pulse">Loading inventory...</p>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
          <Search className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-3" />
          <h3 className="text-xl font-medium text-slate-600 dark:text-slate-300">No products found</h3>
          <p className="text-slate-400 dark:text-slate-500 mt-1 text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        /* Product List */
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                        {p.img ? (
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">No Img</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-700 dark:text-slate-200">{p.title}</td>
                    <td className="px-6 py-3 font-bold text-blue-600 dark:text-blue-400">${Number(p.price).toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 rounded-xl transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all"
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
        </div>
      )}

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              {editId ? "Update Product" : "New Product"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Product Title</label>
                <input
                  placeholder="e.g. Velora Pro Max"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition-all text-sm text-slate-800 dark:text-white placeholder:text-slate-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Price ($)</label>
                <input
                  placeholder="e.g. 999"
                  type="number"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition-all text-sm text-slate-800 dark:text-white placeholder:text-slate-400"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Product Image</label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition-all text-sm text-slate-700 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-500/20 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-500/30 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForm({ ...form, img: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {form.img && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                      <img src={form.img} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, img: "" })}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Description</label>
                <textarea
                  placeholder="A small paragraph about the product..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition-all text-sm text-slate-800 dark:text-white placeholder:text-slate-400 resize-none"
                  value={form.discription}
                  onChange={(e) => setForm({ ...form, discription: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
