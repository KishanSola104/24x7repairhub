// 1. Extract brand from URL 
function getBrandFromUrl() {
  const pathParts = window.location.pathname.split("/");
  let candidate = pathParts[1]?.toLowerCase();

  // If nothing in path, check ?h1 param
  if (!candidate) {
    const params = new URLSearchParams(window.location.search);
    const h1Param = params.get("h1");
    if (h1Param) {
      candidate = h1Param.split(" ")[0].toLowerCase(); 
    }
  }

  // Validate against allowed brand list
  const brandList = [
    "acer","aiwa","akai","aoc","blaupunkt","bpl","chroma","ifallcon","haier","hisense",
    "hitachi","impex","intex","jvc","kodak","koryo","lg","lloyd","mi","micromax","mitashi",
    "nokia","oneplus","onida","oscar","panasonic","philips","polaroid","rca","realme",
    "sansui","sanyo","skyworth","sony","samsung","t series","tcl","thomson","toshiba",
    "vu","videocon","vise","vizio"
  ];

  if (candidate && brandList.includes(candidate)) {
    return candidate;
  }

  return null; 
}

// 2. Load JSON and update page
async function updateBrandContent() {
  const homeLogo = document.getElementById("homeLogo");
  const homeTitle = document.getElementById("homeTitle");

  let brand = getBrandFromUrl();

  if (brand) {
    //  Save new brand if found in URL
    localStorage.setItem("selectedBrand", brand);
  } else {
    //  Otherwise fallback to previously saved brand
    brand = localStorage.getItem("selectedBrand");
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
