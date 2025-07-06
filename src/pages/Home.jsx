// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlassConnector from "../components/GlassConnector";
import SectionWrapper from "../components/SectionWrapper";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Sertifikasi from "../components/Sertifikasi";
import Contact from "../components/Contact";
import Squares from "../components/Squares";

export default function Home() {
  const { scrollY } = useScroll();
  const yAurora = useTransform(scrollY, [0, 500], [0, -100]);

  const currentYear = new Date().getFullYear();
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.toLowerCase().includes("en")) {
      setLang("en");
    }
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col">
      <motion.div className="absolute inset-0 -z-10" style={{ y: yAurora }}>
        <Squares
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#222"
          hoverFillColor="#222"
        />
      </motion.div>

      <Navigation lang={lang} setLang={setLang} />

      <main className="px-4 md:px-16 space-y-40 flex-grow">
        <SectionWrapper>
          <Hero lang={lang} />
        </SectionWrapper>
        <GlassConnector />
        <SectionWrapper>
          <About lang={lang} />
        </SectionWrapper>
        <GlassConnector />
        <SectionWrapper>
          <Projects lang={lang} />
        </SectionWrapper>
        <GlassConnector />
        <SectionWrapper>
          <Sertifikasi lang={lang} />
        </SectionWrapper>
        <GlassConnector />
        <SectionWrapper>
          <Contact lang={lang} />
        </SectionWrapper>
      </main>

      <footer className="text-center text-white/70 text-sm py-6 border-t border-white/10">
        {lang === 'id'
          ? `© ${currentYear} Afwan Sutdrajat. Semua hak cipta dilindungi.`
          : `© ${currentYear} Afwan Sutdrajat. All rights reserved.`}
      </footer>
    </div>
  );
}
