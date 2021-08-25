//jQuery.noConflict();
$(function(){
	initUI.setup();
});

var initUI = (function(){
	var isLoaded;
	function setup(){
		if(isLoaded){
			return;
		}
		isLoaded = true;	
		var $body_noscroll = $('body').hasClass('body_noscroll');
		
		registUI('.sample_class', uiSampleFunction, false);		
		if($(window).width()>=1023){
				setTimeout(function(){
					var scrollValue = $(window).scrollTop();
					var $pcSpot = $('.spot').outerHeight() - $('#header').outerHeight();
					if(scrollValue == 0){
						$( 'html, body' ).animate( { scrollTop : $pcSpot }, 700 );
						//IE FIXED 컨텐츠일경우 탭이동 문제 해결
						if ($('body').hasClass('ie')){
							$(this).focus();
						}
					}
				},250);
			}
			if($(window).width()<=1023){
				if($body_noscroll){
					return false;
				}else if(!$body_noscroll){
					setTimeout(function(){
						var scrollValue = $(window).scrollTop();
						var $pcSpot = $('.spot').outerHeight();
						if(scrollValue == 0){
							$( 'html, body' ).animate( { scrollTop : $pcSpot }, 700 );
							//IE FIXED 컨텐츠일경우 탭이동 문제 해결
							if ($('body').hasClass('ie')){
								$(this).focus();
							}
						}
					},250);
				}
			}
				

	}

	function registUI(el, fn, saveData){
		if(saveData === undefined){
			saveData = true;
		}

		var _inst;

		$(el).each(function(idx, obj){
			_inst = new fn();
			_inst.init(obj, el);
			if(saveData){
				$(el).data('_inst', _inst);
			}
		});
	}

	return {
		setup: setup
	};
})();


// sample function
var uiSampleFunction = function(){
	var el;

	function init(_el){
		el = $(_el);
		bindEvents();
		return this;
	}

	return {
		init: init
	};
}

//Header Script
$(function() {
	var $header = $('#header');
	var $gnbList = $('.list_gnb');
	var scrollCtrl = false;

	function init() {
		var nowPosition = $(window).scrollTop();
		if (scrollCtrl == true && nowPosition == 0) {
			scrollCtrl = false;
			if ($('body').hasClass('hidden')) {} else {
				$header.removeClass('on');
				$gnbList.removeClass('on');
			}
		} else if (scrollCtrl == false && nowPosition > 0) {
			scrollCtrl = true;
			$header.addClass('on');
			$gnbList.addClass('on');
		}
	}

	$(window).on('scroll', function() {
		init();
	});
	
	init();
});

/* List Select */
$(function(){
   $('.btn_slct').click(function(){
	if($(this).hasClass('on')){
		$(this).removeClass('on'); 
		$(this).next().slideUp(200);
		$(this).parents('.slct').removeClass('on');
	}else{
		$(this).addClass('on'); 
		$(this).next().slideDown(200);
		$(this).parents('.slct').addClass('on');
	}
});
	
	$('.list_slct>li>a').click(function(){
		var $slectOption = $(this).html();
		$(this).parents('.list_slct').prev('.btn_slct').html($slectOption).css('color','#222');
		$('.slct').removeClass('on')
		$('.list_slct').slideUp(200);
		$(this).parent().parent().prev().removeClass('on');
	});
	
	$('.slct_type').change(function(){
		var $slctCurrent = $(this).val();
		if($slctCurrent != 'null'){
			$(this).css('color','#222');
		}else{
			$(this).css('color','#c6c6c6');
		}
	});
});

/* List Select */
$(function () {
	$('.btn_map').click(function () {
		$('.group_layer').toggleClass('on');
		$(this).toggleClass('on');
	});
});

//버튼 액션
$(function () {
	$('.lst_button>li a').on('mouseenter', function () {
		$(this).children().addClass('on').fadeIn(500);
	});
	$('.lst_button>li a').on('mouseleave', function () {
		$(this).children().removeClass('on').fadeIn(500);
	});

	// 탭 메뉴 영역  
	$(".floor_content").hide();
	$(".floor_content.on").show();

	$(".lst_button a").click(function () {
		$(".lst_button a").removeClass("active");
		$(this).addClass("active");
		$(".floor_content").hide();
		var activeTab = $(this).attr("href");
		$(activeTab).show();

		return false;
	});
});
$(function () {
	$('.slct_type').click(function () {
		$(this).parent().toggleClass('on');
	});
});

