import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/bf0b7b46-9801-4dc3-9b37-a21509da6f76/files/c9beacd9-70e8-4787-ab7f-daf5dbd37338.jpg";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "О кооперативе", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Документы", href: "#docs" },
    { label: "Вступить", href: "#join" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1a2e1e] shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#c9963a] flex items-center justify-center">
            <span className="font-display text-white font-bold text-base leading-none">П</span>
          </div>
          <div>
            <div className="font-display text-white font-semibold text-lg leading-tight tracking-wide">
              Подъполье
            </div>
            <div className="text-[10px] text-[#c9963a] tracking-widest uppercase font-body">НПК</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-white/80 hover:text-white text-sm font-body tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#join"
          className="hidden md:inline-flex items-center gap-2 bg-[#c9963a] hover:bg-amber-600 text-white font-body text-sm font-semibold px-5 py-2 rounded transition-colors"
        >
          Вступить
        </a>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#1a2e1e] border-t border-white/10 px-6 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-white/80 hover:text-white font-body text-sm border-b border-white/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-[#c9963a] text-white font-body font-semibold px-5 py-2.5 rounded"
          >
            Вступить в кооператив
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Кооператив Подъполье" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1e]/92 via-[#1a2e1e]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1e]/60 via-transparent to-transparent" />
      </div>
      <div className="absolute left-0 top-0 h-full w-1 bg-[#c9963a] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#c9963a]/20 border border-[#c9963a]/40 text-[#c9963a] text-xs font-body tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            Народный потребительский кооператив
          </div>
          <h1 className="font-display text-7xl md:text-9xl font-light text-white leading-none mb-3 animate-fade-in-up">
            Подъполье
          </h1>
          <div className="w-16 h-0.5 bg-[#c9963a] mb-6 animate-fade-in delay-200" />
          <p className="font-body text-white/70 text-lg md:text-xl leading-relaxed mb-10 animate-fade-in-up delay-300 max-w-lg">
            Объединяем людей для совместного решения жилищных, финансовых и бытовых задач. Работаем в рамках Федерального закона о потребительской кооперации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
            <a
              href="#join"
              className="inline-flex items-center justify-center gap-2 bg-[#c9963a] hover:bg-amber-600 text-white font-body font-semibold px-8 py-4 rounded transition-all hover:scale-105"
            >
              <Icon name="UserPlus" size={18} />
              Вступить в кооператив
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-body px-8 py-4 rounded transition-all hover:bg-white/10"
            >
              <Icon name="ChevronDown" size={18} />
              Узнать больше
            </a>
          </div>

          {/* Целевая программа */}
          <div className="mt-12 animate-fade-in-up delay-500">
            <div className="border border-[#c9963a]/30 bg-[#c9963a]/8 rounded-xl p-6 max-w-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-0.5 bg-[#c9963a]" />
                <span className="font-body text-[#c9963a] text-xs tracking-widest uppercase font-semibold">
                  Целевая программа
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-white font-medium mb-3 leading-tight">
                Совместная кооперация
              </h2>
              <p className="font-body text-white/65 text-sm leading-relaxed mb-4">
                Программа объединяет пайщиков для совместного достижения общих целей: приобретения имущества, организации снабжения и решения бытовых задач. Участники программы получают доступ к коллективным ресурсам кооператива на льготных условиях.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "Layers", text: "Совместное имущество" },
                  { icon: "TrendingUp", text: "Льготные условия" },
                  { icon: "Vote", text: "Равный голос" },
                ].map((item) => (
                  <div key={item.text} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Icon name={item.icon} size={14} fallback="Circle" className="text-[#c9963a]" />
                    </div>
                    <span className="font-body text-white/55 text-[11px] leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#1a2e1e]/80 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 gap-4 text-center">
          {[
            { n: "ФЗ", label: "Деятельность по закону" },
            { n: "Пайщики", label: "Члены кооператива" },
            { n: "Открыто", label: "Приём новых участников" },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-[#c9963a] text-xl md:text-2xl font-semibold">{s.n}</div>
              <div className="font-body text-white/50 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    { icon: "Scale", title: "Законность", text: "Работаем строго в рамках ФЗ о потребительской кооперации. Полная юридическая прозрачность." },
    { icon: "Users", title: "Взаимопомощь", text: "Каждый пайщик — равноправный участник. Решения принимаются совместно на общем собрании." },
    { icon: "Shield", title: "Защита интересов", text: "Интересы каждого члена кооператива защищены уставом и законодательством РФ." },
    { icon: "Star", title: "Доверие", text: "Открытая отчётность, доступ к документам для каждого пайщика. Никаких скрытых условий." },
  ];

  return (
    <section id="about" className="py-24 bg-[#f7f3ec]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="text-xs font-body tracking-widest uppercase text-[#c9963a] mb-3">О нас</div>
            <h2 className="font-display text-5xl md:text-6xl font-light text-[#1a2e1e] leading-tight mb-6">
              Кооператив<br /><em>нового формата</em>
            </h2>
            <div className="w-12 h-0.5 bg-[#c9963a] mb-6" />
            <p className="font-body text-[#5a7060] text-base leading-relaxed mb-4">
              Народный потребительский кооператив «Подъполье» создан гражданами для граждан. Мы объединяем пайщиков, чтобы совместно решать задачи, которые в одиночку решить сложно или дорого.
            </p>
            <p className="font-body text-[#5a7060] text-base leading-relaxed mb-8">
              Наша деятельность основана на принципах добровольности, равноправия и взаимной выгоды. Каждый пайщик имеет право голоса и доступ к услугам кооператива.
            </p>
            <a
              href="#join"
              className="inline-flex items-center gap-2 text-[#2d5a35] font-body font-semibold text-sm border-b-2 border-[#c9963a] pb-0.5 hover:text-[#c9963a] transition-colors"
            >
              Стать пайщиком <Icon name="ArrowRight" size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-lg p-5 border border-[#2d5a35]/10 hover:border-[#c9963a]/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#2d5a35]/10 flex items-center justify-center mb-3">
                  <Icon name={v.icon} size={18} fallback="Circle" className="text-[#2d5a35]" />
                </div>
                <h3 className="font-display text-lg text-[#1a2e1e] font-semibold mb-1">{v.title}</h3>
                <p className="font-body text-[#5a7060] text-xs leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Словарь терминов */}
        <div className="mt-20 reveal">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-0.5 bg-[#c9963a]" />
            <span className="font-body text-xs tracking-widest uppercase text-[#c9963a] font-semibold">Словарь кооперации</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                term: "Пайщик",
                icon: "User",
                def: "Физическое или юридическое лицо, вступившее в кооператив и внёсшее паевой взнос. Обладает равными правами и обязанностями наравне с другими членами.",
              },
              {
                term: "Паевой взнос",
                icon: "Coins",
                def: "Имущественный вклад пайщика в кооператив. Формирует паевой фонд, за счёт которого кооператив осуществляет свою деятельность. Может быть возвращён при выходе.",
              },
              {
                term: "Паевой фонд",
                icon: "PiggyBank",
                def: "Совокупность паевых взносов всех членов кооператива. Является основой имущества кооператива и гарантией исполнения обязательств.",
              },
              {
                term: "Устав",
                icon: "ScrollText",
                def: "Основной учредительный документ кооператива. Определяет цели, структуру, права и обязанности пайщиков, порядок управления и распределения имущества.",
              },
              {
                term: "Общее собрание",
                icon: "Users",
                def: "Высший орган управления кооперативом. Каждый пайщик имеет один голос вне зависимости от размера взноса. Принимает ключевые решения большинством голосов.",
              },
              {
                term: "Вступительный взнос",
                icon: "LogIn",
                def: "Единовременный платёж при вступлении в кооператив. Покрывает административные расходы на оформление членства и не входит в паевой фонд.",
              },
              {
                term: "Правление",
                icon: "Briefcase",
                def: "Исполнительный орган кооператива, избираемый общим собранием. Осуществляет оперативное управление и реализует решения общего собрания.",
              },
              {
                term: "Ревизионная комиссия",
                icon: "Search",
                def: "Контрольный орган кооператива. Проверяет финансово-хозяйственную деятельность и отчитывается перед общим собранием пайщиков.",
              },
              {
                term: "Субсидиарная ответственность",
                icon: "Scale",
                def: "Дополнительная ответственность пайщиков по обязательствам кооператива. Ограничена размером невнесённой части паевого взноса согласно уставу.",
              },
            ].map((item) => (
              <div
                key={item.term}
                className="group bg-white border border-[#2d5a35]/10 hover:border-[#c9963a]/40 rounded-lg p-5 transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-[#c9963a]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={15} fallback="Circle" className="text-[#c9963a]" />
                  </div>
                  <h3 className="font-display text-lg text-[#1a2e1e] font-semibold leading-tight">{item.term}</h3>
                </div>
                <p className="font-body text-[#5a7060] text-xs leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: "Home", title: "Жилищные программы", text: "Помощь пайщикам в улучшении жилищных условий через механизм паевых взносов.", tag: "Жильё" },
    { icon: "Banknote", title: "Финансовые услуги", text: "Предоставление займов членам кооператива на выгодных условиях в соответствии с уставом.", tag: "Финансы" },
    { icon: "ShoppingCart", title: "Совместные закупки", text: "Организация оптовых закупок товаров и услуг для пайщиков по сниженным ценам.", tag: "Снабжение" },
    { icon: "BookOpen", title: "Правовая поддержка", text: "Консультации по вопросам прав потребителей, жилищного и гражданского законодательства.", tag: "Право" },
    { icon: "Handshake", title: "Посредничество", text: "Помощь в заключении договоров и переговорах с контрагентами от имени кооператива.", tag: "Сделки" },
    { icon: "GraduationCap", title: "Обучение и семинары", text: "Образовательные мероприятия для пайщиков по финансовой грамотности и праву.", tag: "Образование" },
  ];

  return (
    <section id="services" className="py-24 bg-[#1a2e1e]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="text-xs font-body tracking-widest uppercase text-[#c9963a] mb-3">Что мы предлагаем</div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
            Услуги кооператива
          </h2>
          <div className="w-12 h-0.5 bg-[#c9963a] mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c9963a]/40 rounded-lg p-6 transition-all cursor-default"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-full bg-[#c9963a]/15 flex items-center justify-center group-hover:bg-[#c9963a]/25 transition-colors">
                  <Icon name={s.icon} size={20} fallback="Circle" className="text-[#c9963a]" />
                </div>
                <span className="text-[10px] font-body tracking-widest uppercase text-white/30 bg-white/5 px-2 py-1 rounded">
                  {s.tag}
                </span>
              </div>
              <h3 className="font-display text-xl text-white font-medium mb-2">{s.title}</h3>
              <p className="font-body text-white/55 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Documents() {
  const docs = [
    { icon: "FileText", name: "Устав НПК «Подъполье»", desc: "Основной учредительный документ кооператива" },
    { icon: "FileCheck", name: "Положение о паевых взносах", desc: "Порядок внесения и возврата паевых взносов" },
    { icon: "ScrollText", name: "Правила приёма в члены", desc: "Порядок вступления и выхода из кооператива" },
    { icon: "ClipboardList", name: "Протоколы общих собраний", desc: "Решения, принятые членами кооператива" },
    { icon: "Building2", name: "Свидетельство о регистрации", desc: "Государственная регистрация юридического лица" },
    { icon: "ShieldCheck", name: "Политика конфиденциальности", desc: "Обработка персональных данных пайщиков" },
  ];

  return (
    <section id="docs" className="py-24 bg-[#f7f3ec]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 reveal">
          <div className="text-xs font-body tracking-widest uppercase text-[#c9963a] mb-3">Прозрачность</div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#1a2e1e] leading-tight">Документы</h2>
          <div className="w-12 h-0.5 bg-[#c9963a] mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-3 reveal">
          {docs.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-4 bg-white rounded-lg p-5 border border-[#2d5a35]/10 hover:border-[#c9963a]/40 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded bg-[#2d5a35]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9963a]/10 transition-colors">
                <Icon name={d.icon} size={22} fallback="File" className="text-[#2d5a35] group-hover:text-[#c9963a] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-[#1a2e1e] font-medium text-sm truncate">{d.name}</div>
                <div className="font-body text-[#5a7060] text-xs mt-0.5">{d.desc}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] font-body tracking-wider text-[#5a7060] bg-[#2d5a35]/8 px-2 py-1 rounded">PDF</span>
                <Icon name="Download" size={16} fallback="ArrowDown" className="text-[#5a7060] group-hover:text-[#c9963a] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 font-body text-[#5a7060] text-sm text-center reveal">
          Все документы доступны для ознакомления пайщикам кооператива. Для получения оригиналов обратитесь в офис.
        </p>
      </div>
    </section>
  );
}

function Join() {
  const steps = [
    { n: "01", title: "Подайте заявку", text: "Заполните форму на сайте или обратитесь лично в офис кооператива." },
    { n: "02", title: "Внесите вступительный взнос", text: "Размер взноса определяется уставом. Деньги идут на развитие кооператива." },
    { n: "03", title: "Станьте пайщиком", text: "Получите членскую книжку и доступ ко всем услугам кооператива." },
  ];

  return (
    <section id="join" className="py-24 bg-[#2d5a35]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <div className="text-xs font-body tracking-widest uppercase text-[#c9963a] mb-3">Членство</div>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Вступить в<br />кооператив
            </h2>
            <div className="w-12 h-0.5 bg-[#c9963a] mb-10" />
            <div className="space-y-8">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5">
                  <div className="font-display text-4xl text-[#c9963a]/40 font-light leading-none flex-shrink-0 w-10">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white font-semibold mb-1">{s.title}</h3>
                    <p className="font-body text-white/60 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="bg-[#f7f3ec] rounded-xl p-8 shadow-2xl">
              <h3 className="font-display text-2xl text-[#1a2e1e] font-semibold mb-6">Заявка на вступление</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">Имя и фамилия *</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">Телефон *</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs text-[#5a7060] mb-1 tracking-wide">Сообщение</label>
                  <textarea
                    placeholder="Расскажите, что вас интересует..."
                    rows={3}
                    className="w-full font-body text-sm bg-white border border-[#2d5a35]/20 rounded px-4 py-3 outline-none focus:border-[#c9963a] transition-colors text-[#1a2e1e] placeholder:text-gray-400 resize-none"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 accent-[#2d5a35]" />
                  <span className="font-body text-xs text-[#5a7060] leading-relaxed">
                    Согласен(а) с обработкой персональных данных в соответствии с политикой конфиденциальности
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-[#1a2e1e] hover:bg-[#c9963a] text-white font-body font-semibold py-3.5 rounded transition-colors"
                >
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const items = [
    { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1, офис 10" },
    { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
    { icon: "Mail", label: "Email", value: "info@podpolye-npk.ru" },
    { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 10:00–18:00" },
  ];

  return (
    <section id="contacts" className="py-24 bg-[#f7f3ec]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 reveal">
          <div className="text-xs font-body tracking-widest uppercase text-[#c9963a] mb-3">Мы рядом</div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#1a2e1e] leading-tight">Контакты</h2>
          <div className="w-12 h-0.5 bg-[#c9963a] mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 reveal">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.label} className="flex gap-5 items-start">
                <div className="w-11 h-11 rounded-full bg-[#2d5a35]/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} fallback="Circle" className="text-[#2d5a35]" />
                </div>
                <div>
                  <div className="font-body text-xs text-[#5a7060] tracking-wider uppercase mb-0.5">{item.label}</div>
                  <div className="font-body text-[#1a2e1e] font-medium">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="pt-4 flex gap-3">
              {[
                { icon: "Send", label: "Telegram" },
                { icon: "MessageCircle", label: "ВКонтакте" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="flex items-center gap-2 border border-[#2d5a35]/20 hover:border-[#c9963a] text-[#5a7060] hover:text-[#c9963a] font-body text-sm px-4 py-2 rounded transition-all"
                >
                  <Icon name={s.icon} size={16} fallback="Globe" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1a2e1e] rounded-xl overflow-hidden h-72 flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapPin" size={40} className="mx-auto mb-3 text-[#c9963a]/40" />
              <p className="font-body text-white/40 text-sm">Карта будет добавлена</p>
              <p className="font-body text-white/25 text-xs mt-1">г. Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const nav = [
    { label: "О кооперативе", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Документы", href: "#docs" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <footer className="bg-[#1a2e1e] border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c9963a] flex items-center justify-center">
              <span className="font-display text-white font-bold text-sm">П</span>
            </div>
            <div>
              <div className="font-display text-white font-semibold">Подъполье</div>
              <div className="font-body text-white/40 text-xs">Народный потребительский кооператив</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="font-body text-white/50 hover:text-white/80 text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <div className="font-body text-white/30 text-xs text-center">
            © 2024 НПК «Подъполье»<br />
            ИНН: 0000000000 · ОГРН: 0000000000000
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Documents />
      <Join />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;