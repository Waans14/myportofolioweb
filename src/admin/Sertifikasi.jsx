import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./components/AdminSidebar";
import { Plus, Search, X, Edit2, Trash2, Award, ExternalLink } from "lucide-react";

export default function Sertifikasi() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name_en: "",
    name_id: "",
    image: "",
    link: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("sertifikasi").select("*");
    if (!error) setCertificates(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (cert) => {
    setEditId(cert.id);
    setForm({
      name_en: cert.name?.en || "",
      name_id: cert.name?.id || "",
      image: cert.image,
      link: cert.link,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    await supabase.from("sertifikasi").delete().eq("id", id);
    fetchCertificates();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      name: {
        en: form.name_en,
        id: form.name_id,
      },
      image: form.image,
      link: form.link,
    };

    if (editId) {
      await supabase.from("sertifikasi").update(dataToSave).eq("id", editId);
    } else {
      await supabase.from("sertifikasi").insert([dataToSave]);
    }

    closeModal();
    fetchCertificates();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ name_en: "", name_id: "", image: "", link: "" });
  };

  const filteredCertificates = certificates.filter(c =>
    (c.name?.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.name?.en || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* Header & Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Certificates</h1>

          <div className="bg-[#1e293b] p-6 rounded-xl border border-white/10 shadow-lg max-w-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                <Award size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Certificates</p>
                <h3 className="text-2xl font-bold text-white">{certificates.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1e293b] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={20} />
            Add Certificate
          </button>
        </div>

        {/* Certificates Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No certificates found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="group bg-[#1e293b] rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5 p-4 flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.name?.en}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{cert.name?.id}</h3>
                  <p className="text-slate-400 text-sm line-clamp-1 mb-4">{cert.name?.en}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      View Credential
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(cert)}
                        className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editId ? "Edit Certificate" : "Add New Certificate"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name (Indonesian)</label>
                <input
                  name="name_id"
                  value={form.name_id}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name (English)</label>
                <input
                  name="name_en"
                  value={form.name_en}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Credential Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

