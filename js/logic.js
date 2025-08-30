// 1. Extract brand from URL (check everywhere)
function getBrandFromUrl(allBrands) {
  const url = window.location.href.toLowerCase();

  // Look for each brand name inside the full URL
  for (let brand in allBrands) {
    if (url.includes(brand.toLowerCase())) {
      return brand.toLowerCase();
    }
  }

  return null; // No brand found
}

// 2. Load JSON and update page
async function updateBrandContent() {
  const homeLogo = document.getElementById("homeLogo");
  const homeTitle = document.getElementById("homeTitle");

  try {
    const response = await fetch("/data/brands.json");
    const brands = await response.json();

    let brand = getBrandFromUrl(brands);

    // If found in URL → save to localStorage
    if (brand) {
      localStorage.setItem("selectedBrand", brand);
    } else {
      // Otherwise → check if we already saved one
      brand = localStorage.getItem("selectedBrand");
    }

    if (brand && brands[brand]) {
      //  Brand found → show brand logo and title
      homeLogo.src = brands[brand].logo;
      homeTitle.textContent = brands[brand].title;
    } else {
      //  No brand → fallback to default
      homeLogo.src = "/images/logos/defaultLogo.png";
      homeTitle.textContent = "24x7 Repair Center";
    }
  } catch (err) {
    console.error("Error loading brands.json", err);
    // Fallback just in case
    homeLogo.src = "/images/logos/defaultLogo.png";
    homeTitle.textContent = "24x7 Repair Center";
  }
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", updateBrandContent);

// --------- Mobile Menu ----------
// (your mobile menu JS will follow here…)
