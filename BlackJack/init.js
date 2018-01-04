// GRAPHICS
var FF = !(window.mozInnerScreenX == null);
var clicX;
var clicY;

// load_cards_imgs();

var global_autoplay = 0;
var global_display = "";
var global_verbose = true;
var global_countcards = "hilo"; //"nohilo" 
var global_autoBetAmount = "none"; //"hilo"
var mygame= new game();
mygame.add_bot();
mygame.add_bot();
if (!global_autoplay)
	mygame.add_player();
mygame.add_bot();
mygame.add_bot();


for (var nbgames=0; nbgames<1; nbgames++){
	mygame.autoplay_nbgames=1;
	mygame.start();
}


if (global_autoplay)
	mygame.display_stats();

function msg(my_string){
	global_display+= "<br>"+my_string+"<br>";
}
if (global_autoplay)
	overlay.innerHTML = global_display;
