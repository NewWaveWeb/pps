$(document).ready(function(){$('[data-toggle="side-link"]').click(function(){var a=$(this);$(".sidebar").toggleClass("sidebar-close"),$(a.attr("data-target")).toggleClass("main-open")}),$('[data-toggle="sup-text"]').click(function(a){a.preventDefault();var b=$(this);$(b.attr("data-target")).toggleClass("tooltip-open")}),backToTop=function(){$(window).scrollTop()>100?$("#back-to-top").addClass("show"):$("#back-to-top").removeClass("show")},document.addEventListener("scroll",function(a){backToTop()},!0),$("#back-to-top").on("click",function(a){a.preventDefault(),$("html,body").animate({scrollTop:0},700)})}),$(function(){var a,b,c,d;$(".sidebar-link").click(function(e){0===$(this).find(".ink").length&&$(this).prepend("<span class='ink'></span>"),a=$(this).find(".ink"),a.removeClass("animate"),a.height()||a.width()||(b=Math.max($(this).outerWidth(),$(this).outerHeight()),a.css({height:b,width:b})),c=e.pageX-$(this).offset().left-a.width()/2,d=e.pageY-$(this).offset().top-a.height()/2,a.css({top:d+"px",left:c+"px"}).addClass("animate")})});
