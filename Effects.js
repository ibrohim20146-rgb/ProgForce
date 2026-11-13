'use strict';

/* ============ ЭФФЕКТЫ / EFFECTS ============
   Анимации поверх сайта (9 штук): снег, дождь, гроза, звёзды, метеоры,
   угольки, листопад, конфетти и «матрица».
   Каждый эффект рисуется на своём прозрачном canvas (pointer-events: none — клики проходят сквозь).
   API:  FX.set(['snow','rain'])  — включить именно эти эффекты (остальные выключаются)
         FX.list                  — список доступных эффектов
   Чтобы добавить свой эффект: добавьте объект в EFFECTS (init / frame) и иконку в App.js (FX_ICONS). */
(function () {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const isLight = () => document.documentElement.dataset.theme === 'light';
  const TAU = Math.PI * 2;
  const pick = arr => arr[(Math.random() * arr.length) | 0];

  /* Каждый эффект: init(w, h) — создать частицы; frame(ctx, w, h, dt) — нарисовать кадр.
     fade: 0 — холст очищается каждый кадр; число — «шлейф» (прозрачность затухания). */
  const EFFECTS = {
    /* ---------- Снег: бесконечно падает сверху ---------- */
    snow: {
      init(w, h) {
        const n = Math.min(220, Math.round(w * h / 9000));
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
      },
      make(w, h, anywhere) {
        const r = rnd(1.2, 4.2);
        return { x: rnd(0, w), y: anywhere ? rnd(0, h) : rnd(-30, -4), r, vy: 25 + r * 14 + rnd(0, 20), amp: rnd(8, 30), ph: rnd(0, 6.28), fr: rnd(0.4, 1.2), a: rnd(0.55, 1) };
      },
      frame(ctx, w, h, dt, t) {
        const light = isLight();
        ctx.fillStyle = light ? '#ffffff' : '#ffffff';
        ctx.shadowColor = light ? 'rgba(70,120,190,.85)' : 'rgba(180,215,255,.9)';
        ctx.shadowBlur = light ? 3 : 6;
        for (const s of this.p) {
          s.y += s.vy * dt;
          const x = s.x + Math.sin(t * s.fr + s.ph) * s.amp;
          if (s.y - s.r > h) { Object.assign(s, this.make(w, h, false)); }
          ctx.globalAlpha = s.a;
          ctx.beginPath(); ctx.arc(x, s.y, s.r, 0, 6.2832); ctx.fill();
        }
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }
    },

    /* ---------- Дождь ---------- */
    rain: {
      init(w, h) {
        const n = Math.min(260, Math.round(w * h / 7000));
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
      },
      make(w, h, anywhere) {
        return { x: rnd(-60, w), y: anywhere ? rnd(0, h) : rnd(-60, -5), len: rnd(10, 22), v: rnd(700, 1100), a: rnd(0.25, 0.6) };
      },
      frame(ctx, w, h, dt) {
        ctx.lineWidth = 1.3; ctx.lineCap = 'round';
        const col = isLight() ? '40,90,170' : '150,195,255';
        for (const d of this.p) {
          d.y += d.v * dt; d.x += d.v * dt * 0.18;
          if (d.y > h + 20) Object.assign(d, this.make(w, h, false));
          ctx.strokeStyle = 'rgba(' + col + ',' + d.a + ')';
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.len * 0.18, d.y - d.len); ctx.stroke();
        }
      }
    },

    /* ---------- Звёзды: мерцают, иногда летит падающая ---------- */
    stars: {
      init(w, h) {
        const n = Math.min(170, Math.round(w * h / 9000));
        this.p = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), r: rnd(0.6, 2.2), ph: rnd(0, 6.28), sp: rnd(0.8, 2.6) }));
        this.shoot = null; this.next = rnd(1, 3);
      },
      frame(ctx, w, h, dt, t) {
        const col = isLight() ? '224,160,0' : '255,248,200';
        for (const s of this.p) {
          const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
          ctx.fillStyle = 'rgba(' + col + ',' + a + ')';
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
          if (s.r > 1.7) {                                  // у крупных звёзд — лучики
            ctx.strokeStyle = 'rgba(' + col + ',' + a * 0.6 + ')'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(s.x - s.r * 3, s.y); ctx.lineTo(s.x + s.r * 3, s.y);
            ctx.moveTo(s.x, s.y - s.r * 3); ctx.lineTo(s.x, s.y + s.r * 3); ctx.stroke();
          }
        }
        this.next -= dt;
        if (!this.shoot && this.next <= 0) {
          this.shoot = { x: rnd(w * 0.2, w), y: rnd(0, h * 0.4), vx: -rnd(500, 800), vy: rnd(250, 400), life: 1 };
          this.next = rnd(2.5, 6);
        }
        if (this.shoot) {
          const s = this.shoot; s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 1.1;
          if (s.life <= 0) this.shoot = null;
          else {
            const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.12, s.y - s.vy * 0.12);
            g.addColorStop(0, 'rgba(' + col + ',' + s.life + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
            ctx.strokeStyle = g; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 0.12, s.y - s.vy * 0.12); ctx.stroke();
          }
        }
      }
    },

    /* ---------- «Матрица»: падающие столбцы символов со шлейфом ---------- */
    matrix: {
      fade: 0.09,
      chars: 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789{}[]()<>/=+*&#;'.split(''),
      init(w, h) {
        this.size = 16;
        this.cols = Math.ceil(w / this.size);
        this.y = Array.from({ length: this.cols }, () => rnd(-h / this.size, 0));
        this.v = Array.from({ length: this.cols }, () => rnd(8, 22));
      },
      frame(ctx, w, h, dt) {
        ctx.font = this.size + 'px ui-monospace, Menlo, Consolas, monospace';
        const col = isLight() ? '#0a7a3e' : '#3dff8f';
        for (let i = 0; i < this.cols; i++) {
          this.y[i] += this.v[i] * dt;
          const row = Math.floor(this.y[i]);
          if (row < 0) continue;
          const ch = this.chars[(Math.random() * this.chars.length) | 0];
          ctx.fillStyle = '#e8fff1'; ctx.fillText(ch, i * this.size, row * this.size);   // светлая «голова»
          ctx.fillStyle = col; ctx.fillText(this.chars[(Math.random() * this.chars.length) | 0], i * this.size, (row - 1) * this.size);
          if (row * this.size > h && Math.random() > 0.975) { this.y[i] = rnd(-20, 0); this.v[i] = rnd(8, 22); }
        }
      }
    },

    /* ---------- Конфетти ---------- */
    confetti: {
      colors: ['#ff5d73', '#ffc233', '#3dd68c', '#58a6ff', '#b48cff', '#ff9f43'],
      init(w, h) {
        const n = Math.min(150, Math.round(w * h / 12000));
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
      },
      make(w, h, anywhere) {
        return { x: rnd(0, w), y: anywhere ? rnd(0, h) : rnd(-30, -5), w: rnd(6, 11), h: rnd(3, 6), vy: rnd(60, 140), amp: rnd(10, 40), ph: rnd(0, 6.28), rot: rnd(0, 6.28), vr: rnd(-4, 4), c: this.colors[(Math.random() * this.colors.length) | 0] };
      },
      frame(ctx, w, h, dt, t) {
        for (const c of this.p) {
          c.y += c.vy * dt; c.rot += c.vr * dt;
          if (c.y > h + 20) Object.assign(c, this.make(w, h, false));
          ctx.save();
          ctx.translate(c.x + Math.sin(t * 1.2 + c.ph) * c.amp, c.y); ctx.rotate(c.rot);
          ctx.scale(1, Math.abs(Math.cos(t * 2 + c.ph)) * 0.8 + 0.2);        // кувыркание
          ctx.fillStyle = c.c; ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          ctx.restore();
        }
      }
    },

    /* ---------- Гроза: ливень + редкие молнии (вспышка мягкая, без стробоскопа) ---------- */
    storm: {
      init(w, h) {
        const n = Math.min(330, Math.round(w * h / 5500));
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
        this.bolt = null; this.flash = 0; this.next = rnd(1.5, 4);
      },
      make(w, h, anywhere) {
        return { x: rnd(-120, w), y: anywhere ? rnd(0, h) : rnd(-60, -5), len: rnd(14, 30), v: rnd(1000, 1500), a: rnd(0.3, 0.7) };
      },
      zig(x, y, yEnd, dx) {
        const pts = [[x, y]];
        while (y < yEnd) { y += rnd(22, 55); x += rnd(-dx, dx); pts.push([x, y]); }
        return pts;
      },
      frame(ctx, w, h, dt) {
        const light = isLight();
        ctx.lineWidth = 1.4; ctx.lineCap = 'round';
        const col = light ? '35,70,150' : '170,200,245';
        for (const d of this.p) {
          d.y += d.v * dt; d.x += d.v * dt * 0.25;
          if (d.y > h + 20) Object.assign(d, this.make(w, h, false));
          ctx.strokeStyle = 'rgba(' + col + ',' + d.a + ')';
          ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.len * 0.25, d.y - d.len); ctx.stroke();
        }
        this.next -= dt;
        if (this.next <= 0 && !this.bolt) {
          const main = this.zig(rnd(w * 0.15, w * 0.85), 0, h * rnd(0.45, 0.8), 40);
          const from = main[(main.length * rnd(0.3, 0.7)) | 0];
          const branch = Math.random() < 0.6 ? this.zig(from[0], from[1], from[1] + h * 0.18, 35) : null;
          this.bolt = { main, branch, life: 1 }; this.flash = 1; this.next = rnd(3, 8);
        }
        if (this.bolt) {
          const b = this.bolt; b.life -= dt * 2.2;
          if (b.life <= 0) this.bolt = null;
          else {
            ctx.strokeStyle = 'rgba(' + (light ? '90,110,230' : '255,255,255') + ',' + b.life + ')';
            ctx.shadowColor = 'rgba(150,180,255,1)'; ctx.shadowBlur = 18; ctx.lineJoin = 'round';
            for (const [pts, lw] of [[b.main, 2.6], [b.branch, 1.4]]) {
              if (!pts) continue;
              ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
              for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
              ctx.stroke();
            }
            ctx.shadowBlur = 0;
          }
        }
        if (this.flash > 0) {
          this.flash -= dt * 1.8;
          ctx.fillStyle = 'rgba(' + (light ? '110,130,200' : '200,215,255') + ',' + Math.max(0, this.flash) * 0.14 + ')';
          ctx.fillRect(0, 0, w, h);
        }
      }
    },

    /* ---------- Метеоритный дождь ---------- */
    meteors: {
      init() { this.p = []; this.next = 0.3; },
      frame(ctx, w, h, dt) {
        const light = isLight(), col = light ? '40,70,190' : '210,230,255';
        this.next -= dt;
        if (this.next <= 0 && this.p.length < 14) {
          const sp = rnd(700, 1200), ang = rnd(0.55, 0.9);
          this.p.push({ x: rnd(w * 0.15, w * 1.1), y: rnd(-40, h * 0.4), vx: -Math.cos(ang) * sp, vy: Math.sin(ang) * sp, len: rnd(0.1, 0.18), life: 1, dec: rnd(0.55, 0.9) });
          this.next = rnd(0.12, 0.5);
        }
        ctx.lineCap = 'round'; ctx.lineWidth = 2.2;
        for (let i = this.p.length - 1; i >= 0; i--) {
          const m = this.p[i]; m.x += m.vx * dt; m.y += m.vy * dt; m.life -= dt * m.dec;
          if (m.life <= 0 || m.x < -200 || m.y > h + 200) { this.p.splice(i, 1); continue; }
          const tx = m.x - m.vx * m.len, ty = m.y - m.vy * m.len, g = ctx.createLinearGradient(m.x, m.y, tx, ty);
          g.addColorStop(0, 'rgba(' + col + ',' + m.life + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
          ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
          ctx.fillStyle = 'rgba(' + (light ? col : '255,255,255') + ',' + m.life + ')';
          ctx.shadowColor = 'rgba(' + col + ',1)'; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(m.x, m.y, 2, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
        }
      }
    },

    /* ---------- Угольки: поднимаются вверх, мерцают ---------- */
    embers: {
      init(w, h) {
        const n = Math.min(90, Math.round(w * h / 16000) + 10);
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
      },
      make(w, h, anywhere) {
        return { x: rnd(0, w), y: anywhere ? rnd(0, h) : h + rnd(5, 40), r: rnd(1.1, 3.2), vy: rnd(40, 130), amp: rnd(6, 28), ph: rnd(0, TAU), fr: rnd(0.8, 2.2), hue: rnd(15, 48), fl: rnd(4, 9) };
      },
      frame(ctx, w, h, dt, t) {
        const light = isLight();
        for (const e of this.p) {
          e.y -= e.vy * dt;
          if (e.y < -10) Object.assign(e, this.make(w, h, false));
          const a = Math.min(1, e.y / (h * 0.5) + 0.15) * (0.55 + 0.45 * Math.sin(t * e.fl + e.ph));
          ctx.fillStyle = 'hsla(' + e.hue + ',100%,' + (light ? 50 : 60) + '%,' + a + ')';
          ctx.shadowColor = 'hsla(' + e.hue + ',100%,55%,.9)'; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(e.x + Math.sin(t * e.fr + e.ph) * e.amp, e.y, e.r, 0, TAU); ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    },

    /* ---------- Листопад ---------- */
    leaves: {
      colors: ['#d9531e', '#e8892b', '#f2b134', '#b5381f', '#8c5a2b', '#c9a227'],
      init(w, h) {
        const n = Math.min(55, Math.round(w * h / 24000) + 8);
        this.p = Array.from({ length: n }, () => this.make(w, h, true));
      },
      make(w, h, anywhere) {
        return { x: rnd(0, w), y: anywhere ? rnd(0, h) : rnd(-40, -10), s: rnd(8, 15), vy: rnd(35, 80), amp: rnd(20, 60), ph: rnd(0, TAU), fr: rnd(0.6, 1.4), rot: rnd(0, TAU), vr: rnd(-0.6, 0.6), c: pick(this.colors), fl: rnd(0, TAU), ff: rnd(1, 2.4) };
      },
      frame(ctx, w, h, dt, t) {
        for (const s of this.p) {
          s.y += s.vy * dt; s.rot += s.vr * dt;
          if (s.y - s.s * 2 > h) Object.assign(s, this.make(w, h, false));
          const sw = Math.sin(t * s.fr + s.ph), r = s.s;
          ctx.save();
          ctx.translate(s.x + sw * s.amp, s.y); ctx.rotate(s.rot + sw * 0.9); ctx.scale(Math.abs(Math.cos(t * s.ff + s.fl)) * 0.6 + 0.4, 1);
          ctx.fillStyle = s.c;
          ctx.beginPath(); ctx.moveTo(0, -r * 1.3);
          ctx.bezierCurveTo(r * 1.1, -r * 0.7, r * 0.9, r * 0.7, 0, r * 1.1);
          ctx.bezierCurveTo(-r * 0.9, r * 0.7, -r * 1.1, -r * 0.7, 0, -r * 1.3);
          ctx.fill();
          ctx.strokeStyle = 'rgba(60,25,5,.35)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, -r * 1.3); ctx.lineTo(0, r * 1.6); ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  /* ---------- движок ---------- */
  const layers = {};            // имя -> { canvas, ctx, fx, w, h }
  let raf = 0, last = 0, clock = 0;

  function size(L) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    L.w = window.innerWidth; L.h = window.innerHeight;
    L.canvas.width = Math.round(L.w * dpr); L.canvas.height = Math.round(L.h * dpr);
    L.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    L.fx.init(L.w, L.h);
  }

  function loop(now) {
    raf = 0;
    if (!Object.keys(layers).length) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now; clock += dt;
    for (const name in layers) {
      const L = layers[name];
      if (L.fx.fade) { L.ctx.globalCompositeOperation = 'destination-out'; L.ctx.fillStyle = 'rgba(0,0,0,' + L.fx.fade + ')'; L.ctx.fillRect(0, 0, L.w, L.h); L.ctx.globalCompositeOperation = 'source-over'; }
      else L.ctx.clearRect(0, 0, L.w, L.h);
      L.fx.frame(L.ctx, L.w, L.h, dt, clock);
    }
    raf = requestAnimationFrame(loop);
  }

  function on(name) {
    if (layers[name] || !EFFECTS[name]) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'fx-layer fx-' + name;
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const L = layers[name] = { canvas, ctx: canvas.getContext('2d'), fx: Object.create(EFFECTS[name]) };
    size(L);
  }
  function off(name) {
    const L = layers[name];
    if (!L) return;
    if (L.fx.destroy) L.fx.destroy();
    L.canvas.remove(); delete layers[name];
  }

  function set(names) {
    const want = (names || []).filter(n => EFFECTS[n]);
    Object.keys(layers).forEach(n => { if (!want.includes(n)) off(n); });
    want.forEach(on);
    if (want.length && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
  }

  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => Object.keys(layers).forEach(n => size(layers[n])), 150);
  });

  window.FX = { set, list: Object.keys(EFFECTS) };
})();
