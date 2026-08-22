document.documentElement.classList.add("js");

const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const currentYear = document.querySelector("[data-current-year]");
const brandLogos = document.querySelectorAll('img.brand-logo[src$="logo_mini.png"]');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

brandLogos.forEach((logo) => {
  const staticSource = logo.getAttribute("src");
  const animatedSource = staticSource.replace("logo_mini.png", "logo_mini_animated.gif");

  logo.addEventListener("mouseenter", () => {
    logo.src = `${animatedSource}?restart=${Date.now()}`;
  });

  logo.addEventListener("mouseleave", () => {
    logo.src = staticSource;
  });
});

if (menuToggle && navPanel) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Otwórz menu");
    navPanel.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Zamknij menu");
    navPanel.classList.add("is-open");
    document.body.classList.add("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.matchMedia("(min-width: 781px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}
