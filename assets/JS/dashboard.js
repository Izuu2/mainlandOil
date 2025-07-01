import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

// Load and display prices
function loadPrices() {
  const pricesRef = ref(db, 'prices');
  
  onValue(pricesRef, (snapshot) => {
    const prices = snapshot.val();
    if (prices) {
      // Update PMS price display
      const pmsElement = document.getElementById("pms-price");
      if (pmsElement) {
        pmsElement.textContent = `₦${prices.pms.toLocaleString()}`;
      }
      
      // Update lubricants list
      const lubeList = document.getElementById("lubricant-prices");
      if (lubeList) {
        lubeList.innerHTML = "";
        
        for (const size in prices.lubricant) {
          const li = document.createElement("li");
          li.textContent = `${size}L: ₦${prices.lubricant[size].toLocaleString()}`;
          lubeList.appendChild(li);
        }
      }
    }
  });
}

// Initialize when page loads
window.onload = () => {
  loadPrices();
  
  // Your existing toggleMenu function
  function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle('active');
  }
  
  window.toggleMenu = toggleMenu;
};
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firestore = getFirestore(app);

// ... existing code ...

async function submitOrder() {
  const type = window.currentOrderType;
  const pricesRef = ref(db, 'prices');
  const pricesSnapshot = await get(pricesRef);
  const prices = pricesSnapshot.val();

  let payload = {};

  if (type === "pms") {
    // ... your existing PMS order logic ...
    payload = {
      type,
      company: document.getElementById("pms-company").value.trim(),
      quantity: parseFloat(document.getElementById("pms-qty").value),
      truck: document.getElementById("pms-truck").value.trim(),
      dpr: document.getElementById("pms-dpr").value.trim(),
      email: document.getElementById("pms-email").value.trim(),
      total: parseFloat(document.getElementById("pms-qty").value) * prices.pms,
      timestamp: new Date().toISOString()
    };
  } 
  else if (type === "lubricant") {
    // ... your existing lubricant order logic ...
    payload = {
      type,
      cart,
      total: Object.entries(cart).reduce((sum, [size, qty]) => {
        return sum + qty * prices.lubricant[size];
      }, 0),
      timestamp: new Date().toISOString()
    };
  }

  try {
    await addDoc(collection(firestore, "orders"), payload);
    alert("✅ Order submitted successfully!");
    location.reload();
  } catch (error) {
    alert(`❌ Error submitting order: ${error.message}`);
  }
}

window.submitOrder = submitOrder;