import { db } from "./firebase.js";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const issueList = document.getElementById("issueList");

// Listen to issues in real-time
onSnapshot(collection(db, "issues"), (snapshot) => {
  issueList.innerHTML = "";

  if (snapshot.empty) {
    issueList.innerHTML = "<p>No issues reported.</p>";
    return;
  }

  snapshot.forEach((docSnap) => {
    const issue = docSnap.data();
    const issueId = docSnap.id;

    const issueDiv = document.createElement("div");
    issueDiv.classList.add("issue-item");

    issueDiv.innerHTML = `
      <p><strong>Type:</strong> ${issue.issueType}</p>
      <p><strong>Description:</strong> ${issue.description}</p>
      <p><strong>Status:</strong>
        <select data-id="${issueId}">
          <option value="Pending" ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="In Progress" ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option value="Resolved" ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
        </select>
      </p>
      <hr/>
    `;

    issueList.appendChild(issueDiv);
  });

  // Add change listeners to all dropdowns
  document.querySelectorAll("select").forEach((dropdown) => {
    dropdown.addEventListener("change", async (e) => {
      const issueId = e.target.getAttribute("data-id");
      const newStatus = e.target.value;

      await updateDoc(doc(db, "issues", issueId), {
        status: newStatus,
        statusUpdatedAt: new Date()
      });

      alert("Issue status updated");
    });
  });
})