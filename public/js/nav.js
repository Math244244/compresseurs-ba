/* ============================================================
   nav.js — Script de navigation partagé — Compresseurs BA
   Inclus dans toutes les pages HTML
   ============================================================ */

(function () {
  'use strict';

  // ---- Barre de progression scroll ----
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = (height > 0 ? (winScroll / height) * 100 : 0) + '%';
    }, { passive: true });
  }

  // ---- Header ombre au scroll ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ---- Menu hamburger mobile ----
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      hamburger.classList.toggle('active');

      mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';

      const spans = hamburger.querySelectorAll('span');
      if (!isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Fermer le menu sur clic d'un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mobileMenu.style.maxHeight = '0px';
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---- Lien actif (basé sur l'URL courante) ----
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentFile) link.classList.add('active');
  });

  // ---- Smooth scroll pour liens d'ancre ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ---- Bouton retour en haut ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Animations au défilement (IntersectionObserver) ----
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

  // ---- Compteurs animés ----
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const steps    = 60;
    const step     = target / steps;
    let current    = 0;
    let frame      = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(Math.round(step * frame), target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, duration / steps);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ---- Indicateur horaire dynamique Ouvert / Fermé ----
  (function () {
    /* Horaires : Lun–Ven 8h–18h, Sam 9h–12h (heure de l'Est, UTC-5 ou UTC-4 en été) */
    function isOpen() {
      var now = new Date();
      /* Convertir en heure de Montréal (America/Montreal) */
      var mtl;
      try {
        mtl = new Date(now.toLocaleString('en-US', { timeZone: 'America/Montreal' }));
      } catch (e) {
        mtl = now; // fallback si l'API n'est pas supportée
      }
      var day  = mtl.getDay(); // 0=dim, 1=lun … 6=sam
      var hour = mtl.getHours();
      var min  = mtl.getMinutes();
      var time = hour + min / 60;
      if (day >= 1 && day <= 5) return time >= 8 && time < 18;  // Lun–Ven
      if (day === 6)            return time >= 9 && time < 12;  // Sam
      return false;                                              // Dim
    }

    var open = isOpen();
    var badge = document.createElement('span');
    badge.id = 'hoursIndicator';
    badge.style.cssText = [
      'display:inline-flex', 'align-items:center', 'gap:5px',
      'font-size:0.7rem', 'font-weight:700', 'font-family:Montserrat,sans-serif',
      'letter-spacing:0.5px', 'text-transform:uppercase',
      'padding:3px 9px', 'border-radius:999px',
      open
        ? 'background:rgba(34,197,94,0.15);color:#22c55e;border:1px solid rgba(34,197,94,0.3)'
        : 'background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.25)'
    ].join(';');
    badge.innerHTML =
      '<span style="width:6px;height:6px;border-radius:50%;background:currentColor;' +
        (open ? 'animation:pulse-dot 1.4s infinite;' : '') +
      '"></span>' +
      (open ? 'Ouvert' : 'Fermé');

    /* Injecter dans le header, à côté du numéro de téléphone (desktop) */
    var headerPhone = document.querySelector('.btn-header');
    if (headerPhone && headerPhone.parentNode) {
      headerPhone.parentNode.style.gap = '10px';
      headerPhone.parentNode.insertBefore(badge, headerPhone);
    }
  })();

  // ---- CTA Mobile Flottant (barre de bas de page sur mobile) ----
  (function () {
    var bar = document.createElement('div');
    bar.id = 'mobileCTABar';
    bar.innerHTML =
      '<a href="tel:4182819780" id="mfcta-call">' +
        '<svg xmlns="http://www.w3.org/2000/svg" class="mcta-icon" fill="currentColor" viewBox="0 0 20 20">' +
          '<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>' +
        '</svg>' +
        '<span>Appeler maintenant</span>' +
      '</a>' +
      '<a href="/contact.html" id="mfcta-quote">' +
        '<svg xmlns="http://www.w3.org/2000/svg" class="mcta-icon" fill="currentColor" viewBox="0 0 20 20">' +
          '<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>' +
          '<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>' +
        '</svg>' +
        '<span>Devis gratuit</span>' +
      '</a>';
    document.body.appendChild(bar);
  })();

  // ---- Barre d'annonce (Top Bar) ----
  (function () {
    if (sessionStorage.getItem('topbarDismissed')) return;
    var bar = document.createElement('div');
    bar.id = 'announcementBar';
    bar.innerHTML =
      '<div class="topbar-inner">' +
        '<span class="topbar-dot"></span>' +
        '<span><strong>URGENCES 24h&nbsp;/&nbsp;7j</strong> — Intervention rapide partout au Québec</span>' +
        '<span style="color:rgba(255,255,255,0.4)">|</span>' +
        '<a href="tel:4182819780">📞 418&nbsp;281&nbsp;9780</a>' +
        '<span style="color:rgba(255,255,255,0.4)">|</span>' +
        '<span>Devis <strong>100% gratuit</strong></span>' +
      '</div>' +
      '<button id="closeTopbar" aria-label="Fermer">✕</button>';

    /* Insérer avant le header */
    var header = document.getElementById('header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(bar, header);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    /* Bouton fermer */
    var closeBtn = document.getElementById('closeTopbar');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        bar.style.maxHeight = '0';
        bar.style.overflow  = 'hidden';
        bar.style.padding   = '0';
        bar.style.opacity   = '0';
        setTimeout(function () { if (bar.parentNode) bar.remove(); }, 380);
        sessionStorage.setItem('topbarDismissed', '1');
        if (typeof gtag === 'function') {
          gtag('event', 'topbar_dismiss', { event_category: 'UI' });
        }
      });
    }
    /* Tracking vue */
    if (typeof gtag === 'function') {
      gtag('event', 'topbar_view', { event_category: 'Engagement' });
    }
  })();

  // ---- Side CTA Sticky (Desktop uniquement, appel + devis) ----
  (function () {
    var side = document.createElement('div');
    side.id   = 'sideCtaBtn';
    side.innerHTML =
      '<a href="tel:4182819780" class="side-btn-call" id="sideCTA-call">' +
        '<svg class="side-btn-icon" fill="currentColor" viewBox="0 0 20 20">' +
          '<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>' +
        '</svg>' +
        '418 281 9780' +
      '</a>' +
      '<a href="/contact.html" class="side-btn-quote" id="sideCTA-quote">' +
        '<svg class="side-btn-icon" fill="currentColor" viewBox="0 0 20 20">' +
          '<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>' +
          '<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>' +
        '</svg>' +
        'Devis gratuit' +
      '</a>';
    document.body.appendChild(side);

    /* Afficher après défilement du hero */
    var isVisible = false;
    window.addEventListener('scroll', function () {
      var threshold = window.innerHeight * 0.65;
      var shouldShow = window.scrollY > threshold;
      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        side.classList.toggle('visible', isVisible);
      }
    }, { passive: true });

    /* Tracking clics side CTA */
    side.addEventListener('click', function (e) {
      var btn = e.target.closest('#sideCTA-call, #sideCTA-quote');
      if (!btn) return;
      var isCall = btn.id === 'sideCTA-call';
      if (typeof gtag === 'function') {
        gtag('event', isCall ? 'generate_lead' : 'cta_click', {
          event_category: isCall ? 'Contact' : 'CTA',
          event_label:    isCall ? 'Side CTA — Appel' : 'Side CTA — Devis',
          method:         isCall ? 'telephone' : 'formulaire',
          value:          isCall ? 12 : 4
        });
      }
    });
  })();

  // ---- Notification globale ----
  window.showNotification = function (message, type) {
    type = type || 'info';
    const n = document.createElement('div');
    n.className = [
      'fixed top-20 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 transition-all duration-300 max-w-sm text-white font-semibold text-sm',
      type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-600' : 'bg-blue-500'
    ].join(' ');
    n.textContent = message;
    n.style.transform = 'translateX(420px)';
    document.body.appendChild(n);
    setTimeout(() => { n.style.transform = 'translateX(0)'; }, 10);
    setTimeout(() => {
      n.style.transform = 'translateX(420px)';
      setTimeout(() => n.remove(), 320);
    }, 5000);
  };

})();
