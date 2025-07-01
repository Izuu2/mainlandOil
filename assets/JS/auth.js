import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Initialize Firebase Auth & Firestore
const auth = getAuth();
const db = getFirestore();

// ================= SIGN UP =================
async function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;
  const message = document.getElementById("signup-message");

  if (!username || !email || !password || !confirm) {
    message.textContent = "All fields are required.";
    return;
  }

  if (password !== confirm) {
    message.textContent = "Passwords do not match.";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    return;
  }

  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Save additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: serverTimestamp()
    });

    message.textContent = "Account created! Redirecting...";
    setTimeout(() => window.location.href = 'dashboard.html', 2000);
  } catch (error) {
    console.error(error);
    message.textContent = error.message;
  }
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("login-message");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    message.textContent = "Login successful! Redirecting...";
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  } catch (error) {
    console.error(error);
    message.textContent = error.message;
  }
}

// ================= LOGOUT =================
function logout() {
  signOut(auth).then(() => {
    window.location.href = 'login.html';
  });
}

// ================= CHECK AUTH STATE =================
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user && (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html"))) {
    window.location.href = "dashboard.html"; // Redirect if already logged in
  }
});

// ================= PASSWORD STRENGTH CHECKER =================
const pwdField = document.getElementById("signup-password");
if (pwdField) {
  pwdField.addEventListener("input", function () {
    const val = this.value;
    const indicator = document.getElementById("password-strength");
    if (val.length < 6) {
      indicator.textContent = "Weak password";
      indicator.className = "weak";
    } else if (/[A-Z]/.test(val) && /[0-9]/.test(val)) {
      indicator.textContent = "Strong password";
      indicator.className = "strong";
    } else {
      indicator.textContent = "Medium strength";
      indicator.className = "medium";
    }
  });
}