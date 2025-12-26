import { db } from "./firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const issueList = document.getElementById("issueList");

onSnapshot(collection(db, "Issues"), (snapshot) => {
  issueList.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    issueList.innerHTML += `
      <div class="list-item">
        <p><strong>Type:</strong> ${data.issueType}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Reported By:</strong> ${data.reportedByRole}</p>
        <p><strong>Status:</strong> ${data.status}</p>
      </div>
    `;
  });
});
