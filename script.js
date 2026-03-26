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