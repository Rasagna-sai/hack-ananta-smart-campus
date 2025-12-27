import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp, GeoPoint } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "./firebase.js";

export async function triggerSOS() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  // Dummy location for demo
  const location = new GeoPoint(17.3850, 78.4867);

  await addDoc(collection(db, "sos_alerts"), {
    userId: user.uid,
    role: "student", // or fetch from Firestore
    location: location,
    status: "Active",
    timestamp: serverTimestamp()
  });

  alert("🚨 SOS alert sent successfully!");
}