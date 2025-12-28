import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const issueList = document.getElementById("issueList");

  if (!issueList) {
    alert("❌ issueList element not found");
    return;
  }

  function getStatusColor(status) {
    if (status === "Pending") return "#ffb703";
    if (status === "In Progress") return "#219ebc";
    if (status === "Resolved") return "#2a9d8f";
    return "#ccc";
  }

  async function loadIssues() {
    issueList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "Issues"));

    snapshot.forEach(docSnap => {
      const issue = docSnap.data();

      // 🚫 skip broken / old data
      if (
        !issue.issueType ||
        !issue.description ||
        !issue.status ||
        !issue.reportedByRole ||
        !issue.userId
      ) {
        return;
      }

      const issueId = docSnap.id;

      const card = document.createElement("div");
      card.className = "issue-card";

      card.innerHTML = `
        <div class="issue-header">
          <strong>${issue.userId} (${issue.reportedByRole})</strong>
          <span class="status-badge" style="background:${getStatusColor(issue.status)}">
            ${issue.status}
          </span>
        </div>

        <p><b>Issue:</b> ${issue.issueType}</p>
        <p><b>Description:</b> ${issue.description}</p>

        <select class="status-select">
          <option ${issue.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${issue.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${issue.status === "Resolved" ? "selected" : ""}>Resolved</option>
        </select>

        <button class="update-btn">Update</button>
      `;

      const select = card.querySelector(".status-select");
      const updateBtn = card.querySelector(".update-btn");
      const badge = card.querySelector(".status-badge");

      updateBtn.addEventListener("click", async () => {
        try {
          const newStatus = select.value;

          // 1️⃣ UPDATE ISSUE
          await updateDoc(doc(db, "Issues", issueId), {
  status: newStatus,
  statusUpdatedAt: serverTimestamp(),
  lastUpdatedBy: "admin",
  statusHistory: arrayUnion({
    status: newStatus,
    updatedAt: serverTimestamp(),
    updatedBy: "admin"
  })
});


          // 2️⃣ CREATE NOTIFICATION FOR USER
          await addDoc(collection(db, "notifications"), {
            toUserId: issue.userId,
            toRole: issue.reportedByRole,
            type: "ISSUE_STATUS_UPDATE",
            issueId: issueId,
            message: `Your issue "${issue.issueType}" is now ${newStatus}`,
            read: false,
            createdAt: serverTimestamp()
          });

          // 3️⃣ UI FEEDBACK
          alert(`✅ Status updated to "${newStatus}"`);

          badge.textContent = newStatus;
          badge.style.background = getStatusColor(newStatus);

        } catch (err) {
          alert("❌ Update failed");
          console.error(err);
        }
      });

      issueList.appendChild(card);
    });
  }

  loadIssues();
});
