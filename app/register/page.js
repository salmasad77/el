"use client";
import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/register", form);
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#02040a] overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Register Card avec Hover Glow sur la boîte entière */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[460px] p-10 rounded-[3rem] bg-[#0b1120]/60 border border-blue-500/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-orange-500/30 transition-all duration-500 group/card"
      >
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.3)] mb-6 transform -rotate-3 group-hover/card:rotate-0 transition-transform duration-500">
             <span className="text-[#02040a] text-2xl font-black italic">P</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic">Créer un profil</h1>
          <p className="text-blue-400/60 text-[11px] uppercase tracking-[0.2em] mt-2 font-black text-center italic">Rejoignez l'écosystème intelligent HR-Pulse</p>
        </div>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Champ Username */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/50 ml-1">Nom d'utilisateur</label>
            <div className="relative group">
              <input
                className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 pl-12 rounded-2xl outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 hover:border-blue-400/40 transition-all placeholder:text-blue-900/50 text-sm font-medium"
                placeholder="Ex: marc_rh"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 group-focus-within:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Champ Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/50 ml-1">Email Professionnel</label>
            <div className="relative group">
              <input
                className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 pl-12 rounded-2xl outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 hover:border-blue-400/40 transition-all placeholder:text-blue-900/50 text-sm font-medium"
                type="email"
                placeholder="marc@entreprise.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 group-focus-within:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Champ Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/50 ml-1">Mot de passe</label>
            <div className="relative group">
              <input
                className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 pl-12 rounded-2xl outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 hover:border-blue-400/40 transition-all placeholder:text-blue-900/50 text-sm font-medium"
                type="password"
                placeholder="••••••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-800 group-focus-within:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Conditions */}
          <p className="text-[10px] text-blue-400/30 px-2 text-center leading-relaxed font-bold italic">
            En cliquant sur s'inscrire, vous acceptez nos <span className="text-orange-500/80 underline cursor-pointer hover:text-orange-400">Conditions d'Utilisation</span>.
          </p>

          {/* Button */}
          <button 
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-900/50 text-[#02040a] font-black py-4 rounded-2xl transition-all shadow-[0_10px_25px_rgba(249,115,22,0.2)] hover:shadow-orange-500/40 transform hover:-translate-y-1 active:scale-95 mt-2 flex justify-center items-center gap-2 uppercase text-[11px] tracking-widest"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#02040a] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Initialiser le compte"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-blue-400/40 text-[10px] font-black uppercase tracking-widest">
          DÉJÀ MEMBRE ?{" "}
          <span 
            onClick={() => router.push("/login")}
            className="text-orange-500 cursor-pointer hover:text-orange-400 transition-colors ml-1 border-b border-orange-500/20 pb-0.5"
          >
            SE CONNECTER
          </span>
        </p>
      </motion.div>
    </div>
  );
}