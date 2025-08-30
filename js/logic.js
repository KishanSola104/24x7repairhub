// 1. Extract brand from URL (either /brand or query string like h1=sony...)
function getBrandFromUrl() {
  const pathParts = window.location.pathname.split("/");
  let brand = pathParts[1]?.toLowerCase(); // e.g. /sony → sony

  if (!brand) {
    // Check query param (like ?h1=sony led tv repair)
    const params = new URLSearchParams(window.location.search);
    const h1Param = params.get("h1");
    if (h1Param) {
      // take first word from "sony led tv repair"
      brand = h1Param.split(" ")[0].toLowerCase();
    }
  }
  return brand;
}

// 2. Load JSON and update page
async function updateBrandContent() {
  const homeLogo = document.getElementById("homeLogo");
  const homeTitle = document.getElementById("homeTitle");

  let brand = getBrandFromUrl();

  //  If brand detected from URL → save it
  if (brand) {
    localStorage.setItem("selectedBrand", brand);
  } else {
    //  Else → try to load previously saved brand
    brand = localStorage.getItem("selectedBrand");
  }

  try {
    const response = await fetch("/data/brands.json");
    const brands = await response.json();

    if (brand && brands[brand]) {
      // Brand found → show brand logo and title
      homeLogo.src = brands[brand].logo;
      homeTitle.textContent = brands[brand].title;
    } else {
      // No brand → fallback to default
      homeLogo.src = "/images/logos/defaultLogo.png";
      homeTitle.textContent = "24x7 Repair Center";
    }
  } catch (err) {
    console.error("Error loading brands.json", err);
    // fallback just in case
    homeLogo.src = "/images/logos/defaultLogo.png";
    homeTitle.textContent = "24x7 Repair Center";
  }
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", updateBrandContent);

// --------- Mobile Menu ----------
// (your mobile menu JS will follow here…)
