(function($) {

	"use strict";

    var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	function changeBG() {
		const images = [
			// 'assets/images/bg.png',
			'assets/images/cp.svg',
			'assets/images/pl.svg',
			// 'assets/images/hx.svg',
			'assets/images/ts.svg',
			// 'assets/images/sp.svg',
			// 'assets/images/anim.svg',
			'assets/images/anim2.svg',
			'assets/images/anim3.svg',
			'assets/images/anim4.svg',
		];
	
		// Select a random image from the list
		const randomImage = images[Math.floor(Math.random() * images.length)];
	
		// Change the body's background image
		const body = document.querySelector('body');
		if (body) {
			body.style.backgroundImage = `url(${randomImage})`;
			if(randomImage==='assets/images/ts.svg'){
				body.style.backgroundSize = 'inherit';
				body.style.backgroundRepeat = 'repeat';
			} else {
				body.style.backgroundSize = 'cover';
				body.style.backgroundRepeat = 'no-repeat';
			}
		}
	};
	changeBG();	

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);