/**
 * ASTRAEA Universe & Academic Galaxy Module
 * 4-World Planetary Orbit, Semester Galaxy, Subject Star Systems & Knowledge Graphs
 */

class AstraeaUniverse {
  constructor() {
    this.selectedSpec = 'aether';
    this.selectedSemester = 1;
    this.currentSubjectModal = null;
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Semester selector pills
    document.querySelectorAll('.sem-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const sem = parseInt(e.target.dataset.sem, 10);
        this.setSemester(sem);
      });
    });
  }

  setSpecialisation(specId) {
    if (!ASTRAEA_DATA.specialisations[specId]) return;
    this.selectedSpec = specId;
    
    if (window.cosmicCanvas) {
      window.cosmicCanvas.setActiveSpecialisation(specId);
    }
    
    this.renderPlanetsOverview();
    this.renderAcademicGalaxy();
  }

  setSemester(semNumber) {
    this.selectedSemester = semNumber;
    document.querySelectorAll('.sem-pill').forEach(p => {
      if (parseInt(p.dataset.sem, 10) === semNumber) {
        p.classList.add('bg-indigo-600', 'text-white', 'border-indigo-400');
        p.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');
      } else {
        p.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-400');
        p.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
      }
    });

    this.renderAcademicGalaxy();
  }

  renderPlanetsOverview() {
    const container = document.getElementById('universe-planets-container');
    if (!container) return;

    const userSpec = window.astraeaAuth?.currentUser?.specialisation || this.selectedSpec;
    const specKeys = ['nova', 'aether', 'quanta', 'lumina'];

    container.innerHTML = specKeys.map(key => {
      const spec = ASTRAEA_DATA.specialisations[key];
      const isUserSpec = key === userSpec;
      const isSelected = key === this.selectedSpec;

      return `
        <div class="glass-panel glass-panel-interactive p-5 rounded-2xl relative overflow-hidden transition-all duration-300 ${
          isUserSpec ? 'border-2 border-indigo-400 shadow-lg shadow-indigo-500/20' : ''
        } ${isSelected ? 'ring-2 ring-purple-400' : ''}" onclick="window.universe.setSpecialisation('${key}')">
          ${isUserSpec ? '<span class="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">✦ Your World</span>' : ''}
          
          <div class="flex items-center gap-3 mb-3">
            <span class="text-3xl">${spec.planetEmoji}</span>
            <div>
              <h3 class="font-display font-bold text-lg text-white">${spec.name}</h3>
              <p class="text-xs text-slate-400">${spec.fullName}</p>
            </div>
          </div>

          <p class="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">${spec.tagline}</p>

          <div class="flex flex-wrap gap-1.5 mb-3">
            ${spec.coreSkills.slice(0, 3).map(skill => `
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">${skill}</span>
            `).join('')}
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-indigo-300 font-medium">
            <span>Explore Orbit →</span>
            <span class="text-[10px] text-slate-400">Semesters 1-6</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderAcademicGalaxy() {
    const container = document.getElementById('academic-subjects-container');
    const headerEl = document.getElementById('academic-galaxy-header');
    if (!container) return;

    const spec = ASTRAEA_DATA.specialisations[this.selectedSpec];
    const subjects = ASTRAEA_DATA.curriculum[this.selectedSpec]?.[this.selectedSemester] || [];

    if (headerEl) {
      headerEl.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-3xl">${spec.planetEmoji}</span>
          <div>
            <h2 class="font-display text-xl font-bold text-white flex items-center gap-2">
              ${spec.name} — Semester ${this.selectedSemester}
              <span class="text-xs px-2.5 py-0.5 rounded-full ${spec.badge}">${spec.fullName}</span>
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">Click any subject to open its Connected Knowledge Star System</p>
          </div>
        </div>
      `;
    }

    if (subjects.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 glass-panel rounded-2xl">
          <p class="text-slate-400 text-sm">Advanced curriculum node for Semester ${this.selectedSemester} is being synthesized in the Work-Integrated Lab.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = subjects.map((subj, index) => {
      const mastery = subj.mastery || 70;
      return `
        <div class="glass-panel glass-panel-interactive p-5 rounded-2xl relative overflow-hidden group" onclick="window.universe.openSubjectModal('${subj.id}')">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-sm">
                0${index + 1}
              </div>
              <div>
                <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">${subj.code || 'BCA-CORE'}</span>
                <h4 class="font-display font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">${subj.name}</h4>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-300">${mastery}%</span>
          </div>

          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
            <div class="bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 h-full rounded-full transition-all duration-700" style="width: ${mastery}%"></div>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2 mb-3">${subj.description || 'Core Work-Integrated specialization topic.'}</p>

          <div class="flex items-center justify-between text-xs pt-2 border-t border-white/5">
            <span class="text-slate-400 flex items-center gap-1">✦ ${subj.credits || 4} Credits</span>
            <span class="text-indigo-400 group-hover:translate-x-1 transition-transform">Star System ➔</span>
          </div>
        </div>
      `;
    }).join('');
  }

  findSubjectById(subjId) {
    for (let spec in ASTRAEA_DATA.curriculum) {
      for (let sem in ASTRAEA_DATA.curriculum[spec]) {
        const found = ASTRAEA_DATA.curriculum[spec][sem].find(s => s.id === subjId);
        if (found) return found;
      }
    }
    return null;
  }

  openSubjectModal(subjId) {
    const subj = this.findSubjectById(subjId);
    if (!subj) return;

    this.currentSubjectModal = subj;
    const modal = document.getElementById('subject-star-modal');
    if (!modal) return;

    if (window.cosmicAudio) {
      window.cosmicAudio.playClick();
    }

    document.getElementById('modal-subj-code').textContent = subj.code;
    document.getElementById('modal-subj-title').textContent = subj.name;
    document.getElementById('modal-subj-mastery').textContent = `${subj.mastery || 72}%`;
    document.getElementById('modal-subj-bar').style.width = `${subj.mastery || 72}%`;
    document.getElementById('modal-subj-desc').textContent = subj.description || '';

    // Render Knowledge Graph Flow
    const graphContainer = document.getElementById('modal-subj-knowledge-graph');
    if (graphContainer) {
      const nodes = subj.connectedKnowledge || [
        { name: subj.name, level: 1, type: "core" },
        { name: "Foundations", level: 2, type: "parent" },
        { name: "Industry Pipelines", level: 3, type: "application" },
        { name: "Autonomous Systems", level: 4, type: "outcome" }
      ];

      graphContainer.innerHTML = nodes.map((node, i) => `
        <div class="flex items-center">
          <div class="flex flex-col items-center">
            <div class="px-4 py-2 rounded-xl text-xs font-semibold ${
              i === 0 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-white/10 text-slate-200 border border-white/10 hover:border-indigo-400'
            } transition-all duration-200">
              ${node.name}
            </div>
            <span class="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">${node.type}</span>
          </div>
          ${i < nodes.length - 1 ? '<div class="w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-2 animate-pulse"></div>' : ''}
        </div>
      `).join('');
    }

    // High yield exam topics
    const examTopicsContainer = document.getElementById('modal-subj-exam-topics');
    if (examTopicsContainer) {
      const topics = subj.highYieldExamTopics || [
        "Core theoretical equations & algorithmic paradigms",
        "Scenario-based token and architectural trade-offs",
        "Implementation and unit testing requirements"
      ];
      examTopicsContainer.innerHTML = topics.map(t => `
        <li class="flex items-start gap-2 text-xs text-slate-300">
          <span class="text-indigo-400 mt-0.5">✦</span>
          <span>${t}</span>
        </li>
      `).join('');
    }

    // Syllabus Micro-Topics
    const topicsContainer = document.getElementById('modal-subj-topics-list');
    if (topicsContainer) {
      const topics = subj.topics || [
        { title: "Core Principles & Architecture", status: "Mastered", progress: 85 },
        { title: "Distributed Inference & Optimization", status: "In Progress", progress: 68 }
      ];
      topicsContainer.innerHTML = topics.map(top => `
        <div class="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
          <div>
            <div class="text-xs font-medium text-white">${top.title}</div>
            <div class="text-[10px] text-slate-400">Status: <span class="${top.status === 'Mastered' ? 'text-emerald-400' : 'text-amber-400'}">${top.status}</span></div>
          </div>
          <div class="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div class="bg-indigo-400 h-full rounded-full" style="width: ${top.progress}%"></div>
          </div>
        </div>
      `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeSubjectModal() {
    const modal = document.getElementById('subject-star-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
}

window.universe = new AstraeaUniverse();
