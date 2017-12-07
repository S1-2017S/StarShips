//=========================================================================
// Traitement de "req_placement"
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('../html/placement.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
                                
