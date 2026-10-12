(() => {
  const nav = document.querySelector('.section-navigation');
  if (!nav) return;
  const entries = Array.from(nav.querySelectorAll('a[href^="#"]')).map(link => ({
    link, section: document.getElementById(link.hash.slice(1))
  })).filter(entry => entry.section);
  if (!entries.length) return;
  let pending = false;
  function update() {
    let active = entries[0];
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= 150) active = entry;
    }
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = entries[entries.length - 1];
    }
    for (const entry of entries) {
      if (entry === active) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
    pending = false;
  }
  function scheduleUpdate() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.addEventListener('toggle', scheduleUpdate, true);
  update();
})();
