// ========== Firebase Integration ==========
import { saveContactMessage } from './firebase-config.js';

// ========== Navigation Mobile ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    if (mobileMenu.style.maxHeight === '0px' || mobileMenu.style.maxHeight === '') {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    } else {
        mobileMenu.style.maxHeight = '0px';
    }
    
    // Animation des barres du hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu lors du clic sur un lien
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.style.maxHeight = '0px';
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========== Navigation Active Link ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========== Formulaire de Contact ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Enregistrer le message dans Firebase Firestore
    try {
        console.log('Formulaire soumis:', formData);
        
        // Enregistrer dans Firestore
        const result = await saveContactMessage(formData);
        
        if (result.success) {
            // Message de confirmation
            showNotification('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        console.error('Erreur:', error);
    }
});

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-5 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ========== Animation au Scroll ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec data-animate
document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== Performance: Lazy Loading Images ==========
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========== Console Message ==========
console.log('%c🔧 Compresseurs BA', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cSite web développé avec Tailwind CSS & Firebase', 'color: #64748b; font-size: 14px;');
console.log('%c⚡ Performance optimisée', 'color: #10b981; font-size: 12px;');

// ========== CARROUSELS D'IMAGES SYNCHRONISÉS ==========
class Carousel {
    constructor(container) {
        this.container = container;
        this.wrapper = container.querySelector('.carousel-wrapper');
        this.images = container.querySelectorAll('.carousel-image');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        
        this.currentIndex = 0;
        this.totalImages = this.images.length;
        
        this.init();
    }
    
    init() {
        // Navigation avec les boutons
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Navigation avec les indicateurs
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });
    }
    
    goTo(index) {
        // Retirer la classe active de l'image et indicateur actuels
        this.images[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');
        
        // Mettre à jour l'index
        this.currentIndex = index;
        
        // Ajouter la classe active à la nouvelle image et indicateur
        this.images[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.goTo(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.goTo(prevIndex);
    }
}

// ========== GESTIONNAIRE DE SYNCHRONISATION ==========
class CarouselSyncManager {
    constructor() {
        this.carousels = [];
        this.autoplayInterval = null;
        this.isPlaying = false;
        this.isPaused = false;
    }
    
    addCarousel(carousel) {
        this.carousels.push(carousel);
        
        // Pause globale au survol de n'importe quel carrousel
        carousel.container.addEventListener('mouseenter', () => this.pause());
        carousel.container.addEventListener('mouseleave', () => this.resume());
    }
    
    start() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.autoplayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextAll();
            }
        }, 4000); // Change toutes les 4 secondes
        
        console.log('🔄 Carrousels synchronisés démarrés (4 secondes)');
    }
    
    pause() {
        this.isPaused = true;
        console.log('⏸️ Carrousels en pause');
    }
    
    resume() {
        this.isPaused = false;
        console.log('▶️ Carrousels reprennent');
    }
    
    stop() {
        this.isPlaying = false;
        this.isPaused = false;
        clearInterval(this.autoplayInterval);
        console.log('⏹️ Carrousels arrêtés');
    }
    
    nextAll() {
        // Change tous les carrousels EN MÊME TEMPS
        this.carousels.forEach(carousel => {
            carousel.next();
        });
        console.log('➡️ Tous les carrousels changent d\'image');
    }
    
    prevAll() {
        // Recule tous les carrousels EN MÊME TEMPS
        this.carousels.forEach(carousel => {
            carousel.prev();
        });
    }
}

// ========== Initialize on Load ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la navigation active
    highlightNavigation();
    
    // Ajouter des classes pour les animations initiales
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialiser tous les carrousels avec synchronisation
    const carouselContainers = document.querySelectorAll('.carousel-container');
    const syncManager = new CarouselSyncManager();
    
    carouselContainers.forEach(container => {
        const carousel = new Carousel(container);
        syncManager.addCarousel(carousel);
    });
    
    // Démarrer la synchronisation automatique
    syncManager.start();
    
    console.log(`✅ ${carouselContainers.length} carrousels synchronisés initialisés avec succès`);
    
    // ========== Smooth Scroll AMÉLIORÉ ==========
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`🔗 Trouvé ${scrollLinks.length} liens avec #`);
    
    scrollLinks.forEach((anchor, index) => {
        console.log(`  - Lien ${index + 1}: ${anchor.getAttribute('href')} (${anchor.textContent.trim().substring(0, 30)}...)`);
        
        anchor.addEventListener('click', function (e) {
            console.log('🖱️ CLIC détecté sur:', this.getAttribute('href'));
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                console.log('⚠️ Lien vide (#), on ignore');
                return;
            }
            
            const target = document.querySelector(targetId);
            console.log('🎯 Cible trouvée:', target ? 'OUI' : 'NON', targetId);
            
            if (target) {
                // Offset pour tenir compte du header fixe (100px pour être sûr)
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                console.log('📍 Position calculée:', offsetPosition);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                console.log('✅ Scroll vers', targetId, 'lancé');
                
                // Fermer le menu mobile si ouvert
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburger = document.getElementById('hamburger');
                if (mobileMenu && mobileMenu.style.maxHeight !== '0px') {
                    mobileMenu.style.maxHeight = '0px';
                    hamburger.classList.remove('active');
                }
            } else {
                console.error('❌ Impossible de trouver la cible:', targetId);
            }
        });
    });
    
    console.log('✅ Smooth scroll initialisé avec', scrollLinks.length, 'liens');
    
    // ========== Event Listener SPÉCIFIQUE pour les boutons "Demander un devis" ==========
    const btnLinks = document.querySelectorAll('.btn-link[href="#contact"]');
    console.log(`🔘 Trouvé ${btnLinks.length} boutons .btn-link vers #contact`);
    
    btnLinks.forEach((btn, index) => {
        console.log(`  - Bouton ${index + 1}: ${btn.textContent.trim()}`);
        
        btn.addEventListener('click', function(e) {
            console.log('🔘 CLIC DIRECT sur bouton .btn-link détecté !');
            e.preventDefault();
            e.stopPropagation();
            
            const contact = document.getElementById('contact');
            console.log('🎯 Section contact:', contact ? 'TROUVÉE' : 'NON TROUVÉE');
            
            if (contact) {
                const headerOffset = 100;
                const elementPosition = contact.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                console.log('📍 Scroll vers position:', offsetPosition);
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                console.log('✅ Scroll effectué vers #contact');
            } else {
                console.error('❌ Section #contact introuvable !');
            }
        }, true); // Utiliser capture phase
    });
    
    // ========== Header Shadow on Scroll ==========
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.add('shadow-md');
        }
    });
});

