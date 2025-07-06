import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';
import webPortoImg from '../assets/web_porto.png';
import webBioImg from '../assets/bio.png';
import RickyMortyImg from '../assets/rickymortyapp.png';
import PolindromImg from '../assets/polindrom.jpg';
import KlasifikasiBeritaImg from '../assets/klasifikasiberita.png';
import PasKitaImg from '../assets/paskita.png';
import HabaInggrehImg from '../assets/haba.png';
import KSPRImg from '../assets/kspr.png';
import PasKitaAppImg from '../assets/paskitaandroid.png';
import IvaTesImg from '../assets/ivates.png';
import PengingatBelanjaanImg from '../assets/pengingatbelanjaan.png';
import PORAImg from '../assets/pora.png';
import UWRImg from '../assets/uwr.png';
import BanaMeterImg from '../assets/banameter.png';
import InspirasiImg from '../assets/inspirasi.png';

export default function Projects({ lang }) {
  const [activeTab, setActiveTab] = useState(lang === 'id' ? 'Semua' : 'All');

  // Tabs multilingual
  const projectTabs = [
    lang === 'id' ? 'Semua' : 'All',
    'Web',
    'Android',
    'ML',
    'UI/UX',
  ];

  const projects = [

    // Web Projects
    {
      title: 'My Portfolio Website',
      description: {
        en: 'Responsive site built with React + Vite and Tailwind.',
        id: 'Situs responsif menggunakan React + js dan Tailwind.',
      },
      image: webPortoImg,
      category: 'Web',
      link: 'https://afwansutdrajat.vercel.app/',
    },
    {
      title: 'Link In Bio Website',
      description: {
        en: 'Responsive site built with React + Vite and Tailwind.',
        id: 'Situs responsif menggunakan React + js dan Tailwind.',
      },
      image: webBioImg,
      category: 'Web',
      link: 'https://afwansu.vercel.app/',
    },
    {
      title: 'InSPIRASI Company Profile Website',
      description: {
        en: 'Responsive Company Profile site built with Laravel and Tailwind.',
        id: 'Situs Company Profile responsif menggunakan Laravel dan Tailwind.',
      },
      image: InspirasiImg,
      category: 'Web',
      link: 'https://github.com/PKBI-NTB/Inspirasi',
    },

    // Android Projects
    {
      title: 'Ricky Morty Character App',
      description: {
        en: 'A real-time Android app that displays Rick and Morty characters using the Rick and Morty API',
        id: 'Aplikasi Android real-time yang menampilkan karakter Rick and Morty menggunakan API Rick and Morty.',
      },
      image: RickyMortyImg,
      category: 'Android',
      link: 'https://github.com/Waans14/Rick-Morty-API',
    },
    {
      title: 'Haba Inggreh App',
      description: {
        en: 'An Android app for learning English speaking and listening skills, featuring practice exercises and quizzes to test comprehension.',
        id: 'Aplikasi Android untuk belajar keterampilan berbicara dan mendengarkan dalam bahasa Inggris, dilengkapi latihan dan kuis untuk menguji pemahaman.',
      },
      image: HabaInggrehImg,
      category: 'Android',
      link: 'https://mega.nz/file/A203yLhJ#yNiX7fGsGjq8iwdr-EMWHWjCHoGffo5_c_vBaxG5E8Y',
    },
    {
      title: 'KSPR App',
      description: {
        en: 'An Android app for early detection of high-risk pregnancies using the Poedji Rochyati Score Card (KSPR), which evaluates pregnancy risk based on health factors.',
        id: 'Aplikasi Android untuk deteksi dini kehamilan berisiko tinggi menggunakan Kartu Skor Poedji Rochyati (KSPR) yang menilai risiko kehamilan berdasarkan faktor-faktor kesehatan.',
      },
      image: KSPRImg,
      category: 'Android',
      link: 'https://mega.nz/file/c68nnAqQ#LVoEZ6I9Ip6K7z80dzxDYEaJo5JEBf2FS-gxraWzyAY',
    },
    {
      title: 'PasKita App',
      description: {
        en: 'An Android marketplace app that offers a variety of local Indonesian products, developed as part of the Bangkit Capstone Project.',
        id: 'Aplikasi Android marketplace yang menyediakan berbagai produk lokal khas Indonesia, dikembangkan sebagai bagian dari Proyek Capstone Bangkit.',
      },
      image: PasKitaAppImg,
      category: 'Android',
      link: 'https://mega.nz/file/A2tWRb5C#6FthRotE0BkdeEVKyGOhDK8IRjXVw-KvhUIhmMM8of4',
    },
    {
      title: 'Pemeriksaan IVA Tes App',
      description: {
        en: 'A mobile app for IVA test checks, providing information and guidance on women\'s health check procedures.',
        id: 'Aplikasi Android untuk pemeriksaan IVA tes, yang menyediakan informasi dan panduan tentang prosedur pemeriksaan kesehatan wanita.',
      },
      image: IvaTesImg,
      category: 'Android',
      link: 'https://mega.nz/file/V383ja5T#0wzEnbbPW5VTkLJp471cpETQDqVm5PqoR_XhNUW-Jls',
    },
    {
      title: 'Pengingat Belanjaan App',
      description: {
        en: 'An Android shopping reminder app that helps users manage their shopping lists easily and track total shopping costs.',
        id: 'Aplikasi Android untuk mengingatkan belanjaan, yang membantu pengguna mengelola daftar belanjaan mereka dengan mudah. serta total harga belanjaan.',
      },
      image: PengingatBelanjaanImg,
      category: 'Android',
      link: 'https://mega.nz/file/cy1QwSJb#Tuo1e2umSXnQrC9Cb_hVCXBpHO9w0rg_-c5wGyZyRkY',
    },
    {
      title: 'PORA App',
      description: {
        en: 'An Android app for learning athletics sports, providing information and guides on various athletics disciplines.',
        id: 'Aplikasi Android untuk pembelajaran olahraga atletik, yang menyediakan informasi dan panduan tentang berbagai cabang olahraga atletik.',
      },
      image: PORAImg,
      category: 'Android',
      link: 'https://mega.nz/file/ti9knLLT#04v45dTQSmZJwSLmUEaTn2bg1oYVAFzm72VaLEJVxqA',
    },
    {
      title: 'UWR Consulting App',
      description: {
        en: 'An Android app for selfie-based attendance check-in and check-out for UWR Consulting employees, restricted to use only around UWR Consulting project areas.',
        id: 'Aplikasi Android untuk absensi masuk dan pulang berbasis selfie bagi karyawan UWR Consulting, yang hanya dapat digunakan di sekitar area proyek UWR Consulting.',
      },
      image: UWRImg,
      category: 'Android',
      link: 'https://mega.nz/file/ti9knLLT#04v45dTQSmZJwSLmUEaTn2bg1oYVAFzm72VaLEJVxqA',
    },
    {
      title: 'Polindrom App',
      description: {
        en: 'An Android app that checks whether a given word or phrase is a palindrome in real-time.',
        id: 'Aplikasi Android yang memeriksa apakah sebuah kata atau frasa merupakan palindrom secara real-time.',
      },
      image: PolindromImg,
      category: 'Android',
      link: 'https://github.com/Waans14/Mobile-Developer-Intern-2024-Suitmedia',
    },

    // Machine Learning Projects
    {
      title: 'Klasifikasi Berita Palsu Menggunakan Random Forest',
      description: {
        en: 'Machine learning model using Random Forest to classify fake news based on text data.',
        id: 'Model machine learning menggunakan Random Forest untuk mengklasifikasikan berita palsu berdasarkan data teks.',
      },
      image: KlasifikasiBeritaImg,
      category: 'ML',
      link: 'https://colab.research.google.com/drive/1c9wtpKJFXFIuWmnYVtSBHkNQ-_DupLiH',
    },
    {
      title: 'BananaRipeness Apps',
      description: {
        en: 'An Android app that uses a machine learning model to classify the ripeness level of bananas based on images.',
        id: 'Aplikasi Android yang menggunakan model machine learning untuk mengklasifikasikan tingkat kematangan buah pisang berdasarkan gambar.',
      },
      image: BanaMeterImg,
      category: 'ML',
      link: 'https://github.com/Waans14/BananaRipeness',
    },

    // UI/UX Projects
    {
      title: 'PasKita Mobile App',
      description: {
        en: 'Mobile UI/UX prototype for the Bangkit Capstone Project, designed with modern and user-friendly interface principles.',
        id: 'Prototipe UI/UX aplikasi mobile untuk Proyek Capstone Bangkit, dirancang dengan prinsip antarmuka modern dan ramah pengguna.',
      },
      image: PasKitaImg,
      category: 'UI/UX',
      link: 'https://www.figma.com/design/NjzpdezBiHSDca0HsfaXgG/PasKita-Capstone-Project?node-id=0-1&t=wvJrhKPw4bo77Aiz-1',
    },
  ];

  const filteredProjects =
    activeTab === 'All' || activeTab === 'Semua'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  // Variants for motion
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
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Header with Typewriter */}
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

        {/* Tabs with fade in */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          variants={fadeIn}
        >
          {projectTabs.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-white text-sm border border-white/20 backdrop-blur-sm shadow-sm
                ${
                  activeTab === tab
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

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.a
              key={index}
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
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-white/80">
                  {project.description[lang] || project.description.en}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll Down Icon with fade in */}
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
