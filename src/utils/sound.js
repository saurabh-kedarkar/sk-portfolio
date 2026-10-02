// Advanced Web Audio API Cinematic Audio Engine & Ambient Soundscape
class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.enabled = false;
    this.ambientActive = false;
    this.droneNodes = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playSuccess();
    } else {
      if (this.ambientActive) {
        this.stopAmbient();
      }
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.audioCtx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      // Audio blocked or not supported
    }
  }

  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(540, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.025, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // ignore
    }
  }

  playWarp() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, this.audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, this.audioCtx.currentTime + 0.15);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.15);
    } catch (e) {
      // ignore
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.04);

        const start = this.audioCtx.currentTime + idx * 0.04;
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch (e) {
      // ignore
    }
  }

  playCelebration() {
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        const start = this.audioCtx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.05, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch (e) {
      // ignore
    }
  }

  playDecryption() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, this.audioCtx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.02);
    } catch (e) {
      // ignore
    }
  }

  toggleAmbient() {
    this.init();
    if (this.ambientActive) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    this.init();
    if (!this.audioCtx) return;
    try {
      // Create rich generative cosmic drone
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      const masterGain = this.audioCtx.createGain();

      // Deep root frequencies (D2 & A2 drone)
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(73.42, this.audioCtx.currentTime); // D2

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110.0, this.audioCtx.currentTime); // A2

      // Lowpass warmth
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(3, this.audioCtx.currentTime);

      masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.035, this.audioCtx.currentTime + 2.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();

      this.droneNodes = { osc1, osc2, masterGain };
      this.ambientActive = true;
      this.enabled = true;
    } catch (e) {
      console.log("Ambient audio error:", e);
    }
  }

  stopAmbient() {
    if (this.droneNodes && this.audioCtx) {
      try {
        const { osc1, osc2, masterGain } = this.droneNodes;
        masterGain.gain.setValueAtTime(masterGain.gain.value, this.audioCtx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {}
        }, 1300);
      } catch (e) {}
      this.droneNodes = null;
    }
    this.ambientActive = false;
  }
}

export const sound = new SoundManager();
