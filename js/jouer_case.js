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
	var y;
	var marqueurs;
	var touche;
	var nom;
	var l, c;                // ligne et colonne

	//LECTURE JSON

	contenu_fichier = fs.readFileSync("../json/jouer_case.json", 'utf-8');
	liste_bateau_J = JSON.parse(contenu_fichier);



	//ECRITURE DANS LE JSON

	bateau_J = {};
	bateau_J.x = query.x;
	bateau_J.y = query.y;
	bateau_J.etat = query.state;
	bateau_J.type = query.type;
	bateau_J.nom = query.idCase;
		
	liste_bateau_J[liste_bateau_J.length] = bateau_J;

	contenu_fichier = JSON.stringify(liste_bateau_J);

	fs.writeFileSync("../json/jouer_case.json", contenu_fichier , 'utf-8');

	//MISE EN PLACE DE LA PARTIE

	contenu_fichier_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	grille_bateau_bot = JSON.parse(contenu_fichier_bot);
	
	//COMPARAISON DES JSONS
	
	for(i = 0 ; i < grille_bateau_bot.length ; i++) {

		marqueurs = {};

		if(grille_bateau_bot[i].x === bateau_J.x) {
			if(grille_bateau_bot[i].y === bateau_J.y) {
				touche = true;
			}
		}
	}

	//ATTRIBUTION DES MARQUEURS

	for(l=0; l<10; l++) {
		for(c=0; c<10; c++) {
			marqueurs["c" + l + c] = "<img src='../img/vert.png'>"
		}
	}


	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueurs);
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = ecrire_json;

