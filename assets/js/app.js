/* global funcion */
$(".on-focus").focusin(function(event) {
  $(this).parent().addClass('focus');
});
$(".on-focus").focusout(function(event) {
  $(this).parent().removeClass('focus');
});


/* this handle touce swip */
let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.querySelector("body");

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture(e) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x - 70 < 0) {
              	$("#header").removeClass("expand");
            } else {
               	$("#header").addClass("expand");
            }
        }  
    }
}



function loadScroll(){
  $(".scrooling").niceScroll({
    scrollspeed: 10,
    autohidemode: true,
    overflowy: true
  });
}

/* end define swipe*/


/* handle dropdown */

 $(".dropdown-hover ").hover(function(){
   		  $(this).closest('.dropdown-hover').addClass('active');
        $(this).closest('.dropdown-hover').find('.dropdown-menu-parent').slideDown(400);
   	    $(this).attr("dbl","true");		
        setTimeout(function(args) {
         loadScroll()
       }, 1000)
    }, function(){
    	 $(".dropdown-hover").attr("dbl","false");
      $(this).closest('.dropdown-hover').find('.dropdown-menu-parent').slideUp(400);  
    	 $(this).closest('.dropdown-hover').removeClass('active');
       setTimeout(function(args) {
         loadScroll()
       }, 1000)
  });	

function scrollHeader() {
	if ($(window).scrollTop() > 50) {
 		$("header").addClass('scroll');
 	} else {
 		$("header").removeClass('scroll');
 	}
}

 $(window).scroll(function(event) {
 	scrollHeader()
  loadScroll()
 });

 $(".button-show-header").click(function(event) {
 	$("#header").toggleClass("expand");
 });




/* ons startup */
jQuery(document).ready(function($) {
  scrollHeader()
  loadScroll()
});
