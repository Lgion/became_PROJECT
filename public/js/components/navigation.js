/**
 * BECAME LMS — Web Components de Navigation (Étape 3)
 * - <became-mega-menu>
 * - <became-breadcrumb>
 * - <became-hierarchy-explorer>
 */

const COLLEGE_DIRECT_LEVEL_IDS = new Set([8, 1, 2, 3, 4]);

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeJsonParse(val, fallback = {}) {
  if (val && typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

/**
 * 1. <became-mega-menu>
 * Affiche les 4 grands domaines (Scolaires, Universitaires, Professionnels, Passions)
 * et leurs 20 niveaux. Émet 'became:select-level'.
 */
export class BecameMegaMenu extends HTMLElement {
  #menus = [];
  #activeLevelId = null;
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('menus');
    this.#upgradeProperty('activeLevelId');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const pill = e.target.closest('button.level-pill[data-level-id]');
        if (!pill) return;
        const levelId = Number(pill.dataset.levelId);
        const domainId = Number(pill.dataset.domainId);
        const skipFilieres = pill.dataset.skipFilieres === 'true';
        const levelTitle = pill.dataset.levelTitle || pill.textContent.trim();
        const domainTitle = pill.dataset.domainTitle || '';

        this.activeLevelId = levelId;
        this.dispatchEvent(
          new CustomEvent('became:select-level', {
            bubbles: true,
            composed: true,
            detail: { domainId, domainTitle, levelId, levelTitle, skipFilieres }
          })
        );
      },
      { signal: this.#abortController.signal }
    );

    if (this.#menus.length > 0) {
      this.#render();
    }
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const val = this[prop];
      delete this[prop];
      this[prop] = val;
    }
  }

  get menus() {
    return this.#menus;
  }

  set menus(val) {
    this.#menus = Array.isArray(val) ? val : [];
    if (this.isConnected) this.#render();
  }

  get activeLevelId() {
    return this.#activeLevelId;
  }

  set activeLevelId(val) {
    this.#activeLevelId = val === null || val === undefined ? null : Number(val);
    if (!this.isConnected) return;
    for (const btn of this.querySelectorAll('button.level-pill[data-level-id]')) {
      const isCurrent = Number(btn.dataset.levelId) === this.#activeLevelId;
      if (isCurrent) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    }
  }

  #render() {
    const ul = document.createElement('ul');
    ul.className = 'mega-menu-bar';

    for (const domain of this.#menus) {
      const domainId = Number(domain.id_menus);
      const domainTitle = domain.lien?.html || `Domaine ${domainId}`;
      const li = document.createElement('li');
      li.className = 'domain-group';
      li.dataset.domain = String(domainId);

      const levelsHtml = (domain.sousmenu || [])
        .map((sub) => {
          const lvlId = Number(sub.id_niveaux);
          const lvlTitle = sub.lien?.html || `Niveau ${lvlId}`;
          const lvlDesc = sub.lien?.title || lvlTitle;
          const skipFilieres = domainId === 1 && COLLEGE_DIRECT_LEVEL_IDS.has(lvlId);
          const isCurrent = lvlId === this.#activeLevelId ? ' aria-current="true"' : '';
          return `<li>
            <button
              type="button"
              class="level-pill"
              data-domain-id="${domainId}"
              data-domain-title="${escapeHtml(domainTitle)}"
              data-level-id="${lvlId}"
              data-level-title="${escapeHtml(lvlTitle)}"
              data-skip-filieres="${skipFilieres}"
              title="${escapeHtml(lvlDesc)}"${isCurrent}
            >${escapeHtml(lvlTitle)}</button>
          </li>`;
        })
        .join('');

      li.innerHTML = `
        <div class="domain-header">
          <span>${escapeHtml(domainTitle)}</span>
        </div>
        <ul class="domain-levels">${levelsHtml}</ul>
      `;
      ul.appendChild(li);
    }

    this.replaceChildren(ul);
  }
}

/**
 * 2. <became-breadcrumb>
 * Gère la pile d'historique de navigation sans clonage DOM lourd.
 */
