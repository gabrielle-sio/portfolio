// Toggle du menu mobile (compatible avec le CSS fourni)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (!btn || !navList) return;

  btn.addEventListener('click', () => {
    const shown = getComputedStyle(navList).display !== 'none';
    if (shown) {
      navList.style.display = 'none';
    } else {
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
    }
  });
});

document.addEventListener('DOMContentLoaded', function(){
  // création dynamique du overlay
  const overlay = document.createElement('div');
  overlay.className = 'img-lightbox-overlay';
  overlay.innerHTML = '<button class="img-lightbox-close" aria-label="Fermer">✕</button><img alt=""><div class="img-lightbox-caption"></div>';
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const caption = overlay.querySelector('.img-lightbox-caption');
  const closeBtn = overlay.querySelector('.img-lightbox-close');

  function openLightbox(src, alt){
    imgEl.src = src;
    imgEl.alt = alt || '';
    caption.textContent = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    imgEl.focus?.();
  }
  function closeLightbox(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  // gestion des clics délégués sur images .profile
  document.body.addEventListener('click', function(e){
    const target = e.target.closest('img.profile');
    if(target){
      e.preventDefault();
      openLightbox(target.src, target.alt || target.dataset.caption || '');
      return;
    }
    if(e.target === overlay || e.target === closeBtn) closeLightbox();
  });

  // fermer avec Échap
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
});