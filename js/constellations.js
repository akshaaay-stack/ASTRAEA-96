/**
 * ASTRAEA Constellations & Opportunity Radar
 * 4-World Cross-Specialisation Team Matchmaking & Project Lab
 */

class AstraeaConstellations {
  constructor() {
    this.opportunities = [...ASTRAEA_DATA.opportunities];
    this.peers = [...ASTRAEA_DATA.constellationPeers];
    this.activeTeam = {
      name: "Team ASTRAEA HyperNova",
      aether: "You (GenAI Core)",
      nova: null,
      quanta: null,
      lumina: null
    };
  }

  init() {
    this.renderOpportunities();
    this.renderPeers();
    this.renderTeamAssembler();
  }

  renderOpportunities() {
    const container = document.getElementById('opportunity-radar-container');
    if (!container) return;

    container.innerHTML = this.opportunities.map(opp => `
      <div class="glass-panel p-6 rounded-2xl relative overflow-hidden border border-white/10 hover:border-indigo-400/50 transition-all">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold tracking-wide">
                ${opp.matchScore}% Match ✦
              </span>
              <span class="text-xs text-slate-400 font-mono">${opp.deadline}</span>
            </div>
            <h3 class="font-display text-lg font-bold text-white">${opp.title}</h3>
            <p class="text-xs text-slate-400">${opp.organization}</p>
          </div>

          <div class="text-right">
            <span class="text-[11px] text-amber-300 font-bold block">${opp.prize}</span>
            <span class="text-[10px] text-slate-400">Team Size: ${opp.teamRequired} members</span>
          </div>
        </div>

        <!-- Why Match Criteria -->
        <div class="p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
          <div class="text-[11px] font-bold text-indigo-300 mb-1.5 uppercase tracking-wider">Why Recommended For You:</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
            ${opp.whyMatch.map(w => `
              <div class="text-xs text-slate-300 flex items-center gap-1.5">
                <span class="text-emerald-400 font-bold">✓</span>
                <span>${w.replace(/^✓\s*/, '')}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Multi-Disciplinary Roles Required -->
        <div class="space-y-2 mb-4">
          <div class="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Four-World Team Composition:</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${opp.rolesNeeded.map(r => {
              const spec = ASTRAEA_DATA.specialisations[r.world] || { name: r.world.toUpperCase(), color: '#818cf8', planetEmoji: '🪐' };
              return `
                <div class="p-2.5 rounded-xl border ${r.filled ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-white/5 border-dashed border-white/10'} text-xs">
                  <div class="flex items-center gap-1.5 font-bold text-white">
                    <span>${spec.planetEmoji}</span>
                    <span style="color: ${spec.color}">${spec.name}</span>
                  </div>
                  <div class="text-[11px] text-slate-300 mt-1 truncate">${r.role}</div>
                  <div class="text-[10px] ${r.filled ? 'text-emerald-400' : 'text-slate-400'} mt-0.5">
                    ${r.filled ? '✓ ' + r.student : '+ Open Role'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-white/5">
          <button class="text-xs text-slate-300 hover:text-white flex items-center gap-1" onclick="window.app.showToast('Opportunity guidelines downloaded to your device.', 'info')">
            <span>Download Brief PDF</span> ➔
          </button>
          <button class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all" onclick="window.constellations.autoAssembleForOpp('${opp.id}')">
            ✦ Auto-Assemble 4-World Team
          </button>
        </div>
      </div>
    `).join('');
  }

  renderPeers() {
    const container = document.getElementById('constellation-peers-container');
    if (!container) return;

    container.innerHTML = this.peers.map(peer => {
      const spec = ASTRAEA_DATA.specialisations[peer.specialisation] || { name: peer.specialisation, planetEmoji: '🪐', color: '#818cf8' };
      const isInvited = this.activeTeam[peer.specialisation] === peer.name;

      return `
        <div class="glass-panel p-5 rounded-2xl border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md" style="background: ${spec.color}">
                  ${peer.name.charAt(0)}
                </div>
                <div>
                  <h4 class="font-display font-bold text-white text-sm flex items-center gap-1.5">
                    ${peer.name}
                    <span class="text-xs">${spec.planetEmoji}</span>
                  </h4>
                  <p class="text-[11px] font-mono" style="color: ${spec.color}">${spec.name} (${spec.fullName})</p>
                </div>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                ${peer.match}
              </span>
            </div>

            <p class="text-xs text-slate-300 mb-3 leading-relaxed">${peer.bio}</p>

            <div class="text-[10px] text-slate-400 font-mono mb-2">DNA Highlight: <span class="text-slate-200">${peer.dnaHighlight}</span></div>

            <div class="flex flex-wrap gap-1 mb-4">
              ${peer.skills.map(s => `
                <span class="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">${s}</span>
              `).join('')}
            </div>
          </div>

          <button class="w-full py-2 rounded-xl text-xs font-semibold transition-all ${
            isInvited 
              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' 
              : 'bg-white/10 hover:bg-indigo-600 text-white border border-white/10'
          }" onclick="window.constellations.toggleInvite('${peer.id}')">
            ${isInvited ? '✓ Star Linked to Team' : '✦ Link Star to Team'}
          </button>
        </div>
      `;
    }).join('');
  }

