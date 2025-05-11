import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7EfKEjsZ-OVz_5weOLPc5xn2L2DLtJFI",
  authDomain: "distance-between-us-21652.firebaseapp.com",
  projectId: "distance-between-us-21652",
  storageBucket: "distance-between-us-21652.firebasestorage.app",
  messagingSenderId: "444203998757",
  appId: "1:444203998757:web:54e22802b1ef9918e1a9cc",
  measurementId: "G-223D8TCL2L"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password check
const correctPassword = "Aditiya";
function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === correctPassword) {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
  } else {
    document.getElementById("error-msg").innerText = "Wrong password, try again!";
  }
}
window.checkPassword = checkPassword;

// Send letter
async function sendLetter() {
  const text = document.getElementById("letterInput").value.trim();
  if (text !== "") {
    await addDoc(collection(db, "letters"), {
      text: text,
      timestamp: new Date()
    });
    document.getElementById("letterInput").value = "";
  }
}
window.sendLetter = sendLetter;

// Load letters
const q = query(collection(db, "letters"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  const display = document.getElementById("lettersDisplay");
  display.innerHTML = "";
  snapshot.forEach(doc => {
    const p = document.createElement("p");
    p.innerText = "💌 " + doc.data().text;
    display.appendChild(p);
  });
});
