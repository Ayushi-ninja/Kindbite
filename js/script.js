const map = L.map('map').setView([28.6139, 77.2090], 12); // Delhi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Mock donation data
const donations = [
  {
    id: 1,
    foodType: 'Fruits',
    freshness: 'Fresh',
    quantity: '10 kg',
    coords: [28.61, 77.22]
  },
  {
    id: 2,
    foodType: 'Rice',
    freshness: 'Average',
    quantity: '15 kg',
    coords: [28.63, 77.19]
  },
  {
    id: 3,
    foodType: 'Bread',
    freshness: 'Low',
    quantity: '5 packs',
    coords: [28.60, 77.21]
  }
];

// Add markers to map
donations.forEach(donation => {
  const marker = L.marker(donation.coords).addTo(map)
    .bindPopup(`<strong>${donation.foodType}</strong><br/>${donation.quantity}`);
});

// Render donation cards
function renderDonations(data) {
  const list = document.getElementById('donationList');
  list.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'donation-card';
    card.innerHTML = `
      <h4>${item.foodType}
        <span class="badge ${item.freshness === 'Low' ? 'low' : ''}">${item.freshness}</span>
      </h4>
      <p>Quantity: ${item.quantity}</p>
    `;
    list.appendChild(card);
  });
}

function filterDonations() {
  const type = document.getElementById('foodTypeFilter').value;
  const fresh = document.getElementById('freshnessFilter').value;

  const filtered = donations.filter(d => {
    return (type === '' || d.foodType === type) &&
           (fresh === '' || d.freshness === fresh);
  });

  renderDonations(filtered);
}

document.getElementById('foodTypeFilter').addEventListener('change', filterDonations);
document.getElementById('freshnessFilter').addEventListener('change', filterDonations);

renderDonations(donations);



// Donation Trend Chart
new Chart(document.getElementById("donationTrendChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Donations",
        data: [50, 80, 65, 90, 120],
        backgroundColor: "rgba(179,0,0,0.1)",
        borderColor: "#b30000",
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
  
  // Waste Reduction Chart
  new Chart(document.getElementById("wasteReductionChart"), {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "Kg Saved",
        data: [30, 50, 45, 70, 90],
        backgroundColor: "#b30000"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  

  