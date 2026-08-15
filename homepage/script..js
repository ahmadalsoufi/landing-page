"use strict";

const sections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

///////////////////////////////////////////////////////////////
// 1. view sections upon scrolling
///////////////////////////////////////////////////////////////

const viewUponScrolling = function () {
  sections.forEach((section) => section.classList.add("section__push--down"));

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
    rootMargin: "-30px",
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
  const lazyImgs = document.querySelectorAll(".img");

  lazyImgs.forEach((img) => {
    img.classList.add("lazy");
  });

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
// 4. dropdown
///////////////////////////////////////////////////////////////

const dropdownNav = function () {
  // replace default scroll for links with a directed scroll.
  document.querySelectorAll(".link").forEach((link) =>
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const clicked = e.target.closest(".link").getAttribute("href");
      if (clicked.includes("#") && clicked.length > 1)
        document
          .querySelector(`${clicked}`)
          .scrollIntoView({ behavior: "smooth" });
    }),
  );

  const navItems = document.querySelectorAll(".nav__item");
  const navLinks = document.querySelectorAll(".nav__link");

  let isDropdownCollapsed = true;
  navLinks.forEach((link) => {
    link.href = "#";
  });

  navItems.forEach((btn) => {
    btn.children[0].innerHTML =
      btn.children[0].textContent +
      `<span class="nav__drop-down"><i class="fa-solid fa-angle-down"></i></span>`;

    btn.addEventListener("mouseenter", function (e) {
      e.target.children[1].style.display = "block";
    });

    btn.addEventListener("mouseleave", function (e) {
      e.target.children[1].style.display = "none";
    });

    btn.addEventListener("click", function (e) {
      isDropdownCollapsed = !isDropdownCollapsed;
      e.target.closest(".nav__item").children[1].style.display =
        isDropdownCollapsed ? "none" : "block";
    });
  });
};

///////////////////////////////////////////////////////////////
// 5. slider
///////////////////////////////////////////////////////////////

const slider = function () {
  const featuredHtml = `<div class="qualification__wrapper">
          <div class="qualification qualification--slider">
            <div class="qualification__btns">
              <button class="qualification--slider-btn clicked--slide" data-btn="1">one</button>
              <button class="qualification--slider-btn" data-btn="2">
                two
              </button>
              <button class="qualification--slider-btn" data-btn="3">three</button>
            </div>

            <div class="qualification__item qualification--slide " data-num="1">
              <h4 class="title qualification__title" >1. Lorem, ipsum dolor.</h4>
              <p class="qualification__description slide--description">
                Text to be inserted.
              </p>
            </div>

            <div class="qualification__item qualification--slide hidden" data-num="2">
              <h4 class="title qualification__title">2. Lorem, ipsum dolor.</h4>
              <p class="qualification__description slide--description">
                Text to be inserted.
              </p>
            </div>

            <div class="qualification__item qualification--slide hidden" data-num="3">
              <h4 class="title qualification__title">3. Lorem, ipsum dolor.</h4>
              <p class="qualification__description slide--description">
                Text to be inserted.
              </p>
            </div>
          </div>
        </div>
      </section>`;

  const qualification = document.querySelector(".qualification");
  qualification.outerHTML = featuredHtml;
  // handling btns

  const sliderBtns = document.querySelectorAll(".qualification--slider-btn");
  const slides = document.querySelectorAll(".qualification--slide");

  sliderBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // clean hard coded texts
      sliderBtns.forEach((btn) => {
        btn.classList.remove("clicked--slide");
      });

      slides.forEach((slide) => {
        slide.classList.add("hidden");
      });

      // add texts dynamically
      const clicked = e.target.dataset.btn;

      sliderBtns.forEach((btn) => {
        if (btn.dataset.btn === clicked) {
          btn.classList.add("clicked--slide");
        }
      });

      slides.forEach((slide) => {
        if (slide.dataset.num === clicked) {
          slide.classList.remove("hidden");
        }
      });
    });
  });
};
//

///////////////////////////////////////////////////////////////
// --- application of features
///////////////////////////////////////////////////////////////

viewUponScrolling();
stickyNav();
dynamicCount();
lazyLoading();
dropdownNav();
slider();
