//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var jouer = function (req, res, query) {

	var page;                      // contenu de la page
	var requete_J;                 // requete reçu
	var contenu_partie;               // contenu de la grille non parsé 
	var partie;                // liste contenant les vaisseaux
	

	var marqueur = {};             // marqueurs
	
	var plus = false;              //
	var moins = false;             //
	var mid = false;               // Sert pour la comparaison
	var mid_a = false;             //
	var mid_b = false;             //

	var contenu_pseudo;            //
	var pseudo;                    // pseudo

	var tir = 0;                       
	marqueur.tir = "";

	//UTILISATION DE LA QUERY

	requete_J = {};
	requete_J.c = query.idCase
	requete_J.c = Number(requete_J.c);
	requete_J.p = query.pseudo;

	//LECTURE ETAT PARTIE
	console.log(requete_J.p);
	partie = fs.readFileSync("../json/etat_partie.json" , 'utf-8');
	contenu_partie = JSON.parse(partie);
	
	//LECTURE DU PSEUDO

	contenu_pseudo = fs.readFileSync("../json/membres.json" , 'utf-8');
	pseudo = JSON.parse(contenu_pseudo);

	
	marqueur.pseudo = pseudo[0].pseudo; //remplacement du pseudo dans la query;
	
	//MISE EN PLACE DU "VIDE"

	for(var o = 0 ; o <= 200 ; o++) {
		marqueur[o] ="<img src='../img/carre.png'></a></td>";
	}
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR
	

	for(var i = 0 ; i < contenu_partie[0].length ; i++) {
		if(requete_J.c === contenu_partie[0][i].p) {
			tir = 1;
			contenu_partie[1][contenu_partie[1].length] = contenu_partie[0][i].p 
		 	contenu_partie[0][i].v = 1;
			contenu_partie[3][0].s = contenu_partie[3][0].s + 100;
			if(contenu_partie[0][i].n < 5) {
				tir = 2;
			    contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
				contenu_partie[3][0].s = contenu_partie[3][0].s + 100;
			} else if(contenu_partie[0][i].n < 8 && contenu_partie[0][i].n > 4) {
				if(contenu_partie[0][i].n === contenu_partie[0][i+1].n) {
					plus = true;
				} else if(contenu_partie[0][i].n === contenu_partie[0][i-1].n) {
					moins = true;
				}
				
				if(contenu_partie[0][i].v === contenu_partie[0][i+1].v && plus === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 200;
				} else if(contenu_partie[0][i].v === contenu_partie[0][i-1].v && moins === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 200;
				}
			
			} else if(contenu_partie[0][i].n > 7 && contenu_partie[0][i].n < 10) {
				
				if(contenu_partie[0][i].n === contenu_partie[0][i+1].n && contenu_partie[0][i].n === contenu_partie[0][i+2].n) {
					plus = true
				} else if(contenu_partie[0][i].n === contenu_partie[0][i-1].n && contenu_partie[0][i].n === contenu_partie[0][i-2].n) {
					moins = true;
				

				} else if(contenu_partie[0][i].n === contenu_partie[0][i-1].n && contenu_partie[0][i].n === contenu_partie[0][i+1].n) {
					mid = true;
				}
				
				if(contenu_partie[0][i].v === contenu_partie[0][i+1].v && contenu_partie[0][i].v === contenu_partie[0][i+2].v && plus === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+2].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 300;
				
				} else if(contenu_partie[0][i].v === contenu_partie[0][i-1].v && contenu_partie[0][i].v === contenu_partie[0][i-2].v && moins === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-2].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 300;
				
				} else if(contenu_partie[0][i].v === contenu_partie[0][i-1].v && contenu_partie[0][i].v === contenu_partie[0][i+1].v && mid === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 300;
				
				}
		
			} else if(contenu_partie[0][i].n > 9) {
		
				if(i === 16 &&contenu_partie[0][i].n === contenu_partie[0][i+1].n && contenu_partie[0][i].n === contenu_partie[0][i+2].n && contenu_partie[0][i].n === contenu_partie[0][i+3].n) {
					plus = true

				} else if(i === 19 && contenu_partie[0][i].n === contenu_partie[0][i-1].n && contenu_partie[0][i].n === contenu_partie[0][i-2].n && contenu_partie[0][i].n === contenu_partie[0][i-3].n) {
					moins = true;

				} else if(i === 17 && contenu_partie[0][i].n === contenu_partie[0][i-1].n && contenu_partie[0][i].n === contenu_partie[0][i+1].n && contenu_partie[0][i].n === contenu_partie[0][i+2].n) {
					mid_a = true;

				} else if(i === 18 && contenu_partie[0][i].n === contenu_partie[0][i-1].n && contenu_partie[0][i].n === contenu_partie[0][i+1].n && contenu_partie[0][i].n === contenu_partie[0][i-2].n) {
					mid_b = true;
				}
				
				if(i === 16 && contenu_partie[0][i].v === contenu_partie[0][i+1].v && contenu_partie[0][i].v === contenu_partie[0][i+2].v && contenu_partie[0][i].v === contenu_partie[0][i+3].v && plus === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+2].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+3].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 400;
				
				} else if(i === 19 && contenu_partie[0][i].v === contenu_partie[0][i-1].v && contenu_partie[0][i].v === contenu_partie[0][i-2].v && contenu_partie[0][i].v === contenu_partie[0][i-3].v && moins === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-2].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-3].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 400;
				
				} else if(i === 17 && contenu_partie[0][i].v === contenu_partie[0][i-1].v && contenu_partie[0][i].v === contenu_partie[0][i+1].v && contenu_partie[0][i].v === contenu_partie[0][i+2].v && mid_a === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+2].p
					contenu_partie[3][0].s = contenu_partie[3][0].s + 400;
				
				} else if(i === 18 && contenu_partie[0][i].v === contenu_partie[0][i-1].v && contenu_partie[0][i].v === contenu_partie[0][i+1].v && contenu_partie[0][i].v === contenu_partie[0][i-2].v && mid_b === true) {
					tir = 2;
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i+1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-1].p 
					contenu_partie[2][contenu_partie[2].length] = contenu_partie[0][i-2].p 
					contenu_partie[3][0].s = contenu_partie[3][0].s + 400;
				
				}
		
			}
		} 
	}

	// ATTRIBUTION DES MARQUEURS
	
	if(tir === 0 && contenu_partie[4][0].t !== 0) {
		contenu_partie[3][0].s = contenu_partie[3][0].s - 50;
		marqueur.tir = "raté"
	} else if(tir === 1) {
		marqueur.tir = "touché"
	} else if(tir === 2) {
		marqueur.tir = "détruit"
	}

	marqueur.score = contenu_partie[3][0].s;
	contenu_partie[4][0].t = contenu_partie[4][0].t + 1;

	for(var m = 0 ; m < contenu_partie[1].length ; m++) {
		marqueur[contenu_partie[1][m]] = "<img src='../img/vert.png'></a></td>";
	}
	
	for(var n = 0 ; n < contenu_partie[2].length ; n++) {
		marqueur[contenu_partie[2][n]] = "<img src='../img/rouge.png'></a></td>";
	}
	
	
	partie = JSON.stringify(contenu_partie);
	fs.writeFileSync("../json/etat_partie.json",partie,'utf-8');
	

	// AFFICHAGE DE LA PAGE DE JEU

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueur);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = jouer;
