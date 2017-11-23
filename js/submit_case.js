//=========================================================================
// Traitement de "submit_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var ecrire_json = function (req, res, query) {

	var page;
	var contenu_fichier;
	var bateau_J;
	var liste_bateau_J;

	//LECTURE JSON

	contenu_fichier = fs.readFileSync("../json/submit.json", 'utf-8');
	liste_bateau_J = JSON.parse(contenu_fichier);


	
	//ECRITURE DANS LE JSON
	
	bateau_J = {};
	bateau_J.loc = query.idCase;
	liste_bateau_J[liste_bateau_J.length] = bateau_J;

	contenu_fichier = JSON.stringify(liste_bateau_J);

	fs.writeFileSync("../json/submit.json", contenu_fichier , 'utf-8');

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('../html/placement.html', 'utf-8');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = ecrire_json;
