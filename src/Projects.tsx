import { useEffect, useState } from "react";
import { localProjects, translationKeys } from "./types";
import type { Project } from "./types";
import { FolderGit2, Star, Link, Code, Terminal, FileCode2, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const t = translationKeys;
  const [repos, setRepos] = useState<Project[]>(localProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: Project[] = localProjects.map((local) => {
          const matched = data.find((r) => r.name.toLowerCase() === local.name.toLowerCase());
          if (matched) {
            return {
              ...local,
              stargazers_count: matched.stargazers_count || local.stargazers_count,
              html_url: matched.html_url || local.html_url,
              homepage: matched.homepage || local.homepage
            };
          }
          return local;
        });
        setRepos(mapped);
        setLoading(false);
      })
      .catch(() => {
        setRepos(localProjects);
        setLoading(false);
      });
  }, []);

  const filters = ["All", "TypeScript", "JavaScript", "HTML"];

  const filteredRepos = activeFilter === "All"
    ? repos
    : repos.filter((r) => r.language.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="border-x-4 border-b-4 border-white max-w-7xl mx-auto px-4 md:px-12 py-10 text-white space-y-10">
      
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="bg-lime-400 text-black border-2 border-white px-2 py-0.5"><FolderGit2 size={24} /></span>
            <span>{t.projectsTitle}</span>
          </h2>
          <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold mt-2">
            {t.projectsSubtitle} // DIRECT_PULL
          </p>
        </div>
      </div>

      {/* Filter Selector tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setSelectedProject(null);
            }}
            className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-wider border-2 transition-all duration-100 cursor-pointer ${
              activeFilter === filter
                ? "bg-lime-400 text-black border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                : "bg-black text-zinc-400 border-zinc-800 hover:border-white hover:text-white"
            }`}
          >
            {filter === "All" ? "Hamısı" : filter}
          </button>
        ))}
      </div>

      {/* Repos Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-black border-4 border-zinc-900 h-64"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map((item) => {
            const features = item.featuresAz;
            const description = item.descriptionAz;
            
            return (
              <div
                key={item.name}
                onClick={() => setSelectedProject(item)}
                className="bg-black border-4 border-white p-6 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:shadow-[7px_7px_0px_0px_#a3e635] hover:border-lime-400 transition-all duration-150 flex flex-col justify-between cursor-pointer relative overflow-hidden group hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {/* Cyber Watermark */}
                <div className="absolute -bottom-6 -right-6 text-7xl font-sans font-black opacity-[0.03] uppercase tracking-tighter select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                  CODE
                </div>

                <div className="space-y-4">
                  {/* Card head stats */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-black uppercase bg-zinc-900 text-zinc-350 border border-zinc-750">
                      <Terminal size={10} className="text-lime-400" />
                      <span>{item.language}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-yellow-500 font-mono font-bold">
                      <Star size={12} className="fill-current" />
                      <span>{item.stargazers_count}</span>
                    </span>
                  </div>

                  {/* Title and descriptions */}
                  <div>
                    <h4 className="font-sans font-black text-xl text-white uppercase tracking-tight flex items-center justify-between group-hover:text-lime-400 transition-colors">
                      <span>{item.name}</span>
                      <ArrowUpRight size={16} strokeWidth={2.5} className="text-zinc-500 group-hover:text-lime-400 transition-colors" />
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-450 leading-relaxed font-sans mt-2.5 line-clamp-3">
                      {description}
                    </p>
                  </div>

                  {/* Highlights Bullet List overview */}
                  <div className="space-y-1.5 pt-2">
                    {features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="text-[11px] font-mono font-bold text-zinc-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-lime-400"></span>
                        <span className="truncate uppercase">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs details block */}
                <div className="flex items-center justify-between border-t border-zinc-850 pt-4 mt-6">
                  <span className="font-mono text-[9px] text-zinc-500 font-black tracking-widest uppercase">
                    {item.metrics}
                  </span>
                  <span className="text-xs font-mono font-black text-lime-400 uppercase tracking-wider group-hover:underline">
                    Metrikalar //
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Brutalist Specifications Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black border-8 border-white max-w-2xl w-full overflow-hidden shadow-[8px_8px_0px_0px_#a3e635] relative">
            
            {/* Upper Cyber Graphics */}
            <div className="bg-zinc-900 border-b-4 border-white p-8 flex flex-col justify-center items-center relative text-center">
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <span className="w-3 h-3 bg-red-500 border border-black"></span>
                <span className="w-3 h-3 bg-yellow-400 border border-black"></span>
                <span className="w-3 h-3 bg-lime-400 border border-black"></span>
              </div>
              
              <div className="p-5 bg-black border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] max-w-sm">
                <FileCode2 size={44} className="text-lime-400 mx-auto" strokeWidth={2.5} />
                <span className="block font-sans font-black text-lg text-white mt-3 uppercase tracking-tighter">
                  {selectedProject.name}
                </span>
                <span className="block font-mono text-[10px] text-zinc-405 uppercase tracking-widest font-bold mt-1">
                  {selectedProject.language} ~ COMPILED SOURCE
                </span>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Header Details with direct redirects */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tighter">
                    {selectedProject.name}
                  </h3>
                  <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-widest">
                    REPO: {selectedProject.name.toUpperCase()}
                  </span>
                </div>
                
                {/* Outlinks redirects */}
                <div className="flex items-center gap-2">
                  <a
                    href={selectedProject.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border-2 text-xs font-mono font-black uppercase tracking-wider bg-black border-white hover:bg-zinc-900 text-white"
                  >
                    <Code size={12} strokeWidth={2.5} />
                    <span>{t.viewCode}</span>
                  </a>
                  {selectedProject.homepage ? (
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 border-2 text-xs font-mono font-black uppercase tracking-wider bg-lime-400 border-white text-black font-black"
                    >
                      <Link size={12} strokeWidth={2.5} />
                      <span>{t.liveDemo}</span>
                    </a>
                  ) : (
                    <span className="px-4 py-2 border-2 border-zinc-800 text-[10px] font-mono text-zinc-500 bg-zinc-950 uppercase font-black">
                      {t.noDemo}
                    </span>
                  )}
                </div>
              </div>

              {/* Description segment */}
              <p className="font-sans text-sm md:text-base text-zinc-350 leading-relaxed font-semibold">
                {selectedProject.descriptionAz}
              </p>

              {/* Specifications block */}
              <div className="space-y-3.5 border-t-2 border-zinc-805 pt-5">
                <h5 className="font-sans font-black text-xs uppercase text-lime-400 tracking-widest">
                  Daxili Layihə Xüsusiyyətləri:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.featuresAz.map((feature, index) => (
                    <li key={index} className="text-xs font-mono text-zinc-350 font-bold flex items-center gap-2.5">
                      <span className="w-2 h-2 bg-white flex-shrink-0"></span>
                      <span className="uppercase">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Bar bottom */}
              <div className="flex justify-end pt-4 border-t-2 border-zinc-850">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 bg-zinc-900 border-2 border-white text-xs font-mono font-black uppercase tracking-widest hover:bg-lime-400 hover:text-black transition-colors cursor-pointer"
                >
                  [ BAĞLA ]
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
