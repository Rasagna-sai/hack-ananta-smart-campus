import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const bellBtn = document.getElementById("notificationBtn");
const dropdown = document.getElementById("notificationDropdown");
const list = document.getElementById("notificationList");
const countBadge = document.getElementById("notificationCount");

bellBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const role = localStorage.getItem("role");
  console.log("🔍 Logged in role:", role);

  let q;

  if (role === "admin") {
    // ✅ ADMIN notifications
    q = query(
      collection(db, "notifications"),
      where("toRole", "==", "admin"),
      where("read", "==", false)
    );
  } else {
    // ✅ STUDENT / FACULTY notifications
    q = query(
      collection(db, "notifications"),
      where("toUserId", "==", user.uid),
      where("read", "==", false)
    );
  }

  const snapshot = await getDocs(q);

  list.innerHTML = "";

  if (snapshot.empty) {
    countBadge.classList.add("hidden");
    list.innerHTML = "<p>No new notifications</p>";
    return;
  }

  countBadge.textContent = snapshot.size;
  countBadge.classList.remove("hidden");

  snapshot.forEach(docSnap => {
    const notif = docSnap.data();

    const item = document.createElement("div");
    item.className = "notification-item unread";
    item.textContent = notif.message;

    item.addEventListener("click", async () => {
      await updateDoc(doc(db, "notifications", docSnap.id), {
        read: true
      });
      item.remove();
    });

    list.appendChild(item);
  });
});
