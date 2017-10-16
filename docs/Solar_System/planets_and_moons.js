function moon() {
	this.father
	this.orbit;
	this.size;
	this.angle = (Math.random()*13)/2;
	this.speed;
}

earthMoon	 		= new moon();
earthMoon.father 	= "planet";
earthMoon.orbit 	= 40;
earthMoon.size 		= 3;
earthMoon.speed 	= -0.05;

phobos	 		= new moon();
phobos.father 	= "planet";
phobos.orbit 	= 18;
phobos.size 	= 0.5;
phobos.speed 	= -0.15;

deimos	 		= new moon();
deimos.father 	= "planet";
deimos.orbit 	= 24;
deimos.size 	= 0.5;
deimos.speed 	= -0.1;

io	 		= new moon();
io.father 	= "planet";
io.orbit 	= 38;
io.size 	= 2.5;
io.speed 	= -0.05;

europa	 		= new moon();
europa.father 	= "planet";
europa.orbit 	= 44;
europa.size 	= 2;
europa.speed 	= -0.04;

ganymede	 	= new moon();
ganymede.father = "planet";
ganymede.orbit 	= 50;
ganymede.size 	= 3;
ganymede.speed 	= -0.034;

callisto	 	= new moon();
callisto.father = "planet";
callisto.orbit 	= 56;
callisto.size 	= 3;
callisto.speed 	= -0.025;

titan	 		= new moon();
titan.father 	= "planet";
titan.orbit 	= 50;
titan.size 		= 3;
titan.speed 	= -0.03;

triton	 		= new moon();
triton.father 	= "planet";
triton.orbit 	= 34;
triton.size 	= 2;
triton.speed 	= 0.07;

function planet() {
	this.orbit;
	this.width;
	this.height;
	this.rot = (Math.random()*13)/2;
	this.rotspeed;
	this.angle = (Math.random()*13)/2;
	this.speed;
	
	this.init = initValue; //1 is expansion
	this.initsize = 0;
	this.initOrbit = 0;
	
	this.img;
	this.name = '';
	this.fr_name = '';
	this.details = [];
	this.us_details = [];
	this.fr_details = [];
	
	this.moons = [];
	
	this.realDistance	;
	this.realSpeed		;
	this.realPeriod	    ;
	this.realRotation	;
	this.realSize		;
	this.realMass		;
	this.realDensity	;
	this.realGravity	;
	this.realMinCelsius ;
	this.realMaxCelsius ;
	this.realMoonsNum	;
	this.realText = ""	;
	this.fr_realText = ""	;
	this.extendedText = "";
	
	this.realDiameter;
	this.originalWidth;
	this.originalHeight;
	this.originalSpeed;
	this.originalOrbit;	
}
sun 			= 	new planet();
sun.orbit		= 	0;
sun.width 		= 	90;
sun.height 		= 	90;
sun.rotspeed	= 	-0.002;
sun.speed 		= 	0;
sun.img 		= 	sunimg;
sun.name 		= 	"Sun";
sun.fr_name 	= 	"Soleil";

sun.realRotation	=	27.3*24;	//earth hours
sun.realSize		=	12000; //earths surfaces   
sun.realMass		=	333000; // earths
sun.realGravity		=	28;	//g
sun.realMinCelsius	=	5500;	//temp in celcius
sun.realMaxCelsius	=	"15.7 Million";	//temp in celcius

sun.realText = "Eight planets and many other objects have been trapped in the gravitational field of our Sun. Its volume is so huge that 1.3 Million Earths could fit inside it, "
+"and its mass alone represents 99.86% of the total mass of the system.";
//As this represention is not made to be accurate, you can 
sun.fr_realText = "Huit planètes et de nombreux autres objets ont été capturés dans le champ gravitationnel de notre soleil. Son immensité est difficilement concevable : 1.3 Millions de "
+"planètes Terre pourraient tenir à l'interieur, et sa masse seule représente 99.86% de la masse totale du système.";

mercury 		= 	new planet();
mercury.orbit	= 	70;
mercury.width 	= 	16;
mercury.height 	= 	16;
mercury.rotspeed= 	-0.005;
mercury.speed 	= 	-0.035;
mercury.img 	= 	mercuryimg;
mercury.name 	= 	"Mercury";
mercury.fr_name = 	"Mercure";

