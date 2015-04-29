console.log('This would be the main JS file.');

var arrColor = ['black', 'navy','red', 'blue', 'green', 'orange', 'yellow', 'lime',  'black', 'navy', 'red', 'blue', 'green', 'orange', 'yellow', 'lime'];

var timeOpen = 700;
var Timeout = 2000;
var timeCoin = 0;
var timeClick = 0;
var clickColor2 = 0;
var clickColor1 = 0;
var mousemove = 0;

var ArrayShuffle = function(a) {
  var d, c, b = a.length;

   while (b) {
    c = Math.floor(Math.random() * b);
    d = a[--b];
    a[b] = a[c];
    a[c] = d;
   }
   return a;
}

var startGame = function() {
    
    ArrayShuffle(arrColor);
     
    for(i=0; i<16; i++) {
          $('#g').append('<div class="card ' + arrColor[i] + '">' + '</div>');
     }
     
    setTimeout(function() {
          $('.card').addClass('cardOut');
          $('.layer').css('z-index', -1);
    }, Timeout);
     
}

var gamePlay = function() {
     $('.card').click(function(){
          
          timeClick++;
          
          $(this).removeClass('cardOut').delay(timeOpen).queue(function () {$(this).addClass('cardOut');$(this).dequeue();
     });
     
	 $(this).mouseleave(function(){
		 mousemove++; 
	});
          
		  clickColor2 = $(this).attr('class');
          
          if (clickColor1 === clickColor2&&mousemove>0) {
               $('.'+clickColor2.substr(5)).animate({opacity:0}, 200);
			   mousemove = 0;
               clickColor1 = 0;
               timeCoin = timeCoin+1;
               
          } else {
               clickColor1 = clickColor2;
			   mousemove = 0;
          }
          
          if (timeCoin === 8) {
               
               setTimeout(function(){$('.card').removeClass('cardOut');}, 1000);
               setTimeout(function(){$('.card').animate({opacity:1}, 300).delay(500).animate({opacity:0});}, 1000);
			   setTimeout(function(){$('#g').empty().append('<br><br><br><h1>You won!</h1><br><h2>Clicks = '+timeClick+'</h2>');}, 2000);
               setTimeout(function(){$('#NewGame').css('z-index', 2);}, 4000);
              
          }
          
     });
     
}


$(document).ready(function() {
	 $('#NG').click(function(){
	      Timeout = 1000;
          timeCoin = 0;
          timeClick = 0;
          clickColor2 = 0;
          clickColor1 = 0;
          $('#g').empty();
          $('#NewGame').css('z-index', -2);
		  startGame();
          gamePlay();
     });
     
});

