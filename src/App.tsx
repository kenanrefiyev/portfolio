
import { useState } from "react";
import Navbar from "./Navbar";
import Hero from ".//Hero";
import TerminalConsole from "./TerminalConsole";
import Projects from "./Projects";
import Contact from "./Contact";
export default function App() {
  const [activeTab, setActiveTab] = useState<string>("hero");

  const renderTabContent = () => {
    switch (activeTab) {
      case "hero":
        return <Hero setActiveTab={setActiveTab} />;
      case "terminal":
        return <TerminalConsole />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white flex flex-col justify-between selection:bg-lime-400 selection:text-black">
      
      {/* Heavy Industrial Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-25"></div>
      
      {/* Decorative Neon Brutalist Blur Overlay - subtle to keep focus high-contrast */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Head */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dynamic Viewport Section containing active component tab */}
        <main className="flex-grow">
          {renderTabContent()}
        </main>

        {/* Solid High-Contrast Neo-Brutalist Footer */}
        <footer className="relative z-10 bg-black border-t-4 border-white py-4 mt-auto">
        </footer>
        
      </div>

    </div>
  );
}
