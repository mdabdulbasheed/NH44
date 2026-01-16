// ==========================================
// NH-44 JOURNEY EXPLORER - REFACTORED
// ==========================================

const nh44Data = [
  { state: "Jammu and Kashmir", capital: "Srinagar", image: "images/JammuandKashmir.jpg", specialties: "Handicrafts, Saffron, Apples", description: "Himalayan region with rich culture and scenic beauty." },
  { state: "Himachal Pradesh", capital: "Shimla", image: "images/HimachalPradesh.jpg", specialties: "Hill Stations, Hydropower", description: "Mountain state known for tourism and orchards." },
  { state: "Punjab", capital: "Chandigarh", image: "images/Punjab.jpg", specialties: "Agriculture, Golden Temple", description: "Granary of India with Sikh heritage." },
  { state: "Haryana", capital: "Chandigarh", image: "images/Haryana.jpg", specialties: "Manufacturing, Automobiles", description: "Industrial state around Delhi NCR." },
  { state: "Delhi", capital: "New Delhi", image: "images/NewDelhi.jpg", specialties: "Administration, History", description: "Capital city of India." },
  { state: "Uttar Pradesh", capital: "Lucknow", image: "images/Uttarpradesh.jpg", specialties: "Taj Mahal, Temples", description: "Cultural and historical heartland." },
  { state: "Madhya Pradesh", capital: "Bhopal", image: "images/MadhyaPradesh.jpg", specialties: "Wildlife, Minerals", description: "Central India, rich in heritage." },
  { state: "Maharashtra", capital: "Mumbai", image: "images/Maharastra.jpg", specialties: "Finance, Bollywood", description: "Economic powerhouse." },
  { state: "Telangana", capital: "Hyderabad", image: "images/Telangana.jpg", specialties: "IT, Pharma", description: "Major tech ecosystem." },
  { state: "Andhra Pradesh", capital: "Amaravati", image: "images/AndhraPradesh.jpg", specialties: "Temples, Agriculture", description: "Cultural and spiritual hub." },
  { state: "Karnataka", capital: "Bengaluru", image: "images/Karnataka.jpg", specialties: "IT, Aerospace", description: "India’s Silicon Valley." },
  { state: "Tamil Nadu", capital: "Chennai", image: "images/Tamilnadu.jpg", specialties: "Automobile, Temples", description: "Industrial and cultural state." }
];

const timelineStops = [
  "Srinagar", "Chandigarh", "Delhi", "Gwalior",
  "Nagpur", "Hyderabad", "Bengaluru", "Kanyakumari"
];

document.addEventListener("DOMContentLoaded", () => {
  populateTable();
  setupSearch();
  setupScroll();
  buildTimeline();
  buildRestStops();
  initMap();
});

// ---------------- TABLE ----------------
function populateTable() {
  const tbody = document.querySelector("#statesTable tbody");
  tbody.innerHTML = "";

  nh44Data.forEach((s, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${s.state}</strong></td>
      <td>${s.capital}</td>
      <td>${s.specialties}</td>
      <td>${s.description}</td>
    `;
    row.addEventListener("click", () => openModal(s));
    tbody.appendChild(row);
  });
}

// ---------------- MODAL ----------------
function openModal(state) {
  document.getElementById("modalTitle").innerText = state.state;
  document.getElementById("modalBody").innerHTML = `
    <img src="${state.image}" class="state-image" />
    <p><strong>Capital:</strong> ${state.capital}</p>
    <p><strong>Specialties:</strong> ${state.specialties}</p>
    <p>${state.description}</p>
  `;
  document.getElementById("stateModal").style.display = "block";
}

document.querySelector(".close").onclick = () =>
  (document.getElementById("stateModal").style.display = "none");

// ---------------- SEARCH ----------------
function setupSearch() {
  document.getElementById("searchInput").addEventListener("keyup", e => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll("#statesTable tbody tr").forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(val) ? "" : "none";
    });
  });
}

// ---------------- SCROLL ----------------
function setupScroll() {
  const btn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------------- TIMELINE ----------------
function buildTimeline() {
  const container = document.getElementById("timelineContainer");
  container.innerHTML = timelineStops.map(stop => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content"><strong>${stop}</strong></div>
    </div>
  `).join("");
}

// ---------------- REST STOPS ----------------
function buildRestStops() {
  const container = document.getElementById("restStopsContainer");
  container.className = "rest-stops-grid";
  container.innerHTML = timelineStops.map(city => `
    <div class="rest-stop-card">
      <h4>${city}</h4>
      <p>Fuel • Food • Lodging</p>
    </div>
  `).join("");
}

// ---------------- MAP ----------------
function initMap() {
  const map = L.map("map", {
    center: [22.5, 78.9],
    zoom: 5,
    minZoom: 5,
    maxZoom: 8,

    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: true,

    maxBounds: [
      [6, 68],
      [37, 98]
    ],
    maxBoundsViscosity: 1.0
  });

  L.control.zoom({ position: "topright" }).addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    noWrap: true
  }).addTo(map);

  const route = [
    [34.0837, 74.7973],
    [30.7333, 76.8277],
    [28.6139, 77.2090],
    [21.1458, 79.0882],
    [17.3850, 78.4867],
    [12.9716, 77.5946],
    [8.0883, 77.5385]
  ];

  L.polyline(route, {
    color: "#ff0000",
    weight: 4,
    dashArray: "6 6"
  }).addTo(map);

  // 🔒 Click-to-activate logic
  const overlay = document.getElementById("mapOverlay");

  overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    map.scrollWheelZoom.enable();
    map.dragging.enable();
  });

  map.on("mouseout", () => {
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    overlay.classList.remove("hidden");
  });

  return map;
}
// ==========================================