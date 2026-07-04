"use strict";

const sections = document.querySelectorAll(".section__push--down");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

///////////////////////////////////////////////////////////////
// 1. view sections upon scrolling
///////////////////////////////////////////////////////////////
const viewUponScrolling = function () {
  const scrollCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.remove("section__push--down");
      entry.target.style.opacity = 1;
      observer.unobserve(entry.target);
    });
  };
  const scrollObj = {
    root: null,
    threshold: 0,
    rootMargin: "-50px",
  };

  const scrollObserver = new IntersectionObserver(scrollCallback, scrollObj);
  sections.forEach((section) => scrollObserver.observe(section));
};

///////////////////////////////////////////////////////////////
// --- application of features
///////////////////////////////////////////////////////////////

viewUponScrolling();
