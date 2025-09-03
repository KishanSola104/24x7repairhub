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
    //  Save new brand in sessionStorage
    sessionStorage.setItem("selectedBrand", brand);
  } else {
    //  fallback to previously saved brand in this tab
    brand = sessionStorage.getItem("selectedBrand");
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


/* Send Emails */
 // Attach submit event to the form
  document.getElementById("contactFormFS").addEventListener("submit", function(e) {
    e.preventDefault(); 

    // Collect form values
    const params = {
      name: document.getElementById("fsName").value,
      email: document.getElementById("fsEmail").value,
      mobile: document.getElementById("fsMobile").value,
      message: document.getElementById("fsMessage").value
    };

    // Send email via EmailJS
    emailjs.send("service_5pgpnc2", "template_fqk23ps", params)
      .then((response) => {
        alert("Email sent successfully!");
        document.getElementById("contactFormFS").reset(); 
      })
      .catch((error) => {
        alert("Error sending email. Please try again.");
        console.error(error);
      });
  });


  

/* ==========================
   EmailJS - Booking Form
========================== */


(function () {
  console.log("Initializing EmailJS...");
  emailjs.init("JOl37qdpANitfjK0o"); // 
})();


document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready → attaching booking form listener");

  const bookingForm = document.getElementById("bookingForm");
  const bookingModal = document.getElementById("bookingModal");
  const submitBtn = bookingForm?.querySelector("button[type='submit']");

  if (!bookingForm) {
    console.error(" bookingForm not found in DOM.");
    return;
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(" Booking form submitted");

    if (submitBtn.disabled) {
      console.warn(" Submission already in progress. Ignoring duplicate.");
      return;
    }

    // Disable submit button during sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Collect form data
    const params = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      altMobile: document.getElementById("altMobile").value,
      service: document.getElementById("serviceSelect").value,
      otherService: document.getElementById("otherService").value,
      state: document.getElementById("stateSelect").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      message: document.getElementById("message").value,
    };

   

  
    
    emailjs.send("service_5pgpnc2", "template_bld8059", params)
      .then(function (response) {
        console.log("✅ EmailJS response:", response);

        // Success feedback
        alert("✅ Booking confirmed! Email sent successfully.");

        // Reset form
        bookingForm.reset();

        // Gracefully close modal
        if (bookingModal) {
          bookingModal.classList.add("closing");
          bookingModal.classList.remove("active");
          document.documentElement.style.overflow = "";
          setTimeout(() => bookingModal.classList.remove("closing"), 400);
        }
      })
      .catch(function (error) {
        alert("❌ Error sending booking details. Please try again.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Confirm Booking";
      });
  });
});
