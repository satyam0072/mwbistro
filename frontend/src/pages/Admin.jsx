import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Heart, LogOut, Plus, Pencil, Trash2, RotateCcw, ArrowLeft } from "lucide-react";
import { API } from "@/data/site";

const CATEGORIES = ["Starters", "Main Course", "Fast Food", "Snacks", "Beverages", "Desserts"];
const EMPTY_ITEM = { id: null, name: "", category: "Starters", price: "", description: "", veg: true, available: true };

const inputCls =
    "w-full rounded-xl border border-[#D4AF37]/25 bg-[#18110D] px-4 py-3 text-sm text-[#F5EFE6] placeholder-[#6B584C] focus:outline-none focus:border-[#D4AF37] transition";

const Admin = () => {
    const [token, setToken] = useState(() => localStorage.getItem("mw_admin_token") || "");
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY_ITEM);
    const [busy, setBusy] = useState(false);

    const auth = { headers: { Authorization: `Bearer ${token}` } };

    const load = useCallback(async () => {
        try {
            const res = await axios.get(`${API}/menu`);
            setItems(res.data.items || []);
        } catch {
            toast.error("Could not load menu");
        }
    }, []);

    useEffect(() => {
        if (token) load();
    }, [token, load]);

    const login = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            const res = await axios.post(`${API}/auth/login`, loginForm);
            localStorage.setItem("mw_admin_token", res.data.token);
            setToken(res.data.token);
            toast.success("Welcome back");
        } catch (err) {
            const d = err.response?.data?.detail;
            toast.error(typeof d === "string" ? d : "Login failed");
        } finally {
            setBusy(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("mw_admin_token");
        setToken("");
    };

    const save = async (e) => {
        e.preventDefault();
        setBusy(true);
        const payload = { ...form, price: parseInt(form.price, 10) || 0 };
        delete payload.id;
        try {
            if (form.id) await axios.put(`${API}/admin/menu/${form.id}`, payload, auth);
            else await axios.post(`${API}/admin/menu`, payload, auth);
            toast.success(form.id ? "Item updated" : "Item added");
            setForm(EMPTY_ITEM);
            load();
        } catch (err) {
            if (err.response?.status === 401) { toast.error("Session expired — please log in again"); logout(); }
            else toast.error("Could not save item");
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id) => {
        try {
            await axios.delete(`${API}/admin/menu/${id}`, auth);
            toast.success("Item deleted");
            load();
        } catch {
            toast.error("Could not delete item");
        }
    };

    const reset = async () => {
        try {
            await axios.post(`${API}/admin/menu/reset`, {}, auth);
            toast.success("Sample menu restored");
            load();
        } catch {
            toast.error("Could not reset menu");
        }
    };

    if (!token) {
        return (
            <main data-testid="admin-login-page" className="min-h-screen bg-[#18110D] flex items-center justify-center px-5">
                <form onSubmit={login} className="w-full max-w-sm rounded-3xl bg-[#241B15] border border-[#D4AF37]/25 p-8">
                    <p className="font-serif text-2xl text-[#F5EFE6] flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/40" /> MW Bistro
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mt-1 mb-8">Menu Admin</p>
                    <input
                        data-testid="admin-email-input"
                        type="email"
                        required
                        placeholder="Admin email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className={`${inputCls} mb-3`}
                    />
                    <input
                        data-testid="admin-password-input"
                        type="password"
                        required
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={`${inputCls} mb-5`}
                    />
                    <button
                        data-testid="admin-login-button"
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-full bg-[#D4AF37] text-[#18110D] font-semibold text-sm py-3.5 hover:bg-[#F3E5AB] transition-colors disabled:opacity-60"
                    >
                        {busy ? "Signing in…" : "Sign In"}
                    </button>
                    <Link data-testid="admin-back-link" to="/" className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#C4B5A5] hover:text-[#D4AF37] transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to website
                    </Link>
                </form>
            </main>
        );
    }

    return (
        <main data-testid="admin-dashboard" className="min-h-screen bg-[#18110D] text-[#F5EFE6] px-5 sm:px-8 py-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="font-serif text-2xl">Menu Manager</p>
                        <p className="font-mono text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mt-1">MW Bistro Admin</p>
                    </div>
                    <div className="flex gap-2">
                        <button data-testid="admin-reset-btn" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-medium px-4 py-2.5 hover:bg-[#D4AF37]/10 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Reset Samples
                        </button>
                        <button data-testid="admin-logout-btn" onClick={logout} className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-medium px-4 py-2.5 hover:bg-[#D4AF37]/10 transition-colors">
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>

                <form onSubmit={save} className="rounded-3xl bg-[#241B15] border border-[#D4AF37]/25 p-6 sm:p-7 mb-10 space-y-4" data-testid="admin-item-form">
                    <p className="font-serif text-lg">{form.id ? "Edit Item" : "Add New Item"}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <input data-testid="admin-item-name" required placeholder="Dish name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                        <select data-testid="admin-item-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <input data-testid="admin-item-price" type="number" min="0" placeholder="Price (₹, 0 = TBD)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
                        <input data-testid="admin-item-desc" placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2 text-sm text-[#C4B5A5]">
                            <input data-testid="admin-item-veg" type="checkbox" checked={form.veg} onChange={(e) => setForm({ ...form, veg: e.target.checked })} className="accent-[#D4AF37] w-4 h-4" /> Veg
                        </label>
                        <label className="flex items-center gap-2 text-sm text-[#C4B5A5]">
                            <input data-testid="admin-item-available" type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-[#D4AF37] w-4 h-4" /> Available
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button data-testid="admin-item-save" type="submit" disabled={busy} className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] text-[#18110D] text-sm font-semibold px-6 py-3 hover:bg-[#F3E5AB] transition-colors disabled:opacity-60">
                            <Plus className="w-4 h-4" /> {form.id ? "Save Changes" : "Add Item"}
                        </button>
                        {form.id && (
                            <button data-testid="admin-item-cancel" type="button" onClick={() => setForm(EMPTY_ITEM)} className="rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] text-sm px-6 py-3 hover:bg-[#D4AF37]/10 transition-colors">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="space-y-8" data-testid="admin-item-list">
                    {CATEGORIES.map((cat) => {
                        const catItems = items.filter((i) => i.category === cat);
                        if (catItems.length === 0) return null;
                        return (
                            <div key={cat}>
                                <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">{cat} · {catItems.length}</p>
                                <div className="space-y-2.5">
                                    {catItems.map((item) => (
                                        <div key={item.id} data-testid={`admin-item-${item.id}`} className="flex items-center gap-3 rounded-2xl bg-[#241B15] border border-[#D4AF37]/15 px-5 py-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {item.name}
                                                    {!item.available && <span className="ml-2 text-[10px] font-mono uppercase text-[#C86D51]">hidden</span>}
                                                    {item.is_sample && <span className="ml-2 text-[10px] font-mono uppercase text-[#B8912B]">sample</span>}
                                                </p>
                                                <p className="text-xs text-[#C4B5A5] truncate">{item.price > 0 ? `₹${item.price}` : "₹000"} · {item.description || "—"}</p>
                                            </div>
                                            <button data-testid={`admin-edit-${item.id}`} onClick={() => setForm({ ...item, price: String(item.price) })} className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#F3E5AB] hover:bg-[#D4AF37]/15 transition-colors" aria-label="Edit">
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button data-testid={`admin-delete-${item.id}`} onClick={() => remove(item.id)} className="w-9 h-9 rounded-full border border-[#C86D51]/40 flex items-center justify-center text-[#C86D51] hover:bg-[#C86D51]/15 transition-colors" aria-label="Delete">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default Admin;
