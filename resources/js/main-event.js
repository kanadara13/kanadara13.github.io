$(function() {
	var $window = $(window);
	var $wrapper = $('#wrapper');
	var $header = $('#header');

	if($header.is(':not(".header-dark")')) {
		
		$wrapper.addClass('wrapper-scroll').smoothWheel();
		var $section_main = $('.section.section-main');
		var $section_main_event = $('.section.section-main-event');
		var $section_thumbs = $('.section.section-thumbs');
		var $section_top = $('.section .section-top .section-top-inner');
		
		$window.bind('resize', function(evnet) {
			$wrapper.find('.section .section-inner .section-thumb-movies .thumb-movie').each(function() {
				var $this = $(this);
				$this.height($this.width());
			});
			$wrapper.find('.section-movies').height(678 + $wrapper.find('.section .section-inner .section-thumb-movies .thumb-movie:eq(0)').height());
		}).triggerHandler('resize');
		
		$wrapper.bind('scroll', function(evnet) {
			var scroll = $wrapper.scrollTop();
			if(scroll > 892) {
				$header.addClass('header-active').hide();
			} else {
				$header.removeClass('header-active').show();
			}
			
			if(scroll >= 2700) {
				var t = scroll - 2700;
				$wrapper.find('.section.section-movies').addClass('section-active').find('.section-top-inner').css('background-position', 'center ' +  -(300 - t) + 'px');
			} else {
				$wrapper.find('.section.section-movies').removeClass('section-active');
			}
			
			if(scroll <= 980) {
				var calc = scroll / 100 * 5;
				var denc = calc / 49;
				$("#header").css({'top' : + (-calc*10) + 'px'});
				$section_main.children('.section-inner').css({'background-position' : 'center ' + (-calc) + 'px'});
				$section_main.children('.section-inner').children('*').not('.section-overlay').css({'transform' : 'translate3D(0, ' + (calc * 10) + 'px, 0)'});
				$section_main.find('.section-inner .section-overlay').css({'background-color' : 'rgba(0, 0, 0, ' + denc + ')'});
				$section_main_event.children('.section-inner').css({'transform' : 'translate3D(0,  0px, 0)'});
			} else if(scroll >= 980) {
				var calc = (scroll - 980) / 100 * 5;
				//$section_main_event.children('.section-inner').children('*').not('.section-overlay').css({'transform' : 'translate3D(0, ' + (calc * 10) + 'px, 0)'});
				$section_main_event.children('.section-inner').css({'transform' : 'translate3D(0, ' + (calc * 10) + 'px, 0)'});
			} 
		}).triggerHandler('scroll');
	}
});
