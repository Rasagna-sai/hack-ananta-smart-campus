import { triggerSOS } from "./utils.js";

// SOS Button
document.getElementById("sosBtn").addEventListener("click", () => {
  triggerSOS();
});

// Text-based emergency (Dialogflow demo)
document.getElementById("voiceBtn").addEventListener("click", () => {
  const text = document.getElementById("emergencyInput").value.toLowerCase();

  const emergencyKeywords = [
    "help",
    "sos",
    "emergency",
    "danger",
    "unsafe"
  ];

  const isEmergency = emergencyKeywords.some(word => text.includes(word));

  if (isEmergency) {
    triggerSOS();
  } else {
    alert("No emergency detected");
  }
});