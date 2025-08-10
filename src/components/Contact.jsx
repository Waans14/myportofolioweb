import React from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaYoutube,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaBriefcase,
} from 'react-icons/fa';

export default function Contact({ lang }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_mp90nnc',
        'template_8aooypa',
        e.target,
        'zjuVAQbKojrXmTRMx'
      )
      .then(
        () =>
          alert(
            lang === 'id'
              ? 'Pesan berhasil dikirim!'
              : 'Message sent successfully!'
          ),
        (error) =>
          alert(
            (lang === 'id' ? 'Gagal mengirim pesan: ' : 'Failed to send message: ') +
              error.text
          )
      );

    e.target.reset();
  };

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <section id="contact" className="py-20 flex flex-col items-center px-4 gap-10">
      {/* Contact Form */}
      <motion.div
        className="w-full md:max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-2xl p-10"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-semibold text-white mb-6 text-center h-[40px]"
          variants={fadeIn}
        >
          <Typewriter
            words={[lang === 'id' ? 'Hubungi Saya' : 'Contact Me']}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={80}
          />
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder={lang === 'id' ? 'Nama' : 'Name'}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder={lang === 'id' ? 'Pesan' : 'Message'}
            rows="5"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <motion.button
            type="submit"
            className="bg-indigo-500 px-6 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all w-full"
            variants={fadeIn}
            custom={2}
          >
            {lang === 'id' ? 'Kirim' : 'Send'}
          </motion.button>
        </form>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        className="w-full md:max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-2xl p-10 text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <motion.h3
          className="text-2xl font-semibold text-white mb-6"
          variants={fadeIn}
          custom={4}
        >
          {lang === 'id' ? 'Terhubung dengan Saya' : 'Connect with Me'}
        </motion.h3>

        <motion.div
          className="flex justify-center gap-6 text-white text-2xl"
          variants={fadeIn}
          custom={5}
        >
          <a
            href="https://www.youtube.com/@afwansu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://github.com/waans14"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/afwansu_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/afwan-sutdrajat-1bb70023b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://fastwork.id/user/waans14"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            aria-label="Fastwork"
          >
            <FaBriefcase />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
