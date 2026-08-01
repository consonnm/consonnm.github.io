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
