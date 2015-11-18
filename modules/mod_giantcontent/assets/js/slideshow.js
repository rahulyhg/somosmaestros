!function(t,i,s){"use strict";function e(i,s){this.$slider=t(i).addClass("gts-slideshow"),this.settings=t.extend({},a,s),this.$slides=this.$slider.find("> li"),this.totalSlides=this.$slides.length,this.cssTransitions=r.cssTransitions(),this.currentPlace=this.settings.startSlide,this.$currentSlide=this.$slides.eq(this.currentPlace),this.inProgress=!1,this.$sliderOuter=this.$slider.wrap('<div class="gts-slideshow-outer" />').parent(),this.$sliderInner=this.$slider.wrap('<div class="gts-slideshow-inner" />').parent(),this.settings.slider=this,this.init()}function n(i,s,e){if(this.GTS=i,this.GTS.inProgress=!0,this.forward=e,this.transition=s,"custom"===this.transition&&(this.customAnims=this.GTS.settings.customAnimation,this.isCustomTransition=!0),"custom"===this.transition){var n=this;t.each(this.customAnims,function(i,s){-1===t.inArray(s,n.anims)&&n.customAnims.splice(i,1)})}this.init()}var a={animation:"fade",customAnimation:[],thumbnails:0,pagination:0,navigation:1,thumbMargin:1,autoPlay:0,interval:5e3,duration:1e3,startSlide:0,keyNav:0,onInit:function(){},onChange:function(){},afterChange:function(){}};e.prototype={cycling:null,$slideImages:null,init:function(){this.settings.onInit(),"custom"===this.settings.animation&&(this.nextAnimIndex=-1),this.settings.navigation&&this.setArrows(),this.settings.keyNav&&this.setKeys();for(var i=0;i<this.totalSlides;i++)this.$slides.eq(i).addClass("gts-slideshow-"+i);this.settings.autoPlay&&(this.setAutoPlay(),this.$slider.on({mouseenter:t.proxy(function(){null!==this.cycling&&clearTimeout(this.cycling)},this),mouseleave:t.proxy(this.setAutoPlay,this)})),this.$slideImages=this.$slides.find("img:eq(0)").addClass("gts-slideshow-image"),this.setup()},setup:function(){this.settings.pagination&&this.setPagers(),this.settings.thumbnails&&this.setThumbs(),this.$currentSlide.css({opacity:1,"z-index":2}).addClass("active")},setArrows:function(){var i=this;this.$sliderInner.append('<div class="gts-slideshow-navigation"><a href="#" class="gts-slideshow-prev"></a><a href="#" class="gts-slideshow-next"></a></div>'),t(".gts-slideshow-next",this.$sliderOuter).on("click",function(t){t.preventDefault(),i.next()}),t(".gts-slideshow-prev",this.$sliderOuter).on("click",function(t){t.preventDefault(),i.prev()})},next:function(){"custom"===this.settings.animation&&this.nextAnimIndex++,this.currentPlace===this.totalSlides-1?this.transition(0,!0):this.transition(this.currentPlace+1,!0)},prev:function(){"custom"===this.settings.animation&&this.nextAnimIndex--,0==this.currentPlace?this.transition(this.totalSlides-1,!1):this.transition(this.currentPlace-1,!1)},setKeys:function(){var i=this;t(s).on("keydown",function(t){39===t.keyCode?i.next():37===t.keyCode&&i.prev()})},setAutoPlay:function(){var t=this;this.cycling=setTimeout(function(){t.next()},this.settings.interval)},setThumbs:function(){var i=this,s=(100-(this.totalSlides-1)*this.settings.thumbMargin)/this.totalSlides+"%";this.$thumbWrap=t('<div class="gts-slideshow-thumbnails" />').appendTo(this.$sliderOuter);for(var e=0;e<this.totalSlides;e++){var n=t("<a />").css({width:s,marginLeft:this.settings.thumbMargin+"%"}).attr("href","#").data("gts-num",e);this.$slideImages.eq(e).clone().removeAttr("style").appendTo(this.$thumbWrap).wrap(n)}this.$thumbWrapLinks=this.$thumbWrap.find("a"),this.$thumbWrap.children().last().css("margin-right",-10),this.$thumbWrapLinks.eq(this.settings.startSlide).addClass("active"),this.$thumbWrap.on("click","a",function(s){s.preventDefault(),i.transition(parseInt(t(this).data("gts-num")))})},setPagers:function(){var i=this;this.$pagerWrap=t('<div class="gts-slideshow-pagination" />').appendTo(this.$sliderInner);for(var s=0;s<this.totalSlides;s++){var e=t("<a />").attr("href","#").data("gts-num",s);this.$slideImages.eq(s).clone().appendTo(this.$pagerWrap).wrap(e)}this.$pagerWrapLinks=this.$pagerWrap.find("a").empty(),this.$pagerWrapLinks.eq(this.settings.startSlide).addClass("active"),this.$pagerWrap.on("click","a",function(s){s.preventDefault(),i.transition(parseInt(t(this).data("gts-num")))})},transition:function(t,i){this.inProgress||t!==this.currentPlace&&("undefined"==typeof i&&(i=t>this.currentPlace?!0:!1),this.settings.thumbnails&&(this.$thumbWrapLinks.eq(this.currentPlace).removeClass("active"),this.$thumbWrapLinks.eq(t).addClass("active")),this.settings.pagination&&(this.$pagerWrapLinks.eq(this.currentPlace).removeClass("active"),this.$pagerWrapLinks.eq(t).addClass("active")),this.$nextSlide=this.$slides.eq(t),this.currentPlace=t,this.settings.onChange(),new n(this,this.settings.animation,i))}},n.prototype={fallback:"fade",anims:["fade","block","zoomIn","zoomOut","blindH","blindV","sliceH","sliceV","slideH","slideV"],customAnims:[],init:function(){this[this.transition]()},before:function(i){if(this.GTS.$currentSlide.css("z-index",2).removeClass("active"),this.GTS.$nextSlide.css({opacity:1,"z-index":1}).addClass("active"),"function"==typeof this.setup){var s=this.setup();setTimeout(function(){i(s)},20)}else this.execute();this.GTS.cssTransitions&&t(this.listenTo).one("webkitTransitionEnd transitionend otransitionend oTransitionEnd mstransitionend",t.proxy(this.after,this))},after:function(){this.GTS.$slider.removeAttr("style"),this.GTS.$currentSlide.removeAttr("style"),this.GTS.$nextSlide.removeAttr("style"),this.GTS.$currentSlide.css({zIndex:1,opacity:0}),this.GTS.$nextSlide.css({zIndex:2,opacity:1}),"function"==typeof this.reset&&this.reset(),this.GTS.settings.autoPlay&&(clearTimeout(this.GTS.cycling),this.GTS.setAutoPlay()),this.GTS.$currentSlide=this.GTS.$nextSlide,this.GTS.inProgress=!1,this.GTS.settings.afterChange()},fade:function(){var i=this;this.GTS.cssTransitions?(this.setup=function(){i.listenTo=i.GTS.$currentSlide,i.GTS.$currentSlide.css("transition","opacity "+i.GTS.settings.duration+"ms linear")},this.execute=function(){i.GTS.$currentSlide.css("opacity",0)}):this.execute=function(){i.GTS.$currentSlide.animate({opacity:0},i.GTS.settings.duration,function(){i.after()})},this.before(t.proxy(this.execute,this))},grid:function(i,s,e,n,a,r,o){if(!this.GTS.cssTransitions)return this[this.fallback]();var h=this;this.setup=function(){function e(i,s,e,n,a,o,d,l,c){var u=(l+c)*r;return t('<div class="gts-slideshow-gridlet" />').css({width:i,height:s,top:e,left:n,backgroundImage:"url("+a+")",backgroundPosition:"-"+n+"px -"+e+"px",backgroundSize:o+"px "+d+"px",transition:"all "+h.GTS.settings.duration+"ms ease-in-out "+u+"ms",transform:"none"})}var r=h.GTS.settings.duration/(i+s);h.$img=h.GTS.$currentSlide.find("img.gts-slideshow-image"),h.$grid=t("<div />").addClass("gts-slideshow-grid"),h.GTS.$currentSlide.prepend(h.$grid);var o=h.$img.width(),d=h.$img.height(),l=h.$img.attr("src"),c=Math.floor(o/i),u=Math.floor(d/s),g=o-i*c,m=Math.ceil(g/i),f=d-s*u,p=Math.ceil(f/s),$=0;n="auto"===n?o:n,n="min-auto"===n?-o:n,a="auto"===a?d:a,a="min-auto"===a?-d:a;for(var v=0;i>v;v++){var S=0,T=c;if(g>0){var x=g>=m?m:g;T+=x,g-=x}for(var y=0;s>y;y++){var w=u,b=f;b>0&&(x=b>=p?p:f,w+=x,b-=x),h.$grid.append(e(T,w,S,$,l,o,d,v,y)),S+=w}$+=T}h.listenTo=h.$grid.children().last(),h.$grid.show(),h.$img.css("opacity",0),h.$grid.children().first().addClass("gts-slideshow-top-left"),h.$grid.children().last().addClass("gts-slideshow-bottom-right"),h.$grid.children().eq(s-1).addClass("gts-slideshow-bottom-left"),h.$grid.children().eq(-s).addClass("gts-slideshow-top-right")},this.execute=function(){h.$grid.children().css({opacity:o,transform:"rotate("+e+"deg) translateX("+n+"px) translateY("+a+"px) scale("+r+")"})},this.before(t.proxy(this.execute,this)),this.reset=function(){h.$img.css("opacity",1),h.$grid.remove()}},block:function(){this.grid(8,6,0,0,0,0,1)},zoomIn:function(){this.grid(1,1,0,0,0,2,0)},zoomOut:function(){this.grid(1,1,0,0,0,0,0)},blindH:function(){this.grid(8,1,0,0,0,0,1)},blindV:function(){this.grid(1,6,0,0,0,0,1)},sliceH:function(){var t=this.forward?"min-auto":"auto";this.grid(1,6,0,t,0,1,1)},sliceV:function(){var t=this.forward?"min-auto":"auto";this.grid(8,1,0,0,t,1,1)},slideH:function(){var t=this.forward?"min-auto":"auto";this.grid(1,1,0,t,0,1,1)},slideV:function(){var t=this.forward?"min-auto":"auto";this.grid(1,1,0,0,t,1,1)},random:function(){this[this.anims[Math.floor(Math.random()*this.anims.length)]]()},custom:function(){this.GTS.nextAnimIndex<0&&(this.GTS.nextAnimIndex=this.customAnims.length-1),this.GTS.nextAnimIndex===this.customAnims.length&&(this.GTS.nextAnimIndex=0),this[this.customAnims[this.GTS.nextAnimIndex]]()}};var r={browserVendors:["","-webkit-","-moz-","-ms-","-o-","-khtml-"],domPrefixes:["","Webkit","Moz","ms","O","Khtml"],testDom:function(t){for(var i=this.domPrefixes.length;i--;)if("undefined"!=typeof s.body.style[this.domPrefixes[i]+t])return!0;return!1},cssTransitions:function(){return"undefined"!=typeof i.Modernizr&&"undefined"!==Modernizr.csstransitions?Modernizr.csstransitions:this.testDom("Transition")}};t.fn.slideshow=function(i){return this.each(function(){t.data(this,"slideshow")||t.data(this,"slideshow",new e(this,i))})}}(window.jQuery,window,window.document);