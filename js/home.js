// Function to toggle themes (dark and light mode)

function toggleTheme() {
  const isDarkMode = document.getElementById("theme-toggle").checked;
  const logo = document.getElementById("logo");
  const sikerImg1 = document.getElementById("siker-img-1");
  const sikerImg2 = document.getElementById("siker-img-2");
  const sikerImg3 = document.getElementById("siker-img-3");

  if (isDarkMode) {
    // Apply dark mode
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark"); // Save theme preference

    logo.src = "assets/pixelcraft_dark.png";
    sikerImg1.src = "assets/benyomas_dark.png";
    sikerImg2.src = "assets/kommunikacio_dark.png";
    sikerImg3.src = "assets/elerhetoseg_dark.png";
  } else {
    // Apply light mode
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light"); // Save theme preference

    logo.src = "assets/pixelcraft_light.png";
    sikerImg1.src = "assets/benyomas_light.png";
    sikerImg2.src = "assets/kommunikacio_light.png";
    sikerImg3.src = "assets/elerhetoseg_light.png";
  }
}

// Ensure the page starts with the correct theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const toggleSwitch = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");
  const sikerImg1 = document.getElementById("siker-img-1");
  const sikerImg2 = document.getElementById("siker-img-2");
  const sikerImg3 = document.getElementById("siker-img-3");

  if (savedTheme === "light") {
    document.documentElement.classList.add("light-mode");
    toggleSwitch.checked = false; // Set checkbox to match light mode

    logo.src = "assets/pixelcraft_light.png";
    sikerImg1.src = "assets/benyomas_light.png";
    sikerImg2.src = "assets/kommunikacio_light.png";
    sikerImg3.src = "assets/elerhetoseg_light.png";
  } else {
    document.documentElement.classList.remove("light-mode");
    toggleSwitch.checked = true; // Set checkbox to match dark mode

    logo.src = "assets/pixelcraft_dark.png";
    sikerImg1.src = "assets/benyomas_dark.png";
    sikerImg2.src = "assets/kommunikacio_dark.png";
    sikerImg3.src = "assets/elerhetoseg_dark.png";
  }
});

// Attach the toggleTheme function to the checkbox change event
document.getElementById("theme-toggle").addEventListener("change", toggleTheme);

/**************************************** SWIPER *********************************************/

// Services cards
const swiperSzolgaltatas = new Swiper(".swiper-szolgaltatas", {
  slidesPerView: "auto",
  spaceBetween: 20,
  slidesOffsetBefore: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination-szolgaltatas",
    clickable: true,
  },
});

/**************************************** LINKS *********************************************/

/*const mobileCards = [
  { selector: ".swiper-slide-mobil:nth-child(1) a", slideIndex: 0 }, // Weboldal
  { selector: ".swiper-slide-mobil:nth-child(2) a", slideIndex: 1 }, // Arculat
  { selector: ".swiper-slide-mobil:nth-child(3) a", slideIndex: 2 }, // Grafika
  { selector: ".swiper-slide-mobil:nth-child(4) a", slideIndex: 3 }, // Szövegírás
];
mobileCards.forEach((button) => {
  const btnElement = document.querySelector(button.selector);
  if (btnElement) {
    btnElement.addEventListener("click", (event) => {
      // Navigate to the corresponding Swiper slide
      swiperSzolgaltatas.slideToLoop(button.slideIndex, 500);
    });
  }
});*/

const heroButtons = [
  { selector: ".hero-text-word:nth-child(1)", slideIndex: 0 }, // Weboldal
  { selector: ".hero-text-word:nth-child(2)", slideIndex: 1 }, // Arculat
  { selector: ".hero-text-word:nth-child(3)", slideIndex: 2 }, // Grafika
  { selector: ".hero-text-word:nth-child(4)", slideIndex: 3 }, // Szövegírás
];
heroButtons.forEach((button) => {
  const btnElement = document.querySelector(button.selector);
  if (btnElement) {
    btnElement.addEventListener("click", (event) => {
      // Navigate to the corresponding Swiper slide
      swiperSzolgaltatas.slideToLoop(button.slideIndex, 500);
    });
  }
});

const sikerTitle = [
  { selector: ".siker-row:nth-child(1) a", slideIndex: 2 }, // Grafika
  { selector: ".siker-row:nth-child(2) a", slideIndex: 3 }, // Szövegírás
  { selector: ".siker-row:nth-child(3) a", slideIndex: 0 }, // Weboldal
];
sikerTitle.forEach((button) => {
  const btnElement = document.querySelector(button.selector);
  if (btnElement) {
    btnElement.addEventListener("click", (event) => {
      // Navigate to the corresponding Swiper slide
      swiperSzolgaltatas.slideToLoop(button.slideIndex, 500);
    });
  }
});
