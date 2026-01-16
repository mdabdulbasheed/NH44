// ==========================================
// NH-44 HIGHWAY PROJECT - CLEAN START
// ==========================================

// State Data - Complete information for all 12 states
var nh44Data = [
  { state: "Jammu and Kashmir", capital: "Srinagar", image: "images/JammuandKashmir.jpg", specialties: "Kashmir Handicrafts, Saffron, Apple Orchards, Adventure Tourism", description: "Known as 'Crown Jewel of India' with Himalayan mountains, Dal Lake, and Gulmarg ski resort." },
  { state: "Himachal Pradesh", capital: "Shimla", image: "images/HimachalPradesh.jpg", specialties: "Apple Orchards, Hill Stations, Adventure Sports, Hydroelectric Power", description: "Mountainous state famous for scenic beauty, adventure tourism, and traditional crafts." },
  { state: "Punjab", capital: "Chandigarh", image: "images/Punjab.jpg", specialties: "Agriculture (Wheat, Rice), Golden Temple, Textile Industry", description: "'Granary of India' known for agricultural prosperity and Sikh heritage." },
  { state: "Haryana", capital: "Chandigarh", image: "images/Haryana.jpg", specialties: "Automobiles, Manufacturing, Agriculture, IT Services", description: "Industrially developed state surrounding Delhi with significant manufacturing hub." },
  { state: "Delhi", capital: "New Delhi", image: "images/NewDelhi.jpg", specialties: "Historical Monuments, Government Hub, Cultural Center, Education", description: "Capital of India - blend of ancient heritage and modern development." },
  { state: "Uttar Pradesh", capital: "Lucknow", image: "images/Uttarpradesh.jpg", specialties: "Taj Mahal, Varanasi Temples, Agriculture, Textiles", description: "Most populous state with immense historical and religious significance." },
  { state: "Madhya Pradesh", capital: "Bhopal", image: "images/MadhyaPradesh.jpg", specialties: "Diamonds & Minerals, Temple Architecture, Wildlife, Handlooms", description: "'Heart of India' known for rich mineral resources and cultural heritage." },
  { state: "Maharashtra", capital: "Mumbai", image: "images/Maharastra.jpg", specialties: "Bollywood Industry, Financial Hub, Manufacturing, IT Services", description: "Economic powerhouse with Mumbai as financial and entertainment center." },
  { state: "Telangana", capital: "Hyderabad", image: "images/Telangana.jpg", specialties: "IT & Software Services, Pharma, Bitech, Electronics Manufacturing", description: "'State of Startups' with Hyderabad as major IT hub." },
  { state: "Andhra Pradesh", capital: "Amaravati", image: "images/AndhraPradesh.jpg", specialties: "Rice Production, Silk Sarees, Tirupati Temple, Handicrafts", description: "Famous for temples, handicrafts, and agricultural products." },
  { state: "Karnataka", capital: "Bengaluru", image: "images/Karnataka.jpg", specialties: "IT Industry, Coffee, Aerospace & Space Technology, Silk", description: "India's IT capital with numerous technology companies and startups." },
  { state: "Tamil Nadu", capital: "Chennai", image: "images/Tamilnadu.jpg", specialties: "Automotive, Textiles, Leather Goods, Traditional Arts, Temples", description: "Highly developed industrial state with rich cultural heritage." }
];

// Populate the table on page load
document.addEventListener('DOMContentLoaded', function() {
  populateTable();
  setupSearch();
  setupScroll();
});

// Function to populate the states table
function populateTable() {
  const tableBody = document.querySelector('#statesTable tbody');
  
  if (!tableBody) {
    console.error('Table body not found');
    return;
  }
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Add each state as a row
  nh44Data.forEach(state => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="table-image">
        <img src="${state.image}" alt="${state.state}" class="state-image" onerror="this.src='https://via.placeholder.com/100?text=${state.state}'">
      </td>
      <td class="table-state"><strong>${state.state}</strong></td>
      <td class="table-capital">${state.capital}</td>
      <td class="table-specialty">${state.specialties}</td>
      <td class="table-description">${state.description}</td>
    `;
    tableBody.appendChild(row);
  });
  
  console.log('✓ Table populated with ' + nh44Data.length + ' states');
}

// Function to setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#statesTable tbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Function to setup scroll to top button
function setupScroll() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', function() {
    scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize map
var map = L.map('map', {
  minZoom: 4,
  maxZoom: 10,
  maxBounds: L.latLngBounds(L.latLng(5, 65), L.latLng(38, 98)),
  maxBoundsViscosity: 1.0,
  zoomControl: false,
  scrollWheelZoom: false,
  touchZoom: false,
  doubleClickZoom: true,
  dragging: true
}).setView([22.5, 78.9], 5);

// Add custom zoom buttons
L.control.zoom({position: 'topleft'}).addTo(map);

// Add map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// NH-44 route coordinates
var routeCoords = [
  [34.0837, 74.7973],   // Srinagar
  [30.7333, 76.8277],   // Chandigarh
  [28.6139, 77.2090],   // Delhi
  [27.1767, 78.0081],   // Agra
  [25.4484, 78.5685],   // Jhansi
  [26.2183, 78.1877],   // Gwalior
  [21.1458, 79.0882],   // Nagpur
  [17.3850, 78.4867],   // Hyderabad
  [15.8281, 78.1355],   // Kurnool
  [12.9716, 77.5946],   // Bengaluru
  [8.0883, 77.5385]     // Kanyakumari
];

// Draw route on map
L.polyline(routeCoords, {
  color: '#FF0000',
  weight: 4,
  opacity: 0.8,
  dashArray: '5, 5'
}).addTo(map).bindPopup('NH-44 Highway Route');

// Add markers for major cities with enhanced highlighting
var cities = [
  { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
  { name: 'Chandigarh', lat: 30.7333, lng: 76.8277 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385 }
];

cities.forEach(city => {
  // Create highlighted circular marker
  L.circleMarker([city.lat, city.lng], {
    radius: 12,
    fillColor: '#FF6B35',
    color: '#FFFFFF',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.9
  }).addTo(map).bindPopup(`<strong>${city.name}</strong>`);
  
  // Add glowing effect with a slightly larger circle
  L.circleMarker([city.lat, city.lng], {
    radius: 16,
    fillColor: 'transparent',
    color: '#FF6B35',
    weight: 2,
    opacity: 0.5,
    fillOpacity: 0,
    dashArray: '3, 3'
  }).addTo(map);
});

console.log('✓ Map initialized with route and cities');


// Load India GeoJSON map with state boundaries
fetch('https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@8d907bc/geojson/india.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: '#cccccc',
        weight: 1,
        opacity: 0.5,
        fillColor: '#f5f5f5',
        fillOpacity: 0.2
      }
    }).addTo(map);
  });

console.log('✓ Complete setup finished');
