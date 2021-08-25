// 전역변수 설정 
var agent = navigator.userAgent.toLowerCase(); // 피씨 체크
var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
var currentOS;
var $windowWidth;
var iosNoscroll = document.querySelector("#container");

if (mobile) {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1) {
		currentOS = "android";
	} else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)) {
		currentOS = "ios";
	} else {
		currentOS = "else";
	}
}  else if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	$('body').addClass('br_ie');
}

function scrollOff() {
	if (currentOS == "ios"){
		bodyScrollLock.disableBodyScroll(iosNoscroll);
	} else {
		$("body").addClass('no_scroll').bind('touchmove', function (e) { e.preventDefault();});
	}
}

function scrollOn() {
	if (currentOS == "ios") {
		bodyScrollLock.enableBodyScroll(iosNoscroll);
	} else {
		$("body").addClass('no_scroll').unbind('touchmove');
	}
}

$(window).resize(function () {
	$windowWidth = $(window).width();
	return $windowWidth;
}).trigger('resize');

//  header - 주메뉴
function gnb() {
	// 첫번째 뎁스 활성화
	$('#header').hover(function () {
		$(this).addClass('on');
		$('.list_gnb').addClass('on');
	});

	// 서브
	if (!$('#wrap').hasClass('sub')) {
		$('#header').mouseleave(function () {
			$(this).removeClass('on');
			$('.list_gnb').removeClass('on');
		});
	}

	// 처음 내려오는 메뉴는 슬라이드 가 되어야 해서 타겟팅
	var gnbCount = 0;
	$('#gnb').hover(function () {
		gnbCount++;
	}, function () {
		gnbCount = 0;
	});

	// 2뎁스 메뉴 활성화
	$('.list_gnb > li').stop().mouseenter(function () {
		gnbCount++;
		var $this = $(this);

		$this.addClass('on').siblings().removeClass('on');
		$('.depth_bg').addClass('on');

		if (gnbCount > 1) {
			$this.find('.gnb_depth').show();
		} else {
			$this.find('.gnb_depth').stop().slideDown();
		}
	});
	
	// 2뎁스 메뉴 비활성화
	$('.list_gnb > li').stop().mouseleave(function () {
		$('.list_gnb > li , .depth_bg').removeClass('on');
		// $('.depth_bg').stop().slideUp(100);
		$(this).find('.gnb_depth').hide();
	});
}

// 애니메이션 모음
function commonAnimation() {
	// GNB
	TweenMax.from($('#gnb'), 1, {
		y: -250,
		opacity: 0,
		ease: Circ.easeOut,
	});

	// 사이드바
	TweenMax.from($('#sidebar'), 1, {
		x: 100,
		delay: 1,
	});
}

//  side -햄버거 메뉴
function hambuger() {
	$('.btn_side_menu').click(function () {
		$('.btn_side_menu').toggleClass('on');

		if ($('.btn_side_menu').hasClass('on')) {
			$('.dimmed.type_munu , .fixed_lnb').addClass('on');
			$.fn.fullpage.setMouseWheelScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
		} else {
			$('.dimmed.type_munu ,.fixed_lnb').removeClass('on');
			$.fn.fullpage.setMouseWheelScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
		}
	});

	$('.dimmed.type_munu').click(function () {
		$(this).removeClass('on');
		$.fn.fullpage.setMouseWheelScrolling(true);
		$.fn.fullpage.setAllowScrolling(true);
		$('.fixed_lnb, .btn_side_menu').removeClass('on');
	});
}

// side -  지점명 글자 떨어트리기
function sideMarketName() {
	$('.title_market').each(function () {
		$(this).html($($(this)).text().replace(/(.)/g, "$1<br />"));
	});
}

// siide -  지점보기 메뉴
function viewMarketInfo() {
	var _hideCount = 0,
		$item = $('.type_accodion >li:gt(0)'),
		$itemLength = $item.length, // 지점 갯수
		$itemWidth = $item.innerWidth(); // 지점 넓이
		$firstAcoodionPos = ($itemLength * $itemWidth) + $itemLength; // 곱하기 + 여백

	$('.type_accodion').css({
		'right': -$firstAcoodionPos,
	});
	$('.type_accodion').addClass('before');

	// 현재 접속중인 사이트의 더보기 메뉴가 아닌 다른 지점의 더보기(+) 버튼
	$('.btn_market_more').not('.site_market').click(function () {
		_hideCount = 0;

		var $this = $(this),
			$litag = $this.parents('li');
		
		$('.site_market').removeClass('on');
		$('.list_markt_info').find('.first').removeClass('active');
		if ($litag.hasClass('active')) {
			$litag.removeClass('active');
			$this.removeClass('on');
		} else {
			$litag.addClass('active');
			$this.addClass('on');
			$litag.siblings().find('.btn_market_more').removeClass('on');
			$litag.siblings().removeClass('active');
		}
		$litag.siblings().find('.btn_market_more').removeClass('on');
	});

	// 현재 사이트의 지점 정보보기(+) 버튼
	$('.site_market').click(function () {
		var $target = $('.type_accodion .first');
		_hideCount++;

		$(this).addClass('on');	

		if (_hideCount == 1 && $('.type_accodion').hasClass('before')) {
			$('.type_accodion').css('right', 70);
		}

		$('.type_accodion').removeClass('before');
		$('.type_accodion').find('.btn_market_more').removeClass('on');
		$target.siblings().removeClass('active');
		if ($target.hasClass('active')) {
			$target.removeClass('active');
		} else {
			$target.addClass('active');	
		}

		if (_hideCount == 2) {
			$('.list_markt_info > li').removeClass('active');
			$('.btn_market_more').removeClass('on');
			$('.type_accodion').addClass('before');
			$('.type_accodion').css('right', -$firstAcoodionPos);
			$(this).removeClass('on');
			_hideCount = 0;
		}
	});
}

