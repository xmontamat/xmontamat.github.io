<!DOCTYPE html>
<html>
<head>
	<title>Learn about Space</title>
	<link rel="stylesheet" type="text/css" href="css/basic.css" />
	<img id="sunimg" class="undisplayed" src="img/planets/sun.png"/>
	<img id="mercuryimg" class="undisplayed" src="img/planets/mercury.png"/>
	<img id="venusimg" class="undisplayed" src="img/planets/venus.png"/>
	<img id="earthimg" class="undisplayed" src="img/planets/earth.png"/>
	<img id="marsimg" class="undisplayed" src="img/planets/mars.png"/>
	<img id="jupiterimg" class="undisplayed" src="img/planets/jupiter.png"/>
	<img id="saturnimg" class="undisplayed" src="img/planets/saturn_no_rings.png"/>
	<img id="saturn_ringsimg" class="undisplayed" src="img/planets/saturn_rings.png"/>
	<img id="uranusimg" class="undisplayed" src="img/planets/uranus.png"/>
	<img id="neptuneimg" class="undisplayed" src="img/planets/neptune.png"/>
	
	<img id="star2img" class="undisplayed" src="img/stars/star2.png"/>
	<img id="star3img" class="undisplayed" src="img/stars/star3.png"/>
	<img id="star4img" class="undisplayed" src="img/stars/star4.png"/>
	<img id="star5img" class="undisplayed" src="img/stars/star5.png"/>
	<img id="star5_5img" class="undisplayed" src="img/stars/star5_5.png"/>
	<img id="star6img" class="undisplayed" src="img/stars/star6.png"/>
	<img id="star8_5img" class="undisplayed" src="img/stars/star8_5.png"/>
	<img id="star13img" class="undisplayed" src="img/stars/star13.png"/>
	
	<img id="fr_flagimg" class="undisplayed" src="img/french_flag.png"/>
	<img id="en_flagimg" class="undisplayed" src="img/british_flag.png"/>

</head>
<SCRIPT LANGUAGE="Javascript" SRC="JQuery.js"> </SCRIPT>
<script>
var initValue =	-1;
</script>
<SCRIPT LANGUAGE="Javascript" SRC="universe_background.js"> </SCRIPT>
<SCRIPT LANGUAGE="Javascript" SRC="planets_and_moons.js"> </SCRIPT>
<SCRIPT LANGUAGE="Javascript" SRC="drawing_functions.js"> </SCRIPT>
<script>

var winWidth = $(window).width() - 8; 
var winHeight = $(window).height() - 8; 
var winConst = 920/winHeight;

var sun_posx=winWidth/2;
var sun_posy=winHeight/2;

var initSpeed = 17;
var textWelcomeAvance = 0;
var textWelcomeFontSize;
var posTextX;
var posTextY;
var welcomeText= [];
welcomeText.push("Welcome, this website is an HTML5 realisation");
welcomeText.push("");
welcomeText.push("Learn about the solar system");
welcomeText.push("by clicking on the planets");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("");
welcomeText.push("Click on the sun to continue");

var realistic = false;
var realismChanged = 1000;
var realistic_posX = winWidth-220/winConst;var realistic_posY;
var	realisticText = [];
realisticText.push("Realistic Mode : ON");
realisticText.push("(Click to toggle)");
realisticText.push("");
realisticText.push("In this representation the following");
realisticText.push("elements have their real proportions :");
realisticText.push("  - Orbital distances");
realisticText.push("  - Orbital speeds");
realisticText.push("  - Planet sizes");
realisticText.push("");
realisticText.push("Due to it's huge real size, the sun is");
realisticText.push("of course not representated accuratly");
realisticText.push("as if it were it would fill the whole");
realisticText.push("red dotted circle.");


