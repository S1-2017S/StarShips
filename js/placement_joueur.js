"use strict";

var fs = require ("fs");
var conte = fs.readFileSync("../json/etat_partie.json");
var contenu_b;
var contenu_rand;
var hor_v;
var pa,pb,pc,pd;
var collisi;

contenu_b = JSON.parse(conte);
do {
	for (var i = 0; i < 19; i++) {
		contenu_rand = Math.floor(Math.random() * 100);
		hor_v = Math.floor(Math.random() * 2);
		contenu_b.grille_joueur[i].p = contenu_rand;
		collisi = true;
		if ( contenu_b.grille_joueur[i].p === contenu_b.grille_joueur[i].p) {
			collisi = false ;
		}
	}
} while ( contenu_b.grille_joueur[4].p > 89 ||  contenu_b.grille_joueur[6].p > 89 || contenu_b.grille_joueur[8].p > 89 || contenu_b.grille_joueur[10].p > 78 || contenu_b.grille_joueur[13].p > 78 || contenu_b.grille_joueur[16].p > 78 );


if (contenu_b.grille_joueur[4].n === 5 && hor_v === 0 ) {
	pa = contenu_b.grille_joueur[4].p;
	pb = pa + 1;
	contenu_b.grille_joueur[5].p = pb;
} else {
	pa = contenu_b.grille_joueur[4].p;
	pb = pa + 10;
	contenu_b.grille_joueur[5].p = pb;
}

if (contenu_b.grille_joueur[6].n === 6 && hor_v === 0) {
	pa = contenu_b.grille_joueur[6].p;
	pb = pa + 10;
	contenu_b.grille_joueur[7].p = pb;
} else {
	pa = contenu_b.grille_joueur[6].p;
	pb = pa + 1;
	contenu_b.grille_joueur[7].p = pb;
}

if (contenu_b.grille_joueur[8].n === 7 && hor_v === 0) {
	pa = contenu_b.grille_joueur[8].p;
	pb = pa + 1;
	contenu_b.grille_joueur[9].p = pb
} else {
	pa = contenu_b.grille_joueur[8].p;
	pb = pa + 10;
	contenu_b.grille_joueur[9].p = pb;
}


if(contenu_b.grille_joueur[10].n === 8 && hor_v === 0) {
	pa = contenu_b.grille_joueur[10].p;
	pb = pa + 10;
	pc = pb + 10;
	contenu_b.grille_joueur[11].p = pb;
	contenu_b.grille_joueur[12].p = pc;
} else {
	pa = contenu_b.grille_joueur[10].p;
	pb = pa + 1;
	pc = pb + 1;
	contenu_b.grille_joueur[11].p = pb;
	contenu_b.grille_joueur[12].p = pc;
}


if(contenu_b.grille_joueur[13].n === 9 && hor_v === 0) {
	pa = contenu_b.grille_joueur[13].p;
	pb = pa + 1;
	pc = pb + 1;
	contenu_b.grille_joueur[14].p = pb;
	contenu_b.grille_joueur[15].p = pc;
} else {
	pa = contenu_b.grille_joueur[13].p;
	pb = pa + 10;
	pc = pb + 10;
	contenu_b.grille_joueur[14].p = pb;
	contenu_b.grille_joueur[15].p = pc;
}

if(contenu_b.grille_joueur[16].n === 10 && hor_v === 0) {
	pa = contenu_b.grille_joueur[16].p;
	pb = pa + 10;
	pc = pb + 10;
	pd = pc + 10;
	contenu_b.grille_joueur[17].p = pb;
	contenu_b.grille_joueur[18].p = pc;
	contenu_b.grille_joueur[19].p = pd;
} else {
	pa = contenu_b.grille_joueur[16].p;
	pb = pa + 1;
	pc = pb + 1;
	pd = pc + 1;
	contenu_b.grille_joueur[17].p = pb;
	contenu_b.grille_joueur[18].p = pc;
	contenu_b.grille_joueur[19].p = pd;
}


contenu_b = JSON.stringify(contenu_b);
fs.writeFileSync("../json/etat_partie.json",contenu_b,"UTF-8");