mercury.realDistance	=	58; //km 
mercury.realSpeed		=	47.9;		//km/s
mercury.realPeriod		=	88;	//earth days
mercury.realRotation	=	27.3*24;	//earth hours
mercury.realSize		=	0.15; //earths surfaces   
mercury.realMass		=	0.055; // earths
mercury.realDensity		=	5.43;	//g/cm3
mercury.realGravity		=	0.38;	//g
mercury.realMinCelsius	=	-173;	//temp in celcius
mercury.realMaxCelsius	=	427;	//temp in celcius
mercury.realMoonsNum	=	0;	//known moons

mercury.realText = "Because of its lack of atmosphere and proximity to the sun, Mercury's temperatures are varying a lot more than on the other planets! ";
mercury.fr_realText = "En raison de sa quasi absence d'athmosphère et de sa proximité au soleil, les temperatures sur Mercure varient bien plus que sur les autres planètes! ";

mercury.extendedText = "Mercury is known to be the closest and the smallest of all eight planets, even smaller than Titan. "
+"Because of its proximity to the sun and its lack of atmosphere, Mercury's temperatures varies from -173°C to 427°C. "
+"It rotates very slowly around itself compared to its orbital period, making one of its day lasting 2 years for an observer on mercury. ";

venus 			= 	new planet();
venus.orbit		= 	110;
venus.width 	= 	28;
venus.height 	= 	28;
venus.rotspeed 	= 	+0.001;
venus.speed 	= 	-0.025;
venus.img 		= 	venusimg;
venus.name 		= 	"Venus";
venus.fr_name 	= 	"Vénus";

venus.realDistance		=	109; //km 
venus.realSpeed			=	35;		//km/s
venus.realPeriod		=	225;	//earth days
venus.realRotation		=	243*24;	//earth hours
venus.realSize			=	0.9; //earths surfaces   
venus.realMass			=	0.815; // earths
venus.realDensity		=	5.25;	//g/cm3
venus.realGravity		=	0.9;	//g
venus.realMinCelsius	=	455;	//temp in celcius
venus.realMaxCelsius	=	470;	//temp in celcius
venus.realMoonsNum		=	0;	//known moons

venus.realText = "Often called Earth's twin, Venus is very similar to our planet, except for its unviable atmosphere that turns it into an absolute hell. ";
venus.fr_realText = "Souvent nommée jumelle de la Terre, Venus est très similaire à notre planète, excepté pour son athmosphère extrèmement dense qui la rend totalement inhabitable. "; 

venus.extendedText = "In addition to being very similar in size and composition to the Earth, Venus is also "
+"its closest neighbour. However its atmosphere is a lot less viable, with an atmospheric pressure 92 times "
+"that of Earth's. The greenhouse effect makes Venus the hottest planet of our solar system, with a steady 462°C. "
+"Another unusual fact about Venus is its slow retrograde rotation around itself, which takes around one of its Venus years. ";



earth 			= 	new planet();
earth.orbit		= 	150;
earth.width 	= 	28;
earth.height 	= 	28;
earth.rotspeed	= 	-0.03;
earth.speed 	= 	-0.015;
earth.img 		= 	earthimg;
earth.name 		= 	"Earth";
earth.fr_name 	= 	"Terre";
earth.moons.push(earthMoon);

earth.realDistance		=	150 ; //km 
earth.realSpeed			=	29.78;		//km/s
earth.realPeriod		=	365;	//earth days
earth.realRotation		=	23.93;	//earth hours
earth.realSize			=	1;//40075;	//circumference // km
earth.realMass			=	1; //earths   6*10^24;	//kg
earth.realDensity		=	5.515;	//g/cm3
earth.realGravity		=	1;	//g
earth.realMinCelsius	=	-89.2;	//temp in celcius
earth.realMaxCelsius	=	56.7;	//temp in celcius
earth.realMoonsNum		=	1;	//know moons

earth.realText = "Earth is exceptional because of its combination of properties that made it possible for life to develop. ";
earth.fr_realText = "La Terre est exceptionnelle à cause de sa combinaison de propriétés qui ont rendu possible le developpement de la vie.";

