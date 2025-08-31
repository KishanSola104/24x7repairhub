document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  // DOM elements
  const titleEl = document.getElementById("serviceTitle");
  const imageEl = document.getElementById("serviceImage");
  const descEl = document.getElementById("serviceDescription");

  // Helper function to update DOM
  const updateService = (service) => {
    titleEl.textContent = service.name;
    imageEl.src = service.img;
    imageEl.alt = service.name;
    descEl.textContent = service.description;
  };

  // Load JSON
  fetch("data/services.json") // use relative path
    .then(res => res.json())
    .then(data => {
      let service;

      if (serviceId) {
        service = data.services.find(s => s.id === serviceId);
      }

      if (!service) {
        // If no serviceId or not found, show default/fallback
        service = data.services[0]; // first service as default
        if (!serviceId) {
          console.warn("No service selected, showing default service.");
        } else {
          console.warn("Service not found, showing default service.");
        }
      }

      updateService(service);
    })
    .catch(err => {
      console.error("Error loading services.json:", err);
      titleEl.textContent = "Error";
      descEl.textContent = "Unable to load service details. Please try again later.";
    });
});
