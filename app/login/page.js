"use client";
import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", form.username);
      formData.append("password", form.password);

      const res = await API.post("/login", formData);
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-950 overflow-hidden font-sans">
      {/* Background Decor (Halo orange subtil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Login Card avec Animation Framer Motion */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[440px] p-10 rounded-[2.5rem] bg-gray-900/40 border border-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        
        {/* Header avec Logo Stylisé */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.3)] mb-6 transform rotate-3">
             <span className="text-gray-950 text-3xl font-black italic">P</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Espace RH</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Authentification sécurisée HR-Pulse</p>
        </div>
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Champ Username avec Icône */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Utilisateur</label>
            <div className="relative group">
              <input
                className="w-full bg-gray-950/60 border border-white/5 text-white p-4 pl-12 rounded-2xl focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-700"
                placeholder="Ex: john_doe"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Champ Password avec Icône */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Mot de passe</label>
            <div className="relative group">
              <input
                className="w-full bg-gray-950/60 border border-white/5 text-white p-4 pl-12 rounded-2xl focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-700"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Actions additionnelles */}
          <div className="flex justify-between items-center px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 accent-orange-500 rounded border-gray-800 bg-gray-900" />
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Rester connecté</span>
            </label>
            <span className="text-xs text-orange-400 hover:text-orange-300 cursor-pointer font-medium">Oublié ?</span>
          </div>

          {/* Bouton de Soumission avec état de chargement */}
          <button 
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 disabled:cursor-not-allowed text-gray-950 font-black py-4 rounded-2xl transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)] transform hover:-translate-y-1 active:scale-95 mt-2 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "ACCÉDER AU DASHBOARD"
            )}
          </button>
        </form>

        {/* Footer Card */}
        <p className="mt-10 text-center text-gray-500 text-xs font-medium">
          DÉBUTANT SUR LA PLATEFORME ?{" "}
          <span 
            onClick={() => router.push("/register")}
            className="text-orange-500 cursor-pointer hover:text-orange-400 transition-colors ml-1 border-b border-orange-500/20 pb-0.5"
          >
            CRÉER UN COMPTE
          </span>
        </p>
      </motion.div>

      {/* Copyright discret type SaaS */}
      <div className="absolute bottom-6 flex items-center gap-4 text-gray-700 text-[10px] uppercase tracking-[0.2em] font-bold">
        <span>Sécurité SSL 256-bit</span>
        <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
        <span>© 2026 HR-Pulse INC.</span>
      </div>
    </div>
  );
}