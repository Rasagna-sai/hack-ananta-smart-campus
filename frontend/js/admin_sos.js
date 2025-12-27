console.log("admin-sos.js loaded");

import { db } from "./firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const sosList = document.getElementById("sosList");

onSnapshot(collection(db, "sos_alerts"), (snapshot) => {
  sosList.innerHTML = "";

  if (snapshot.empty) {
    sosList.innerHTML = "<p>No active SOS alerts.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const sos = docSnap.data();

    const sosDiv = document.createElement("div");
    sosDiv.classList.add("sos-item");

    sosDiv.innerHTML = `
      <p><strong>User ID:</strong> ${sos.userId}</p>
      <p><strong>Status:</strong> ${sos.status}</p>
      <hr/>
    `;

    sosList.appendChild(sosDiv);
  });
});
