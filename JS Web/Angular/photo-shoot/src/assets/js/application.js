let controller = {
  init: function () {
    controller.mobileCheckboxClass();
    controller.fixedNavigation();
    controller.fancyScrollLinks();
    controller.togglePopUps();
    controller.navbarDropdownHandler();
    // controller.slidersInit();

    controller.toggleProductTabs();

    // Toggle random block
    $("body").on("click", "[data-toggler]", function (event) {
      let attrValue = $(this).attr("data-toggler");
      $("#" + attrValue).slideToggle();
      $(this).toggleClass("active");
    });

    
    setTimeout(function () {
      if ($("select").length) {
        $("select").niceSelect();
      }
    }, 1000);

    window.addEventListener("click", function () {
      $("select").niceSelect();
    });
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
      // document.body.style.paddingBottom =
      //   document.querySelector("footer").clientHeight + "px";
      // document.body.style.minHeight =
      //   "calc(100vh - " + document.querySelector("footer").clientHeight + "px)";
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
          if (document.querySelector(href)) {
            const offsetTop = document.querySelector(href).offsetTop - 150; // - 150 because of fixed menu
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      });
  },
  togglePopUps: function () {
    $("body").on("click", ".popup_toggle", function () {
      let popup = document.querySelector(this.getAttribute("data-toggle"));
      if (popup) {
        popup.classList.add("active_pop");
        document.body.classList.add("disable_scroll");
      }
    });
    $("body").on("click", ".popup_wrap .close_btn", function () {
      let popup = document.querySelector(".popup_wrap");
      if (popup) {
        popup.classList.remove("active_pop");
        document.body.classList.remove("disable_scroll");
      }
    });
  },
  navbarDropdownHandler: function () {
    if (window.innerWidth <= 768) {

      $(".list_item").click(function(event){
        if(!event.target.classList.contains('dropdown_icon')){
          $('#toggle_nav').prop('checked', false);
        }
      })
    }
    //dropdown in nav menu
    $("body").on("click", '.dropdown_toggle_mobile .dropdown_icon', function () {
      if (window.innerWidth <= 768) {
        $(this).parent().toggleClass("active_dropdown");
        $(this).parent().next().slideToggle();
        //it prevents a href
        return false;
      }
    });
  },
  toggleProductTabs: function () {
    // Tabs filter
    $("body").on("click", ".filter_tabs .tabs .tab", function (e) {
      e.preventDefault();
      $(this).addClass("active").siblings().removeClass("active");
      let a = $(this).children();
      $(".panels .panel").slideUp(); //hide all
      $(".panels .panel." + a.attr("data-panel").slice(1)).slideDown(); //show clicked
    });

    $("body").on("change", ".tabs_filter", function () {
      let currclass = $(".tabs_filter .option.selected")
        .attr("data-value")
        .slice(1);
      $(".panels .panel").hide(); //hide all
      $(".panels .panel." + currclass).fadeIn(); //show clicked
    });

    // $(".tabs_filter").change(function () {
    //   let currclass = $(".tabs_filter .option.selected")
    //     .attr("data-value")
    //     .slice(1);
    //   $(".panels .panel").hide(); //hide all
    //   $(".panels .panel." + currclass).fadeIn(); //show clicked
    // });
  },
};

$(document).ready(controller.init);