$(function(){
	$('.list_inner_notice>li>a,.list_inner_notice2>li>a').mouseenter(function(){
		$(this).children('.group_txt_notice,.img_notice').addClass('on').parents('li').siblings().children().children('.group_txt_notice,.img_notice').removeClass('on');
	});
	$('.list_inner_notice>li>a,.list_inner_notice2>li>a').mouseleave(function(){
		$(this).children('.group_txt_notice,.img_notice').removeClass('on');
	});
});

$(function(){
	$(window).resize( function() {
		var $spotHeightTxt = ($('.group_tit_spot').height())/2;
		var $spotWidthtTxt = ($('.group_tit_spot').width())/2;
		$('.group_tit_spot').css({'margin-top':-($spotHeightTxt),'margin-left':-($spotWidthtTxt)});
		
		
		if($(window).width()<=1023){
			var $mobileSpot = $('.spot').outerHeight() + $('#header').outerHeight();
			var $mobileSpot2 = $('#header').outerHeight();
			$('#content').css('margin-top',$mobileSpot);
			if($('body').hasClass('body_noscroll')){
				$('#content').css('margin-top',$mobileSpot2);
			}
		}
		if($(window).width()>=1023){
			var $mobileSpot = $('.spot').outerHeight();
			$('#content').css('margin-top',$mobileSpot);	
		}	
	}).resize();
});

//FAQ
$(function(){
	$('.btn_qna,.ui-qna').on('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().removeClass('on').next().slideUp().removeClass('on');
		}else{
			$(this).addClass('active');
			$(this).parent().addClass('on').next().slideDown().addClass('on');
			$(this).parent().parent().siblings().children().removeClass('on').next().slideUp().removeClass('on');
		}
	});
});

/* 개인정보 수집 및 이용동의 레이어 팝업  
$(function(){
	$('.btn_pop').click(function(){
		$('.pop_layer').fadeIn(300);
		$('.pop_layer_dimmed').fadeIn(300);
		$('body').css('overflow','hidden');
	});
	$('.pop_btn_clse').click(function(){
		$('.pop_layer').fadeOut(300);
		$('.pop_layer_dimmed').fadeOut(300);
		$('body').css('overflow','');
	});
	
	$('.ui-useagree').click(function(){
		$('.pop_layer').fadeOut(300);
		$('.pop_layer_dimmed').fadeOut(300);
		$('body').css('overflow','');
		$('.checked_conf').attr('checked', 'checked');
		$('.btn_gray.b_write.off').removeClass('off');
	})
	
	popupCenter();
	
	$(window).resize(function(){
		popupCenter();
	}).resize();
	
	function popupCenter(){
		var width = $('.pop_layer').outerWidth();
		var height = $('.pop_layer').outerHeight();
		
		$('.pop_layer').css({
			'left' : ($(window).width() - width) / 2,
			'top' : ($(window).height() - height) / 2,
		});
	}
});
*/

/* 카테고리 및 매장 안내 */
$(function () {
	$('.list_store_wrap').click(function () {
		var maxH =  $('#wrap').height() - $('.footer').height()- parseInt($('#content').css('marginTop'))- parseInt($('.group_detail_store').height()/2)
		var thisH = $(this).offset().top - parseInt($('#content').css('marginTop')) - parseInt($(this).height()*3)
		if(maxH < thisH){
			thisH = maxH
		}
		$('.group_detail_store').css({
			top : thisH
	 });
		$(this).next().fadeIn().parents('li').siblings().children().next().fadeOut()
		
	});
	$('.btn_close_store').click(function () {
		$(this).parents('.group_detail_store').fadeOut();
	});
});


$(document).ready(function () {
	$('.owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: false
			},
			600: {
				items: 1,
				nav: false
			},
			1000: {
				items: 1,
				nav: false,
				loop: false,
				margin: 20
			}
		}
	})
})
 
/* 소개 */
$(function () {
	$('.list_intro_info>li>a').click(function () {
		$(this).addClass('on').parents('li').siblings().children().removeClass('on');
	});
});
