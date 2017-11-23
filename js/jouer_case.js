//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var ecrire_json = function (req, res, query) {

	var page;
	var contenu_fichier;
	var contenu_fichier_bot;
	var bateau_J;
	var liste_bateau_J;
	var grille_bateau_bot;
	var i;

	//LECTURE JSON

	contenu_fichier = fs.readFileSync("../json/jouer_case.json", 'utf-8');
	liste_bateau_J = JSON.parse(contenu_fichier);



	//ECRITURE DANS LE JSON

	bateau_J = {};
	bateau_J.x = query.x;
	bateau_J.y = query.y;
	bateau_J.etat = query.state;
	bateau_J.type = query.type;
		
		liste_bateau_J[liste_bateau_J.length] = bateau_J;

	contenu_fichier = JSON.stringify(liste_bateau_J);
	console.log(contenu_fichier);

	fs.writeFileSync("../json/jouer_case.json", contenu_fichier , 'utf-8');

	//SCRIPT

	contenu_fichier_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	console.log(contenu_fichier_bot)
	grille_bateau_bot = JSON.parse(contenu_fichier_bot);
	
	for(i = 0 ; i < grille_bateau_bot.length ; i++) {

		if(grille_bateau_bot[i].x === bateau_J.x) {
			if(grille_bateau_bot[i].y === bateau_J.y) {
				console.log("touché");
			}
		}
	}
	
	
	
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = ecrire_json;

