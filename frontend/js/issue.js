import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  GeoPoint,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const submitBtn = document.getElementById("submitIssue");

submitBtn.addEventListener("click", async () => {
  const issueType = document.getElementById("issueType").value;
  const description = document.getElementById("description").value.trim();
  const reportedByRole = document.getElementById("reportedBy").value;

  if (!issueType || !description || !reportedByRole) {
    alert("Please fill all fields");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("Login required");
    return;
  }

  try {
    // 1️⃣ CREATE ISSUE
    const issueRef = await addDoc(collection(db, "Issues"), {
      issueType,
      description,
      reportedByRole,
      userId: user.uid,
      location: new GeoPoint(17.385, 78.4867),
      status: "Pending",
      timestamp: serverTimestamp(),
      lastUpdatedBy: null,
      statusUpdatedAt: null
    });

    // 2️⃣ CREATE NOTIFICATION FOR ADMIN
    await addDoc(collection(db, "notifications"), {
      toRole: "admin",
      toUserId: "ADMIN", // we’ll resolve admin UID later
      type: "NEW_ISSUE",
      issueId: issueRef.id,
      message: `New ${issueType} issue reported by ${reportedByRole}`,
      read: false,
      createdAt: serverTimestamp()
    });

    alert("✅ Issue reported successfully");

    document.getElementById("issueType").value = "";
    document.getElementById("description").value = "";
    document.getElementById("reportedBy").value = "";

  } catch (err) {
    console.error(err);
    alert("Failed to report issue");
  }
});
