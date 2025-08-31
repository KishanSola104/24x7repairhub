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

  // If no serviceId, do nothing
  if (!serviceId) {
    titleEl.textContent = "Service not selected";
    descEl.textContent = "Please select a service from the menu to see details.";
    return;
  }

  // Load JSON
  fetch("data/services.json") // use relative path
    .then(res => res.json())
    .then(data => {
      const service = data.services.find(s => s.id === serviceId);

      if (service) {
        updateService(service);
      } else {
        // Service not found
        titleEl.textContent = "Service Not Found";
        descEl.textContent = "The service you are looking for does not exist.";
      }
    })
    .catch(err => {
      console.error("Error loading services.json:", err);
      titleEl.textContent = "Error";
      descEl.textContent = "Unable to load service details. Please try again later.";
    });
});
