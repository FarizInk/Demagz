$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $(".button-collapse").sideNav();
  });
$(function(){
// UKURAN MAGZ

var width 			= 700;
var height 			= 500;
var magzScale		= 1;
var demagzX = 0;
var demagzY = 0;
var lastest = {
		x : 0,
		y : 0
	};
var start       = false;
var enMode      = false;
var dragMode	= false;
var buttonDrag	= false;
var searchMode  = true;

var demagz 			= $('#demagz-flipbook');
var demagzContainer	= $('#demagz-container');
var resultsSearch   = $('#result');
var inputSearch     = $('#quicksearch');

	var music = new Audio('assets/music/music.m4a');
	var flipsound = new Audio('assets/music/page-flip.mp3');
	music.loop = true;
	music.play();
// DISPLAY MAGZ AND FLIPBOOK
function displayMagz(destroy){
	// window.location.hash = 'page1'
	if (destroy)$(demagz).turn('destroy');

	$(demagz).empty();
	$(articles).each(function(i, article){
		if(enMode){
			article = article.en;
		}

		$("<div></div>").css({
			"background-image" 	: "url(\'"+ article.page +"\')",
			"background-size"	: "100% 100%"
		}).html(article.html).appendTo(demagz);
	});

	$(demagz).turn({
	display 	: 'double',
	width 		: width,
	height 		: height,
	autoCenter	: true,
	when	:{
		turning : function(a, b, c){
			window.location.hash = "page" + b;
			flipsound.play();
		}
	}

	});

    $(demagzContainer).css({
    width 	: width,
		height 	: height
	});
if (start == false) {
	setTimeout(function() {
		$("#loader").fadeOut();
	}, 3000);
	start = true;
}else{
	setTimeout(function() {
		$("#loader").fadeOut();
	}, 1000);
}
}
// END FLIP BOOK

function changeLanguage(){
	if (enMode == false) {
		enMode = true;
		displayMagz(true);
	}else {
		enMode = false;
		displayMagz(true);
	}
$("#loader").fadeIn(function() {
	displayMagz(true);
});
}

// music
function music() {
	if (music.play) {
		music.paused();
	}else {
		music.play();
	}
}

function zoomIn(){
  magzScale += 0.1;
  if (magzScale >= 1.6) {
	magzScale = 1.6;
}

	$(demagzContainer).css({
		transform: 'scale('+ magzScale +') translateX(' + demagzX + 'px) translateY(' + demagzY + 'px)',
		transition: 'transform 0.1s'
	});
}

function zoomOut(){
  magzScale -= 0.1;
  if (magzScale <= 0.4) {
	magzScale = 0.4;
}

	$(demagzContainer).css({
		transform: 'scale('+ magzScale +') translateX(' + demagzX + 'px) translateY(' + demagzY + 'px)',
		transition: 'transform 0.1s'
	});
}

function drag(x, y) {
		if (x > -width && x < width && y > -height && y < height) {
			demagzX = x;
			demagzY = y;

			$(demagzContainer).css({
				"transform" : "scale(" + magzScale + ") translateX(" + demagzX + "px) translateY(" + demagzY + "px)",
				"transition" : "none"
			});
		}
}

function refresh(x , y){
	magzScale = 1;
	demagzX = x;
	demagzY = y;
	$(demagzContainer).css({
		transform: 'scale('+ magzScale +') translateX(' + demagzX + 'px) translateY(' + demagzY + 'px)',
		transition: 'transform 0.2s'
	});
}
// NGEDRAG
	var nowX = 0;
	var nowY = 0;
	$(demagzContainer).bind('mousedown', function(e) {
		if (buttonDrag == true) {
			dragMode 	= true;
			nowX 		= e.pageX;
			nowY 		= e.pageY;
		}
	});

	$(demagzContainer).bind('mouseup', function(e) {
		dragMode 	= false;

		lastest.x 		= demagzX;
		lastest.y 		= demagzY;
	});

	$(demagzContainer).bind('mousemove', function(e) {
		if (dragMode) {
			drag(lastest.x + (e.pageX - nowX), lastest.y + (e.pageY - nowY));
		}
	});
// END NGEDRAG

function magzSearch(){
      if (searchMode == false) {
        searchMode = true;
        $("#search").modal('open');
        
        setTimeout(function(){

        $(inputSearch).focus();
        }, 800)
        
      }else{
      	searchMode = false;
      }

}

// SEARCH


function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      $('#full-screen').attr('checked', 'checked');
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      $('#full-screen').attr('checked', 'checked');
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      $('#full-screen').attr('checked', 'checked');
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
   	  $('#full-screen').removeAttr('checked');
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      $('#full-screen').removeAttr('checked');
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      $('#full-screen').removeAttr('checked');
      document.webkitCancelFullScreen();
    }
  }
}

