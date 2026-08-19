/**
 * ASTRAEA Faculty / Teacher Command Deck
 * Admin operations, student roster management, curriculum adjustments & campus memory moderation
 */

class AstraeaAdmin {
  constructor() {
    this.roster = [...ASTRAEA_DATA.teacherRoster];
    this.activeTab = 'roster'; // 'roster' | 'curriculum' | 'moderation' | 'broadcast'
    this.filterSpec = 'all';
  }

  init() {
    this.bindEvents();
    this.renderRoster();
    this.renderModerationQueue();
  }

  bindEvents() {
    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Roster filter dropdown
    const rosterFilter = document.getElementById('admin-roster-filter');
    if (rosterFilter) {
      rosterFilter.addEventListener('change', (e) => {
        this.filterSpec = e.target.value;
        this.renderRoster();
      });
    }

    // Broadcast announcement form
    const broadcastForm = document.getElementById('admin-broadcast-form');
    if (broadcastForm) {
      broadcastForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBroadcastSubmit(new FormData(broadcastForm));
      });
    }
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.remove('text-slate-400', 'hover:bg-white/5');
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.add('text-slate-400', 'hover:bg-white/5');
      }
    });

    document.querySelectorAll('.admin-tab-content').forEach(content => {
      if (content.id === `admin-tab-${tabName}`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });

    if (window.cosmicAudio) window.cosmicAudio.playClick();
  }

  /* =========================================================================
   * STUDENT ROSTER
   * ========================================================================= */

  renderRoster() {
    const tbody = document.getElementById('admin-roster-tbody');
    const countEl = document.getElementById('admin-student-count');
    if (!tbody) return;

    const filtered = this.filterSpec === 'all' 
      ? this.roster 
      : this.roster.filter(s => s.spec === this.filterSpec);

    if (countEl) countEl.textContent = `${filtered.length} Students Active`;

    tbody.innerHTML = filtered.map(student => {
      const spec = ASTRAEA_DATA.specialisations[student.spec] || { name: student.spec, color: '#818cf8', planetEmoji: '🪐' };
      return `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors text-xs">
          <td class="py-3.5 px-4 font-mono text-slate-300">${student.id}</td>
          <td class="py-3.5 px-4 font-semibold text-white">${student.name}</td>
          <td class="py-3.5 px-4 text-slate-400 font-mono">${student.email}</td>
          <td class="py-3.5 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${spec.badge}">
              <span>${spec.planetEmoji}</span>
              <span>${spec.name}</span>
            </span>
          </td>
          <td class="py-3.5 px-4 text-center font-mono">Sem ${student.sem}</td>
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-2">
              <div class="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400" style="width: ${student.masteryAvg}%"></div>
              </div>
              <span class="font-bold text-slate-200 font-mono text-[11px]">${student.masteryAvg}%</span>
            </div>
          </td>
          <td class="py-3.5 px-4 text-amber-300 font-bold font-mono">⭐ ${student.stars}</td>
          <td class="py-3.5 px-4 text-right">
            <button class="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 text-[11px] font-medium transition-colors" onclick="window.admin.viewStudentDNA('${student.id}')">
              Inspect DNA
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  viewStudentDNA(studentId) {
    const student = this.roster.find(s => s.id === studentId);
    if (!student) return;

    if (window.app) {
      window.app.showToast(`✦ Accessing living DNA telemetry for ${student.name} (${student.id})...`, 'info');
    }
  }

  /* =========================================================================
   * CAMPUS MEMORY MODERATION
   * ========================================================================= */

  renderModerationQueue() {
    const container = document.getElementById('admin-moderation-queue');
    if (!container) return;

    container.innerHTML = ASTRAEA_DATA.campusMemory.map(mem => `
      <div class="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-white">${mem.professor} — ${mem.subject}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full border ${mem.statusColor}">
              ${mem.status}
            </span>
          </div>
          <p class="text-xs text-slate-300 mt-1">"${mem.insightText}"</p>
          <div class="text-[10px] text-slate-400 mt-1 font-mono">Difficulty: ${mem.difficulty}/10 | Confidence: ${mem.confidence}% (${mem.ratingsCount} reports)</div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button class="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold" onclick="window.admin.verifyMemoryItem('${mem.id}')">
            ✓ Corroborate & Verify
          </button>
          <button class="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-xs" onclick="window.admin.flagMemoryItem('${mem.id}')">
            Flag Outdated
          </button>
        </div>
      </div>
    `).join('');
  }

  verifyMemoryItem(memId) {
    const item = ASTRAEA_DATA.campusMemory.find(m => m.id === memId);
    if (item) {
      item.status = "Verified";
      item.statusColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      item.confidence = Math.min(99, item.confidence + 5);
      this.renderModerationQueue();
      if (window.campus) window.campus.renderMemory();
      if (window.cosmicAudio) window.cosmicAudio.playChime('success');
      if (window.app) window.app.showToast(`✦ Faculty certification applied to ${item.subject}.`, 'success');
    }
  }

  flagMemoryItem(memId) {
    const item = ASTRAEA_DATA.campusMemory.find(m => m.id === memId);
    if (item) {
      item.status = "Outdated";
      item.statusColor = "text-rose-400 bg-rose-500/10 border-rose-500/30";
      this.renderModerationQueue();
      if (window.campus) window.campus.renderMemory();
      if (window.app) window.app.showToast(`✦ Intel marked as outdated for re-evaluation.`, 'info');
    }
  }

  /* =========================================================================
   * CAMPUS BROADCAST DISPATCHER
   * ========================================================================= */

  handleBroadcastSubmit(formData) {
    const title = formData.get('title');
    const category = formData.get('category');
    const target = formData.get('target');
    const details = formData.get('details');

    if (!title || !details) {
      if (window.app) window.app.showToast('Please fill out all announcement fields.', 'error');
      return;
    }

    const newPulseItem = {
      id: `pulse-${Date.now()}`,
      type: category || 'announcement',
      badge: `Faculty Broadcast (${target.toUpperCase()})`,
      color: 'border-indigo-500/40 text-indigo-300',
      title: title,
      time: 'Just now',
      meta: details
    };

    ASTRAEA_DATA.campusPulse.unshift(newPulseItem);
    if (window.campus) {
      window.campus.pulseList.unshift(newPulseItem);
      window.campus.renderPulse();
    }

    if (window.cosmicAudio) window.cosmicAudio.playChime('success');
    if (window.app) {
      window.app.showToast(`✦ Broadcast transmitted to ${target.toUpperCase()} cohort!`, 'success');
      document.getElementById('admin-broadcast-form').reset();
    }
  }
}

window.admin = new AstraeaAdmin();
