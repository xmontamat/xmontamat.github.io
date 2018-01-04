var current_lang = "us";
var us_welcomeText= welcomeText.slice();
var fr_welcomeText= [];
fr_welcomeText.push("Bienvenue, ce site web est une réalisation HTML5");
fr_welcomeText.push("");
fr_welcomeText.push("Découvrez-en plus sur le système solaire");
fr_welcomeText.push("en cliquant sur les planètes");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("");
fr_welcomeText.push("Cliquez sur le soleil pour continuer");


var	us_realisticText = realisticText.slice();
var	fr_realisticText = [];
fr_realisticText.push("Mode réaliste : Activé");
fr_realisticText.push("(Cliquez pour inverser)");
fr_realisticText.push("");
fr_realisticText.push("Dans cette représentation les éléments");
fr_realisticText.push("suivants sont aux proportions réelles :");
fr_realisticText.push("  - Distances Orbitales");
fr_realisticText.push("  - Vitesses Orbitales");
fr_realisticText.push("  - Taille des Planètes");
fr_realisticText.push("");
fr_realisticText.push("En raison de sa taille astronomique");
fr_realisticText.push("le soleil n'est pas représenté.");
fr_realisticText.push("fidèlelement. S'il devait l'être, il");
fr_realisticText.push("s'étendrait jusqu'au cercle de ");
fr_realisticText.push("pointillés rouges.");
var	us_unRealisticText = unRealisticText.slice();
var	fr_unRealisticText = [];
fr_unRealisticText.push("Mode réaliste : Désactivé");
fr_unRealisticText.push("(Cliquez pour inverser)");
fr_unRealisticText.push("");
fr_unRealisticText.push("Cette représentation permet");
fr_unRealisticText.push("de visualiser les différentes");
fr_unRealisticText.push("planètes du système solaire");
fr_unRealisticText.push("ainsi que leurs principaux");
fr_unRealisticText.push("satellites, mais n'est pas");
fr_unRealisticText.push("aux proportions réelles.");

	
function switchLang(){
	if (current_lang=='us'){
		welcomeText = fr_welcomeText.slice();
		realisticText = fr_realisticText.slice();
		unRealisticText = fr_unRealisticText.slice();
		planets.forEach(function (planet){
			planet.details=planet.fr_details.slice();
		});
		current_lang = 'fr';
	}
	else{
		welcomeText = us_welcomeText.slice();
		realisticText = us_realisticText.slice();
		unRealisticText = us_unRealisticText.slice();
		planets.forEach(function (planet){
			planet.details=planet.us_details.slice();
		});
		current_lang = 'us';
	}
	drawOverlay();
}