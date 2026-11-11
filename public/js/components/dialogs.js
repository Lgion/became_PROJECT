/**
 * BECAME LMS — Web Components des Modales Natives <dialog> (Étape 3)
 * - <became-resource-viewer>
 * - <became-course-timeline>
 * - <became-live-classroom>
 * - <became-entity-form>
 */

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

function timeToMinutes(timeStr) {
  const parts = String(timeStr || '00:00').split(':');
  const a = Number(parts[0] || 0);
  const b = Number(parts[1] || 0);
  if (a > 0 && b === 0 && a <= 240) return a;
  if (a <= 3 && b > 0) return a * 60 + b;
  return a + b / 60;
}

function buildResourceTreeHtml(treeObj, resourceId) {
  let html = '<ul class="hierarchy-list">';
  for (const [key, node] of Object.entries(treeObj || {})) {
    if (key.startsWith('dir_') && node && typeof node === 'object') {
      const dirName = node.dirname || key;
      const childrenHtml = buildResourceTreeHtml(node, resourceId);
      html += `
        <li>
          <details open>
            <summary class="crumb-btn">📁 ${escapeHtml(dirName)}</summary>
            <div class="form-field-spaced">${childrenHtml}</div>
          </details>
        </li>
      `;
    } else if (key.startsWith('file_') && node && typeof node === 'object') {
      const href = `/ressources/_${resourceId}/${node.href || 'cours.html'}`;
      const label = node.html || node.href || 'Fichier';
      const fileType = node.type || 'html';
      html += `
        <li>
          <button
            type="button"
            class="hierarchy-item-btn"
            data-file-href="${escapeHtml(href)}"
            data-file-type="${escapeHtml(fileType)}"
            data-file-label="${escapeHtml(label)}"
          >
            <span>📄 ${escapeHtml(label)}</span>
            <span class="card-pill">${escapeHtml(fileType.toUpperCase())}</span>
          </button>
        </li>
      `;
    }
  }
  html += '</ul>';
  return html;
}

/**
 * 6. <became-resource-viewer>
 * Affiche l'arborescence <details>/<summary> d'une ressource et prévisualise ses fichiers.
 */
export class BecameResourceViewer extends HTMLElement {
  #resource = null;
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('resource');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const fileBtn = e.target.closest('button[data-file-href]');
        if (!fileBtn) return;
        for (const b of this.querySelectorAll('button[data-file-href]')) {
          b.removeAttribute('aria-current');
        }
        fileBtn.setAttribute('aria-current', 'true');
        this.#previewFile({
          href: fileBtn.dataset.fileHref,
          type: fileBtn.dataset.fileType,
          label: fileBtn.dataset.fileLabel
        });
      },
      { signal: this.#abortController.signal }
    );

    if (this.#resource) {
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

  get resource() {
    return this.#resource;
  }

  set resource(val) {
    this.#resource = val || null;
    if (this.isConnected && this.#resource) {
      this.#render();
    }
  }

  #previewFile({ href, type, label }) {
    const stage = this.querySelector('[data-viewer-stage]');
    if (!stage) return;

    if (type === 'img') {
      stage.innerHTML = `
        <div class="explorer-stage-header">
          <h3>${escapeHtml(label)}</h3>
          <a href="${escapeHtml(href)}" download class="btn btn-soft">Télécharger</a>
        </div>
        <figure class="hero-illustration">
          <img src="${escapeHtml(href)}" alt="${escapeHtml(label)}" width="640" height="400" loading="lazy">
        </figure>
      `;
    } else if (type === 'audio') {
      stage.innerHTML = `
        <div class="explorer-stage-header">
          <h3>${escapeHtml(label)}</h3>
        </div>
        <audio controls src="${escapeHtml(href)}"></audio>
      `;
    } else if (type === 'video') {
      stage.innerHTML = `
        <div class="explorer-stage-header">
          <h3>${escapeHtml(label)}</h3>
        </div>
        <video controls width="640" height="360" src="${escapeHtml(href)}"></video>
      `;
    } else {
      stage.innerHTML = `
        <div class="explorer-stage-header">
          <h3>${escapeHtml(label)}</h3>
          <a href="${escapeHtml(href)}" target="_blank" rel="noopener" class="btn btn-soft">Ouvrir dans un nouvel onglet ↗</a>
        </div>
        <iframe src="${escapeHtml(href)}" title="${escapeHtml(label)}" loading="lazy"></iframe>
      `;
    }
  }

  #render() {
    const data = this.#resource?.data || this.#resource || {};
    const resourceId = data.id_ressources || 1;
    const tree = safeJsonParse(data.json, {});
    const treeHtml = buildResourceTreeHtml(tree, resourceId);

    this.innerHTML = `
      <div class="article-header">
        <div>
          <span class="card-pill">${escapeHtml(data.type || 'Ressource pédagogique')}</span>
          <h3>${escapeHtml(data.name || 'Ressource')}</h3>
          <p class="catalog-subtitle">${escapeHtml(data.long_descr || data.short_descr || '')}</p>
        </div>
      </div>
      <div class="viewer-split">
        <aside class="viewer-tree" aria-label="Arborescence des fichiers de la ressource">
          <h4 class="card-title">Fichiers inclus</h4>
          ${treeHtml}
        </aside>
        <div class="viewer-stage" data-viewer-stage>
          <p class="catalog-subtitle">Sélectionnez un fichier dans l'arborescence à gauche pour l'afficher ici.</p>
        </div>
      </div>
    `;

    // Prévisualise automatiquement le premier fichier disponible
    const firstFileBtn = this.querySelector('button[data-file-href]');
    if (firstFileBtn) {
      firstFileBtn.click();
    }
  }
}