  renderTeamAssembler() {
    const container = document.getElementById('constellation-active-team');
    if (!container) return;

    const roles = [
      { key: 'aether', title: '🪻 AETHER (GenAI)', member: this.activeTeam.aether, color: '#818cf8' },
      { key: 'nova', title: '🟣 NOVA (Full Stack)', member: this.activeTeam.nova || 'Vacant — Click to Match', color: '#c084fc' },
      { key: 'quanta', title: '🔵 QUANTA (Data Analytics)', member: this.activeTeam.quanta || 'Vacant — Click to Match', color: '#38bdf8' },
      { key: 'lumina', title: '🌸 LUMINA (Design Tech)', member: this.activeTeam.lumina || 'Vacant — Click to Match', color: '#f472b6' }
    ];

    const filledCount = Object.values(this.activeTeam).filter(v => v && v !== 'Vacant').length;
    const synergyPct = filledCount === 4 ? 97 : filledCount === 3 ? 88 : filledCount === 2 ? 72 : 50;

    container.innerHTML = `
      <div class="glass-panel p-6 rounded-2xl border-2 border-indigo-500/30 mb-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs uppercase tracking-widest font-mono text-indigo-400">Constellation Synergy Engine</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold">
                ${synergyPct}% Compatibility
              </span>
            </div>
            <h3 class="font-display text-xl font-bold text-white mt-1">${this.activeTeam.name}</h3>
          </div>

          <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all" onclick="window.constellations.launchTeamProject()">
            🚀 Dispatch Team to Project Lab
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${roles.map(r => `
            <div class="p-4 rounded-xl border ${r.member.includes('Vacant') ? 'bg-white/5 border-dashed border-white/10' : 'bg-indigo-950/40 border-indigo-500/40'} flex flex-col justify-between min-h-[90px]">
              <div class="text-[11px] font-semibold" style="color: ${r.color}">${r.title}</div>
              <div class="font-display text-xs font-bold text-white mt-2">${r.member}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  toggleInvite(peerId) {
    const peer = this.peers.find(p => p.id === peerId);
    if (!peer) return;

    if (this.activeTeam[peer.specialisation] === peer.name) {
      this.activeTeam[peer.specialisation] = null;
      if (window.app) window.app.showToast(`Unlinked ${peer.name} from team.`, 'info');
    } else {
      this.activeTeam[peer.specialisation] = peer.name;
      if (window.cosmicAudio) window.cosmicAudio.playChime('success');
      if (window.app) window.app.showToast(`✦ Linked ${peer.name} (${peer.specialisation.toUpperCase()}) to your team!`, 'success');
    }

    this.renderPeers();
    this.renderTeamAssembler();
  }

  autoAssembleForOpp(oppId) {
    this.activeTeam = {
      name: "Kerala AI Nexus Elite Team",
      aether: "You (Aarav Sharma)",
      nova: "Rohan Menon",
      quanta: "Ananya Sharma",
      lumina: "Kavya Nair"
    };

    if (window.cosmicAudio) window.cosmicAudio.playStarSpawn();
    if (window.app) window.app.showToast('✦ 4-World Perfect Dream Team Assembled! 97% Synergy reached.', 'success');

    this.renderPeers();
    this.renderTeamAssembler();
  }

  launchTeamProject() {
    if (window.cosmicAudio) window.cosmicAudio.playChime('success');
    if (window.app) {
      window.app.showToast('🚀 Team registered in Work-Integrated Project Lab! Workspace initialized.', 'success');
    }
  }
}

window.constellations = new AstraeaConstellations();
