import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const data = await getDocs(collection(db, "sos_alerts"));
data.forEach(d => {
  if (d.data().status === "Active") {
    sosList.innerHTML += `
      <div>
        <p>User: ${d.data().userId}</p>
        <button onclick="resolve('${d.id}')">Resolve</button>
      </div>`;
  }
});

window.resolve = async id => {
  await updateDoc(doc(db, "sos_alerts", id), { status: "Resolved" });
  location.reload();
};
