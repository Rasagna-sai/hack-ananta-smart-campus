import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Ensure DOM is loaded before accessing elements
document.addEventListener("DOMContentLoaded", () => {

  // Protect profile page
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("index.html");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        document.getElementById("name").textContent = data.name;
        document.getElementById("email").textContent = data.email;
        document.getElementById("role").textContent = data.role;
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  });

  // Logout button logic
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      // Force redirect to login page
      window.location.replace("index.html");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  });

});
