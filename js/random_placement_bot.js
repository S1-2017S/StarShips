"use strict";

var fs = require ("fs");
var contenu = fs.readFileSync("../json/etat_partie.json");
var contenu_bot;
var contenu_random;
var hor_ver;
var p1,p2,p3,p4;
var collision ;

contenu_bot = JSON.parse(contenu);
do {
	for (var i1 = 0; i1 < 19; i1++) {
		contenu_random = Math.floor(Math.random() * 100);
		hor_ver = Math.floor(Math.random() * 2);
		contenu_bot.grille_bot[i1].p = contenu_random;
		collision = true;
		if ( contenu_bot.grille_bot[i1].p === contenu_bot.grille_bot[i1].p) {
			collision = false ; 
		}
	}
} while ( contenu_bot.grille_bot[4].p > 89 ||  contenu_bot.grille_bot[6].p > 89 || contenu_bot.grille_bot[8].p > 89 || contenu_bot.grille_bot[10].p > 78 || contenu_bot.grille_bot[13].p > 78 || contenu_bot.grille_bot[16].p > 78 );


if (contenu_bot.grille_bot[4].n === 5 && hor_ver === 0 ) {
	p1 = contenu_bot.grille_bot[4].p;
	p2 = p1 + 1;
	contenu_bot.grille_bot[5].p = p2;
} else {
	p1 = contenu_bot.grille_bot[4].p;
	p2 = p1 + 10;
	contenu_bot.grille_bot[5].p = p2;
}

if (contenu_bot.grille_bot[6].n === 6 && hor_ver === 0) {
	p1 = contenu_bot.grille_bot[6].p;
	p2 = p1 + 10;
	contenu_bot.grille_bot[7].p = p2;
} else {
	p1 = contenu_bot.grille_bot[6].p;
	p2 = p1 + 1;
	contenu_bot.grille_bot[7].p = p2;
}

if (contenu_bot.grille_bot[8].n === 7 && hor_ver === 0) {
	p1 = contenu_bot.grille_bot[8].p;
	p2 = p1 + 1;
	contenu_bot.grille_bot[9].p = p2
} else {
	p1 = contenu_bot.grille_bot[8].p;
	p2 = p1 + 10;
	contenu_bot.grille_bot[9].p = p2;
}



if(contenu_bot.grille_bot[10].n === 8 && hor_ver === 0) {
	p1 = contenu_bot.grille_bot[10].p;
	p2 = p1 + 10;
	p3 = p2 + 10;
	contenu_bot.grille_bot[11].p = p2;
	contenu_bot.grille_bot[12].p = p3;
} else {
	p1 = contenu_bot.grille_bot[10].p;
	p2 = p1 + 1;
	p3 = p2 + 1;
	contenu_bot.grille_bot[11].p = p2;
	contenu_bot.grille_bot[12].p = p3;
}



if(contenu_bot.grille_bot[13].n === 9 && hor_ver === 0) {
	p1 = contenu_bot.grille_bot[13].p;
	p2 = p1 + 1;
	p3 = p2 + 1;
	contenu_bot.grille_bot[14].p = p2;
	contenu_bot.grille_bot[15].p = p3;
} else {
	p1 = contenu_bot.grille_bot[13].p;
	p2 = p1 + 10;
	p3 = p2 + 10;
	contenu_bot.grille_bot[14].p = p2;
	contenu_bot.grille_bot[15].p = p3;
}

if(contenu_bot.grille_bot[16].n === 10 && hor_ver === 0) {
	p1 = contenu_bot.grille_bot[16].p;
	p2 = p1 + 10;
	p3 = p2 + 10;
	p4 = p3 + 10;
	contenu_bot.grille_bot[17].p = p2;
	contenu_bot.grille_bot[18].p = p3;
	contenu_bot.grille_bot[19].p = p4;
} else {
	p1 = contenu_bot.grille_bot[16].p;
	p2 = p1 + 1;
	p3 = p2 + 1;
	p4 = p3 + 1;
	contenu_bot.grille_bot[17].p = p2;
	contenu_bot.grille_bot[18].p = p3;
	contenu_bot.grille_bot[19].p = p4;
}


contenu_bot = JSON.stringify(contenu_bot);
fs.writeFileSync("../json/etat_partie.json",contenu_bot,"UTF-8");

