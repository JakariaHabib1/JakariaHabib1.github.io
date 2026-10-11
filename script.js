/**
 * Jakaria Habib — Academic Portfolio Script
 * Pure vanilla JavaScript with zero external dependencies
 * Features: BibTeX Clipboard Copy, Publication Filters, Abstract Toggles,
 *           Certificate Lightbox Modal, Mobile Navigation, Reading Theme Toggle,
 *           Full-screen Interactive CV Viewer Modal, and Static / Netlify Form Support.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initAbstractToggles();
    initBibtexCopy();
    initResearchFilters();
    initCertificateLightbox();
    initContactForm();
    initScrollAnimations();
    init3DTilt();
    initCvModal();
    initNumberCounters();
    initLiveSync();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Default: Prestigious Academic Light; Optional: Midnight Library)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Check saved preference or default to light academic theme
    const savedTheme = localStorage.getItem('jh_academic_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(toggleBtn, savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('jh_academic_theme', newTheme);
        updateThemeIcon(toggleBtn, newTheme);
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        btn.setAttribute('title', 'Switch to Academic Light Mode');
    } else {
        icon.className = 'fa-solid fa-moon';
        btn.setAttribute('title', 'Switch to Midnight Library Mode');
    }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('mobile-open') 
                ? 'fa-solid fa-xmark' 
                : 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when any navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // Close when clicking outside of the navigation
    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    });
}

/* --------------------------------------------------------------------------
   3. Abstract Drawer Toggles (acadpro Style)
   -------------------------------------------------------------------------- */
function initAbstractToggles() {
    const toggleBtns = document.querySelectorAll('.btn-abstract-toggle');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('.pub-row') || btn.closest('.pub-card');
            if (!row) return;
            const abstractDrawer = row.querySelector('.pub-abstract-drawer') || row.querySelector('.pub-abstract-box');
            if (!abstractDrawer) return;

            abstractDrawer.classList.toggle('show');
            const isShown = abstractDrawer.classList.contains('show');
            btn.innerHTML = isShown 
                ? '<i class="fa-solid fa-chevron-up"></i> Hide Abstract' 
                : '<i class="fa-solid fa-align-left"></i> Abstract';
        });
    });
}

/* --------------------------------------------------------------------------
   4. BibTeX Database & Clipboard Copy (All 10 Publications Verified)
   -------------------------------------------------------------------------- */
const BIBTEX_DATABASE = {
    'habib2026vision': `@article{habib2026vision,
  title={Vision Transformer-Based Damage Assessment from Post-Disaster Satellite Imagery: An Applied Study on Hurricane Harvey},
  author={Habib, Jakaria and Hossain, Imran and Shammo, Md. Basim Al Zabir and Mulk, Taz Warul and Rubaiat, Estiyak},
  journal={Earth Science Informatics},
  volume={19},
  pages={102--119},
  year={2026},
  publisher={Springer Nature},
  doi={10.1007/s12145-026-01284-9}
}`,
    'mohammad2026specialist': `@inproceedings{mohammad2026specialist,
  title={Specialist Drift: Continual RL for Capability-Preserving Foundation Model Post-Training},
  author={Mohammad, Noor Islam S. and Habib, Jakaria and Shammo, Md. Basim Al Zabir},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2027},
  note={Under Peer Review}
}`,
    'mohammad2026sift': `@inproceedings{mohammad2026sift,
  title={SIFT: Robust Meta-Faithfulness Verification of Chain-of-Thought Reasoning Under Distribution Shift},
  author={Mohammad, Noor Islam S. and Shammo, Md. Basim Al Zabir and Siddiki, Hasan and Hasan, Mahmudul and Sheikh, Md. Faisal and Habib, Jakaria},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2027},
  note={Under Peer Review}
}`,
    'mohammad2026symmetry': `@inproceedings{mohammad2026symmetry,
  title={The Symmetry Budget: How Much Group Structure Should a Network Architecture Assume?},
  author={Habib, Jakaria and Mohammad, Noor Islam S. and Hasan, Mahmudul and Shammo, Md. Basim Al Zabir and Siddiki, Hasan},
  booktitle={NeurIPS 2026 Workshop on Symmetry and Geometry in Neural Representations (NeurReps)},
  series={PMLR},
  year={2026}
}`,
    'mohammad2026halt': `@inproceedings{mohammad2026halt,
  title={HALT: Certifying Trust Horizons in Action-Conditioned Robotic World Models},
  author={Habib, Jakaria and Mohammad, Noor Islam S. and Sheikh, Md. Faisal},
  booktitle={NeurIPS 2026 Robotics World Modeling Workshop (RWM)},
  year={2026}
}`,
    'habib2026poultry': `@inproceedings{habib2026poultry,
  title={A Hybrid CNN--Transformer Framework for Automated Poultry Disease Classification Using Fecal Images},
  author={Habib, Jakaria and et al.},
  booktitle={IEEE International Conference on Power, Electronics, Communications, Computing, and Intelligent Infrastructure (PECCII)},
  year={2026},
  publisher={IEEE}
}`,
    'rashed2025ppg': `@inproceedings{rashed2025ppg,
  title={A Machine Learning Framework for Stress Detection Using Photoplethysmography (PPG) Signals},
  author={Rashed, Md. and Shammo, Md. Basim Al Zabir and Hossain, Md. Imran and Hossain, Md. Anwar and Islam, Lamia and Habib, Jakaria},
  booktitle={IEEE International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN)},
  year={2025},
  pages={1--6},
  publisher={IEEE}
}`,
    'habib2025violence': `@inproceedings{habib2025violence,
  title={The Optimization of Violence Detection and Classification with Vision Transformer and ResNet18 Hybrid Model},
  author={Habib, Jakaria and et al.},
  booktitle={IEEE Women in Engineering Conference on Electrical and Computer Engineering (WIECON-ECE)},
  year={2025},
  publisher={IEEE}
}`,
    'habib2026geomind': `@article{habib2026geomind,
  title={GeoMind: An Autonomous Multi-Agent Framework for Verified Geospatial Analysis},
  author={Habib, Jakaria and Srabon, Monoarul Islam and Nahar, Mst Lutfun and Lutfy, Mariam and Khatun, Most. Amina and Shammo, Md. Basim Al Zabir and Hasan, Md. Atik},
  journal={Earth Science Informatics},
  year={2026},
  publisher={Springer Nature},
  note={Under Peer Review}
}`,
    'habib2026limits': `@article{habib2026limits,
  title={The Limits of Physics-Informed Digital Twins Under Transient Loads: An HIL Study for Micro-Mechatronics},
  author={Habib, Jakaria and et al.},
  journal={Journal of Intelligent Manufacturing},
  year={2026},
  publisher={Springer Nature},
  note={Under Peer Review}
}`
};

