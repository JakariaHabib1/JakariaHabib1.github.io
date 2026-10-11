# Jakaria Habib — Academic & Research Portfolio Website

A distinguished, multi-page academic portfolio website engineered specifically for prospective graduate research committees (**Ph.D. / M.S.** in CS, Machine Learning & Robotics), international scholarship review boards (**China CSC**, **European Erasmus Mundus / DAAD**, and **Malaysian University GRAs**), and prospective collaborators.

Modeled on prominent European and US university faculty and PhD scholar portfolios ([Gavick University](https://university.demo.gavick.com/) & [Acadpro](https://acadpro.netlify.app/)).

---

## 🏛️ Academic Profile & Credentials
- **Name:** Jakaria Habib
- **Affiliation:** Department of Information and Communication Engineering (ICE), Pabna University of Science and Technology (PUST), Bangladesh
- **Degree:** Bachelor of Science (Engineering) in Information and Communication Engineering (2022 – 2026)
- **Academic Standing:** CGPA: **3.08 / 4.00**
- **Undergraduate Thesis:** *“Physics-Based Inverse Modeling for Sub-Millisecond Neural Delay Estimation in Human Locomotion”* (Advisor: Md. Imran Hossain, PUST)
- **Primary Research Focus:**
  - Physics-Informed AI & Medical Perception
  - Foundation Models & Learning Dynamics
  - Embodied AI & Robotics
- **Scholarly Credentials:** First-Author Springer Nature SCI/Scopus Q1 (*Earth Science Informatics*, IF: 4.2), NeurIPS 2026 accepted proceedings (NeurReps Workshop, PMLR), NeurIPS 2026 Robotics World Modeling Workshop (RWM), ICLR 2027 submissions under review, American Physical Society Active Member (APS #62251156).

---

## 📑 Multi-Page Structure
1. **`index.html` — Academic Overview & Introduction:** Scholarly biography, research gateways, portrait, institutional contact info, and fast links.
2. **`research.html` — Scholarly Publications:** Complete 10 publications organized with interactive filter tabs (All, Published & Accepted, Under Review, Journals, Conferences & Workshops), BibTeX clipboard copy, and expandable abstract drawers.
3. **`projects.html` — Experimental Systems & Robotics:** Hardware builds (Vision-Guided Inspection Robot with Ackermann steering), Stanford OpenSim biomechanical simulation engine (45,445 trials), and GeoMind multi-agent spatial reasoning system.
4. **`education.html` — Academic Curriculum & Coursework:** Official 8-semester 165-credit course distribution matrix extracted directly from PUST syllabus with official downloadable syllabus PDF.
5. **`certificates.html` — Verified Credentials Gallery:** Interactive lightbox modal showcasing certificates from Nature Masterclasses, Columbia University (98.8%), HarvardX CS109x, APS membership, and IEEE presentations.
6. **`cv.html` — Curriculum Vitae:** Dual presentation featuring an interactive fullscreen online PDF viewer (`CV_Jakaria_Habib.pdf`) alongside a complete academic CV transcript and instant download action.
7. **`contact.html` — Contact & Correspondence:** Direct institutional/research email access, profile links, and contact form with both Netlify and static hosting (GitHub Pages) dispatch fallbacks.

---

## 🚀 How to Deploy to GitHub & GitHub Pages

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account at [github.com](https://github.com/).
2. Click **New Repository** (`+` in top right).
3. Name it either:
   - `<your-username>.github.io` (to host at `https://<your-username>.github.io`)
   - OR `portfolio` (to host at `https://<your-username>.github.io/portfolio`)
4. Choose **Public** and **do NOT initialize with a README** (since you already have this project folder).
5. Click **Create repository**.

### Step 2: Push Your Local Code to GitHub
Open PowerShell or Terminal in this folder (`jakaria_habib_portfolio_netlify`) and run:
```bash
git add .
git commit -m "Academic portfolio update: revised CV, 10 publications, CGPA 3.08, and interactive viewer fixes"
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your GitHub repository, navigate to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
2. Under **Build and deployment**:
   - **Source:** Choose **GitHub Actions** (recommended — the repository includes `.github/workflows/deploy.yml` which deploys automatically on every push!)
   - *OR* Choose **Deploy from a branch** $\rightarrow$ Select `main` branch $\rightarrow$ folder `/ (root)` $\rightarrow$ click **Save**.
3. Within 1-2 minutes, your website will be live at:
   - `https://<your-username>.github.io` (or `https://<your-username>.github.io/<repo-name>`)

---

## 🌐 Alternative: Deploy to Netlify (Drag & Drop)
1. Open **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Drag and drop this folder directly into Netlify.
3. Your site deploys in ~15 seconds with automatic SSL and CDN distribution.