// END SIZE & LOCATION

	

// ABOUT PAGE
function go(x) {
	$(demagz).turn('page', x);
}

function frontCover(){
	$(demagz).turn('page', 1);
}

function backCover(n){
  var x = 0;
  $(articles).each(function(i, m) {
    x = x+1;
  });
  n = x
	$(demagz).turn('page', n);magzSearch
}

function next(){
	$(demagz).turn('next');
}

function prev(){
	$(demagz).turn('previous');
}
// END ABOUT PAGE

// START HASH
function Hash(){
	var	hash = window.location.hash;
	var page = hash.substr(5, 5);

	if (page != NaN){
		var length = $(demagz).turn('pages');

		if (page >= 1 && page <= length) {
			go(page);
		}else{
			if (page < 1) {
				window.location.hash = "page1";
			} else if (page > length) {
				window.location.hash = "page" + length	;
			}
		}

	}

}

// HASH CHANGE
	$(window).bind('hashchange', function(e) {
		Hash();
	});
// END HASH

// // CHECK KEYCODE
 // $(function () {
 //      $(document).keydown(function (e) {
 //         console.log(e.keyCode);
 //      });
 //   });


// BIND KEY CODE
	$(window).bind('keydown',function(e){

		if (searchMode == false) {
		if (e.keyCode == 68 || e.keyCode == 39) {
			next();
		}
		if (e.keyCode == 65 || e.keyCode == 37) {
			prev();
		}
		if (e.keyCode == 38 || e.keyCode == 87) {
			zoomIn();
		}
		if (e.keyCode == 40 || e.keyCode == 83) {
			zoomOut();
		}
		if (e.keyCode == 27) {
			$('#full-screen').removeAttr('checked');
			document.cancelFullScreen();
		}
	}
	});
// END BIND KEY CODE

