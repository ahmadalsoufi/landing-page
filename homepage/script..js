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
          const numberCount = number.dataset.count;
          number.textContent = 0;

          const count = setInterval(() => {
            if (number.dataset.count > 500) {
              number.textContent = +number.textContent + 5;
            } else {
              number.textContent = +number.textContent + 3;
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
// 4. lazy loading
///////////////////////////////////////////////////////////////

const lazyLoading = function () {
  const lazyImgs = document.querySelectorAll(".lazy");

  const lazyCallback = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy");
      });
    });
  };

  const lazyObj = {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  };
  const lazyObserver = new IntersectionObserver(lazyCallback, lazyObj);
  lazyImgs.forEach((img) => lazyObserver.observe(img));
};

///////////////////////////////////////////////////////////////
// --- application of features
///////////////////////////////////////////////////////////////

viewUponScrolling();
stickyNav();
dynamicCount();
lazyLoading();
