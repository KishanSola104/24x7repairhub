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
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
});

// close on overlay click
overlay.addEventListener("click", closeMenu);

// close on any nav link click
// close on any nav link click (except Services parent)
mobileMenu.querySelectorAll("a").forEach((a) => {
  if (a.id !== "servicesToggle") {  // exclude Services
    a.addEventListener("click", closeMenu);
  }
});

// close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// defensive: click outside
document.addEventListener("click", (e) => {
  if (
    !mobileMenu.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    mobileMenu.classList.contains("active")
  ) {
    closeMenu();
  }
});

// close menu on clicking "X" button
if (closeBtn) {
  closeBtn.addEventListener("click", closeMenu);
}


// Services submenu toggle
// Services submenu toggle
const servicesToggle = document.getElementById("servicesToggle");
const servicesSubmenu = document.getElementById("servicesSubmenu");

if (servicesToggle && servicesSubmenu) {
  servicesToggle.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page jump
    servicesSubmenu.classList.toggle("active");
    servicesToggle.parentElement.classList.toggle("active");
  });
}

// Confirm Booking
const bookingModal = document.getElementById("bookingModal");
const closeBookingModal = document.getElementById("closeBookingModal");
const serviceSelect = document.getElementById("serviceSelect");
const otherServiceContainer = document.getElementById("otherServiceContainer");
const citySelect = document.getElementById("citySelect");
const otherCityContainer = document.getElementById("otherCityContainer");

// Open modal on any button with class "btn"
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    bookingModal.classList.add("active");
    document.documentElement.style.overflow = "hidden"; 
  });
});

// Close modal function
function closeModal() {
  bookingModal.classList.add("closing");
  bookingModal.classList.remove("active");
  document.documentElement.style.overflow = "";

  setTimeout(() => {
    bookingModal.classList.remove("closing");
  }, 400); // match transition duration
}

// Close modal on X click
closeBookingModal.addEventListener("click", closeModal);

// Close modal on clicking outside content
bookingModal.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeModal();
});

// Show/hide "Other Service" field
serviceSelect.addEventListener("change", () => {
  if (serviceSelect.value === "Other") {
    otherServiceContainer.style.display = "block";
  } else {
    otherServiceContainer.style.display = "none";
  }
});

// Show/hide "Other Service" field
citySelect.addEventListener("change", () => {
  if (citySelect.value === "Other") {
    otherCityContainer.style.display = "block";
  } else {
    otherCityContainer.style.display = "none";
  }
});