earth.extendedText = "Even if Earth doesn't have particularly unique properties, what makes it "
+"extraordinary is the coincidental combination of parameters that led to its viable environnement. "
+"its position in the 'habitable' zone of the sun and its composition that led to its atmopshere, liquid water, "
+"and magnetic field are probably the main actor of these hospitable conditions. "
+"The Earth also has a significantly sized moon, which makes it the largest moon of the system compared to the size of its planet. "
+"Also, the Moon orbits particulary slowly compared to other major moons of our system, its the slowest of the moons represented here. ";

mars 			= 	new planet();
mars.orbit		= 	190;
mars.width 		= 	24;
mars.height 	= 	24;
mars.rotspeed	= 	-0.03;
mars.speed 		= 	-0.010;
mars.img 		= 	marsimg;
mars.name 		= 	"Mars";
mars.fr_name	= 	"Mars";
mars.moons.push(phobos);
mars.moons.push(deimos);

mars.realDistance	=	249; //km 
mars.realSpeed		=	24;		//km/s
mars.realPeriod		=	687;	//earth days
mars.realRotation	=	24.6;	//earth hours
mars.realSize		=	0.28; //earths surfaces   
mars.realMass		=	0.1; // earths
mars.realDensity	=	3.9;	//g/cm3
mars.realGravity	=	0.38;	//g
mars.realMinCelsius	=	-143;	//temp in celcius
mars.realMaxCelsius	=	35;	//temp in celcius
mars.realMoonsNum	=	2;	//known moons

mars.realText = "Recently advertised by Curiosity, Mars is the second closest planet to Earth, but is a lot more easy to explore than our closest neighbor, Venus. ";
mars.fr_realText = "Récemment abordée par Curiosity, Mars est la seconde plus proche planète de la Terre, mais est bien plus acceuillante que notre voisine, Venus.";

mars.extendedText = "Mars is the easiest planet to observe and explore from earth due to its "
+"proximity and lack of dense atmosphere, as shown by the "
+"recent Curiosity Rover spacecraft. Observations proved that liquid water was once "
+"present on the planet, and large ice deposit can be found on the poles. However, the planet "
+"is quite cold environment due to is lack of atmosphere. its two satellites, Phobos and Deimos, "
+"are very small (11km & 6km) and are more similar to asteroids than major Moons. ";

jupiter 		= 	new planet();
jupiter.orbit	= 	290;
jupiter.width 	= 	54;
jupiter.height 	= 	54;
jupiter.rotspeed= 	-0.04;
jupiter.speed 	= 	-0.005;
jupiter.img 	= 	jupiterimg;
jupiter.name 	= 	"Jupiter";
jupiter.fr_name = 	"Jupiter";
jupiter.moons.push(io);
jupiter.moons.push(europa);
jupiter.moons.push(ganymede);
jupiter.moons.push(callisto);

jupiter.realDistance	=	779 ; //km 
jupiter.realSpeed		=	13.07;		//km/s
jupiter.realPeriod		=	4333;	//earth days
jupiter.realRotation	=	10;	//earth hours
jupiter.realSize		=	122; //earths surfaces   40075;	//circumference // km
jupiter.realMass		=	318; // earths   5.9736*10^27;	//kg
jupiter.realDensity		=	1.326;	//g/cm3
jupiter.realGravity		=	2.528;	//g
jupiter.realMinCelsius	=	-163;	//temp in celcius
jupiter.realMaxCelsius	=	-110;	//temp in celcius
jupiter.realMoonsNum	=	67;	//known moons

jupiter.realText = "Jupiter is well known to be the biggest planet of the solar system, this gas giant also has four of our six biggest moons. ";
jupiter.fr_realText = "Jupiter est bien connue pour être la plus grande planète du système solaire, mais cette géante gazeuse possède aussi quatrede nos six plus grandes lunes. ";

jupiter.extendedText = "Jupiter is well known to be the biggest planet of the solar system, "
+"and is indeed a real giant compared to Earth, a lot more than it seems to be on this representation. "
+"However, the rocky part of the planet is quite small compared to its gas and liquid hydrogen layers, "
+"which explains its low density. The famous Great Red Spot is a storm larger than earth, that may or "
+"may not dissolve one day. "
+"Jupiter also has at least 67 satellites, including the four Galilean moons: "
+"Io the closest, has an extremely active volcanism, releasing large amounts of sulphur. "
+"Europa the second and smallest, is covered with ice, and is believed to contain a large "
+"amount of liquid water under its surface, which may contain life. "
+"Ganymede the third, is the biggest moon of our solar system with a 2634km radius, and possess its own magnetic field. "
+"Callisto the fourth, is another giant moon with a 2410km radius, but is a little smaller than Titan. ";

