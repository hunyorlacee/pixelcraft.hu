// Mobile view toggle menu JS

const toggle1 = document.querySelector(".menu-icon-1");
const toggle2 = document.querySelector(".menu-icon-2");
const dropdown = document.querySelector(".mobile-menu");

function toggleMenu() {
  const isOpen = dropdown.classList.contains("open");
  dropdown.classList.toggle("open", !isOpen);
  toggle1.style.display = isOpen ? "block" : "none";
  toggle2.style.display = isOpen ? "none" : "block";
}

function resetMenu() {
  if (window.innerWidth > 985) {
    dropdown.classList.remove("open");
    toggle1.style.display = "none";
    toggle2.style.display = "none";
  } else {
    const isOpen = dropdown.classList.contains("open");
    toggle1.style.display = isOpen ? "none" : "block";
    toggle2.style.display = isOpen ? "block" : "none";
  }
}

toggle1.addEventListener("click", toggleMenu);
toggle2.addEventListener("click", toggleMenu);
window.addEventListener("resize", resetMenu);

resetMenu();

// Mobil menu cards declaration JS
const swiperMobil = new Swiper(".swiper-mobil", {
  slidesPerView: "auto",
  spaceBetween: 15,
  slidesOffsetAfter: 20,
});
