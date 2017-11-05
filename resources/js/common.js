function videoPlay(url){
	
	$('video#video-play').load();
	$('video#video-play').prop("autoplay","true");
	
	$(".section-top-content").hide();
	$('video#video-play').fadeIn(2500, function() {
		
	});
}

function next(action) {
	var next_frm = $("[name='next_frm']");
	hidden_add(next_frm, "module_page_check", "true");
	next_frm.attr({
		"action" : action == '' ? '/' : action
	}).submit();
}


function hidden_add(form, name, value) {
	$('<input>').attr({
		type : 'hidden',
		name : name,
		value : value
	}).appendTo(form);
}


function goPageView(url){
	location.href= url;
}

function bottomVideoPlay(url){
	
	var html = [];
	html.push('<div class="close_modal"><a href="javascript:popup_close();"><img src="/resources/img/btn_close.png" alt="닫기" /></a></div>');
	
	html.push('<video id="video-sp-modal-play" muted controls class="video-play-pop" preload="metadata" src="'+url+'">');
	html.push('Sorry, your browser does not support HTML5 video.');
	html.push('</video>');
	html.join('');
	
	$('#modal_content').html(html);
	$('#modal_pop').modal();
	
	$('video#video-sp-modal-play').load();
	$('video#video-sp-modal-play').prop("autoplay","true");
	$('video#video-sp-modal-play').fadeIn(2500, function() {
		
	});
}


function popup_close() {
	$.modal.close();
}

function onclickSearch(){
	$("[name=searchFrm]").submit();
}

function CommonAjax(url, param)
{
    var rtn;

    $.ajax({
        type        : "POST",
        url         : url,
        data        : param.join("&"),
        async       : false,
        success     : function(data) {
            rtn = data;
        },
        error       : function(e) {
            alert("시스템 에러 ")
        }
    });

    return rtn;
}

$(function() {
	var $window = $(window);
	var $wrapper = $('#wrapper');
	var $header = $('#header');

	$('span.gnb-menu').bind('mouseleave', function() {
		var $this = $(this);
		$this.removeClass('gnb-hover');
	}).children('a').bind('mouseenter', function() {
		var $this = $(this);
		$this.closest('.gnb-menu:not(".gnb-highlight")').addClass('gnb-hover');
	});
	
	if (/Edge/i.test(navigator.userAgent)){
		$window.bind('load, init', function() {
			// 엣지 table-cell 이슈 개선
			$('.section').find('div, span').each(function() {
				var $this = $(this);
				if($this.css('position') == 'absolute' && $this.parent().css('display') == 'table-cell') {
					$this.css('position', 'static');
					setTimeout(function() {
						$this.css('position', 'absolue');
					}, 25);
				}
			});
		}).triggerHandler('init');
	}

	$("#main-visual").owlCarousel({
		navigation: true, // Show next and prev buttons
		slideSpeed: 500,
		paginationSpeed: 400,
		//paginationSpeed: 3600,
		singleItem: true,
		pagination: false,
		transitionStyle: 'fade',
		mouseDrag: false,
		touchDrag: false
	});
	
	$('video#video-play').on('ended',function(){
		$('video#video-play').hide();
		//$('video#videobcg').play();
	});	
});
