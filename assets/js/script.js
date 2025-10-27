document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeMenu");

  // Create overlay if not already present
  let overlay = document.getElementById("menuOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "menuOverlay";
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
  }

  // Functions
  function openMenu() {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
  }

  // Event Listeners
  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close on link click
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Reset if resized back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1025) {
      closeMenu();
    }
  });
});
