/**
 * ASTRAEA Next Move Engine & Task Shrink
 * Transforms intimidating study syllabi into bite-sized micro-missions
 */

class AstraeaNextMove {
  constructor() {
    this.selectedDuration = 35; // default 35 minutes
    this.missions = [];
    this.completedCount = 0;
  }

  init() {
    this.bindEvents();
    this.generateMissions(this.selectedDuration);
  }

  bindEvents() {
    const slider = document.getElementById('time-budget-slider');
    const timeDisplay = document.getElementById('time-budget-display');

    if (slider && timeDisplay) {
      slider.addEventListener('input', (e) => {
        this.selectedDuration = parseInt(e.target.value, 10);
        timeDisplay.textContent = `${this.selectedDuration} minutes`;
        this.generateMissions(this.selectedDuration);
      });
    }

    // Quick time chips
    document.querySelectorAll('.time-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const time = parseInt(e.target.dataset.time, 10);
        if (slider) slider.value = time;
        if (timeDisplay) timeDisplay.textContent = `${time} minutes`;
        this.selectedDuration = time;
        this.generateMissions(time);
      });
    });
  }

  generateMissions(minutes) {
    const student = window.astraeaAuth?.currentUser || { specialisation: 'aether' };
    const specName = student.specialisation === 'nova' ? 'Full Stack AI' :
                     student.specialisation === 'quanta' ? 'Data Analytics' :
                     student.specialisation === 'lumina' ? 'Design Tech' : 'Generative AI';

    if (minutes <= 15) {
      this.missions = [
        { id: 'm-1', title: 'Mission 01 — 5 min', task: `Quick Concept Review: ${specName} foundational laws`, sub: 'Review 3 cheat-sheet bullet points in Exam Rescue', done: false, xp: 25 },
        { id: 'm-2', title: 'Mission 02 — 10 min', task: 'Solve 2 Flash Coding/Logic Problems', sub: 'Interactive prompt verification in ASTRAEA AI', done: false, xp: 45 }
      ];
    } else if (minutes <= 35) {
      this.missions = [
        { id: 'm-1', title: 'Mission 01 — 8 min', task: 'Understand Functions & Context Window mechanics', sub: 'Read semantic memory lifecycle diagram', done: false, xp: 35 },
        { id: 'm-2', title: 'Mission 02 — 7 min', task: 'Write 3 practical code examples', sub: 'FastAPI async route handler with Pydantic validation', done: false, xp: 40 },
        { id: 'm-3', title: 'Mission 03 — 10 min', task: 'Solve 5 edge-case problems', sub: 'Diagnose token overrun & cosine distance drift', done: false, xp: 60 }
      ];
    } else if (minutes <= 60) {
      this.missions = [
        { id: 'm-1', title: 'Mission 01 — 12 min', task: 'Deep Theory: Scaled Dot-Product Attention & Math', sub: 'Step-by-step matrix multiplication verification', done: false, xp: 50 },
        { id: 'm-2', title: 'Mission 02 — 18 min', task: 'Build Minimal Working Vector Store Retriever', sub: 'Implement Chroma/Qdrant vector similarity search', done: false, xp: 75 },
        { id: 'm-3', title: 'Mission 03 — 15 min', task: 'Test Edge Cases & Exception Handling', sub: 'Add custom retry decorators for LLM rate limits', done: false, xp: 65 },
        { id: 'm-4', title: 'Mission 04 — 10 min', task: 'Synthesis Flashcard Quiz', sub: 'Answer 5 high-yield exam questions in Exam Rescue', done: false, xp: 45 }
      ];
    } else {
      this.missions = [
        { id: 'm-1', title: 'Mission 01 — 25 min', task: 'Architect End-to-End Multi-Agent Workflow', sub: 'Design LangGraph / CrewAI state orchestration schema', done: false, xp: 110 },
        { id: 'm-2', title: 'Mission 02 — 35 min', task: 'Full Stack Dockerized Pipeline Assembly', sub: 'Write multi-stage Dockerfile and test FastAPI backend', done: false, xp: 140 },
        { id: 'm-3', title: 'Mission 03 — 25 min', task: 'Evaluation Benchmark on Test Dataset', sub: 'Calculate precision, recall, and token cost metrics', done: false, xp: 100 },
        { id: 'm-4', title: 'Mission 04 — 20 min', task: 'Documentation & Constellation Portfolio Sync', sub: 'Update Student DNA proof logs and publish to Project Lab', done: false, xp: 80 }
      ];
    }

    this.completedCount = 0;
    this.render();
  }

  toggleMission(missionId) {
    const m = this.missions.find(x => x.id === missionId);
    if (!m) return;

    m.done = !m.done;
    this.completedCount = this.missions.filter(x => x.done).length;

    if (m.done) {
      if (window.cosmicAudio) {
        window.cosmicAudio.playStarSpawn();
      }
      if (window.app) {
        window.app.showToast(`✦ Mission Complete! +${m.xp} XP & New Constellation Star born!`, 'success');
        window.app.addConstellationStar();
      }
    }

    this.render();
  }

  render() {
    const container = document.getElementById('next-move-missions-container');
    const progressText = document.getElementById('next-move-progress-text');
    const progressBar = document.getElementById('next-move-progress-bar');
    if (!container) return;

    const total = this.missions.length;
    const pct = total > 0 ? Math.round((this.completedCount / total) * 100) : 0;

    if (progressText) progressText.textContent = `${this.completedCount} of ${total} missions completed (${pct}%)`;
    if (progressBar) progressBar.style.width = `${pct}%`;

    container.innerHTML = this.missions.map(m => `
      <div class="p-4 rounded-2xl border transition-all duration-200 ${
        m.done 
          ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90' 
          : 'glass-panel border-white/10 hover:border-indigo-400/40'
      } flex items-start gap-3.5 group cursor-pointer" onclick="window.nextMove.toggleMission('${m.id}')">
        <div class="mt-0.5">
          <div class="w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
            m.done 
              ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/30' 
              : 'border-white/20 group-hover:border-indigo-400 text-transparent'
          }">
            ✓
          </div>
        </div>

        <div class="flex-1">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-wider font-semibold ${m.done ? 'text-emerald-400' : 'text-indigo-400'}">
              ${m.title}
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-amber-300 font-bold border border-white/5">
              +${m.xp} XP ⭐
            </span>
          </div>

          <h4 class="font-display text-sm font-semibold text-white mt-1 ${m.done ? 'line-through text-slate-400' : ''}">
            ${m.task}
          </h4>

          <p class="text-xs text-slate-400 mt-0.5">${m.sub}</p>
        </div>
      </div>
    `).join('');
  }
}

window.nextMove = new AstraeaNextMove();
