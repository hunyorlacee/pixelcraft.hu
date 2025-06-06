// Fixed rolunk.js - Turnstile Implementation

// Function to toggle themes (dark and light mode)
function toggleTheme() {
  const isDarkMode = document.getElementById("theme-toggle").checked;
  const logo = document.getElementById("logo");
  const hero = document.getElementById("hero_img");
  const ajanlat = document.getElementById("ajanlat_img");
  const lottie = document.getElementById("themeLottie");

  if (isDarkMode) {
    // Apply dark mode
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark"); // Save theme preference

    logo.src = "assets/pixelcraft_dark.png";
    hero.src = "assets/rolunk_hero_dark.png";
    ajanlat.src = "assets/rolunk_ajanlat_dark.png";
    lottie.load("assets/ai_dark.lottie");
  } else {
    // Apply light mode
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light"); // Save theme preference

    logo.src = "assets/pixelcraft_light.png";
    hero.src = "assets/rolunk_hero_light.png";
    ajanlat.src = "assets/rolunk_ajanlat_light.png";
    lottie.load("assets/ai_light.lottie");
  }
}

// Ensure the page starts with the correct theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const toggleSwitch = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");
  const hero = document.getElementById("hero_img");
  const ajanlat = document.getElementById("ajanlat_img");
  const lottie = document.getElementById("themeLottie");

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    toggleSwitch.checked = false; // Set checkbox to match light mode

    logo.src = "assets/pixelcraft_light.png";
    hero.src = "assets/rolunk_hero_light.png";
    ajanlat.src = "assets/rolunk_ajanlat_light.png";
    lottie.load("assets/ai_light.lottie");
  } else {
    document.documentElement.classList.remove("light-mode");
    toggleSwitch.checked = true; // Set checkbox to match dark mode

    logo.src = "assets/pixelcraft_dark.png";
    hero.src = "assets/rolunk_hero_dark.png";
    ajanlat.src = "assets/rolunk_ajanlat_dark.png";
    lottie.load("assets/ai_dark.lottie");
  }
});

// Attach the toggleTheme function to the checkbox change event
document.getElementById("theme-toggle").addEventListener("change", toggleTheme);

//Szolgaltatasok Tag---------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("openList");
  const card = document.querySelector(".kiegeszito");

  card.classList.add("kiegeszito-collapsed");

  button.addEventListener("click", () => {
    const expanded = card.classList.toggle("kiegeszito-expanded");
    card.classList.toggle("kiegeszito-collapsed", !expanded);
    button.textContent = expanded ? "Kevesebb" : "Több";
  });
});

//Ajanlatkero Form---------------------------------------------------------------------------------

const form = document.getElementById("contactForm");
const messages = document.getElementById("messages");
const submitBtn = document.getElementById("submitBtn");

// Initialize Turnstile token - Use a more specific global variable
window.pixelCraftTurnstileToken = null;

// FIXED: Turnstile callback functions - Make sure they're properly defined
window.onTurnstileSuccess = function (token) {
  //console.log("✅ Turnstile success:", token);
  window.pixelCraftTurnstileToken = token;
  // Clear any previous error messages
  const errorElement = document.getElementById("turnstileError");
  if (errorElement) {
    errorElement.textContent = "";
  }
};

window.onTurnstileExpired = function () {
  //console.log("⚠️ Turnstile expired");
  window.pixelCraftTurnstileToken = null;
  const errorElement = document.getElementById("turnstileError");
  if (errorElement) {
    errorElement.textContent = "A captcha lejárt, kérjük újra próbáld meg";
  }
};

window.onTurnstileError = function (errorCode) {
  //console.log("❌ Turnstile error:", errorCode);
  window.pixelCraftTurnstileToken = null;
  const errorElement = document.getElementById("turnstileError");
  if (errorElement) {
    errorElement.textContent = "Captcha hiba történt, kérjük próbáld újra";
  }
};