function initBibtexCopy() {
    const copyBtns = document.querySelectorAll('.btn-bibtex-copy');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-bibtex');
            const code = BIBTEX_DATABASE[key] || `@misc{habib2026, author={Habib, Jakaria}, title={Scholarly Publication}, year={2026}}`;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> BibTeX Copied!';
                btn.style.borderColor = 'var(--univ-gold)';
                btn.style.color = 'var(--univ-gold)';
                
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2200);
            }).catch(err => {
                console.error('Failed to copy BibTeX to clipboard:', err);
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Research Filter Tabs (Menubar Style)
   -------------------------------------------------------------------------- */
function initResearchFilters() {
    const filterTabs = document.querySelectorAll('.pub-menu-tab, .pub-filter-btn');
    const pubRows = document.querySelectorAll('.pub-row');

    if (!filterTabs.length || !pubRows.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            pubRows.forEach(row => {
                const category = row.getAttribute('data-category');
                const status = row.getAttribute('data-status'); // 'published' or 'under-review'
                const venueType = row.getAttribute('data-venue-type'); // 'journal' or 'conference'

                let matches = false;
                if (filterValue === 'all') {
                    matches = true;
                } else if (filterValue === 'published' && status === 'published') {
                    matches = true;
                } else if (filterValue === 'under-review' && status === 'under-review') {
                    matches = true;
                } else if (filterValue === 'journal' && (category === 'journal' || venueType === 'journal')) {
                    matches = true;
                } else if (filterValue === 'conference' && (venueType === 'conference' || category === 'ieee' || category === 'iclr' || category === 'workshop')) {
                    matches = true;
                } else if (category === filterValue) {
                    matches = true;
                }

                if (matches) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. Certificate Lightbox Modal
   -------------------------------------------------------------------------- */
function initCertificateLightbox() {
    const certCards = document.querySelectorAll('.cert-card[data-cert-img]');
    const lightboxModal = document.getElementById('lightbox-modal');
    if (!lightboxModal) return;

    const lightboxImg = lightboxModal.querySelector('#lightbox-img');
    const lightboxTitle = lightboxModal.querySelector('#lightbox-title');
    const lightboxDesc = lightboxModal.querySelector('#lightbox-desc');
    const closeBtn = lightboxModal.querySelector('#lightbox-close');

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-cert-img');
            const title = card.getAttribute('data-cert-title') || '';
            const desc = card.getAttribute('data-cert-desc') || '';

            if (lightboxImg) lightboxImg.src = imgSrc;
            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxDesc) lightboxDesc.textContent = desc;

            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------------------------------------
   7. Netlify & Static Hosting (GitHub Pages) Contact Form Dispatch Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
    const banner = document.getElementById('submission-success-banner');
    const form = document.getElementById('contactForm');

    // Check if redirected with ?submitted=true
    if (window.location.search.includes('submitted=true')) {
        if (banner) {
            banner.style.display = 'block';
            banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
        const isNetlify = window.location.hostname.includes('netlify.app');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        if (isNetlify) {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
            }

            const formData = new FormData(form);
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                if (banner) {
                    banner.style.display = 'block';
                    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                }
            })
            .catch((error) => {
                console.warn('Netlify AJAX dispatch error, falling back to standard submit:', error);
                form.submit();
            });
        } else {
            // Running on GitHub Pages or local static server
            // Prevents 405 error on static hosting, displays success feedback, and provides direct mailto fallback
            e.preventDefault();
            const nameInput = form.querySelector('[name="name"]');
            const emailInput = form.querySelector('[name="email"]');
            const subjectInput = form.querySelector('[name="subject"]');
            const messageInput = form.querySelector('[name="message"]');

            const name = nameInput ? nameInput.value : 'Visitor';
            const email = emailInput ? emailInput.value : '';
            const subject = subjectInput ? subjectInput.value : 'Academic Portfolio Inquiry';
            const message = messageInput ? messageInput.value : '';

            if (banner) {
                banner.style.display = 'block';
                banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Mail Client...';
            }

            const mailtoUri = `mailto:jakariahabibjim2@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;
            
            setTimeout(() => {
                window.location.href = mailtoUri;
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }, 800);
        }
    });
}

/* --------------------------------------------------------------------------
   8. Full-Screen Interactive CV Viewer Modal (Online CV Viewing)
   -------------------------------------------------------------------------- */
function initCvModal() {
    const modalOverlay = document.getElementById('cv-modal-overlay');
    const openBtns = document.querySelectorAll('.btn-open-cv-modal');
    const closeBtn = document.getElementById('cv-modal-close-btn');

    if (!modalOverlay) return;

    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Ensure iframe src is actively refreshed
        const iframe = modalOverlay.querySelector('iframe');
        if (iframe) {
            const currentSrc = iframe.getAttribute('src');
            if (!currentSrc || currentSrc === '') {
                iframe.setAttribute('src', 'CV_Jakaria_Habib.pdf#toolbar=1');
            }
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

/* --------------------------------------------------------------------------
   9. Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.pillar-card, .pub-row, .cert-card, .project-card, .section-header-row');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   10. Interactive 3D Subtle Tilt on Focus Cards
   -------------------------------------------------------------------------- */
function init3DTilt() {
    const cards = document.querySelectorAll('.hero-portrait-card, .cert-card, .pillar-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -(y / rect.height) * 6;
            const rotateY = (x / rect.width) * 6;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* --------------------------------------------------------------------------
   11. Number Counters
   -------------------------------------------------------------------------- */
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter-box, .tab-count');
    counters.forEach(counter => {
        const val = parseInt(counter.textContent.replace(/\D/g, ''), 10);
        if (isNaN(val) || val <= 0) return;
        counter.setAttribute('aria-label', String(val));
    });
}

/* --------------------------------------------------------------------------
   12. Live Data Sync (Syncs browser-cached CMS edits if available)
   -------------------------------------------------------------------------- */
function initLiveSync() {
    try {
        const cachedRaw = localStorage.getItem('PORTFOLIO_LIVE_DATA');
        const data = cachedRaw ? JSON.parse(cachedRaw) : (window.PORTFOLIO_DATA || null);
        if (!data) return;

        // Sync name if updated
        if (data.profile && data.profile.fullName) {
            document.querySelectorAll('.hero-name-highlight, .univ-brand-text h1').forEach(el => {
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.textContent = data.profile.fullName;
                }
            });
        }

        // Sync profile image if updated or removed
        if (data.profile && typeof data.profile.profileImage !== 'undefined') {
            const portraitImg = document.querySelector('.hero-portrait-img');
            if (portraitImg) {
                if (data.profile.profileImage) {
                    portraitImg.src = data.profile.profileImage;
                    portraitImg.style.display = 'block';
                } else {
                    portraitImg.style.display = 'none';
                }
            }
        }

        // Sync Home News & Highlights
        const newsList = document.getElementById('home-news-list');
        if (newsList && Array.isArray(data.news) && data.news.length > 0) {
            newsList.innerHTML = data.news.map(n => {
                const badgeHtml = n.badgeText ? `<span style="font-weight: 700; color: #ffffff; background: var(--univ-navy); padding: 0.15rem 0.55rem; border-radius: var(--radius-sm); font-size: 0.82rem; white-space: nowrap;">${n.badgeText}</span>` : '';
                return `<li style="display: flex; align-items: flex-start; gap: 1rem; font-size: 0.95rem; line-height: 1.55;">
                    ${badgeHtml}
                    <div><strong>${n.title || ''}:</strong> ${n.text || ''}</div>
                </li>`;
            }).join('');
        }
    } catch (e) {
        // Silently skip if parse error
    }
}


