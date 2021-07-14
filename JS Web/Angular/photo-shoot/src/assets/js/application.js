let controller = {
  init: function () {
    controller.mobileCheckboxClass();
    controller.fixedNavigation();
    controller.fancyScrollLinks();
    controller.togglePopUps();
    controller.navbarDropdownHandler();
    // controller.slidersInit();

    if ($(".filter_select").length) {
      $(".filter_select").niceSelect();
    }
    // controller.menuOutHandler();
    controller.toggleProductTabs();
  },
  mobileCheckboxClass: function () {
    // Mobile Checkbox add class to the body
    document
      .querySelector("#toggle_nav")
      .addEventListener("change", function (el) {
        if (el.currentTarget.checked) {
          document.body.classList.add("disable_scroll");
        } else {
          document.body.classList.remove("disable_scroll");
        }
      });
  },
  fixedNavigation: function () {
    let header = document.querySelector("header");
    function fixedNavbarHandler() {
      if (window.scrollY > header.clientHeight) {
        header.classList.add("is_stuck");
      } else {
        header.classList.remove("is_stuck");
      }
      //  FOOTER ABSOLUTE
      document.body.style.paddingBottom =
        document.querySelector("footer").clientHeight + "px";
      document.body.style.minHeight =
        "calc(100vh - " +
        document.querySelector("footer").clientHeight * 2 +
        "px)";
    }
    fixedNavbarHandler();
    window.addEventListener("scroll", function () {
      fixedNavbarHandler();
    });
  },
  fancyScrollLinks: function () {
    // select links with href #someid
    document
      .querySelectorAll(
        'a[href*="#"]:not([href="#"]):not([href="javascript:void(0)"])'
      )
      .forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const href = link.getAttribute("href");
          const offsetTop = document.querySelector(href).offsetTop - 150; // - 150 because of fixed menu
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        });
      });
  },
  togglePopUps: function () {
    let popupOpen = document.querySelectorAll(".popup_toggle");
    var popupClose = document.querySelectorAll(".popup_wrap .close_btn");

    popupOpen.forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.add("disable_scroll");
        document
          .querySelector(btn.getAttribute("href"))
          .classList.add("active_pop");
      });
    });

    popupClose.forEach(function (btn) {
      btn.addEventListener("click", () => {
        document.body.classList.remove("disable_scroll");
        document.querySelector(".popup_wrap").classList.remove("active_pop");
      });
    });
  },
  // slidersInit: function () {
  //   //sliders
  //   $(".about_company_slider").slick({
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     dots: false,
  //     infinite: true,
  //     prevArrow: '<div class="prev-btn as as-chevron"></div>',
  //     nextArrow: '<div class="next-btn as as-chevron"></div>',
  //   });
  // },
  navbarDropdownHandler: function () {
    //dropdown in nav menu
    $(".dropdown_toggle_mobile .dropdown_icon").click(function () {
      if (window.innerWidth <= 768) {
        $(this).parent().toggleClass("active_dropdown");
        $(this).parent().next().slideToggle();
        //it prevents a href
        return false;
      }
    });
  },
  menuOutHandler: function () {
    function isMenuOut(element) {
      element.each(function () {
        let elm = $(this);
        let off = elm.offset();
        let l = off.left;
        let w = elm.width();
        let docW = $("body").width();
        let isEntirelyVisible = l + w <= docW;

        if (!isEntirelyVisible || l < 0) {
          $(this).addClass("isOut");
        } else {
          // "if" prevents toggling class on resize
          if (!$(this).hasClass("isOut")) $(this).removeClass("isOut");
        }
      });
    }

    isMenuOut($(".calc_icon"));
    window.addEventListener("resize", function () {
      isMenuOut($(".calc_icon"));
    });
  },
  toggleProductTabs: function () {
    // Toggle random block
    $("[data-toggler]").click(function () {
      let attrValue = $(this).attr("data-toggler");
      $("#" + attrValue).slideToggle(200, "linear", function () {});
      $(this).toggleClass("active");
    });

    // Tabs filter
    $(".filter_tabs .tabs .tab").click(function (e) {
      e.preventDefault();
      $(this).addClass("active").siblings().removeClass("active");
      let a = $(this).children();
      $(".panels .panel").slideUp(); //hide all
      $(".panels .panel." + a.attr("href").slice(1)).slideDown(); //show clicked
    });

    $(".tabs_filter").change(function () {
      let currclass = $(".tabs_filter .option.selected")
        .attr("data-value")
        .slice(1);
      $(".panels .panel").hide(); //hide all
      $(".panels .panel." + currclass).fadeIn(); //show clicked
    });
  },
};

$(document).ready(controller.init);
