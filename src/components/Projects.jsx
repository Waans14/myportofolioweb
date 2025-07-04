import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function Projects({ lang }) {
  const [activeTab, setActiveTab] = useState('All');

  // Tabs multilingual
  const projectTabs = [
    lang === 'id' ? 'Semua' : 'All',
    'Web',
    'Android',
    'ML',
    'UI/UX',
  ];

  const projects = [
    {
      title: 'Portfolio Website',
      description: {
        en: 'Responsive site built with React and Tailwind.',
        id: 'Situs responsif menggunakan React dan Tailwind.',
      },
      image: 'https://via.placeholder.com/400x200',
      category: 'Web',
      link: 'https://your-web-link.com',
    },
    {
      title: 'Chat App',
      description: {
        en: 'Real-time Android app with Firebase.',
        id: 'Aplikasi Android real-time dengan Firebase.',
      },
      image: 'https://via.placeholder.com/400x200',
      category: 'Android',
      link: 'https://your-android-link.com',
    },
    {
      title: 'Image Classifier',
      description: {
        en: 'ML model to detect plant disease.',
        id: 'Model ML untuk mendeteksi penyakit tanaman.',
      },
      image: 'https://via.placeholder.com/400x200',
      category: 'ML',
      link: 'https://your-ml-link.com',
    },
    {
      title: 'UI Concept',
      description: {
        en: 'Modern mobile UI prototype.',
        id: 'Prototype UI mobile modern.',
      },
      image: 'https://via.placeholder.com/400x200',
      category: 'UI/UX',
      link: 'https://your-uiux-link.com',
    },
    {
      title: 'Fastwork Profile',
      description: {
        en: 'Freelance projects for various clients.',
        id: 'Proyek freelance untuk berbagai klien.',
      },
      image: 'https://via.placeholder.com/400x200',
      category: 'Web',
      link: 'https://fastwork.id/user/afwandev',
    },
  ];

  const filteredProjects =
    activeTab === 'All' || activeTab === 'Semua'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section id="projects" className="py-20 flex flex-col items-center px-4">
      <div className="w-full md:max-w-6xl">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          {lang === 'id' ? 'Proyek' : 'Projects'}
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {projectTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-white text-sm border border-white/20 backdrop-blur-sm shadow-sm
                ${
                  activeTab === tab
                    ? 'bg-white/20 font-bold'
                    : 'bg-white/10 hover:bg-white/20 transition'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition hover:scale-[1.02]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-white/80">
                  {project.description[lang] || project.description.en}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Down Icon */}
      <a
        href="#sertifikasi"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to Certifications"
      >
        <FaChevronDown size={24} />
      </a>
    </section>
  );
}
