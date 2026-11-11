/**
 * BECAME LMS — Socle HTML5 Moderne (Étape 2)
 * Gère :
 * 1. La détection de fonctionnalités et les polyfills (Invoker Commands, Popover, Dialog closedby)
 * 2. L'initialisation des données serveur (#became-init-data)
 * 3. La personnalisation du thème clair/pastel (txt.txt)
 * 4. Le chargement modulaire des Web Components (Étape 3)
 */

// 1. Polyfills conditionnels (Modern Web Guidance)
if (!('commandForElement' in HTMLButtonElement.prototype)) {
  import('https://esm.run/invokers-polyfill').catch(() => {
    // Fallback local si hors-ligne
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button[commandfor][command]');
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute('commandfor'));
      if (!target) return;
      const cmd = btn.getAttribute('command');
      if (cmd === 'show-modal' && typeof target.showModal === 'function') {
        target.showModal();
      } else if (cmd === 'close' && typeof target.close === 'function') {
        target.close();
      } else if (cmd === 'toggle-popover' && typeof target.togglePopover === 'function') {
        target.togglePopover();
      }
    });
  });
}

if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
  import('https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js').catch(() => {});
}

if (!('closedBy' in HTMLDialogElement.prototype)) {
  const outside = (e, dialog) => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };
  for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
    let pressedOutside = false;
    dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = outside(e, dialog);
    });
    dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && outside(e, dialog)) dialog.close();
    });
  }
}

// Nettoyage de dialog.returnValue à la fermeture (Modern Web Guidance - Dialog)
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.addEventListener('close', () => {
    dialog.returnValue = '';
  });
}

// 2. Lecture des données initiales injectées par Express
const initScript = document.getElementById('became-init-data');
let initData = {};
try {
  initData = JSON.parse(initScript?.textContent || '{}');
} catch (err) {
  console.error('Erreur de lecture des données initiales BECAME :', err);
}

window.__BECAME_INIT__ = initData;
window.b_translates = initData.b_translates || {};
window.b_params = initData.b_params || {};
window.req_obj = Object.assign(
  {
    pays: 'ci',
    lang: 'fr',
    connected: 1,
    profs_id: 1,
    user: 1,
    user_: { nom: 'Achi', prenom: 'Cyrille', img: '/imgs/socketio.jpg', avatar: '/imgs/avatar.jpg' }
  },
  initData.req || {}
);

// 3. Personnalisation des couleurs pastel & de la teinte (txt.txt)
const rootHtml = document.documentElement;
const themeBtns = document.querySelectorAll('[data-theme-choice]');
const hueSlider = document.getElementById('brand-hue-slider');
const hueValSpan = document.getElementById('brand-hue-val');

const savedTheme = localStorage.getItem('became_theme') || 'sauge';
const savedHue = localStorage.getItem('became_hue');

function applyTheme(themeName) {
  rootHtml.setAttribute('data-theme', themeName);
  localStorage.setItem('became_theme', themeName);
  for (const btn of themeBtns) {
    btn.setAttribute('aria-pressed', String(btn.dataset.themeChoice === themeName));
  }
}

applyTheme(savedTheme);
if (savedHue) {
  rootHtml.style.setProperty('--brand-hue', savedHue);
  if (hueSlider) hueSlider.value = savedHue;
  if (hueValSpan) hueValSpan.textContent = savedHue;
}

for (const btn of themeBtns) {
  btn.addEventListener('click', () => {
    rootHtml.style.removeProperty('--brand-hue');
    localStorage.removeItem('became_hue');
    applyTheme(btn.dataset.themeChoice);
  });
}

hueSlider?.addEventListener('input', (e) => {
  const hue = e.target.value;
  rootHtml.style.setProperty('--brand-hue', hue);
  if (hueValSpan) hueValSpan.textContent = hue;
  localStorage.setItem('became_hue', hue);
});

// 4. Bascule du rôle (Professeur #1 vs Élève)
const roleBtn = document.getElementById('role-toggle-btn');
roleBtn?.addEventListener('click', () => {
  const isProf = window.req_obj.profs_id === 1;
  window.req_obj.profs_id = isProf ? 2 : 1;
  roleBtn.textContent = !isProf ? 'Mode : Professeur (#1)' : 'Mode : Élève (#2)';
  document.dispatchEvent(new CustomEvent('became:role-change', { detail: { profs_id: window.req_obj.profs_id } }));
});

// 5. Chargement des Custom Elements (Étape 3) ou pré-rendu du squelette (Étape 2)
import('/js/components/index.js').catch(() => {
  const mega = document.getElementById('app-mega-menu');
  if (mega && Array.isArray(initData.menus) && !mega.innerHTML.trim()) {
    const ul = document.createElement('ul');
    ul.className = 'mega-menu-bar';
    for (const m of initData.menus) {
      const li = document.createElement('li');
      li.className = 'domain-group';
      li.dataset.domain = String(m.id_menus);
      const levels = (m.sousmenu || [])
        .map((s) => `<li><button type="button" class="level-pill" data-level-id="${s.id_niveaux}">${s.lien?.html || ''}</button></li>`)
        .join('');
      li.innerHTML = `<div class="domain-header"><span>${m.lien?.html || ''}</span></div><ul class="domain-levels">${levels}</ul>`;
      ul.appendChild(li);
    }
    mega.appendChild(ul);
  }
  const bc = document.getElementById('app-breadcrumb');
  if (bc && !bc.innerHTML.trim()) {
    bc.innerHTML = `<ol class="crumb-list"><li class="crumb-item"><button type="button" class="crumb-btn" aria-current="page">Accueil BECAME</button></li></ol>`;
  }
  const exp = document.getElementById('app-explorer');
  if (exp && !exp.innerHTML.trim()) {
    exp.innerHTML = `<div class="explorer-stage-header"><h2>Explorateur Pédagogique</h2></div><p class="catalog-subtitle">Sélectionnez un niveau dans le menu supérieur pour parcourir les filières, matières et sujets.</p>`;
  }
  const art = document.getElementById('app-article');
  if (art && initData.accueil?.article && !art.innerHTML.trim()) {
    const a = initData.accueil.article;
    art.innerHTML = `<div class="article-header"><div><h2>${a.header?.h || 'Bienvenue sur BECAME'}</h2></div></div><div class="article-body"><p>${a.main?.p || ''}</p></div>`;
  }
});
