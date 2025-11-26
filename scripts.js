// navbar

const elemToggleFunc = function (elem) { elem.classList.toggle("headmobactive"); }

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const year = new Date().getFullYear();
document.getElementById("footerCopy").innerHTML =
  `© ${year} <span>Chinthas.</span> All rights reserved.`;


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