/**
 * 7. <became-course-timeline>
 * Gère le rendu visuel de la timeline (phases & items), le chronomètre (nettoyé dans disconnectedCallback)
 * et l'ajout de phase en mode Professeur.
 */
export class BecameCourseTimeline extends HTMLElement {
  #courseId = null;
  #duree = 60;
  #timeline = { phases: [], items: [], live: [] };
  #timerId = null;
  #elapsedSec = 0;
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('timelineData');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const ctrlBtn = e.target.closest('button[data-tl-action]');
        if (ctrlBtn) {
          const act = ctrlBtn.dataset.tlAction;
          if (act === 'play') this.startPlayback();
          else if (act === 'pause') this.stopPlayback();
          else if (act === 'reset') {
            this.stopPlayback();
            this.#elapsedSec = 0;
            this.#updateClock();
          }
          return;
        }

        const pinBtn = e.target.closest('button.timeline-item-pin[data-item-index]');
        if (pinBtn) {
          const idx = Number(pinBtn.dataset.itemIndex);
          const item = this.#timeline.items?.[idx];
          if (item) {
            this.dispatchEvent(
              new CustomEvent('became:timeline-item-select', {
                bubbles: true,
                composed: true,
                detail: { item }
              })
            );
          }
        }
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      'submit',
      async (e) => {
        const form = e.target.closest('form[data-tl-add-phase]');
        if (!form) return;
        e.preventDefault();
        const fd = new FormData(form);
        const title = String(fd.get('phase_title') || '').trim();
        const start = String(fd.get('phase_start') || '00:00').trim();
        const end = String(fd.get('phase_end') || '00:30').trim();
        if (!title) return;

        if (!Array.isArray(this.#timeline.phases)) this.#timeline.phases = [];
        this.#timeline.phases.push({ title, start, end });
        this.#render();

        if (this.#courseId) {
          const encoded = encodeURIComponent(JSON.stringify(this.#timeline)).replace(/\//g, '_--_');
          await fetch(`/_/tls/${this.#courseId}/${encoded}`).catch(() => {});
        }
      },
      { signal: this.#abortController.signal }
    );

    this.#render();
  }

  disconnectedCallback() {
    this.stopPlayback();
    this.#abortController?.abort();
  }

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const val = this[prop];
      delete this[prop];
      this[prop] = val;
    }
  }

  get timelineData() {
    return { courseId: this.#courseId, duree: this.#duree, timeline: this.#timeline };
  }

  set timelineData(val) {
    if (!val) return;
    this.stopPlayback();
    this.#courseId = val.courseId ?? null;
    this.#duree = Number(val.duree || 60);
    this.#timeline = safeJsonParse(val.timeline, { phases: [], items: [], live: [] });
    this.#elapsedSec = 0;
    if (this.isConnected) this.#render();
  }

  startPlayback() {
    if (this.#timerId) return;
    const totalSec = this.#duree * 60;
    this.#timerId = setInterval(() => {
      this.#elapsedSec += 1;
      if (this.#elapsedSec >= totalSec) {
        this.stopPlayback();
      }
      this.#updateClock();
    }, 1000);
    this.#updateClock();
  }

  stopPlayback() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }

