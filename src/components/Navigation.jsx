import React from 'react';
import { Home, User, Folder, File, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: <Home size={24} />, id: 'hero' },
  { label: 'About', icon: <User size={24} />, id: 'about' },
  { label: 'Projects', icon: <Folder size={24} />, id: 'projects' },
  { label: 'Certifications', icon: <File size={24} />, id: 'sertifikasi' },
  { label: 'Contact', icon: <Mail size={24} />, id: 'contact' }
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navigation({ lang, setLang }) {
  return (
    <nav className="fixed bottom-4 md:top-4 md:bottom-auto left-1/2 -translate-x-1/2 z-50">
      <div className="flex md:flex-row flex-row items-center md:rounded-full rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-md overflow-hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex flex-col items-center justify-center px-4 py-2 text-sm text-white hover:bg-white/20 transition-all"
          >
            {item.icon}
            <span className="text-xs mt-1 hidden md:block">{item.label}</span>
          </button>
        ))}
        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          className="px-4 py-2 text-2xl text-white hover:bg-white/20 transition-all"
          aria-label="Toggle language"
        >
          {lang === 'id' ? '🇺🇸' : '🇮🇩'}
        </button>
      </div>
    </nav>
  );
}