// BUTTON
// TINGGAL MAKAI ID NYA
	$("[id=next]").click(function(e) {
		e.preventDefault();
		next();
	});
	$("[id=prev]").click(function(e){
		e.preventDefault();
		prev();
	});
	$("[id=go-cover]").click(function(e){
		e.preventDefault();
		frontCover();
	});
	$("[id=go-backcover]").click(function(e){
		e.preventDefault();
		backCover(0);
	});
	$("[id=zoom-in]").click(function(e){
		e.preventDefault();
		zoomIn();
	});
	$("[id=zoom-out]").click(function(e){
		e.preventDefault();
		zoomOut();
	});
	$("[id=drag]").click(function(e){
		if (buttonDrag == false) {
			buttonDrag = true;
			$("[id=drag]").toggleClass("opacity");
			Materialize.toast('Drag ON', 4000);
		}else{
			buttonDrag = false;
			$("[id=drag]").toggleClass("opacity");
			Materialize.toast('Drag OFF', 4000);
		}
	});
	$("[id=refresh]").click(function(e){
    e.preventDefault();
		refresh(0, 0);
		Materialize.toast('Refreshed', 4000);
	});
	$("#full-screen").click(function(){
		toggleFullScreen();
		$("#demagz-container").toggleClass("demagz-center");
	});
	$(document).ready(function(){
		$("#night-mode").click(function(){
			$("[id=nm]").toggleClass("disabled");
			$("[id=lm]").toggleClass("disabled");
		});
	});

	$("[id=search-open]").click(function(e){
	e.preventDefault();
    magzSearch();

	});
	$("#search").modal({

	complete : function(){
		searchMode = false;
		$(resultsSearch).html("");
		$(inputSearch).val("");
	}
	});




 function thumb() {
    $('#thumbnail').modal('open');
	$('#carousel').flickity('resize');
  }

	$("[id=thumbnail-open]").click(function(e){
		e.preventDefault();
    	thumb();
	});

 $("#night").click(function(e){
  e.preventDefault();
  $("#loader").fadeIn();
  setTimeout(function() {
    nightMode();
  },500);
});
 $("#en-mode").click(function (e) {
 	e.preventDefault();	
	$("[id=en]").toggleClass("disabled");
	$("[id=id]").toggleClass("disabled");
	Materialize.toast('English Version', 4000);
    changeLanguage();
 });
 $("#id-mode").click(function (e) {
 	e.preventDefault();	
	$("[id=en]").toggleClass("disabled");
	$("[id=id]").toggleClass("disabled");
	Materialize.toast('Indonesia Version', 4000);
    changeLanguage();
 });
$("#music").click(function() {
    if (music.paused == false) {
        music.pause();
        Materialize.toast('Music Pause', 4000);
    } else {
        music.play();
        Materialize.toast('Music Play', 4000);
    }
})
// search
	function escapeRegExp(str) {
	    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "$1");
	}

$("#quicksearch").keyup(function(e){
	var query 	= $(this).val().toLowerCase();

	if(query.length>0){
		$("#result").html("");
		$(articles).each(function(key, item) {
			if (enMode) {
				item = item.en;
			}
			var keyword	 = item.keyword.toLowerCase();
			var title    = item.title.toLowerCase();
			var notMatch = item.keyword.indexOf(query);
			var notMatch2= item.title.indexOf(query);
			var replaced = "<b>"+query+"</b>";
			var result	 = keyword.replace( query, replaced );
			var result2	 = title.replace( query, replaced );
			var result2  = result2.toUpperCase();
			var key 	 = key+1;
			var result   = escapeRegExp(result);
			var result2	 = escapeRegExp(result2);
			if (result.length > 50) {
				var result	 = result.substr(0,50);
				var result 	 = result +"...";
			}
			if (result2.length > 50) {
				var	result2	= result2.substr(0,50);
				var result2	= result2+"...";
			}
			if(keyword.indexOf(query) !== -1 || title.indexOf(query) !== -1){
				var html =	'<div class="col s12">'+
			  				 '<div class="card horizontal">'+
			    				'<div class="card-image">'+
			      					'<a href="index.html#page'+key+'"><img id="img" class="img-search" src="'+item.thumb+'"></a>'+
			    				'</div>'+
			    					'<div class="card-stacked">'+
			      					'<div id="resText" class="card-content">'+
			      					'<center>'+result2+'</center><p>'+result+'</p>'+
			      					'</div>'+
			      					'<div class="card-action">'+
			        				'<a href="index.html#page'+key+'">'+key+'</a>'+
			      				'</div>'+
			    			'</div>'+
			    		'</div>';
			    $("search-loader").fadeIn();
			  	$("#result").append(html);	

			  		setTimeout(function() {
						$("#search-loader").fadeOut();
					}, 500);
			}
		})

	}else{
		$("#result").html("");
	}
	
})


// END BUTTON
$(document).ready(function(){
	$("#loader").fadeIn();

});
magzSearch();
displayMagz();
Hash();
});
