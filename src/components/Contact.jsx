import React from 'react';
import emailjs from 'emailjs-com';
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
        () => alert(lang === 'id' ? 'Pesan berhasil dikirim!' : 'Message sent successfully!'),
        (error) =>
          alert(
            (lang === 'id' ? 'Gagal mengirim pesan: ' : 'Failed to send message: ') +
              error.text
          )
      );

    e.target.reset();
  };

  return (
    <section id="contact" className="py-20 flex flex-col items-center px-4 gap-10">
      {/* Contact Form */}
      <div className="w-full md:max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-2xl p-10">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
        </h2>
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
          <button
            type="submit"
            className="bg-indigo-500 px-6 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all w-full"
          >
            {lang === 'id' ? 'Kirim' : 'Send'}
          </button>
        </form>
      </div>

      {/* Social Media */}
      <div className="w-full md:max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md rounded-2xl p-10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-6">
          {lang === 'id' ? 'Terhubung dengan Saya' : 'Connect with Me'}
        </h3>
        <div className="flex justify-center gap-6 text-white text-2xl">
          <a
            href="https://www.youtube.com/@millenialzdev"
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
        </div>
      </div>
    </section>
  );
}
