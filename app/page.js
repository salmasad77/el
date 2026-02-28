"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "../components/AmbientBackground";
import TiltWrapper from "../components/TiltWrapper";


export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="text-blue-50 font-sans selection:bg-orange-500/30 transition-colors duration-500 bg-transparent relative">

      
      {/* --- SECTION HERO --- */}
      <section id="accueil" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <AmbientBackground />
        
        {/* Overlay Dégradé ajusté pour laisser passer l'image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/20 via-[#02040a]/70 to-[#02040a] z-10 pointer-events-none"></div>


        {/* Carte Hero Principale : BORDER BLEU CLAIR */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 w-[95%] max-w-6xl h-[750px] md:h-[650px] overflow-hidden rounded-[3rem] border border-blue-400/30 shadow-[0_0_50px_rgba(56,189,248,0.1)] flex flex-col bg-[#0b1120]/40 backdrop-blur-xl"
        >
          {/* Navigation Interne : BORDER B BLEU CLAIR */}
          <nav className="w-full bg-[#050a18]/40 backdrop-blur-md px-10 py-6 flex justify-between items-center border-b border-blue-400/20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center font-black text-[#02040a] transition-transform group-hover:scale-110">P</div>
              <span className="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">HR-Pulse</span>
            </div>
            <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/60">
              <a href="#accueil" className="hover:text-orange-400 transition-colors">Accueil</a>
              <a href="#fonctionnalites" className="hover:text-orange-400 transition-colors">Fonctionnalités</a>
              <a href="#tarification" className="hover:text-orange-400 transition-colors">Tarification</a>
              <a href="#support" className="hover:text-orange-400 transition-colors">Support</a>
            </div>
          </nav>

          {/* Contenu Central Hero */}
          <div className="flex-1 flex flex-col justify-center px-12 md:px-24 relative">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/10 blur-[140px] rounded-full -z-10 animate-pulse"></div>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-orange-500 text-xs font-black uppercase tracking-[0.4em] mb-4">L'avenir du recrutement</motion.p>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="text-5xl md:text-7xl font-black leading-[1.1] max-w-3xl text-white tracking-tighter drop-shadow-2xl">
              Optimisez vos talents <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent italic">par l'intelligence.</span>
            </motion.h1>
            <p className="mt-6 text-blue-100/60 max-w-lg text-lg leading-relaxed font-medium">
              Gérez vos candidats, simplifiez vos processus et prédisez les salaires avec une IA de pointe conçue pour les experts RH.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <button onClick={() => router.push("/login")} className="px-12 py-5 bg-orange-500 hover:bg-orange-600 text-[#02040a] font-black rounded-full transition-all shadow-[0_15px_30px_rgba(249,115,22,0.3)] transform hover:-translate-y-1 uppercase text-[11px] tracking-widest">Commencer l'essai</button>
              <button onClick={() => router.push("/register")} className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-blue-400/40 rounded-full font-bold text-sm transition-all backdrop-blur-sm shadow-xl hover:shadow-blue-500/20">Créer un compte</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION FONCTIONNALITÉS --- */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        id="fonctionnalites" className="py-32 px-10 relative overflow-hidden"
      >
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-orange-500 font-black tracking-[0.3em] uppercase text-[10px] mb-2">Propulsé par l'IA</h2>
          <p className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">Nos Solutions RH</p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 items-stretch">
          {[
            { title: "Analyse Prédictive", desc: "Anticipez les besoins en recrutement et prédisez les tendances salariales avec une précision algorithmique.", icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png" },
            { title: "Matching Intelligent", desc: "Notre moteur d'IA identifie instantanément les meilleurs profils en analysant compétences et potentiel.", icon: "https://cdn-icons-png.flaticon.com/512/11551/11551551.png", featured: true },
            { title: "Gestion du Vivier", desc: "Centralisez et sécurisez les données de vos candidats avec des protocoles de protection de pointe.", icon: "https://cdn-icons-png.flaticon.com/512/912/912214.png" }
          ].map((item, i) => (
            <TiltWrapper key={i} className="h-full">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className={`h-full relative p-8 rounded-[2.5rem] border transition-all duration-500 ${
                  item.featured 
                  ? 'bg-[#0b1120]/80 border-blue-400 shadow-[0_0_30px_rgba(56,189,248,0.2)] py-14 z-20' 
                  : 'bg-[#0b1120]/40 border-blue-400/20 hover:border-blue-400 shadow-2xl z-10'
                } group overflow-hidden flex flex-col`}
              >
                <div className="w-24 h-24 mb-8 flex items-center justify-center relative mx-auto">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-contain relative z-10 animate-float opacity-80" />
                </div>
                <h3 className="text-xl font-black mb-4 text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-blue-100/50 text-sm leading-relaxed mb-10 px-4 font-medium">{item.desc}</p>
                <div className="mt-auto">
                  <button className="w-full px-8 py-2 border border-blue-400/30 text-[9px] uppercase tracking-[0.2em] font-black text-blue-300 hover:bg-blue-400 hover:text-[#02040a] transition-all rounded-full">Détails</button>
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>

      </motion.section>

      {/* --- SECTION TARIFICATION --- */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
        id="tarification" className="py-32 bg-[#050a18]/60 border-y border-blue-400/10 relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-10 relative z-10">
          <div className="p-10 rounded-[2.5rem] bg-[#0b1120]/60 border border-blue-400/20 hover:border-blue-400/50 transition-all group">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-2">Standard</h3>
            <div className="text-5xl font-black text-white mb-6 tracking-tighter">49€<span className="text-sm text-blue-700 font-normal"> /mois</span></div>
            <ul className="space-y-4 text-blue-100/40 text-sm font-bold mb-8 italic"><li>✓ 500 candidats</li><li>✓ Prédictions IA de base</li><li>✓ Support email</li></ul>
            <button className="w-full py-5 rounded-2xl bg-white/5 border border-blue-400/20 hover:bg-blue-400/10 text-xs font-black uppercase tracking-widest transition">Choisir ce plan</button>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-amber-600 border border-orange-400 text-[#02040a] transform scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-5 right-5 bg-[#02040a] text-white text-[8px] px-4 py-1.5 rounded-full uppercase font-black tracking-widest shadow-lg">Populaire</div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-2 opacity-80">Entreprise</h3>
            <div className="text-5xl font-black mb-6 italic tracking-tighter">129€<span className="text-sm font-normal opacity-70"> /mois</span></div>
            <ul className="space-y-4 mb-10 font-black text-sm italic"><li>✓ Candidats illimités</li><li>✓ IA avancée & Personnalisée</li><li>✓ Support Prioritaire 24/7</li></ul>
            <button className="w-full py-5 rounded-2xl bg-[#02040a] text-white font-black hover:bg-black/80 transition-all text-xs uppercase tracking-widest">Essayer gratuitement</button>
          </div>
        </div>
      </motion.section>

      {/* --- SECTION SUPPORT --- */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        id="support" className="py-32 px-10 max-w-4xl mx-auto text-center"
      >
        <div className="bg-[#0b1120]/80 p-16 rounded-[3rem] border border-blue-400/30 shadow-3xl relative overflow-hidden group">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-6 italic">Besoin d'aide ?</h2>
          <p className="text-blue-100/40 mb-10 text-lg font-medium leading-relaxed max-w-xl mx-auto">Notre équipe est prête à vous accompagner.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <a href="mailto:support@hrpulse.com" className="text-white text-xl font-black hover:text-blue-400 transition-colors tracking-tight underline decoration-orange-500/50">support@hrpulse.com</a>
            <span className="text-white text-xl font-black italic tracking-tight">01 23 45 67 89</span>
          </div>
          <button onClick={() => router.push("/support")} className="px-14 py-5 bg-orange-500 text-[#02040a] font-black rounded-full shadow-2xl hover:bg-orange-600 transition-all uppercase text-xs tracking-widest">Centre d'aide</button>
        </div>
      </motion.section>

      <footer className="py-12 text-center border-t border-blue-400/10">
        <div className="text-blue-200/40 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 HR-Pulse • IA de Recrutement</div>
      </footer>

      <style jsx global>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; border: 2px solid #02040a; }
      `}</style>
    </div>
  );
}