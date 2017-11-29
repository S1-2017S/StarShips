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
				
				if(grille_bot[i][0].x === requete_J.x) {
					if(grille_bot[i][0].y === requete_J.y) {
						touche = true;
						grille_bot[i][0].etat = "1"
					}
				}
			
			} else {
					
				if(grille_bot[i][0] !== undefined) {

					if(grille_bot[i][0].x === requete_J.x) {
						if(grille_bot[i][0].y === requete_J.y) {
							touche = true;
							grille_bot[i][0].etat = "1"
						}
					}
				}
				
				if(grille_bot[i][1] !== undefined) {

					if(grille_bot[i][1].x === requete_J.x) {
						if(grille_bot[i][1].y === requete_J.y) {
							touche = true;
							grille_bot[i][1].etat = "1"
						}
					}
				}


				if(grille_bot[i][2] !== undefined) {
					
					if(grille_bot[i][2].x === requete_J.x) {
						if(grille_bot[i][2].y === requete_J.y) {
							touche = true;
							grille_bot[i][2].etat = "1"
						}
					}
				}
				
				if(grille_bot[i][3] !== undefined) {

					if(grille_bot[i][3].x === requete_J.x) {
						if(grille_bot[i][3].y === requete_J.y) {
							touche = true;
							grille_bot[i][3].etat = "1"
						}
					}		

				}
			}
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
		inter = requete_J.nom;
		
		
	/*	for(var j = 0 ; j < grille_bot.length ; j++) {
			if(Number(grille_bot[j][0].type) === 1) {
				marqueurs[memoire[j]] ="<img src='../img/rouge.png'></a></td>";
			
			}

		}
		*/
		memoire[memoire.length] = inter;
		contenu_memoire = JSON.stringify(memoire);
		fs.writeFileSync("../json/memoire.json", contenu_memoire, 'utf-8');
		touche = false;
	}
	

	//APPLICATION DES MARQUEURS

	for(var x = 0 ; x < memoire.length ; x++) {
		marqueurs[memoire[x]] = "<img src='../img/vert.png'></a></td>";
		if(Number(grille_bot[x][0].type) === 1) {
			marqueurs[memoire[x]] = "<img src='../img/rouge.png'></a></td>";
		} else {
			if(grille_bot[x][2] === undefined) {
				if(Number(grille_bot[x][0].etat) === Number(grille_bot[x][1].etat)) {						if(Number(grille_bot[x][0].etat === 1)) {
						marqueurs[memoire[x]] = "<img src='../img/rouge.png'></a></td>";
						marqueurs[memoire[x+1]] = "<img src='../img/rouge.png'></a></td>";
					}
				}
			}
		}
	}
	

	/*

	 for(var u = 0 ; u < grille_bot.length ; i++) {
		
			if(grille_bot[u].length === 1) {
				
				detruit = true;

				
			
			} else {
					
				if(grille_bot[u][0] !== undefined) {

					if(grille_bot[u][0].etat === 1) {
						
					}
				}
				
				
				if(grille_bot[u][1] !== undefined) {

					if(grille_bot[u][1].etat === 1) {
						
					}
				}
				


				if(grille_bot[u][2] !== undefined) {
					
					if(grille_bot[u][2].etat === 1) {
						
					}
				}
				
				
				if(grille_bot[u][3] !== undefined) {

					if(grille_bot[u][3].etat === 1) {
					}
				}		

				
			}
	}
	
*/
	//AFFICHAGE DE LA PAGE

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueurs);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = ecrire_json;

