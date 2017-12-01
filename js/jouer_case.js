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

	//MISE EN PLACE DU "VIDE"
	
	for(var o = 0 ; o <= 200 ; o++) {
		marqueur[o] ="<img src='../img/carre.png'></a></td>";
	}
	
	//VERIFICATION ECHEC OU REUSSITE DU TIR
	
	
	
	for(var i = 0 ; i < grille_bot.length ; i++) {
		
		if(Number(requete_J.c) === Number(grille_bot[i][0].p)) {
			
			v_t[v_t.length] = grille_bot[i][0].p 
			grille_bot[i][0].v = "1";
			
			if(grille_bot[i][0].n < 5) {
				v_c[v_c.length] = grille_bot[i][0].p
			} else if(grille_bot[i][0].n < 8 && grille_bot[i][0].n > 4) {
				if(grille_bot[i][0].n === grille_bot[i+1][0].n) {
					plus = true;
				} else if(grille_bot[i][0].n === grille_bot[i-1][0].n) {
					moins = true;
				}
				
				if(grille_bot[i][0].v === grille_bot[i+1][0].v && plus === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 

				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && moins === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
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
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p 
				
				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && moins === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
				
				} else if(grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && mid === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
				
				}
		
			} else if(grille_bot[i][0].n > 9) {
				console.log(i);
		
				
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
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p 
					v_c[v_c.length] = grille_bot[i+3][0].p 
				
				} else if(i === 19 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && grille_bot[i][0].v === grille_bot[i-3][0].v && moins === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
					v_c[v_c.length] = grille_bot[i-3][0].p 
				
				} else if(i === 17 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i+2][0].v && mid_a === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i+2][0].p
				
				} else if(i === 18 && grille_bot[i][0].v === grille_bot[i-1][0].v && grille_bot[i][0].v === grille_bot[i+1][0].v && grille_bot[i][0].v === grille_bot[i-2][0].v && mid_b === true) {
					v_c[v_c.length] = grille_bot[i][0].p 
					v_c[v_c.length] = grille_bot[i+1][0].p 
					v_c[v_c.length] = grille_bot[i-1][0].p 
					v_c[v_c.length] = grille_bot[i-2][0].p 
				
				}
		
			}
		}
	}
	
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
