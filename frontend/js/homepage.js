// ================================
// HOMEPAGE FUNCTIONALITY
// ================================

// Wait until page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Get elements safely
  const helpNowBtn = document.getElementById("getHelpBtn");
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const supportBtn = document.getElementById("accessSupportBtn");
  const sosBtn = document.getElementById("triggerSosBtn");

  // Redirect to SOS page
  if (helpNowBtn) {
    helpNowBtn.addEventListener("click", () => {
      window.location.href = "sos.html";
    });
  }

  // Redirect to dashboard / info page
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Redirect to campus support page (or dashboard)
  if (supportBtn) {
    supportBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Redirect to SOS page from emergency card
  if (sosBtn) {
    sosBtn.addEventListener("click", () => {
      window.location.href = "sos.html";
    });
  }

});
