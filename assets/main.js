(() => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu toggle (if present)
  const btn = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  let menuOpen = false;
  const setOpen = (open) => {
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (btn) btn.textContent = open ? "Close menu" : "Open menu";
    if (mobileNav) mobileNav.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    menuOpen = !!open;
    // ensure header is visible when menu is open
    const header = document.querySelector(".cast-header") || document.querySelector(".site-header");
    if (header && open) {
      header.classList.remove("hidden");
      header.classList.add("visible");
    }
  };

  if (btn) {
    btn.addEventListener("click", () => {
      setOpen(!menuOpen);
    });
  }

  if (mobileNav) {
    // Close on link click (mobile)
    mobileNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      setOpen(false);
    });
  }

  // Header show/hide on scroll: hide when scrolling down, show when scrolling up.
  const header = document.querySelector(".cast-header") || document.querySelector(".site-header");
  if (header) {
    header.classList.add("visible");
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 10;
    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      if (menuOpen) {
        // keep header visible when mobile menu is open
        lastY = currentY;
        return;
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY;
          if (Math.abs(delta) > threshold) {
            if (delta > 0 && currentY > 120) {
              // scrolled down
              header.classList.add("hidden");
              header.classList.remove("visible");
            } else {
              // scrolled up
              header.classList.remove("hidden");
              header.classList.add("visible");
            }
            lastY = currentY;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();


