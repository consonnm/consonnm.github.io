/* ===== GA4：仅在正式网站上启用，避免记录本地调试访问 ===== */
(function () {
  const config = document.querySelector('meta[name="ga4-measurement-id"]');
  const measurementId = config ? config.content.trim() : '';

  if (window.location.hostname !== 'consonnm.github.io' || !/^G-[A-Z0-9]+$/.test(measurementId)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // config 默认发送一次 page_view；语言切换时不重复初始化。
  window.gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(tag);
})();
