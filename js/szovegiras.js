// Function to toggle themes (dark and light mode)
function toggleTheme() {
  const isDarkMode = document.getElementById("theme-toggle").checked;
  const logo = document.getElementById("logo");

  if (isDarkMode) {
    // Apply dark mode
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark"); // Save theme preference

    logo.src = "assets/pixelcraft_green_dark.png";
  } else {
    // Apply light mode
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light"); // Save theme preference

    logo.src = "assets/pixelcraft_green_light.png";
  }
}

// Ensure the page starts with the correct theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const toggleSwitch = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    toggleSwitch.checked = false; // Set checkbox to match light mode

    logo.src = "assets/pixelcraft_green_light.png";
  } else {
    document.documentElement.classList.remove("light-mode");
    toggleSwitch.checked = true; // Set checkbox to match dark mode

    logo.src = "assets/pixelcraft_green_dark.png";
  }
});

// Attach the toggleTheme function to the checkbox change event
document.getElementById("theme-toggle").addEventListener("change", toggleTheme);

/**************************************** SWIPER *********************************************/

// Weboldal benefit cards
const swiperWeboldal2 = new Swiper(".swiper-szovegiras", {
  slidesPerView: "auto",
  slidesOffsetBefore: 20,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next-szovegiras",
    prevEl: ".swiper-button-prev-szovegiras",
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
