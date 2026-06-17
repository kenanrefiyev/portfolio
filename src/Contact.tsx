import React, { useState } from "react";
import { Send, CheckCircle, ShieldAlert, Logs, Calendar, Mail } from "lucide-react";
import { translationKeys } from "./types";

interface MessageLog {
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function Contact() {
  const t = translationKeys;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  
  const [messagesLog, setMessagesLog] = useState<MessageLog[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    setStatus("idle");

    setTimeout(() => {
      try {
        const item: MessageLog = {
          name,
          email,
          message,
          date: new Date().toLocaleTimeString("az-AZ", {
            hour: "2-digit",
            minute: "2-digit"
          })
        };
        setMessagesLog((prev) => [item, ...prev]);
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } catch (err) {
        setStatus("error");
      } finally {
        setSending(false);
      }
    }, 1250);
  };

  return (
    <div className="border-x-4 border-b-4 border-white max-w-7xl mx-auto px-4 md:px-12 py-10 text-white grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Contact Form Details - Col Span 7 */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Header content */}
        <div>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tighter flex items-center gap-3">
            <span className="bg-lime-400 text-black border-2 border-white px-2 py-0.5"><Send size={24} /></span>
            <span>{t.contactTitle}</span>
          </h2>
          <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold mt-2">
            {t.contactSubtitle} // INBOX_FORWARDER
          </p>
        </div>

        {/* Dynamic feedback banners */}
        {status === "success" && (
          <div className="p-4 bg-lime-400 text-black border-4 border-white text-xs md:text-sm font-mono font-black uppercase flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <CheckCircle size={18} strokeWidth={2.5} />
            <span>{t.messageSent}</span>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-600 text-white border-4 border-white text-xs md:text-sm font-mono font-black uppercase flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <ShieldAlert size={18} strokeWidth={2.5} />
            <span>{t.messageError}</span>
          </div>
        )}

        {/* Neo Brutalist Form Shield */}
        <form onSubmit={handleSend} className="bg-black border-4 border-white p-6 md:p-8 space-y-6 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-extrabold block">
                [ {t.contactName} ]
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Joe Doe"
                className="w-full text-xs md:text-sm bg-zinc-950 border-2 border-zinc-700 focus:border-white rounded-none px-4 py-3 text-white placeholder-zinc-700 focus:outline-none font-sans font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-extrabold block">
                [ {t.contactEmail} ]
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joe@example.com"
                className="w-full text-xs md:text-sm bg-zinc-950 border-2 border-zinc-700 focus:border-white rounded-none px-4 py-3 text-white placeholder-zinc-700 focus:outline-none font-sans font-bold"
              />
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-extrabold block">
              [ {t.contactMessage} ]
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Good day Kənan..."
              className="w-full text-xs md:text-sm bg-zinc-950 border-2 border-zinc-700 focus:border-white rounded-none px-4 py-3 text-white placeholder-zinc-750 focus:outline-none leading-relaxed font-sans font-bold"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 px-6 bg-lime-400 hover:bg-white text-black text-xs md:text-sm font-sans font-black uppercase tracking-wider border-2 border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{sending ? t.sendingMessage : t.sendMessage}</span>
            <Send size={14} strokeWidth={2.5} />
          </button>

        </form>

      </div>

      {/* Real-time Session Logs Sidebar - Col Span 5 */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Header telemetry trace */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white border-2 border-white font-black"><Logs size={18} /></div>
          <div>
            <h3 className="font-sans font-black text-xl text-white uppercase tracking-tighter">
              Mesajların şifrəli jurnalı
            </h3>
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest font-black mt-0.5">
              IN-MEMORY LOGS // CURRENT_SESSION
            </p>
          </div>
        </div>

        {/* Dynamic Telemetry logger tracks */}
        {messagesLog.length === 0 ? (
          <div className="p-8 text-center bg-black border-4 border-dashed border-zinc-800 rounded-none text-xs text-zinc-500 font-mono font-bold leading-relaxed uppercase tracking-wider">
            <Calendar size={24} className="mx-auto text-zinc-650 mb-3" />
            <span>
              Bu sessiyada hələ heç bir mesaj göndərilməyib. Yuxarıdakı formanı dolduraraq yoxlayın.
            </span>
          </div>
        ) : (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {messagesLog.map((log, index) => (
              <div key={index} className="p-4 bg-zinc-900 border-2 border-white rounded-none relative space-y-1.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-black text-xs uppercase text-lime-400 truncate max-w-[150px]">
                    {log.name}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black flex items-center gap-1.5 bg-black border border-zinc-805 px-2 py-0.5">
                    <span className="w-1.5 h-1.5 bg-lime-400 inline-block animate-ping"></span>
                    <span>Dispatched {log.date}</span>
                  </span>
                </div>
                <span className="block font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Sender: {log.email}
                </span>
                <p className="text-xs font-sans font-bold text-zinc-205 leading-relaxed mt-2 italic border-t border-zinc-800 pt-2">
                  &quot;{log.message}&quot;
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Support panel poster badge */}
        <div className="p-6 bg-lime-400 border-4 border-white text-black space-y-3.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <Mail className="text-black" size={26} strokeWidth={2.5} />
          <h4 className="font-sans font-black text-base uppercase tracking-tighter">
            Poçt Ünvanı
          </h4>
          <p className="text-xs font-sans font-bold leading-relaxed opacity-95">
            Mesaj qutusu yerinə birbaşa poçt qutununuza yazmaq istəyirsiniz? Sərbəst şəkildə yaza bilərsiniz:
          </p>
          <span className="block font-mono text-sm font-black bg-black text-white p-2.5 border-2 border-black inline-block uppercase text-center tracking-wide selection:bg-lime-400 selection:text-black">
            kenanguitar666@gmail.com
          </span>
        </div>

      </div>

    </div>
  );
}
