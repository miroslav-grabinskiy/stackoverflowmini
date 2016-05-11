'use strict';

$( document ).ready(function() {

	var topbar = (function() {
		var topbarIconFlag = false;
		var linkContainerFlag = false;

		var addFocus = function() {
			topbarIconFlag = false;
			$('.topbar-dialog').removeClass('show').addClass('hide');
			$('.topbar-icon').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
			$('.links-container.help-container').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
		};

		$('.topbar-dialog').click(function() {
	    	event.stopPropagation();
	    });

		$('.links-container.help-container').click(function() {
	    	event.stopPropagation();

			if ( $(this).hasClass('bg-lightwhite') ) {
				topbarIconFlag = false;
				$('.topbar-dialog').removeClass('show').addClass('hide');
				$(this).removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$('html').bind('click', addFocus);
	    	} else {
				linkContainerFlag = true;
				$('.topbar-dialog').removeClass('show').addClass('hide');
				$('.topbar-icon').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$(this).removeClass('bg-hover-lightblack').addClass('bg-lightwhite');
				$(this).find('.topbar-dialog').removeClass('hide').addClass('show');
				$('html').unbind('click', addFocus);
			}
		});

		$('.topbar-icon').click(function() {
	    	event.stopPropagation();

	    	if ( $(this).hasClass('bg-lightwhite') ) {
				topbarIconFlag = false;
				$('.topbar-dialog').removeClass('show').addClass('hide');
				$(this).removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$('html').unbind('click', addFocus);
	    	} else {
				topbarIconFlag = true;

				$('.topbar-dialog').removeClass('show').addClass('hide');
				$('.links-container.help-container').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$(this).removeClass('bg-hover-lightblack').addClass('bg-lightwhite');
				$(this).find('.topbar-dialog').removeClass('hide').addClass('show');
				$('html').bind('click', addFocus);
	    	}

		});

		$('.topbar-icon').hover(function() {
			if (topbarIconFlag) {
				$('.topbar-dialog').removeClass('show').addClass('hide');
				$('.topbar-icon').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$('.links-container.help-container').removeClass('bg-lightwhite').addClass('bg-hover-lightblack');
				$(this).removeClass('bg-hover-lightblack').addClass('bg-lightwhite');
				$(this).find('.topbar-dialog').removeClass('hide').addClass('show');
			}
		});



		$('.logout').click(function() {
			$(this).find('form').submit();
		});
	})();
	
});
