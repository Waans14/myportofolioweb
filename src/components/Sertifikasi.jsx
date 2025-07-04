import React from 'react';
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
  return (
    <section id="sertifikasi" className="py-20 flex flex-col items-center px-4">
      <div className="w-full md:max-w-4xl">
        <h2 className="text-3xl font-semibold text-white text-center mb-10">
          {lang === 'id' ? 'Sertifikasi' : 'Certifications'}
        </h2>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-xl p-4 hover:bg-white/20 transition"
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
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Icon */}
      <a
        href="#contact"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to Contact"
      >
        <FaChevronDown size={24} />
      </a>
    </section>
  );
}
