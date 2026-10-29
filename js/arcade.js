
    // =========================================================================
    // 1. WEB AUDIO SYNTHESIZER (SFX + MYSTICAL NUSANTARA CHIPTUNE PULSE)
    // =========================================================================
    const saved = {
      get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
      set(key, value) { try { localStorage.setItem(key, String(value)); } catch {} }
    };
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let soundEnabled = saved.get('vincy-muted', 'false') !== 'true';
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtx = new AudioCtx();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    }

    function playSfx(type) {
      if (!soundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'shoot0') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'shoot1') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.16);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'shoot2') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.14);
        gain.gain.setValueAtTime(0.13, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.15);
        gain.gain.setValueAtTime(0.13, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'dash') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'hit') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'coin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'special') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.38);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.38);
        osc.start(now);
        osc.stop(now + 0.38);
      } else if (type === 'bossWarn') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(110, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    }

    // =========================================================================
    // 2. GAME DATA: 4 STAGES, PLATFORMS, WEAPONS, AND DEMIT CODEX
    // =========================================================================
    const WEAPONS = [
      {
        id: 0,
        name: 'Meriam Banaspati',
        short: '🔥 Api Roh',
        desc: '🔥 SENJATA AKTIF: MERIAM BANASPATI (Tembakan Bola Api Cepat & Seimbang)',
        cooldown: 13,
        dmg: 28,
        color: '#facc15'
      },
      {
        id: 1,
        name: 'Tiga Roh (Spread)',
        short: '🔱 3-Roh',
        desc: '🔱 SENJATA AKTIF: TIGA ROH (Menembakkan 3 Bola Mistis Menyebar ke Udara)',
        cooldown: 19,
        dmg: 19,
        color: '#c084fc'
      },
      {
        id: 2,
        name: 'Petir Keris',
        short: '⚡ Petir',
        desc: '⚡ SENJATA AKTIF: PETIR KERIS (Sinar Kilat Menembus Banyak Demit Sekaligus!)',
        cooldown: 22,
        dmg: 42,
        color: '#38bdf8'
      }
    ];

    const STAGES_DATA = [
      {
        id: 0,
        chapter: 'STAGE 1',
        name: 'The Village',
        titleId: 'The Village (Desa Sunyi)',
        stars: '★★☆☆',
        bgKey: 'bg0',
        bgSrc: 'assets/arcade/f0ec4a75244377d1.jpg',
        desc: 'Desa tempat tinggal Vincy yang diteror bola api Banaspati dan Tuyul pencuri koin saat bulan purnama ungu tiba.',
        demitsText: 'Banaspati, Tuyul, Babi Ngepet',
        bossName: 'BOS 1: POCONG RAKSASA',
        bossKey: 'pocong',
        killsNeeded: 10,
        groundColor: '#192e25',
        platformColor: '#3e2b1d',
        platformBorder: '#d4e857',
        skyTint: 'rgba(26, 18, 54, 0.32)',
        platforms: [
          { rx: 0.16, ry: 0.62, rw: 0.20 },
          { rx: 0.46, ry: 0.48, rw: 0.22 },
          { rx: 0.73, ry: 0.62, rw: 0.18 }
        ]
      },
      {
        id: 1,
        chapter: 'STAGE 2',
        name: 'Banana Hollow',
        titleId: 'Banana Hollow (Kebun Pisang Angker)',
        stars: '★★★☆',
        bgKey: 'bg1',
        bgSrc: 'assets/arcade/945742f1204c71bc.jpg',
        desc: 'Kebun pohon pisang angker di tepi makam tua. Sarang Kuntilanak penyembur ectoplasma dan Pocong Raksasa.',
        demitsText: 'Kuntilanak, Banaspati, Tuyul',
        bossName: 'BOS 1: POCONG KEBON PISANG',
        bossKey: 'pocong',
        killsNeeded: 12,
        groundColor: '#143025',
        platformColor: '#254232',
        platformBorder: '#a3e635',
        skyTint: 'rgba(16, 52, 35, 0.32)',
        platforms: [
          { rx: 0.12, ry: 0.56, rw: 0.22 },
          { rx: 0.42, ry: 0.66, rw: 0.20 },
          { rx: 0.68, ry: 0.50, rw: 0.22 }
        ]
      },
      {
        id: 2,
        chapter: 'STAGE 3',
        name: 'Hidden Forest',
        titleId: 'Hidden Forest (Hutan Terlarang)',
        stars: '★★★★',
        bgKey: 'bg2',
        bgSrc: 'assets/arcade/1393223f1e78608a.jpg',
        desc: 'Hutan belantara lebat dengan pepohonan raksasa berlumut biru. Wilayah kekuasaan Genderuwo Hutan bertaring besar.',
        demitsText: 'Babi Ngepet, Kuntilanak, Banaspati',
        bossName: 'BOS 2: GENDERUWO HUTAN',
        bossKey: 'genderuwo',
        killsNeeded: 14,
        groundColor: '#122830',
        platformColor: '#233d47',
        platformBorder: '#38bdf8',
        skyTint: 'rgba(14, 42, 58, 0.34)',
        platforms: [
          { rx: 0.14, ry: 0.64, rw: 0.18 },
          { rx: 0.38, ry: 0.46, rw: 0.24 },
          { rx: 0.68, ry: 0.60, rw: 0.20 }
        ]
      },
      {
        id: 3,
        chapter: 'STAGE 4',
        name: 'Ancient Temple',
        titleId: 'Ancient Temple (Candi Purba)',
        stars: '★★★★★',
        bgKey: 'bg3',
        bgSrc: 'assets/arcade/5ddf93941d490921.jpg',
        desc: 'Ruang dalam candi purba berhiaskan ukiran Kala dan lilin mistis. Arena pertarungan puncak melawan Ratu Demit Tangan Enam!',
        demitsText: 'Semua Demit + Ratu Leak Tangan Enam',
        bossName: 'FINAL BOSS: RATU DEMIT TANGAN ENAM',
        bossKey: 'wewe',
        killsNeeded: 16,
        groundColor: '#332014',
        platformColor: '#4d311e',
        platformBorder: '#f59e0b',
        skyTint: 'rgba(55, 20, 16, 0.34)',
        platforms: [
          { rx: 0.12, ry: 0.62, rw: 0.20 },
          { rx: 0.40, ry: 0.45, rw: 0.20 },
          { rx: 0.68, ry: 0.62, rw: 0.20 }
        ]
      }
    ];

    const CODEX_DATA = [
      {
        name: 'Vincy — The Phantom Chaser',
        role: 'PROTAGONIST / PEMBURU DEMIT',
        skill: 'Meriam Banaspati, Lompat Ganda & Ledakan Tasbih',
        desc: 'Pemburu demit ramah bersenjatakan Meriam Roh dan Kalung Tasbih. Mampu berganti 3 mode tembakan dan melakukan Dash cepat.',
        sprite: 'assets/arcade/584069d8cb2dacee.png',
        compare: 'assets/arcade/a9652903e4a0f268.jpg'
      },
      {
        name: 'Banaspati (Tengkorak Api)',
        role: 'DEMIT UDARA • TEMBAK',
        skill: 'TEMBAK — Bola Api Melayang',
        desc: 'Roh api berbentuk tengkorak menyala yang terbang bergelombang dan menembakkan bara api ke arah Vincy.',
        sprite: 'assets/arcade/2f63a9598399078d.png',
        compare: 'assets/arcade/ad89b6cd6f5c41b0.jpg'
      },
      {
        name: 'Babi Ngepet',
        role: 'DEMIT DARAT • SERUDUK',
        skill: 'SERUDUK — Terjangan Kilat',
        desc: 'Siluman babi hutan biru-ungu yang memberi tanda peringatan (!) sebelum menyeruduk kencang di permukaan tanah.',
        sprite: 'assets/arcade/d996e89a8347d533.png',
        compare: 'assets/arcade/e4a832653ec6f509.jpg'
      },
      {
        name: 'Tuyul Pembawa Karung',
        role: 'DEMIT LINCAH • PUKUL',
        skill: 'PUKUL — Lompatan Karung Curian',
        desc: 'Demit cilik berkepala plontos yang melompat ke atas pijakan dan mengayunkan karung curiannya.',
        sprite: 'assets/arcade/b8928a3e881ce4c3.png',
        compare: 'assets/arcade/b20c8d74df7fcdb7.jpg'
      },
      {
        name: 'Kuntilanak Ungu',
        role: 'DEMIT UDARA • MUNTAH',
        skill: 'MUNTAH — Cairan Ectoplasma Hijau',
        desc: 'Hantu berambut panjang yang melayang tinggi di dekat pohon pisang dan menyemburkan cairan hijau ke bawah.',
        sprite: 'assets/arcade/98a0db2fcf708212.png',
        compare: 'assets/arcade/8ec85b50cbcc3d94.jpg'
      },
      {
        name: 'Bos 1: Pocong Raksasa',
        role: 'BOSS STAGE 1 & 2',
        skill: 'Lompatan Gempa & Tembakan Roh Makam',
        desc: 'Raksasa berkain kafan hijau lumut yang melompat tinggi mengguncang tanah dan menembakkan bola energi kuburan.',
        sprite: 'assets/arcade/8ecd94e475777b97.png',
        compare: 'assets/arcade/5c77671c551a6087.jpg'
      },
      {
        name: 'Bos 2: Genderuwo Hutan',
        role: 'BOSS STAGE 3 (HIDDEN FOREST)',
        skill: 'Terjangan Taring & Hembusan Asap Mata',
        desc: 'Monster raksasa berbulu ungu lebat penguasa hutan terlarang dengan serangan gelombang ganda.',
        sprite: 'assets/arcade/d5ff8204103d458b.png',
        compare: 'assets/arcade/1af9a0007d7a4f84.jpg'
      },
      {
        name: 'Bos 3: Ratu Demit Tangan Enam',
        role: 'FINAL BOSS STAGE 4 (ANCIENT TEMPLE)',
        skill: 'Rentetan 6 Lengan & Selendang Kutukan',
        desc: 'Penguasa tertinggi Candi Purba yang melayang di udara dan menembakkan rentetan proyektil kutukan merah.',
        sprite: 'assets/arcade/46cb1cb47291d7d3.png',
        compare: 'assets/arcade/a1b68a32415ed237.jpg'
      }
    ];

    // =========================================================================
    // 3. LOAD SPRITE & BACKGROUND ASSETS
    // =========================================================================
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    const gameImages = {};
    const IMAGE_SOURCES = {
      vincyIdle: 'assets/arcade/584069d8cb2dacee.png',
      vincyShoot: 'assets/arcade/dec363de302286f2.png',
      banaspati: 'assets/arcade/2f63a9598399078d.png',
      babi: 'assets/arcade/d996e89a8347d533.png',
      tuyul: 'assets/arcade/b8928a3e881ce4c3.png',
      kuntilanak: 'assets/arcade/98a0db2fcf708212.png',
      pocong: 'assets/arcade/8ecd94e475777b97.png',
      genderuwo: 'assets/arcade/d5ff8204103d458b.png',
      wewe: 'assets/arcade/46cb1cb47291d7d3.png',
      bg0: 'assets/arcade/f0ec4a75244377d1.jpg',
      bg1: 'assets/arcade/945742f1204c71bc.jpg',
      bg2: 'assets/arcade/1393223f1e78608a.jpg',
      bg3: 'assets/arcade/5ddf93941d490921.jpg'
    };

    Object.keys(IMAGE_SOURCES).forEach(k => {
      const img = new Image();
      img.src = IMAGE_SOURCES[k];
      gameImages[k] = img;
    });

    // =========================================================================
    // 4. CORE GAME STATE & PHYSICS ENGINE
    // =========================================================================
    const keys = { left: false, right: false, down: false, shoot: false };

    const game = {
      running: false,
      paused: false,
      stageIdx: 0,
      score: 0,
      combo: 0,
      maxCombo: 1,
      comboTimer: 0,
      kills: 0,
      bossSpawned: false,
      bossDefeated: false,
      cameraShake: 0,
      bgScroll: 0,
      spawnCooldown: 40,
      fireflies: [],
      player: {
        x: 90,
        y: 200,
        w: 72,
        h: 88,
        vx: 0,
        vy: 0,
        speed: 5.2,
        jumpForce: -13.2,
        jumpsLeft: 2,
        hp: 5,
        maxHp: 5,
        special: 100,
        weaponIdx: 0,
        shootCooldown: 0,
        shootPoseTimer: 0,
        facingRight: true,
        invulnTimer: 0,
        dashTimer: 0,
        dashCooldown: 0,
        dropThroughTimer: 0
      },
      bullets: [],
      enemyBullets: [],
      enemies: [],
      pickups: [],
      particles: [],
      floatingTexts: [],
      afterimages: []
    };

    function initFireflies() {
      game.fireflies = [];
      for (let i = 0; i < 22; i++) {
        game.fireflies.push({
          x: Math.random() * (canvas.width || 900),
          y: Math.random() * (canvas.height || 500),
          r: 1.5 + Math.random() * 2.5,
          vx: -0.3 - Math.random() * 0.6,
          vy: (Math.random() - 0.5) * 0.5,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function resizeCanvas() {
      const vp = document.getElementById('canvas-viewport');
      if (!vp) return;
      // Fixed logical arena keeps movement, jumps and enemy balance consistent.
      canvas.width = 960;
      canvas.height = 540;
      const groundY = canvas.height - 56;
      if (game.player.y + game.player.h > groundY) {
        game.player.y = groundY - game.player.h;
      }
      if (game.fireflies.length === 0) initFireflies();
    }

    function getStagePlatforms() {
      const st = STAGES_DATA[game.stageIdx];
      const w = canvas.width;
      const groundY = canvas.height - 56;
      return st.platforms.map(p => ({
        x: p.rx * w,
        y: p.ry * groundY,
        w: p.rw * w,
        h: 14
      }));
    }

    // =========================================================================
    // 5. HUD & WEAPON SWITCHING UPDATES
    // =========================================================================
    function updateHud() {
      const p = game.player;
      const st = STAGES_DATA[game.stageIdx];

      document.getElementById('hud-hearts').textContent =
        '❤️'.repeat(Math.max(0, p.hp)) + '🖤'.repeat(Math.max(0, p.maxHp - p.hp));
      document.getElementById('hud-score').textContent = game.score;

      const specPct = Math.min(100, Math.max(0, Math.round(p.special)));
      document.getElementById('hud-special-bar').style.width = `${specPct}%`;
      const readyEl = document.getElementById('hud-special-ready');
      if (specPct >= 100) {
        readyEl.classList.remove('hidden');
      } else {
        readyEl.classList.add('hidden');
      }

      // Combo badge
      const comboBadge = document.getElementById('hud-combo-badge');
      if (game.combo >= 2) {
        comboBadge.textContent = `x${game.combo}`;
        comboBadge.classList.remove('hidden');
      } else {
        comboBadge.classList.add('hidden');
      }

      // Stage & Wave progress
      document.getElementById('hud-stage-badge').textContent = `${st.chapter}: ${st.name.toUpperCase()}`;
      document.getElementById('hud-wave-text').textContent = game.bossSpawned
        ? '👹 BOSS FIGHT!'
        : `Demit: ${Math.min(game.kills, st.killsNeeded)} / ${st.killsNeeded}`;
      const progPct = game.bossSpawned ? 100 : Math.min(100, Math.round((game.kills / st.killsNeeded) * 100));
      document.getElementById('hud-stage-progress').style.width = `${progPct}%`;

      // Boss HUD
      const bossOverlay = document.getElementById('boss-hud-overlay');
      const boss = game.enemies.find(e => e.isBoss);
      if (boss) {
        bossOverlay.classList.remove('hidden');
        document.getElementById('boss-hud-name').innerHTML = `<span>👹</span> <span>${st.bossName}</span>`;
        document.getElementById('boss-hud-hp-text').textContent = `${Math.max(0, Math.ceil(boss.hp))} / ${boss.maxHp}`;
        const bpct = Math.max(0, Math.min(100, (boss.hp / boss.maxHp) * 100));
        document.getElementById('boss-hud-bar').style.width = `${bpct}%`;
      } else {
        bossOverlay.classList.add('hidden');
      }
    }

    function selectWeapon(idx) {
      game.player.weaponIdx = idx;
      document.querySelectorAll('.weapon-pill').forEach((btn, i) => {
        btn.className = i === idx
          ? 'weapon-pill px-2 py-1 rounded-lg text-xs font-bold bg-[#d4e857] text-[#09110e] transition flex items-center gap-1'
          : 'weapon-pill px-2 py-1 rounded-lg text-xs font-bold text-gray-300 hover:bg-[#162822] transition flex items-center gap-1';
      });
      const w = WEAPONS[idx];
      const msgEl = document.getElementById('footer-status-msg');
      if (msgEl) msgEl.textContent = w.desc;
      game.floatingTexts.push({
        x: game.player.x + game.player.w / 2,
        y: game.player.y - 10,
        text: w.short,
        color: w.color,
        life: 32
      });
    }

    document.querySelectorAll('.weapon-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-weapon'), 10);
        selectWeapon(idx);
      });
    });

    // =========================================================================
    // 6. STAGE INITIALIZATION & PLAYER ACTIONS
    // =========================================================================
    function resetStage(stageIdx, resetScore = false) {
      game.stageIdx = stageIdx;
      const groundY = (canvas.height || 480) - 56;
      game.kills = 0;
      game.bossSpawned = false;
      game.bossDefeated = false;
      game.spawnCooldown = 35;
      game.cameraShake = 0;
      if (resetScore) {
        game.score = 0;
        game.combo = 0;
        game.maxCombo = 1;
      }

      const p = game.player;
      p.x = 80;
      p.y = groundY - p.h;
      p.vx = 0;
      p.vy = 0;
      p.hp = p.maxHp;
      p.special = 100;
      p.facingRight = true;
      p.invulnTimer = 0;
      p.dashTimer = 0;
      p.shootCooldown = 0;
      p.shootPoseTimer = 0;
      p.jumpsLeft = 2;
      p.dashCooldown = 0;
      p.dropThroughTimer = 0;
      game.combo = 0;
      game.comboTimer = 0;
      clearInput();

      game.bullets = [];
      game.enemyBullets = [];
      game.enemies = [];
      game.pickups = [];
      game.particles = [];
      game.floatingTexts = [];
      game.afterimages = [];

      updateHud();
    }

    function launchStage(stageIdx, keepScore = false) {
      initAudio();
      document.getElementById('modal-title-screen').classList.add('hidden');
      document.getElementById('modal-world-map').classList.add('hidden');
      document.getElementById('modal-codex').classList.add('hidden');
      document.getElementById('modal-stage-result').classList.add('hidden');

      resetStage(stageIdx, !keepScore);
      game.running = true;
      game.paused = false;

      const st = STAGES_DATA[stageIdx];
      game.floatingTexts.push({
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        text: `⚔️ ${st.chapter}: ${st.name.toUpperCase()} MULAI!`,
        color: '#d4e857',
        life: 65,
        big: true
      });
    }

    function triggerJump() {
      if (!game.running || game.paused) return;
      const p = game.player;
      if (p.jumpsLeft > 0) {
        p.vy = p.jumpForce;
        p.jumpsLeft--;
        playSfx('jump');
        for (let i = 0; i < 6; i++) {
          game.particles.push({
            x: p.x + p.w / 2 + (Math.random() - 0.5) * 24,
            y: p.y + p.h,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2,
            r: 4 + Math.random() * 4,
            color: '#d4e857',
            alpha: 0.85
          });
        }
      }
    }

    function triggerDash() {
      if (!game.running || game.paused) return;
      const p = game.player;
      if (p.dashCooldown > 0) return;
      p.dashTimer = 11;
      p.dashCooldown = 38;
      p.invulnTimer = Math.max(p.invulnTimer, 14);
      playSfx('dash');
      game.floatingTexts.push({
        x: p.x + p.w / 2,
        y: p.y + 15,
        text: '💨 DASH!',
        color: '#6ee7b7',
        life: 20
      });
    }

    function fireWeapon() {
      if (!game.running || game.paused) return;
      const p = game.player;
      if (p.shootCooldown > 0) return;

      const w = WEAPONS[p.weaponIdx];
      p.shootCooldown = w.cooldown;
      p.shootPoseTimer = 14;
      playSfx(`shoot${p.weaponIdx}`);

      const dir = p.facingRight ? 1 : -1;
      const muzzleX = p.facingRight ? p.x + p.w - 4 : p.x - 10;
      const muzzleY = p.y + p.h * 0.44;

      if (p.weaponIdx === 0) {
        // Rapid Fireball
        game.bullets.push({
          x: muzzleX,
          y: muzzleY,
          vx: dir * 11.5,
          vy: 0,
          r: 10,
          dmg: w.dmg,
          color: '#facc15',
          pierce: false
        });
      } else if (p.weaponIdx === 1) {
        // 3-Way Spread Shot
        [-2.4, 0, 2.4].forEach(vyVal => {
          game.bullets.push({
            x: muzzleX,
            y: muzzleY,
            vx: dir * 10.2,
            vy: vyVal,
            r: 8.5,
            dmg: w.dmg,
            color: '#c084fc',
            pierce: false
          });
        });
      } else if (p.weaponIdx === 2) {
        // Piercing Lightning Bolt
        game.bullets.push({
          x: muzzleX,
          y: muzzleY,
          vx: dir * 15.5,
          vy: 0,
          r: 11,
          dmg: w.dmg,
          color: '#38bdf8',
          pierce: true,
          hitIds: new Set()
        });
      }

      // Muzzle sparks
      for (let i = 0; i < 6; i++) {
        game.particles.push({
          x: muzzleX,
          y: muzzleY,
          vx: dir * (2 + Math.random() * 5),
          vy: (Math.random() - 0.5) * 4,
          r: 3 + Math.random() * 4,
          color: w.color,
          alpha: 1
        });
      }
    }

    function triggerSpecialBlast() {
      if (!game.running || game.paused) return;
      const p = game.player;
      if (p.special < 100) {
        game.floatingTexts.push({
          x: p.x + p.w / 2,
          y: p.y - 10,
          text: `Roh Belum Penuh (${Math.floor(p.special)}%)`,
          color: '#c084fc',
          life: 30
        });
        return;
      }

      p.special = 0;
      p.shootPoseTimer = 25;
      p.invulnTimer = 35;
      game.cameraShake = 16;
      playSfx('special');

      // Clear all enemy bullets & heavily damage all enemies
      game.enemyBullets = [];
      game.enemies.forEach(en => {
        en.hp -= 135;
        game.floatingTexts.push({
          x: en.x + en.w / 2,
          y: en.y,
          text: '✨ LEDAKAN TASBIH -135!',
          color: '#d4e857',
          life: 45
        });
      });

      for (let i = 0; i < 40; i++) {
        const ang = (Math.PI * 2 * i) / 40;
        game.particles.push({
          x: p.x + p.w / 2,
          y: p.y + p.h / 2,
          vx: Math.cos(ang) * (5 + Math.random() * 7),
          vy: Math.sin(ang) * (5 + Math.random() * 7),
          r: 6 + Math.random() * 6,
          color: i % 2 === 0 ? '#d4e857' : '#c084fc',
          alpha: 1
        });
      }
      updateHud();
    }

    // =========================================================================
    // 7. ENEMY & BOSS SPAWNING + AI LOGIC
    // =========================================================================
    let enemyUidCounter = 1;

    function spawnRegularDemit() {
      const groundY = canvas.height - 56;
      const spawnFromRight = Math.random() > 0.22;
      const sx = spawnFromRight ? canvas.width + 30 : -70;
      const dir = spawnFromRight ? -1 : 1;

      const stagePools = [
        ['banaspati', 'tuyul', 'babi'],
        ['kuntilanak', 'banaspati', 'tuyul'],
        ['babi', 'kuntilanak', 'banaspati', 'tuyul'],
        ['banaspati', 'babi', 'tuyul', 'kuntilanak']
      ];
      const pool = stagePools[game.stageIdx];
      const type = pool[Math.floor(Math.random() * pool.length)];
      const hpMul = 1 + game.stageIdx * 0.22;

      if (type === 'banaspati') {
        game.enemies.push({
          uid: enemyUidCounter++,
          type: 'banaspati',
          x: sx,
          y: groundY - 165 - Math.random() * 90,
          w: 62,
          h: 68,
          vx: dir * (2.2 + Math.random() * 0.6),
          vy: 0,
          hp: Math.round(52 * hpMul),
          maxHp: Math.round(52 * hpMul),
          isBoss: false,
          timer: Math.floor(Math.random() * 40)
        });
      } else if (type === 'babi') {
        game.enemies.push({
          uid: enemyUidCounter++,
          type: 'babi',
          x: sx,
          y: groundY - 64,
          w: 82,
          h: 64,
          vx: dir * 4.3,
          vy: 0,
          hp: Math.round(68 * hpMul),
          maxHp: Math.round(68 * hpMul),
          isBoss: false,
          timer: 0
        });
      } else if (type === 'tuyul') {
        game.enemies.push({
          uid: enemyUidCounter++,
          type: 'tuyul',
          x: sx,
          y: groundY - 72,
          w: 58,
          h: 72,
          vx: dir * 2.9,
          vy: 0,
          hp: Math.round(55 * hpMul),
          maxHp: Math.round(55 * hpMul),
          isBoss: false,
          timer: 0
        });
      } else if (type === 'kuntilanak') {
        game.enemies.push({
          uid: enemyUidCounter++,
          type: 'kuntilanak',
          x: sx,
          y: groundY - 190 - Math.random() * 60,
          w: 56,
          h: 96,
          vx: dir * 1.9,
          vy: 0,
          hp: Math.round(76 * hpMul),
          maxHp: Math.round(76 * hpMul),
          isBoss: false,
          timer: 0
        });
      }
    }

    function spawnStageBoss() {
      game.bossSpawned = true;
      playSfx('bossWarn');
      game.cameraShake = 14;
      const st = STAGES_DATA[game.stageIdx];
      const groundY = canvas.height - 56;
      const bossHp = 360 + game.stageIdx * 130;

      game.enemies.push({
        uid: enemyUidCounter++,
        type: st.bossKey,
        name: st.bossName,
        x: canvas.width - 170,
        y: groundY - 155,
        w: 130,
        h: 155,
        vx: -2.0,
        vy: 0,
        hp: bossHp,
        maxHp: bossHp,
        isBoss: true,
        timer: 0
      });

      game.floatingTexts.push({
        x: canvas.width / 2,
        y: canvas.height * 0.32,
        text: `⚠️ PERINGATAN: ${st.bossName} MUNCUL!`,
        color: '#fb7185',
        life: 95,
        big: true
      });
      updateHud();
    }

    function spawnDrop(x, y) {
      const r = Math.random();
      let kind = 'coin';
      if (r < 0.16) kind = 'heart';
      else if (r < 0.45) kind = 'roh';

      game.pickups.push({
        kind,
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: -5 - Math.random() * 3,
        r: 13,
        life: 420
      });
    }

    // =========================================================================
    // 8. MAIN UPDATE LOOP (60 FPS)
    // =========================================================================
    function updateGame() {
      if (!game.running || game.paused) return;
      const w = canvas.width;
      const h = canvas.height;
      const groundY = h - 56;
      const p = game.player;
      const st = STAGES_DATA[game.stageIdx];
      const platforms = getStagePlatforms();

      if (game.cameraShake > 0) game.cameraShake *= 0.85;
      if (game.comboTimer > 0) {
        game.comboTimer--;
        if (game.comboTimer === 0) game.combo = 0;
      }

      // Cooldowns
      if (p.shootCooldown > 0) p.shootCooldown--;
      if (p.shootPoseTimer > 0) p.shootPoseTimer--;
      if (p.invulnTimer > 0) p.invulnTimer--;
      if (p.dashCooldown > 0) p.dashCooldown--;
      if (p.dropThroughTimer > 0) p.dropThroughTimer--;

      // Continuous fire if holding shoot
      if (keys.shoot) fireWeapon();

      // Player Horizontal Movement & Dash
      if (p.dashTimer > 0) {
        p.dashTimer--;
        p.vx = (p.facingRight ? 1 : -1) * 11.5;
        p.vy = 0;
        if (p.dashTimer % 2 === 0) {
          game.afterimages.push({
            x: p.x,
            y: p.y,
            w: p.w,
            h: p.h,
            facingRight: p.facingRight,
            alpha: 0.45
          });
        }
      } else {
        if (keys.left) {
          p.vx = -p.speed;
          p.facingRight = false;
        } else if (keys.right) {
          p.vx = p.speed;
          p.facingRight = true;
        } else {
          p.vx *= 0.78;
        }
      }

      p.x += p.vx;
      p.x = Math.max(12, Math.min(w - p.w - 12, p.x));
      game.bgScroll = (game.bgScroll + p.vx * 0.35 + 0.3) % w;

      // Drop through platform if pressing down
      if (keys.down) {
        p.dropThroughTimer = 14;
      }

      // Player Vertical Physics & Platform Landing
      const prevBottom = p.y + p.h;
      p.vy += 0.62;
      p.y += p.vy;

      // Check elevated platforms (one-way from above)
      if (p.vy >= 0 && p.dropThroughTimer <= 0) {
        platforms.forEach(plat => {
          if (
            p.x + p.w * 0.75 > plat.x &&
            p.x + p.w * 0.25 < plat.x + plat.w &&
            prevBottom <= plat.y + 8 &&
            p.y + p.h >= plat.y
          ) {
            p.y = plat.y - p.h;
            p.vy = 0;
            p.jumpsLeft = 2;
          }
        });
      }

      // Ground collision
      if (p.y + p.h >= groundY) {
        p.y = groundY - p.h;
        p.vy = 0;
        p.jumpsLeft = 2;
      }

      // Update Fireflies
      game.fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy + Math.sin(f.phase) * 0.25;
        f.phase += 0.05;
        if (f.x < 0) f.x = w;
        if (f.y < 20) f.y = groundY - 20;
      });

      // Update Afterimages
      for (let i = game.afterimages.length - 1; i >= 0; i--) {
        game.afterimages[i].alpha -= 0.05;
        if (game.afterimages[i].alpha <= 0) game.afterimages.splice(i, 1);
      }

      // Spawn Enemies or Boss
      game.spawnCooldown--;
      if (game.spawnCooldown <= 0) {
        if (!game.bossSpawned && game.kills >= st.killsNeeded) {
          spawnStageBoss();
        } else if (!game.bossSpawned && game.enemies.length < 4 + Math.floor(game.stageIdx / 2)) {
          spawnRegularDemit();
          game.spawnCooldown = Math.max(42, 88 - game.stageIdx * 12);
        } else {
          game.spawnCooldown = 50;
        }
      }

      // Update Player Bullets
      for (let i = game.bullets.length - 1; i >= 0; i--) {
        const b = game.bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -40 || b.x > w + 40 || b.y < -40 || b.y > h + 40) {
          game.bullets.splice(i, 1);
          continue;
        }

        let bulletRemoved = false;
        for (let j = game.enemies.length - 1; j >= 0; j--) {
          const en = game.enemies[j];
          if (b.pierce && b.hitIds.has(en.uid)) continue;

          if (
            b.x + b.r > en.x &&
            b.x - b.r < en.x + en.w &&
            b.y + b.r > en.y &&
            b.y - b.r < en.y + en.h
          ) {
            en.hp -= b.dmg;
            playSfx('hit');
            game.floatingTexts.push({
              x: en.x + en.w / 2 + (Math.random() - 0.5) * 16,
              y: en.y + 8,
              text: `-${b.dmg}`,
              color: b.color,
              life: 24
            });
            for (let k = 0; k < 5; k++) {
              game.particles.push({
                x: b.x,
                y: b.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                r: 3.5,
                color: b.color,
                alpha: 1
              });
            }

            if (b.pierce) {
              b.hitIds.add(en.uid);
            } else {
              game.bullets.splice(i, 1);
              bulletRemoved = true;
              break;
            }
          }
        }
        if (bulletRemoved) continue;
      }

      // Update Enemies & Bosses
      for (let i = game.enemies.length - 1; i >= 0; i--) {
        const en = game.enemies[i];
        en.timer++;

        if (en.isBoss) {
          en.x += en.vx;
          if (en.x < w * 0.35 || en.x > w - en.w - 20) {
            en.vx *= -1;
          }
          if (en.type === 'wewe') {
            en.y = groundY - en.h - 35 + Math.sin(en.timer * 0.06) * 35;
          } else {
            if (en.timer % 75 === 0) {
              en.vy = -10.5;
              game.cameraShake = 6;
            }
            en.vy += 0.52;
            en.y += en.vy;
            if (en.y + en.h >= groundY) {
              en.y = groundY - en.h;
              en.vy = 0;
            }
          }

          // Boss Projectile Attack
          if (en.timer % 62 === 0) {
            const dx = (p.x + p.w / 2) - (en.x + en.w / 2);
            const dy = (p.y + p.h / 2) - (en.y + en.h * 0.45);
            const dist = Math.hypot(dx, dy) || 1;
            const spd = 6.0;
            game.enemyBullets.push({
              x: en.x + 10,
              y: en.y + en.h * 0.45,
              vx: (dx / dist) * spd,
              vy: (dy / dist) * spd,
              r: 11,
              color: en.type === 'wewe' ? '#f43f5e' : '#a3e635'
            });
            if (en.type === 'wewe' || en.type === 'genderuwo') {
              game.enemyBullets.push({
                x: en.x + 10,
                y: en.y + en.h * 0.45,
                vx: (dx / dist) * spd,
                vy: (dy / dist) * spd - 2.2,
                r: 9,
                color: '#c084fc'
              });
            }
          }
        } else {
          // Regular Demit movement
          en.x += en.vx;
          if (en.type === 'banaspati' || en.type === 'kuntilanak') {
            en.y += Math.sin(en.timer * 0.08) * 1.5;
            if (en.timer % 90 === 0) {
              const dirToPlayer = p.x < en.x ? -1 : 1;
              game.enemyBullets.push({
                x: en.x + en.w / 2,
                y: en.y + en.h * 0.5,
                vx: dirToPlayer * 5.0,
                vy: en.type === 'kuntilanak' ? 1.8 : 0,
                r: 8,
                color: en.type === 'kuntilanak' ? '#4ade80' : '#fb923c'
              });
            }
          } else if (en.type === 'tuyul' && en.timer % 75 === 0) {
            en.vy = -8.5;
          }

          if (en.type === 'babi' || en.type === 'tuyul') {
            en.vy += 0.52;
            en.y += en.vy;
            if (en.y + en.h >= groundY) {
              en.y = groundY - en.h;
              en.vy = 0;
            }
          }

          // Wrap around screen edges
          if (en.vx < 0 && en.x + en.w < -40) en.x = w + 30;
          if (en.vx > 0 && en.x > w + 40) en.x = -en.w - 30;
        }

        // Check Enemy Defeat
        if (en.hp <= 0) {
          const isBoss = en.isBoss;
          game.combo++;
          game.comboTimer = 150;
          if (game.combo > game.maxCombo) game.maxCombo = game.combo;

          const pts = (isBoss ? 600 : 100) * Math.min(5, Math.max(1, Math.floor(game.combo / 2)));
          game.score += pts;
          game.kills++;
          p.special = Math.min(100, p.special + (isBoss ? 100 : 18));

          spawnDrop(en.x + en.w / 2, en.y + en.h / 2);

          for (let k = 0; k < (isBoss ? 30 : 12); k++) {
            game.particles.push({
              x: en.x + en.w / 2,
              y: en.y + en.h / 2,
              vx: (Math.random() - 0.5) * 9,
              vy: (Math.random() - 0.5) * 9,
              r: 5 + Math.random() * 6,
              color: k % 2 === 0 ? '#d4e857' : '#c084fc',
              alpha: 1
            });
          }

          game.enemies.splice(i, 1);
          updateHud();

          if (isBoss) {
            game.bossDefeated = true;
            game.running = false;
            playSfx('win');
            showStageResultModal(true);
            return;
          }
          continue;
        }

        // Player-Enemy Contact Damage
        if (
          p.invulnTimer <= 0 &&
          p.x + p.w - 14 > en.x + 10 &&
          p.x + 14 < en.x + en.w - 10 &&
          p.y + p.h - 10 > en.y + 10 &&
          p.y + 10 < en.y + en.h - 10
        ) {
          hurtPlayer();
          if (!game.running) return;
        }
      }

      // Update Enemy Projectiles
      for (let i = game.enemyBullets.length - 1; i >= 0; i--) {
        const eb = game.enemyBullets[i];
        eb.x += eb.vx;
        eb.y += eb.vy;
        if (eb.x < -30 || eb.x > w + 30 || eb.y > h + 30) {
          game.enemyBullets.splice(i, 1);
          continue;
        }
        if (
          p.invulnTimer <= 0 &&
          eb.x + eb.r > p.x + 12 &&
          eb.x - eb.r < p.x + p.w - 12 &&
          eb.y + eb.r > p.y + 12 &&
          eb.y - eb.r < p.y + p.h - 12
        ) {
          game.enemyBullets.splice(i, 1);
          hurtPlayer();
          if (!game.running) return;
        }
      }

      // Update Collectible Pickups (Koin, Roh Orb, Jamu Heart)
      for (let i = game.pickups.length - 1; i >= 0; i--) {
        const pk = game.pickups[i];
        pk.vy += 0.42;
        pk.x += pk.vx;
        pk.y += pk.vy;
        if (pk.y + pk.r >= groundY) {
          pk.y = groundY - pk.r;
          pk.vy = -pk.vy * 0.45;
          pk.vx *= 0.7;
        }
        pk.life--;
        if (pk.life <= 0) {
          game.pickups.splice(i, 1);
          continue;
        }

        // Player Magnet & Pickup Collision
        const dx = (p.x + p.w / 2) - pk.x;
        const dy = (p.y + p.h / 2) - pk.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 95) {
          pk.x += dx * 0.12;
          pk.y += dy * 0.12;
        }
        if (dist < 42) {
          playSfx('coin');
          if (pk.kind === 'coin') {
            game.score += 50;
            game.floatingTexts.push({ x: pk.x, y: pk.y, text: '+50 🪙', color: '#facc15', life: 28 });
          } else if (pk.kind === 'roh') {
            p.special = Math.min(100, p.special + 25);
            game.floatingTexts.push({ x: pk.x, y: pk.y, text: '+25% ROH 🔮', color: '#c084fc', life: 28 });
          } else if (pk.kind === 'heart') {
            p.hp = Math.min(p.maxHp, p.hp + 1);
            game.floatingTexts.push({ x: pk.x, y: pk.y, text: '+1 HP ❤️', color: '#fb7185', life: 28 });
          }
          game.pickups.splice(i, 1);
          updateHud();
        }
      }

      // Update Particles & Floating Texts
      for (let i = game.particles.length - 1; i >= 0; i--) {
        const pt = game.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.035;
        if (pt.alpha <= 0) game.particles.splice(i, 1);
      }

      for (let i = game.floatingTexts.length - 1; i >= 0; i--) {
        const ft = game.floatingTexts[i];
        ft.y -= 0.85;
        ft.life--;
        if (ft.life <= 0) game.floatingTexts.splice(i, 1);
      }

      updateHud();
    }

    function hurtPlayer() {
      const p = game.player;
      if (!game.running || p.invulnTimer > 0) return;
      p.hp--;
      p.invulnTimer = 55;
      game.combo = 0;
      game.cameraShake = 10;
      playSfx('hit');
      game.floatingTexts.push({
        x: p.x + p.w / 2,
        y: p.y,
        text: 'ADUH! -1 ❤️',
        color: '#fb7185',
        life: 36
      });
      updateHud();

      if (p.hp <= 0) {
        game.running = false;
        showStageResultModal(false);
      }
    }

    function showStageResultModal(victory) {
      game.running = false;
      game.paused = true;
      clearInput();
      saved.set('vincy-best', Math.max(game.score, Number(saved.get('vincy-best', '0')) || 0));
      const st = STAGES_DATA[game.stageIdx];
      const modal = document.getElementById('modal-stage-result');
      document.getElementById('result-badge').textContent = victory ? `${st.chapter} SELESAI!` : 'GAME OVER';
      document.getElementById('result-title').textContent = victory ? `🎉 ${st.name} AMAN!` : 'Vincy Kehabisan Tenaga!';
      document.getElementById('result-desc').textContent = victory
        ? `Luar biasa! Vincy berhasil mengalahkan ${st.bossName} dan membersihkan ${st.name}!`
        : `Para demit di ${st.name} masih berkeliaran. Gunakan Dash [Shift] & Jurus Tasbih [E] untuk membalas mereka!`;
      document.getElementById('result-score').textContent = game.score;
      document.getElementById('result-combo').textContent = `x${game.maxCombo}`;

      const nextBtn = document.getElementById('btn-result-next');
      if (victory && game.stageIdx < STAGES_DATA.length - 1) {
        nextBtn.classList.remove('hidden');
      } else {
        nextBtn.classList.add('hidden');
      }
      modal.classList.remove('hidden');
    }

    // =========================================================================
    // 9. CANVAS RENDERER (PARALLAX STAGE, PLATFORMS, SPRITES, FX)
    // =========================================================================
    function drawGame() {
      const w = canvas.width;
      const h = canvas.height;
      const groundY = h - 56;
      const st = STAGES_DATA[game.stageIdx];
      const platforms = getStagePlatforms();

      ctx.save();
      if (game.cameraShake > 0.5 && !reducedMotion.matches) {
        ctx.translate(
          (Math.random() - 0.5) * game.cameraShake,
          (Math.random() - 0.5) * game.cameraShake
        );
      }

      ctx.clearRect(0, 0, w, h);

      // 1. Stage Background with subtle parallax
      const bgImg = gameImages[st.bgKey];
      if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
        ctx.drawImage(bgImg, 0, 0, w, groundY);
      } else {
        ctx.fillStyle = '#0f1e19';
        ctx.fillRect(0, 0, w, groundY);
      }

      ctx.fillStyle = st.skyTint;
      ctx.fillRect(0, 0, w, groundY);

      // 2. Floating Mystical Fireflies
      game.fireflies.forEach(f => {
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(f.phase) * 0.35;
        ctx.fillStyle = '#d4e857';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Elevated Platforms
      platforms.forEach(plat => {
        ctx.fillStyle = st.platformColor;
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        ctx.fillStyle = st.platformBorder;
        ctx.fillRect(plat.x, plat.y, plat.w, 3);
      });

      // 4. Main Ground Floor
      ctx.fillStyle = st.groundColor;
      ctx.fillRect(0, groundY, w, h - groundY);
      ctx.fillStyle = st.platformBorder;
      ctx.fillRect(0, groundY, w, 4);

      // 5. Dash Afterimages
      game.afterimages.forEach(ai => {
        const pImg = gameImages.vincyIdle;
        if (!pImg || !pImg.complete) return;
        ctx.save();
        ctx.globalAlpha = ai.alpha;
        if (!ai.facingRight) {
          ctx.translate(ai.x + ai.w, ai.y);
          ctx.scale(-1, 1);
          ctx.drawImage(pImg, 0, 0, ai.w, ai.h);
        } else {
          ctx.drawImage(pImg, ai.x, ai.y, ai.w, ai.h);
        }
        ctx.restore();
      });

      // 6. Collectible Pickups
      game.pickups.forEach(pk => {
        ctx.save();
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const icon = pk.kind === 'coin' ? '🪙' : pk.kind === 'roh' ? '🔮' : '❤️';
        ctx.fillText(icon, pk.x, pk.y);
        ctx.restore();
      });

      // 7. Player (Vincy)
      const p = game.player;
      if (p.invulnTimer % 4 < 2) {
        const isShooting = p.shootPoseTimer > 0;
        const pImg = isShooting ? gameImages.vincyShoot : gameImages.vincyIdle;
        const drawW = isShooting ? p.w * 1.42 : p.w;

        ctx.save();
        if (!p.facingRight) {
          ctx.translate(p.x + p.w, p.y);
          ctx.scale(-1, 1);
          if (pImg && pImg.complete && pImg.naturalWidth > 0) {
            ctx.drawImage(pImg, 0, 0, drawW, p.h);
          }
        } else {
          if (pImg && pImg.complete && pImg.naturalWidth > 0) {
            ctx.drawImage(pImg, p.x, p.y, drawW, p.h);
          }
        }
        ctx.restore();
      }

      // 8. Enemies & Bosses
      game.enemies.forEach(en => {
        const eImg = gameImages[en.type];
        ctx.save();
        // Flip sprite if moving right (since enemy sprites face left by default)
        if (en.vx > 0 && !en.isBoss) {
          ctx.translate(en.x + en.w, en.y);
          ctx.scale(-1, 1);
          if (eImg && eImg.complete && eImg.naturalWidth > 0) {
            ctx.drawImage(eImg, 0, 0, en.w, en.h);
          }
        } else {
          if (eImg && eImg.complete && eImg.naturalWidth > 0) {
            ctx.drawImage(eImg, en.x, en.y, en.w, en.h);
          }
        }
        ctx.restore();

        // Regular enemy mini HP bar
        if (!en.isBoss) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(en.x + 8, en.y - 10, en.w - 16, 5);
          ctx.fillStyle = '#d4e857';
          ctx.fillRect(en.x + 8, en.y - 10, ((en.w - 16) * Math.max(0, en.hp)) / en.maxHp, 5);
        }
      });

      // 9. Player Projectiles
      game.bullets.forEach(b => {
        ctx.save();
        const grad = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, b.r * 1.4);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.55, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 10. Enemy Projectiles
      game.enemyBullets.forEach(eb => {
        ctx.save();
        ctx.fillStyle = eb.color;
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, eb.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // 11. Particles & Floating Combat Texts
      game.particles.forEach(pt => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      game.floatingTexts.forEach(ft => {
        ctx.save();
        ctx.fillStyle = ft.color;
        ctx.font = ft.big ? 'bold 20px Fredoka, sans-serif' : 'bold 13px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 6;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      });

      ctx.restore();
    }

    let lastFrame = 0;
    let accumulatedTime = 0;
    function mainLoop(timestamp) {
      const elapsed = lastFrame ? Math.max(0, Math.min(timestamp - lastFrame, 100)) : 0;
      lastFrame = timestamp;
      if (game.running && !game.paused) {
        accumulatedTime += elapsed;
        while (accumulatedTime >= 1000 / 60 && game.running && !game.paused) {
          updateGame();
          accumulatedTime -= 1000 / 60;
        }
      } else accumulatedTime = 0;
      drawGame();
      requestAnimationFrame(mainLoop);
    }

    // =========================================================================
    // 10. UI MODALS (WORLD MAP, CODEX, TITLE SCREEN) & INPUT BINDINGS
    // =========================================================================
    let selectedMapIdx = 0;
    function updateMapModalInfo(idx) {
      selectedMapIdx = idx;
      const st = STAGES_DATA[idx];
      document.getElementById('map-info-chapter').textContent = st.chapter;
      document.getElementById('map-info-stars').textContent = `Tingkat Bahaya: ${st.stars}`;
      document.getElementById('map-info-img').src = st.bgSrc;
      document.getElementById('map-info-title').textContent = st.titleId;
      document.getElementById('map-info-desc').textContent = st.desc;
      document.getElementById('map-info-demits').textContent = st.demitsText;
      document.getElementById('map-info-boss').textContent = st.bossName;
    }

    document.querySelectorAll('.map-pin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-map-idx'), 10);
        playSfx('jump');
        updateMapModalInfo(idx);
      });
    });

    document.getElementById('btn-map-launch').addEventListener('click', () => {
      launchStage(selectedMapIdx);
    });

    // Codex Modal Renderer
    let codexShowConcept = false;
    function renderCodexModal() {
      const grid = document.getElementById('codex-grid');
      grid.innerHTML = CODEX_DATA.map(item => {
        const imgSrc = codexShowConcept ? item.compare : item.sprite;
        const imgStyle = codexShowConcept
          ? 'w-full h-48 object-contain rounded-lg mix-blend-multiply'
          : 'h-36 w-auto mx-auto object-contain drop-shadow-md';
        return `
          <div class="parchment-panel rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#bfa97a]">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1f332c] text-[#d4e857]">
                  ${item.role}
                </span>
                <span class="text-[11px] font-bold text-purple-900">⚡ ${item.skill}</span>
              </div>
              <div class="bg-[#e3d5b1] rounded-xl p-2 mb-3 flex items-center justify-center min-h-[155px] border border-[#c8b588]">
                <img src="${imgSrc}" alt="${item.name}" class="${imgStyle}" />
              </div>
              <h3 class="font-display text-lg font-bold text-[#182620]">${item.name}</h3>
              <p class="text-xs text-[#3b301f] mt-1 leading-relaxed">${item.desc}</p>
            </div>
          </div>
        `;
      }).join('');
    }

    document.getElementById('btn-codex-toggle-art').addEventListener('click', () => {
      codexShowConcept = !codexShowConcept;
      document.getElementById('btn-codex-toggle-art').textContent = codexShowConcept
        ? '👾 Lihat Game Sprite'
        : '✏️ Lihat Sketsa + Concept Art';
      renderCodexModal();
    });

    // Modal Open/Close Buttons
    document.getElementById('btn-title-play').addEventListener('click', () => {
      if (game.running) resumeGame();
      else launchStage(game.stageIdx);
    });

    function clearInput() {
      Object.keys(keys).forEach(key => { keys[key] = false; });
    }

    function resumeGame() {
      clearInput();
      ['modal-title-screen', 'modal-world-map', 'modal-codex'].forEach(id => document.getElementById(id).classList.add('hidden'));
      game.paused = false;
      accumulatedTime = 0;
      lastFrame = performance.now();
      canvas.focus({ preventScroll: true });
    }

    function pauseGame() {
      if (!game.running) return;
      game.paused = true;
      clearInput();
      document.getElementById('title-play-label').textContent = 'LANJUTKAN PERMAINAN';
      document.getElementById('modal-world-map').classList.add('hidden');
      document.getElementById('modal-codex').classList.add('hidden');
      document.getElementById('modal-title-screen').classList.remove('hidden');
      document.getElementById('btn-title-play').focus({ preventScroll: true });
    }

    function closePanel(id) {
      document.getElementById(id).classList.add('hidden');
      clearInput();
      const titleVisible = !document.getElementById('modal-title-screen').classList.contains('hidden');
      if (game.running && !titleVisible) resumeGame();
      else document.getElementById('btn-title-play').focus({ preventScroll: true });
    }

    const openMapModal = () => {
      clearInput();
      document.getElementById('modal-codex').classList.add('hidden');
      game.paused = true;
      updateMapModalInfo(game.stageIdx);
      document.getElementById('modal-world-map').classList.remove('hidden');
    };
    document.getElementById('btn-title-map').addEventListener('click', openMapModal);
    document.getElementById('btn-open-map').addEventListener('click', openMapModal);
    document.getElementById('btn-close-map').addEventListener('click', () => {
      closePanel('modal-world-map');
    });

    const openCodexModal = () => {
      clearInput();
      document.getElementById('modal-world-map').classList.add('hidden');
      game.paused = true;
      renderCodexModal();
      document.getElementById('modal-codex').classList.remove('hidden');
    };
    document.getElementById('btn-title-codex').addEventListener('click', openCodexModal);
    document.getElementById('btn-open-codex').addEventListener('click', openCodexModal);
    document.getElementById('btn-close-codex').addEventListener('click', () => {
      closePanel('modal-codex');
    });

    document.getElementById('btn-pause-menu').addEventListener('click', () => {
      if (game.running && !game.paused) pauseGame();
      else if (game.running) resumeGame();
    });

    // Result Modal Buttons
    document.getElementById('btn-result-next').addEventListener('click', () => {
      const nextIdx = Math.min(STAGES_DATA.length - 1, game.stageIdx + 1);
      launchStage(nextIdx, true);
    });
    document.getElementById('btn-result-retry').addEventListener('click', () => {
      launchStage(game.stageIdx);
    });
    document.getElementById('btn-result-title').addEventListener('click', () => {
      document.getElementById('modal-stage-result').classList.add('hidden');
      document.getElementById('modal-title-screen').classList.remove('hidden');
      document.getElementById('title-play-label').textContent = 'MULAI MAIN';
    });

    // Audio Toggle
    document.getElementById('btn-audio-toggle').addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      saved.set('vincy-muted', !soundEnabled);
      document.getElementById('audio-icon').textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) playSfx('coin');
    });

    // Keyboard Controls
    window.addEventListener('keydown', e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Escape' || e.code === 'KeyP') {
        e.preventDefault();
        if (e.repeat) return;
        const panel = ['modal-codex', 'modal-world-map'].find(id => !document.getElementById(id).classList.contains('hidden'));
        if (panel) closePanel(panel);
        else if (game.running && game.paused) resumeGame();
        else pauseGame();
        return;
      }
      if (!game.running || game.paused) return;
      if (e.repeat && ['KeyW', 'ArrowUp', 'KeyQ', 'KeyE', 'KeyK'].includes(e.code)) return;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.down = true;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') triggerJump();
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyL') triggerDash();
      if (e.code === 'Space' || e.code === 'KeyJ') {
        keys.shoot = true;
        fireWeapon();
      }
      if (e.code === 'KeyE' || e.code === 'KeyK') triggerSpecialBlast();
      if (e.code === 'KeyQ') selectWeapon((game.player.weaponIdx + 1) % WEAPONS.length);
      if (e.code === 'Digit1') selectWeapon(0);
      if (e.code === 'Digit2') selectWeapon(1);
      if (e.code === 'Digit3') selectWeapon(2);
    });

    window.addEventListener('keyup', e => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
      if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.down = false;
      if (e.code === 'Space' || e.code === 'KeyJ') keys.shoot = false;
    });

    // Canvas Pointer Click/Hold to Shoot
    canvas.addEventListener('pointerdown', e => {
      if (!game.running || game.paused) return;
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
      const offset = (rect.width - canvas.width * scale) / 2;
      const clickX = (e.clientX - rect.left - offset) / scale;
      game.player.facingRight = clickX >= game.player.x + game.player.w / 2;
      keys.shoot = true;
      fireWeapon();
    });
    window.addEventListener('pointerup', () => { keys.shoot = false; });

    // On-screen Arcade Gamepad Buttons
    const bindHold = (id, keyProp) => {
      const btn = document.getElementById(id);
      btn.addEventListener('pointerdown', e => { e.preventDefault(); btn.setPointerCapture(e.pointerId); keys[keyProp] = true; });
      btn.addEventListener('pointerup', () => { keys[keyProp] = false; });
      btn.addEventListener('pointerleave', () => { keys[keyProp] = false; });
      btn.addEventListener('pointercancel', () => { keys[keyProp] = false; });
      btn.addEventListener('lostpointercapture', () => { keys[keyProp] = false; });
    };
    bindHold('pad-left', 'left');
    bindHold('pad-right', 'right');
    bindHold('pad-down', 'down');
    bindHold('pad-shoot', 'shoot');

    document.getElementById('pad-jump').addEventListener('pointerdown', e => { e.preventDefault(); triggerJump(); });
    document.getElementById('pad-dash').addEventListener('pointerdown', e => { e.preventDefault(); triggerDash(); });
    document.getElementById('pad-shoot').addEventListener('pointerdown', e => { e.preventDefault(); fireWeapon(); });
    document.getElementById('pad-special').addEventListener('pointerdown', e => { e.preventDefault(); triggerSpecialBlast(); });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('blur', () => { clearInput(); pauseGame(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) { clearInput(); pauseGame(); } });
    document.getElementById('btn-mobile-weapon').addEventListener('click', () => selectWeapon((game.player.weaponIdx + 1) % WEAPONS.length));
    document.getElementById('btn-restart').addEventListener('click', () => launchStage(game.stageIdx));
    document.getElementById('btn-fullscreen').addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch { document.getElementById('btn-fullscreen').title = 'Layar penuh tidak tersedia di browser ini'; }
    });

    window.onload = async () => {
      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
      resizeCanvas();
      resetStage(0, true);
      renderCodexModal();
      document.getElementById('audio-icon').textContent = soundEnabled ? '🔊' : '🔇';
      const startButton = document.getElementById('btn-title-play');
      startButton.disabled = true;
      document.getElementById('title-play-label').textContent = 'MEMUAT ASET…';
      try {
        await Promise.all(Object.values(gameImages).map(image => image.decode()));
        startButton.disabled = false;
        document.getElementById('title-play-label').textContent = 'MULAI MAIN';
      } catch {
        document.getElementById('title-play-label').textContent = 'Aset gagal dimuat. Muat ulang halaman.';
      }
      requestAnimationFrame(mainLoop);
    };
  
