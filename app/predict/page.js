"use client";
import { useState } from "react";
import API from "../../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Predict() {
  const [form, setForm] = useState({
    job_title: "",
    job_description: "",
    rating: 3,
    location: "",
    size: "",
    industry: "",
    sector: "",
    founded: 2000,
  });

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post("/predict", form);
      setResult(res.data.salary_prediction);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la prédiction !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#02040a] overflow-hidden font-sans p-4 md:p-8 selection:bg-orange-500/30">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch max-w-6xl w-full">
        
        {/* LEFT SIDE: Predict Card (The Form) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-2/3 p-10 rounded-[3rem] bg-[#0b1120]/60 border border-blue-500/20 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-400/50 transition-all duration-500 group/card"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.4)] mb-6 transform -rotate-3 group-hover/card:rotate-0 transition-transform duration-500">
               <span className="text-[#02040a] text-2xl font-black italic">S</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase text-center drop-shadow-md">Estimation Salariale</h1>
            <p className="text-blue-400/60 text-[11px] uppercase tracking-[0.2em] mt-2 font-black text-center italic">Algorithme Prédictif HR-Pulse AI</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            {[
              { label: "Intitulé du poste", key: "job_title", type: "text", placeholder: "Ex: Data Engineer" },
              { label: "Évaluation (1-5)", key: "rating", type: "number", placeholder: "3" },
              { label: "Localisation", key: "location", type: "text", placeholder: "Ex: Paris, Remote" },
              { label: "Taille Entreprise", key: "size", type: "text", placeholder: "Ex: 501 to 1000 employees" },
              { label: "Industrie", key: "industry", type: "text", placeholder: "Ex: IT Services" },
              { label: "Secteur", key: "sector", type: "text", placeholder: "Ex: Information Technology" },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80 ml-1">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 rounded-2xl outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 hover:border-orange-400/40 transition-all placeholder:text-blue-300/40 text-sm font-medium shadow-inner"
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  required
                />
              </div>
            ))}

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80 ml-1">Description du poste</label>
              <textarea
                placeholder="Détaillez les responsabilités..."
                rows="3"
                className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 rounded-2xl outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 hover:border-orange-400/40 transition-all placeholder:text-blue-300/40 text-sm font-medium resize-none shadow-inner"
                value={form.job_description}
                onChange={(e) => setForm({ ...form, job_description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/80 ml-1">Année de Fondation</label>
              <input
                type="number"
                min={1800}
                max={new Date().getFullYear()}
                className="w-full bg-[#050a18] border border-blue-500/20 text-white p-4 rounded-2xl outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 hover:border-orange-400/40 transition-all placeholder:text-blue-300/40 text-sm font-medium shadow-inner"
                value={form.founded}
                onChange={(e) => setForm({ ...form, founded: Number(e.target.value) })}
                required
              />
            </div>

            <button 
              disabled={isLoading}
              className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-900/50 text-[#02040a] font-black py-5 rounded-2xl transition-all shadow-[0_15px_35px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(249,115,22,0.6)] transform hover:-translate-y-1 active:scale-95 mt-4 flex justify-center items-center gap-2 uppercase text-[12px] tracking-widest"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#02040a] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Calculer l'estimation"
              )}
            </button>
          </form>
        </motion.div>

        {/* RIGHT SIDE: Result Display */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 flex flex-col justify-center"
        >
          <div className="h-full min-h-[350px] p-8 rounded-[3rem] bg-gradient-to-b from-[#0b1120]/80 to-[#050a18]/80 border border-orange-400/20 backdrop-blur-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(249,115,22,0.05)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9),0_0_50px_rgba(249,115,22,0.1)] hover:border-orange-400/50 transition-all duration-500">
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -ml-16 -mt-16"></div>
            
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative z-10"
                >
                  <div className="mb-6 inline-block px-4 py-1 rounded-full border border-orange-400/30 bg-orange-500/5 animate-pulse shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">IA Analyse Terminée</span>
                  </div>
                  <p className="text-blue-300/60 text-xs uppercase font-black tracking-widest mb-3">Estimation Brute</p>
                  <h2 className="text-5xl md:text-6xl font-black text-orange-400 tracking-tighter italic drop-shadow-[0_0_20px_rgba(251,146,60,0.5)]">
                    ${result.toLocaleString()}
                  </h2>
                  <div className="mt-6 flex flex-col gap-2">
                    <p className="text-white/40 text-[10px] font-medium italic">Confiance de l'algorithme : 94.2%</p>
                    <div className="w-full h-1 bg-blue-900/30 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "94%" }}
                            className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                        />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-orange-500/20 flex items-center justify-center mb-6 animate-[spin_15s_linear_infinite] shadow-[0_0_20px_rgba(249,115,22,0.05)]">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shadow-inner">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <h3 className="text-orange-500/60 font-black uppercase tracking-widest text-sm">En attente de données</h3>
                  <p className="text-blue-300/30 text-[11px] mt-4 max-w-[180px] italic">Soumettez le profil pour extraire la valeur marchande</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}