const MOODS = [
  { label: 'Senang', color: '#E8483A', icon: 'faceHappy' },
  { label: 'Tenang', color: '#1F7A4D', icon: 'faceCalm' },
  { label: 'Biasa saja', color: '#8A8578', icon: 'faceNeutral' },
  { label: 'Sedih', color: '#2C4A8A', icon: 'faceSad' },
  { label: 'Lelah', color: '#7A5A26', icon: 'faceTired' },
  { label: 'Cemas', color: '#8A3D8A', icon: 'faceAnxious' },
  { label: 'Kesal', color: '#B8331F', icon: 'faceAnnoyed' },
  { label: 'Mengantuk', color: '#3D6E8A', icon: 'faceSleepy' },
];

const CATEGORY_ORDER = ['personal', 'shared', 'friends'];
const STORAGE_KEY = 'rj_session_v3';

const state = {
  stepIndex: 0,
  mood: null,
  answers: {}, // questionId -> value
  steps: [],
  questions: REFLECTION_QUESTIONS,
  categories: REFLECTION_CATEGORIES,
};

const mainEl = document.getElementById('main');

document.getElementById('brandIcon').innerHTML = icon('sprout', 20);
document.getElementById('navIcon').innerHTML = icon('compass', 16);

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => render());
});

function init() {
  state.steps = buildSteps(state.questions);
  restoreSession();
  render();
}

function buildSteps(questions) {
  const steps = [{ type: 'landing' }, { type: 'mood' }];
  for (const catKey of CATEGORY_ORDER) {
    for (const q of questions.filter((q) => q.category === catKey)) {
      steps.push({ type: 'question', question: q });
    }
  }
  steps.push({ type: 'closing' });
  return steps;
}

/* ---------- Autosave ---------- */

function saveSession() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    stepIndex: state.stepIndex,
    mood: state.mood,
    answers: state.answers,
  }));
}

function restoreSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.stepIndex = saved.stepIndex || 0;
    state.mood = saved.mood || null;
    state.answers = saved.answers || {};
  } catch {
    // ignore corrupted autosave
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  state.stepIndex = 0;
  state.mood = null;
  state.answers = {};
}

/* ---------- Navigation ---------- */

function goTo(index) {
  state.stepIndex = Math.max(0, Math.min(index, state.steps.length - 1));
  saveSession();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  const step = state.steps[state.stepIndex];
  if (!step) return;
  switch (step.type) {
    case 'landing': return renderLanding();
    case 'mood': return renderMood();
    case 'question': return renderQuestion(step.question);
    case 'closing': return renderClosing();
  }
}

/* ---------- Screens ---------- */

function renderLanding() {
  const resuming = state.stepIndex > 0 || Object.keys(state.answers).length > 0;
  mainEl.innerHTML = `
    <div class="screen">
      <div class="landing-body notebook-page">
        <div class="landing-eyebrow">${icon('sprout', 34)}</div>
        <h1 class="landing-title cover-heading">Reflection Journey</h1>
        <p class="landing-subtitle">Take a few minutes to reconnect with yourself.</p>
        <p class="landing-text">
          Tidak ada jawaban yang benar atau salah. Jawablah dengan jujur dan secukupnya.
          Beberapa pertanyaan hanya dapat dilihat olehmu, sedangkan beberapa pertanyaan
          akan didiskusikan bersama sebagai bagian dari aktivitas workshop. Semua jawabanmu
          tersimpan otomatis hanya di perangkat ini.
        </p>

        <div class="phase-list">
          ${CATEGORY_ORDER.map((catKey, i) => {
    const cat = state.categories[catKey];
    return `
              <div class="phase-item">
                <span class="phase-check ${cat.key}">${icon('checkCircle', 18)}</span>
                <div>
                  <span class="phase-label">${i + 1}. ${cat.label}</span>
                  <span class="phase-desc">${cat.short}</span>
                </div>
              </div>
            `;
  }).join('')}
        </div>
      </div>
      <button class="btn btn-primary" id="startBtn">${resuming ? 'Lanjutkan' : 'Mulai Refleksi'}</button>
    </div>
  `;
  document.getElementById('startBtn').addEventListener('click', () => goTo(resuming ? state.stepIndex : 1));
}