// side - 사이드바 SNS 클릭
function sideSnsClick() {
	$('.list_side_menu').find('.ico_side_menu').mouseover(function () {
		$(this).addClass('on');
	});

	$('.list_side_menu').find('.ico_side_menu').mouseleave(function () {
		$('.ico_side_menu').removeClass('on');
	});

	setTimeout(function () {
		$('.list_side_basic').find('.ico_floor').addClass('on');
	}, 2000);

	setTimeout(function () {
		$('.list_side_basic').find('.ico_floor').removeClass('on');
	}, 4500);

	$('.ico_side_menu.ico_share').click(function () {
		$('.list_side_menu').toggleClass('on');
	});
}

// 공통함수 - 문자 1개씩 자르기
function cutWord($target) {
	$($target).html($($target).text().replace(/(.)/g, "<span>$1</span>"));
	$($target).find(">span").each(function () {
		if ($(this).text() == " ") {
			$(this).addClass('none_area').css({
				'display': 'inline-block',
				'width': '3%',
			});
		}
	});
}

// 모바일 - 주메뉴
function mobileGnb() {
	$('.meun_hambuger.type_mo_gnb').click(function () {
		//scrollOff();
		$('#mo_gnb').addClass('on');
		$('.footer').css({
			display : 'none'
		})

	});

	$('.mo_gnb_close').click(function () {
		$('#mo_gnb').removeClass('on');
		$('.footer').css({
			display : 'block'
		})
	});

	// 주메뉴 열림 닫힘
	$('.btn_mo_gnb').click(function () {
		var $this = $(this),
			$partent = $this.parent();
		if ($this.hasClass('on')) {
			$this.removeClass('on');
			$this.siblings('.list_mo_gnb_depth').stop().slideUp();
		} else {
			$this.addClass('on');
			$this.siblings('.list_mo_gnb_depth').stop().slideDown();
			$partent.siblings().find('.list_mo_gnb_depth').stop().slideUp();
			$partent.siblings().find('.btn_mo_gnb').removeClass('on');
		}
	});

	// 링크 선택
	$('.list_mo_gnb_depth > li').click(function () {
		$('.list_mo_gnb_depth > li').removeClass('on');
		$(this).addClass('on').siblings().removeClass('on');
	});

	// sns 클릭
	$('.ico_mo_quick.ico_sns').click(function () {
		//scrollOff();
		var $partent = $(this).parent();
		$partent.addClass('sns');

		$(this).siblings('.dimmed').click(function () {
			//scrollOn();
			$partent.removeClass('sns');
		});
	});
}

function familly_Site() {
	$('.btn_familly_site').click(function () {
		var $this = $(this);
		if ($this.hasClass('on')) {
			$this.removeClass('on');
			$this.siblings('.dimmed').addClass('hide');
			$.fn.fullpage.setMouseWheelScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
		} else {
			$this.addClass('on');
			$this.siblings('.dimmed').removeClass('hide');
			$.fn.fullpage.setMouseWheelScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
		}
	});

	// 딤드 클릭시 패밀리 사이트 닫힘
	$('.dimmed.trans').click(function () {
		$(this).addClass('hide');
		$(this).siblings().removeClass('on');
		$.fn.fullpage.setMouseWheelScrolling(true);
		$.fn.fullpage.setAllowScrolling(true);
	})
}

function mobileHeader() {
	$(window).resize(function () {
		var $headerSize = $('#header').innerHeight();
		if ($windowWidth > 1023) {
			$('#container').css('margin-top', 'auto');
		} else {
			$('#container').css('margin-top', $headerSize);
		}
	}).trigger('resize');
}

/*************************
 * 사이드바 함수 모음
*************************/
function sideBar() {
	hambuger();
	sideMarketName();
	viewMarketInfo();
	sideSnsClick();
}
/* * * * * * * * * * * * 
* *   함수 적용    * *
* * * * * * * * * * * **/
$(function () {
	commonAnimation();
	gnb();
	sideBar();
	familly_Site();
	mobileHeader();
	mobileGnb();
});