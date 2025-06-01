//GSAP -----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // GSAP ScrollTrigger setup
  gsap.registerPlugin(ScrollTrigger);

  //Scroll heavy animation
  gsap.utils.toArray(".gsap").forEach((el) => {
    gsap.from(el, {
      y: 150,
      opacity: 0,
      rotation: gsap.utils.random(-25, 25),
      duration: 1.15,
      ease: "back",
      stagger: 0.25,
      scrollTrigger: {
        trigger: el,
        start: "top+=10% bottom", // when the element enters the bottom of viewport
        end: "center-=50% center", // when the element is at center of viewport
        scrub: 2, // optional: ties animation progress to scroll
      },
    });
  });

  //Light animation
  /*ScrollTrigger.batch(".gsap", {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 150,
        opacity: 0,
        rotation: () => gsap.utils.random(-25, 25),
        duration: 1,
        ease: "back",
        stagger: 0.15,
      });
    },
    start: "top+=10% bottom",
    end: "center center",
    lazy: true,
  });*/

  ScrollTrigger.batch(".gsap-hero-title", {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 150,
        opacity: 0,
        rotation: () => gsap.utils.random(-30, 30),
        duration: 1,
        ease: "back",
        stagger: 0.15,
      });
    },
    start: "top+=10% bottom",
    end: "center center",
    lazy: true,
  });

  ScrollTrigger.batch(".gsap-hero", {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 150,
        opacity: 0,
        rotation: () => gsap.utils.random(-25, 25),
        duration: 1,
        ease: "back",
        stagger: 0.15,
      });
    },
    start: "top+=10% bottom",
    end: "center center",
    lazy: true,
  });

  ScrollTrigger.batch(".gsap-hero-2", {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 150,
        opacity: 0,
        rotation: () => gsap.utils.random(-25, 25),
        duration: 1,
        ease: "back",
        stagger: 0.15,
      });
    },
    start: "top+=10% bottom",
    end: "center center",
    lazy: true,
  });

  gsap.from(".gsap-hero-img", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "back",
  });

  gsap.to(".gsap-hero-img", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top-=80 top",
      scrub: true,
    },
    scale: 1.15,
  });
});