saturn 			= 	new planet();
saturn.orbit	= 	340;
saturn.width 	= 	44;
saturn.height 	= 	44;
saturn.rotspeed	= 	-0.04;
saturn.rot		= 	0;
saturn.speed 	= 	-0.003;
saturn.img 		= 	saturnimg;
saturn.name 	= 	"Saturn";
saturn.fr_name 	= 	"Saturne";
saturn.moons.push(titan);

saturn.realDistance		=	1433 ; //km 
saturn.realSpeed		=	9.7;		//km/s
saturn.realPeriod		=	10760;	//earth days
saturn.realRotation		=	10;	//earth hours
saturn.realSize			=	84; //earths surfaces   
saturn.realMass			=	95; // earths
saturn.realDensity		=	0.687;	//g/cm3
saturn.realGravity		=	1.065;	//g
saturn.realMinCelsius	=	-191;	//temp in celcius
saturn.realMaxCelsius	=	-141;	//temp in celcius
saturn.realMoonsNum		=	62;	//known moons

saturn.realText = "Saturn is known for its beautiful rings, which are made of ice and small rocks, and also for Titan, its only major moon. ";
saturn.fr_realText = "Saturne est connue pour ses anneaux, constitués de glace et de roche, et également pour Titan, sa seule lune majeure. ";

saturn.extendedText = "Saturn is well known for its beautiful rings, made of ice and small rocks. "
+"It is a gas giant like Jupiter, with a huge volume but a low density. Amongst its many moons, Titan "
+"is the only one noticeable. It is the second largest moon of Ganymede, and has an exceptionally dense "
+"atmosphere for a moon. Mainly composed of Nitrogen, there are evidences of a climate that includes weather "
+"changes similar to Earth's, and liquid Nitrogen seas should be found on its surface. ";

//===========================================
saturn_rings			= 	new planet();
saturn_rings.orbit		= 	saturn.orbit;
saturn_rings.width 		= 	95;
saturn_rings.height 	= 	56;
saturn_rings.rotspeed	= 	0;	
saturn_rings.rot		= 	saturn.rot;		
saturn_rings.speed 		= 	saturn.speed;	
saturn_rings.angle		= 	saturn.angle;	
saturn_rings.img 		= 	saturn_ringsimg;
//============================================

uranus 			= 	new planet();
uranus.orbit	= 	390;
uranus.width 	= 	40;
uranus.height 	= 	40;
uranus.rotspeed	= 	0.04;
uranus.speed 	= 	-0.002;
uranus.img 		= 	uranusimg;
uranus.name 	= 	"Uranus";
uranus.fr_name 	= 	"Uranus";

uranus.realDistance		=	2877 ; //km 
uranus.realSpeed		=	6.81;		//km/s
uranus.realPeriod		=	30800;	//earth days
uranus.realRotation		=	17.2;	//earth hours
uranus.realSize			=	16; //earths surfaces   
uranus.realMass			=	14.5; // earths
uranus.realDensity		=	1.27;	//g/cm3
uranus.realGravity		=	0.886;	//g
uranus.realMinCelsius	=	-222;	//temp in celcius
uranus.realMaxCelsius	=	-199;	//temp in celcius
uranus.realMoonsNum		=	27;	//known moons

uranus.realText = "Uranus has a very unusual rotation as its axis is tilted to a 98° angle, which is making it look like a rolling ball on the solar system's plane. ";
uranus.fr_realText = "Uranus possède un axe de rotation très inhabituel car il est incliné à 98°, lui donnant un mouvement similaire à une sphère roulant sur le plan du système solaire.";

uranus.extendedText = "Uranus is very similar to Neptune in terms of size and composition. "
+"An unusual fact about about Uranus is its rotation. its axis is extremely tilted, up to "
+"a 98° angle, which is making it look like a rolling ball. The seasons are therefore very "
+"unusual, with each pole facing the sun for half the Uranus year, so about 42 Earth years. "
+"Unlike other gas giants, it doesn't have storms or cloud bands to make it look more cheerful. "
+"Although, even with its 27 satellites, Uranus doesn't have a any massive moon compared "
+"to the other giants. Titania and Oberon are still 1500km in diameter, but are not notable "
+"enough to be represented here. ";


