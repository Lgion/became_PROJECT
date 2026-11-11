/**
 * BECAME LMS — Point d'entrée des 9 Custom Elements (Étape 3)
 * Orchestre la communication par CustomEvents entre :
 * 1. <became-mega-menu>
 * 2. <became-breadcrumb>
 * 3. <became-hierarchy-explorer>
 * 4. <became-article-view>
 * 5. <became-item-card>
 * 6. <became-resource-viewer>
 * 7. <became-course-timeline>
 * 8. <became-live-classroom>
 * 9. <became-entity-form>
 */

import './navigation.js';
import './catalog.js';
import './dialogs.js';

const initData = window.__BECAME_INIT__ || {};

const megaMenu = document.getElementById('app-mega-menu');
const breadcrumb = document.getElementById('app-breadcrumb');
const explorer = document.getElementById('app-explorer');
const articleView = document.getElementById('app-article');
const heroWelcome = document.getElementById('hero-welcome');

const catalogGrid = document.getElementById('catalog-grid');
const catalogSubtitle = document.getElementById('catalog-subtitle');
const catalogTabs = document.querySelectorAll('.catalog-tab[data-tab]');

const resourceDialog = document.getElementById('resource-viewer-dialog');
const resourceViewer = document.getElementById('app-resource-viewer');
const classroomDialog = document.getElementById('live-classroom-dialog');
const liveClassroom = document.getElementById('app-live-classroom');

const searchForm = document.getElementById('global-filter-form');
const searchInput = document.getElementById('global-search-input');
const brandHomeLink = document.getElementById('brand-home-link');

// État courant du catalogue pour les onglets et le filtrage
const catalogState = {
  activeTab: 'courses',
  filterQuery: '',
  classes: [],
  profs: [],
  courses: [],
  ressources: []
};

function updateCatalogCounts() {
  for (const kind of ['courses', 'ressources', 'classes', 'profs']) {
    const badge = document.querySelector(`[data-count="${kind}"]`);
    if (badge) {
      badge.textContent = String((catalogState[kind] || []).length);
    }
  }
}

