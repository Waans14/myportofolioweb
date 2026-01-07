import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';

export default function Projects({ lang }) {
  const [activeTab, setActiveTab] = useState(lang === 'id' ? 'Semua' : 'All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const projectTabs = [
    lang === 'id' ? 'Semua' : 'All',
    'Web',
    'Android',
    'ML',
    'UI/UX',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('inserted_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data:', error.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const filteredProjects =
    activeTab === 'All' || activeTab === 'Semua'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  return (
    <section id="projects" className="py-20 flex flex-col items-center px-4">
      <motion.div
        className="w-full md:max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.h2
          className="text-3xl font-semibold text-white mb-8 text-center h-[40px]"
          variants={fadeIn}
        >
          <Typewriter
            words={[lang === 'id' ? 'Proyek' : 'Projects']}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={80}
          />
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          variants={fadeIn}
        >
          {projectTabs.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2 rounded-full text-white text-sm border border-white/20 backdrop-blur-sm shadow-sm
                ${activeTab === tab
                  ? 'bg-white/20 font-bold'
                  : 'bg-white/10 hover:bg-white/20 transition'
                }`}
              custom={index}
              variants={fadeIn}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* 🔄 Loading */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span className="ml-4 text-white/70 text-sm">
              {lang === 'id' ? 'Memuat project...' : 'Loading projects...'}
            </span>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentProjects.map((project, index) => (
              <motion.a
                key={project.id || index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition hover:scale-[1.02]"
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover transition-all duration-300 rounded-t-xl ${currentProjects.length === 1
                    ? 'h-60 sm:h-64 md:h-72 max-w-2xl mx-auto'
                    : 'h-44 sm:h-48 md:h-52'
                    }`}
                />
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {project.description?.[lang] || project.description?.en}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      <motion.a
        href="#sertifikasi"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to Certifications"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FaChevronDown size={24} />
      </motion.a>
    </section>
  );
}
