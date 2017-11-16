//============================ Serveur du Site ==========================//

"use strict";

var fs = require("fs");
var http = require("http");
var url = require("url")

var serveur;
var port;

var traiter_requete = function(req,res) {
	
	var requete;
	var pathname;
	var path = require("path");
	var ressource;

	requete = url.parse(req.url,true);
	pathname = requete.pathname;
	
	console.log("Requete : "+req.url);
	
	ressource = fs.readFileSync("index.html", "UTF-8");
	res.writeHead(200,{'Content-Type' : 'text/html'});
	res.write(ressource);
	res.end();

};

serveur = http.createServer(traiter_requete);
port = 5000;
console.log("Serveur en écoute sur le port : " +port);
serveur.listen(port);