export class BecameBreadcrumb extends HTMLElement {
  #trail = [{ type: 'home', id: 0, label: 'Accueil BECAME' }];
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('trail');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const btn = e.target.closest('button.crumb-btn[data-step-index]');
        if (!btn) return;
        const index = Number(btn.dataset.stepIndex);
        const step = this.#trail[index];
        if (!step) return;
        this.#trail = this.#trail.slice(0, index + 1);
        this.#render();
        this.dispatchEvent(
          new CustomEvent('became:breadcrumb-navigate', {
            bubbles: true,
            composed: true,
            detail: { index, step }
          })
        );
      },
      { signal: this.#abortController.signal }
    );

    this.#render();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const val = this[prop];
      delete this[prop];
      this[prop] = val;
    }
  }

  get trail() {
    return this.#trail;
  }

  set trail(steps) {
    if (Array.isArray(steps) && steps.length > 0) {
      this.#trail = steps;
    } else {
      this.#trail = [{ type: 'home', id: 0, label: 'Accueil BECAME' }];
    }
    if (this.isConnected) this.#render();
  }

  reset() {
    this.trail = [{ type: 'home', id: 0, label: 'Accueil BECAME' }];
  }

  #render() {
    const ol = document.createElement('ol');
    ol.className = 'crumb-list';

    this.#trail.forEach((step, idx) => {
      const isLast = idx === this.#trail.length - 1;
      const li = document.createElement('li');
      li.className = 'crumb-item';
      li.innerHTML = `<button
        type="button"
        class="crumb-btn"
        data-step-index="${idx}"
        ${isLast ? 'aria-current="page"' : ''}
      >${escapeHtml(step.label)}</button>`;
      ol.appendChild(li);
    });

    this.replaceChildren(ol);
  }
}

/**
 * 3. <became-hierarchy-explorer>
 * Remplace #main_section, #left, #main_section_ et les fonctions globales _0, _1, _2, _3.
 * Gère le cache Map des réponses JSON et l'indexation alphabétique A-Z.
 */
export class BecameHierarchyExplorer extends HTMLElement {
  #cache = new Map();
  #stage = 'welcome'; // 'welcome' | 'filieres' | 'matieres' | 'sujets'
  #currentLevel = null;
  #currentFiliere = null;
  #currentMatiere = null;
  #currentSujet = null;
  #filieres = [];
  #matieres = [];
  #sujets = [];
  #filterQuery = '';
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const stageTab = e.target.closest('button.stage-step-tab[data-stage]');
        if (stageTab) {
          const targetStage = stageTab.dataset.stage;
          if (targetStage === 'filieres' && this.#filieres.length > 0) {
            this.#stage = 'filieres';
            this.#render();
          } else if (targetStage === 'matieres' && this.#matieres.length > 0) {
            this.#stage = 'matieres';
            this.#render();
          } else if (targetStage === 'sujets' && this.#sujets.length > 0) {
            this.#stage = 'sujets';
            this.#render();
          }
          return;
        }

        const itemBtn = e.target.closest('button.hierarchy-item-btn[data-item-type]');
        if (!itemBtn) return;
        const type = itemBtn.dataset.itemType;
        const id = Number(itemBtn.dataset.itemId);
        const title = itemBtn.dataset.itemTitle || itemBtn.textContent.trim();

