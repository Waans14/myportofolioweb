import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';

const certifications = [
  {
    name: {
      en: 'Belajar Dasar Pemrograman Web',
      id: 'Belajar Dasar Pemrograman Web',
    },
    image:
      'https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/logo/20200914161601d5cb0905e1b7ee65e8381e9d6efba54b.png',
    link: 'https://www.dicoding.com/certificates/XXXXXX',
  },
  {
    name: {
      en: 'Cloud Computing - Bangkit Academy 2023',
      id: 'Cloud Computing - Bangkit Academy 2023',
    },
    image: 'https://storage.googleapis.com/bangkit-academy/logo/bangkit-logo.png',
    link: 'https://www.bangkit.academy/XXXXXX',
  },
  {
    name: {
      en: 'UX Design Essentials',
      id: 'Dasar-dasar Desain UX',
    },
    image:
      'https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/logo/20201222124837c83a2249dc0cb12dd2817390f53de34d.png',
    link: 'https://www.dicoding.com/certificates/XXXXXX',
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
