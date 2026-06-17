import { Terminal, Cpu, User, Send } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: "hero", label: "Ana Səhifə", icon: User },
    { id: "terminal", label: "Konsol", icon: Terminal },
    { id: "projects", label: "Layihələr", icon: Cpu },
    { id: "contact", label: "Əlaqə", icon: Send },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b-4 border-white px-4 md:px-8 py-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          className="flex items-center gap-4 cursor-pointer select-none group" 
          onClick={() => setActiveTab("hero")}
        >
          <div className="bg-lime-400 text-black p-2.5 border-2 border-white font-black hover:bg-white transition-colors">
            <Terminal size={20} strokeWidth={3} />
          </div>
          <div>
            <span className="font-sans font-black tracking-tighter uppercase text-xl md:text-2xl block hover:text-lime-400 transition-colors">
              KR.PORTFOLIO
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block font-bold">
              KENANREFIYEV.DEV // LOCAL_HOST
            </span>
          </div>
        </div>

        {/* Links / Navigation Tabs (Flat, bold, blocky buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 border-2 text-xs font-sans font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-lime-400 text-black border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    : "text-zinc-300 bg-zinc-950 border-zinc-800 hover:border-white hover:text-white"
                }`}
              >
                <Icon size={12} strokeWidth={2.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Toolbar Controls */}
        <div className="flex items-center gap-3">
          {/* GitHub redirect link straight to profile */}
          <a
            href="https://github.com/kenanrefiyev"
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-900 border-2 border-zinc-700 hover:border-lime-400 hover:bg-lime-400 hover:text-black p-2 text-white transition-colors"
            title="Kənan's GitHub Profile"
          >
            <Github size={16} />
          </a>
        </div>

      </div>
    </nav>
  );
}