function renderCatalogCards() {
  if (!catalogGrid) return;

  for (const tabBtn of catalogTabs) {
    const isSel = tabBtn.dataset.tab === catalogState.activeTab;
    tabBtn.setAttribute('aria-selected', String(isSel));
  }

  updateCatalogCounts();

  const kind = catalogState.activeTab;
  let items = catalogState[kind] || [];
  const q = catalogState.filterQuery.toLowerCase();

  if (q) {
    items = items.filter((row) => {
      const hay = `${row.name || ''} ${row.title || ''} ${row.short_descr || ''} ${row.tags || ''} ${row.prof_name || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }

  catalogGrid.replaceChildren();

  if (items.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'catalog-subtitle';
    emptyMsg.textContent =
      q
        ? `Aucun élément de la catégorie « ${kind} » ne correspond au filtre « ${catalogState.filterQuery} ».`
        : `Aucun élément dans l'onglet « ${kind} » pour cette étape. Sélectionnez une filière (pour les classes), une matière (pour les professeurs) ou un sujet (pour les cours et ressources).`;
    catalogGrid.appendChild(emptyMsg);
    return;
  }

  for (const row of items) {
    const card = document.createElement('became-item-card');
    card.item = { kind, data: row };
    catalogGrid.appendChild(card);
  }
}

// 1. Initialisation avec les données du serveur
if (megaMenu && Array.isArray(initData.menus)) {
  megaMenu.menus = initData.menus;
}

if (articleView && initData.accueil?.article) {
  articleView.articleData = {
    article: initData.accueil.article,
    contextLabel: 'Accueil BECAME'
  };
}

renderCatalogCards();

// 2. Navigation depuis le méga-menu
document.addEventListener('became:select-level', (e) => {
  const detail = e.detail;
  if (!detail) return;
  if (heroWelcome) heroWelcome.hidden = true;
  explorer?.loadLevel(detail);
});

// 3. Synchronisation du fil d'Ariane
document.addEventListener('became:trail-change', (e) => {
  const steps = e.detail?.steps;
  if (breadcrumb && Array.isArray(steps)) {
    breadcrumb.trail = steps;
  }
});

// 4. Retour en arrière via le fil d'Ariane ou le logo d'accueil
function returnToHome() {
  if (heroWelcome) heroWelcome.hidden = false;
  if (megaMenu) megaMenu.activeLevelId = null;
  breadcrumb?.reset();
  explorer?.resetToHome();
  if (articleView && initData.accueil?.article) {
    articleView.articleData = {
      article: initData.accueil.article,
      contextLabel: 'Accueil BECAME'
    };
  }
  catalogState.classes = [];
  catalogState.profs = [];
  catalogState.courses = [];
  catalogState.ressources = [];
  if (catalogSubtitle) {
    catalogSubtitle.textContent =
      'Sélectionnez un niveau, une filière, une matière ou un sujet pour explorer ses contenus associés.';
  }
  renderCatalogCards();
}

brandHomeLink?.addEventListener('click', (e) => {
  e.preventDefault();
  returnToHome();
});

document.addEventListener('became:breadcrumb-navigate', (e) => {
  const step = e.detail?.step;
  if (!step) return;
  if (step.type === 'home') {
    returnToHome();
  } else if (step.type === 'level' && step.meta) {
    explorer?.loadLevel(step.meta);
  } else if (step.type === 'filiere') {
    explorer?.selectFiliere(step.id, step.label);
  } else if (step.type === 'matiere') {
    explorer?.selectMatiere(step.id, step.label);
  } else if (step.type === 'sujet') {
    explorer?.selectSujet(step.id, step.label);
  }
});

// 5. Mise à jour de l'article contextuel
document.addEventListener('became:article-change', (e) => {
  if (articleView && e.detail?.article) {
    articleView.articleData = e.detail;
  }
});

// 6. Mise à jour du catalogue (Classes, Profs, Cours, Ressources)
document.addEventListener('became:catalog-update', (e) => {
  const d = e.detail || {};
  if (Array.isArray(d.classes)) catalogState.classes = d.classes;
  if (Array.isArray(d.profs)) catalogState.profs = d.profs;
  if (Array.isArray(d.courses)) catalogState.courses = d.courses;
  if (Array.isArray(d.ressources)) catalogState.ressources = d.ressources;
  if (d.tab) catalogState.activeTab = d.tab;
  if (catalogSubtitle && d.contextLabel) {
    catalogSubtitle.textContent = d.contextLabel;
  }
  renderCatalogCards();
});

// 7. Changement d'onglet dans le catalogue
for (const tabBtn of catalogTabs) {
  tabBtn.addEventListener('click', () => {
    catalogState.activeTab = tabBtn.dataset.tab;
    renderCatalogCards();
  });
}

// 8. Ouverture des modales <dialog> pour un Cours ou une Ressource
document.addEventListener('became:open-resource', (e) => {
  const resource = e.detail?.resource;
  if (!resource || !resourceViewer || !resourceDialog) return;
  resourceViewer.resource = resource;
  resourceDialog.showModal();
});

document.addEventListener('became:open-course', (e) => {
  const course = e.detail?.course;
  if (!course || !liveClassroom || !classroomDialog) return;
  liveClassroom.course = course;
  classroomDialog.showModal();
});

// Arrêt propre de la timeline à la fermeture de la salle de cours
classroomDialog?.addEventListener('close', () => {
  const tl = liveClassroom?.querySelector('became-course-timeline');
  tl?.stopPlayback?.();
});

// 9. Filtrage par mot-clé ou clic sur un #tag
document.addEventListener('became:filter-tag', (e) => {
  const tagLabel = e.detail?.tagLabel || '';
  if (searchInput) searchInput.value = tagLabel;
  catalogState.filterQuery = tagLabel;
  explorer?.setFilter(tagLabel);
  renderCatalogCards();
});

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = searchInput?.value || '';
  catalogState.filterQuery = q;
  explorer?.setFilter(q);
  renderCatalogCards();
});

searchInput?.addEventListener('input', () => {
  const q = searchInput.value || '';
  catalogState.filterQuery = q;
  explorer?.setFilter(q);
  renderCatalogCards();
});

