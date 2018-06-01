(function($) {
  /* Overlay */
  var overlay = $('.overlay');
  var button = $('.overlay__open');
  var close = $('.overlay__button');
  var body = $('body');

  button.on('click', function() {
    overlay.addClass('overlay-is-open');
    body.addClass('overlay-active');
  });

  close.on('click', function() {
    overlay.removeClass('overlay-is-open');
    body.removeClass('overlay-active');
  });

  /* 'Por código' search by id search field, limit to numbers only */

  $('.search-field').on('keypress keyup blur', function(event) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^\d].+/, '')
    );
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  });

  /* Clear empty facets */

  // $(document).on('facetwp-loaded', function() {
  //   $.each(FWP.settings.num_choices, function(key, val) {
  //     var $parent = $('.facetwp-facet-' + key).closest('.widget');
  //     (0 === val) ? $parent.hide() : $parent.show();
  //   });
  // });

  /*
   * Back to top
   *  Source: https://codepen.io/ahmedbeheiry/pen/pyRaLy?page=1&
   */

  $(function() {
    var offset = 300,
      duration = 500,
      top_section = $('.to-top'),
      toTopButton = $('a.back-to-top');
    // showing and hiding button according to scroll amount (in pixels)
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $(top_section).fadeIn(duration);
      } else {
        $(top_section).fadeOut(duration);
      }
    });

    // activate smooth scroll to top when clicking on the button

    $(toTopButton).click(function(e) {
      e.preventDefault();
      $('html, body').animate(
        {
          scrollTop: 0
        },
        700
      );
    });
  });

  /*
   * When user scrolls, add classes to the header
   */

  $(window).scroll(function() {
    if ($(window).scrollTop() >= 120) {
      $('.site-header').addClass('js-scroll');
      $('.site-header').addClass('shadow-b');
    } else {
      $('.site-header').removeClass('js-scroll');
      $('.site-header').removeClass('shadow-b');
    }
  });

  /* If the Testimonials component is present, run the Tiny Js Slider */

  if ($('.slider-testimonials').length) {
    var slider = tns({
      container: '.slider-testimonials',
      navContainer: '.slider-testimonials-nav',
      items: 1,
      gutter: 30,
      slideBy: 'page',
      loop: false,
      autoplay: false,
      controls: false,
      responsive: {
        700: {
          items: 2
        },
        1100: {
          items: 3
        }
      }
    });
  }

  /* If the Ventures component is present, run the Tiny Js Slider */

  if ($('.slider-emp').length) {
    var slider = tns({
      container: '.slider-emp',
      navContainer: '.slider-emp-nav',
      items: 1,
      gutter: 30,
      slideBy: 'page',
      loop: false,
      autoplay: false,
      controls: false,
      responsive: {
        1000: {
          items: 2,
          navContainer: false,
          controls: true,
          controlsText: [
            '<svg id="icon-arrow-thick-left" viewBox="0 0 14 42"><title>Anterior</title><path d="M14.695 12.75c0 0.187-0.094 0.398-0.234 0.539l-9.211 9.211 9.211 9.211c0.141 0.141 0.234 0.352 0.234 0.539s-0.094 0.398-0.234 0.539l-1.172 1.172c-0.141 0.141-0.352 0.234-0.539 0.234s-0.398-0.094-0.539-0.234l-10.922-10.922c-0.141-0.141-0.234-0.352-0.234-0.539s0.094-0.398 0.234-0.539l10.922-10.922c0.141-0.141 0.352-0.234 0.539-0.234s0.398 0.094 0.539 0.234l1.172 1.172c0.141 0.141 0.234 0.328 0.234 0.539z"></path></svg>',
            '<svg id="icon-arrow-thick-right" viewBox="0 0 14 42"><title>Siguiente</title><path d="M13.945 22.5c0 0.187-0.094 0.398-0.234 0.539l-10.922 10.922c-0.141 0.141-0.352 0.234-0.539 0.234s-0.398-0.094-0.539-0.234l-1.172-1.172c-0.141-0.141-0.234-0.328-0.234-0.539 0-0.187 0.094-0.398 0.234-0.539l9.211-9.211-9.211-9.211c-0.141-0.141-0.234-0.352-0.234-0.539s0.094-0.398 0.234-0.539l1.172-1.172c0.141-0.141 0.352-0.234 0.539-0.234s0.398 0.094 0.539 0.234l10.922 10.922c0.141 0.141 0.234 0.352 0.234 0.539z"></path></svg>'
          ]
        }
      }
    });
  }

  /* If the Slider Hero in the homepageis present, run the Tiny Js Slider */

  if ($('.slider-hero').length) {
    var slider = tns({
      container: '.slider-hero',
      navContainer: '.slider-hero-nav',
      navAsThumbnails: true,
      controlsText: ['Anterior', 'Siguiente'],
      items: 1,
      gutter: 0,
      slideBy: 'page',
      loop: false,
      controls: false,
      autoplay: false
    });
  }

  // var sliderNav = $('.slider-prop-nav');

  var sum = 0;

  $('.slider-prop-nav li').each(function() {
    sum += $(this).width();
  });

  $('.slider-prop-nav').width(sum);

  if ($('.slider-prop').length) {
    var slider = tns({
      container: '.slider-prop',
      navContainer: '.slider-prop-nav',
      navAsThumbnails: true,
      controlsText: ['Anterior', 'Siguiente'],
      items: 1,
      gutter: 0,
      slideBy: 'page',
      loop: false,
      lazyload: true,
      controls: true,
      autoplay: false
    });
  }

  /* Slider for 'Related properties' */

  if ($('.prop-related__slider').length) {
    var slider = tns({
      container: '.prop-related__slider',
      // controlsText: ['Anterior', 'Siguiente'],
      controlsText: [
        '<svg id="icon-arrow-thick-left" viewBox="0 0 14 42"><title>Anterior</title><path d="M14.695 12.75c0 0.187-0.094 0.398-0.234 0.539l-9.211 9.211 9.211 9.211c0.141 0.141 0.234 0.352 0.234 0.539s-0.094 0.398-0.234 0.539l-1.172 1.172c-0.141 0.141-0.352 0.234-0.539 0.234s-0.398-0.094-0.539-0.234l-10.922-10.922c-0.141-0.141-0.234-0.352-0.234-0.539s0.094-0.398 0.234-0.539l10.922-10.922c0.141-0.141 0.352-0.234 0.539-0.234s0.398 0.094 0.539 0.234l1.172 1.172c0.141 0.141 0.234 0.328 0.234 0.539z"></path></svg>',
        '<svg id="icon-arrow-thick-right" viewBox="0 0 14 42"><title>Siguiente</title><path d="M13.945 22.5c0 0.187-0.094 0.398-0.234 0.539l-10.922 10.922c-0.141 0.141-0.352 0.234-0.539 0.234s-0.398-0.094-0.539-0.234l-1.172-1.172c-0.141-0.141-0.234-0.328-0.234-0.539 0-0.187 0.094-0.398 0.234-0.539l9.211-9.211-9.211-9.211c-0.141-0.141-0.234-0.352-0.234-0.539s0.094-0.398 0.234-0.539l1.172-1.172c0.141-0.141 0.352-0.234 0.539-0.234s0.398 0.094 0.539 0.234l10.922 10.922c0.141 0.141 0.234 0.352 0.234 0.539z"></path></svg>'
      ],
      items: 1,
      gutter: 0,
      slideBy: 'page',
      loop: false,
      lazyload: true,
      controls: true,
      autoplay: false,
      nav: false,
      responsive: {
        700: {
          items: 2
        },
        1024: {
          items: 3
        }
      }
    });
  }

  /* Add classes to WPForms button */

  $('.wpforms-submit').addClass('button button--arrow button--rose');

  /* Search, toggle Advanced search */

  $('.js-toggle-search').on('click', function(e) {
    // prevent default anchor behaviour
    e.preventDefault();
    // show/hide Advanced search fields
  });
  console.log('pepe');
  console.log('pepe2');
  console.log('pepe3');
  console.log('pepe4');
  $('body').addClass('black');
})(jQuery);