neptune 		= 	new planet();
neptune.orbit	= 	440;
neptune.width 	= 	40;
neptune.height 	= 	40;
neptune.rotspeed= 	-0.04;
neptune.speed 	= 	-0.001;
neptune.img 	= 	neptuneimg;
neptune.name 	= 	"Neptune";
neptune.fr_name = 	"Neptune";
neptune.moons.push(triton);

neptune.realDistance	=	4503 ; //km 
neptune.realSpeed		=	5.43;		//km/s
neptune.realPeriod		=	60190;	//earth days
neptune.realRotation	=	16.1;	//earth hours
neptune.realSize		=	15; //earths surfaces   
neptune.realMass		=	17; // earths
neptune.realMass		=	17; // earths
neptune.realDensity		=	1.64;	//g/cm3
neptune.realGravity		=	1.14;	//g
neptune.realMinCelsius	=	-220;	//temp in celcius
neptune.realMaxCelsius	=	-203;	//temp in celcius
neptune.realMoonsNum	=	13;	//known moons

neptune.realText = "Neptune is the farthest away planet from the sun, and its moon is the only major one that has a retrograde orbit. ";
neptune.fr_realText = "Neptune est la planète la plus éloignée du soleil, et sa lune est la seule lune majeure ayant une orbite rétrograde.";

neptune.extendedText = "Neptune is the farthest planet from the sun, not counting dwarf planets "
+"from the Kuiper Belt. It is of course the slowest and coldest too, and has a very active weather, "
+"with the fastest winds of our solar system recorded at 2100km per hour. His only major moon, Triton, "
+"is quite interesting as it is the only major moon rotating in a retrograde orbit around its planet, "
+"as represented here. Which indicates that unlike other moons, it didn't form with the planet, but "
+"was probably from the Kuiper belt, and captured later by Neptune's gravitational force. ";

var realOrbitConst=10;

