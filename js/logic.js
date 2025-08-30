
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
    const brand = getBrandFromUrl();
    if (!brand) return; // no brand, keep default

    try {
      const response = await fetch("/data/brands.json");
      const brands = await response.json();

      if (brands[brand]) {
        document.getElementById("homeLogo").src = brands[brand].logo;
        document.getElementById("homeTitle").textContent = brands[brand].title;
      }
    } catch (err) {
      console.error("Error loading brands.json", err);
    }
  }

  updateBrandContent();

    // --------- Mobile Menu ----------