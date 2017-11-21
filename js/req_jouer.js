//=========================================================================
// Traitement de "req_commencer"
// Auteur : Delcourt Christopher
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
                         
