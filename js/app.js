/**
 * ASTRAEA Enterprise Application Controller
 * JAIN University Kochi - Work-Integrated BCA
 */

class AstraeaApp {
  constructor() {
    this.currentView = 'view-landing';
    this.constellationStarsCount = 14;
    this.onboardingStep = 1;
    this.onboardingData = {
      interests: [],
      learningStyle: 'Building',
      careerGoal: 'AI Engineer'
    };
  }

  init() {
    this.initCanvas();
    this.bindGlobalEvents();
    this.checkInitialRoute();
    this.renderStudentDNA();
    this.drawProgressConstellation();

    // Start ambient synthesizer on first user interaction
    const startAudioOnce = () => {
      if (window.cosmicAudio) {
        window.cosmicAudio.startAmbient();
      }
      window.removeEventListener('click', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
    };
    window.addEventListener('click', startAudioOnce);
    window.addEventListener('keydown', startAudioOnce);
  }

  initCanvas() {
    if (window.CosmicCanvas) {
      window.cosmicCanvas = new CosmicCanvas('cosmic-canvas');
    }
  }

  bindGlobalEvents() {
    // Navigation bar links
    document.querySelectorAll('[data-nav-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget.dataset.navTarget;
        this.navigate(target);
      });
    });

    // Audio mute button
    const audioBtn = document.getElementById('btn-toggle-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (window.cosmicAudio) {
          const muted = window.cosmicAudio.toggleMute();
          const icon = audioBtn.querySelector('.audio-icon');
          if (icon) icon.textContent = muted ? '🔇' : '🔊';
          this.showToast(muted ? 'Cosmic ambient audio muted.' : 'Cosmic ambient audio active.', 'info');
        }
      });
    }

    // Student Step 1 Form
    const studentStep1Form = document.getElementById('form-student-step1');
    if (studentStep1Form) {
      studentStep1Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          email: document.getElementById('student-email').value,
          studentId: document.getElementById('student-id').value,
          fullName: document.getElementById('student-fullname').value,
          specialisation: document.getElementById('student-specialisation').value,
          semester: document.getElementById('student-semester').value
        };

        const result = window.astraeaAuth.initiateStudentStep1(formData);
        if (result.success) {
          document.getElementById('otp-sent-email-display').textContent = result.email;
          const emailBadge = document.getElementById('otp-email-type-badge');
          if (emailBadge) {
            emailBadge.textContent = result.emailType;
          }
          
          // Clear OTP inputs
          document.querySelectorAll('.student-otp-input').forEach(inp => inp.value = '');
          this.navigate('view-student-step2');
          this.setupOTPInputListeners('student-otp-input', 'btn-submit-student-otp');
          this.showToast(`✦ Verification code dispatched to ${result.email}`, 'info');
          if (window.cosmicAudio) window.cosmicAudio.playClick();
        } else {
          this.showToast(result.message, 'error');
        }
      });
    }

    // Student Step 2 OTP Form
    const btnSubmitStudentOTP = document.getElementById('btn-submit-student-otp');
    if (btnSubmitStudentOTP) {
      btnSubmitStudentOTP.addEventListener('click', () => {
        const otpDigits = Array.from(document.querySelectorAll('.student-otp-input')).map(i => i.value).join('');
        if (!otpDigits || otpDigits.length < 6) {
          this.showToast('Please enter the full 6-digit verification code.', 'error');
          return;
        }

        const res = window.astraeaAuth.verifyStudentOTP(otpDigits);
        if (res.success) {
          this.showToast(res.message, 'success');
          this.navigate('view-onboarding');
        } else {
          this.showToast(res.message, 'error');
        }
      });
    }

    // Teacher Step 1 Form
    const adminStep1Form = document.getElementById('form-admin-step1');
    if (adminStep1Form) {
      adminStep1Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          staffId: document.getElementById('admin-staff-id').value,
          email: document.getElementById('admin-email').value,
          fullName: document.getElementById('admin-name')?.value,
          department: document.getElementById('admin-department').value,
          passkey: document.getElementById('admin-key').value
        };

        const res = window.astraeaAuth.initiateAdminStep1(formData);
        if (res.success) {
          document.getElementById('admin-otp-sent-email-display').textContent = res.email;
          document.querySelectorAll('.admin-otp-input').forEach(inp => inp.value = '');
          this.navigate('view-admin-step2');
          this.setupOTPInputListeners('admin-otp-input', 'btn-submit-admin-otp');
          this.showToast(`✦ Faculty 2FA security token dispatched to ${res.email}`, 'info');
          if (window.cosmicAudio) window.cosmicAudio.playClick();
        } else {
          this.showToast(res.message, 'error');
        }
      });
    }

    // Teacher Step 2 OTP Form
    const btnSubmitAdminOTP = document.getElementById('btn-submit-admin-otp');
    if (btnSubmitAdminOTP) {
      btnSubmitAdminOTP.addEventListener('click', () => {
        const otpDigits = Array.from(document.querySelectorAll('.admin-otp-input')).map(i => i.value).join('');
        if (!otpDigits || otpDigits.length < 6) {
          this.showToast('Please enter the complete 6-digit 2FA token.', 'error');
          return;
        }

        const res = window.astraeaAuth.verifyAdminOTP(otpDigits);
        if (res.success) {
          this.showToast(res.message, 'success');
          this.navigate('view-admin');
        } else {
          this.showToast(res.message, 'error');
        }
      });
    }

    // Onboarding Option Chips
    document.querySelectorAll('.onboarding-interest-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const val = e.currentTarget.dataset.value;
        if (this.onboardingData.interests.includes(val)) {
          this.onboardingData.interests = this.onboardingData.interests.filter(x => x !== val);
          e.currentTarget.classList.remove('bg-indigo-600', 'border-indigo-400', 'text-white');
          e.currentTarget.classList.add('bg-white/5', 'text-slate-300');
        } else {
          this.onboardingData.interests.push(val);
          e.currentTarget.classList.add('bg-indigo-600', 'border-indigo-400', 'text-white');
          e.currentTarget.classList.remove('bg-white/5', 'text-slate-300');
        }
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    });

    document.querySelectorAll('.onboarding-style-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.onboarding-style-chip').forEach(c => {
          c.classList.remove('bg-indigo-600', 'border-indigo-400', 'text-white');
          c.classList.add('bg-white/5', 'text-slate-300');
        });
        e.currentTarget.classList.add('bg-indigo-600', 'border-indigo-400', 'text-white');
        e.currentTarget.classList.remove('bg-white/5', 'text-slate-300');
        this.onboardingData.learningStyle = e.currentTarget.dataset.value;
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    });

    document.querySelectorAll('.onboarding-career-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.onboarding-career-chip').forEach(c => {
          c.classList.remove('bg-indigo-600', 'border-indigo-400', 'text-white');
          c.classList.add('bg-white/5', 'text-slate-300');
        });
        e.currentTarget.classList.add('bg-indigo-600', 'border-indigo-400', 'text-white');
        e.currentTarget.classList.remove('bg-white/5', 'text-slate-300');
        this.onboardingData.careerGoal = e.currentTarget.dataset.value;
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      });
    });

    // Onboarding Step Next Button
    const btnOnboardingNext = document.getElementById('btn-onboarding-next');
    if (btnOnboardingNext) {
      btnOnboardingNext.addEventListener('click', () => {
        this.onboardingStep++;
        if (this.onboardingStep <= 3) {
          this.renderOnboardingStep();
        } else {
          this.finishOnboarding();
        }
      });
    }
  }

  setupOTPInputListeners(inputClass, submitBtnId) {
    const inputs = document.querySelectorAll(`.${inputClass}`);
    inputs.forEach((input, idx) => {
      input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
        const allFilled = Array.from(inputs).every(i => i.value.length === 1);
        if (allFilled) {
          const btn = document.getElementById(submitBtnId);
          if (btn) btn.focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          inputs[idx - 1].focus();
        }
      });

      // Support paste of 6-digit OTP code
      input.addEventListener('paste', (e) => {
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasteData)) {
          e.preventDefault();
          inputs.forEach((inp, i) => {
            inp.value = pasteData[i] || '';
          });
          const btn = document.getElementById(submitBtnId);
          if (btn) btn.focus();
        }
      });
    });

    if (inputs[0]) inputs[0].focus();
  }

  renderOnboardingStep() {
    document.querySelectorAll('.onboarding-step-view').forEach(v => {
      if (v.id === `onboarding-step-${this.onboardingStep}`) {
        v.classList.remove('hidden');
      } else {
        v.classList.add('hidden');
      }
    });

    const stepLabel = document.getElementById('onboarding-step-indicator');
    if (stepLabel) stepLabel.textContent = `Step 0${this.onboardingStep} of 03`;

    if (this.onboardingStep === 3) {
      const btn = document.getElementById('btn-onboarding-next');
      if (btn) btn.textContent = '✦ Ignite Your Star & Enter Universe ➔';
    }

    if (window.cosmicAudio) window.cosmicAudio.playClick();
  }

  finishOnboarding() {
    if (window.astraeaAuth.currentUser) {
      window.astraeaAuth.currentUser.onboarded = true;
      window.astraeaAuth.currentUser.interests = this.onboardingData.interests;
      window.astraeaAuth.currentUser.learningStyle = this.onboardingData.learningStyle;
      window.astraeaAuth.currentUser.careerGoal = this.onboardingData.careerGoal;
      window.astraeaAuth.saveSession('student', window.astraeaAuth.currentUser);
    }

    if (window.cosmicAudio) window.cosmicAudio.playChime('success');
    this.showToast('✦ Star Created! Welcome to the ASTRAEA Universe.', 'success');
    this.navigate('view-universe');
  }

  checkInitialRoute() {
    if (window.astraeaAuth.currentRole === 'admin') {
      this.navigate('view-admin');
    } else if (window.astraeaAuth.currentRole === 'student') {
      if (window.astraeaAuth.currentUser?.onboarded) {
        this.navigate('view-universe');
      } else {
        this.navigate('view-onboarding');
      }
    } else {
      this.navigate('view-landing');
    }
  }

  navigate(viewId) {
    this.currentView = viewId;

    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active-view');
      view.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active-view');
    }

    // Update active nav items
    document.querySelectorAll('[data-nav-target]').forEach(link => {
      if (link.dataset.navTarget === viewId) {
        link.classList.add('text-indigo-300', 'border-b-2', 'border-indigo-400');
        link.classList.remove('text-slate-400');
      } else {
        link.classList.remove('text-indigo-300', 'border-b-2', 'border-indigo-400');
        link.classList.add('text-slate-400');
      }
    });

    // Top bar visibility
    const navBar = document.getElementById('main-navbar');
    if (navBar) {
      if (viewId === 'view-landing' || viewId.startsWith('view-student-') || viewId.startsWith('view-admin-') || viewId === 'view-onboarding') {
        navBar.classList.add('hidden');
      } else {
        navBar.classList.remove('hidden');
      }
    }

    // Update user session display
    const userLabel = document.getElementById('nav-user-label');
    if (userLabel && window.astraeaAuth.currentUser) {
      userLabel.textContent = window.astraeaAuth.currentUser.fullName || window.astraeaAuth.currentUser.name || 'Verified Star';
    }

    // View specific hooks
    if (viewId === 'view-universe') {
      const spec = window.astraeaAuth.currentUser?.specialisation || 'aether';
      if (window.universe) {
        window.universe.setSpecialisation(spec);
      }
    } else if (viewId === 'view-profile') {
      this.renderStudentDNA();
      this.drawProgressConstellation();
    } else if (viewId === 'view-ai') {
      if (window.astraeaAI) window.astraeaAI.renderMessages();
    } else if (viewId === 'view-nextmove') {
      if (window.nextMove) window.nextMove.render();
    } else if (viewId === 'view-admin') {
      if (window.admin) window.admin.renderRoster();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
      error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
      info: 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
    };

    toast.className = `p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <span class="text-sm font-bold">✦</span>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  addConstellationStar() {
    this.constellationStarsCount++;
    this.drawProgressConstellation();
  }

  /* =========================================================================
   * STUDENT DNA & PROGRESS CONSTELLATION
   * ========================================================================= */

  renderStudentDNA() {
    const container = document.getElementById('student-dna-skills-container');
    const user = window.astraeaAuth.currentUser || { fullName: 'Aarav Sharma', specialisation: 'aether', semester: 1 };
    const spec = ASTRAEA_DATA.specialisations[user.specialisation || 'aether'];

    const studentNameEl = document.getElementById('dna-student-name');
    const studentSpecEl = document.getElementById('dna-student-spec');
    const studentIdEl = document.getElementById('dna-student-id');

    if (studentNameEl) studentNameEl.textContent = user.fullName || user.name || 'Verified Student';
    if (studentSpecEl) studentSpecEl.textContent = `${spec.name} (${spec.fullName}) — Semester ${user.semester || 1}`;
    if (studentIdEl) studentIdEl.textContent = `ID: ${user.studentId || user.staffId || 'JU24BCA-A042'}`;

    if (!container) return;

    container.innerHTML = ASTRAEA_DATA.studentDNA.skills.map(skill => `
      <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-400/30 transition-all">
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-bold text-xs text-white">${skill.name}</span>
          <span class="font-mono text-xs font-bold" style="color: ${skill.color}">${skill.level}%</span>
        </div>
        <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
          <div class="h-full rounded-full" style="width: ${skill.level}%; background: ${skill.color}"></div>
        </div>
        <div class="text-[11px] text-slate-400 leading-relaxed">
          <span class="text-indigo-400 font-semibold">Evidence:</span> ${skill.evidence}
        </div>
      </div>
    `).join('');
  }

  drawProgressConstellation() {
    const canvas = document.getElementById('progress-constellation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 500;
    canvas.height = 320;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const starCount = Math.min(24, this.constellationStarsCount);
    const starPoints = [];

    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      const radius = 60 + (i % 3) * 45;
      const x = canvas.width / 2 + Math.cos(angle * 1.5) * radius + (Math.sin(i * 3) * 20);
      const y = canvas.height / 2 + Math.sin(angle * 1.5) * (radius * 0.6) + (Math.cos(i * 2) * 20);
      starPoints.push({ x, y, size: (i % 4 === 0) ? 5 : 3.5 });
    }

    ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i = 0; i < starPoints.length; i++) {
      const p1 = starPoints[i];
      const p2 = starPoints[(i + 1) % starPoints.length];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(192, 132, 252, 0.2)';
    ctx.beginPath();
    for (let i = 0; i < starPoints.length - 2; i += 2) {
      ctx.moveTo(starPoints[i].x, starPoints[i].y);
      ctx.lineTo(starPoints[i + 2].x, starPoints[i + 2].y);
    }
    ctx.stroke();

    starPoints.forEach((p, idx) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = idx === 0 ? '#fbbf24' : '#ffffff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = idx === 0 ? '#fbbf24' : '#818cf8';
      ctx.fill();
      ctx.restore();
    });
  }

  resetAllState() {
    localStorage.clear();
    location.reload();
  }
}

window.app = new AstraeaApp();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
  if (window.universe) window.universe.init();
  if (window.astraeaAI) window.astraeaAI.init();
  if (window.nextMove) window.nextMove.init();
  if (window.constellations) window.constellations.init();
  if (window.campus) window.campus.init();
  if (window.admin) window.admin.init();
});
