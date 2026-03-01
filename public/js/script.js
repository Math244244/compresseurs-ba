/* ============================================================
   script.js — Carrousels & fonctionnalités produits
   Compresseurs BA
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initAllCarousels();
});

/* ===== CARROUSELS ===== */
function initAllCarousels() {
  const containers = document.querySelectorAll('.carousel-container[data-carousel]');
  containers.forEach(container => initCarousel(container));
}

function initCarousel(container) {
  const images     = container.querySelectorAll('.carousel-image');
  const indicators = container.querySelectorAll('.indicator');
  const prevBtn    = container.querySelector('.carousel-prev');
  const nextBtn    = container.querySelector('.carousel-next');

  if (!images.length) return;

  let current   = 0;
  let autoTimer = null;

  function goTo(index) {
    images[current].classList.remove('active');
    indicators[current]?.classList.remove('active');

    current = (index + images.length) % images.length;

    images[current].classList.add('active');
    indicators[current]?.classList.add('active');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  // Boutons précédent / suivant
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); stopAuto(); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); stopAuto(); goTo(current + 1); startAuto(); });

  // Indicateurs
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Pause au survol
  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);

  // Swipe tactile
  let touchStartX = 0;
  container.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  container.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  // Démarrage
  startAuto();
}
