// src/admin/Sertifikasi.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./components/AdminSidebar";

export default function Sertifikasi() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(true);
  };

  const handleDelete = async (id) => {
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

    setForm({ name_en: "", name_id: "", image: "", link: "" });
    setEditId(null);
    setShowForm(false);
    fetchCertificates();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-6">Daftar Sertifikasi</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {showForm ? "Tutup Form" : "Tambah Sertifikasi"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
              <input name="name_en" value={form.name_en} onChange={handleChange} placeholder="Judul Sertifikasi (EN)" className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded" required />
              <input name="name_id" value={form.name_id} onChange={handleChange} placeholder="Judul Sertifikasi (ID)" className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded" required />
              <input name="image" value={form.image} onChange={handleChange} placeholder="URL Gambar" className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded" required />
              <input name="link" value={form.link} onChange={handleChange} placeholder="Link Sertifikat" className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded" required />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded">
                {editId ? "Update" : "Simpan"}
              </button>
            </form>
          )}

          {loading ? (
            <p className="text-white/70">Memuat data...</p>
          ) : certificates.length === 0 ? (
            <p className="text-white/70">Belum ada data sertifikasi.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow-lg">
                  <h2 className="text-lg font-semibold">{cert.name?.id}</h2>
                  <p className="text-sm text-white/70">{cert.name?.en}</p>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-sm">Lihat Sertifikat</a>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => handleEdit(cert)} className="text-yellow-400 hover:text-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(cert.id)} className="text-red-400 hover:text-red-600">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
