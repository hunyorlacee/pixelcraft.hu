//GSAP animations

document.addEventListener("DOMContentLoaded", (event) => {
  // Select all elements
  const herotitleWordElements = document.querySelectorAll(".hero-title-word");
  const herotextWordElements = document.querySelectorAll(".hero-text-word");
  const heroimg = document.querySelector("#hero-img");

  // Create a GSAP timeline
  const tl = gsap.timeline();

  // Animate herotitle words
  tl.from(herotitleWordElements, {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]),
    duration: 1.2,
    ease: "back",
    stagger: 0.15,
  });

  // Animate herotext words after the herotitle
  tl.from(
    herotextWordElements,
    {
      y: 150,
      opacity: 0,
      rotation: gsap.utils.wrap([-30, 30]),
      duration: 1,
      ease: "back",
      stagger: 0.15,
      onComplete: () => {
        // Add transition property and remove translateY(0)
        const elements = document.querySelectorAll(".hero-text-word");
        elements.forEach((element) => {
          element.style.transition = "transform 0.2s ease";
          element.style.transform = ""; // Clear the inline transform style
        });
      },
    },
    "-=1"
  );

  // Animate heroimg
  tl.from(
    heroimg,
    {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "back",
    },
    "-=2"
  );

  // GSAP ScrollTrigger setup
  gsap.registerPlugin(ScrollTrigger);

  // Create a GSAP tween for scaling the image
  gsap.to(heroimg, {
    scrollTrigger: {
      trigger: ".hero", // Section that controls the scroll
      start: "top-=80 top", // When the top of the hero reaches the top of the viewport
      scrub: true, // Smooth scaling with scroll
    },
    scale: 1.15,
  });

  gsap.from(".siker-title-word", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.15, // Elements animate one after another
    scrollTrigger: {
      trigger: ".hero", // The element to start the animation
      start: "10% top", // When the element's top hits the top of the viewport
      endTrigger: ".siker", // The element to end the animation
      end: "top top", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });

  gsap.from(".siker-gsap", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.2, // Elements animate one after another
    scrollTrigger: {
      trigger: ".siker", // The element to start the animation
      start: "top bottom", // When the element's top hits the top of the viewport
      endTrigger: ".siker", // The element to end the animation
      end: "bottom bottom", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });

  gsap.from(".szolgaltatas-title-word", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.15, // Elements animate one after another
    scrollTrigger: {
      trigger: ".szolgaltatas", // The element to start the animation
      start: "top bottom", // When the element's top hits the top of the viewport
      endTrigger: ".szolgaltatas", // The element to end the animation
      end: "top top", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });

  gsap.from(".szolgaltatas-gsap", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.2, // Elements animate one after another
    scrollTrigger: {
      trigger: ".szolgaltatas", // The element to start the animation
      start: "top bottom", // When the element's top hits the top of the viewport
      endTrigger: ".szolgaltatas", // The element to end the animation
      end: "top top", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });

  gsap.from(".rolunk-title-word", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.15, // Elements animate one after another
    scrollTrigger: {
      trigger: ".rolunk", // The element to start the animation
      start: "top bottom", // When the element's top hits the top of the viewport
      endTrigger: ".rolunk", // The element to end the animation
      end: "top top", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });

  gsap.from(".rolunk-gsap", {
    y: 150,
    opacity: 0,
    rotation: gsap.utils.wrap([-30, 30]), // Random rotation between -30 and 30
    duration: 1.2,
    ease: "back",
    stagger: 0.2, // Elements animate one after another
    scrollTrigger: {
      trigger: ".rolunk", // The element to start the animation
      start: "top bottom", // When the element's top hits the top of the viewport
      endTrigger: ".rolunk", // The element to end the animation
      end: "top top", // End when the end-class hits the bottom of the viewport
      scrub: 1, // Sync animation to scroll
    },
  });
});
