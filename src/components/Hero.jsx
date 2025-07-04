import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaWhatsapp, FaFilePdf, FaChevronDown } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.png";

export default function Hero({ lang }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShowDescription(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const name = "Afwan Sutdrajat";

  const titles = lang === "id"
    ? ["Android & Web Development", "Content Creator", "Freelancer"]
    : ["Android & Web Development", "Content Creator", "Freelancer"];

  const description = lang === "id"
    ? "Sejak tahun 2022, saya bekerja sebagai pengembang Android freelance menggunakan Java dan Kotlin. Ketertarikan saya terhadap pengalaman pengguna yang baik juga mendorong saya untuk berkembang di bidang web development."
    : "Since 2022, I’ve been working as a freelance Android developer using Java and Kotlin. My passion for building great user experiences has also driven me to explore and grow in web development.";

  const downloadLabel = lang === "id" ? "Unduh CV" : "Download CV";
  const contactLabel = lang === "id" ? "Hubungi Saya" : "Contact Me";

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="h-screen flex flex-col items-center justify-center px-4 relative"
    >
      <motion.div
        ref={ref}
        className="mt-20 bg-white/10 border border-white/20 backdrop-blur-sm shadow-md rounded-2xl p-10 w-full md:max-w-5xl text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* IMAGE */}
        <motion.img
          variants={childVariants}
          src={profile}
          alt={name}
          className="w-[250px] h-[280px] object-cover rounded-xl mb-6 shadow-md"
        />

        {/* NAME */}
        <motion.h1
          variants={childVariants}
          className="text-4xl font-bold text-white mb-2 h-[50px] max-w-3xl w-full mx-auto"
        >
          <Typewriter
            words={[name]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={80}
          />
        </motion.h1>

        {/* TITLE */}
        <motion.h2
          variants={childVariants}
          className="text-xl text-indigo-200 mt-6 mb-4 h-[30px] max-w-2xl w-full mx-auto"
        >
          <Typewriter
            words={titles}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </motion.h2>

        {/* DESCRIPTION */}
        {showDescription && (
          <motion.p
            className="text-white/90 mb-6 leading-relaxed max-w-3xl w-full mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {description}
          </motion.p>
        )}

        {/* BUTTONS */}
        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            variants={childVariants}
            href="/Afwan_Sutdrajat_CV.pdf"
            download="Afwan_Sutdrajat_CV.pdf"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full transition duration-300 text-white shadow-sm border border-white/20 backdrop-blur-sm bg-[#FE016F]/20 hover:bg-[#FE016F]/40"
          >
            <FaFilePdf className="text-xl" />
            {downloadLabel}
          </motion.a>
          <motion.a
            variants={childVariants}
            href="https://wa.me/6282145863515"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full transition duration-300 text-white shadow-sm border border-white/20 backdrop-blur-sm bg-[#7CFF67]/20 hover:bg-[#7CFF67]/40"
          >
            <FaWhatsapp className="text-xl" />
            {contactLabel}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* SCROLL ICON */}
      <a
        href="#about"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to About section"
      >
        <FaChevronDown size={24} />
      </a>
    </section>
  );
}