var	unRealisticText = [];
unRealisticText.push("Realistic Mode : OFF");
unRealisticText.push("(Click to toggle)");
unRealisticText.push("");
unRealisticText.push("This representation is made");
unRealisticText.push("to easily visualize the solar");
unRealisticText.push("system with it's planets");
unRealisticText.push("and major satellites.");
unRealisticText.push("However these are not");
unRealisticText.push("realistic proportions.");

var language_posX = 15;
var language_posY = winHeight-48/winConst;

var realSunSize = 0;
var realSunAngle = 0;

var displayPlanetName = false;
var planetNameX;
var planetNameY;
var planetDetailsX = 50/winConst;
var planetDetailsY = 50/winConst;
var aimedPlanet;
var previouslyAimedPlanet;
var detailsAdvance =0;
// var typeSound= new Audio("sounds/button-51.wav");


function asteroid() {
	this.orbit;
	this.realOrbit;
	this.originalOrbit;
	this.width = Math.random()*2 + 1;
	this.height = this.width;
	this.angle = (Math.random()*13)/2;
	this.speed;
	
	this.init = initValue;
	this.initOrbit = 0;
}

var clickedsince = 10000;
var clickX = 0;
var clickY = 0;
var cursorX = 0;
var cursorY = 0;

var cursorMoon1 = new moon();
cursorMoon1.father = "cursor";
cursorMoon1.orbit = 15;
cursorMoon1.size = 2;
cursorMoon1.speed = 0.12;


var cursorMoon2 = new moon();
cursorMoon2.father = "cursor";
cursorMoon2.orbit = 8;
cursorMoon2.size = 1.5;
cursorMoon2.speed = -0.11;

	
var backgroundstars = [star2img, star3img, star4img, star5img, star5_5img, star6img, star8_5img, star13img];
var planets = [mercury, venus, earth, mars, jupiter, saturn, saturn_rings, uranus, neptune, sun];
var mainBelt = [];
var kuiperBelt = [];
var mainBeltNumber = 250;

for (var i=0; i<250; i++){
	mainBelt.push(new asteroid());
	mainBelt[i].orbit = ( 225 + Math.random()*30 ) /winConst;
	mainBelt[i].realOrbit = ( 36 + Math.random()*23 ) /winConst;
	mainBelt[i].originalOrbit = mainBelt[i].orbit;
	mainBelt[i].speed = -0.012 + mainBelt[i].orbit/50000 - Math.random()/10000;
};
for (var i=0; i<400; i++){
	kuiperBelt.push(new asteroid());
	kuiperBelt[i].orbit = ( 550 + Math.random()*250 ) /winConst;
	kuiperBelt[i].realOrbit = kuiperBelt[i].orbit;
	kuiperBelt[i].originalOrbit = kuiperBelt[i].orbit;
	kuiperBelt[i].speed = -0.002 + kuiperBelt[i].orbit/500000 ;
};

$( document ).ready(function() {
    $(document).mousemove(function(e){
      cursorX = e.pageX 
	  cursorY = e.pageY;
   }); 
	setInterval(drawSystem,30);
 
});

function init(){
	universeID.width= winWidth;
	universeID.height= winHeight;
	universe= universeID.getContext('2d');
	drawUniverse();
	universe.closePath();
	
	overlayID.width= winWidth;
	overlayID.height= winHeight;
	overlay= overlayID.getContext('2d');
	drawOverlay();
	overlay.closePath();
	
	systemID.width= winWidth;
	systemID.height= winHeight;
	planets.forEach(function(planet) {
		formatPlanet(planet);
	});	
	system= systemID.getContext('2d');
}

