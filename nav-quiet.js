/**
 * Quiet Minimal Navigation
 * States: Default → Scrolled (pill) → Open (fullscreen)
 */

class QuietNav {
    constructor() {
        this.nav = document.querySelector('.quiet-nav');
        this.bar = document.querySelector('.quiet-nav__bar');
        this.trigger = document.querySelector('.quiet-nav__trigger');
        this.overlay = document.querySelector('.quiet-nav__overlay');
        this.closeBtn = document.querySelector('.quiet-nav__close');
        this.preview = document.querySelector('.quiet-nav__preview');
        this.previewImg = document.querySelector('.quiet-nav__preview-img');
        this.categoryLinks = document.querySelectorAll('.quiet-nav__category-link');
        this.themeToggle = document.querySelector('.quiet-nav__theme-toggle');

        this.isOpen = false;
        this.scrollThreshold = 100;
        this.lastScrollY = 0;

        if (this.nav) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.checkScroll();
    }

    bindEvents() {
        // Menu trigger
        if (this.trigger) {
            this.trigger.addEventListener('click', () => this.open());
        }

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close on overlay background click
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Scroll behavior
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Preview image on hover (desktop only)
        if (this.preview && window.matchMedia('(min-width: 769px)').matches) {
            this.initPreview();
        }

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Close menu on link click (for SPA-like behavior)
        this.categoryLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Small delay for visual feedback
                setTimeout(() => this.close(), 150);
            });
        });
    }

    checkScroll() {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.nav.classList.add('is-scrolled');
        } else {
            this.nav.classList.remove('is-scrolled');
        }

        this.lastScrollY = scrollY;
    }

    open() {
        this.isOpen = true;
        this.overlay.classList.add('is-open');
        document.body.classList.add('nav-open');

        // Focus trap
        this.closeBtn?.focus();

        // Announce to screen readers
        this.overlay.setAttribute('aria-hidden', 'false');
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('is-open');
        document.body.classList.remove('nav-open');

        // Return focus
        this.trigger?.focus();

        // Hide preview
        if (this.preview) {
            this.preview.classList.remove('is-visible');
        }

        // Announce to screen readers
        this.overlay.setAttribute('aria-hidden', 'true');
    }

    initPreview() {
        // Track mouse position
        let mouseX = 0;
        let mouseY = 0;
        let previewX = 0;
        let previewY = 0;

        // Smooth follow animation
        const animatePreview = () => {
            const dx = mouseX - previewX;
            const dy = mouseY - previewY;

            previewX += dx * 0.15;
            previewY += dy * 0.15;

            this.preview.style.left = `${previewX}px`;
            this.preview.style.top = `${previewY}px`;

            requestAnimationFrame(animatePreview);
        };
        animatePreview();

        // Update mouse position
        this.overlay.addEventListener('mousemove', (e) => {
            mouseX = e.clientX + 30;
            mouseY = e.clientY - 150;
        });

        // Show/hide preview on category hover
        this.categoryLinks.forEach(link => {
            const previewSrc = link.dataset.preview;

            link.addEventListener('mouseenter', () => {
                if (previewSrc && this.previewImg) {
                    this.previewImg.src = previewSrc;
                    this.preview.classList.add('is-visible');
                }
            });

            link.addEventListener('mouseleave', () => {
                this.preview.classList.remove('is-visible');
            });
        });
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('sg-theme', newTheme);

        // Update icon
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle?.querySelector('.quiet-nav__theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀' : '☾';
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.quietNav = new QuietNav();
});

// Also handle dynamic loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    window.quietNav = new QuietNav();
}
