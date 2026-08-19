/**
 * ASTRAEA Cosmic Audio Synthesizer
 * Uses Web Audio API for zero-dependency ambient cosmic hum & UI SFX
 */

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.isMuted = localStorage.getItem('astraea_audio_muted') === 'true';
    this.isPlayingAmbient = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('astraea_audio_muted', this.isMuted);
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!this.isMuted && this.isPlayingAmbient) {
      this.startAmbient();
    }
    return this.isMuted;
  }

  startAmbient() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlayingAmbient && this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 1.5);
      return;
    }

    try {
      // Cosmic Drone: Two warm detuned oscillators
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      this.ambientGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 slight detune

      // Low pass cosmic space filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      // LFO for slow orbital pulse
      lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
      lfo.connect(filter.frequency);

      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();
      this.isPlayingAmbient = true;
    } catch (e) {
      console.warn("Audio autoplay blocked or unsupported:", e);
    }
  }

  // Confirmation Chime for Two-Step Verification & Success
  playChime(type = 'success') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = type === 'success' ? [523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.7);
    });
  }

  // Constellation Star Spawn Shimmer SFX
  playStarSpawn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.05 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.05);
      osc.stop(this.ctx.currentTime + idx * 0.05 + 0.5);
    });
  }

  // Subtle interactive UI click
  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
}

window.cosmicAudio = new CosmicAudioEngine();
