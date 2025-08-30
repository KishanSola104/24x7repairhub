// 1. Extract brand from URL (brand can be anywhere)
function getBrandFromUrl() {
  const url = window.location.href.toLowerCase();

  // List of brands
  const brandList = [
    "acer","aiwa","akai","aoc","blaupunkt","bpl","chroma","ifallcon","haier","hisense",
    "hitachi","impex","intex","jvc","kodak","koryo","lg","lloyd","mi","micromax","mitashi",
    "nokia","oneplus","onida","oscar","panasonic","philips","polaroid","rca","realme",
    "sansui","sanyo","skyworth","sony","samsung","t series","tcl","thomson","toshiba",
    "vu","videocon","vise","vizio"
  ];

  // Try to find brand name anywhere in URL
  for (const brand of brandList) {
    if (url.includes(brand.toLowerCase())) {
      return brand.toLowerCase();
    }
  }

  return null; // no brand found
}

// 2. Load JSON and update page
async function updateBrandContent() {
  const homeLogo = document.getElementById("homeLogo");
  const homeTitle = document.getElementById("homeTitle");

  let brand = getBrandFromUrl();

  if (brand) {
    //  If brand is detected in URL → save in localStorage
    localStorage.setItem("selectedBrand", brand);
  } else {
    //  If no brand in URL → clear localStorage
    localStorage.removeItem("selectedBrand");
  }

  try {
    const response = await fetch("/data/brands.json");
    const brands = await response.json();

    if (brand && brands[brand]) {
      //  Show brand logo and header
      homeLogo.src = brands[brand].logo;
      homeTitle.textContent = brands[brand].title;
    } else {
      //  Fallback → Default logo + title
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