  #updateClock() {
    const mm = String(Math.floor(this.#elapsedSec / 60)).padStart(2, '0');
    const ss = String(this.#elapsedSec % 60).padStart(2, '0');
    const clockEl = this.querySelector('[data-tl-clock]');
    if (clockEl) {
      clockEl.textContent = `${mm}:${ss} / ${this.#duree} min`;
    }
  }

  #render() {
    const phases = Array.isArray(this.#timeline?.phases) ? this.#timeline.phases : [];
    const items = Array.isArray(this.#timeline?.items) ? this.#timeline.items : [];
    const totalMin = Math.max(this.#duree, 1);

    const phasesHtml = phases
      .map((ph) => {
        const s = timeToMinutes(ph.start);
        const e = timeToMinutes(ph.end);
        const leftPct = Math.min(100, Math.max(0, (s / totalMin) * 100)).toFixed(1);
        const widthPct = Math.min(100 - Number(leftPct), Math.max(6, ((e - s) / totalMin) * 100)).toFixed(1);
        return `<div
          class="timeline-phase-bar"
          style="--phase-left: ${leftPct}%; --phase-width: ${widthPct}%;"
          title="${escapeHtml(`${ph.title} (${ph.start} – ${ph.end})`)}"
        >${escapeHtml(ph.title)}</div>`;
      })
      .join('');

    const pinsHtml = items
      .map((it, idx) => {
        const m = timeToMinutes(it.time);
        const leftPct = Math.min(98, Math.max(2, (m / totalMin) * 100)).toFixed(1);
        return `<button
          type="button"
          class="timeline-item-pin"
          style="--pin-left: ${leftPct}%;"
          data-item-index="${idx}"
          title="${escapeHtml(`${it.title || 'Support'} (${it.time})`)}"
          aria-label="${escapeHtml(`Support ${it.title || idx + 1} à ${it.time}`)}"
        ></button>`;
      })
      .join('');

    const isProf = window.req_obj?.profs_id === 1;
    const profEditorHtml = isProf
      ? `
        <details class="form-field-spaced">
          <summary class="crumb-btn">+ Ajouter une phase à la timeline (Mode Professeur)</summary>
          <form data-tl-add-phase class="form-grid form-field-spaced">
            <div class="form-field">
              <label for="tl-phase-title">Titre de la phase</label>
              <input id="tl-phase-title" name="phase_title" type="text" placeholder="Ex : Chapitre 3 — Exercices" required>
            </div>
            <div class="form-field">
              <label for="tl-phase-start">Début (HH:MM)</label>
              <input id="tl-phase-start" name="phase_start" type="text" value="00:00" required>
            </div>
            <div class="form-field">
              <label for="tl-phase-end">Fin (HH:MM)</label>
              <input id="tl-phase-end" name="phase_end" type="text" value="00:25" required>
            </div>
            <div class="form-field">
              <label>&nbsp;</label>
              <button type="submit" class="btn btn-primary">Enregistrer la phase</button>
            </div>
          </form>
        </details>
      `
      : '';

    this.innerHTML = `
      <div class="explorer-stage-header">
        <div>
          <strong>Timeline Interactive (${phases.length} phase${phases.length > 1 ? 's' : ''}, ${items.length} jalon${items.length > 1 ? 's' : ''})</strong>
          <span class="card-pill" data-tl-clock>00:00 / ${this.#duree} min</span>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-soft" data-tl-action="play">▶ Démarrer / Replay</button>
          <button type="button" class="btn" data-tl-action="pause">⏸ Pause</button>
          <button type="button" class="btn" data-tl-action="reset">↺ 00:00</button>
        </div>
      </div>
      <div class="timeline-track" role="region" aria-label="Frise chronologique du cours">
        ${phasesHtml}
        ${pinsHtml}
      </div>
      ${profEditorHtml}
    `;
  }
}

/**
 * 8. <became-live-classroom>
 * Salle de cours interactive combinant <became-course-timeline>, les supports du cours
 * et le fil d'échange en direct / replay.
 */
export class BecameLiveClassroom extends HTMLElement {
  #course = null;
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('course');
    this.#abortController = new AbortController();

    this.addEventListener(
      'became:timeline-item-select',
      (e) => {
        const item = e.detail?.item;
        if (!item?.href) return;
        this.#showSupport(item.href, item.title || 'Support de la timeline');
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      'click',
      (e) => {
        const fileBtn = e.target.closest('button[data-file-href]');
        if (!fileBtn) return;
        this.#showSupport(fileBtn.dataset.fileHref, fileBtn.dataset.fileLabel || 'Support de cours');
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      'submit',
      (e) => {
        const chatForm = e.target.closest('form[data-classroom-chat]');
        if (!chatForm) return;
        e.preventDefault();
        const input = chatForm.querySelector('input[name="msg"]');
        const text = String(input?.value || '').trim();
        if (!text) return;
        const feed = this.querySelector('[data-classroom-feed]');
        if (feed) {
          const p = document.createElement('p');
          p.className = 'card-desc';
          const role = window.req_obj?.profs_id === 1 ? 'Professeur' : 'Élève';
          p.innerHTML = `<strong>[${escapeHtml(role)}]</strong> : ${escapeHtml(text)}`;
          feed.appendChild(p);
        }
        input.value = '';
      },
      { signal: this.#abortController.signal }
    );

    if (this.#course) {
      this.#loadCourseDetails();
    }
  }

  disconnectedCallback() {
    const tlEl = this.querySelector('became-course-timeline');
    tlEl?.stopPlayback?.();
    this.#abortController?.abort();
  }

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const val = this[prop];
      delete this[prop];
      this[prop] = val;
    }
  }

  get course() {
    return this.#course;
  }

  set course(val) {
    this.#course = val || null;
    if (this.isConnected && this.#course) {
      this.#loadCourseDetails();
    }
  }

  #showSupport(href, label) {
    const stage = this.querySelector('[data-classroom-stage]');
    if (!stage) return;
    stage.innerHTML = `
      <div class="explorer-stage-header">
        <h4>${escapeHtml(label)}</h4>
        <a href="${escapeHtml(href)}" target="_blank" rel="noopener" class="btn btn-soft">Ouvrir ↗</a>
      </div>
      <iframe src="${escapeHtml(href)}" title="${escapeHtml(label)}" loading="lazy"></iframe>
    `;
  }

  async #loadCourseDetails() {
    const data = this.#course?.data || this.#course || {};
    const courseId = data.id_courses || 1;
    const rscIds = data.ressource_ids || '1';

    this.innerHTML = `<p class="catalog-subtitle">Chargement de la salle de cours #${escapeHtml(courseId)}…</p>`;

    try {
      const res = await fetch(`/_/courses_/${rscIds}/${courseId}`);
      const payload = await res.json();
      const resources = payload?.[0] || [];
      const tlRow = payload?.[1]?.[0];
      const timeline = safeJsonParse(tlRow?.tl, { phases: [], items: [], live: [] });

      const resourcesHtml = resources
        .map((r) => {
          const tree = safeJsonParse(r.json, {});
          return `
            <div class="alpha-group">
              <strong>${escapeHtml(r.name || `Ressource #${r.id_ressources}`)}</strong>
              ${buildResourceTreeHtml(tree, r.id_ressources)}
            </div>
          `;
        })
        .join('');

      this.innerHTML = `
        <div class="article-header">
          <div>
            <span class="card-pill">${escapeHtml(data.type_ || 'Salle de cours')}</span>
            <h3>${escapeHtml(data.name || 'Cours interactif')}</h3>
            <p class="catalog-subtitle">Animé par <strong>${escapeHtml(data.prof_name || 'Professeur')}</strong> · Durée : ${escapeHtml(data.duree || 60)} min</p>
          </div>
        </div>

        <became-course-timeline></became-course-timeline>

        <div class="viewer-split">
          <aside class="viewer-tree" aria-label="Supports et échanges du cours">
            <h4 class="card-title">Supports associés</h4>
            ${resourcesHtml || '<p class="catalog-subtitle">Aucun support attaché.</p>'}
            <hr class="viewer-divider">
            <h4 class="card-title">Questions &amp; Direct</h4>
            <div data-classroom-feed>
              <p class="card-desc"><strong>[Système]</strong> : Salle de cours prête (mode Live / Replay).</p>
            </div>
            <form data-classroom-chat class="form-field form-field-spaced">
              <label for="classroom-msg-input">Intervenir dans le cours</label>
              <input id="classroom-msg-input" name="msg" type="text" placeholder="Poser une question ou publier une note…" required>
              <button type="submit" class="btn btn-soft">Envoyer</button>
            </form>
          </aside>
          <div class="viewer-stage" data-classroom-stage>
            <p class="catalog-subtitle">Cliquez sur un jalon doré de la timeline ou sur un fichier à gauche pour afficher le support.</p>
          </div>
        </div>
      `;

      const tlEl = this.querySelector('became-course-timeline');
      if (tlEl) {
        tlEl.timelineData = { courseId, duree: data.duree || 60, timeline };
      }

      const firstFileBtn = this.querySelector('button[data-file-href]');
      if (firstFileBtn) firstFileBtn.click();
    } catch (err) {
      this.innerHTML = `<p class="catalog-subtitle">Impossible de charger les détails du cours : ${escapeHtml(err.message)}</p>`;
    }
  }
}

/**
 * 9. <became-entity-form>
 * Formulaire dynamique de création d'entités (niveaux, filieres, matieres, sujets, courses, ressources, classes, profs).
 * Remplace #form_add_things et la dépendance à Materialize.
 */
export class BecameEntityForm extends HTMLElement {
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#abortController = new AbortController();
    this.#render();

    this.addEventListener(
      'change',
      async (e) => {
        const typeSelect = e.target.closest('select[name="type"]');
        if (typeSelect) {
          this.#updateVisibilityForType(typeSelect.value);
          return;
        }

        const cascadeSelect = e.target.closest('select[data-cascade]');
        if (cascadeSelect) {
          await this.#handleCascadeChange(cascadeSelect);
        }
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      'submit',
      async (e) => {
        const form = e.target.closest('form#modern-add-things-form');
        if (!form) return;
        e.preventDefault();
        const statusEl = this.querySelector('[data-form-status]');
        if (statusEl) statusEl.textContent = 'Enregistrement en cours…';

        try {
          const fd = new FormData(form);
          const res = await fetch('/_/form_add_things', { method: 'POST', body: fd });
          const text = await res.text();
          if (text === '0') {
            if (statusEl) statusEl.textContent = "Erreur lors de l'enregistrement. Vérifiez les champs.";
          } else {
            if (statusEl) statusEl.textContent = 'Élément ajouté avec succès dans la base BECAME !';
            form.reset();
          }
        } catch (err) {
          if (statusEl) statusEl.textContent = `Erreur réseau : ${err.message}`;
        }
      },
      { signal: this.#abortController.signal }
    );
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  #updateVisibilityForType(entityType) {
    const courseFields = this.querySelector('[data-extra-section="courses"]');
    if (courseFields) {
      courseFields.hidden = entityType !== 'courses';
    }
  }

  async #handleCascadeChange(selectEl) {
    const sourceName = selectEl.name; // 'niveaux' | 'filieres' | 'matieres'
    const selectedVal = selectEl.value;
    if (!selectedVal || selectedVal === 'void') return;

    const targetMap = {
      niveaux: { nextSelectName: 'filieres', idKey: 'id_niveaux' },
      filieres: { nextSelectName: 'matieres', idKey: 'id_filieres' },
      matieres: { nextSelectName: 'sujets', idKey: 'id_matieres' }
    };
    const mapping = targetMap[sourceName];
    if (!mapping) return;

    const nextSelect = this.querySelector(`select[name="${mapping.nextSelectName}"]`);
    if (!nextSelect) return;

    try {
      const res = await fetch(`/_/form_get_things/${sourceName}/${selectedVal}`, { method: 'POST' });
      const rows = await res.json();
      const lang = window.req_obj?.lang || 'fr';
      const opts = [`<option value="void">— Choisir (${rows.length}) —</option>`];
      for (const r of rows) {
        const lien = safeJsonParse(r[lang] || r.fr, {});
        const val = r[mapping.idKey];
        opts.push(`<option value="${escapeHtml(val)}">${escapeHtml(lien.html || `#${val}`)}</option>`);
      }
      nextSelect.innerHTML = opts.join('');
    } catch {
      // Ignore cascade error
    }
  }

  #render() {
    const menus = window.__BECAME_INIT__?.menus || [];
    const menuOptions = menus
      .map((m) => `<option value="${escapeHtml(m.id_menus)}">${escapeHtml(m.lien?.html || `Menu ${m.id_menus}`)}</option>`)
      .join('');

    this.innerHTML = `
      <form id="modern-add-things-form" enctype="multipart/form-data">
        <input type="hidden" name="profs_id" value="${escapeHtml(window.req_obj?.profs_id || 1)}">
        <div class="form-grid">
          <div class="form-field">
            <label for="add-type-select">Type d'élément à ajouter</label>
            <select id="add-type-select" name="type" required>
              <option value="niveaux">Niveau d'étude</option>
              <option value="filieres">Filière / Spécialité</option>
              <option value="matieres">Matière / Compétence</option>
              <option value="sujets" selected>Sujet de cours</option>
              <option value="courses">Cours interactif</option>
            </select>
          </div>

          <div class="form-field">
            <label for="add-menu-select">Domaine principal (Menu)</label>
            <select id="add-menu-select" name="niveaux" data-cascade="true" required>
              <option value="void">— Choisir un domaine —</option>
              ${menuOptions}
            </select>
          </div>

          <div class="form-field">
            <label for="add-niveau-select">Niveau rattaché</label>
            <select id="add-niveau-select" name="filieres" data-cascade="true">
              <option value="void">— Choisir d'abord un domaine —</option>
            </select>
          </div>

          <div class="form-field">
            <label for="add-filiere-select">Filière rattachée</label>
            <select id="add-filiere-select" name="matieres" data-cascade="true">
              <option value="void">— Choisir d'abord un niveau —</option>
            </select>
          </div>

          <div class="form-field">
            <label for="add-matiere-select">Matière rattachée</label>
            <select id="add-matiere-select" name="sujets">
              <option value="void">— Choisir d'abord une filière —</option>
            </select>
          </div>

          <div class="form-field">
            <label for="add-label-input">Nom / Intitulé court</label>
            <input id="add-label-input" name="label" type="text" placeholder="Ex : Algèbre linéaire" required>
          </div>

          <div class="form-field">
            <label for="add-titre-input">Titre complet</label>
            <input id="add-titre-input" name="titre" type="text" placeholder="Ex : Cours et exercices d'algèbre" required>
          </div>

          <div class="form-field">
            <label for="add-url-input">Identifiant URL (slug)</label>
            <input id="add-url-input" name="url" type="text" placeholder="Ex : algebre-lineaire" required>
          </div>

          <div class="form-field">
            <label for="add-alias-input">Alias</label>
            <input id="add-alias-input" name="alias" type="text" value="became" required>
          </div>
        </div>

        <div class="form-field form-field-spaced">
          <label for="add-descr-input">Description pédagogique</label>
          <textarea id="add-descr-input" name="descr" rows="3" placeholder="Présentez les objectifs et le contenu…" required></textarea>
        </div>

        <div data-extra-section="courses" class="form-grid form-field-spaced" hidden>
          <div class="form-field">
            <label for="add-duree-input">Durée (minutes)</label>
            <input id="add-duree-input" name="duree" type="number" value="60" min="15" max="240">
          </div>
          <div class="form-field">
            <label for="add-prix-input">Prix (€)</label>
            <input id="add-prix-input" name="prix" type="number" value="0" min="0">
          </div>
        </div>

        <div class="article-footer">
          <button type="submit" class="btn btn-primary">Valider et enregistrer</button>
          <span data-form-status class="catalog-subtitle" role="status" aria-live="polite"></span>
        </div>
      </form>
    `;
  }
}

if (!customElements.get('became-resource-viewer')) {
  customElements.define('became-resource-viewer', BecameResourceViewer);
}
if (!customElements.get('became-course-timeline')) {
  customElements.define('became-course-timeline', BecameCourseTimeline);
}
if (!customElements.get('became-live-classroom')) {
  customElements.define('became-live-classroom', BecameLiveClassroom);
}
if (!customElements.get('became-entity-form')) {
  customElements.define('became-entity-form', BecameEntityForm);
}
