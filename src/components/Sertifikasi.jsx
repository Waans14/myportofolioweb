import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';
import { supabase } from '../supabaseClient';



export default function Sertifikasi({ lang }) {
  const [certifications, setCertifications] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    const { data, error } = await supabase.from('sertifikasi').select('*').order('created_at', { ascending: false });
    if (!error) setCertifications(data);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Filter and Pagination Logic
  const filteredItems = certifications.filter((cert) => {
    if (activeTab === 'All') return true;
    return cert.kategori?.toLowerCase().includes(activeTab.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Motion fade-in variant
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <section id="sertifikasi" className="py-20 flex flex-col items-center px-4">
      <motion.div
        className="w-full md:max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Header with Typewriter */}
        <motion.h2
          className="text-3xl font-semibold text-white text-center mb-10 h-[40px]"
          variants={fadeIn}
        >
          <Typewriter
            words={[lang === 'id' ? 'Sertifikasi' : 'Certifications']}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={80}
          />
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {['All', 'Android', 'Web'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {tab === 'All' ? (lang === 'id' ? 'Semua' : 'All') : tab}
            </button>
          ))}
        </div>

        {/* Certificate Cards */}
        <div className="space-y-6">
          {currentItems.map((cert, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-xl p-4 hover:bg-white/20 transition"
              custom={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={cert.image_url}
                alt={lang === 'id' ? cert.name_id : cert.name_en}
                className="w-16 h-16 object-contain rounded-md bg-white/10 p-1"
              />
              <div className="text-left">
                <span className="text-xs font-semibold text-blue-300 bg-blue-500/10 px-2 py-1 rounded mb-1 inline-block">
                  {cert.kategori}
                </span>
                <br />
                <a
                  href={cert.certificate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-white hover:text-blue-400 transition font-medium"
                >
                  {lang === 'id' ? cert.name_id : cert.name_en}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
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

      {/* Scroll Down Icon */}
      <motion.a
        href="#contact"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to Contact"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FaChevronDown size={24} />
      </motion.a>
    </section >
  );
}
