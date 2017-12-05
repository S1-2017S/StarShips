//=========================================================================
// Traitement de "jouer_case"
// Version : 21/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var jouer = function (req, res, query) {

	var page;
	var requete_J;
	var contenu_bot;
	var grille_bot;
	
	var contenu_t;
	var v_t;
	var contenu_c;
	var v_c;

	var marqueur = {};
	var plus = false;
	var moins = false;
	var mid = false;
	var mid_a = false;
	var mid_b = false;


	var tir = 0;
	var li_score;
	var contenu_score;
	var score = 0;

	//UTILISATION DE LA QUERY

	requete_J = {};
	requete_J.c = query.idCase

	//LECTURE JSON GRILLE BOT
	contenu_bot = fs.readFileSync("../json/grille_bateau.json" , 'utf-8');
	grille_bot = JSON.parse(contenu_bot);
	
	
	//LECTURE DES 2 JSONS RESPONSABLES DE LA MEMOIRE

	contenu_t = fs.readFileSync("../json/memoire_t.json" , 'utf-8');
	v_t = JSON.parse(contenu_t);
	
	contenu_c = fs.readFileSync("../json/memoire_c.json" , 'utf-8');
	v_c = JSON.parse(contenu_c);

	//LECTURE DU SCORE
	
	contenu_score = fs.readFileSync("../json/score.json" , 'utf-8');
	li_score = JSON.parse(contenu_score);
	

	//MISE EN PLACE DU "VIDE"
	
	for(var o = 0 ; o <= 200 ; o++) {
		marqueur[o] ="<img src='../img/carre.png'></a></td>";
	}
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR
	
	
	console.log(li_score[0].s);
	for(var i = 0 ; i < grille_bot.length ; i++) {
		
		if(Number(requete_J.c) === Number(grille_bot[i][0].p)) {
			
			tir = 1;
			v_t[v_t.length] = grille_bot[i][0].p 
		 	grille_bot[i][0].v = "1";
			li_score[0].s = Number(li_score[0].s)
			li_score[0].s =  li_score[0].s + 100;
			if(grille_bot[i][0].n < 5) {
				tir = 2;
				v_c[v_c.length] = grille_bot[i][0].p
				li_score[0].s = li_score[0].s + 100;
			} else if(grille_bot[i][0].n < 8 && grille_bot[i][0].n > 4) {
				if(grille_bot[i][0].n === grille_bot[i+1][0].n) {
					plus = true;
				} else if(grille_bot[i][0].n === grille_bot[i-1][0].n) {
					moins = true;
				}
				
				if(grille_bot[i][0].v === grille_bot[i+1][0].v && plus === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					li_score[0].s = li_score[0].s + 200;
				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && moins === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					li_score[0].s = li_score[0].s + 200;
				}
			
			} else if(grille_bot[i][0].n > 7 && grille_bot[i][0].n < 10) {
				
				if(grille_bot[i][0].n === grille_bot[i+1][0].n && grille_bot[i][0].n === grille_bot[i+2][0].n) {
					plus = true
				} else if(grille_bot[i][0].n === grille_bot[i-1][0].n && grille_bot[i][0].n === grille_bot[i-2][0].n) {
					moins = true;
				

				} else if(grille_bot[i][0].n === grille_bot[i-1][0].n && grille_bot[i][0].n === grille_bot[i+1][0].n) {
					mid = true;
				}
				
				if(grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i+2][0].v && plus === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p 
					li_score[0].s = li_score[0].s + 300;
				
				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && moins === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
					li_score[0].s = li_score[0].s + 300;
				
				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && mid === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					li_score[0].s = li_score[0].s + 300;
				
				}
		
			} else if(grille_bot[i][0].n > 9) {
		
				if(i === 16 &&grille_bot[i][0].n === grille_bot[i+1][0].n && grille_bot[i][0].n === grille_bot[i+2][0].n && grille_bot[i][0].n === grille_bot[i+3][0].n) {
					plus = true

				} else if(i === 19 && grille_bot[i][0].n === grille_bot[i-1][0].n && grille_bot[i][0].n === grille_bot[i-2][0].n && grille_bot[i][0].n === grille_bot[i-3][0].n) {
					moins = true;

				} else if(i === 17 && grille_bot[i][0].n === grille_bot[i-1][0].n && grille_bot[i][0].n === grille_bot[i+1][0].n && grille_bot[i][0].n === grille_bot[i+2][0].n) {
					mid_a = true;

				} else if(i === 18 &&grille_bot[i][0].n === grille_bot[i-1][0].n && grille_bot[i][0].n === grille_bot[i+1][0].n && grille_bot[i][0].n === grille_bot[i-2][0].n) {
					mid_b = true;
				}
				
				if(i === 16 && grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i+2][0].v && grille_bot[i][0].v === grille_bot[i+3][0].v && plus === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p 
					v_c[v_c.length] = grille_bot[i+3][0].p 
					li_score[0].s = li_score[0].s + 400;
				
				} else if(i === 19 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && grille_bot[i][0].v === grille_bot[i-3][0].v && moins === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
					v_c[v_c.length] = grille_bot[i-3][0].p 
					li_score[0].s = li_score[0].s + 400;
				
				} else if(i === 17 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i+2][0].v && mid_a === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p
					li_score[0].s = li_score[0].s + 400;
				
				} else if(i === 18 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && mid_b === true) {
					tir = 2;
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
					li_score[0].s = li_score[0].s + 400;
				
				}
		
			}
		} 
		
	}

	if(tir === 0) {
		marqueur.tir = "rate"
	} else if(tir === 1) {
		marqueur.tir = "touche"
	} else if(tir === 2) {
		marqueur.tir = "detruit"
	}

	
	contenu_score = JSON.stringify(li_score);
	fs.writeFileSync("../json/score.json" , contenu_score , 'utf-8');
	marqueur.score = li_score[0].s;
	
	
	contenu_t = JSON.stringify(v_t);
	fs.writeFileSync("../json/memoire_t.json" , contenu_t , 'utf-8');
	
	contenu_c = JSON.stringify(v_c);
	fs.writeFileSync("../json/memoire_c.json" , contenu_c , 'utf-8');

	for(var m = 0 ; m < v_t.length ; m++) {
		marqueur[v_t[m]] = "<img src='../img/vert.png'></a></td>";
	}
	
	for(var n = 0 ; n < v_t.length ; n++) {
		marqueur[v_c[n]] = "<img src='../img/rouge.png'></a></td>";
	}
	
	
	contenu_bot = JSON.stringify(grille_bot);
	fs.writeFileSync("../json/grille_bateau.json",contenu_bot,'utf-8');
	

	// AFFICHAGE DE LA PAGE DE JEU

	page = fs.readFileSync('../html/joueur_actif.html', 'utf-8');
	page = page.supplant(marqueur);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = jouer;
