let bikesData = [];

async function loadBikes() {
  try {
    const response = await fetch("bikes.json");
    bikesData = await response.json();
    renderBikes(bikesData);
  } catch (error) {
    console.error("Chyba při načítání kol:", error);
  }
}

function renderBikes(bikes) {
  const grid = document.getElementById("bikes-grid");
  grid.innerHTML = "";

  if (bikes.length === 0) {
    grid.innerHTML = "<p>Žádné kolo nenalezeno.</p>";
    return;
  }

  bikes.forEach(bike => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${bike.image}" alt="${bike.name}">
      <div class="card-content">
        <h2>${bike.name}</h2>
        <p>${bike.category}</p>
        <p class="price">${bike.price}</p>
        <a href="bike.html?id=${bike.id}">Detail</a>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterBikes(category) {
  let filtered = [];
  if (category === "all") {
    filtered = bikesData;
  } else {
    filtered = bikesData.filter(bike => bike.category === category);
  }
  renderBikes(filtered);
}

function searchBikes() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = bikesData.filter(bike =>
    bike.name.toLowerCase().includes(query)
  );
  renderBikes(filtered);
}

loadBikes();
