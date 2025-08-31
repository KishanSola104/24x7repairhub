
  document.addEventListener("DOMContentLoaded", () => {
    // Get service id from query param
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id");

    if (!serviceId) return; // no id in URL

    // Load data from JSON
    fetch("/data/services.json")
      .then(res => res.json())
      .then(data => {
        const service = data.services.find(s => s.id === serviceId);

        if (service) {
          // Inject into DOM
          document.getElementById("serviceTitle").textContent = service.name;
          document.getElementById("serviceImage").src = service.img;
          document.getElementById("serviceImage").alt = service.name;
          document.getElementById("serviceDescription").textContent = service.description;
        } else {
          // Fallback: show error if not found
          document.getElementById("serviceTitle").textContent = "Service Not Found";
          document.getElementById("serviceDescription").textContent =
            "Sorry, the service you are looking for does not exist.";
        }
      })
      .catch(err => {
        console.error("Error loading services.json:", err);
        document.getElementById("serviceTitle").textContent = "Error";
        document.getElementById("serviceDescription").textContent =
          "Unable to load service details right now. Please try again later.";
      });
  });