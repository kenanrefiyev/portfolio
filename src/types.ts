export interface Project {
  name: string;
  description: string;
  descriptionAz: string;
  language: string;
  stargazers_count: number;
  html_url: string;
  homepage: string | null;
  features: string[];
  featuresAz: string[];
  metrics: string;
}

export interface ProfileData {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  email: string;
}

export const translationKeys = {
  heroTitle: "İnteraktiv Proqramçı Məkanı",
  heroSubtitle: "Full-Stack Veb Memarı",
  heroDescription: "Salam, mən Kənan Rəfiyevəm. TypeScript, React və Node.js istifadə edərək yüksək performanslı veb proqramlar hazırlayıram. Aşağıda real GitHub göstəricilərimə baxın, proqramçı terminalımla oynayın və ya Gemini AI Klonumla söhbət edin!",
  badgeLocation: "Bakı, Azərbaycan",
  badgeGuitarist: "Elektro Gitara İfaçısı",
  badgeWebDev: "React Memarı",
  githubLiveStats: "Canlı GitHub Statistikası",
  repositories: "Repozitorilər",
  following: "İzlədiyiniz",
  followers: "İzləyicilər",
  viewGitHub: "GitHub Profilini kəşf et",
  terminalTitle: "developer-terminal ~ bash",
  terminalPlaceholder: "Əmr daxil edin (məsələn: help, bio, skills, projects)...",
  terminalWelcome: "Kənanın interaktiv əmr mühitinə xoş gəldiniz. Başlamaq üçün 'help' yazın.",
  projectsTitle: "Seçilmiş Şahəsərlər",
  projectsSubtitle: "Canlı repozitorilərdən gələn filtrli kod layihələri",
  all: "Hamısı",
  viewCode: "Koda Bax",
  liveDemo: "Saytı Aç",
  noDemo: "Hələ yerləşdirilməyib",
  skillsTitle: "Əsas Bacarıqlar",
  skillsSubtitle: "Analiz olunmuş mühəndislik və proqramlaşdırma səriştələri",
  aiChatTitle: "Kənanın AI Köməkçi Klonu",
  aiChatSubtitle: "Gemini 3.5 Flash tərəfindən idarə olunur",
  aiChatWelcome: "Salam! Mən Kənanın rəqəmsal Süni İntellekt klonuyam. Məndən Kənanın təcrübəsi, gitara ifaçılığı, layihələri və ya iş imkanları haqqında istədiyiniz hər şeyi soruşa bilərsiniz!",
  aiChatPlaceholder: "Azərbaycan dilində yazın...",
  cvTitle: "Dinamik İnteraktiv CV Qurucu",
  cvSubtitle: "Real vaxt rejimində çap edilə bilən CV formalaşdırın",
  cvName: "KƏNAN RƏFİYEV",
  cvProfession: "FULL-STACK PROQRAMÇI",
  cvTheme: "CV Rəng Accentini Seçin",
  downloadCV: "Çap Versiyasını Yüklə (PDF/Print)",
  contactTitle: "Təhlükəsiz İsmarıc Göndərici",
  contactSubtitle: "Kənanın poçt qutusuna birbaşa təhlükəsiz ismarıc göndərin",
  contactName: "Tam Adınız",
  contactEmail: "E-poçt Ünvanınız",
  contactMessage: "Təhlükəsiz mesajınızın mətni...",
  sendMessage: "Mesajı Göndər",
  sendingMessage: "Şifrələnir və Göndərilir...",
  messageSent: "Mesaj uğurla şifrələndi və göndərildi!",
  messageError: "Mesaj göndərilə bilmədi. Birbaşa poçt: kenanguitar666@gmail.com",
  footerDetails: "Bakı, Azərbaycanda qürurla dizayn edilmişdir © 2026. Custom Full-Stack Platform.",
  easterEgghited: "Admin əmri aktivləşdirildi. Sudo səlahiyyəti verildi!"
};

