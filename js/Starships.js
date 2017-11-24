//=========================================================================
// Site WEB demo PI
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");

var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");
var submit_case = require("./submit_case.js");
var jouer_case = require("./jouer_case.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/submit_case' :
				submit_case(req,res,query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
			case '/jouer_case':
				jouer_case(req, res, query);
				break;
			case '/img/bg.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bg.png"));
				res.end();
				break;
			case '/img/bga.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/bga.png"));
				res.end();
				break;
			case '/img/carree.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/carree.png"));
				res.end();
				break;
			case '/img/carre.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/carre.png"));
				res.end();
				break;
			case '/img/vert.png':
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.write(fs.readFileSync("../img/vert.png"));
				res.end();
				
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
