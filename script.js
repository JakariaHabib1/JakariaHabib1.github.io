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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

        // Form fields
        const nameInput = form.querySelector('[name="name"]');
        const emailInput = form.querySelector('[name="email"]');
        const subjectInput = form.querySelector('[name="subject"]');
        const messageInput = form.querySelector('[name="message"]');

        const name = nameInput ? nameInput.value.trim() : 'Visitor';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : 'Academic Portfolio Inquiry';
        const message = messageInput ? messageInput.value.trim() : '';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
        }

        try {
            // Send via FormSubmit.co AJAX endpoint directly to Gmail
            const response = await fetch('https://formsubmit.co/ajax/jakariahabibjim2@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: `[Academic Inquiry] ${subject} - from ${name}`,
                    message: message,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            const data = await response.json();

            if (response.ok && (data.success === 'true' || data.success === true)) {
                if (banner) {
                    banner.style.display = 'block';
                    banner.innerHTML = `
                        <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
                            <i class="fa-solid fa-circle-check" style="color: #1b5e39; font-size: 1.3rem; margin-top: 2px;"></i>
                            <div>
                                <h3 style="font-size: 1.05rem; color: #1b5e39; margin-bottom: 0.25rem;">✔ Message Sent Successfully!</h3>
                                <p style="font-size: 0.92rem; color: #2c4234; line-height: 1.5; margin: 0;">
                                    Thank you, <strong>${name}</strong>! Your message has been sent directly to Jakaria's Gmail (<strong>jakariahabibjim2@gmail.com</strong>).
                                </p>
                            </div>
                        </div>
                    `;
                    banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnHtml;
                    }, 4000);
                }
            } else {
                throw new Error(data.message || 'Server returned error');
            }
        } catch (error) {
            console.warn('FormSubmit AJAX dispatch failed or waiting for activation:', error);
            // Fallback: regular submit via action URL
            if (banner) {
                banner.style.display = 'block';
                banner.innerHTML = `
                    <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
                        <i class="fa-solid fa-circle-check" style="color: #1b5e39; font-size: 1.3rem; margin-top: 2px;"></i>
                        <div>
                            <h3 style="font-size: 1.05rem; color: #1b5e39; margin-bottom: 0.25rem;">✔ Submitting to Jakaria's Inbox...</h3>
                            <p style="font-size: 0.92rem; color: #2c4234; line-height: 1.5; margin: 0;">
                                Submitting your message to <strong>jakariahabibjim2@gmail.com</strong>.
                            </p>
                        </div>
                    </div>
                `;
            }
            form.submit();
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
        let data = null;
        try {
            const cachedRaw = localStorage.getItem('PORTFOLIO_LIVE_DATA');
            if (cachedRaw) {
                data = JSON.parse(cachedRaw);
            }
        } catch (e) {}
        if (!data) {
            data = window.PORTFOLIO_DATA || null;
        }
        if (!data) return;

        // Ensure deleted thesis project is never re-injected by stale browser localStorage
        if (Array.isArray(data.projects)) {
            data.projects = data.projects.filter(p => !(p.id === 'proj-02' && p.title && p.title.includes('OpenSim')) && !(p.title && p.title.includes('Neuromech-Sim')));
        }

        // Sync name if updated
        if (data.profile && data.profile.fullName) {
            document.querySelectorAll('.hero-name-highlight, .univ-brand-text h1').forEach(el => {
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.textContent = data.profile.fullName;
                }
            });
        }

        // Sync Profile Bio & Callout on Homepage
        const bioContainer = document.getElementById('hero-bio-container');
        if (bioContainer && data.profile) {
            const bioParagraphs = Array.isArray(data.profile.bio) 
                ? data.profile.bio.map(p => `<p>${p}</p>`).join('')
                : (data.profile.bio ? `<p>${data.profile.bio}</p>` : '');
            
            const calloutHtml = data.profile.graduateCallout 
                ? `<p style="font-weight: 600; color: var(--univ-navy); margin-top: 1rem;">${data.profile.graduateCallout}</p>` 
                : '';
            
            if (bioParagraphs || calloutHtml) {
                bioContainer.innerHTML = bioParagraphs + calloutHtml;
            }
        }

        // Sync Research Pillars on Homepage
        const pillarsGrid = document.getElementById('home-pillars-grid');
        if (pillarsGrid && Array.isArray(data.pillars) && data.pillars.length > 0) {
            pillarsGrid.innerHTML = data.pillars.map(p => {
                const colorVar = p.accentColor ? `var(--${p.accentColor})` : 'var(--univ-navy)';
                return `
                    <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 1.5rem; border-top: 3px solid ${colorVar};">
                        <div style="font-size: 1.25rem; color: ${colorVar}; margin-bottom: 0.75rem;"><i class="fa-solid ${p.icon || 'fa-brain'}"></i></div>
                        <h3 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.5rem; font-family: var(--font-serif);">${p.title || ''}</h3>
                        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; margin: 0;">${p.desc || ''}</p>
                    </div>
                `;
            }).join('');
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

        // Sync Verified Credentials & Certifications
        const certGrid = document.getElementById('certificates-grid');
        if (certGrid && Array.isArray(data.certificates) && data.certificates.length > 0) {
            certGrid.innerHTML = data.certificates.map(c => `
                <div class="cert-card in-view"
                     data-cert-img="${c.image || 'assets/certificates_img_5.jpg'}"
                     data-cert-title="${c.title || ''}"
                     data-cert-desc="${c.desc || ''}">
                    <div class="cert-thumbnail-wrapper">
                        <img src="${c.image || 'assets/certificates_img_5.jpg'}" alt="${c.title || 'Certificate'}">
                        <div class="cert-overlay-inspect"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
                    </div>
                    <div class="cert-info">
                        <h3 class="cert-title">${c.title || ''}</h3>
                        <div class="cert-issuer">${c.issuer || ''}</div>
                        <div class="cert-meta">${c.signee ? `${c.signee} · ` : ''}${c.date || ''}</div>
                    </div>
                </div>
            `).join('');

            // Re-bind lightbox to newly rendered certificates
            if (typeof initCertificateLightbox === 'function') {
                initCertificateLightbox();
            }
        }

        // Sync Projects & Systems
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid && Array.isArray(data.projects) && data.projects.length > 0) {
            projectsGrid.innerHTML = data.projects.map(p => `
                <div class="project-card in-view">
                    <div class="project-image-box"${p.image && p.image.includes('img_research_13') ? ' style="background: #ffffff; padding: 1rem; position: relative;"' : ''}>
                        <img src="${p.image || 'assets/projects_img_2.jpg'}" alt="${p.title || 'Project'}"${p.image && p.image.includes('img_research_13') ? ' style="object-fit: contain;"' : ''}>
                        <span class="project-tag-overlay"${p.image && p.image.includes('img_research_13') ? ' style="background: rgba(19, 34, 56, 0.92); border-left: 3px solid var(--univ-gold);"' : ''}>
                            <i class="fa-solid ${p.tagIcon || 'fa-microchip'}"></i> ${p.categoryTag || p.category || 'Engineering Prototype'}
                        </span>
                    </div>
                    <div class="project-body">
                        <h2 class="project-title">${p.title || ''}</h2>
                        <p class="project-desc">${p.desc || ''}</p>
                        ${p.highlights && Array.isArray(p.highlights) ? `
                            <div style="margin: 0.85rem 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
                                <strong style="color: var(--text-main);">Key Highlights:</strong>
                                <ul style="margin: 0.35rem 0 0 1.2rem; padding: 0;">
                                    ${p.highlights.map(h => `<li>${h}</li>`).join('')}
                                </ul>
                            </div>
                        ` : (p.highlights ? `<div style="margin: 0.85rem 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">${p.highlights}</div>` : '')}
                        ${(p.techPills && p.techPills.length) ? `
                            <div class="project-tech-pills">
                                ${p.techPills.map(t => `<span class="project-pill">${t}</span>`).join('')}
                            </div>
                        ` : ((p.tags && p.tags.length) ? `
                            <div class="project-tech-pills">
                                ${p.tags.map(t => `<span class="project-pill">${t}</span>`).join('')}
                            </div>
                        ` : '')}
                        ${p.linkUrl ? `
                            <div style="margin-top: 1.15rem;">
                                <a href="${p.linkUrl}" target="_blank" rel="noopener" class="btn-primary-academic" style="padding: 0.48rem 0.95rem; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.45rem;">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i> ${p.linkText || 'Read Research Preprint ↗'}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }

        // Sync Education Thesis Block (if on education.html)
        if (data.education) {
            const thesisTitleEl = document.getElementById('edu-thesis-title');
            const thesisAdvisorEl = document.getElementById('edu-thesis-advisor');

            if (thesisTitleEl && data.education.thesisTitle) {
                thesisTitleEl.textContent = data.education.thesisTitle;
            }
            if (thesisAdvisorEl && data.education.thesisAdvisor) {
                thesisAdvisorEl.innerHTML = `<i class="fa-solid fa-user-tie" style="color: var(--univ-navy); margin-right: 0.35rem;"></i><strong>Advisor:</strong> ${data.education.thesisAdvisor}`;
            }
        }

    } catch (e) {
        // Silently skip if parse error
    }
}


