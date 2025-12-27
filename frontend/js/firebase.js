// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaGLkqmTvSE3WGLw7AMinJXwgBPJjfNBA",
  authDomain: "smartcampus-b4339.firebaseapp.com",
  projectId: "smartcampus-b4339",
  storageBucket: "smartcampus-b4339.firebasestorage.app",
  messagingSenderId: "940219744886",
  appId: "1:940219744886:web:6b40984b19849a696cd557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };
// <!-- firebase-init.js -->
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

// <script>
//   const firebaseConfig = {
//     apiKey: "AIzaSyAaGLkqmTvSE3WGLw7AMinJXwgBPJjfNBA",
//     authDomain: "smartcampus-b4339.firebaseapp.com",
//     projectId: "smartcampus-b4339",
//   };

//   firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();
// </script>
