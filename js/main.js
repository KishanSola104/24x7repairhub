document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  let overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("closeMenu");

  // create overlay if missing
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "menuOverlay";
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
  }

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

  // toggle button
  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
  });

  // close on overlay click
  overlay?.addEventListener("click", closeMenu);

  // close on nav link click (except Services parent)
  mobileMenu?.querySelectorAll("a").forEach((a) => {
    if (a.id !== "servicesToggle") {
      a.addEventListener("click", closeMenu);
    }
  });

  // close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // defensive: click outside menu
  document.addEventListener("click", (e) => {
    if (
      mobileMenu?.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // close menu on clicking "X"
  closeBtn?.addEventListener("click", closeMenu);

  // Services submenu toggle
  const servicesToggle = document.getElementById("servicesToggle");
  const servicesSubmenu = document.getElementById("servicesSubmenu");

  servicesToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    servicesSubmenu.classList.toggle("active");
    servicesToggle.parentElement.classList.toggle("active");
  });

  // Reset mobile menu when resizing back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1025) {
      closeMenu();
      servicesSubmenu?.classList.remove("active");
      servicesToggle?.parentElement.classList.remove("active");
    }
  });

  // --------- Booking Modal ----------
  const bookingModal = document.getElementById("bookingModal");
  const closeBookingModal = document.getElementById("closeBookingModal");
  const serviceSelect = document.getElementById("serviceSelect");
  const otherServiceContainer = document.getElementById(
    "otherServiceContainer"
  );
  const stateDropdown = document.getElementById("stateSelect");

  // open modal on any button with class "btn"
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      bookingModal?.classList.add("active");
      document.getElementById("fullName").focus();
      document.documentElement.style.overflow = "hidden";
    });
  });

  function closeModal() {
    bookingModal?.classList.add("closing");
    bookingModal?.classList.remove("active");
    document.documentElement.style.overflow = "";
    setTimeout(() => bookingModal?.classList.remove("closing"), 400);
  }

  // close modal actions
  closeBookingModal?.addEventListener("click", closeModal);
  bookingModal?.addEventListener("click", (e) => {
    if (e.target === bookingModal) closeModal();
  });

  const servicePlaceholder = document.createElement("option");
  servicePlaceholder.value="";
  servicePlaceholder.textContent="Select A Service";
  serviceSelect.appendChild(servicePlaceholder);
  servicePlaceholder.selected=true;
  servicePlaceholder.disabled=true;

  const services = ["TV Repair","AC Repair","Washing Machine Repair","Refrigerator Repair","Microwave Repair","Dishwasher Repair","Other"];

  services.forEach((service)=>{
    const serviceOption = document.createElement("option");
    serviceOption.value = service;
    serviceOption.textContent = service;
    serviceSelect.appendChild(serviceOption);
  });
  // show/hide "Other Service"
  serviceSelect?.addEventListener("change", () => {
    otherServiceContainer.style.display =
      serviceSelect.value === "Other" ? "block" : "none";
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  stateSelect.innerHTML = "";

  // Add placeholder
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select your state";
  placeholder.disabled = true;
  placeholder.selected = true;
  stateSelect.appendChild(placeholder);

  indianStates.forEach((state) => {
    const stateOption = document.createElement("option");
    stateOption.value = state;
    stateOption.textContent = state;
    stateDropdown.appendChild(stateOption);
  });


  /* Actice Link  */
  const navLinks = document.querySelectorAll(".nav-links a");

  // 1. Highlight based on current page
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");

    // Match absolute page links (like privacy-policy.html)
    if (currentPath.includes(linkPath) && linkPath.endsWith(".html")) {
      link.classList.add("active");
    }

    // Match section links on index.html (#about, #contact, etc.)
    if (currentPath.endsWith("index.html") || currentPath === "/") {
      if (currentHash && linkPath === currentHash) {
        link.classList.add("active");
      } else if (!currentHash && linkPath === "#home") {
        // Default: home is active only at top of index.html
        link.classList.add("active");
      }
    }
  });

  // 2. On scroll, update active section (only for index.html)
  if (currentPath.endsWith("index.html") || currentPath === "/") {
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 80; // adjust header height
        if (pageYOffset >= sectionTop) {
          current = "#" + section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === current) {
          link.classList.add("active");
        }
      });
    });
  }

  
});
