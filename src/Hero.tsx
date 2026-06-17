import { useEffect, useState } from "react";
import { ShieldCheck, Mail, MapPin, Zap, Music } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { translationKeys } from "./types";
import type { ProfileData } from "./types";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const t = translationKeys;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  const occupations = ["Full-Stack Proqramçı", "TypeScript & React Mütəxəssisi", "Elektro Gitara Həvəskarı", "Dinamik Veb Memarı"];

  // Handle typing simulation
  useEffect(() => {
    let isDeleting = false;
    let text = "";
    let typingSpeed = 100;

    const type = () => {
      const fullWord = occupations[typedIndex];
      if (isDeleting) {
        text = fullWord.substring(0, text.length - 1);
        typingSpeed = 50;
      } else {
        text = fullWord.substring(0, text.length + 1);
        typingSpeed = 100;
      }

      setTypedText(text);

      if (!isDeleting && text === fullWord) {
        typingSpeed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && text === "") {
        isDeleting = false;
        setTypedIndex((prev) => (prev + 1) % occupations.length);
        typingSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedIndex]);

  // Fetch real-time profiles from server api proxies
  useEffect(() => {
    fetch("/api/github/profile")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="border-x-4 border-b-4 border-white max-w-7xl mx-auto text-white">
      
      {/* Visual Workspace Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Name / Intro Block - Col Span 8 */}
        <div className="lg:col-span-8 border-b-4 lg:border-b-0 lg:border-r-4 border-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden bg-black gap-8">
          
          {/* Watermark/Backgroud Huge Text */}
          <div className="absolute top-0 right-0 p-8 text-[8rem] md:text-[13rem] font-black leading-none opacity-[0.03] select-none pointer-events-none font-sans uppercase">
            DEV
          </div>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-white text-black border-2 border-white uppercase">
              <ShieldCheck size={12} strokeWidth={2.5} />
              <span>{t.badgeWebDev}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-lime-400 text-black border-2 border-lime-400 uppercase">
              <Music size={12} strokeWidth={2.5} />
              <span>{t.badgeGuitarist}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-zinc-900 text-zinc-300 border-2 border-zinc-700 uppercase">
              <MapPin size={12} className="text-rose-400" />
              <span>{t.badgeLocation}</span>
            </span>
          </div>

          {/* Main Huge Typography Header */}
          <div className="space-y-4 z-10 max-w-3xl pt-8">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.85] tracking-tighter uppercase whitespace-pre-line text-white">
              Salam, mən<br />
              <span className="bg-lime-400 text-black px-3 py-1 inline-block border-4 border-white transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                Kənan Rəfiyev
              </span>
            </h1>
            
            {/* Typing Simulation Header in box */}
            <div className="bg-zinc-900 border-2 border-white/60 p-3 flex items-center font-mono text-sm md:text-base text-lime-400 font-bold max-w-xl">
              <span className="text-white mr-2">&gt;</span>
              <span>{typedText}</span>
              <span className="w-2.5 h-5 bg-lime-400 ml-1.5 animate-pulse"></span>
            </div>
          </div>

          <p className="text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed font-sans font-medium z-10 pt-4">
            {t.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 z-10">
            <button
              onClick={() => setActiveTab("terminal")}
              className="px-6 py-4 bg-lime-400 text-black font-sans font-black text-sm uppercase tracking-wider transition-all duration-150 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <Zap size={15} strokeWidth={2.5} />
                <span>İnteraktiv Konsolu Başlat</span>
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("contact")}
              className="px-6 py-4 bg-zinc-950 text-white hover:bg-zinc-900 hover:text-lime-400 font-sans font-bold text-sm uppercase tracking-wider transition-all duration-150 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <Mail size={15} strokeWidth={2} />
                <span>Mənimlə Əlaqə</span>
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Photo Box or Creative Slogan Block - Col Span 4 */}
        <div className="lg:col-span-4 bg-lime-400 p-8 flex flex-col justify-between text-black relative gap-12 border-t-4 lg:border-t-0 border-white">
          <div className="text-left">
            <span className="text-xs font-mono font-black tracking-widest block opacity-70 mb-2 uppercase">
              // NO_LIMITS_DESIGN
            </span>
            <div className="text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-black italic uppercase leading-none tracking-tight">
              CREATIVE<br />
              POWER &<br />
              SOLIDS
            </div>
          </div>

          {/* Frame encapsulating Kənan's real GitHub avatar with cyber layout */}
          <div className="w-full aspect-square border-4 border-black bg-black p-4 flex flex-col justify-between relative group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 font-bold mb-2">
              <span>IMG.REF // 0x666</span>
              <span className="text-lime-400 animate-pulse">// LIVE</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/176558248?v=4"
                alt="Kənan Rəfiyev"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover border-2 border-zinc-800 grayscale group-hover:grayscale-0 transition-all duration-305"
              />
            </div>

            <div className="text-center mt-2 font-mono text-xs text-zinc-400 font-black tracking-widest uppercase">
              Kənan Rəfiyev
            </div>
          </div>

          <div className="border-t-2 border-black/30 pt-4 flex items-center justify-between text-xs font-bold">
            <span className="uppercase tracking-wider">Baku City Standard</span>
            <span className="font-mono">GMT +4</span>
          </div>
        </div>

      </div>

      {/* GitHub Live Stats Dashboard segment with neo brutalist grid */}
      <div className="bg-black border-t-4 border-white p-6 md:p-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white text-black border-2 border-white font-black">
              <Github size={24} />
            </div>
            <div>
              <h4 className="font-sans font-black text-2xl tracking-tight uppercase text-white">
                {t.githubLiveStats}
              </h4>
              <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-0.5">
                REAL-TIME SYNC // HTTPS://API.GITHUB.COM/USERS/KENANREFIYEV
              </p>
            </div>
          </div>
          <a
            href="https://github.com/kenanrefiyev"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-zinc-900 border-2 border-zinc-700 hover:border-lime-400 hover:text-black hover:bg-lime-400 text-sm font-mono tracking-wider font-extrabold uppercase transition-all duration-150"
          >
            <span>{t.viewGitHub} &gt;&gt;</span>
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-zinc-900 border-4 border-zinc-800 h-28"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat Item Repo */}
            <div className="bg-zinc-950 border-4 border-white p-5 flex flex-col justify-between hover:border-lime-400 transition-colors group">
              <span className="font-mono text-xs font-black text-zinc-450 uppercase tracking-wider block">
                Repozitorilər
              </span>
              <div className="my-3">
                <span className="text-4xl md:text-5xl font-sans font-black text-white block leading-none">
                  {profile?.public_repos || 12}
                </span>
                <span className="text-[10px] font-mono text-lime-400 uppercase tracking-widest font-bold mt-1 block">
                  // SELECTED 8 SHOWN
                </span>
              </div>
            </div>

            {/* Stat Item Followers */}
            <div className="bg-zinc-950 border-4 border-white p-5 flex flex-col justify-between hover:border-lime-400 transition-colors group">
              <span className="font-mono text-xs font-black text-zinc-455 uppercase tracking-wider block">
                {t.followers}
              </span>
              <div className="my-3">
                <span className="text-4xl md:text-5xl font-sans font-black text-white block leading-none">
                  {profile?.followers || 2}
                </span>
                <span className="text-[10px] font-mono text-lime-400 uppercase tracking-widest font-bold mt-1 block">
                  // LIVE METRIC
                </span>
              </div>
            </div>

            {/* Stat Item Following */}
            <div className="bg-zinc-950 border-4 border-white p-5 flex flex-col justify-between hover:border-lime-400 transition-colors group">
              <span className="font-mono text-xs font-black text-zinc-460 uppercase tracking-wider block">
                {t.following}
              </span>
              <div className="my-3">
                <span className="text-4xl md:text-5xl font-sans font-black text-white block leading-none">
                  {profile?.following || 6}
                </span>
                <span className="text-[10px] font-mono text-lime-400 uppercase tracking-widest font-bold mt-1 block">
                  // DEVS FOLLOWED
                </span>
              </div>
            </div>

            {/* Stat Item prime stack */}
            <div className="bg-lime-400 text-black border-4 border-white p-5 flex flex-col justify-between hover:bg-white transition-colors group">
              <span className="font-mono text-xs font-black uppercase tracking-wider block">
                Əsas Alətlər
              </span>
              <div className="my-3">
                <span className="text-2xl md:text-3xl font-sans font-black uppercase block leading-none tracking-tight">
                  TS / React / JS
                </span>
                <span className="text-[10px] font-mono text-black/70 uppercase tracking-widest font-bold mt-1.5 block">
                  VEB MEMARLIĞI
                </span>
              </div>
            </div>

          </div>
        )}
      </div>

    </section>
  );
}
