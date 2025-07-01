// In your admin.js (price update page)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPhMXOil0T4TuRZcnhFhKDNXz8UfD5j0g",
  authDomain: "mainland-oil-gas.firebaseapp.com",
  projectId: "mainland-oil-gas",
  storageBucket: "mainland-oil-gas.appspot.com",
  messagingSenderId: "777899969990",
  appId: "1:777899969990:web:659db45ddc039d957776c7",
  measurementId: "G-9F978V6EH0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Get form elements
const priceForm = document.getElementById('price-form');
const savingMsg = document.getElementById('saving-message');
const successMsg = document.getElementById('success-message');

// Load current prices when page loads
function loadCurrentPrices() {
  const pricesRef = ref(db, 'prices');
  
  onValue(pricesRef, (snapshot) => {
    const prices = snapshot.val();
    if (prices) {
      document.getElementById('pms').value = prices.pms || '';
      document.getElementById('lube1').value = prices.lubricant?.['1'] || '';
      document.getElementById('lube2').value = prices.lubricant?.['2'] || '';
      document.getElementById('lube4').value = prices.lubricant?.['4'] || '';
      document.getElementById('lube8').value = prices.lubricant?.['8'] || '';
      document.getElementById('lube25').value = prices.lubricant?.['25'] || '';
    }
  });
}

// Save new prices
priceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  savingMsg.textContent = "⏳ Saving prices...";
  successMsg.textContent = "";
  
  const newPrices = {
    pms: parseFloat(document.getElementById('pms').value),
    lubricant: {
      '1': parseFloat(document.getElementById('lube1').value),
      '2': parseFloat(document.getElementById('lube2').value),
      '4': parseFloat(document.getElementById('lube4').value),
      '8': parseFloat(document.getElementById('lube8').value),
      '25': parseFloat(document.getElementById('lube25').value)
    }
  };
  
  set(ref(db, 'prices'), newPrices)
    .then(() => {
      savingMsg.textContent = "";
      successMsg.textContent = "✅ Prices updated successfully!";
      setTimeout(() => successMsg.textContent = "", 3000);
    })
    .catch((error) => {
      savingMsg.textContent = "";
      successMsg.textContent = `❌ Error: ${error.message}`;
    });
});

// Initialize
loadCurrentPrices();