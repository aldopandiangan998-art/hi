/**
 * ==========================================================================
 * Birthday Website - Interactive & Configuration Script
 * Single Page, Native Vanilla JS (No External Libraries)
 * ==========================================================================
 */

(function () {
  'use strict';

  /**
   * --------------------------------------------------------------------------
   * 1. CONFIG: Data yang Dapat Diubah (Ganti sesuai kebutuhan di sini)
   * --------------------------------------------------------------------------
   * Panduan singkat:
   * - name         : Nama panggilan kakak (contoh: "Kak Sarah" atau "Kak [Nama]")
   * - age          : Usia kakak saat ini/baru (contoh: "25" atau kosongkan "" jika tidak ingin ditampilkan)
   * - birthdayDate : Tanggal ulang tahun dalam format "YYYY-MM-DD" untuk fitur status & hitung mundur
   * - headline     : Kalimat sapaan utama di hero
   * - tagline      : Kalimat deskripsi pendek di bawah sapaan utama
   * - message      : 2 sampai 4 paragraf pesan doa dan ucapan pribadi
   * - senderName   : Nama pengirim/adik
   * - photo        : Jalur berkas foto kakak (JPG)
   * - photoWebp    : Jalur berkas foto versi WebP (opsional, fallback ke JPG)
   * --------------------------------------------------------------------------
   */
  const CONFIG = {
    name: 'Kak Nova',
    age: '24', // Usia Kak Nova
    birthdayDate: '2026-11-23', // Format: YYYY-MM-DD
    headline: 'Selamat Ulang Tahun',
    tagline: 'Hari ini adalah hari istimewa untuk merayakan sosok Kak Nova yang luar biasa, penyayang, dan penuh inspirasi.',
    message: [
      'Selamat ulang tahun untuk Kak Nova tercinta! Semoga di usia yang baru ini, setiap langkah Kakak senantiasa dipenuhi keberkahan, kebahagiaan yang melimpah, dan kemudahan dalam meraih semua mimpi serta cita-cita.',
      'Terima kasih sudah selalu menjadi sosok kakak yang begitu perhatian, tempat bercerita yang nyaman, serta panutan hebat bagi adikmu ini. Segala senyuman, tawa, dan kebaikan yang Kakak bagikan selalu membuat suasana terasa lebih hangat.',
      'Semoga kesehatan yang prima, kesuksesan dalam setiap urusan, dan kedamaian hati selalu menyertai Kak Nova di setiap waktu. Tetaplah menjadi pribadi yang hangat, kuat, dan selalu tersenyum manis!'
    ],
    senderName: 'Adikmu, Aldo',
    photo: 'assets/foto.jpg',
    photoWebp: 'assets/foto.webp',
    confettiDurationMs: 3500 // Durasi efek konfeti dalam milidetik (maks 4 detik)
  };

  /**
   * --------------------------------------------------------------------------
   * 2. DOM Hydration & Inisialisasi Konten
   * --------------------------------------------------------------------------
   */
  function initContent() {
    // 1. Judul Halaman & Meta Tags
    const pageTitle = `${CONFIG.headline}, ${CONFIG.name}! 🎂`;
    document.title = pageTitle;

    const metaDesc = `Situs ucapan selamat ulang tahun spesial penuh cinta dan doa terbaik untuk ${CONFIG.name}.`;
    const descEl = document.getElementById('meta-desc');
    if (descEl) descEl.setAttribute('content', metaDesc);

    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.getElementById('og-desc');
    if (ogDesc) ogDesc.setAttribute('content', metaDesc);
    const ogImg = document.getElementById('og-image');
    if (ogImg) ogImg.setAttribute('content', CONFIG.photo);

    // 2. Bagian Hero
    const headlineEl = document.getElementById('hero-headline');
    if (headlineEl) headlineEl.textContent = CONFIG.headline;

    const heroNameEl = document.getElementById('hero-name');
    if (heroNameEl) heroNameEl.textContent = CONFIG.name;

    const heroTaglineEl = document.getElementById('hero-tagline');
    if (heroTaglineEl) {
      if (CONFIG.age && CONFIG.age.trim() !== '') {
        heroTaglineEl.textContent = `Menyambut usia ke-${CONFIG.age} dengan penuh cinta, rasa syukur, dan senyuman terindah.`;
      } else {
        heroTaglineEl.textContent = CONFIG.tagline;
      }
    }

    // 3. Bagian Foto
    const photoImg = document.getElementById('sister-photo');
    if (photoImg) {
      photoImg.src = CONFIG.photo;
      photoImg.alt = `Foto ${CONFIG.name}`;
    }

    const captionNameEl = document.getElementById('caption-name');
    if (captionNameEl) captionNameEl.textContent = CONFIG.name;

    // 4. Bagian Pesan & Paragraf
    const messageContainer = document.getElementById('message-body');
    if (messageContainer && Array.isArray(CONFIG.message) && CONFIG.message.length > 0) {
      messageContainer.innerHTML = '';
      CONFIG.message.forEach((para) => {
        const p = document.createElement('p');
        p.className = 'message-paragraph';
        p.textContent = para;
        messageContainer.appendChild(p);
      });
    }

    const senderNameEl = document.getElementById('sender-name');
    if (senderNameEl) senderNameEl.textContent = CONFIG.senderName;

    // 5. Bagian Footer
    const footerNameEl = document.getElementById('footer-name');
    if (footerNameEl) footerNameEl.textContent = CONFIG.name;

    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * 3. Fitur Status Ulang Tahun & Hitung Mundur
   * --------------------------------------------------------------------------
   */
  function initBirthdayStatus() {
    const statusContainer = document.getElementById('birthday-status');
    const statusText = document.getElementById('status-text');
    if (!statusContainer || !statusText || !CONFIG.birthdayDate) return;

    function updateStatus() {
      const now = new Date();
      const [bYear, bMonth, bDay] = CONFIG.birthdayDate.split('-').map(Number);

      if (!bMonth || !bDay) {
        statusContainer.style.display = 'none';
        return;
      }

      // Cek apakah hari ini bertepatan dengan tanggal lahir (bulan & tanggal sama)
      const isToday = now.getMonth() + 1 === bMonth && now.getDate() === bDay;

      if (isToday) {
        statusContainer.classList.add('is-today');
        statusContainer.innerHTML = `
          <span class="status-icon" aria-hidden="true">🎉</span>
          <span class="status-text">Hari ini hari spesialmu! Selamat ulang tahun! 🎂✨</span>
        `;
        return;
      }

      // Hitung target ulang tahun berikutnya
      let targetYear = now.getFullYear();
      let targetDate = new Date(targetYear, bMonth - 1, bDay, 0, 0, 0);

      if (targetDate.getTime() < now.getTime()) {
        targetYear += 1;
        targetDate = new Date(targetYear, bMonth - 1, bDay, 0, 0, 0);
      }

      const diffMs = targetDate.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (diffDays === 0) {
        statusText.textContent = `Menuju hari ulang tahun: tinggal ${diffHours} jam ${diffMins} menit lagi! ⏳`;
      } else {
        statusText.textContent = `Menuju hari ulang tahun: ${diffDays} hari lagi! (${diffHours} jam ${diffMins} mnt) ⏳`;
      }
    }

    updateStatus();
    // Perbarui setiap menit
    setInterval(updateStatus, 60000);
  }

  /**
   * --------------------------------------------------------------------------
   * 4. Canvas Confetti Engine (Vanilla JS, Ringan, Auto-Stop)
   * --------------------------------------------------------------------------
   */
  const Confetti = (function () {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return { burst: function () {} };

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let stopTime = 0;
    let isRunning = false;

    // Palet warna ceria & elegan sesuai tema
    const COLORS = [
      '#F26B8A', // Coral Pink
      '#F4B942', // Soft Gold
      '#FF8FA3', // Rose
      '#FFD166', // Butter yellow
      '#6EE7B7', // Soft mint
      '#93C5FD', // Soft sky blue
      '#C084FC'  // Soft lavender
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function createParticle(originX, originY) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      const size = Math.random() * 8 + 5;
      const shapeType = Math.random() > 0.35 ? 'rect' : 'circle';

      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - Math.random() * 4 - 3,
        size: size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: shapeType,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        opacity: 1,
        drag: 0.96,
        gravity: 0.28
      };
    }

    function update() {
      if (!isRunning) return;

      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;
      const timeRemaining = Math.max(0, stopTime - now);
      const isEnding = timeRemaining < 1000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.opacity <= 0.01 || p.y > height + 40) continue;

        aliveCount++;

        // Fisika partikel
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (isEnding) {
          p.opacity = Math.max(0, p.opacity - 0.025);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        const wobbleScale = Math.cos(p.wobble);

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, (-p.size * wobbleScale) / 2, p.size, p.size * wobbleScale);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Berhenti jika durasi habis atau partikel sudah hilang
      if (now >= stopTime || aliveCount === 0) {
        stop();
      } else {
        const raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
        animationFrameId = raf(update);
      }
    }

    function burst(originX, originY, count) {
      if (prefersReducedMotion()) return;

      resize();

      const startX = originX !== undefined ? originX : width / 2;
      const startY = originY !== undefined ? originY : height * 0.4;
      const total = count || 120;

      for (let i = 0; i < total; i++) {
        particles.push(createParticle(startX, startY));
      }

      stopTime = performance.now() + (CONFIG.confettiDurationMs || 3500);

      if (!isRunning) {
        isRunning = true;
        const raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
        animationFrameId = raf(update);
      }
    }

    function stop() {
      isRunning = false;
      if (animationFrameId) {
        const caf = window.cancelAnimationFrame || clearTimeout;
        caf(animationFrameId);
        animationFrameId = null;
      }
      particles = [];
      ctx.clearRect(0, 0, width, height);
    }

    return { burst: burst, stop: stop };
  })();

  /**
   * --------------------------------------------------------------------------
   * 5. Scroll Entrance Animations (IntersectionObserver)
   * --------------------------------------------------------------------------
   */
  function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback jika browser tidak mendukung IntersectionObserver
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 6. Event Listeners Interaksi
   * --------------------------------------------------------------------------
   */
  function initEvents() {
    // Tombol Kejutan di Hero
    const btnSurprise = document.getElementById('btn-surprise');
    if (btnSurprise) {
      btnSurprise.addEventListener('click', function (e) {
        const rect = btnSurprise.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        Confetti.burst(originX, originY, 140);
      });
    }

    // Tombol Rayakan Lagi di Kartu Pesan
    const btnSurpriseMsg = document.getElementById('btn-surprise-msg');
    if (btnSurpriseMsg) {
      btnSurpriseMsg.addEventListener('click', function (e) {
        const rect = btnSurpriseMsg.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        Confetti.burst(originX, originY, 140);
      });
    }

    // Efek konfeti otomatis saat pertama kali dibuka (jika tidak reduce-motion)
    window.addEventListener('load', function () {
      setTimeout(function () {
        Confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 100);
      }, 500);
    });
  }

  /**
   * --------------------------------------------------------------------------
   * 7. Bootstrapping / Menjalankan Aplikasi
   * --------------------------------------------------------------------------
   */
  document.addEventListener('DOMContentLoaded', function () {
    initContent();
    initBirthdayStatus();
    initScrollAnimations();
    initEvents();
  });
})();
