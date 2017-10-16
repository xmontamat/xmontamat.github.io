var current_lang = "us";
var us_welcomeText= welcomeText.slice();
var fr_welcomeText= [];
fr_welcomeText.push("Bienvenue, ce site web est une r�alisation HTML5");
fr_welcomeText.push("");
fr_welcomeText.push("D�couvrez-en plus sur le syst�me solaire");
fr_welcomeText.push("en cliquant sur les plan�tes");
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
fr_realisticText.push("Mode r�aliste : Activ�");
fr_realisticText.push("(Cliquez pour inverser)");
fr_realisticText.push("");
fr_realisticText.push("Dans cette repr�sentation les �l�ments");
fr_realisticText.push("suivants sont aux proportions r�elles :");
fr_realisticText.push("  - Distances Orbitales");
fr_realisticText.push("  - Vitesses Orbitales");
fr_realisticText.push("  - Taille des Plan�tes");
fr_realisticText.push("");
fr_realisticText.push("En raison de sa taille astronomique");
fr_realisticText.push("le soleil n'est pas repr�sent�.");
fr_realisticText.push("fid�lelement. S'il devait l'�tre, il");
fr_realisticText.push("s'�tendrait jusqu'au cercle de ");
fr_realisticText.push("pointill�s rouges.");
var	us_unRealisticText = unRealisticText.slice();
var	fr_unRealisticText = [];
fr_unRealisticText.push("Mode r�aliste : D�sactiv�");
fr_unRealisticText.push("(Cliquez pour inverser)");
fr_unRealisticText.push("");
fr_unRealisticText.push("Cette repr�sentation permet");
fr_unRealisticText.push("de visualiser les diff�rentes");
fr_unRealisticText.push("plan�tes du syst�me solaire");
fr_unRealisticText.push("ainsi que leurs principaux");
fr_unRealisticText.push("satellites, mais n'est pas");
fr_unRealisticText.push("aux proportions r�elles.");

	
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