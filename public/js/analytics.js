/* ============================================================
   analytics.js — Suivi Analytics Complet
   Compresseurs BA | Google Analytics 4 | G-X188E19QH9
   ============================================================
   Événements mesurés :
   1.  Profondeur de défilement (25%, 50%, 75%, 90%)
   2.  Temps passé sur la page (15s, 30s, 60s, 120s, 300s)
   3.  Durée totale à la fermeture
   4.  Clics téléphone  → generate_lead (valeur = 10)
   5.  Clics email
   6.  Clics boutons CTA (avec destination et texte)
   7.  Clics navigation
   8.  Visibilité des sections (IntersectionObserver)
   9.  Interactions carrousels (id + direction)
   10. Funnel formulaire contact (start → submit → succès/erreur)
   11. Bouton retour en haut
   12. Liens externes
   13. Engagement qualifié (scroll ≥ 50% ET ≥ 30s)
   14. CTA mobile flottant (#mfcta-call / #mfcta-quote)
   ============================================================ */

(function () {
  'use strict';

  /* ------ Sécurité : s'assurer que gtag est disponible ------ */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }
  var GA4 = window.gtag;

  /* ------ Contexte de la page courante ------ */
  var pagePath = window.location.pathname;
  var pageSlug = pagePath.split('/').pop().replace('.html', '') || 'index';
  var PAGE_MAP = {
    'index':       'Accueil',
    '':            'Accueil',
    'produits':    'Produits',
    'services':    'Services',
    'a-propos':    'À Propos',
    'temoignages': 'Témoignages',
    'contact':     'Contact'
  };
  var pageCategory = PAGE_MAP[pageSlug] || pageSlug;
  var sessionStart  = Date.now();

  /* Envoyer la catégorie de page comme dimension personnalisée */
  GA4('set', 'page_category', pageCategory);

  /* ==========================================================
     1. PROFONDEUR DE DÉFILEMENT
     ========================================================== */
  var scrollDone = {};
  var scrollTick = false;
  window.addEventListener('scroll', function () {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        var pct = Math.round((window.scrollY / max) * 100);
        [25, 50, 75, 90].forEach(function (m) {
          if (!scrollDone[m] && pct >= m) {
            scrollDone[m] = true;
            GA4('event', 'scroll', {
              percent_scrolled: m,
              page_category:    pageCategory
            });
          }
        });
      }
      scrollTick = false;
    });
  }, { passive: true });

  /* ==========================================================
     2. TEMPS PASSÉ SUR LA PAGE
     ========================================================== */
  [15, 30, 60, 120, 300].forEach(function (sec) {
    setTimeout(function () {
      if (!document.hidden) {
        GA4('event', 'time_on_page', {
          event_category: 'Engagement',
          seconds:         sec,
          page_category:   pageCategory
        });
      }
    }, sec * 1000);
  });

  /* ==========================================================
     3. DURÉE TOTALE (au changement de visibilité / fermeture)
     ========================================================== */
  window.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      GA4('event', 'page_exit', {
        event_category:   'Engagement',
        duration_seconds: Math.round((Date.now() - sessionStart) / 1000),
        page_category:    pageCategory
      });
    }
  });

  /* ==========================================================
     4. CLICS TÉLÉPHONE — LEAD DIRECT (valeur élevée)
     ========================================================== */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.addEventListener('click', function () {
      GA4('event', 'click', {
        event_category: 'Contact',
        event_label:    'Téléphone',
        page_category:  pageCategory,
        value:          10
      });
      GA4('event', 'generate_lead', {
        method:         'telephone',
        page_category:  pageCategory,
        value:          10
      });
    });
  });

  /* ==========================================================
     5. CLICS EMAIL
     ========================================================== */
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
    el.addEventListener('click', function () {
      GA4('event', 'click', {
        event_category: 'Contact',
        event_label:    'Email',
        page_category:  pageCategory,
        value:          5
      });
    });
  });

  /* ==========================================================
     6. CLICS BOUTONS CTA
     ========================================================== */
  var ctaSel = '.btn-primary, .btn-secondary, .btn-outline, .btn-outline-white, .btn-header, .btn-link';
  document.querySelectorAll(ctaSel).forEach(function (el) {
    if (el.tagName !== 'A' && el.tagName !== 'BUTTON') return;
    el.addEventListener('click', function () {
      var label = (el.textContent || '').trim().replace(/\s+/g, ' ').substring(0, 60);
      var dest  = el.getAttribute('href') || '';
      GA4('event', 'cta_click', {
        event_category: 'CTA',
        event_label:    label,
        destination:    dest,
        page_category:  pageCategory
      });
      /* Boutons menant vers contact / devis = lead potentiel */
      if (dest.includes('contact') || /devis|soumission|urgence|appel/i.test(label)) {
        GA4('event', 'generate_lead', {
          method:         'cta',
          cta_text:       label,
          page_category:  pageCategory,
          value:          3
        });
      }
    });
  });

  /* ==========================================================
     7. CLICS DE NAVIGATION
     ========================================================== */
  document.querySelectorAll('.nav-link').forEach(function (el) {
    el.addEventListener('click', function () {
      GA4('event', 'navigate', {
        event_category: 'Navigation',
        from_page:      pageCategory,
        to_page:        (el.textContent || '').trim(),
        destination:    el.getAttribute('href') || ''
      });
    });
  });

  /* ==========================================================
     8. VISIBILITÉ DES SECTIONS (IntersectionObserver)
     ========================================================== */
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id ||
                 entry.target.getAttribute('data-section') || '';
        if (id) {
          GA4('event', 'section_view', {
            event_category: 'Engagement',
            section_id:     id,
            page_category:  pageCategory
          });
        }
        secObs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id], [data-section]').forEach(function (el) {
      secObs.observe(el);
    });
  }

  /* ==========================================================
     9. INTERACTIONS CARROUSELS
     ========================================================== */
  document.querySelectorAll('.carousel-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var c  = btn.closest('.carousel-container');
      var id = c ? (c.getAttribute('data-carousel') || 'inconnu') : 'inconnu';
      GA4('event', 'carousel_interaction', {
        event_category: 'Produits',
        carousel_id:    id,
        direction:      btn.classList.contains('carousel-prev') ? 'prev' : 'next',
        page_category:  pageCategory
      });
    });
  });

  /* ==========================================================
     10. FUNNEL FORMULAIRE CONTACT
     ========================================================== */
  var form = document.getElementById('contactForm');
  if (form) {
    var formStarted = false;

    /* Début de saisie */
    form.querySelectorAll('input, textarea, select').forEach(function (f) {
      f.addEventListener('focus', function () {
        if (formStarted) return;
        formStarted = true;
        GA4('event', 'form_start', {
          event_category: 'Contact',
          form_name:      'contactForm',
          page_category:  pageCategory
        });
      });
    });

    /* Soumission du formulaire */
    form.addEventListener('submit', function () {
      var subjectEl = document.getElementById('subject');
      var subject   = subjectEl ? subjectEl.value : '';
      GA4('event', 'form_submit', {
        event_category: 'Contact',
        form_name:      'contactForm',
        subject:        subject,
        page_category:  pageCategory,
        value:          10
      });
    });

    /* Succès confirmé (observation de la classe "hidden" sur #successMessage) */
    var successEl = document.getElementById('successMessage');
    if (successEl && 'MutationObserver' in window) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'attributes' && !successEl.classList.contains('hidden')) {
            GA4('event', 'form_success', {
              event_category: 'Contact',
              form_name:      'contactForm',
              page_category:  pageCategory,
              value:          20
            });
            GA4('event', 'generate_lead', {
              method:         'contact_form',
              page_category:  pageCategory,
              value:          20
            });
          }
        });
      }).observe(successEl, { attributes: true, attributeFilter: ['class'] });
    }

    /* Erreur d'envoi */
    var errorEl = document.getElementById('errorMessage');
    if (errorEl && 'MutationObserver' in window) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          if (m.type === 'attributes' && !errorEl.classList.contains('hidden')) {
            GA4('event', 'form_error', {
              event_category: 'Contact',
              form_name:      'contactForm',
              page_category:  pageCategory
            });
          }
        });
      }).observe(errorEl, { attributes: true, attributeFilter: ['class'] });
    }
  }

  /* ==========================================================
     11. BOUTON RETOUR EN HAUT
     ========================================================== */
  var bttBtn = document.getElementById('backToTop');
  if (bttBtn) {
    bttBtn.addEventListener('click', function () {
      GA4('event', 'back_to_top', {
        event_category:  'Navigation',
        page_category:   pageCategory,
        scroll_position: Math.round(window.scrollY)
      });
    });
  }

  /* ==========================================================
     12. LIENS EXTERNES
     ========================================================== */
  document.querySelectorAll('a[href^="http"]').forEach(function (el) {
    try {
      if (!el.href.includes(window.location.hostname)) {
        el.addEventListener('click', function () {
          GA4('event', 'click', {
            event_category: 'Lien externe',
            link_url:       el.href,
            link_text:      (el.textContent || '').trim(),
            page_category:  pageCategory
          });
        });
      }
    } catch (e) { /* ignore les URLs invalides */ }
  });

  /* ==========================================================
     13. ENGAGEMENT QUALIFIÉ
         Déclenché si : scroll ≥ 50% ET temps ≥ 30 secondes
     ========================================================== */
  var qScroll = false;
  var qTime   = false;
  function checkQualified() {
    if (qScroll && qTime) {
      GA4('event', 'qualified_visit', {
        event_category: 'Engagement',
        criteria:       '50pct_scroll_30s',
        page_category:  pageCategory,
        value:          5
      });
    }
  }
  setTimeout(function () { qTime = true; checkQualified(); }, 30000);
  window.addEventListener('scroll', function () {
    if (!qScroll) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && (window.scrollY / max) > 0.5) {
        qScroll = true;
        checkQualified();
      }
    }
  }, { passive: true });

  /* ==========================================================
     14. CTA MOBILE FLOTTANT — Trackés séparément
         (#mfcta-call = appel, #mfcta-quote = devis)
     ========================================================== */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#mfcta-call, #mfcta-quote');
    if (!btn) return;
    var isCall = btn.id === 'mfcta-call';
    GA4('event', isCall ? 'generate_lead' : 'cta_click', {
      event_category: isCall ? 'Contact'    : 'CTA',
      event_label:    isCall ? 'Tel Mobile Flottant' : 'Devis Mobile Flottant',
      method:         isCall ? 'telephone'  : 'formulaire',
      page_category:  pageCategory,
      value:          isCall ? 15 : 5
    });
  });

})();
