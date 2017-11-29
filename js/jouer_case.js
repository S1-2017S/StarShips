//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var ecrire_json = function (req, res, query) {

	var page;                        // PAGE HTML OU ON APPLIQUE LES MARQUEURS
	var contenu_bot;                 // SERT A IMPORTER GRILLE BATEAU
	var requete_J;                   // REQUETE JOUEUR BRUTE
	var grille_bot;                  // GRILLE BOT PARSÉ
	var marqueurs = {};              // MARQUEURS POUR IMAGE
	var touche;                    	 // SI VALUE = 1 => EXECUTE UN CRIPT
	var contenu_memoire;
	var memoire;
	var inter;
	var taille_v;

	//DECOUPAGE DE LA REQUETE

	requete_J = {};
	requete_J.x = query.x;
	requete_J.y = query.y;
	requete_J.etat = query.state;
	requete_J.type = query.type;
	requete_J.nom = query.idCase
		
	//IMPLANTATION GRILLE BOT

	contenu_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	grille_bot = JSON.parse(contenu_bot);
	
	//COMPARAISON DE LA REQUETE AVEC LE JSON CONTENANT LA GRILLE DU BOT
	
	

	 for(var i = 0 ; i < grille_bot.length ; i++) {
		
		if(grille_bot[i].length === 1) {
			taille_v = 0;
		} else if(grille_bot[i].length === 2) {
			taille_v = 1;
		} else if(grille_bot[i].length === 3) {
			taille_v = 2;
		} else if(grille_bot[i].length === 4) {
			taille_v = 3;
		}

		
		if(grille_bot[i][0].x === requete_J.x) {
			if(grille_bot[i][0].y === requete_J.y) {
				touche = true;
				grille_bot[i][0].etat = "1"
			}
		}
		
		taille_v--;
	}
	
	//ECRITURE DANS LE JSON(APPLICATION DES CHANGEMENTS SI IL Y EN A)
	
	contenu_bot = JSON.stringify(grille_bot);
	fs.writeFileSync("../json/grille_bateau.json" ,contenu_bot , 'utf-8');

	//IMPLANTATION DE LA MEMOIRE DES COUPS TIRÉS

	contenu_memoire = fs.readFileSync("../json/memoire.json", 'utf-8');
	memoire = JSON.parse(contenu_memoire);

	//IMPLANTATION DE L'IMAGE DE BASE DU JEU(CARRÉ INVISIBLE)
		
	for(var y = 0 ; y <= 200 ; y++) {
		marqueurs[y] ="<img src='../img/carre.png'></a></td>";
	}
		
	//SCRIPT QUI SE LANCE QUAND UN BATEAU EST TOUCHÉ

	if(touche === true) {
		marqueurs[requete_J.nom] ="<img src='../img/vert.png'></a></td>";
		inter = requete_J.nom;
		memoire[memoire.length] = inter;
		contenu_memoire = JSON.stringify(memoire);
			
		fs.writeFileSync("../json/memoire.json", contenu_memoire, 'utf-8');
		touche = false;
	}
		
	//SCRIPT QUI SE LANCE QUAND UN BATEAU EST DÉTRUIT

	for(var z = 0 ; z < grille_bot.length; z++) {

			if(Number(grille_bot[z].type) === 1) {

				marqueurs[memoire[z]] ="<img src='../img/rouge.png'></a></td>"

			}
		}
	

	//AFFICHAGE DE LA PAGE

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = ecrire_json;

