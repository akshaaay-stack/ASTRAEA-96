/**
 * ASTRAEA Campus Intelligence Module
 * Campus Memory, Pulse Live Feed, Time Machine, Exam Rescue & Career Orbit
 */

class AstraeaCampus {
  constructor() {
    this.memoryList = [...ASTRAEA_DATA.campusMemory];
    this.pulseList = [...ASTRAEA_DATA.campusPulse];
    this.selectedTimeYear = '2026';
    this.pulseFilter = 'all';
  }

  init() {
    this.renderMemory();
    this.renderPulse();
    this.renderTimeMachine();
    this.renderExamRescue();
    this.renderCareerOrbit();
    this.bindEvents();
  }

  bindEvents() {
    // Pulse filter buttons
    document.querySelectorAll('.pulse-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.pulseFilter = filter;
        document.querySelectorAll('.pulse-filter-btn').forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white');
          b.classList.add('bg-white/5', 'text-slate-400');
        });
        e.target.classList.add('bg-indigo-600', 'text-white');
        e.target.classList.remove('bg-white/5', 'text-slate-400');
        this.renderPulse();
      });
    });

    // Time machine buttons
    document.querySelectorAll('.time-year-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const year = e.target.dataset.year;
        this.setTimeYear(year);
      });
    });
  }

  /* =========================================================================
   * CAMPUS MEMORY
   * ========================================================================= */

  renderMemory() {
    const container = document.getElementById('campus-memory-container');
    if (!container) return;

    container.innerHTML = this.memoryList.map(mem => `
      <div class="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <div>
              <span class="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">${mem.subject}</span>
              <h3 class="font-display text-base font-bold text-white mt-0.5">${mem.professor}</h3>
            </div>

            <div class="text-right">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full border ${mem.statusColor}">
                ✦ ${mem.status}
              </span>
              <div class="text-[9px] text-slate-400 mt-1">${mem.lastUpdated}</div>
            </div>
          </div>

          <!-- Difficulty & Confidence Indicators -->
          <div class="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 mb-3 text-xs">
            <div>
              <div class="text-[10px] text-slate-400">Exam Rigor / Difficulty</div>
              <div class="font-bold text-rose-400 font-mono text-sm">${mem.difficulty} <span class="text-[10px] text-slate-500">/ 10</span></div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400">Intelligence Confidence</div>
              <div class="font-bold text-emerald-400 font-mono text-sm">${mem.confidence}% <span class="text-[10px] text-slate-500">(${mem.ratingsCount} reports)</span></div>
            </div>
          </div>

          <p class="text-xs text-slate-300 mb-3 leading-relaxed">
            <span class="text-indigo-400 font-semibold">Campus Intel:</span> ${mem.insightText}
          </p>

          <div class="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200 mb-3">
            <span class="font-bold">Survival Strategy:</span> ${mem.keyAdvice}
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-white/5 text-[11px]">
          <button class="text-slate-400 hover:text-white transition-colors" onclick="window.campus.upvoteMemory('${mem.id}')">
            ▲ Helpful Intel (${mem.ratingsCount})
          </button>
          <span class="text-[10px] text-emerald-400 font-mono">Verified by Faculty Council</span>
        </div>
      </div>
    `).join('');
  }

  upvoteMemory(memId) {
    const item = this.memoryList.find(m => m.id === memId);
    if (item) {
      item.ratingsCount++;
      this.renderMemory();
      if (window.cosmicAudio) window.cosmicAudio.playClick();
      if (window.app) window.app.showToast('✦ Thank you for corroborating campus memory.', 'info');
    }
  }

  openContributeMemoryModal() {
    const modal = document.getElementById('contribute-memory-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  closeContributeMemoryModal() {
    const modal = document.getElementById('contribute-memory-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  submitContributedMemory(formData) {
    const newEntry = {
      id: `mem-${Date.now()}`,
      subject: formData.subject || 'Specialisation Subject',
      professor: formData.professor || 'Course Instructor',
      difficulty: parseFloat(formData.difficulty) || 7.5,
      ratingsCount: 1,
      confidence: 70,
      status: "Developing",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      lastUpdated: "Just now",
      insightText: formData.insight || "Student report submitted.",
      keyAdvice: formData.advice || "Focus on practical lab assignments.",
      verifiedByFaculty: false
    };

    this.memoryList.unshift(newEntry);
    this.renderMemory();
    this.closeContributeMemoryModal();

    if (window.cosmicAudio) window.cosmicAudio.playChime('success');
    if (window.app) window.app.showToast('✦ Experience submitted to Campus Memory queue for faculty corroboration.', 'success');
  }

  /* =========================================================================
   * CAMPUS PULSE
   * ========================================================================= */

  renderPulse() {
    const container = document.getElementById('campus-pulse-feed');
    if (!container) return;

    const filtered = this.pulseFilter === 'all' 
      ? this.pulseList 
      : this.pulseList.filter(p => p.type === this.pulseFilter);

    container.innerHTML = filtered.map(item => `
      <div class="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-400/30 transition-all flex items-start gap-3.5">
        <div class="w-2.5 h-2.5 rounded-full mt-1.5 bg-indigo-400 animate-ping"></div>
        <div class="flex-1">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-[10px] px-2 py-0.5 rounded-full border ${item.color} font-semibold font-mono">
              ${item.badge}
            </span>
            <span class="text-[10px] text-slate-400">${item.time}</span>
          </div>
          <h4 class="text-xs font-semibold text-white">${item.title}</h4>
          <p class="text-[11px] text-slate-400 mt-0.5">${item.meta}</p>
        </div>
      </div>
    `).join('');
  }

  /* =========================================================================
   * CAMPUS TIME MACHINE
   * ========================================================================= */

  setTimeYear(year) {
    this.selectedTimeYear = year;
    document.querySelectorAll('.time-year-btn').forEach(btn => {
      if (btn.dataset.year === year) {
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
        btn.classList.remove('bg-white/5', 'text-slate-400');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/30');
        btn.classList.add('bg-white/5', 'text-slate-400');
      }
    });

    this.renderTimeMachine();
  }

  renderTimeMachine() {
    const data = ASTRAEA_DATA.timeMachine[this.selectedTimeYear];
    const container = document.getElementById('time-machine-content');
    if (!data || !container) return;

    container.innerHTML = `
      <div class="glass-panel p-6 rounded-2xl border-2 border-indigo-500/30 relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <span class="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Epoch ${data.year}</span>
            <h3 class="font-display text-xl font-bold text-white mt-0.5">${data.theme}</h3>
            <p class="text-xs text-slate-300 mt-1">${data.headline}</p>
          </div>

          <div class="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 text-center">
            <div>
              <div class="font-mono text-base font-bold text-indigo-300">${data.stats.studentsEnrolled}</div>
              <div class="text-[9px] text-slate-400">Students</div>
            </div>
            <div class="border-l border-white/10 pl-4">
              <div class="font-mono text-base font-bold text-amber-300">${data.stats.hackathonsWon}</div>
              <div class="text-[9px] text-slate-400">Victories</div>
            </div>
            <div class="border-l border-white/10 pl-4">
              <div class="font-mono text-base font-bold text-emerald-300">${data.stats.industryPartners}</div>
              <div class="text-[9px] text-slate-400">Industry Hubs</div>
            </div>
          </div>
        </div>

        <div class="space-y-2 mt-4 pt-4 border-t border-white/5">
          <div class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Ecosystem Evolutionary Landmarks:</div>
          ${data.keyHighlights.map(h => `
            <div class="flex items-start gap-2 text-xs text-slate-300">
              <span class="text-indigo-400 mt-0.5">✦</span>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* =========================================================================
   * EXAM RESCUE MODE
   * ========================================================================= */

  renderExamRescue() {
    const container = document.getElementById('exam-rescue-container');
    if (!container) return;

    container.innerHTML = `
      <div class="glass-panel p-6 rounded-2xl border-2 border-rose-500/40 relative overflow-hidden bg-gradient-to-br from-rose-950/20 via-transparent to-transparent">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl animate-pulse">🚨</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  EXAM RESCUE ACTIVATED
                </span>
                <span class="text-xs font-mono text-slate-300">Countdown: 3 Days Remaining</span>
              </div>
              <h3 class="font-display text-lg font-bold text-white mt-1">Mathematical Reasoning & Statistics / Context Engineering</h3>
            </div>
          </div>

          <button class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all" onclick="window.app.showToast('Rescue cheat sheet downloaded to offline storage.', 'success')">
            ✦ Launch 7-Concept Rescue Path
          </button>
        </div>

        <p class="text-xs text-slate-300 mb-4">
          ASTRAEA has synthesized your previous quiz errors and professor trends. Don't try to study 400 pages of textbook. <strong>Master these 7 high-yield concepts first:</strong>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${[
            "1. Bayes' Theorem conditional probability calculation step-by-step",
            "2. Scaled Dot-Product Attention: Q, K, V matrix dimension equations",
            "3. Vector retrieval cosine distance formula & token budget trade-offs",
            "4. Normal distribution Z-Score threshold interpretation",
            "5. Pipelining hazard resolution (Forwarding vs Branch Prediction)",
            "6. Asyncio task gather vs wait timeout mechanisms",
            "7. System Prompt jailbreak mitigation & JSON schema enforcement"
          ].map(c => `
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 flex items-center justify-between">
              <span>${c}</span>
              <span class="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10">High Yield</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* =========================================================================
   * CAREER ORBIT
   * ========================================================================= */

  renderCareerOrbit() {
    const container = document.getElementById('career-orbit-container');
    if (!container) return;

    container.innerHTML = ASTRAEA_DATA.careerOrbits.map(career => `
      <div class="glass-panel p-5 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 class="font-display font-bold text-white text-base">${career.title}</h4>
              <p class="text-[11px] text-slate-400">Demand: <span class="text-emerald-300 font-semibold">${career.demand}</span></p>
            </div>
            <div class="text-right">
              <span class="text-sm font-bold font-mono" style="color: ${career.color}">${career.match}% Fit</span>
              <div class="text-[10px] text-slate-400">${career.avgPackage}</div>
            </div>
          </div>

          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
            <div class="h-full rounded-full" style="width: ${career.match}%; background: ${career.color}"></div>
          </div>

          <div class="space-y-2 text-xs mb-3">
            <div>
              <div class="text-[10px] text-slate-400 uppercase font-mono">Matched Core Competencies:</div>
              <div class="flex flex-wrap gap-1 mt-1">
                ${career.requirements.map(r => `
                  <span class="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">✓ ${r}</span>
                `).join('')}
              </div>
            </div>

            <div>
              <div class="text-[10px] text-amber-300 uppercase font-mono">Next Orbit Step To Close Gap:</div>
              <ul class="mt-1 space-y-1">
                ${career.gapToClose.map(g => `
                  <li class="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span class="text-indigo-400">➔</span>
                    <span>${g}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>

        <button class="w-full py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all" onclick="window.app.showToast('Trajectory roadmap synced with Next Move engine.', 'info')">
          Target This Career Orbit ✦
        </button>
      </div>
    `).join('');
  }
}

window.campus = new AstraeaCampus();
