/* =====================================================
   DEMO34 // CLASSIFIED ARCHIVE — script.js
   ===================================================== */

// ── BOOT SEQUENCE ──────────────────────────────────────
const BOOT_LINES = [
  "INITIALIZING SECURE KERNEL...",
  "LOADING ENCRYPTED MODULES...",
  "CHECKING INTEGRITY: [████████████] 100%",
  "ESTABLISHING SECURE CHANNEL...",
  "FIREWALL STATUS: ACTIVE",
  "THREAT DETECTION: ARMED",
  "NODE CONNECTION: ESTABLISHED",
  "WARNING: UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE",
  "LOADING CLASSIFIED DATABASE...",
  "FILE: DEMO34.DAT — FOUND",
  "DECRYPTING HEADER... DONE",
  "AUTHORIZATION REQUIRED FOR FULL ACCESS",
  "",
  "> SYSTEM READY. AWAITING CREDENTIALS."
];

let bootIndex = 0;
const bootLinesEl  = document.getElementById('boot-lines');
const bootScreen   = document.getElementById('boot-screen');
const mainSite     = document.getElementById('main-site');

function typeLine(text, callback) {
  let i = 0;
  const line = document.createElement('div');
  bootLinesEl.appendChild(line);

  if (text === "") {
    line.innerHTML = "&nbsp;";
    setTimeout(callback, 80);
    return;
  }

  const timer = setInterval(() => {
    line.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(callback, 60);
    }
  }, 22);
}

function runBoot() {
  if (bootIndex < BOOT_LINES.length) {
    typeLine(BOOT_LINES[bootIndex], () => {
      bootIndex++;
      // Scroll to bottom
      bootLinesEl.scrollTop = bootLinesEl.scrollHeight;
      runBoot();
    });
  } else {
    // Brief pause then reveal main site
    setTimeout(() => {
      bootScreen.style.transition = 'opacity .6s ease';
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        mainSite.classList.remove('hidden');
        startParticles();
      }, 600);
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', runBoot);

// ── PARTICLES ──────────────────────────────────────────
function startParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT  = 70;
  const COLORS = ['#00ffe7', '#ff0033', '#39ff14', '#ff8c00'];

  const particles = Array.from({ length: COUNT }, () => ({
    x:    Math.random() * canvas.width,
    y:    Math.random() * canvas.height,
    vx:   (Math.random() - .5) * .4,
    vy:   (Math.random() - .5) * .4,
    r:    Math.random() * 1.5 + .4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * .5 + .15
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,255,231,${(.12 * (1 - d / 120)).toFixed(3)})`;
          ctx.lineWidth = .4;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ── PASSWORD CHECK ──────────────────────────────────────
const CORRECT_PASSWORD = 'DIVIAR';

function checkPassword() {
  const input = document.getElementById('password-input').value.trim().toUpperCase();
  const errorEl = document.getElementById('error-msg');

  if (input === CORRECT_PASSWORD) {
    errorEl.classList.add('hidden');
    openAccessGranted();
  } else {
    errorEl.classList.remove('hidden');
    // re-trigger shake
    errorEl.style.animation = 'none';
    requestAnimationFrame(() => {
      errorEl.style.animation = '';
    });
    // Flash the input
    const wrap = document.querySelector('.input-wrap');
    wrap.style.borderColor = '#ff0033';
    wrap.style.boxShadow   = '0 0 12px #ff003380';
    setTimeout(() => {
      wrap.style.borderColor = '';
      wrap.style.boxShadow   = '';
    }, 800);
    document.getElementById('password-input').value = '';
  }
}

// Allow Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('password-input') === document.activeElement) {
    checkPassword();
  }
});

// ── ACCESS GRANTED SEQUENCE ─────────────────────────────
const ACCESS_LINES = [
  "VERIFYING CREDENTIALS...",
  "CHECKING SECURITY CLEARANCE...",
  "DECRYPTING DATABASE HEADER...",
  "BYPASSING SECONDARY FIREWALL...",
  "LOADING CLASSIFIED FILES...",
  "ACCESS LEVEL: Ω — GRANTED",
  ""
];

function openAccessGranted() {
  const screen    = document.getElementById('access-screen');
  const linesEl   = document.getElementById('access-lines');
  const grantedEl = document.getElementById('access-granted');

  screen.classList.remove('hidden');

  let idx = 0;

  function nextLine() {
    if (idx < ACCESS_LINES.length) {
      const line = document.createElement('div');
      line.textContent = ACCESS_LINES[idx];
      linesEl.appendChild(line);
      idx++;
      setTimeout(nextLine, 280);
    } else {
      setTimeout(() => {
        linesEl.style.transition  = 'opacity .5s';
        linesEl.style.opacity     = '0';
        grantedEl.classList.remove('hidden');
        grantedEl.style.opacity   = '0';
        grantedEl.style.transform = 'translateY(20px)';
        grantedEl.style.transition= 'opacity .7s ease, transform .7s ease';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            grantedEl.style.opacity   = '1';
            grantedEl.style.transform = 'translateY(0)';
          });
        });
      }, 400);
    }
  }
  nextLine();
}

// ── LOGOUT ─────────────────────────────────────────────
function logout() {
  const screen = document.getElementById('access-screen');
  screen.style.transition = 'opacity .5s';
  screen.style.opacity    = '0';
  setTimeout(() => {
    screen.classList.add('hidden');
    screen.style.opacity = '';
    document.getElementById('access-lines').innerHTML = '';
    document.getElementById('access-granted').classList.add('hidden');
    document.getElementById('password-input').value = '';
  }, 500);
}
