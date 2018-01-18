"use strict";



//-------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------INITIALISATION DES VARIABLES-------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------

var fs = require ("fs");
var contenu;					
var contenu_bot;				
var contenu_random;  			// VARIABLE UTILISEE POUR GENERER UN NOMBRE ALEATOIRE
var hor_ver;					// VARIABLE PERMETTANT DE CHOISIR LA DIRECTION DE NOTRE BATEAU
var p1,p2,p3,p4;				// VARIABLE DESIGNANT LES PARTIES D'UN BATEAU
var collision;					// VARIABLE EMPECHANT LES BATEAUX DE SE SUPERPOSER

contenu = fs.readFileSync("../json/etat_partie.json");
contenu_bot = JSON.parse(contenu);

//-------------------------------------------------------------------------------------------------------------------------------------------
//-----------------GENERATION DE TOUTES LES PARTIES DU BATEAUX EMPECHER LES BATEAUX DE SORTIR DU TABLEAU ET DE SE TOUCHER--------------------
//-------------------------------------------------------------------------------------------------------------------------------------------


do {
	for (var i1 = 0; i1 < 19; i1++) {							// BOUCLE QUI VA PERMETTRE DE GENERER LE NOMBRE DE BATEAUX NECESSAIRE A LA PARTIE 
		contenu_random = Math.floor(Math.random() * 100);		// GENERATION DE NOMBRES ALEATOIRE ENTRE 0 ET 100 
		hor_ver = Math.floor(Math.random() * 2);				// NOMBRE GENERE ENTRE 0 ET 1 POUR L'ORIENTATION DU BATEAU 
		contenu_bot.grille_bot[i1].p = contenu_random;			// LES VALEURS DE contenu_random SONT ENSUITE INCLUSE DANS LE FICHIER JSON etat_partie.json
		collision = true;
		if ( contenu_bot.grille_bot[i1].p === contenu_bot.grille_bot[i1].p) {  
			collision = false ; //SI LA POSITION DE 2 BATEAUX SONT IDENTIQUES ALORS LA VARIABLE COLISION PREND LA VALEUR FALSE
		}
	}
} while ( contenu_bot.grille_bot[4].p > 89 ||  contenu_bot.grille_bot[6].p > 89 || contenu_bot.grille_bot[8].p > 89 || contenu_bot.grille_bot[10].p > 78 || contenu_bot.grille_bot[13].p > 78 || contenu_bot.grille_bot[16].p > 78 || collision === false ); 	//  IL SAGIT ICI D'EMPECHER LES BATEAUX DE SORTIR DU TABLEAU AINSI QUE D'EMPECHER LA COLISION ENTRE EUX


//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------PLACEMENT DES BATEAUX----------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

//------------------------
//----BATEAUX 1 CASE------
//------------------------

//LES BATEAUX COMPORTANT UNE SEULE PARTIE SONT AUTOMATIQUEMENT PLACES AU PREALABLE

//------------------------
//---- BATEAUX 2 CASES----
//------------------------

if (contenu_bot.grille_bot[4].n === 5 && hor_ver === 0 ) {  // ON CHERCHE LE BATEAUX NUMERO 5 CAR IL SAGIT DE LA PREMIERE PARTIE DU BATEAU A 2 PLACES
	p1 = contenu_bot.grille_bot[4].p;						// ON ASSIGNE LA VALEURS QUE LA GENERATION ALEATOIRE A ASSIGNE AU BATEAU NUMERO 5 A LA VARIABLE P1
	p2 = p1 + 1;											// PUIS ON AJOUTE 1 CAR LA VALEUR DE hor_ver EST EGALE A 0 ET ON L'ASSIGNE A P2
	contenu_bot.grille_bot[5].p = p2;						// PUIS LA 6E PARTIE DU BATEAU PRENDRA ALORS LA VALEURS DE P2
} else {
	p1 = contenu_bot.grille_bot[4].p;						// ICI MEME PRINCIPE A L EXCEPTION DE hor_ver QUI LUI N'EST PAS EGALE A 0 ON AURA DONC A BATEAU VERTICALE
	p2 = p1 + 10;											// MEME PRINCIPE EGALEMENT SAUF QU ON AJOUTE 10 POUR AVOIR UN BATEAU VERTICALE
	contenu_bot.grille_bot[5].p = p2;
}

