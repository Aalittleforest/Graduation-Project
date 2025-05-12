(function ($) {
	"use strict";


	// data background js start
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});
	// data background js end

	// sticky start
	var wind = $(window);
	var sticky = $('#sticky-header');
	wind.on('scroll', function () {
		var scroll = wind.scrollTop();
		if (scroll < 100) {
			sticky.removeClass('sticky');
		} else {
			sticky.addClass('sticky');
		}
	});
	// sticky end

	// Preloader start
	$(window).on('load', function () {
		$(".preloder_part").fadeOut();
		$(".spinner").delay(1000).fadeOut("slow");
	});
	// preloader end

	// mobile menu start
	$('#mobile-menu-active').metisMenu();

	$('#mobile-menu-active .dropdown > a').on('click', function (e) {
		e.preventDefault();
	});

	$(".hamburger_menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").toggleClass("show");
		$("body").addClass("on-side");
		$('.body-overlay').addClass('active');
		$(this).addClass('active');
	});

	$(".close-mobile-menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.body-overlay').removeClass('active');
		$('.hamburger_menu > a').removeClass('active');
	});

	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.hamburger-menu > a').removeClass('active');
	});
	// mobile menu end

	// toggle search bar start
	$('.header_search_wrap .search_main > i').click(function () {
		$(".header_search_wrap .search_main > i").hide();
		$(".header_search_wrap .search_main span").show();
		$('.search_form_main').addClass('active-search');
		$('.search_form_main .search-field').focus();
	});
	$('.header_search_wrap .search_main span').click(function () {
		$(".header_search_wrap .search_main > i").show();
		$(".header_search_wrap .search_main span",).hide();
		$('.search_form_main').removeClass('active-search');
		$('.search_form_main .search-field').focus();
	});
	// toggle search bar end

	// back to top start
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('#backtotop:hidden').stop(true, true).fadeIn();
		} else {
			$('#backtotop').stop(true, true).fadeOut();
		}
	});
	$(function () {
		$("#scroll").on('click', function () {
			$("html,body").animate({
				scrollTop: $("#thetop").offset().top
			}, "slow");
			return false
		})
	});
	// back to top end

	// testimonial active start
	$('.testimonial_active').owlCarousel({
		loop: true,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		margin: 30,
		autoplayTimeout: 6000,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			992: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});
	// testimonial active end

	//  magnificPopup start
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	$('.popup-video').magnificPopup({
		type: 'iframe'
	});
	//  magnificPopup end

	// isotop start
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item',
			}
		});

		// filter items on button click
		$('.masonry_active').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
	});

	//for menu active class
	$('.masonry_active button').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});
	// isotop end

	// Accordion Box start
	if ($(".accordion_box").length) {
		$(".accordion_box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion_box");
			var target = $(this).parents(".accordion");

			if ($(this).next(".acc_body").is(":visible")) {
				$(this).removeClass("active");
				$(this).next(".acc_body").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			} else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc_body").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc_body").slideDown(300);
			}
		});
	}
	// Accordion Box end

	// progress start
	$(function () {
		$(".progress").each(function () {
			var value = $(this).attr('data-value');
			var left = $(this).find('.progress-left .progress-bar');
			var right = $(this).find('.progress-right .progress-bar');
			if (value > 0) {
				if (value <= 50) {
					right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
				} else {
					right.css('transform', 'rotate(180deg)')
					left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
				}
			}
		})
		function percentageToDegrees(percentage) {
			return percentage / 100 * 360
		}
	});
	// progress end

	// price range - start
	if ($("#slider-range").length) {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 10000,
			values: [0, 4000.00],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));
	}

	$('.ar_top').on('click', function () {
		var getID = $(this).next().attr('id');
		var result = document.getElementById(getID);
		var qty = result.value;
		$('.proceed_to_checkout .update-cart').removeAttr('disabled');
		if (!isNaN(qty)) {
			result.value++;
		} else {
			return false;
		}
	});
	// price range - end

	// quantity - start
	(function () {
		window.inputNumber = function (el) {
			var min = el.attr("min") || false;
			var max = el.attr("max") || false;

			var els = {};

			els.dec = el.prev();
			els.inc = el.next();

			el.each(function () {
				init($(this));
			});

			function init(el) {
				els.dec.on("click", decrement);
				els.inc.on("click", increment);

				function decrement() {
					var value = el[0].value;
					value--;
					if (!min || value >= min) {
						el[0].value = value;
					}
				}

				function increment() {
					var value = el[0].value;
					value++;
					if (!max || value <= max) {
						el[0].value = value++;
					}
				}
			}
		};
	})();
	inputNumber($(".input_number"));
	// quantity - end

	// niceSelect start
	$('select').niceSelect();
	// niceSelect end

	// blog post active start
	$('.gallery_post_active').owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	// blog post active end

})(jQuery);