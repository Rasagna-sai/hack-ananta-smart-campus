import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const issueList = document.getElementById("issueList");

async function loadIssues() {
  issueList.innerHTML = "<p>Loading issues...</p>";

  const snapshot = await getDocs(collection(db, "Issues"));

  if (snapshot.empty) {
    issueList.innerHTML = "<p>No issues reported.</p>";
    return;
  }

  issueList.innerHTML = "";

  for (const issueDoc of snapshot.docs) {
    const issue = issueDoc.data();
    const issueId = issueDoc.id;

    // 🔹 Fetch user details
    let reporterName = "Unknown";
    let reporterRole = issue.reportedByRole || "unknown";

    if (issue.userId) {
      const userSnap = await getDoc(doc(db, "users", issue.userId));
      if (userSnap.exists()) {
        reporterName = userSnap.data().name;
      }
    }

    const card = document.createElement("div");
    card.className = "issue-card";

    card.innerHTML = `
      <p><strong>Reported by:</strong> ${reporterName} (${reporterRole})</p>
      <p><strong>Issue Type:</strong> ${issue.issueType}</p>
      <p><strong>Description:</strong> ${issue.description}</p>

      <label><strong>Status:</strong></label>
      <select data-id="${issueId}">
        <option value="Pending" ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
        <option value="In Progress" ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Resolved" ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
      </select>
      <hr />
    `;

    issueList.appendChild(card);
  }

  // 🔴 Only admin can update status
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", async (e) => {
      const issueId = e.target.dataset.id;
      const newStatus = e.target.value;

      await updateDoc(doc(db, "Issues", issueId), {
        status: newStatus
      });

      alert("Issue status updated");
    });
  });
}

loadIssues();