function renderMood() {
  mainEl.innerHTML = `
    <div class="screen">
      <h1 class="landing-title cover-heading">Bagaimana perasaanmu hari ini?</h1>
      <p class="landing-subtitle">Pilih satu yang paling mendekati.</p>
      <div class="mood-grid" id="moodGrid">
        ${MOODS.map((m) => `
          <div class="mood-option ${state.mood === m.label ? 'selected' : ''}" data-mood="${m.label}" style="--mood-color:${m.color}">
            <span class="mood-face" style="color:${m.color}">${icon(m.icon, 26)}</span>
            <span class="mood-label">${m.label}</span>
          </div>
        `).join('')}
      </div>
      <div class="btn-row">
        <button class="btn btn-secondary" id="backBtn">Kembali</button>
        <button class="btn btn-primary" id="nextBtn" ${state.mood ? '' : 'disabled'}>Lanjut</button>
      </div>
    </div>
  `;
  document.querySelectorAll('.mood-option').forEach((el) => {
    el.addEventListener('click', () => {
      state.mood = el.dataset.mood;
      saveSession();
      render();
    });
  });
  document.getElementById('backBtn').addEventListener('click', () => goTo(state.stepIndex - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(state.stepIndex + 1));
}

function renderQuestion(q) {
  const cat = state.categories[q.category];
  const total = state.questions.length;
  const currentValue = state.answers[q.id] || '';
  const progressPct = Math.round((q.id / total) * 100);
  const isLong = q.type === 'Essay Panjang';

  mainEl.innerHTML = `
    <div class="screen">
      <div class="progress-track"><div class="progress-fill" style="width:${progressPct}%"></div></div>
      <div class="progress-label">Pertanyaan ${q.id} dari ${total} · <span class="category-badge ${cat.key}" style="margin-bottom:0;">${icon(cat.icon, 13)} ${cat.label}</span></div>

      <div class="question-card notebook-page">
        <p class="question-title">${q.title}</p>
        <p class="question-text">${q.question}</p>

        ${isLong
      ? `<textarea id="answerInput" maxlength="${q.maxLength}" placeholder="Tulis refleksimu di sini...">${escapeHtml(currentValue)}</textarea>`
      : `<input type="text" id="answerInput" maxlength="${q.maxLength}" placeholder="Tulis jawaban singkat..." value="${escapeHtml(currentValue)}" />`
    }
        <div class="char-count"><span id="charCount">${currentValue.length}</span> / ${q.maxLength}</div>

        ${q.examples && q.examples.length ? `
          <div class="helper-block">
            ${icon('checkCircle', 14)} <span class="helper-label">Contoh:</span> ${q.examples.join(' · ')}
          </div>
        ` : ''}
        ${q.guidance ? `
          <div class="helper-block">
            ${icon('checkCircle', 14)} <span class="helper-label">Panduan:</span> ${q.guidance}
          </div>
        ` : ''}

        <div class="category-note ${cat.key}">${icon(cat.icon, 15)} ${cat.intro}</div>
      </div>

      <div class="btn-row">
        <button class="btn btn-secondary" id="backBtn">Kembali</button>
        <button class="btn btn-primary" id="nextBtn">${q.id === total ? 'Selesai' : 'Lanjut'}</button>
      </div>
    </div>
  `;

  const input = document.getElementById('answerInput');
  input.addEventListener('input', () => {
    state.answers[q.id] = input.value;
    document.getElementById('charCount').textContent = input.value.length;
    saveSession();
  });

  document.getElementById('backBtn').addEventListener('click', () => goTo(state.stepIndex - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(state.stepIndex + 1));
}

function renderClosing() {
  mainEl.innerHTML = `
    <div class="screen">
      <div class="landing-body notebook-page">
        <div class="closing-emoji">${icon('sprout', 34)}</div>
        <h1 class="landing-title cover-heading">Penutup</h1>
        <p class="landing-text">
          Terima kasih sudah meluangkan waktu untuk berhenti sejenak.<br /><br />
          Tidak semua jawaban harus langsung mengubah hidupmu. Kadang, pertanyaan yang
          tepat sudah cukup untuk membuat kita melihat hidup dari sudut pandang yang
          berbeda.
        </p>
        <blockquote class="closing-quote">
          “You feel depressed and messed up doesn't mean you're broken, it just means you're human.”
          <cite>David Mitchell</cite>
        </blockquote>
      </div>
      <div class="closing-actions">
        <button class="btn btn-primary" id="downloadBtn">${icon('fileText', 17)} Download Ringkasan (PDF)</button>
        <button class="btn btn-tertiary" id="restartBtn">${icon('rotate', 17)} Ulangi Refleksi</button>
      </div>
    </div>
  `;
  document.getElementById('downloadBtn').addEventListener('click', downloadSummaryPdf);
  document.getElementById('restartBtn').addEventListener('click', () => {
    if (confirm('Semua jawaban saat ini akan dihapus dan refleksi dimulai dari awal. Lanjutkan?')) {
      clearSession();
      render();
    }
  });
}

/* ---------- PDF export (browser print) ---------- */

function downloadSummaryPdf() {
  const printEl = document.getElementById('printSummary');
  const moodLine = state.mood ? `<div class="print-item"><div class="print-item-label">Mood check-in</div><div class="print-item-answer">${escapeHtml(state.mood)}</div></div>` : '';
  const items = state.questions.map((q) => {
    const cat = state.categories[q.category];
    const answer = state.answers[q.id] || '(tidak dijawab)';
    return `
      <div class="print-item">
        <div class="print-item-label">${cat.label} · ${q.title}</div>
        <div class="print-item-question">${escapeHtml(q.question)}</div>
        <div class="print-item-answer">${escapeHtml(answer)}</div>
      </div>
    `;
  }).join('');

  printEl.innerHTML = `
    <div class="print-title">Reflection Journey</div>
    <div class="print-subtitle">Ringkasan refleksi pribadi · ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    ${moodLine}
    ${items}
  `;
  window.print();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

init();
