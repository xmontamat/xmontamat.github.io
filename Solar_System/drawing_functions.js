function drawPlanet(planet){
	
	if (planet != saturn_rings){
		if(planet.init==0 || planet == sun){
			if(realismChanged<150)
				updateRealism(planet);
			planetX = getX(sun_posx, planet.orbit, planet.angle);
			planetY = getY(sun_posy, planet.orbit, planet.angle);
			
			if (cursorOnPlanet(planet, planetX, planetY)){
				preparePlanetText(planet);
				if (clickedsince<1){
					detailsAdvance = 1000;
					// planet.speed = -planet.speed;
				}
				
			}
			else{
				// planetAimed--;
				planet.angle+=planet.speed;
			}
			drawTail(planet);
			planet.rot += planet.rotspeed;
		}
		else{
			
			if (planet.init==1){
				if(planet.initOrbit < planet.orbit)
					planet.initOrbit+=initSpeed;
				else
					planet.init=0;
				
				planetX = getX(sun_posx, planet.initOrbit, planet.angle);
				planetY = getY(sun_posy, planet.initOrbit, planet.angle);
			}
			else if (planet.init==-1 && planet.initOrbit > 0){
				planet.initOrbit-=initSpeed;
				planetX = getX(sun_posx, planet.initOrbit, planet.angle);
				planetY = getY(sun_posy, planet.initOrbit, planet.angle);
			}
			else
				return;
			
		}
	}
	else if(planet.init==-1 && saturn.initOrbit <= 0){
		return;
	}

	// if (planet.ini==0 || planet.initOrbit > initSpeed || planet == sun){
	drawImageRot(system, planet.img,planetX-planet.width/2,planetY-planet.height/2, planet.width, planet.height, planet.rot);
	if(!realistic){
		planet.moons.forEach(function(moon){
			drawMoon(moon);
		});
	}
	// }
}





function drawAsteroid(asteroid){
	
	if(asteroid.init == 0 ){
		asteroidX = getX(sun_posx,asteroid.orbit,asteroid.angle);
		asteroidY = getY(sun_posy,asteroid.orbit,asteroid.angle);
		asteroid.angle+=asteroid.speed;
	}
	else{
		
		if (asteroid.init==1){
			if(asteroid.initOrbit < asteroid.orbit)
				asteroid.initOrbit+=initSpeed;
			else
				asteroid.init=0;
			
			asteroidX = getX(sun_posx, asteroid.initOrbit, asteroid.angle);
			asteroidY = getY(sun_posy, asteroid.initOrbit, asteroid.angle);
		}
		else if (asteroid.init==-1 && asteroid.initOrbit > 0){
			asteroid.initOrbit-=initSpeed;
			asteroidX = getX(sun_posx, asteroid.initOrbit, asteroid.angle);
			asteroidY = getY(sun_posy, asteroid.initOrbit, asteroid.angle);
		}
		else
			return;
	}
	
	system.fillStyle = "#777777";

    system.fillRect(asteroidX, asteroidY, asteroid.width, asteroid.height);
}




function drawMoon(moon){
	if (moon.father == "cursor"){
		if(!displayPlanetName){
			moonX = getX(cursorX, moon.orbit, moon.angle);
			moonY = getY(cursorY, moon.orbit, moon.angle);
		}
		else{
			moonX = getX(planetDetailsX - 20, moon.orbit, moon.angle);
			moonY = getY(planetDetailsY, moon.orbit, moon.angle);
		}
	}
	else if (moon.father == "planet"){
		moonX = getX(planetX, moon.orbit, moon.angle);
		moonY = getY(planetY, moon.orbit, moon.angle);
	}
	
	moon.angle+=moon.speed;

	system.fillStyle = "BBBBBB";

	system.beginPath();
	system.arc(moonX,moonY,moon.size,0,Math.PI*2,true);
	system.fill();
	system.closePath();
	
}





function drawImageRot(canvas,img,x,y,width,height,rad){
//Convert degrees to radian (1/57.3)
// var rad = deg * Math.PI / 180;
    //Set the origin to the center of the image
    canvas.translate(x + width / 2, y + height / 2);
    //Rotate the canvas around the origin
    canvas.rotate(rad);
    //draw the image    
    canvas.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    //reset the canvas  
    canvas.rotate(rad * ( -1 ) );
    canvas.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}


function drawTail(planet){
	system.beginPath();
	system.lineWidth = 0.5;
	system.strokeStyle = '#333333';
	system.arc(sun_posx,sun_posy,planet.orbit,0,Math.PI*2,true);
	system.stroke();
	system.beginPath();
	system.strokeStyle = '#333444';
	system.lineWidth = 0.6;
	system.arc(sun_posx,sun_posy,planet.orbit,planet.angle,planet.angle+0.3+(120/planet.orbit),false);
	system.stroke();
	system.beginPath();
	system.lineWidth = 0.7;
	system.arc(sun_posx,sun_posy,planet.orbit,planet.angle,planet.angle+0.3+(90/planet.orbit),false);
	system.stroke();
	system.beginPath();
	system.lineWidth = 0.8;
	system.arc(sun_posx,sun_posy,planet.orbit,planet.angle,planet.angle+0.3+(60/planet.orbit),false);
	system.stroke();
}




