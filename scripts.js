const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const content = document.querySelector('.content');
const circle = document.querySelector('.circle');

// 💡 NEW: Map tab indices to desired background colors
const colorMap = [
  '#151418',
  '#151418',
  '#151418',
  '#151418',
  '#151418',
  '#151418',
  '#151418',
  '#151418'
];

// Variable to store the currently active index
let activeIndex = 0; 
let scrollTimeout;

// Function to check and set the active tab based on scroll position
function checkActiveSection() {
  sections.forEach((section, i) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= -window.innerHeight * 0.25 && rect.top < window.innerHeight * 0.75) {
      if (activeIndex !== i) {
        activeIndex = i;
        setActiveTab(i);
        rotateCircle(i);
      }
    }
  });
}

// Scroll to section on tab click
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.index;
    const target = document.querySelector(`.section[data-index="${idx}"]`);
    target.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(parseInt(idx));
    rotateCircle(parseInt(idx));
  });
});

// Scroll listener with debounce
content.addEventListener('scroll', () => {
  checkActiveSection();
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(checkActiveSection, 150);
});

function setActiveTab(index) {
  tabs.forEach(tab => tab.classList.remove('active'));
  tabs[index].classList.add('active');

  // ✅ Apply background change to .circular-tabs instead of body
  const circularTabs = document.querySelector('.circular-tabs');

  // Remove old color-* classes
  circularTabs.className = circularTabs.className
    .split(' ')
    .filter(c => !c.startsWith('color-'))
    .join(' ');

  // Add new class
  circularTabs.classList.add(`color-${index}`);

  // Smooth background change
  circularTabs.style.background = colorMap[index];
  circularTabs.style.transition = 'background 0.8s ease';
}

function rotateCircle(index) {
  const angleStep = 15;
  const rotateDeg = -index * angleStep;
  circle.style.transform = `rotate(${rotateDeg}deg)`;
}

// Initialize
setActiveTab(0);
rotateCircle(0);



const wrapper = document.getElementById("circularTabsWrapper");
let snapping = false;

window.addEventListener("scroll", () => {
  if (snapping) return;

  const rect = wrapper.getBoundingClientRect();
  
  // When circular section starts to enter viewport slightly
  if (rect.top < window.innerHeight * 0.75 && rect.top > 0) {
    snapping = true;
    wrapper.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => snapping = false, 700);
  }
});




const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const year = new Date().getFullYear();
document.getElementById("footerCopy").innerHTML = `© ${year} Chinthas. All rights reserved.`;


// Parallax Scrolling Effect
$(window).on("scroll resize load", function () {
  $(".parallax").each(function () {
    var elementTop = $(this).offset().top;
    var elementHeight = $(this).outerHeight();
    var windowTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (elementTop < windowTop + windowHeight && elementTop + elementHeight > windowTop) {
      var scrollAmount = (windowTop - elementTop) * 0.3;
      $(this).css("background-position", "center " + scrollAmount + "px");
    }
  });
});






