import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./components/AdminSidebar";
import { Plus, Search, X, Edit2, Trash2, Image as ImageIcon, ExternalLink, Layers, Layout } from "lucide-react";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    title: "",
    description_en: "",
    description_id: "",
    image: null,
    link: "",
    category: "Web",
  });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
    setImagePreview(project.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert("Gagal menghapus project");
    else fetchProjects();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.image;

    if (form.image instanceof File) {
      const fileName = `project-${Date.now()}-${form.image.name}`;
      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, form.image);

      if (uploadError) {
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
      closeModal();
      fetchProjects();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({
      title: "",
      description_en: "",
      description_id: "",
      image: null,
      link: "",
      category: "Web",
    });
    setImagePreview(null);
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const totalProjects = projects.length;
  const categories = [...new Set(projects.map(p => p.category))].length;

  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {/* Header & Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1e293b] p-6 rounded-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  <Layers size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Projects</p>
                  <h3 className="text-2xl font-bold text-white">{totalProjects}</h3>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] p-6 rounded-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                  <Layout size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Categories</p>
                  <h3 className="text-2xl font-bold text-white">{categories}</h3>
                </div>
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
              placeholder="Search projects..."
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
            Add New Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No projects found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-[#1e293b] rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60" />
                  <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{project.description?.id}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      <ExternalLink size={14} />
                      Visit Link
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
          <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#1e293b] z-10">
              <h2 className="text-xl font-bold text-white">
                {editId ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Web">Web</option>
                      <option value="Android">Android</option>
                      <option value="ML">ML</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Project Link</label>
                    <input
                      name="link"
                      value={form.link}
                      onChange={handleChange}
                      className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Project Image</label>
                  <div className="relative w-full aspect-video bg-[#0f172a] border-2 border-dashed border-white/10 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm">Click to upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required={!editId}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description (English)</label>
                <textarea
                  name="description_en"
                  value={form.description_en}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description (Indonesian)</label>
                <textarea
                  name="description_id"
                  value={form.description_id}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#0f172a] text-white border border-white/10 rounded-lg px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
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
                  {editId ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