function formatPlanet (planet) {
	planet.orbit = planet.orbit /winConst;
	planet.width = planet.width /winConst;
	planet.height = planet.height /winConst;
	
	planet.originalWidth=planet.width;
	planet.originalHeight=planet.height;
	planet.originalSpeed=planet.speed;
	planet.originalOrbit=planet.orbit;	
	
	planet.realDiameter=Math.round(Math.sqrt(planet.realSize/(4*Math.PI))*100)/6/winConst;
	//sun real diameter = 519/winConst
	if (planet == neptune){
		realOrbitConst= Math.round((neptune.realDistance/neptune.orbit)*1000)/1000;
		
	}
	planet.details.push(planet.name.toUpperCase());
	planet.fr_details.push(planet.fr_name.toUpperCase());
	planet.details.push("");
	planet.fr_details.push("");
	if (planet!=sun){
		planet.details.push("Distance from Sun : "+planet.realDistance+" Million Km");
		planet.fr_details.push("Distance du Soleil : "+planet.realDistance+" Million Km");
		planet.details.push("Orbital Speed : "+planet.realSpeed+" km/s");
		planet.fr_details.push("Vitesse Orbitale : "+planet.realSpeed+" km/s");
		if(	planet.realPeriod < 365){
			planet.details.push("Orbital Period : "+planet.realPeriod+" Earth days");
			planet.fr_details.push("Période Orbitale : "+planet.realPeriod+" Jours");
		}
		else{
			planet.details.push("Orbital Period : "+(planet.realPeriod/365).toFixed(1)+" Earth years");
			planet.fr_details.push("Période Orbitale : "+(planet.realPeriod/365).toFixed(1)+" Années");
		}
	}
	planet.details.push("Rotation Period : "+planet.realRotation+" Earth hours");
	planet.fr_details.push("Période de rotation : "+planet.realRotation+" Heures");
	planet.details.push("Total Surface size : "+planet.realSize+" Earth's");
	planet.fr_details.push("Surface Totale : "+planet.realSize+" Terres");
	planet.details.push("Total Mass : "+planet.realMass+" Earth's mass");
	planet.fr_details.push("Masse Totale : "+planet.realMass+" Terres");
	if (planet!=sun){
		planet.details.push("Density : "+planet.realDensity+" g/cm3");
		planet.fr_details.push("Densité : "+planet.realDensity+" g/cm3");
	}
	planet.details.push("Gravity : "+planet.realGravity+" g");
	planet.fr_details.push("Gravité : "+planet.realGravity+" g");
	planet.details.push("Minimum Temperature : "+planet.realMinCelsius+" °C");
	planet.fr_details.push("Temperature Minimum : "+planet.realMinCelsius+" °C");
	planet.details.push("Maximum Temperature : "+planet.realMaxCelsius+" °C");
	planet.fr_details.push("Temperature Maximum : "+planet.realMaxCelsius+" °C");
	if (planet!=sun){
		planet.details.push("Moons : "+planet.realMoonsNum+" known");
		planet.fr_details.push("Lunes : "+planet.realMoonsNum+" connues");
	}
	planet.details.push("");
	var detailTextLeft = planet.realText.length ;
	var textBegin =0;
	var textEnd;
	var textLength = 25;
	while (textEnd != -1){
		textEnd=planet.realText.indexOf(" ", textBegin+textLength);
		if(textEnd != -1){
			planet.details.push(planet.realText.substring(textBegin, textEnd));
		}
		else
			planet.details.push(planet.realText.substring(textBegin, textBegin+textLength));
			
		detailTextLeft-=75;//textEnd-textBegin;
		textBegin=textEnd+1;
	}
	//Save US version
	planet.us_details = planet.details;
	
	planet.fr_details.push("");
	detailTextLeft = planet.fr_realText.length ;
	textBegin =0;
	textEnd = 0;
	textLength = 25;
	while (textEnd != -1){
		textEnd=planet.fr_realText.indexOf(" ", textBegin+textLength);
		if(textEnd != -1){
			planet.fr_details.push(planet.fr_realText.substring(textBegin, textEnd));
		}
		else
			planet.fr_details.push(planet.fr_realText.substring(textBegin, textBegin+textLength));
			
		detailTextLeft-=75;//textEnd-textBegin;
		textBegin=textEnd+1;
	}
}
function updateRealism(planet){
	if (realistic){
		if (planet == sun){
			if (planet.width>5){
				planet.width-=2;
				planet.height-=2;
			}
			else{
				planet.width=5;
				planet.height=5;
			}
			
			if(realSunSize<sun.realDiameter/2){
				realSunSize +=3;
			}
			else
				realSunSize = sun.realDiameter/2;
		}
		else{
			if(planet.orbit>(planet.realDistance/realOrbitConst) ){
				planet.orbit -=2;
			}
			else
				planet.orbit=planet.realDistance/realOrbitConst;
				
			if (planet.width>planet.realDiameter ){
				planet.width --;
				planet.height --;
			}
			else{
				planet.width = planet.realDiameter;
				planet.height = planet.realDiameter;
			}
			planet.speed=-20/planet.realPeriod;
		}
	}
	else{
		if (planet == sun){
			if (planet.width<planet.originalWidth){
				planet.width+=2;
				planet.height+=2;
			}
			else{
				planet.width=planet.originalWidth;
				planet.height=planet.originalHeight;
			}
			if(realSunSize>0){
				realSunSize -=5;
			}
			else
				realSunSize = 0;
		}
		else{
			if(planet.orbit<(planet.originalOrbit) ){
				planet.orbit +=2.5;
			}
			else
				planet.orbit=planet.originalOrbit;
				
			if (planet.width<planet.originalWidth ){
				planet.width+=0.3;
				planet.height+=0.3;
			}
			else{
				planet.width = planet.originalWidth;
				planet.height = planet.originalHeight;
			}
			planet.speed=planet.originalSpeed;
		}
	}
		

}
function updateRealismA(asteroid){
	if (realistic){
		if(asteroid.orbit > asteroid.realOrbit )
			asteroid.orbit -=2.5;
		else
			asteroid.orbit=asteroid.realOrbit;
	}
	else{
		if(asteroid.orbit < asteroid.originalOrbit )
			asteroid.orbit +=2.5;
		else
			asteroid.orbit=asteroid.originalOrbit;
	}
	
}
