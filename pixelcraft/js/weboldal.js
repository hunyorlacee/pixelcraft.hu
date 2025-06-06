// Function to toggle themes (dark and light mode)
function toggleTheme() {
  const isDarkMode = document.getElementById("theme-toggle").checked;
  const logo = document.getElementById("logo");
  const weboldalLeft = document.querySelector(".weboldal-left");

  if (isDarkMode) {
    // Apply dark mode
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark"); // Save theme preference

    logo.src = "assets/pixelcraft_blue_dark.png";
    weboldalLeft.style.backgroundImage = "url('assets/iphone_dark.png')";
  } else {
    // Apply light mode
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light"); // Save theme preference

    logo.src = "assets/pixelcraft_blue_light.png";
    weboldalLeft.style.backgroundImage = "url('assets/iphone_light.png')";
  }
}

// Ensure the page starts with the correct theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const toggleSwitch = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");
  const weboldalLeft = document.querySelector(".weboldal-left");

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    toggleSwitch.checked = false; // Set checkbox to match light mode

    logo.src = "assets/pixelcraft_blue_light.png";
    weboldalLeft.style.backgroundImage = "url('assets/iphone_light.png')";
  } else {
    document.documentElement.classList.remove("light-mode");
    toggleSwitch.checked = true; // Set checkbox to match dark mode

    logo.src = "assets/pixelcraft_blue_dark.png";
    weboldalLeft.style.backgroundImage = "url('assets/iphone_dark.png')";
  }
});

// Attach the toggleTheme function to the checkbox change event
document.getElementById("theme-toggle").addEventListener("change", toggleTheme);

/**************************************** SWIPER *********************************************/

// Weboldal iphone cards #1
const swiperWeboldal11 = new Swiper(".swiper-weboldal-11", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 5000,
  allowTouchMove: false,
});

// Weboldal iphone cards #2
const swiperWeboldal12 = new Swiper(".swiper-weboldal-12", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
  },
  speed: 5000,
  allowTouchMove: false,
});

// Weboldal benefit cards
const swiperWeboldal2 = new Swiper(".swiper-weboldal-2", {
  slidesPerView: "auto",
  slidesOffsetBefore: 20,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next-weboldal-2",
    prevEl: ".swiper-button-prev-weboldal-2",
  },
  loop: true,
});

//Services cards
const swiperSzolgaltatas = new Swiper(".swiper-szolgaltatas", {
  slidesPerView: "auto",
  spaceBetween: 20,
  slidesOffsetBefore: 20,
  loop: true,
});

/**************************************** CODE WINDOW *********************************************/

document.addEventListener("DOMContentLoaded", () => {
  const codeLines = [
    "function modernWeboldalRendel() {",
    "  const megjelenes = 'modern';",
    "  const elmenyFaktor = 'tokeletes';",
    "  const arculat = 'emlekezetes';",
    "",
    "  return { megjelenes, elmenyFaktor, arculat };",
    "}",
    "",
    "const weboldal = modernWeboldalRendel();",
    "console.log('Weboldal kész:', weboldal);",
  ];

  const displayElement = document.getElementById("code-display");
  const typingSpeed = 50; // ms per character
  let currentLine = 0;
  let currentChar = 0;

  const typeCode = () => {
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      displayElement.textContent += line[currentChar] || "";
      currentChar++;

      if (currentChar > line.length) {
        displayElement.textContent += "\n";
        currentLine++;
        currentChar = 0;
      }

      setTimeout(typeCode, typingSpeed);
    }
  };

  // Start animation when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeCode();
        observer.disconnect(); // Run only once
      }
    });
  });

  observer.observe(displayElement);
});
