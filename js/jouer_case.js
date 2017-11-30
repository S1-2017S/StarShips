//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var ecrire_json = function (req, res, query) {

	var page;
	var contenu_bot;
	var requete_J;
	var grille_bot;
	var marqueur = {};

	//UTILISATION DE LA QUERY

	requete_J = {};
	requete_J.c = query.idCase

	//LECTURE JSON GRILLE BOT
	contenu_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	grille_bot = JSON.parse(contenu_bot);
	

	//MISE EN PLACE DU "VIDE"
	
	for(var m = 0 ; m <= 200 ; m++) {
		marqueur[m] ="<img src='../img/carre.png'></a></td>";
	}
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR
	
	
	for(var i = 0 ; i < grille_bot.length ; i++) {
		
		if(Number(requete_J.c) === Number(grille_bot[i][0].p)) {
			console.log("test");
			marqueur[grille_bot[i][0].p] = "<img src='../img/vert.png'></a></td>"
			grille_bot[i][0].v = "1";
			if(grille_bot[i][0].n < 5) {
				
				marqueur[requete_J.c] = "<img src='../img/rouge.png'></a></td>"
			
			} else if(grille_bot[i][0].n !== grille_bot[i+2][0].n && grille_bot[i][0].n > 4 ) {
				console.log("rentre");

				if(Number(grille_bot[i][0].v) + Number(grille_bot[i+1][0].v) === 2) {
					
					marqueur[grille_bot[i][0].p] = "<img src='../img/rouge.png'></a></td>"
					marqueur[grille_bot[i+1][0].p] = "<img src='../img/rouge.png'></a></td>"
				}
			}
				
		

			marqueur.tir = "Touche";
		
		} else {
		
		}
	}
	
	
	contenu_bot = JSON.stringify(grille_bot);
	fs.writeFileSync("../json/grille_bateau.json",contenu_bot,'utf-8');
	
	console.log(contenu_bot);

	// AFFICHAGE DE LA PAGE DE JEU

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueur);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = ecrire_json;
