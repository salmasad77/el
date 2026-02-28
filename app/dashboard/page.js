"use client";
import { useEffect, useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, Briefcase, BarChart3, 
  Search, Database, Zap, MapPin, Cpu, Info, Calculator, ArrowRight 
} from "lucide-react";
import AmbientBackground from "../../components/AmbientBackground";
import TiltWrapper from "../../components/TiltWrapper";


export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [skill, setSkill] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayDate, setDisplayDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
      let formatted = now.toLocaleDateString('fr-FR', options);
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      setDisplayDate(formatted);
    };
    formatDate();
    fetchInitialJobs();
  }, []);

  const fetchInitialJobs = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) { console.error(err); } 
    finally { setIsLoading(false); }
  };

  const handleSearch = async (val) => {
    setSkill(val);
    if (val.trim() === "") { fetchInitialJobs(); return; }
    try {
      const res = await API.get(`/search?skill=${val}`);
      setJobs(res.data);
    } catch (err) { console.error(err); }
  };

  const sidebarIcons = {
    "Dashboard": <LayoutDashboard size={18} />,
    "Candidats": <Users size={18} />,
    "Offres": <Briefcase size={18} />,
    "Analyses": <BarChart3 size={18} />,
    "Prédiction": <Calculator size={18} />
  };

  return (
    <div className="flex min-h-screen text-blue-50 font-sans selection:bg-orange-500/30 bg-transparent">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#050a18] border-r border-blue-900/20 flex flex-col p-6 sticky top-0 h-screen z-50 shadow-2xl">

        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer group" onClick={() => router.push("/")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center justify-center font-black text-[#02040a]">
            <Cpu size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent italic">HR-Pulse</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {["Dashboard", "Candidats", "Offres", "Analyses"].map((item) => (
            <div key={item} 
              onClick={() => router.push(`/${item.toLowerCase()}`)}
              className={`group flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${item === "Dashboard" ? 'bg-orange-500/5 text-orange-500 border border-orange-500/20' : 'text-blue-700/60 hover:text-blue-300 hover:bg-white/5'}`}>
              <span className={item === "Dashboard" ? "text-orange-500" : "text-blue-700/60 group-hover:text-orange-400"}>
                {sidebarIcons[item]}
              </span>
              {item}
            </div>
          ))}

          <div 
            onClick={() => router.push("/predict")}
            className="group flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer text-blue-700/60 hover:text-orange-400 hover:bg-orange-500/5 border border-transparent hover:border-orange-500/20"
          >
            <span className="text-blue-700/60 group-hover:text-orange-500">
              {sidebarIcons["Prédiction"]}
            </span>
            Prédiction Salaire
          </div>
        </nav>

        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/10">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={12} className="text-orange-500 animate-pulse" />
            <p className="text-[10px] font-black text-orange-500/80 uppercase tracking-widest">Système IA</p>
          </div>
          <p className="text-[9px] text-blue-300/60 leading-tight font-medium">Extraction & Structuration active 2026.</p>
        </div>
      </aside>

      <main className="flex-1 p-8 lg:p-12 relative overflow-x-hidden z-10" style={{ perspective: "1200px" }}>
        <AmbientBackground />


        
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">Focus <span className="text-orange-500 tracking-normal text-2xl opacity-90 uppercase italic">Pipeline</span></h1>
            <p className="text-blue-400/50 text-xs font-bold mt-1 tracking-widest uppercase">{displayDate}</p>
          </div>

          {/* BARRE DE RECHERCHE AVEC LUMIÈRE INTENSIFIÉE ET EN MOUVEMENT */}
          <div className="relative group flex items-center justify-center">
            
            {/* 1. Halo de fond pulsant plus fort (Lueur fixe mais d'intensité variable) */}
            <div className="absolute inset-0 bg-orange-600/30 blur-[50px] rounded-full group-hover:animate-pulse transition-opacity duration-500"></div>
            
            {/* 2. Bordure animée plus intense (Le mouvement de rotation) */}
            <div className="absolute -inset-[5px] overflow-hidden rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#f97316_180deg,transparent_240deg,transparent_360deg)] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* 3. La Capsule de recherche */}
            <div className="relative flex items-center z-10">
              <input 
                type="text" 
                placeholder="Skill Intelligence..." 
                value={skill}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-80 bg-[#070b14] border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm text-white focus:outline-none transition-all 
                shadow-[0_0_20px_rgba(0,0,0,0.7)]
                placeholder:text-blue-300/40"
              />
              <div className="absolute left-5 text-blue-400 group-focus-within:text-orange-500 transition-colors">
                <Search size={20} strokeWidth={3} />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          <TiltWrapper>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push("/offres")}
              className="cursor-pointer bg-[#0b1120]/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-500/10 shadow-xl relative group overflow-hidden transition-all hover:border-orange-500/30 h-full"
            >
              <Database className="absolute -right-4 -top-4 text-white/5 rotate-12 group-hover:text-orange-500/5 transition-colors" size={120} />
              <p className="text-[10px] font-black text-blue-500 group-hover:text-orange-500 transition-colors uppercase tracking-widest mb-4 flex items-center gap-2">
                <Database size={14} /> Flux Total
              </p>
              <h3 className="text-4xl font-black text-white">{jobs.length}</h3>
              <div className="absolute bottom-6 right-8 w-10 h-10 bg-blue-500/5 group-hover:bg-orange-500 rounded-full flex items-center justify-center text-blue-500 group-hover:text-[#02040a] transition-all shadow-lg">
                <ArrowRight size={18} />
              </div>
            </motion.div>
          </TiltWrapper>
          
          <TiltWrapper>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push("/predict")}
              className="cursor-pointer bg-[#0b1120]/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-500/10 shadow-xl flex flex-col justify-between group hover:border-orange-500/30 transition-all h-full"
            >
              <div className="flex justify-between items-start">
                <div className="bg-blue-500/10 p-3 rounded-2xl group-hover:bg-orange-500/20 transition-all">
                  <Calculator size={24} className="text-blue-400 group-hover:text-orange-500 transition-all" />
                </div>
                <Zap size={20} className="text-blue-700/30 group-hover:text-orange-500/40" />
              </div>
              <div className="mt-8">
                <h3 className="text-white font-black text-xl italic uppercase leading-tight group-hover:text-orange-400 transition-colors">Simulateur<br/>Salarial AI</h3>
                <p className="text-blue-400/60 text-[10px] font-black uppercase mt-2 group-hover:text-orange-500/60">Analyse prédictive →</p>
              </div>
            </motion.div>
          </TiltWrapper>

          <TiltWrapper>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push("/analyses")}
              className="cursor-pointer bg-gradient-to-br from-[#0b1120]/80 to-[#050a18]/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-500/10 shadow-xl flex items-center justify-between group hover:border-orange-500/30 transition-all h-full"
            >
              <div>
                <p className="text-[10px] font-black text-indigo-400 group-hover:text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2 transition-colors">
                  <Zap size={14} className="text-orange-500" /> Performance
                </p>
                <h3 className="text-3xl font-black text-white">89.4%</h3>
              </div>
              <div className="flex gap-1 items-end h-12">
                 {[40, 70, 45, 90, 65].map((h, i) => (
                   <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="w-1.5 bg-blue-500/20 group-hover:bg-orange-500/40 rounded-full transition-colors" />
                 ))}
              </div>
            </motion.div>
          </TiltWrapper>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10 relative z-10">
            {["Sourcing", "Vetting", "Interview", "Hired"].map((step, i) => (
              <div key={i} className="bg-[#0b1120]/50 p-5 rounded-2xl border border-blue-500/5 backdrop-blur-sm group hover:border-orange-500/20 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-blue-300 group-hover:text-orange-400 uppercase tracking-wider transition-colors">{step}</span>
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">{12 - i*2}</span>
                </div>
                <div className="h-1 w-full bg-blue-900/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${100 - (i*20)}%` }}
                    className={`h-full ${i === 0 ? 'bg-orange-500' : 'bg-blue-600/40'}`}
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="bg-[#0b1120] rounded-[3rem] border border-blue-500/10 overflow-hidden shadow-3xl relative z-10">
          <div className="p-8 border-b border-blue-900/20 flex justify-between items-center bg-[#0d1526]/50">
            <h3 className="font-bold text-sm tracking-widest uppercase text-blue-100 flex items-center gap-3">
              <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div> Intelligence Feed
            </h3>
          </div>
          
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-blue-700/60 uppercase tracking-widest">
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Industry</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Expertise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/10">
                <AnimatePresence>
                  {jobs.map((job) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      key={job.id} 
                      className="hover:bg-orange-500/[0.02] transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-blue-50 group-hover:text-orange-400 transition-colors flex items-center gap-2">
                          <Briefcase size={14} className="opacity-40 group-hover:opacity-100 group-hover:text-orange-500" />
                          {job.job_title}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[9px] font-black px-3 py-1 bg-blue-500/5 text-blue-400 group-hover:text-orange-300 group-hover:bg-orange-500/10 rounded-lg border border-blue-500/10 group-hover:border-orange-500/20 uppercase transition-all">
                          {job.industry}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-blue-400/60 font-medium italic flex items-center gap-2">
                        <MapPin size={12} className="text-blue-500 group-hover:text-orange-500" />
                        {job.location}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {job.skills_extracted?.split(',').slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[9px] font-bold bg-[#162033] text-blue-300 border border-blue-400/10 px-2 py-0.5 rounded-md uppercase group-hover:border-orange-500/20 group-hover:text-orange-200 transition-colors">
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}