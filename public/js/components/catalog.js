/**
 * BECAME LMS — Web Components d'Article et de Cartes Catalogue (Étape 3)
 * - <became-article-view>
 * - <became-item-card>
 */

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeJsonParse(val, fallback = []) {
  if (Array.isArray(val) || (val && typeof val === 'object')) return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

/**
 * 4. <became-article-view>
 * Remplace #main_article et fonction_qui_traite_la_reponse_xhr_pour_l_article_principal().
 */
export class BecameArticleView extends HTMLElement {
  #article = null;
  #contextLabel = 'Accueil BECAME';
  #abortController = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#upgradeProperty('articleData');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const actionBtn = e.target.closest('button[data-article-action]');
        if (!actionBtn) return;
        const action = actionBtn.dataset.articleAction;
        if (action === 'scroll-catalog') {
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'open-contribute') {
          const dialog = document.getElementById('entity-form-dialog');
          if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
        }
      },
      { signal: this.#abortController.signal }
    );

    if (this.#article) {
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

  get articleData() {
    return { article: this.#article, contextLabel: this.#contextLabel };
  }

  set articleData(payload) {
    if (!payload) return;
    if (payload.article) {
      this.#article = payload.article;
      this.#contextLabel = payload.contextLabel || 'Présentation';
    } else {
      this.#article = payload;
    }
    if (this.isConnected) this.#render();
  }

  #render() {
    const a = this.#article || {};
    const title = a.header?.h || 'Présentation BECAME';
    const rawHtml = a.main?.p || '';
    const videoSrc = (a.main?.video || '').trim();
    const audioSrc = (a.main?.audio || '').trim();

    let mediaHtml = '';
    if (videoSrc) {
      mediaHtml += `
        <figure>
          <video controls width="640" height="360">
            <source src="${escapeHtml(videoSrc)}.mp4" type="video/mp4">
          </video>
        </figure>
      `;
    }
    if (audioSrc) {
      mediaHtml += `
        <figure>
          <audio controls>
            <source src="${escapeHtml(audioSrc)}.mp3" type="audio/mpeg">
          </audio>
        </figure>
      `;
    }

    this.innerHTML = `
      <header class="article-header">
        <div>
          <span class="card-pill">${escapeHtml(this.#contextLabel)}</span>
          <h2>${escapeHtml(title)}</h2>
        </div>
      </header>
      <div class="article-body">
        ${mediaHtml}
        <div>${rawHtml}</div>
      </div>
      <footer class="article-footer">
        <button type="button" class="btn btn-soft" data-article-action="scroll-catalog">
          Voir la console pédagogique ↓
        </button>
        <button type="button" class="btn" data-article-action="open-contribute">
          + Ajouter un contenu ici
        </button>
      </footer>
    `;
  }
}

/**
 * 5. <became-item-card>
 * Remplace .courses_tpl, .ressources_tpl, .classes_tpl, .profs_tpl.
 * Utilise ElementInternals.states ('expanded') pour l'état de pliage/dépliage.
 */
export class BecameItemCard extends HTMLElement {
  #internals = null;
  #item = null;
  #expanded = false;
  #abortController = null;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      try {
        this.#internals = this.attachInternals();
      } catch {
        this.#internals = null;
      }
    }
  }

  connectedCallback() {
    this.#upgradeProperty('item');
    this.#abortController = new AbortController();

    this.addEventListener(
      'click',
      (e) => {
        const toggleBtn = e.target.closest('button[data-card-toggle="details"]');
        if (toggleBtn) {
          this.#setExpanded(!this.#expanded);
          return;
        }

        const tagBtn = e.target.closest('button.tag-chip[data-tag-label]');
        if (tagBtn) {
          this.dispatchEvent(
            new CustomEvent('became:filter-tag', {
              bubbles: true,
              composed: true,
              detail: { tagLabel: tagBtn.dataset.tagLabel }
            })
          );
          return;
        }

        const primaryBtn = e.target.closest('button[data-card-action]');
        if (!primaryBtn || !this.#item) return;
        const action = primaryBtn.dataset.cardAction;
        if (action === 'open-course') {
          this.dispatchEvent(
            new CustomEvent('became:open-course', {
              bubbles: true,
              composed: true,
              detail: { course: this.#item }
            })
          );
        } else if (action === 'open-resource') {
          this.dispatchEvent(
            new CustomEvent('became:open-resource', {
              bubbles: true,
              composed: true,
              detail: { resource: this.#item }
            })
          );
        }
      },
      { signal: this.#abortController.signal }
    );

    if (this.#item) {
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

  #setExpanded(flag) {
    this.#expanded = Boolean(flag);
    if (this.#internals?.states) {
      if (this.#expanded) this.#internals.states.add('expanded');
      else this.#internals.states.delete('expanded');
    } else {
      this.toggleAttribute('data-expanded', this.#expanded);
    }
    const extra = this.querySelector('[data-extra-details]');
    const btn = this.querySelector('button[data-card-toggle="details"]');
    if (extra) extra.hidden = !this.#expanded;
    if (btn) btn.setAttribute('aria-expanded', String(this.#expanded));
  }

  get item() {
    return this.#item;
  }

  set item(val) {
    this.#item = val || null;
    if (this.isConnected && this.#item) {
      this.#render();
    }
  }

  #parseTags(tagsStr) {
    if (!tagsStr || typeof tagsStr !== 'string') return [];
    return tagsStr
      .split('||')
      .map((part) => {
        const idx = part.indexOf('_');
        return idx !== -1 ? part.slice(idx + 1) : part;
      })
      .filter(Boolean);
  }

  #computeStats(raw) {
    const likes = safeJsonParse(raw.likes, []).length;
    const viewsArr = safeJsonParse(raw.views, []);
    const coms = safeJsonParse(raw.coms, []).length;
    const notesArr = safeJsonParse(raw.note, []);
    const noteAvg =
      notesArr.length > 0
        ? (notesArr.reduce((acc, n) => acc + Number(n || 0), 0) / notesArr.length).toFixed(1)
        : '5.0';
    return { likes, views: viewsArr.length, coms, noteAvg, noteCount: notesArr.length };
  }

  #render() {
    const { kind, data } = this.#item;

    if (kind === 'classes') {
      const eleves = typeof data.eleves === 'string' && data.eleves ? data.eleves.split('||') : [];
      const profs = typeof data.profs === 'string' && data.profs ? data.profs.split('||') : [];
      this.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="card-pill">${escapeHtml(data.type || 'Classe')}</span>
            <span>${escapeHtml(data.langue?.toUpperCase() || 'FR')} · ${escapeHtml(data.pays?.toUpperCase() || 'FR')}</span>
          </div>
          <h3 class="card-title">${escapeHtml(data.name || 'Classe')}</h3>
          <p class="card-desc">${escapeHtml(data.short_descr || data.title || '')}</p>
        </div>
        <div class="card-meta-footer">
          <span>Élèves : <strong>${eleves.length}</strong> · Profs : <strong>${profs.length}</strong></span>
          <span>Créée le ${escapeHtml(String(data.date || '').slice(0, 10))}</span>
        </div>
      `;
      return;
    }

    if (kind === 'profs') {
      const stats = this.#computeStats(data);
      this.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="card-pill">Professeur</span>
            <span>★ ${stats.noteAvg}/5 (${stats.noteCount})</span>
          </div>
          <h3 class="card-title">${escapeHtml(data.name || `${data.prenom || ''} ${data.nom || ''}`)}</h3>
          <p class="card-desc">${escapeHtml(data.short_descr || data.title || '')}</p>
          <div data-extra-details hidden>
            <p class="card-desc">${escapeHtml(data.long_descr || data.motivation || '')}</p>
          </div>
        </div>
        <div class="card-meta-footer">
          <span>♥ ${stats.likes} · 👁 ${stats.views}</span>
          <button type="button" class="btn" data-card-toggle="details" aria-expanded="false">Détails</button>
        </div>
      `;
      return;
    }

    if (kind === 'courses') {
      const stats = this.#computeStats(data);
      const tags = this.#parseTags(data.tags);
      const tagsHtml = tags
        .map(
          (t) =>
            `<button type="button" class="tag-chip" data-tag-label="${escapeHtml(t)}">#${escapeHtml(t)}</button>`
        )
        .join('');
      const prixLabel = Number(data.prix) > 0 ? `${data.prix} €` : 'Gratuit';

      this.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="card-pill">${escapeHtml(data.type_ || 'Cours interactif')}</span>
            <span>⏱ ${escapeHtml(data.duree || 60)} min · <strong>${escapeHtml(prixLabel)}</strong></span>
          </div>
          <h3 class="card-title">${escapeHtml(data.name || 'Cours')}</h3>
          <p class="card-desc">${escapeHtml(data.short_descr || data.title || '')}</p>
          <div class="card-tags">${tagsHtml}</div>
          <div data-extra-details hidden>
            <p class="card-desc">${escapeHtml(data.long_descr || '')}</p>
          </div>
        </div>
        <div class="card-meta-footer">
          <span>Par <strong>${escapeHtml(data.prof_name || 'Professeur')}</strong> · ★ ${stats.noteAvg}</span>
          <div class="header-actions">
            <button type="button" class="btn" data-card-toggle="details" aria-expanded="false">Infos</button>
            <button type="button" class="btn btn-primary" data-card-action="open-course">Ouvrir le cours</button>
          </div>
        </div>
      `;
      return;
    }

    if (kind === 'ressources') {
      const stats = this.#computeStats(data);
      const tags = this.#parseTags(data.tags);
      const tagsHtml = tags
        .map(
          (t) =>
            `<button type="button" class="tag-chip" data-tag-label="${escapeHtml(t)}">#${escapeHtml(t)}</button>`
        )
        .join('');
      const author = data.prof_name || `${data.prenom || ''} ${data.nom || ''}`.trim() || 'Contributeur';

      this.innerHTML = `
        <div>
          <div class="card-badge-row">
            <span class="card-pill">${escapeHtml(data.type || 'Ressource')}</span>
            <span>★ ${stats.noteAvg}/5 · 👁 ${stats.views}</span>
          </div>
          <h3 class="card-title">${escapeHtml(data.name || 'Ressource')}</h3>
          <p class="card-desc">${escapeHtml(data.short_descr || data.title || '')}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
        <div class="card-meta-footer">
          <span>Auteur : <strong>${escapeHtml(author)}</strong></span>
          <button type="button" class="btn btn-soft" data-card-action="open-resource">Explorer les supports</button>
        </div>
      `;
    }
  }
}

if (!customElements.get('became-article-view')) {
  customElements.define('became-article-view', BecameArticleView);
}
if (!customElements.get('became-item-card')) {
  customElements.define('became-item-card', BecameItemCard);
}