        if (type === 'filieres') {
          this.selectFiliere(id, title);
        } else if (type === 'matieres') {
          this.selectMatiere(id, title);
        } else if (type === 'sujets') {
          this.selectSujet(id, title);
        }
      },
      { signal: this.#abortController.signal }
    );

    this.#render();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  async #fetchCached(url) {
    if (this.#cache.has(url)) {
      return this.#cache.get(url);
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} sur ${url}`);
    const data = await res.json();
    this.#cache.set(url, data);
    return data;
  }

  resetToHome() {
    this.#stage = 'welcome';
    this.#currentLevel = null;
    this.#currentFiliere = null;
    this.#currentMatiere = null;
    this.#currentSujet = null;
    this.#filieres = [];
    this.#matieres = [];
    this.#sujets = [];
    this.#render();
  }

  setFilter(query) {
    this.#filterQuery = String(query || '').trim().toLowerCase();
    this.#render();
  }

  async loadLevel({ domainId, domainTitle, levelId, levelTitle, skipFilieres }) {
    this.#currentLevel = { domainId, domainTitle, levelId, levelTitle, skipFilieres };
    this.#currentFiliere = null;
    this.#currentMatiere = null;
    this.#currentSujet = null;
    this.#matieres = [];
    this.#sujets = [];

    if (skipFilieres) {
      // Saut direct vers les matières (Collège : Pré-collège, 6e, 5e, 4e, 3e)
      this.#filieres = [];
      await this.selectFiliere(levelId, levelTitle, true);
      return;
    }

    const data = await this.#fetchCached(`/_/filieres/${levelId}`);
    const articleRow = data?.[0]?.[0];
    const article = articleRow ? safeJsonParse(articleRow.article) : null;
    this.#filieres = (data?.[1] || []).map((row) => ({
      id: Number(row.id_filieres),
      fk: Number(row.fk),
      lien: safeJsonParse(row.lien)
    }));
    this.#stage = 'filieres';
    this.#render();

    if (article) {
      this.#emitArticle(article, `${domainTitle} › ${levelTitle}`);
    }
    this.#emitCatalog({
      tab: 'courses',
      classes: [],
      profs: [],
      courses: [],
      ressources: [],
      contextLabel: `Niveau ${levelTitle} — Choisissez une filière`
    });
    this.#emitTrail();
  }

  async selectFiliere(filiereId, filiereTitle, isDirectFromLevel = false) {
    if (!isDirectFromLevel) {
      this.#currentFiliere = { id: filiereId, title: filiereTitle };
    } else {
      this.#currentFiliere = { id: filiereId, title: filiereTitle, direct: true };
    }
    this.#currentMatiere = null;
    this.#currentSujet = null;
    this.#sujets = [];

    const data = await this.#fetchCached(`/_/matieres/${filiereId}`);
    const articleRow = data?.[0]?.[0];
    const article = articleRow ? safeJsonParse(articleRow.article) : null;
    this.#matieres = (data?.[1] || []).map((row) => ({
      id: Number(row.id_matieres),
      fk: Number(row.fk),
      lien: safeJsonParse(row.lien)
    }));
    const classes = data?.[2] || [];

    this.#stage = 'matieres';
    this.#render();

    if (article) {
      this.#emitArticle(article, filiereTitle);
    }
    this.#emitCatalog({
      tab: 'classes',
      classes,
      profs: [],
      courses: [],
      ressources: [],
      contextLabel: `Filière ${filiereTitle} (${classes.length} classe${classes.length > 1 ? 's' : ''})`
    });
    this.#emitTrail();
  }

  async selectMatiere(matiereId, matiereTitle) {
    this.#currentMatiere = { id: matiereId, title: matiereTitle };
    this.#currentSujet = null;

    const data = await this.#fetchCached(`/_/sujets/${matiereId}`);
    const articleRow = data?.[0]?.[0];
    const article = articleRow ? safeJsonParse(articleRow.article) : null;
    this.#sujets = (data?.[1] || []).map((row) => ({
      id: Number(row.id_sujets),
      fk: Number(row.fk),
      lien: safeJsonParse(row.lien)
    }));
    const profs = data?.[2] || [];

    this.#stage = 'sujets';
    this.#render();

    if (article) {
      this.#emitArticle(article, matiereTitle);
    }
    this.#emitCatalog({
      tab: 'profs',
      classes: [],
      profs,
      courses: [],
      ressources: [],
      contextLabel: `Matière ${matiereTitle} (${profs.length} professeur${profs.length > 1 ? 's' : ''})`
    });
    this.#emitTrail();
  }

  async selectSujet(sujetId, sujetTitle) {
    this.#currentSujet = { id: sujetId, title: sujetTitle };

    const data = await this.#fetchCached(`/_/courses/${sujetId}`);
    const articleRow = data?.[0]?.[0];
    const article = articleRow ? safeJsonParse(articleRow.article) : null;
    const courses = data?.[1] || [];
    const ressources = data?.[2] || [];

    this.#render();

    if (article) {
      this.#emitArticle(article, sujetTitle);
    }
    this.#emitCatalog({
      tab: 'courses',
      classes: [],
      profs: [],
      courses,
      ressources,
      contextLabel: `Sujet ${sujetTitle} — ${courses.length} cours & ${ressources.length} ressource${ressources.length > 1 ? 's' : ''}`
    });
    this.#emitTrail();
  }

  #emitArticle(article, contextLabel) {
    this.dispatchEvent(
      new CustomEvent('became:article-change', {
        bubbles: true,
        composed: true,
        detail: { article, contextLabel }
      })
    );
  }

  #emitCatalog(payload) {
    this.dispatchEvent(
      new CustomEvent('became:catalog-update', {
        bubbles: true,
        composed: true,
        detail: payload
      })
    );
  }

  #emitTrail() {
    const steps = [{ type: 'home', id: 0, label: 'Accueil BECAME' }];
    if (this.#currentLevel) {
      steps.push({
        type: 'level',
        id: this.#currentLevel.levelId,
        label: `${this.#currentLevel.domainTitle} : ${this.#currentLevel.levelTitle}`,
        meta: this.#currentLevel
      });
    }
    if (this.#currentFiliere && !this.#currentFiliere.direct) {
      steps.push({
        type: 'filiere',
        id: this.#currentFiliere.id,
        label: this.#currentFiliere.title
      });
    }
    if (this.#currentMatiere) {
      steps.push({
        type: 'matiere',
        id: this.#currentMatiere.id,
        label: this.#currentMatiere.title
      });
    }
    if (this.#currentSujet) {
      steps.push({
        type: 'sujet',
        id: this.#currentSujet.id,
        label: this.#currentSujet.title
      });
    }
    this.dispatchEvent(
      new CustomEvent('became:trail-change', {
        bubbles: true,
        composed: true,
        detail: { steps }
      })
    );
  }

  #render() {
    if (this.#stage === 'welcome') {
      this.innerHTML = `
        <div class="explorer-stage-header">
          <h2>Explorateur Pédagogique</h2>
        </div>
        <p class="catalog-subtitle">
          Sélectionnez un niveau dans l'un des 4 domaines ci-dessus (<strong>Scolaires</strong>,
          <strong>Universitaires</strong>, <strong>Professionnels</strong> ou <strong>Passions</strong>)
          pour explorer ses filières, matières et sujets classés de A à Z.
        </p>
      `;
      return;
    }

    const hasFilieres = this.#filieres.length > 0;
    const hasMatieres = this.#matieres.length > 0;
    const hasSujets = this.#sujets.length > 0;

    let activeItems = [];
    let itemType = this.#stage;
    let activeId = null;
    let stageHeading = '';

    if (this.#stage === 'filieres') {
      activeItems = this.#filieres;
      activeId = this.#currentFiliere?.id ?? null;
      stageHeading = `Filières — ${this.#currentLevel?.levelTitle || ''}`;
    } else if (this.#stage === 'matieres') {
      activeItems = this.#matieres;
      activeId = this.#currentMatiere?.id ?? null;
      stageHeading = `Matières — ${this.#currentFiliere?.title || ''}`;
    } else if (this.#stage === 'sujets') {
      activeItems = this.#sujets;
      activeId = this.#currentSujet?.id ?? null;
      stageHeading = `Sujets — ${this.#currentMatiere?.title || ''}`;
    }

    // Filtrage éventuel par mot-clé
    if (this.#filterQuery) {
      activeItems = activeItems.filter((it) => {
        const text = `${it.lien?.html || ''} ${it.lien?.title || ''}`.toLowerCase();
        return text.includes(this.#filterQuery);
      });
    }

    // Groupement alphabétique A-Z
    const groups = new Map();
    for (const item of activeItems) {
      const title = (item.lien?.html || '?').trim();
      const letter = (title[0] || '#').toUpperCase();
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter).push(item);
    }
    const sortedLetters = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b, 'fr'));

    const groupsHtml =
      sortedLetters.length === 0
        ? `<p class="catalog-subtitle">Aucun élément ne correspond au filtre actuel.</p>`
        : sortedLetters
            .map((letter) => {
              const lis = groups
                .get(letter)
                .map((it) => {
                  const title = it.lien?.html || `Élément #${it.id}`;
                  const desc = it.lien?.title || title;
                  const isCurrent = it.id === activeId ? ' aria-current="true"' : '';
                  return `<li>
                    <button
                      type="button"
                      class="hierarchy-item-btn"
                      data-item-type="${itemType}"
                      data-item-id="${it.id}"
                      data-item-title="${escapeHtml(title)}"
                      title="${escapeHtml(desc)}"${isCurrent}
                    >
                      <span>${escapeHtml(title)}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </li>`;
                })
                .join('');
              return `<div class="alpha-group">
                <span class="alpha-badge" aria-hidden="true">${escapeHtml(letter)}</span>
                <ul class="hierarchy-list">${lis}</ul>
              </div>`;
            })
            .join('');

    this.innerHTML = `
      <div class="explorer-stage-header">
        <h2>${escapeHtml(stageHeading)}</h2>
      </div>
      <div class="stage-steps" role="tablist" aria-label="Étapes de la hiérarchie">
        <button
          type="button"
          role="tab"
          class="stage-step-tab"
          data-stage="filieres"
          aria-selected="${this.#stage === 'filieres'}"
          ${!hasFilieres ? 'disabled' : ''}
        >1. Filières (${this.#filieres.length})</button>
        <button
          type="button"
          role="tab"
          class="stage-step-tab"
          data-stage="matieres"
          aria-selected="${this.#stage === 'matieres'}"
          ${!hasMatieres ? 'disabled' : ''}
        >2. Matières (${this.#matieres.length})</button>
        <button
          type="button"
          role="tab"
          class="stage-step-tab"
          data-stage="sujets"
          aria-selected="${this.#stage === 'sujets'}"
          ${!hasSujets ? 'disabled' : ''}
        >3. Sujets (${this.#sujets.length})</button>
      </div>
      <div>${groupsHtml}</div>
    `;
  }
}

if (!customElements.get('became-mega-menu')) {
  customElements.define('became-mega-menu', BecameMegaMenu);
}
if (!customElements.get('became-breadcrumb')) {
  customElements.define('became-breadcrumb', BecameBreadcrumb);
}
if (!customElements.get('became-hierarchy-explorer')) {
  customElements.define('became-hierarchy-explorer', BecameHierarchyExplorer);
}

