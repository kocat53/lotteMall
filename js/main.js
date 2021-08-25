// fullpage 스크롤 플러그인
function mainFullpage() {
	var mainContLength = $('#container').find('.section').length;
	var mainLayout = $('#container').fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		scrollHorizontally: true,
		responsiveWidth: 1025,
		anchors: ['Home', 'Mall', 'Mart', 'Cinema'],
		lockAnchors: true, // url hash 방지
		afterResponsive: function (isResponsive) {
			// $('.fp-tableCell').addClass('mobile_top');
        },
		
		// 바뀔시
		onLeave: function (origin, destination, direction) {
			var mainSecection = $('#container >.section ').eq(destination.index); // 섹션별 index값 추출
			$('.navi_content > li').eq(destination.index).addClass('on').siblings().removeClass('on'); // 컨텐츠에따른 메뉴 활성화처리
			
			if ($windowWidth > 1023) {
				
				// 2번째 컨텐츠부터
				if (destination.index == 0) {
					$('.navi_content').removeClass('hidden');
				}

				if (destination.index > 0 ) {
					$('#header , .navi_content ,.list_gnb ,.top_btn_area').addClass('scroll');
					mainSecection.addClass('section_motion'); // 애니메이션 제어용 CSS 추가
					
					// mall
					if (destination.index == 1) {
						TweenMax.from($('.section2_lottemall'), 1, {
							y: 500,
							delay: 0.4,
						});
					}

					// Mark
					if (destination.index == 2) {
						$('.navi_content').removeClass('scroll');
					}

					if (destination.index == direction.length && direction =="down") {
						$('.navi_content').addClass('hidden');
					} else {
						$('.navi_content').removeClass('hidden');
					}
				} else {
					// 메인 페이지로으로 되돌아 올 경우
					$('#header, .navi_content ,.list_gnb ,.top_btn_area').removeClass('scroll');
				}
			}
		},
		afterLoad: function (origin, destination, direction) {
			$('.navi_content > li').eq(destination.index).addClass('on').siblings().removeClass('on'); // 컨텐츠에따른 메뉴 활성화처리
			
			if (destination.index == 1 && $windowWidth > 1023) {
				TweenMax.staggerFrom($('.section2_lottemall >span'), 0.7, {
					opacity:1,
					y: 500,
					ease: Power4.easeOut,
				}, 0.1);
			}
		},
	});

	$('.navi_content > li ').click(function () {
		var $data = $(this).data('full');
			$.fn.fullpage.moveTo($data, 1);
	});
}

// 메인 첫 이미지 자동 바뀜
function mainImg() {
	$('.main_bg_motion >div').eq(0).addClass('on');
	var $mainCount =1;
	var $mainLength = $('.main_bg_motion > div').length;

	var mainBg = setInterval(function(){
		$mainCount++;
		$('.main_bg_motion >div').eq(($mainCount-1)).addClass('on').siblings().removeClass('on');
		if ($mainCount >= $mainLength) {
			$mainCount = 0;
		}
	}, 5500);
}

// 메인메뉴 1페이지 슬라이드
function mainPageSlider() {
	var $item = $('.main_top_slider').find('.item_main_top_banner').length;
	if ($item == 1) {
		$('.main_top_slider').css('padding-left', 0);
		$('.pager_main').addClass('hide');
	}
	var mainTopSlider = new Swiper('.main_top_slider .swiper-container', {
		loop: ($item == 1) ? false : true,
		speed: 400,
		grabCursor: ($item == 1) ? false : true,
		autoplay: {
			delay: 7000,
		},
		breakpoints: {
			1023: {
				centeredSlides: true,
				slidesPerView: ($item == 1) ? 2.5 : 3,
				spaceBetween: 1,
				loop: false,
			},
			640: {
				centeredSlides: true,
				slidesPerView: 2.5,
				spaceBetween: 1,
				loop: false,
			},
			540: {
				centeredSlides: true,
				slidesPerView: ($item == 1) ? 1.9 : 2,
				spaceBetween: 1,
				loop: false,
			},
		},
		spaceBetween:0,
		pagination: {
			el: '.pager_main',
			type: 'bullets',
			bulletClass:'pager_bullet',
			bulletActiveClass:'active',
			clickable: true
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
	});

	var mainMartSlider = new Swiper('.main_mart_slider .swiper-container', {
		loop: true,
		speed: 400,
		autoplay: {
			delay: 5000,
		},
		slidesPerView: 3,
		spaceBetween: 0,
		pagination: {
			el: '.pager_mall',
			type: 'bullets',
			bulletClass:'pager_bullet',
			bulletActiveClass:'active',
			clickable: true
		},
		breakpoints: {
			980: {
				slidesPerView: 2,
			},
			650: {
				slidesPerView: 1,
			},
		},
		navigation: {
			nextEl: '.btn_mart_next',
			prevEl: '.btn_mart_prev',
		},
		keyboard: {
			enabled: true,
			onlyInViewport: false,
		},
	});
}

// 메인 공지사항
function mainNotice() {
	var mainNotice = new Swiper('.main_notice_wrap ',{
		loop: true,
		autoplay: {
			delay: 7000,
		},
		slidesPerView: 1,
		calculateHeight:true,
		direction: 'vertical',
		speed: 400,
		spaceBetween: 0,
		autoHeight: true
	});
}

// 메인 애니메이션
function mainAnimation() {
	if ($windowWidth > 1023) {
		// 좌측 아래 컨텐츠 이동 네비게이션
		TweenMax.staggerFrom($('.navi_content >li'), 1, {
			x: -250,
			opacity: 0,
			ease: Circ.easeOutm,
			delay: 0.75,
		}, 0.1);

		// 메인 텍스트 및 비게이션 영역
		TweenMax.staggerFrom($('.main1_content_box').children().not('.main_top_banner'), 1, {
			x: '-100%',
			opacity: 0,
			ease: Circ.easeOutm,
		}, 0.5);

		// 첫페이지 슬라이더
		TweenMax.from($('.main_top_slider'), 1.5, {
			x: 600,
			delay:1,
			opacity: 0
		});
	}

	if ($windowWidth > 1201) {
		// 메인 top 슬라이드
		var $introLength = $('.main_top_banner.type_intro > .item_main_top_banner').length;
		if ($introLength > 1) {
			$('.main_top_banner.type_intro').addClass('animation');
			setTimeout(function() {
				$('.main_top_banner.type_intro > .item_main_top_banner:gt(0)').each(function () {
					var $index = $(this).index();
					TweenMax.staggerTo($(this), 0.8, {
						x: ($index * 101 + '%'),
						ease: Circ.easeOutm,
						onComplete: function () {
							$('.main_top_banner.type_intro').remove();
						},
					}, 0.4);
				});	
			}, 5000);
		}
	}

	// 마우스 휠 하라는 이미지
	TweenMax.from($('.motion_scroll'), 1, {
		y: 300,
		opacity: 0,
		ease: Circ.easeOutm,
		delay: 3
	});
}

/* * * * * * * * * * * * 
* *   함수 적용    * *
* * * * * * * * * * * **/
// 공통 적용 영역
$(function () {
	mainFullpage();
	mainImg();
	mainNotice();
	mainPageSlider();
	mainAnimation();
	cutWord('.section2_lottemall');
});