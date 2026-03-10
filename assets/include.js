(function () {
  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (!headerEl && !footerEl) return;

  function getCurrentPage() {
    var path = window.location.pathname.replace(/^\/+/, "").split("/")[0];
    return path === "" || path === "index.html" ? "index.html" : path;
  }

  function setActiveNav(container) {
    if (!container) return;
    var page = getCurrentPage();
    var links = container.querySelectorAll('a[href]');
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var linkPage = href === "index.html" || href === "" ? "index.html" : href;
      if (linkPage === page) a.classList.add("is-active");
      else a.classList.remove("is-active");
    });
  }

  function setYear() {
    var yearSpan = document.querySelector("[data-year]");
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
  }

  function initMenuAndScroll() {
    var btn = document.querySelector("[data-menu-button]");
    var mobileNav = document.querySelector("[data-mobile-nav]");
    var menuOpen = false;

    function setOpen(open) {
      menuOpen = !!open;
      if (btn) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "Close menu" : "Open menu";
      }
      if (mobileNav) mobileNav.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      var header = document.querySelector(".cast-header") || document.querySelector(".site-header");
      if (header && open) {
        header.classList.remove("hidden");
        header.classList.add("visible");
      }
    }

    if (btn) btn.addEventListener("click", function () { setOpen(!menuOpen); });
    if (mobileNav) {
      mobileNav.addEventListener("click", function (e) {
        var a = e.target.closest("a");
        if (a) setOpen(false);
      });
    }

    var header = document.querySelector(".cast-header") || document.querySelector(".site-header");
    if (header) {
      header.classList.add("visible");
      var lastY = window.scrollY;
      var ticking = false;
      window.addEventListener(
        "scroll",
        function () {
          var currentY = window.scrollY;
          if (menuOpen) return;
          if (!ticking) {
            requestAnimationFrame(function () {
              var delta = currentY - lastY;
              if (Math.abs(delta) > 10) {
                if (delta > 0 && currentY > 120) {
                  header.classList.add("hidden");
                  header.classList.remove("visible");
                } else {
                  header.classList.remove("hidden");
                  header.classList.add("visible");
                }
                lastY = currentY;
              }
              ticking = false;
            });
            ticking = true;
          }
        },
        { passive: true }
      );
    }
  }

  /* Use root-relative URLs so header/footer load on any path (e.g. 404 pages). */
  var headerUrl = "/assets/header.html";
  var footerUrl = "/assets/footer.html";

  Promise.all([
    headerEl ? fetch(headerUrl).then(function (r) { return r.text(); }) : Promise.resolve(""),
    footerEl ? fetch(footerUrl).then(function (r) { return r.text(); }) : Promise.resolve(""),
  ]).then(function (results) {
    if (headerEl && results[0]) {
      headerEl.innerHTML = results[0];
      setActiveNav(headerEl);
    }
    if (footerEl && results[1]) {
      footerEl.innerHTML = results[1];
      setYear();
    }
    initMenuAndScroll();
    /* Contact us: prevent # jump; add chatbot open logic here later */
    ["open-chatbot", "open-chatbot-mobile", "open-chatbot-footer"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("click", function (e) { e.preventDefault(); /* TODO: open chatbot */ });
    });
  }).catch(function () {
    if (headerEl) headerEl.innerHTML = "<p class=\"muted\">Header could not be loaded. Please view this site from a web server.</p>";
    if (footerEl) footerEl.innerHTML = "<footer class=\"site-footer\"><div class=\"container\"><p class=\"muted\">Footer could not be loaded.</p></div></footer>";
  });
})();
