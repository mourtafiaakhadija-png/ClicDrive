<<<<<<< HEAD
const cardsGrid = document.getElementById("cards");
const seeMoreBtn = document.getElementById("VoirplusBtn");
const categoryButtons = document.querySelectorAll(".categ-btn");
const prixMinInput = document.getElementById("minPrix");
const prixMaxInput = document.getElementById("maxPrix");
const transmCheckboxes = document.querySelectorAll('#transm-option input[type="checkbox"]');
const resetBtn = document.getElementById("resetBtn");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");

let currentCategory = "all";
let visibleCount = 12;

// Search bar
const params = new URLSearchParams(window.location.search);
const initialSearchTerm = decodeURIComponent(params.get("search") || "").trim().toLowerCase();


function getSelectedTransmissions() {
  const values = [];
  transmCheckboxes.forEach(cb => {
    if (cb.checked) {
      values.push(cb.value.toLowerCase()); 
    }
  });
  return values;
}


function applyFilters() {
  const minPrix = Number(prixMinInput.value) || 0;
  const maxPrix = Number(prixMaxInput.value) || Infinity;
  const selectedTransmissions = getSelectedTransmissions();
  const category = currentCategory;
  const searchTerm = initialSearchTerm;

  const isPrixFilter = prixMinInput.value !== "" || prixMaxInput.value !== "";
  const isCategoryFilter = category !== "all";
  const isTransmFilter = selectedTransmissions.length > 0;
  const isSearchFilter = searchTerm !== "";
  const isAnyFilter = isPrixFilter || isCategoryFilter || isTransmFilter || isSearchFilter;

  if (isAnyFilter) {
    seeMoreBtn.style.display = "none";
  } else {
    seeMoreBtn.style.display = "";
  }

  cards.forEach((card, index) => {
    const cardPrix = Number(card.dataset.price) || 0;
    const cardCategory = (card.dataset.category || "").toLowerCase();
    const cardTransmission = (card.dataset.transm || "").toLowerCase();
    
    const titreEl = card.querySelector(".card-titre");
    const modelEl = card.querySelector(".card-model");
    function normalize(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ");
    }

    const nameText = normalize((titreEl?.textContent || "") + " " + (modelEl?.textContent || ""));
    let okSearch = true;
    if (searchTerm) {
      const normSearch = normalize(searchTerm);
      okSearch = nameText.includes(normSearch) || cardCategory.includes(normSearch);
    }

    const okPrix = cardPrix >= minPrix && cardPrix <= maxPrix;
    const okCategory =
      category === "all" ||
      cardCategory === category.toLowerCase();

    
      let okTransmission = true;
    if (selectedTransmissions.length > 0) {
      okTransmission = selectedTransmissions.includes(cardTransmission);
    }
    
    let okVisible = true;
    if (!isAnyFilter) {
      okVisible = index < visibleCount;
    }

    if (okPrix && okCategory && okTransmission && okSearch && okVisible) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  if (!isAnyFilter && visibleCount >= cards.length) {
    seeMoreBtn.style.display = "none";
  }
}


// catégorie
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.getAttribute("id-category") || "all";

    categoryButtons.forEach(b => b.classList.remove("actif"));
    btn.classList.add("actif");

    applyFilters();
  });
});

// prix
prixMinInput.addEventListener("input", applyFilters);
prixMaxInput.addEventListener("input", applyFilters);

// transmission
transmCheckboxes.forEach(cb => {
  cb.addEventListener("change", applyFilters);
});

// btn Voir plus
seeMoreBtn.addEventListener("click", () => {
  visibleCount += 12;
  applyFilters();
});

// reset
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  prixMinInput.value = "";
  prixMaxInput.value = "";
  transmCheckboxes.forEach(cb => cb.checked = false);

  currentCategory = "all";
  categoryButtons.forEach(b => b.classList.remove("actif"));
  const allBtn = document.querySelector('.categ-btn[id-category="all"]');
  if (allBtn) allBtn.classList.add("actif");

  visibleCount = 12;

  applyFilters();
});


applyFilters();

const catalogue = document.querySelector('.catalog-section'); // ila bghiti tsta3mlo mlli b3d
const panels = document.querySelectorAll('.card-detail');

// Associer chaque carte à son panel (même index)
cards.forEach((card, index) => {
  const voirPlusBtn = card.querySelector('.voirplus-btn');

  const openPanel = () => {
    panels.forEach(p => p.classList.remove('active'));
    // ouvrir celui qui correspond à cette carte
    const panelToShow = panels[index];
    if (panelToShow) {
      panelToShow.classList.add('active');
    }
  };

  if (voirPlusBtn) {
    voirPlusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPanel();
    });
  }
});

// Boutons pour fermer
const closeButtons = document.querySelectorAll('.card-detail-close');

const closeAllPanels = () => {
  panels.forEach(p => p.classList.remove('active'));
  document.body.classList.remove('modal-open');
};

closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllPanels();
  });
});

// fermer par l'overlay sombre
panels.forEach(panel => {
  panel.addEventListener('click', (e) => {
    if (e.target === panel) {
      closeAllPanels();
    }
  });
});

//  BOUTONS "RÉSERVER" F PANELS 
const reserverBtns = document.querySelectorAll('.rent-btn');

reserverBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    window.location.href = 'reservation.html';
  });
});

applyFilters();


=======
// 1) njibo ga3 les boutons "Rent now"
const rentButtons = document.querySelectorAll('.louer-btn2');

// 2) n3iytu 3la chaque bouton wa7ed b tour
rentButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // 3) njibo lcarte li kayna fih had lbutton
    const card = btn.closest('.card');

    // 4) nzidou lclass show-overlay 3la had carte
    card.classList.add('show-overlay');
  });
});

// 5) njibo ga3 les boutons "Voir plus" (ila kaynin)
const voirPlusButtons = document.querySelectorAll('.voirplus-btn');

// 6) n3iytu 3la chaque "Voir plus"
voirPlusButtons.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); // 7) mankhaliwch click ytsefta 7aja okhra

    const card = btn.closest('.card');
    // 8) hna par exemple n7iydo overlay (ila bghiti)
    card.classList.remove('show-overlay');
  });
});
>>>>>>> d22656ce6dde00b85dd00eee753e1c1bcccc506f
