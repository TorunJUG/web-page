document.documentElement.classList.add("js");

const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const currentYear = document.querySelector("[data-current-year]");
const brandLogos = document.querySelectorAll('img.brand-logo[src$="logo_mini.png"]');

const socialProfiles = [
  {
    name: "YouTube",
    label: "Toruń JUG na YouTube",
    url: "https://www.youtube.com/channel/UCLuHypXd9ODOivs7gRpxNZg",
    icon: "youtube",
  },
  {
    name: "X / Twitter",
    label: "Toruń JUG na X / Twitterze",
    url: "https://twitter.com/TorunJUG",
    icon: "x",
  },
  {
    name: "Facebook",
    label: "Toruń JUG na Facebooku",
    url: "https://www.facebook.com/TorunJUG",
    icon: "facebook",
  },
  {
    name: "LinkedIn",
    label: "Toruń JUG na LinkedIn",
    url: "https://www.linkedin.com/company/106077920",
    icon: "linkedin",
  },
];

const createSocialLinks = (iconSource) => {
  const socialNavigation = document.createElement("nav");
  socialNavigation.className = "header-socials";
  socialNavigation.setAttribute("aria-label", "Media społecznościowe");

  socialProfiles.forEach((profile) => {
    const link = document.createElement("a");
    link.href = profile.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = profile.name;
    link.setAttribute("aria-label", profile.label);

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `${iconSource}#${profile.icon}`);
    icon.append(use);
    link.append(icon);
    socialNavigation.append(link);
  });

  return socialNavigation;
};

document.querySelectorAll("[data-nav-panel]").forEach((panel) => {
  if (panel.querySelector(".header-socials")) {
    return;
  }

  const logoSource = document.querySelector(".brand-logo")?.getAttribute("src");
  const iconSource = logoSource?.replace("logo_mini.png", "social-icons.svg");
  const primaryNavigation = panel.querySelector("nav");

  if (iconSource && primaryNavigation) {
    primaryNavigation.after(createSocialLinks(iconSource));
  }
});

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

  window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}
