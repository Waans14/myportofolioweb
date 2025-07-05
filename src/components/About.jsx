import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Typewriter } from 'react-simple-typewriter';
import { FaChevronDown } from 'react-icons/fa';

export default function About({ lang }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const title = lang === 'id' ? 'Tentang Saya' : 'About Me';

  const paragraphOne =
    lang === 'id'
      ? `Saya lulusan S1 Ilmu Komputer dari Universitas Bumigora dengan IPK 3.78 dan memiliki ketertarikan kuat di bidang pengembangan mobile dan web. Sejak tahun 2022, saya bekerja sebagai developer Android freelance di Fastwork.id dan juga sebagai kreator konten pemrograman di YouTube. Saya ahli dalam membangun aplikasi Android menggunakan Java dan Kotlin, serta senang membuat website responsif dengan React JS dan Tailwind CSS.`
      : `I’m a Computer Science graduate from Universitas Bumigora with a GPA of 3.78 and a strong passion for mobile and web development. Since 2022, I’ve worked as a freelance Android developer on Fastwork.id and a programming content creator on YouTube. I specialize in building Android apps using Java and Kotlin, and enjoy crafting responsive websites with React JS and Tailwind CSS.`;

  const paragraphTwo =
    lang === 'id'
      ? `Saya juga memiliki pengalaman langsung menggunakan Firebase, SQLite, MySQL, REST API, Laravel, React Js dan Tailwind. Selama perkuliahan, saya menyelesaikan magang di bidang IT support dan web development, serta meraih sertifikasi dari Bangkit by Google, Red Hat Academy, dan Dicoding. Saya adalah pembelajar cepat, kreatif, dan antusias dalam mengeksplorasi teknologi baru serta membangun solusi digital yang bermanfaat.`
      : `I also have hands-on experience with Firebase, SQLite, MySQL, REST APIs, Laravel, React Js and Tailwind. Throughout my academic journey, I completed internships in IT support and web development, and earned certifications from Bangkit by Google, Red Hat Academy, and Dicoding. I’m a fast learner, creative, and always excited to explore new technologies and build meaningful digital solutions.`;

  // Framer Motion Variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
    >
      <motion.div
        ref={ref}
        className="bg-white/10 border border-white/20 backdrop-blur-sm shadow-md rounded-2xl p-10 w-full md:max-w-5xl text-center flex flex-col items-center"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
          hidden: {},
        }}
      >
        {/* Lottie Animation */}
        <motion.div
          className="w-40 h-40 mb-6"
          variants={fadeInVariants}
        >
          <DotLottieReact
            src="https://lottie.host/cf2ea38c-4cbb-42b0-9ecd-b892db932a02/9lKI5clbFe.lottie"
            loop
            autoplay
          />
        </motion.div>

        {/* Title with typewriter */}
        <motion.h2
          className="text-3xl font-bold text-white mb-6 h-[40px]"
          variants={fadeInVariants}
        >
          <Typewriter
            words={[title]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={80}
          />
        </motion.h2>

        {/* Paragraphs with fade-in and text-center */}
        <div className="max-w-3xl text-lg leading-relaxed text-white/90 text-center space-y-6 min-h-[280px] mx-auto">
          {showContent && (
            <>
              <motion.p
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
              >
                {paragraphOne}
              </motion.p>
              <motion.p
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
              >
                {paragraphTwo}
              </motion.p>
            </>
          )}
        </div>
      </motion.div>

      {/* Scroll Down Icon */}
      <a
        href="#projects"
        className="mt-10 animate-bounce text-white/60 hover:text-white transition"
        aria-label="Scroll to Projects"
      >
        <FaChevronDown size={24} />
      </a>
    </section>
  );
}
