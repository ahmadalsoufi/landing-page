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
// 2. sticky navbar when reaching a point
///////////////////////////////////////////////////////////////
const stickyNav = function () {
  const stickyCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.classList.add("nav--sticky");
        return;
      }
      console.log(entries);

      nav.classList.remove("nav--sticky");
    });
  };

  const stickyObj = {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  };
  const stickyObserver = new IntersectionObserver(stickyCallback, stickyObj);
  stickyObserver.observe(header);
};

///////////////////////////////////////////////////////////////
// 3. dynamic count
///////////////////////////////////////////////////////////////

const dynamicCount = function () {
  const numbersCount = document.querySelectorAll(".numbers__count");
  const numbersContainer = document.querySelector(".numbers");

  const numbersCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        numbersCount.forEach((number) => {
          const numberCount = +number.textContent;
          number.textContent = 0;

          const count = setInterval(() => {
            if (+number.textContent > 500) {
              number.textContent = +number.textContent + 6;
            } else {
              number.textContent = +number.textContent + 2;
            }

            if (+number.textContent >= numberCount) {
              clearInterval(count);
              number.textContent = number.dataset.count;
            }
          }, 1);
        });

        observer.unobserve(entry.target);
      }
    });
  };

  const numbersObj = {
    root: null,
    threshold: 0,
  };

  const numbersObserver = new IntersectionObserver(numbersCallback, numbersObj);
  numbersObserver.observe(numbersContainer);
};

///////////////////////////////////////////////////////////////
// --- application of features
///////////////////////////////////////////////////////////////

viewUponScrolling();
stickyNav();
dynamicCount();
