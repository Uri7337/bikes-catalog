async function loadBikeDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  try {
    const response = await fetch("bikes.json");
    const bikes = await response.json();
    const bike = bikes.find(b => b.id === id);

    const container = document.getElementById("bike-detail");

    if (bike) {
      container.innerHTML = `
        <div class="card">
          <img src="${bike.image}" alt="${bike.name}">
          <div class="card-content">
            <h2>${bike.name}</h2>
            <p><strong>Kategorie:</strong> ${bike.category}</p>
            <p>${bike.description}</p>
            <p class="price">${bike.price}</p>
            <a href="contact.html">Kontaktovat prodejce</a>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = "<p>Kolo nebylo nalezeno.</p>";
    }
  } catch (error) {
    console.error("Chyba při načítání detailu kola:", error);
  }
}

loadBikeDetail();
