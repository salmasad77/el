"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function support() {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  // Variantes d'animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-gray-950 text-white font-sans selection:bg-orange-500/30">
      
      {/* ... (Sections Accueil, Fonctionnalités et Tarification précédentes) ... */}

      {/* --- SECTION SUPPORT (Animée & Stylisée) --- */}
      <section id="support" className="py-32 px-10 relative overflow-hidden">
        {/* Effet de lumière en arrière-plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div 
            whileHover={{ shadow: "0 0 50px rgba(249, 115, 22, 0.2)" }}
            className="bg-gradient-to-br from-gray-900 to-gray-950 p-12 md:p-20 rounded-[3rem] border border-gray-800 text-center shadow-2xl transition-all duration-500"
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </motion.div>

            <h2 className="text-4xl font-bold mb-6 tracking-tight">Besoin d'un accompagnement ?</h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              Notre équipe d'experts est disponible 24/7 pour vous aider à transformer votre processus de recrutement.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <motion.a 
                whileHover={{ y: -5 }}
                href="mailto:support@hrpulse.com" 
                className="group flex items-center gap-3 text-orange-400 font-bold text-xl transition-all"
              >
                <span className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">✉</span>
                support@hrpulse.com
              </motion.a>
              
              <div className="hidden md:block w-px h-12 bg-gray-800"></div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="group flex items-center gap-3 text-gray-300 font-bold text-xl"
              >
                <span className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">📞</span>
                01 23 45 67 89
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold transition-all"
            >
              Consulter la documentation
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-gray-900/50 relative z-10">
        <div className="flex justify-center gap-8 mb-8">
           {/* Icônes sociales fictives */}
           {['Twitter', 'LinkedIn', 'YouTube'].map(social => (
             <a key={social} href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">{social}</a>
           ))}
        </div>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.4em] font-medium italic">
          © 2026 HR-Pulse • Intelligence Artificielle au service de l'humain
        </p>
      </footer>
    </div>
  );
}