// Form validation
function validateForm() {
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".error").forEach((error) => (error.textContent = ""));

  // Name validation
  const name = document.getElementById("name").value.trim();
  if (!name) {
    document.getElementById("nameError").textContent = "A név megadása kötelező";
    isValid = false;
  }

  // Email validation
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    document.getElementById("emailError").textContent = "Az email cím megadása kötelező";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Kérjük, érvényes email címet adj meg";
    isValid = false;
  }

  // Phone validation (optional but if provided should be valid)
  const phone = document.getElementById("phone").value.trim();
  if (phone && !/^[\+]?[0-9\s\-\(\)]{6,}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Kérjük, érvényes telefonszámot adj meg";
    isValid = false;
  }

  // Project description validation
  const project = document.getElementById("project").value.trim();
  if (!project) {
    document.getElementById("projectError").textContent = "A projekt leírása kötelező";
    isValid = false;
  } else if (project.length < 10) {
    document.getElementById("projectError").textContent =
      "Kérjük, adj meg legalább 10 karaktert a projekt leírásához";
    isValid = false;
  }

  // FIXED: Turnstile validation with better error handling
  //console.log("🔍 Validating Turnstile token:", window.pixelCraftTurnstileToken);
  if (!window.pixelCraftTurnstileToken) {
    document.getElementById("turnstileError").textContent = "Kérjük, igazold, hogy nem vagy robot";
    isValid = false;

    // Try to reset the Turnstile widget if it failed
    if (window.turnstile && window.turnstile.reset) {
      //console.log("🔄 Attempting to reset Turnstile widget");
      try {
        window.turnstile.reset();
      } catch (e) {
        console.error("Failed to reset Turnstile:", e);
      }
    }
  }

  return isValid;
}

// Show message
function showMessage(message, type) {
  messages.innerHTML = `<div class="${type}">${message}</div>`;
  messages.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// IMPROVED: Form submission with better error handling
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //console.log("🚀 Form submission started");

  if (!validateForm()) {
    //console.log("❌ Form validation failed");
    return;
  }

  // Show loading state
  const sendIcon = document.getElementById("sendIcon");
  const spinner = document.getElementById("spinner");

  if (sendIcon) sendIcon.style.display = "none";
  if (spinner) spinner.style.display = "inline-block";
  submitBtn.disabled = true;
  messages.innerHTML = "";

  // Debug: Log the current token
  //console.log("📤 Turnstile token before submission:", window.pixelCraftTurnstileToken);

  // Prepare form data
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    project: formData.get("project"),
    timestamp: new Date().toISOString(),
    turnstileToken: window.pixelCraftTurnstileToken, // Use the renamed variable
  };

  //console.log("📋 Form data being sent:", {
  //  ...data,
  //  turnstileToken: data.turnstileToken ? "TOKEN_PRESENT" : "TOKEN_MISSING",
  //});

  try {
    // Send to Cloudflare Worker
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //console.log("📡 Response status:", response.status);

    let result;
    try {
      result = await response.json();
      //console.log("📥 Response data:", result);
    } catch (parseError) {
      console.error("Failed to parse response JSON:", parseError);
      const responseText = await response.text();
      //console.log("Raw response:", responseText);
      throw new Error("Invalid server response");
    }

    if (response.ok) {
      showMessage("Köszönjük az üzeneted! Hamarosan felvesszük veled a kapcsolatot.", "success");
      form.reset();
      // Reset the Turnstile widget after successful submission
      window.pixelCraftTurnstileToken = null;
      if (window.turnstile && window.turnstile.reset) {
        window.turnstile.reset();
      }
    } else {
      throw new Error(result.error || "Hiba történt az üzenet küldése során");
    }
  } catch (error) {
    //console.error("❌ Submission error:", error);

    // More specific error messages
    let errorMessage = "Hiba történt az üzenet küldése során. ";

    if (error.message.includes("fetch")) {
      errorMessage += "Kapcsolódási hiba. ";
    } else if (error.message.includes("captcha") || error.message.includes("Captcha")) {
      errorMessage += "Captcha érvényesítési hiba. ";
    }

    errorMessage += "Kérjük, próbáld újra később, vagy írj nekünk közvetlenül emailben.";

    showMessage(errorMessage, "error-message");

    // Reset Turnstile on error
    if (window.turnstile && window.turnstile.reset) {
      window.turnstile.reset();
    }
    window.pixelCraftTurnstileToken = null;
  } finally {
    // Reset loading state
    if (sendIcon) sendIcon.style.display = "inline";
    if (spinner) spinner.style.display = "none";
    submitBtn.disabled = false;
  }
});

// Real-time validation
document.getElementById("email").addEventListener("blur", function () {
  const email = this.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorElement = document.getElementById("emailError");

  if (email && !emailRegex.test(email)) {
    errorElement.textContent = "Kérjük, érvényes email címet adj meg";
  } else {
    errorElement.textContent = "";
  }
});

// ADDED: Debug function to check Turnstile status
//function debugTurnstile() {
//console.log("🔍 Turnstile Debug Info:");
//console.log("- Turnstile object:", window.turnstile);
//console.log("- Current token:", window.pixelCraftTurnstileToken);
//console.log("- Turnstile widget element:", document.querySelector(".cf-turnstile"));
//}

// Call debug function after a delay to ensure everything is loaded
setTimeout(debugTurnstile, 2000);