if (contenu_bot.grille_bot[6].n === 6 && hor_ver === 0) {	//ON CHERCHE LE BATEAU NUMERO 6	 
	p1 = contenu_bot.grille_bot[6].p;						
	p2 = p1 + 10;											//----------------------------------------------	
	contenu_bot.grille_bot[7].p = p2;						//-----MEME PRINCIPE QUE LE BATEAU NUMERO 5----- 
} else {													//----------------------------------------------
	p1 = contenu_bot.grille_bot[6].p;						
	p2 = p1 + 1;
	contenu_bot.grille_bot[7].p = p2;
}

if (contenu_bot.grille_bot[8].n === 7 && hor_ver === 0) {	// ON CHERCHE LE BATEAU NUMERO 7
	p1 = contenu_bot.grille_bot[8].p;
	p2 = p1 + 1;
	contenu_bot.grille_bot[9].p = p2						//-----------------------------------------------
} else {													//-----MEME PRINCIPE QUE LE BATEAU NUMERO 5------
	p1 = contenu_bot.grille_bot[8].p;						//-----------------------------------------------	
	p2 = p1 + 10;
	contenu_bot.grille_bot[9].p = p2;
}

//------------------------
//----BATEAUX 3 CASES-----
//------------------------

if(contenu_bot.grille_bot[10].n === 8 && hor_ver === 0) {	// ON CHERCHE LE BATEAU NUMERO 8 QUI EST LA PARTIE 10
	p1 = contenu_bot.grille_bot[10].p;						
	p2 = p1 + 10;
	p3 = p2 + 10;											// ICI UNE NOUVELLE VARIABLE SE RAJOUTE P3 QUI EST LA 3E PARTIE DE NOTRE BATEAU
	contenu_bot.grille_bot[11].p = p2;						// LA 2E PARTIE DU BATEAU PRENDRA POUR VALEUR P2
	contenu_bot.grille_bot[12].p = p3;						// LA 3E PARTIE DU BATEAU PRENDRA POUR VALEUR P3
} else {
	p1 = contenu_bot.grille_bot[10].p;
	p2 = p1 + 1;										
	p3 = p2 + 1;											//MEME PRINCIPE A L'EXCEPTION DE RAJOUTER 1 A P2
	contenu_bot.grille_bot[11].p = p2;							
	contenu_bot.grille_bot[12].p = p3;
}



if(contenu_bot.grille_bot[13].n === 9 && hor_ver === 0) {	// ON CHERCHE LE BATEAU NUMERO 9
	p1 = contenu_bot.grille_bot[13].p;
	p2 = p1 + 1;
	p3 = p2 + 1;
	contenu_bot.grille_bot[14].p = p2;
	contenu_bot.grille_bot[15].p = p3;						//----------------------------------------------
} else {													//-----MEME PRINCIPE QUE LE BATEAU NUMERO 8-----
	p1 = contenu_bot.grille_bot[13].p;						//----------------------------------------------
	p2 = p1 + 10;
	p3 = p2 + 10;
	contenu_bot.grille_bot[14].p = p2;
	contenu_bot.grille_bot[15].p = p3;
}

//----------------------
//----BATEAU 4 CASES----
//----------------------

if(contenu_bot.grille_bot[16].n === 10 && hor_ver === 0) {	// ON CHERCHE LE BATEAU NUMERO 10
	p1 = contenu_bot.grille_bot[16].p;
	p2 = p1 + 10;											
	p3 = p2 + 10;
	p4 = p3 + 10;											// ON RAJOUTE UNE NOUVELLE VALEUR P4 
	contenu_bot.grille_bot[17].p = p2;
	contenu_bot.grille_bot[18].p = p3;
	contenu_bot.grille_bot[19].p = p4;						// LA 4E PARTIE DU BATEAU PRENDRA LA VALEUR P4
} else {
	p1 = contenu_bot.grille_bot[16].p;
	p2 = p1 + 1;
	p3 = p2 + 1;											// MEME PRINCIPE A L EXCEPTION DE RAJOUTER 1 A P4
	p4 = p3 + 1;
	contenu_bot.grille_bot[17].p = p2;
	contenu_bot.grille_bot[18].p = p3;
	contenu_bot.grille_bot[19].p = p4;
}


contenu_bot = JSON.stringify(contenu_bot);
fs.writeFileSync("../json/etat_partie.json",contenu_bot,"UTF-8");


