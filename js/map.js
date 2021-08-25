var windowLoad = true;
//jQuery.noConflict();
/*!
 * jQuery UI Touch Punch 0.2.3
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
//resizeEndLib
//!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){function n(){var d=Date.now()-l;d<i&&d>=0?r=setTimeout(n,i-d):(r=null,t||(f=e.apply(u,o),u=null,o=null))}var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,t=arguments[2],r=void 0,o=void 0,u=void 0,l=void 0,f=void 0,d=function(){u=this;for(var d=arguments.length,a=Array(d),s=0;s<d;s++)a[s]=arguments[s];o=a,l=Date.now();var c=t&&!r;return r||(r=setTimeout(n,i)),c&&(f=e.apply(u,o),u=null,o=null),f};return d.clear=function(){r&&(clearTimeout(r),r=null)},d.flush=function(){r&&(f=e.apply(u,o),u=null,o=null,clearTimeout(r),r=null)},d}var n=window.jQuery;if(!n)throw new Error("resizeend require jQuery");n.event.special.resizeend={setup:function(){var i=n(this);i.on("resize.resizeend",e.call(null,function(e){e.type="resizeend",i.trigger("resizeend",e)},250))},teardown:function(){n(this).off("resize.resizeend")}}});
var stopScrolling=!1;function handleTouchMove(o){stopScrolling&&o.preventDefault()}function onTouchStart(){stopScrolling=!0}function onTouchEnd(){stopScrolling=!1}window.addEventListener("touchmove",handleTouchMove,{passive:!1});
(function () {
	var THRESHOLD = 750;
	var timeoutId;
	var resizing = false;
	var win = $(window);

	win.on('resize', function () {
		var timeout = function () {
			clearTimeout(timeoutId);

			timeoutId = setTimeout(function () {
				resizing = false;
				win.trigger('resizeEnd');
			}, THRESHOLD);
		};

		if (!resizing) {
			resizing = true;
			win.trigger('resizeStart');
		}

		timeout();
	});
}());

!function($) {
	'use strict';
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
			registUI('#mallMap', tbActtoin, true); // 지도UI  
			registUI('#normal', adminImgInit, false);
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
	
	//function for developer
	window.devFunc = function(){
		var reset = {}
		function setMap(){
	
			//devFunc.setMap(left,top) Number
			$('#mallMap').data('_inst').makePostion(arguments[0],arguments[1])
		}
		function restMap(){
			$('#mallMap').data('_inst').reset();
		}
		function actMap(){
			//devFunc.actMap(f+floorserial,z+shopserizl) 
			var arg = arguments;
			$('.'+arg[0]).trigger('click')
			setTimeout(function(){
				$('.'+arg[1]).trigger('click')
			},300)
			
		}
		return {
			setMap : setMap,
			restMap : restMap,
			actMap :actMap
		}
	}();

	var tbActtoin = function(){
		var el ,pointTop =0, pointLeft=0 ,zoomVal=false,area,pointerv = false, drag = false;
		var imageSize = 1200;
		var sizeA = [13,25,17,20,9,15];
		var srv = 0.5;
		var floor ;
		function init(_el) {

			el = $(_el)
			minimap()
			bindEvent()
			
		}
		
		function bindEvent() {
			$('.list_store').on('click','a.list_store_wrap',function(evt){
				evt.preventDefault()
				$('a.list_store_wrap').removeClass('on')
				$(this).addClass('on')
				pointLeft = Number($(this).attr('data-left'))
				pointTop = Number($(this).attr('data-top'))
				floor = $(this).attr('data-f')
				$('.'+floor).trigger('click')
				makePostion()
				
			})
			
			$('.lst_button  li a').on('click',function(evt){
				evt.preventDefault()
				var src  = $(this).attr('data-src')
				$('.group_map_area img').attr('src',src)
				$('#mallMap').attr('style','display:block')
				clearPointer();
			})

			$('#zoom').on('click',function(e){
	
				if(!zoomVal){
					if(pointerv){
						zoomVal = true;
						$('#zoom').closest('li').removeClass('on')
						$('#zoomO').closest('li').addClass('on')
						moveToZposition()
					}else{
						alert('매장을 선택해주세요.')
						return false;
					}
					
				}else{
					alert('최대 크기입니다.')
				}
			})
			$('#zoomO').on('click',function(e){
				if(!zoomVal){
					alert('최소 크기입니다.')
				}else{
					gosmall()
					$('#zoomO').closest('li').removeClass('on')
					$('#zoom').closest('li').addClass('on')
				}
			});
			$('#miniM').on('click',function(e){
				if(!zoomVal){
					alert('최소 크기입니다.')
				}else{
					minimap('t')
				}
				
			});
			
			$('#fullM').on('click',function(e){
				window.open(
					$('.img_floor img').attr('src'),
					'_blank' 
				);
			});
		}

		function minimap(){	
			var state  = 	arguments[0]	;
			var el = $('.img_floor_map');
			switch (state) {
				case 's':
					el.attr('style', 'display:block!important');
					$('#miniM').closest('li').addClass('on')
					break;
				case 'h':
					el.attr('style', 'display:none!important');
					$('#miniM').closest('li').removeClass('on')
					break;	
				case 't':
					if(el.is(':visible') == false ){
						el.attr('style', 'display:block!important');
						$('#miniM').closest('li').addClass('on')
					} else {
						el.attr('style', 'display:none!important');
						$('#miniM').closest('li').removeClass('on')
					}
					break;
				default:
					el.attr('style', 'display:none!important');
			}
		}

		function getRsv(){
			var img = $('.img_floor > img');
			var imgw = img.width();
			var v  =  imageSize / imgw;
			var imgw2 = 300;
			var v2  =  imageSize / imgw2
			return [v,v2,imgw2,imgw];
		}

		function makePostion(){
			var rsv  = getRsv();
			clearPointer()
			
			if(	pointLeft==0){
				pointLeft = arguments[0], pointTop= arguments[1]
			}
			if(rsv[3] < 1010 ) {
				var leftv = pointLeft/rsv[0]-sizeA[4];
				var topv = pointTop/rsv[0]-sizeA[5];
			}else{
				var leftv = pointLeft/rsv[0]-sizeA[0];
				var topv = pointTop/rsv[0]-sizeA[1];
			}
			

			var miniLeftv = pointLeft/rsv[1]-8
			var miniTopv = pointTop/rsv[1]-20
			
			$('.img_floor').append('<div class="bu_place" style="top:'+topv+'px ;left:'+leftv+'px"></div>');
			pointerv = true;
			$('.img_floor_map ').append('<div class="bu_place" style="top:'+miniTopv+'px ;left:'+miniLeftv+'px"></div>');
			if(zoomVal){
				moveToZposition()
			}else{
				$('#zoom').trigger('click')
			}
		};
		function clearPointer(){
			$('.bu_place').remove();
			getMapTop();
		};
		function getMapTop(){
			$( 'html, body' ).animate( { scrollTop : $('.group_map_info').offset().top - 100 }, 300 );
			
		}
		function getTransform() {
			var transformMatrix = $('#testArea2').css("-webkit-transform") ||
			obj.css("-moz-transform")    ||
			obj.css("-ms-transform")     ||
			obj.css("-o-transform")      ||
			obj.css("transform");
		var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
		var x = matrix[12] || matrix[4];//translate x
		var y = matrix[13] || matrix[5];//translate y
		return[x,y]
		};
		function moveToZposition(){
			var sv = 2,rv = 1;
			var el2 = $('.img_floor ');
			el2.removeAttr('style')
			var rsv  = getRsv();
			
			if(rsv[3] < 1010 ) {
				sv = 4;
				rv = 3;
				srv = 0.3;
			}
			var oriTopv  = pointTop/rsv[0]*-1*rv-sizeA[1], oriLeftv = pointLeft/rsv[0]*-1*rv-sizeA[0];
			var areaSizeW = $('.group_map_area ').width();
			var areaSizeH = $('.group_map_area ').height();
			TweenMax.to(el2, 0.3, {ease: Power2.easeOut,scale:sv,x:oriLeftv  , y: oriTopv,onComplete:sNMarker()})
			var position = { x: 0, y: 0 }
			el2.draggable({ 
				stop (event, ui) {
					var maxLeft = (oriLeftv  < 0 )?  areaSizeW*rv + oriLeftv : areaSizeW - oriLeftv;
					var minleft = areaSizeW*rv - maxLeft;
					var maxTop =  (oriTopv  < 0 )?  areaSizeH*rv + oriTopv : areaSizeH - oriTopv;
					var minTop = areaSizeH*rv - maxTop;
					var x,y;
					if(ui.position.left < maxLeft * -1 ){
						x = maxLeft * -1
						drag = true;
 
					}else if(ui.position.left > minleft ){
						x = minleft
						drag = true;
					}else{
						x = ui.position.left
					}
					if(ui.position.top < maxTop * -1 ){
						y = maxTop * -1
						drag = true;

					}else	if(ui.position.top > minTop ){
						y = minTop
						drag = true;
					}else{
						
						y = ui.position.top
					}
					if(drag){
						TweenMax.to(el2, 0.3, {ease: Power2.easeOut,left:x,top:y})
						drag = false;
					}
				}
			 });
		};
		function sNMarker(){
			var el = $('.img_floor  .bu_place');
			el.hide();
			var rsv  = getRsv();

			TweenMax.to(el, 0.3, {ease: Power2.easeOut,scale:srv,onComplete:function()
					{	
						if(rsv[3] < 1010 ) {
							el.css({'top' :'+=3px','left' :'-=1px' }).show()
						}else{
			
							el.css({'top' :'+=9px','left' :'-=3px' }).show()
						}
					}
				}
			)
			
		}
		function bNMarker(){
			var el = $('.img_floor  .bu_place'); 
			el.hide();
			var rsv  = getRsv();
			TweenMax.to(el, 0.3, {ease: Power2.easeOut,scale:1,onComplete:function()
						{
							if(rsv[3] < 1010 ) {
								el.css({'top' :'-=3px','left' :'+=1px' }).show()
							}else{

								el.css({'top' :'-=9px','left' :'+=3px' }).show()
							}
							
						}
					}
				)
		}
		function gosmall(){
			
			var el2 = $('.img_floor ');
			var arg = arguments[0]
			if(!arg){
				el2.draggable( "destroy" );
			}
			TweenMax.to(el2, 0.3, {ease: Power2.easeOut,scale:1,x:0  , y: 0,onComplete:bNMarker()})
			el2.removeAttr('style')
			if($('.img_floor_map').is(':visible')){
				minimap('h')
			}
			zoomVal=false;
			
		}
		function reset(){
			gosmall(true)
			clearPointer();
			$('.list_store li a').removeClass('on')
		}
		return {
			init :init,
			makePostion:makePostion,
			reset,reset
		}

	}

	// calImage function
	var adminImgInit = function(){
		var el,xy,getxy;
		var sizeA = [13,25,17,20,8,14];
		var imageSize = 1200;

		function init(_el){
			el = $(_el);
			bindEvents();
			return this;
		}

		function bindEvents(e){
			el.find('.basic').on('click',function(e){
			  clearPointer();
				makePostion();
			})
			
		}
		function getLoc(){
			var x = event.offsetX;
			var y = event.offsetY;
			return function(){
				return [x,y];
			}
		}

		function getRsv(){
			var ssimagew = $('#smallA img').width();
			var limagew = $('#largeA img').width();
			var b  =  limagew / imageSize
			var s  =  imageSize / ssimagew
			return [b,s];
		}

		function clearPointer(){
			$('.pointer').remove();
		};
		function clibboard(){

		}
		function makePostion(){
			var xy = getLoc();
			getxy = xy();
			var rsv  = getRsv();
			var leftv = getxy[0]-sizeA[0];
			var topv = getxy[1]-sizeA[1];
			var oriLeftv = leftv*rsv[0]
			var oriTopv = topv*rsv[0]
			var miniLeftv = leftv/rsv[1]-sizeA[4]
			var miniTopv = topv/rsv[1]-sizeA[5]
			$('.mapTop').val(getxy[1]).text(getxy[1])
			$('.mapLeft').val(getxy[0]).text(getxy[0])
			el.append('<div class="pointer" style="top:'+topv+'px ;left:'+leftv+'px"></div>');
			$('#largeA').append('<div class="pointer" style="top:'+oriTopv+'px ;left:'+oriLeftv+'px"></div>');
			$('#smallA').append('<div class="pointer" style="top:'+miniTopv+'px ;left:'+miniLeftv+'px"></div>');
			movePosition(oriTopv,oriLeftv);
		};

		function movePosition(insa,insa2){
			$('.test1').val(insa);
			$('.test2').val(insa2);
			var oriTopv  = insa, oriLeftv =  insa2
			var areaSizeW = el.width();
			var areaSizeH = el.height();
			var el2 = $('#largeA');

			if(oriTopv < areaSizeH/2) {
				oriTopv = 0
			}else{
				oriTopv = areaSizeH/2 - oriTopv *1	
				if (oriTopv < areaSizeH*-1){
					oriTopv = areaSizeH*-1
				}
			}

			if(oriLeftv < areaSizeW/2) {
				oriLeftv = 0
			}else{
				oriLeftv = areaSizeW/2 - oriLeftv *1
				if (oriLeftv < areaSizeW*-1){
					oriLeftv = areaSizeW*-1
				}
			}
			TweenMax.to(el2, 0.3, {ease: Power2.easeOut,x:oriLeftv  , y: oriTopv})

		};

		return {
			init: init,
			movePosition : movePosition
		};
	}

	$(window).on('resizeEnd', function(e) {
		(!windowLoad)?devFunc.restMap():windowLoad = false
		//$('.img_floor ').show()
	});
	$(window).on('resizeStart', function(e) {
		//$('.img_floor').hide()
	});

}(jQuery);