function drawOverlay(){
	overlay.clearRect(0,0, overlayID.width, overlayID.height);
	overlay.fillStyle="#DDDDDD";
	overlay.font="bold "+14/winConst+"px Times New Roman";
	overlay.shadowOffsetX=2;
	overlay.shadowOffsetY=2;
	overlay.shadowBlur=8;
	overlay.shadowColor="#111111";
		
	if(initValue != -1){
		
		
		realistic_posY = 75/winConst;

		if (realistic){
			realisticText.forEach(function (text){
				overlay.fillText(text, realistic_posX, realistic_posY, 200);
				realistic_posY+=20;
			});
		}
		else{
			unRealisticText.forEach(function (text){
				overlay.fillText(text, realistic_posX, realistic_posY, 200);
				realistic_posY+=20;
			});
		}
	
	}
	if (current_lang =='us'){
		overlay.fillText('Current language  :', language_posX, language_posY);
		overlay.fillText('(Click to swith to French)', language_posX, language_posY+20);
		overlay.drawImage(en_flagimg, 120/winConst +20, language_posY-16/winConst, 24/winConst, 24/winConst);
	}
	else{
		overlay.fillText('Langue actuelle  :', language_posX, language_posY);
		overlay.fillText('(Clic pour passer en anglais)', language_posX, language_posY+20);
		overlay.drawImage(fr_flagimg, 120/winConst +20, language_posY-16/winConst, 24/winConst, 24/winConst);
	}
	
}

function drawSystem(){	
	system.clearRect(0,0, systemID.width, systemID.height);
	
	if (realismChanged<100){
		if(realistic){
			if (mainBeltNumber>80){
				mainBeltNumber-=1.7;
			}
		}
		else{
			if (mainBeltNumber<250){
				mainBeltNumber+=1.7;
			}
		}
	}
	
	for(i=0; i<mainBeltNumber ;i++ ) {
		if (realismChanged<100)
			updateRealismA(mainBelt[i]);
		drawAsteroid(mainBelt[i]);
	}
	kuiperBelt.forEach(function(asteroid) {
		drawAsteroid(asteroid);
	});
	drawRealSunSize();
	planets.forEach(function(planet) {
		drawPlanet(planet);
	});	
	
	drawMoon(cursorMoon1);
	drawMoon(cursorMoon2);
	
	clickedsince++;
	realismChanged++;
	
	drawPlanetText();
	drawWelcomeText();
	
}



function switchInit(){
	if (initValue == 0 || initValue == 1)
		initValue = -1;
	else if (initValue == -1)
		initValue = 1;
		
	planets.forEach(function(planet) {
		planet.init=initValue;
	});	
	mainBelt.forEach(function(asteroid) {
		asteroid.init=initValue;
	});
	kuiperBelt.forEach(function(asteroid) {
		asteroid.init=initValue;
	});	
	planets.forEach(function(planet) {
		planet.init=initValue;
	});	
}

function clicked(event) {
    event = event || window.event;

	clickX = event.clientX;
	clickY = event.clientY;
	clickedsince = 0;
	if (cursorOnPlanet(sun, sun_posx, sun_posy)){
		switchInit();
		drawOverlay();
	}
	else if( cursorX > realistic_posX && cursorX < realistic_posX+180/winConst && cursorY > 50/winConst && cursorY < 120/winConst ){
		realistic = !realistic;
		realismChanged = 0;
		drawOverlay();
	}
	else if( cursorX > language_posX && cursorX < language_posX+165/winConst && cursorY > language_posY-16 && cursorY < language_posY+40 ){
		switchLang();
	}
	else if( cursorX > winWidth-140/winConst && cursorX < winWidth && cursorY > winHeight-10/winConst && cursorY < winHeight ){
		//window.open("../CV_Xavier_Montamat.pdf");
	}
}


</script>
<SCRIPT LANGUAGE="Javascript" SRC="lang.js"> </SCRIPT>


<body onLoad="init();" style="background-color:#000009;">
  <!-- <canvas id="sunID" width="110" height="110"></canvas> -->
  <canvas id="universeID" width="1500" height="920"></canvas>
  <canvas id="overlayID" width="1500" height="920"></canvas>
  <canvas id="systemID" width="1500" height="920" onclick="clicked()"></canvas>
</body>
</html>