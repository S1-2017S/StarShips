"use strict";

var l,c;
var long;
var sens;
var i;
var bateau;
var ca_depasse;
var taille;
var collision;

taille = 100

long = 3

do {
	l = Math.floor(Math.random() * taille);
	c = l +10

	sens = Math.floor(Math.random() * 2);

	bateau = [[l, c]];
	for ( i= 0, i<long;i++) {
		if(sens === 0) {
			bateau.push([l, c]);
		} else {
			bateau.push([l+1+i, c]);
		}
	}	

	ca_depasse = false;
	for(i=0; i<long; i++) {
		if(bateau[i][0] <0 || bateau[i][0] > taille -1) {
			ca_depasse = true;
		}
		if(bateau[i][0] <0 || bateau[i][0] > taille -1) {
			ca_depasse = true;
		}   
	}
console.log(bateau);
}while ( ca_depasse || collision);
