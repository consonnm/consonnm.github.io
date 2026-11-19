/* ===== 中英文切换：HTML 默认中文，保留用户的语言偏好 ===== */
(function () {
  const storageKey = 'homepage-language';
  const elements = document.querySelectorAll('[data-i18n]');
  const buttons = document.querySelectorAll('[data-language]');
  const chinese = Object.create(null);
  elements.forEach(function (element) {
    chinese[element.dataset.i18n] = element.innerHTML;
  });

  // English copy mirrors the original homepage. Chinese copy lives in index.html.
  const translations = {
    'zh-CN': chinese,
    en: {
      "page.title": "Jinsen Su | Homepage",
      "name": "Jinsen Su",
      "section.news": "News",
      "section.publications": "Publications",
      "section.awards": "Awards",
      "section.projects": "Projects",
      "section.education": "Education",
      "profile.title": "Master's Student, Institute of Artificial Intelligence",
      "profile.affiliation": "Xiamen University · Xiamen, China",
      "profile.advisor": "Advisor: <a href=\"https://zhengxiawu.github.io\" target=\"_blank\" rel=\"noopener\">Prof. Xiawu Zheng</a>",
      "profile.keywords": "Multimodal Compression · Multimodal Agent Evaluation",
      "scholar": "Google Scholar",
      "profile.bio": "\n          I am a Master's student (2025–2028) at the Institute of Artificial Intelligence, <strong>Xiamen University</strong>,\n          and a member of the <strong>Media Analytics and Computing (MAC) Lab</strong>,\n          advised by <a href=\"https://zhengxiawu.github.io\" target=\"_blank\" rel=\"noopener\">Prof. Xiawu Zheng</a>.\n          My research focuses on <strong>multimodal large language models</strong>.\n          Previously, I received my B.Eng. in Computer Science and Technology from <strong>Fuzhou University</strong>,\n          where I was an <strong>ICPC regional bronze medalist</strong>.\n        ",
      "profile.internship": "\n          I am currently a <strong>Research Intern at Meituan (LongCat Team)</strong>, May 2026 – Present.\n        ",
      "news.subtitle": "News Updates",
      "news.omniscope": "🔥 <strong>OmniScope</strong> was accepted to <strong>ACM MM 2026</strong> as first author.",
      "news.meituan": "Joined <strong>Meituan (LongCat Team)</strong> as a Research Intern.",
      "news.video": "🔥 <strong>Video-MME-v2</strong> was released on <a href=\"https://arxiv.org/abs/2604.05015\" target=\"_blank\" rel=\"noopener\">arXiv</a>.",
      "news.mac": "Joined the <strong>MAC Lab</strong> (Media Analytics and Computing), Xiamen University.",
      "news.asc": "Won the <strong>Second Prize</strong> in the ASC Student Supercomputer Challenge (rank 29/359).",
      "news.icpc": "Won the <strong>Bronze Medal</strong> in the 48th ICPC Asia Regional Contest (Xi'an).",
      "publications.subtitle": "\n        <a href=\"https://scholar.google.com/citations?hl=en&user=zEtcLP4AAAAJ\" target=\"_blank\" rel=\"noopener\">Full list on Google Scholar</a>\n      ",
      "publications.firstAuthor": "CCF-A · First author",
      "publications.contributor": "Major contributor",
      "code": "Code",
      "awards.icpc": "Bronze Medal — The 48th International Collegiate Programming Contest (ICPC) Asia Regional Contest, Xi'an",
      "awards.asc": "Second Prize — 2024 ASC Student Supercomputer Challenge",
      "awards.ai4s": "Third Prize — AI4S LLM Challenge: Multimodal Table Recognition & Understanding",
      "awards.huaweiAI": "National Third Prize — Huawei Developer Competition: LLM AI Challenge",
      "awards.codecraft2025": "Second Prize — 2025 Huawei Software Elite Challenge (CodeCraft), Hangzhou–Xiamen Division",
      "awards.codecraft2024": "Second Prize — 2024 Huawei Software Elite Challenge (CodeCraft), Hangzhou–Xiamen Division",
      "awards.hpc": "Third Prize — 2023 PKU HPCGame (0th)",
      "awards.mcm": "Honorable Mention — 2024 Mathematical Contest in Modeling / Interdisciplinary Contest in Modeling (MCM/ICM)",
      "awards.ascRank": "Ranked 29th among 359 teams worldwide",
      "projects.title": "CodeCraft — Intelligent Port Scheduling System",
      "projects.venue": "Huawei Software Elite Challenge 2024",
      "projects.description": "\n            Tackled a scheduling problem abstracted from Huawei Cloud's intelligent port business.\n            Built robot/ship path planning with BFS + A* to achieve locally optimal, collision-free\n            dispatching; modeled cargo selection with features of value, quantity, and distance;\n            tuned the valuation function with Bayesian optimization and random forests —\n            maximizing total transportation profit.\n          ",
      "education.xmu": "Xiamen University <span class=\"edu-tag\">985</span>",
      "education.fzu": "Fuzhou University <span class=\"edu-tag\">211</span>",
      "education.masters": "M.Sc. in Artificial Intelligence (Multimodal), Institute of Artificial Intelligence · MAC Lab",
      "education.bachelors": "B.Eng. in Computer Science and Technology, College of Computer and Data Science · ACM Lab",
      "footer.copyright": "© 2026 Jinsen Su",
      "footer.email": "Email",
      "footer.top": "Back to top ↑",
      "footer.visits": "visits",
      "footer.visitors": "visitors"
    }
  };
  const description = document.querySelector('meta[name="description"]');
  const descriptions = {
    'zh-CN': description.content,
    en: "Personal academic homepage of Jinsen Su (苏锦森), Master's student at Xiamen University, working on multimodal large language models."
  };

  function setLanguage(language, persist) {
    const messages = translations[language];
    document.documentElement.lang = language;
    elements.forEach(function (element) {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(messages, key)) {
        element.innerHTML = messages[key];
      }
    });
    description.content = descriptions[language];
    document.querySelector('.nav-links').setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主导航');
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    if (persist) {
      try {
        localStorage.setItem(storageKey, language);
      } catch (error) {
        // Switching still works when browser storage is unavailable.
      }
    }
  }

  let language = 'zh-CN';
  try {
    const savedLanguage = localStorage.getItem(storageKey);
    if (Object.prototype.hasOwnProperty.call(translations, savedLanguage)) {
      language = savedLanguage;
    }
  } catch (error) {
    // Keep the Chinese default when browser storage is unavailable.
  }
  setLanguage(language, false);
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.dataset.language, true);
    });
  });
})();

/* ===== 滚动渐入动画 ===== */
(function () {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add('visible'); }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
})();

/* ===== 导航栏 scroll-spy（当前区块高亮） ===== */
(function () {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(links)
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  const spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id && entry.isIntersecting);
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  sections.forEach(function (s) { spy.observe(s); });
})();
