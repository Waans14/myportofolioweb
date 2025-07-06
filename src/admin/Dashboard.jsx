import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./components/AdminSidebar";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description_en: "",
    description_id: "",
    image: null,
    link: "",
    category: "Web",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (!error) setProjects(data);
    else console.error("Fetch error:", error);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setForm({
      title: project.title,
      description_en: project.description?.en || "",
      description_id: project.description?.id || "",
      image: project.image,
      link: project.link,
      category: project.category || "Web",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert("Gagal menghapus project");
    else fetchProjects();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;

    if (form.image instanceof File) {
      const fileName = `project-${Date.now()}-${form.image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, form.image);

      if (uploadError) {
        console.error("Upload gagal:", uploadError.message);
        alert("Gagal mengunggah gambar: " + uploadError.message);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      imageUrl = publicURLData?.publicUrl;
    }

    const dataToSave = {
      title: form.title,
      description: {
        en: form.description_en,
        id: form.description_id,
      },
      image: imageUrl,
      link: form.link,
      category: form.category,
    };

    let result;
    if (editId) {
      result = await supabase.from("projects").update(dataToSave).eq("id", editId);
    } else {
      result = await supabase.from("projects").insert([dataToSave]);
    }

    if (result.error) {
      alert("Gagal menyimpan data: " + result.error.message);
    } else {
      setForm({
        title: "",
        description_en: "",
        description_id: "",
        image: null,
        link: "",
        category: "Web",
      });
      setEditId(null);
      setShowForm(false);
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-6">Daftar Project</h1>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm({
                title: "",
                description_en: "",
                description_id: "",
                image: null,
                link: "",
                category: "Web",
              });
            }}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {showForm ? "Tutup Form" : "Tambah Project"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Judul"
                required
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded"
              />
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleChange}
                placeholder="Deskripsi (EN)"
                required
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded"
              />
              <textarea
                name="description_id"
                value={form.description_id}
                onChange={handleChange}
                placeholder="Deskripsi (ID)"
                required
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded"
                required={!editId}
              />
              <input
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Link Project"
                required
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 px-4 py-2 rounded"
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded"
              >
                <option className="text-black" value="Web">Web</option>
                <option className="text-black" value="Android">Android</option>
                <option className="text-black" value="ML">ML</option>
                <option className="text-black" value="UI/UX">UI/UX</option>
              </select>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded">
                {editId ? "Update Project" : "Simpan Project"}
              </button>
            </form>
          )}

          {loading ? (
            <p className="text-white/70">Memuat data...</p>
          ) : projects.length === 0 ? (
            <p className="text-white/70">Belum ada data project.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-white shadow-lg">
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="text-sm text-white/70">{project.description?.id}</p>
                  <p className="text-sm text-white/50 italic">Kategori: {project.category}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 text-sm"
                  >
                    Lihat Project
                  </a>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-yellow-400 hover:text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      Hapus
                    </button>
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
