import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const username = document.getElementById("username");
  const role = document.getElementById("role");
  const toast = document.getElementById("toast");

  function showToast(message, type = "success") {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  }

  loginBtn.addEventListener("click", async () => {
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      showToast("Logged in successfully 🎉");
      redirectUser(cred.user.uid);

    } catch (err) {
      showToast(err.message, "error");
    }
  });

  signupBtn.addEventListener("click", async () => {
    try {
      if (!email.value.endsWith("@klh.edu.in")) {
        showToast("Use college email only", "error");
        return;
      }

      const cred = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await setDoc(doc(db, "users", cred.user.uid), {
        name: username.value,
        email: email.value,
        role: role.value
      });

      showToast("Account created successfully 🎉");
      redirectUser(cred.user.uid);

    } catch (err) {
      showToast(err.message, "error");
    }
  });

  async function redirectUser(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return;

    window.location.href =
      snap.data().role === "admin"
        ? "admin_dashboard.html"
        : "dashboard.html";
  }

});
