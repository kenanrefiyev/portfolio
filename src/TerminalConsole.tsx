import React, { useState, useRef, useEffect } from "react";
import {  Shield, Play } from "lucide-react";

interface TermLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "warning";
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<TermLine[]>([
    { text: "Kənan Rəfiyev interaktiv təhlükəsiz terminalı v1.0.0",
      type: "success"
    },
    { text: "Mövcud əmrləri görmək üçün 'help' daxil edin və ya qısa keçid düymələrinə klikləyin.",
      type: "output"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const [destructTimer, setDestructTimer] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isGlitching]);

  const shortcutMacros = ["help", "bio", "skills", "projects", "guitar", "contact", "sudo rm -rf /"];

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TermLine[] = [
      { text: `kenan@dev-space:~$ ${rawCommand}`, type: "input" }
    ];

    switch (cmd) {
      case "help":
        newLines.push(
          { text: "Mövcud Sistem Əmrləri:", type: "success" },
          { text: "  bio      - Kənanın fərdi bioqrafiyasını göstər", type: "output" },
          { text: "  skills   - Proqramlaşdırma dillərini və alətlərini göstər", type: "output" },
          { text: "  projects - Əsas kod layihələrini və repozitorilərini siyahıla", type: "output" },
          { text: "  guitar   - Kənanın elektro gitara ifaçılığı haqqında məlumat", type: "output" },
          { text: "  contact  - Əlaqə vasitələrini çap et", type: "output" },
          { text: "  clear    - Terminal ekranını təmizlə", type: "output" },
          { text: "  sudo rm -rf / - Kök qovluğu silmə təhlükəli cəhdi (Təhlükəli!)", type: "error" }
        );
        break;

      case "bio":
        newLines.push(
          { text: "=========================================", type: "success" },
          { text: "  KƏNAN RƏFİYEV - FULL STACK DEVELOPER", type: "success" },
          { text: "=========================================", type: "success" },
          { text: "Ünvan: Bakı, Azərbaycan\nTəcrübə: TypeScript tipləri, interaktiv ön və arxa-səth strukturları, təmiz kod prinsipləri üzrə uzmanlaşan Full-Stack veb tərtibatçısı.",
            type: "output"
          },
          { text: "Maraqlar: Səliqəli dizaynlar, dinamik massiv manipulyasiyası, səs mühəndisliyi və elektro gitara ifası.",
            type: "output"
          }
        );
        break;

      case "skills":
        newLines.push(
          { text: "--- TECHNICAL COMPETENCIES GRAPH ---", type: "success" },
          { text: "TypeScript   [██████████████████░░] 95% - Advanced Typing & Configs", type: "output" },
          { text: "JavaScript   [████████████████████] 98% - ES6+, DOM manipulation & Map Methods", type: "output" },
          { text: "React / Vite [██████████████████░░] 92% - SPA, Hooks & State Managers", type: "output" },
          { text: "Node / Exp   [████████████████░░░░] 85% - Full-Stack Routing, proxies, APIs", type: "output" },
          { text: "Tailwind CSS [████████████████████] 96% - Responsive, custom theme styles", type: "output" },
          { text: "Git / GitHub [████████████████░░░░] 88% - CI/CD, Branches, Repos control", type: "output" }
        );
        break;

      case "projects":
        newLines.push(
          { text: "--- ACTIVE REPOSITORIES ON GITHUB ---", type: "success" },
          { text: "1. EyvazogluCasting  [TypeScript/Casting UI Agent application]", type: "output" },
          { text: "2. email-js          [JavaScript/Email routing live link]", type: "output" },
          { text: "3. dom-project       [JavaScript/Pure custom map renderer template]", type: "output" },
          { text: "4. finall            [JavaScript/E-commerce responsive workspace]", type: "output" },
          { text: "5. pokemon-axtaris   [HTML/Search system and retro styles]", type: "output" },
          { text: "6. Moviesite         [JavaScript/Media portal - 'hələ vaxt var...']", type: "output" },
          { text: "Type 'projects' on the main selector above for interactive view!", type: "success" }
        );
        break;

      case "guitar":
        newLines.push(
          { text: "               _\\|/_   ", type: "success" },
          { text: "               (o o)   ", type: "success" },
          { text: "       +----oooO-(_)-Oooo----+", type: "success" },
          { text: "       |    🎸 METAL POWER  |", type: "success" },
          { text: "       +---------------------+", type: "success" },
          { text: "Kənan əla elektro gitara ifaçısıdır! İnteqrasiya olunmuş 'kenanguitar666@gmail.com' poçtu onun heavy metal riffləri, sürətli sololar və yüksək-gain musiqilərinə olan sevgisini əks etdirir!",
            type: "output"
          }
        );
        break;

      case "contact":
        newLines.push(
          { text: "------ SECURE CHANNELS ------", type: "success" },
          { text: "  Email:  kenanguitar666@gmail.com", type: "output" },
          { text: "  GitHub: https://github.com/kenanrefiyev", type: "output" },
          { text: "  Live:   Baku, Azerbaijan", type: "output" },
          { text: "  Feel free to shoot a query via 'Contact' form above!", type: "success" }
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "sudo rm -rf /":
        newLines.push(
          { text: "WARNING: ACCESS VIOLATION ATTEMPTED.", type: "error" },
          { text: "INITIATING SYSTEM SELF-DESTRUCT IN 3 SECONDS...", type: "warning" },
          { text: "3...", type: "error" },
          { text: "2...", type: "error" },
          { text: "1...", type: "error" }
        );
        setHistory((prev) => [...prev, ...newLines]);
        setInputVal("");
        
        setTimeout(() => {
          setIsGlitching(true);
          let countdown = 5;
          setDestructTimer(countdown);
          const interval = setInterval(() => {
            countdown -= 1;
            if (countdown <= 0) {
              clearInterval(interval);
              setIsGlitching(false);
              setDestructTimer(null);
              setHistory([
                { text: "Sistem nüvəsi uğurla bərpa olundu.", type: "success" },
                { text: "Xoş gəldiniz. Root icazələri təsdiqləndi.", type: "output" }
              ]);
            } else {
              setDestructTimer(countdown);
            }
          }, 1000);
        }, 1200);
        return;

      default:
        newLines.push({
          text: `'${rawCommand}' əmri sistem tərəfindən tanınmadı. Kömək üçün 'help' yazın.`,
          type: "error"
        });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="border-x-4 border-b-4 border-white max-w-7xl mx-auto px-4 md:px-12 py-10 text-white">
      
      {/* Title block with Neo Brutalist Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="bg-lime-400 text-black border-2 border-white px-2 py-0.5">DEV_BASH</span>
            <span>İnteraktiv Konsol</span>
          </h2>
          <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold mt-2">
            SIMULATED INTERACTIVE SANDBOX // LOCAL_STORE_DRIVEN
          </p>
        </div>
      </div>

      {isGlitching ? (
        <div className="bg-black border-4 border-red-500 rounded-none p-12 text-center space-y-4 animate-flash select-none">
          <div className="text-4xl md:text-5xl text-red-500 font-black tracking-tighter uppercase leading-none">
            ⚠️ SYSTEM GLITCH // RESTRICTION_VIOLATION ⚠️
          </div>
          <p className="font-mono text-xs text-red-400 max-w-xl mx-auto leading-relaxed font-bold uppercase tracking-wider">
            CRITICAL ACCESS VIOLATION: KƏNAN'S STORAGE HAS INTEGRITY GUARDS. THE SYSTEM IS FORMATTING ROOT MEMORY TEMPORARILY.
          </p>
          <div className="text-2xl font-mono text-white uppercase font-black">
            REBOOTING CORE IN <span className="text-red-500 bg-white text-black px-2 py-0.5">{destructTimer}</span> SECONDS
          </div>
          <div className="flex justify-center gap-1.5 pt-2">
            <span className="w-3 h-3 bg-red-500 animate-ping"></span>
            <span className="w-3 h-3 bg-red-500 animate-ping delay-100"></span>
          </div>
        </div>
      ) : (
        <div className="bg-black border-4 border-white flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          
          {/* Windows title control bar - Brutalist Style */}
          <div className="bg-zinc-900 px-4 py-3 border-b-4 border-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-none bg-red-500 border-2 border-black"></span>
              <span className="w-4 h-4 rounded-none bg-yellow-500 border-2 border-black"></span>
              <span className="w-4 h-4 rounded-none bg-lime-400 border-2 border-black"></span>
            </div>
            <span className="font-mono text-xs text-white uppercase tracking-widest font-black">
              KENAN@BAKU-TERMINAL-SANDBOX: ~
            </span>
            <Shield size={14} className="text-lime-400" strokeWidth={2.5} />
          </div>

          {/* Quick Shortcuts Buttons Row (Industrial blocky pills) */}
          <div className="bg-zinc-950 px-4 py-3 border-b-2 border-white/60 flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs font-black text-zinc-400 uppercase tracking-widest mr-2">
              Qısa Əmrlər:
            </span>
            {shortcutMacros.map((macro) => (
              <button
                key={macro}
                onClick={() => handleCommand(macro)}
                className={`px-3 py-1 text-xs font-mono font-bold transition-all duration-100 border-2 cursor-pointer ${
                  macro.includes("sudo")
                    ? "bg-red-600 text-white border-white hover:bg-black hover:text-red-500"
                    : "bg-black text-zinc-300 border-zinc-700 hover:border-lime-400 hover:text-lime-400"
                }`}
              >
                {macro}
              </button>
            ))}
          </div>

          {/* Lines Display Area */}
          <div 
            ref={containerRef}
            className="flex-1 p-6 h-96 overflow-y-auto font-mono text-xs md:text-sm space-y-2.5 leading-relaxed tracking-tight bg-black text-zinc-300 min-h-[360px]"
          >
            {history.map((line, idx) => {
              let textClass = "text-zinc-200";
              if (line.type === "input") textClass = "text-lime-400 font-bold bg-zinc-900/50 px-1 inline-block";
              else if (line.type === "error") textClass = "text-red-500 font-bold uppercase bg-red-950/45 px-1 inline-block";
              else if (line.type === "success") textClass = "text-lime-400 font-bold";
              else if (line.type === "warning") textClass = "text-yellow-400 font-bold";
              
              return (
                <div key={idx} className={`${textClass} whitespace-pre-wrap leading-relaxed`}>
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Input Panel with massive RUN command block */}
          <div className="bg-zinc-900 p-4 border-t-4 border-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-mono text-lime-400 font-black text-sm md:text-base whitespace-nowrap">
                kenan@dev-space:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Əmr yazın..."
                className="flex-1 bg-black border-2 border-zinc-700 focus:border-white rounded-none px-3 py-2 text-white font-mono text-sm placeholder-zinc-650 focus:outline-none"
                autoFocus
              />
            </div>
            
            <button
              onClick={() => handleCommand(inputVal)}
              className="px-6 py-2 bg-lime-400 text-black border-2 border-white text-xs font-mono font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play size={12} strokeWidth={3} />
              <span>RUN_CMD</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
