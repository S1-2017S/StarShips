//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var traiter_requete = function (req, res, query) {

	var page;                          // PAGE HTML
	var contenu_bot;                   // SERT A IMPORTER GRILLE DU BOT
	var clique_J;                      // OBJET CONTENANT LES REQUETES J
	var grille_bot;                    // CONTIENT GRILLE DU BOT
	var marqueurs;                     // MARQUEURS POUR DYNAMYSME PAGE HTML
	var contenu_memoire;               // SERT A IMPORTER LA MEMOIRE
	var memoire;                       // CONTIENT MEMOIRE
	var x,y;                           // CORRESPOND AUX COORDO CASES

	//DECOUPAGE DE LA REQUETE AVEC LES QUERY 

	clique_J = {};
	clique_J.x = query.x;
	clique_J.y = query.y;
	clique_J.etat = query.state;
	clique_J.type = query.type;
	clique_J.nom = query.idCase

	//IMPLANTATION DE LA GRILLE DU BOT

	contenu_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	grille_bot = JSON.parse(contenu_bot);
	
	//MODIFICATION DES INFORMATIONS CONTENU DANS LA GRILLE DU BOT
	for(x = 0 ; x < 10 ; x++) {
		for(y = 0 ; y < 10 ; y++) {
			if(grille_bot[x][y].t) === clique_J.x) {
				grille_bot[x][y].e = "1";
			}
		}
	}

	//ECRITURE DES MODIFICATIONS DANS LA GRILLE DU BOT

	contenu_bot = JSON.stringify(grille_bot);
	fs.writeFileSync("../json/grille_bateau.json" ,contenu_bot , 'utf-8');



/*	
	// MISE EN PLACE DU SYSTÈME DE MÉMOIRE DES COUPS

		//IMPLANTATION MEMOIRE
	
	contenu_memoire = fs.readFileSync("../json/memoire.json", 'utf-8');
	memoire = JSON.parse(contenu_memoire);
	
	{
		// ACTION MODIFIANT LA MEMOIRE
	}
	
		//ECRITURE DES MODIFICATIONS DANS LA MEMOIRE
	
	contenu_memoire = JSON.stringify(memoire);
	fs.writeFileSync("../json/memoire.json", contenu_memoire, 'utf-8');


  	//AFFICHAGE DE LA PAGE 

		page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
		page = page.supplant(marqueurs);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
*/
};
//--------------------------------------------------------------------------

module.exports = traiter_requete;