function drawPlanetText(){
	if(displayPlanetName){
		if(aimedPlanet != previouslyAimedPlanet)
			detailsAdvance =0;
		else
			detailsAdvance+=2.5;

		system.fillStyle="#DDDDDD";
		// system.lineStyle="#222222";
		// system.lineWidth=1;
		system.font="bold "+20/winConst+"px courier new";
		system.shadowOffsetX=2;
		system.shadowOffsetY=2;
		system.shadowBlur=8;
		system.shadowColor="#111111";
		if (current_lang=='us')
			system.fillText(aimedPlanet.name.substring(0, detailsAdvance), planetNameX, planetNameY);
		else if (current_lang=='fr')
			system.fillText(aimedPlanet.fr_name.substring(0, detailsAdvance), planetNameX, planetNameY);
		// system.strokeText(planetNameText, planetNameX, planetNameY);
		var advanceLeft = detailsAdvance;
		
		system.font=""+18/winConst+"px Lucida Console";
			
		var displayComplete = true;
		aimedPlanet.details.forEach(function (detailLine){
			if (advanceLeft>0){
				planetDetailsY +=20/winConst;
				if (detailLine.length <= advanceLeft){
					system.fillText(detailLine, planetDetailsX, planetDetailsY, 300);
				}
				else{
					system.fillText(detailLine.substring(0, advanceLeft), planetDetailsX, planetDetailsY, 300);
					displayComplete=false;
				}
						
				advanceLeft -= detailLine.length;
				system.font=14/winConst+"px Lucida Console";
			}
		});
					
		planetDetailsY = 50/winConst;
		
		// sun_posx++;
		
		previouslyAimedPlanet = aimedPlanet;
		displayPlanetName = false;
		system.shadowOffsetX=0;
		system.shadowOffsetY=-0;
		system.shadowBlur=0;
	}
	else{
		detailsAdvance = 0;
	}
}




function drawWelcomeText(){
	if(initValue==-1){
		
		textWelcomeAvance ++;
		posTextY = 200/winConst;
		textWelcomeFontSize =22/winConst;
		
		system.fillStyle="#DDDDDD";
		// system.lineStyle="#222222";
		// system.lineWidth=1;
		system.font="bold "+textWelcomeFontSize+"px Times New Roman";
		system.shadowOffsetX=2;
		system.shadowOffsetY=2;
		system.shadowBlur=8;
		system.shadowColor="#111111";
		// system.fillText(welcomeText[0].substring(0, textWelcomeAvance), posTextX, 200/winConst);
		
		var advanceLeft = textWelcomeAvance;
		
		// system.font=""+18/winConst+"px Lucida Console";
			
		// var display_Complete = true;
		welcomeText.forEach(function (text){
			system.font="bold "+textWelcomeFontSize+"px Times New Roman";
			posTextX = sun_posx-((text.length) * (textWelcomeFontSize)/4.5);
				
			if (advanceLeft>0){
				posTextY += 30/winConst;
				if (text.length <= advanceLeft){
					system.fillText(text, posTextX, posTextY);
				}
				else{
					system.fillText(text.substring(0, advanceLeft), posTextX, posTextY);
					// display_Complete=false;
				}
						
				advanceLeft -= text.length;
			}
			textWelcomeFontSize = 16/winConst;
		});
					
		
		system.shadowOffsetX=0;
		system.shadowOffsetY=-0;
		system.shadowBlur=0;
	}
	else{
		textWelcomeAvance = 0;
	}
}
function drawRealSunSize(){
	if(realSunSize>0 && initValue==1){
		var max = Math.PI*2-0.02+realSunAngle;
		for(i=realSunAngle; i< max ; i+=0.1){ 
				system.beginPath();
				system.lineWidth = 2;
				system.strokeStyle = '#2A0000';
				system.arc(sun_posx,sun_posy,realSunSize,i, i+0.05,false);
				system.stroke();
		}
		realSunAngle-=0.003;
	}
}



function cursorOnPlanet(planet, planetX, planetY){
	// if (planet == sun && realistic){
		// if ( Math.round(Math.sqrt( (sun_posx - cursorX)*(sun_posx - cursorX) + (sun_posy - cursorY)*(sun_posy - cursorY))) == Math.round(sun.realDiameter) )
			// return true;
	// }
	if( cursorX < planetX-planet.width/2 || cursorX > planetX+planet.width/2 || cursorY < planetY-planet.height/2 || cursorY > planetY+planet.height/2 || planet== saturn_rings ){
		//Not on this planet
		return false
	}
	else
		return true
}
function preparePlanetText(planet){
	displayPlanetName=true;
	aimedPlanet = planet;
	planetNameX = planetX+22 + planet.width/4;
	planetNameY = planetY-13 - planet.height/4;
}


function getX(centerX, radius, angle) {
	return centerX+radius*Math.cos(angle);
}
function getY(centerY, radius, angle) {
	return centerY+radius*Math.sin(angle);
}
