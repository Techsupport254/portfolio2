/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
	"use strict";

	const cfg = {
		scrollDuration: 800, // smoothscroll duration
		mailChimpURL: "", // mailchimp url
	};
	const $WIN = $(window);

	// Add the User Agent to the <html>
	// will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
	// const doc = document.documentElement;
	// doc.setAttribute('data-useragent', navigator.userAgent);

	/* preloader
	 * -------------------------------------------------- */
	const ssPreloader = function () {
		$("html").addClass("ss-preload");

		$WIN.on("load", function () {
			// force page scroll position to top at page refresh
			$("html, body").animate({ scrollTop: 0 }, "normal");

			// will first fade out the loading animation
			$("#loader").fadeOut("slow", function () {
				// will fade out the whole DIV that covers the website.
				$("#preloader").delay(300).fadeOut("slow");
			});

			// for hero content animations
			$("html").removeClass("ss-preload");
			$("html").addClass("ss-loaded");
		});
	};

	/* pretty print
	 * -------------------------------------------------- */
	const ssPrettyPrint = function () {
		$("pre").addClass("prettyprint");
		$(document).ready(function () {
			prettyPrint();
		});
	};

	/* move header
	 * -------------------------------------------------- */
	const ssMoveHeader = function () {
		const $hero = $(".s-hero"),
			$hdr = $(".s-header"),
			triggerHeight = $hero.outerHeight() - 170;

		$WIN.on("scroll", function () {
			let loc = $WIN.scrollTop();

			if (loc > triggerHeight) {
				$hdr.addClass("sticky");
			} else {
				$hdr.removeClass("sticky");
			}

			if (loc > triggerHeight + 20) {
				$hdr.addClass("offset");
			} else {
				$hdr.removeClass("offset");
			}

			if (loc > triggerHeight + 150) {
				$hdr.addClass("scrolling");
			} else {
				$hdr.removeClass("scrolling");
			}
		});
	};

	/* mobile menu
	 * ---------------------------------------------------- */
	const ssMobileMenu = function () {
		const $toggleButton = $(".s-header__menu-toggle");
		const $headerContent = $(".s-header__content");
		const $siteBody = $("body");

		$toggleButton.on("click", function (event) {
			event.preventDefault();
			$toggleButton.toggleClass("is-clicked");
			$siteBody.toggleClass("menu-is-open");
		});

		$headerContent.find(".s-header__nav a, .btn").on("click", function () {
			// at 768px and below
			if (window.matchMedia("(max-width: 768px)").matches) {
				$toggleButton.toggleClass("is-clicked");
				$siteBody.toggleClass("menu-is-open");
			}
		});

		$WIN.on("resize", function () {
			// above 768px
			if (window.matchMedia("(min-width: 769px)").matches) {
				if ($siteBody.hasClass("menu-is-open"))
					$siteBody.removeClass("menu-is-open");
				if ($toggleButton.hasClass("is-clicked"))
					$toggleButton.removeClass("is-clicked");
			}
		});
	};

	/* photoswipe
	 * ----------------------------------------------------- */
	const ssPhotoswipe = function () {
		const items = [],
			$pswp = $(".pswp")[0],
			$folioItems = $(".folio-item");

		// get items
		$folioItems.each(function (i) {
			let $folio = $(this),
				$thumbLink = $folio.find(".folio-item__thumb-link"),
				$title = $folio.find(".folio-item__title"),
				$caption = $folio.find(".folio-item__caption"),
				$titleText = "<h4>" + $.trim($title.html()) + "</h4>",
				$captionText = $.trim($caption.html()),
				$href = $thumbLink.attr("href"),
				$size = $thumbLink.data("size").split("x"),
				$width = $size[0],
				$height = $size[1];

			let item = {
				src: $href,
				w: $width,
				h: $height,
			};

			if ($caption.length > 0) {
				item.title = $.trim($titleText + $captionText);
			}

			items.push(item);
		});

		// bind click event
		$folioItems.each(function (i) {
			$(this)
				.find(".folio-item__thumb-link")
				.on("click", function (e) {
					e.preventDefault();
					let options = {
						index: i,
						showHideOpacity: true,
						allowPanToNext: false,
						allowPanToPrev: false,
						fitImagesInViewport: false,
						maxSpreadZoom: 1,
						showAnimationDuration: 0,
						hideAnimationDuration: 0,
						bgOpacity: 0.8,
						closeOnVerticalDrag: false,
						closeOnScroll: false,
						escKey: true,
						arrowKeys: true,
						history: false,
						focus: false,
						showAnimationDuration: 333,
						hideAnimationDuration: 333,
						zoomEl: true,
						shareEl: false,
						tapToClose: true,
						tapToToggleControls: true,
						clickToCloseNonZoomable: true,
						imageLoadComplete: function (index, item) {
							// Ensure image displays at original size and is centered with max constraints
							var img = item.container.querySelector(".pswp__img");
							if (img) {
								img.style.width = "auto";
								img.style.height = "auto";
								img.style.maxWidth = "90vw";
								img.style.maxHeight = "90vh";
								img.style.objectFit = "contain";
								img.style.objectPosition = "center";
								img.style.position = "absolute";
								img.style.top = "50%";
								img.style.left = "50%";
								img.style.transform = "translate(-50%, -50%)";
							}
						},
					};

					// initialize PhotoSwipe
					let lightBox = new PhotoSwipe(
						$pswp,
						PhotoSwipeUI_Default,
						items,
						options
					);
					lightBox.init();
				});
		});
	};

	/* slick slider
	 * ------------------------------------------------------ */
	const ssSlickSlider = function () {
		$(".clients").slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			pauseOnFocus: false,
			autoplaySpeed: 1000,
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 4,
					},
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
			],
		});

		$(".testimonial-slider").slick({
			arrows: true,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			pauseOnFocus: false,
			autoplaySpeed: 1500,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						arrows: false,
						dots: true,
					},
				},
			],
		});
	};

	/* animate on scroll
	 * ------------------------------------------------------ */
	const ssAOS = function () {
		AOS.init({
			offset: 100,
			duration: 600,
			easing: "ease-in-out",
			delay: 300,
			once: true,
			disable: "mobile",
		});
	};

	/* alert boxes
	 * ------------------------------------------------------ */
	const ssAlertBoxes = function () {
		$(".alert-box").on("click", ".alert-box__close", function () {
			$(this).parent().fadeOut(500);
		});
	};

	/* smooth scrolling
	 * ------------------------------------------------------ */
	const ssSmoothScroll = function () {
		$(".smoothscroll").on("click", function (e) {
			const target = this.hash;
			const $target = $(target);

			e.preventDefault();
			e.stopPropagation();

			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $target.offset().top,
					},
					cfg.scrollDuration,
					"swing"
				)
				.promise()
				.done(function () {
					window.location.hash = target;
				});
		});
	};

	/* back to top
	 * ------------------------------------------------------ */
	const ssBackToTop = function () {
		const pxShow = 800;
		const $goTopButton = $(".ss-go-top");

		// Show or hide the button
		if ($(window).scrollTop() >= pxShow)
			$goTopButton.addClass("link-is-visible");

		$(window).on("scroll", function () {
			if ($(window).scrollTop() >= pxShow) {
				if (!$goTopButton.hasClass("link-is-visible"))
					$goTopButton.addClass("link-is-visible");
			} else {
				$goTopButton.removeClass("link-is-visible");
			}
		});
	};

	/* skill bars animation
	 * ------------------------------------------------------ */
	const ssSkillBars = function () {
		const skillBars = $(".skill-percentage");

		// Function to check if element is in viewport
		const isInViewport = function (element) {
			const rect = element.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <=
					(window.innerWidth || document.documentElement.clientWidth)
			);
		};

		// Function to animate skill bars when they come into view
		const animateSkillBars = function () {
			skillBars.each(function () {
				const $this = $(this);
				const width = $this.data("width");

				if (isInViewport(this) && !$this.hasClass("animated")) {
					$this.css("width", width);
					$this.addClass("animated");
				}
			});
		};

		// Check on scroll
		$WIN.on("scroll", animateSkillBars);

		// Initial check
		animateSkillBars();
	};

	/* contact form
	 * ------------------------------------------------------ */
	const ssContactForm = function () {
		const $form = $("#contactForm");
		const $submitBtn = $("#submitBtn");
		const $successMessage = $("#successMessage");
		let isSubmitting = false;

		// Form validation rules
		const validationRules = {
			name: {
				required: true,
				minLength: 2,
				message: "Please enter a valid name (minimum 2 characters)",
			},
			email: {
				required: true,
				pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: "Please enter a valid email address",
			},
			subject: {
				required: false,
				minLength: 3,
				message: "Please enter a subject (minimum 3 characters)",
			},
			service: {
				required: true,
				message: "Please select a service",
			},
			message: {
				required: true,
				minLength: 10,
				message: "Please enter your message (minimum 10 characters)",
			},
		};

		// Validate individual field
		const validateField = function (fieldName, value) {
			const rules = validationRules[fieldName];
			const $field = $(`[name="${fieldName}"]`);
			const $formField = $field.closest(".form-field");

			// Clear previous states
			$formField.removeClass("error success");

			if (rules.required && (!value || value.trim() === "")) {
				$formField.addClass("error");
				return false;
			}

			if (value && rules.minLength && value.length < rules.minLength) {
				$formField.addClass("error");
				return false;
			}

			if (value && rules.pattern && !rules.pattern.test(value)) {
				$formField.addClass("error");
				return false;
			}

			if (value && value.trim() !== "") {
				$formField.addClass("success");
			}

			return true;
		};

		// Validate entire form
		const validateForm = function () {
			let isValid = true;

			Object.keys(validationRules).forEach((fieldName) => {
				const $field = $(`[name="${fieldName}"]`);
				const value = $field.val();

				if (!validateField(fieldName, value)) {
					isValid = false;
				}
			});

			return isValid;
		};

		// Real-time validation
		$form.find("input, select, textarea").on("blur", function () {
			const fieldName = $(this).attr("name");
			const value = $(this).val();
			validateField(fieldName, value);
		});

		// Real-time validation for textarea
		$form.find("textarea").on("input", function () {
			const fieldName = $(this).attr("name");
			const value = $(this).val();
			validateField(fieldName, value);
		});

		// Form submission
		$form.on("submit", function (e) {
			e.preventDefault();

			if (isSubmitting) return;

			// Validate form
			if (!validateForm()) {
				// Scroll to first error
				const $firstError = $form.find(".form-field.error").first();
				if ($firstError.length) {
					$("html, body").animate(
						{
							scrollTop: $firstError.offset().top - 100,
						},
						500
					);
				}
				return;
			}

			isSubmitting = true;

			// Show loading state
			$submitBtn.addClass("loading").prop("disabled", true);
			$submitBtn.find(".btn-text").text("Sending...");

			// Get form data
			const formData = {
				name: $form.find('input[name="name"]').val(),
				email: $form.find('input[name="email"]').val(),
				subject: $form.find('input[name="subject"]').val(),
				service: $form.find('select[name="service"]').val(),
				message: $form.find('textarea[name="message"]').val(),
			};

			// Simulate form processing (replace with actual form handling)
			setTimeout(() => {
				// Create mailto link
				const mailtoLink = `mailto:kiruivictor097@gmail.com?subject=${encodeURIComponent(
					formData.subject || "Contact from Portfolio"
				)}&body=${encodeURIComponent(
					`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
				)}`;

				// Hide form and show success message
				$form.fadeOut(300, function () {
					$successMessage.addClass("show");

					// Open email client after a short delay
					setTimeout(() => {
						window.location.href = mailtoLink;
					}, 1000);
				});

				// Reset form state
				setTimeout(() => {
					isSubmitting = false;
					$submitBtn.removeClass("loading").prop("disabled", false);
					$submitBtn.find(".btn-text").text("Send Message");
					$form[0].reset();
					$form.find(".form-field").removeClass("error success");
					$form.show();
					$successMessage.removeClass("show");
				}, 5000);
			}, 1500);
		});
	};

	/* initialize
	 * ------------------------------------------------------ */
	(function ssInit() {
		ssPreloader();
		ssPrettyPrint();
		ssMoveHeader();
		ssMobileMenu();
		ssPhotoswipe();
		ssSlickSlider();
		ssAOS();
		ssAlertBoxes();
		ssSmoothScroll();
		ssBackToTop();
		ssSkillBars();
		ssContactForm();
	})();
})(jQuery);
