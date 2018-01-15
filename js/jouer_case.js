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

	marqueur.tir = "";
	var tir_bot;

	//UTILISATION DE LA QUERY

	requete_J = {};
	requete_J.c = query.idCase
	requete_J.c = Number(requete_J.c);
	requete_J.p = query.pseudo;
	

	//LECTURE ETAT PARTIE
	partie = fs.readFileSync("../json/etat_partie.json" , 'utf-8');
	contenu_partie = JSON.parse(partie);
	
	//LECTURE DU PSEUDO
	contenu_pseudo = fs.readFileSync("../json/membres.json" , 'utf-8');
	pseudo = JSON.parse(contenu_pseudo);

	
	//remplacement du pseudo dans la query;

	marqueur.pseudo = pseudo[pseudo.length-1].pseudo; 
	
	//MISE EN PLACE DU "VIDE"

	for(var o = 0 ; o <= 200 ; o++) {
		marqueur[o] ="<img src='../img/carre.png'></a></td>";
	}
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR DU JOUEUR
	
	for(var i = 0 ; i < contenu_partie.grille_bot.length ; i++) {
		if(requete_J.c === contenu_partie.grille_bot[i].p) {
			contenu_partie.tir.t = 1;
			contenu_partie.touche[contenu_partie.touche.length] = contenu_partie.grille_bot[i].p 
		 	contenu_partie.grille_bot[i].v = 1;
			contenu_partie.score.s = contenu_partie.score.s + 100;
			if(contenu_partie.grille_bot[i].n < 5) {
				contenu_partie.tir.t = 2;
			    contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
				contenu_partie.score.s = contenu_partie.score.s + 100;
			} else if(contenu_partie.grille_bot[i].n < 8 && contenu_partie.grille_bot[i].n > 4) {
				if(contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n) {
					plus = true;
				} else if(contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n) {
					moins = true;
				}
				
				if(contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && plus === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.score.s = contenu_partie.score.s + 200;
				} else if(contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && moins === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.score.s = contenu_partie.score.s + 200;
				}
			
			} else if(contenu_partie.grille_bot[i].n > 7 && contenu_partie.grille_bot[i].n < 10) {
				
				if(contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+2].n) {
					plus = true
				} else if(contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-2].n) {
					moins = true;
				

				} else if(contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n) {
					mid = true;
				}
				
				if(contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+2].v && plus === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+2].p 
					contenu_partie.score.s = contenu_partie.score.s + 300;
				
				} else if(contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-2].v && moins === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-2].p 
					contenu_partie.score.s = contenu_partie.score.s + 300;
				
				} else if(contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && mid === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.score.s = contenu_partie.score.s + 300;
				
				}
		
			} else if(contenu_partie.grille_bot[i].n > 9) {
		
				if(i === 16 &&contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+2].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+3].n) {
					plus = true

				} else if(i === 19 && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-2].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-3].n) {
					moins = true;

				} else if(i === 17 && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+2].n) {
					mid_a = true;

				} else if(i === 18 && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i+1].n && contenu_partie.grille_bot[i].n === contenu_partie.grille_bot[i-2].n) {
					mid_b = true;
				}
				
				if(i === 16 && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && contenu_partie[0][i].v === contenu_partie.grille_bot[i+2].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+3].v && plus === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+2].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+3].p 
					contenu_partie.score.s = contenu_partie.score.s + 400;
				
				} else if(i === 19 && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-2].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-3].v && moins === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-2].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-3].p 
					contenu_partie.score.s = contenu_partie.score.s + 400;
				
				} else if(i === 17 && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+2].v && mid_a === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+2].p
					contenu_partie.score.s = contenu_partie.score.s + 400;
				
				} else if(i === 18 && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i+1].v && contenu_partie.grille_bot[i].v === contenu_partie.grille_bot[i-2].v && mid_b === true) {
					contenu_partie.tir.t = 2;
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i+1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_bot[i-2].p 
					contenu_partie.score.s = contenu_partie.score.s + 400;
				
				}
		
			}
		
			
		}
	}

	// ATTRIBUTION DES MARQUEURS
	

	if(contenu_partie.touche[0] !== undefined && contenu_partie.touche[contenu_partie.touche.length-1] !== requete_J.c) {
	
	var plus = false;              
	var moins = false;             
	var mid = false;               
	var mid_a = false;             
	var mid_b = false;             
	
	contenu_partie.score.s = contenu_partie.score.s - 50;
	contenu_partie.tir_j[contenu_partie.tir_j.length] = requete_J.c;
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR DU BOT

	tir_bot = Math.floor(Math.random() *100)

	for(var h = 0 ; h < contenu_partie.tir_random ; h++) {
		if(tir_bot === contenu_partie.tir_random[h]) {
			tir_bot = Math.floor(Math.Random() *100)
		}
	}
	
	contenu_partie.tir_random[contenu_partie.tir_random.length] = tir_bot;

	for(var d = 0 ; d < contenu_partie.grille_joueur.length ; d++) {
		if(tir_bot === contenu_partie.grille_joueur[d].p) {
			contenu_partie.tir_bot.t = 1;
			contenu_partie.touche_bot[contenu_partie.touche_bot.length] = contenu_partie.grille_joueur[d].p 
		 	contenu_partie.grille_joueur[d].v = 1;
			if(contenu_partie.grille_joueur[d].n < 5) {
				contenu_partie.tir_bot.t = 2;
			    contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
			} else if(contenu_partie.grille_joueur[d].n < 8 && contenu_partie.grille_joueur[d].n > 4) {
				if(contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n) {
					plus = true;
				} else if(contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n) {
					moins = true;
				}
				
				if(contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && plus === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
				} else if(contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && moins === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
				}
			
			} else if(contenu_partie.grille_joueur[d].n > 7 && contenu_partie.grille_joueur[d].n < 10) {
				
				if(contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+2].n) {
					plus = true
				} else if(contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-2].n) {
					moins = true;
				

				} else if(contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n) {
					mid = true;
				}
				
				if(contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+2].v && plus === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+2].p 
				
				} else if(contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-2].v && moins === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-2].p 
				
				} else if(contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && mid === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
					contenu_partie.coule[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
				
				}
		
			} else if(contenu_partie.grille_joueur[d].n > 9) {
		
				if(d === 16 &&contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+2].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+3].n) {
					plus = true

				} else if(d === 19 && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-2].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-3].n) {
					moins = true;

				} else if(d === 17 && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+2].n) {
					mid_a = true;

				} else if(d === 18 && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d+1].n && contenu_partie.grille_joueur[d].n === contenu_partie.grille_joueur[d-2].n) {
					mid_b = true;
				}
				
				if(d === 16 && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && contenu_partie[0][d].v === contenu_partie.grille_joueur[d+2].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+3].v && plus === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+2].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+3].p 
				
				} else if(d === 19 && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-2].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-3].v && moins === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-2].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[i-3].p 
				
				} else if(d === 17 && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+2].v && mid_a === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
					contenu_partie.coule[contenu_partie.coule.length] = contenu_partie.grille_joueur[d+2].p
				
				} else if(d === 18 && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d+1].v && contenu_partie.grille_joueur[d].v === contenu_partie.grille_joueur[d-2].v && mid_b === true) {
					contenu_partie.tir_bot.t = 2;
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d+1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-1].p 
					contenu_partie.coule_bot[contenu_partie.coule_bot.length] = contenu_partie.grille_joueur[d-2].p 
				
				}
		
			}
		
			
		}
		}
	} else if(contenu_partie.tir_bot.t === 1) {
				marqueur.tir_bot = "touché"
	} else if(contenu_partie.tir_bot.t === 2) {
				marqueur.tir_bot = "détruit"
	} 

	marqueur.score = contenu_partie.score.s;

	for(var m = 0 ; m < contenu_partie.touche.length ; m++) {
		marqueur[contenu_partie.touche[m]] = "<img src='../img/vert.png'></a></td>";
	}
	
	for(var n = 0 ; n < contenu_partie.coule.length ; n++) {
		marqueur[contenu_partie.coule[n]] = "<img src='../img/rouge.png'></a></td>";
	}
	
	
	
	for(var a = 0 ; a < contenu_partie.grille_joueur.length ; a++) {
		marqueur[contenu_partie.grille_joueur[a].p+100] = "<img src='../img/jaune.png'></a></td>";
	}
	
	for(var b = 0 ; b < contenu_partie.tir_random.length ; b++) {
		marqueur[contenu_partie.tir_random[b]+100] = "<img src='../img/gris.png'></a></td>";
	}
	
	for(var c = 0 ; c < contenu_partie.tir_j.length ; c++) {
		marqueur[contenu_partie.tir_j[c]] = "<img src='../img/gris.png'></a></td>";
	}
	

	for(var m2 = 0 ; m2 < contenu_partie.touche_bot.length ; m2++) {
		marqueur[contenu_partie.touche_bot[m2]+100] = "<img src='../img/vert.png'></a></td>";
	}
	
	for(var n2 = 0 ; n2 < contenu_partie.coule_bot.length ; n2++) {
		marqueur[contenu_partie.coule_bot[n2]+100] = "<img src='../img/rouge.png'></a></td>";
	}


	partie = JSON.stringify(contenu_partie);
	fs.writeFileSync("../json/etat_partie.json",partie,'utf-8');
	
	
	
	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueur);

	//AFFICHAGE PAGE PERDU

	var perdu = 0;

	for(var d2 = 0 ; d2 < 20 ; d2++) {
		if(contenu_partie.grille_joueur[d2].v === 1) {
			perdu++
		}
	}

	if(perdu === 20) {
		console.log("perdu");
	}

	//	AFFICHAGE DE LA PAGE GAGNÉ

	var gagne = 0;

	for(var d2 = 0 ; d2 < 20 ; d2++) {
		if(contenu_partie.grille_bot[d2].v === 1) {
			gagne++
		}
	}

	if(gagne === 20) {
		console.log("gagné");
	}

	// AFFICHAGE DE LA PAGE DE JEU
	
	/* if(contenu_partie.touche[contenu_partie.touche.length-1] !== requete_J.c) {
		
	}
	*/
		
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
};

//--------------------------------------------------------------------------

module.exports = jouer;