export const localProjects: Project[] = [
  {
    name: "EyvazogluCasting",
    description: "Casting Agency Application built with TypeScript. Implements modern responsive profile lookup and detailed database filters for models, actors, and agents.",
    descriptionAz: "Müasir aktyor və model seçimi platforması. TypeScript əsasında aktyor profillərini tapmaq və filtrləmək üçün əla sistem.",
    language: "TypeScript",
    stargazers_count: 1,
    html_url: "https://github.com/kenanrefiyev/EyvazogluCasting",
    homepage: null,
    features: ["Fully Typed with TypeScript", "Dynamic Multi-factor profile filters", "Fast layout styling with high accessibility"],
    featuresAz: ["TypeScript ilə tam tipləşmə", "Dinamik çoxfaktorlu filtr sistemi", "Yüksək əlçatanlıqlı dizayn"],
    metrics: "Production Ready / Prope-typed"
  },
  {
    name: "email-js",
    description: "Built using EmailJS to streamline custom Gmail forwarding. Creates a high-performance email router and user response panel.",
    descriptionAz: "EmailJS kitabxanası istifadə edərək müştəri sorğularının birbaşa Gmail ünvanına sürətli yönləndirilməsi sistemi.",
    language: "JavaScript",
    stargazers_count: 0,
    html_url: "https://github.com/kenanrefiyev/email-js",
    homepage: "https://user-message-kohl.vercel.app/",
    features: ["Direct user inbox binding", "Spam protection validations", "Instant feedback toasts"],
    featuresAz: ["Birbaşa gələnlər qutusu bağlantısı", "Spam qorunması validasiyaları", "Təcili bildirişlər"],
    metrics: "Live on Vercel"
  },
  {
    name: "dom-project",
    description: "Custom DOM-manipulator project displaying cards via advanced array map methods. Implements solid CSS layouts from scratch.",
    descriptionAz: "Pure JavaScript DOM vasitəsilə mürəkkəb map metodları istifadə edərək dizayn edilmiş sürətli məhsul idarəetmə və kataloq mühiti.",
    language: "JavaScript",
    stargazers_count: 0,
    html_url: "https://github.com/kenanrefiyev/dom-project",
    homepage: "https://simpledomproject.netlify.app/",
    features: ["Zero heavy framework libraries", "High-performance dynamic updates", "Clean custom array manipulation"],
    featuresAz: ["Ağır framework istifadəsiz", "Yüksək performanslı dinamik yenilənmə", "Səliqəli massiv manipulyasiyaları"],
    metrics: "Live on Netlify"
  },
  {
    name: "finall",
    description: "Detailed final e-commerce client-side web application incorporating detailed routing, dynamic carts, and custom categories.",
    descriptionAz: "Tam funksional alış-veriş və ya rəqəmsal mağaza tətbiqi. İnteraktiv səbət, məhsul detalları və müasir bento grid şəbəkəsi.",
    language: "JavaScript",
    stargazers_count: 0,
    html_url: "https://github.com/kenanrefiyev/finall",
    homepage: "https://finall-two-ashen.vercel.app/",
    features: ["Responsive product layout", "Local-persistent virtual cart state", "Clean modular structure"],
    featuresAz: ["Mobil-uyğun dizayn", "Davamlı virtual səbət yaddaşı", "Səliqəli modulyar struktur"],
    metrics: "Live on Vercel"
  },
  {
    name: "pokemon-axtaris",
    description: "Pokemon search index engine featuring retro animations and immediate fetch callbacks for gaming enthusiasts.",
    descriptionAz: "Pokemon personajlarının axtarış və detallı rəsim, xüsusiyyət bazaları modulu. Sürətli axtarış təcrübəsi.",
    language: "HTML",
    stargazers_count: 0,
    html_url: "https://github.com/kenanrefiyev/pokemon-axtaris",
    homepage: "https://aesthetic-cat-652d81.netlify.app/",
    features: ["Minimal footprint", "Retro interactive layout", "Fast responsive filtering"],
    featuresAz: ["Minimal ölçü", "Retro interaktiv dizayn", "Sürətli axtarış filtrləri"],
    metrics: "Live on Netlify"
  },
  {
    name: "Moviesite",
    description: "Innovative cinematic hub featuring rich search. 'Hələ vaxt var əxi, düzəldərik' - Active roadmap status in Azerbaijani.",
    descriptionAz: "Müasir film kataloqu və axtarış platforması. Hazırkı status: 'Hələ vaxt var əxi, düzəldərik!'",
    language: "JavaScript",
    stargazers_count: 0,
    html_url: "https://github.com/kenanrefiyev/Moviesite",
    homepage: null,
    features: ["Custom visual search highlights", "Responsive movie grid cards", "Roadmap under active update"],
    featuresAz: ["Vizual axtarış xüsusiyyətləri", "Səliqəli film siyahısı", "Aktiv yenilənmə planı"],
    metrics: "In Active Dev"
  }
];
