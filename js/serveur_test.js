//============================ Serveur du Site ==========================//

"use strict";

var fs = require("fs");
var http = require("http");
var url = require("url");

var serveur;
var port;

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");

var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");

var traiter_requete = function (req,res) {
	var requete;
	var pathname;
	var query;
	var path = require("path");
	var ressource;
	
	requete = url.parse(req.url,true);
	pathname = requete.pathname;
	query = requete.query
	try{
		ressource = fs.readFileSync("../../index.html", "UTF-8");
		res.writeHead(200,{'Content-Type' : 'text/html'});
		res.write(ressource);
		res.end();
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
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}

	console.log("Requete : "+req.url);


};

serveur = http.createServer(traiter_requete);
port = 5000;
console.log("Serveur en écoute sur le port : " +port);
serveur.listen(port);
