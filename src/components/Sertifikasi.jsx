import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';

const certifications = [
  {
    name: {
      en: 'Starting Programming Basics to Become a Developer',
      id: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1SyDgfffcAcrdeoLFQVzJrChj_vvAyMQT/view?usp=sharing',
  },
  {
    name: {
      en: 'Introduction to Programming Logic (Programming Logic 101)',
      id: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1jELSDFg8SpnsWgVCBHBcxeM9n_93R-_f/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning Git Basics with GitHub',
      id: 'Belajar Dasar Git dengan GitHub',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1SGs_dE7Ao7LlTqeApelIGBCfO8s7KJsn/view?usp=drive_link',
  },
  {
    name: {
      en: 'Getting Started with Programming in Java',
      id: 'Memulai Pemrograman Dengan Java',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1aHWzC3CEba0zapFgDKbOKrl5qK_XuQYs/view?usp=sharing',
  },
  {
    name: {
      en: 'Getting Started with Programming in Kotlin',
      id: 'Memulai Pemrograman Dengan Kotlin',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1SQuQnEnUkxYFgBCMkVkeK8vDoTPc1RX1/view?usp=drive_link',
  },
  {
    name: {
      en: 'Getting Started with Programming in Kotlin',
      id: 'Belajar Membuat Aplikasi Android untuk Pemula',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1ZaK_FiuG_B1qdUdy8OwvM3KgjuJtN5TG/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning Android App Fundamentals',
      id: 'Belajar Fundamental Aplikasi Android',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1KJE_PzN8aL_1PTjw_fqMwS2BurI2UA_x/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning Intermediate Android App Development',
      id: 'Belajar Pengembangan Aplikasi Android Intermediate',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1rASWdb0j0pm6B0aFH2yMb_-4lJHO1opQ/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning to Build Android Apps with Jetpack Compose',
      id: 'Belajar Membuat Aplikasi Android dengan Jetpack Compose',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1QkyuD7Upuf1uvSF77Urr4Vz8q6wxf2qC/view?usp=drive_link',
  },
  {
    name: {
      en: 'Becoming an Expert Android Developer',
      id: 'Menjadi Android Developer Expert',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1BIyYco7dsHKhFmu_3pZbJkNpygPb6BJg/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning the Basics of UX Design',
      id: 'Belajar Dasar UX Design',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1bAeA4wB4C4f7yXVmMBWX7Bj_M3emsxlu/view?usp=drive_link',
  },
  {
    name: {
      en: 'Cloud Practitioner Essentials',
      id: 'Belajar Dasar AWS Cloud',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1Yk4mqlRChySdqalEr0kEJscfdWVRQuEb/view?usp=drive_link',
  },
  {
    name: {
      en: 'Learning the Basics of Data Visualization',
      id: 'Belajar Dasar Visualisasi Data',
    },
    image:
      'https://assets.cdn.dicoding.com/original/commons/certificate_logo.png',
    link: 'https://drive.google.com/file/d/1LiFnDHHv3l00HJ-d69ydw3-MWYUV8X1L/view?usp=drive_link',
  },
  {
    name: {
      en: '[Bangkit 2023 Batch 2] Certificate - Mobile Development',
      id: '[Bangkit 2023 Batch 2] Certificate - Mobile Development',
    },
    image:
      'https://www.dicoding.com/img/bangkit/logo.svg',
    link: 'https://drive.google.com/file/d/1LWXgJ-lMgm2lABAaAt0fkC9jMMOi7KSI/view?usp=drive_link',
  },
  {
    name: {
      en: 'English for Business Communication',
      id: 'English for Business Communication',
    },
    image:
      'https://www.dicoding.com/img/bangkit/logo.svg',
    link: 'https://drive.google.com/file/d/15lZltnsgT9bDO_vualtpKhqCCj6darnv/view?usp=drive_link',
  },
  {
    name: {
      en: 'Introduction to Containers with Podman (DO188)',
      id: 'Introduction to Containers with Podman (DO188)',
    },
    image:
      'https://www.redhat.com/rhdc/managed-files/Logo-Red_Hat-Academy-A-Red-RGB.png',
    link: 'https://drive.google.com/file/d/1A3_RYxWYrgOXI_jazbi1tCh6IllxHWNH/view?usp=drive_link',
  },
  {
    name: {
      en: 'SDGs Hero CLP 9 - IT Development',
      id: 'SDGs Hero CLP 9 - IT Development',
    },
    image:
      'https://www.its.ac.id/pwk/wp-content/uploads/sites/35/2022/07/Bakrie-Center-Foundation.png',
    link: 'https://drive.google.com/file/d/1HQTykbUHXnrJTRJwrItB3veItVQneOR_/view?usp=sharing',
  },
  {
    name: {
      en: 'Top 10 Semifinalists – Proxocoris International 2025',
      id: 'Top 10 Semifinalists – Proxocoris International 2025',
    },
    image:
      'https://proxo2025.vercel.app/assets/proxo-DUpb0bXh.png',
    link: 'https://drive.google.com/file/d/12Ngu3bs_XtmXQr5Iiesm0g4lvIN-uBjo/view?usp=sharing',
  },
  {
    name: {
      en: 'Best Functionality – Web Development Category',
      id: 'Best Functionality – Web Development Category',
    },
    image:
      'https://proxo2025.vercel.app/assets/proxo-DUpb0bXh.png',
    link: 'https://drive.google.com/file/d/1LwQj3FoRT2yTpzvbj1BV2CwwDF-seDzI/view?usp=sharing',
  },
];

export default function Sertifikasi({ lang }) {
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
        viewport={{ once: true, amount: 0.2 }}
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

        {/* Certificate Cards */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
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
                src={cert.image}
                alt={cert.name[lang]}
                className="w-16 h-16 object-contain rounded-md bg-white/10 p-1"
              />
              <div className="text-left">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-white hover:text-blue-400 transition font-medium"
                >
                  {cert.name[lang]}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
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
    </section>
  );
}
