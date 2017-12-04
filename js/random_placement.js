"use strict"
var p1;
var p2;
var p3;
var p4;
var random;
var kap1 = Math.floor(Math.random() * 100);
var kap2 = Math.floor(Math.random() * 4) + 1;



var fs = require("fs");

do {

random = Math.floor(Math.random() * 2) + 1;

p1 = Math.floor(Math.random() * 100);
	if (random === 1) {
		p2 = p1 + 1
		p3 = p2 + 1
		p4 = p3 + 1
	} else {
		p2 = p1 + 10
		p3 = p2 + 10
		p4 = p3 + 10
	}
} while (p4 > 100);
console.log(p1 + " " + p2 + " " + p3 + " " + p4);

console.log("Bateaux 1 case : ")
console.log("[[{" + '"p"' + ":" + '"' + kap1 + '"' + "," + '"n":' + '"' + kap2 + '","v":"' + '0"}]');
console.log(" ");
do {
	var kap3 = Math.floor(Math.random() * 100);
	var kap4 = Math.floor(Math.random() * 4) + 1;
} while(kap4 === kap2 && kap3 === kap1);
console.log("[[{" + '"p"' + ":" + '"' + kap3 + '"' + "," + '"n":' + '"' + kap4 + '","v":"' + '0"}]');
console.log(" ");
do {
	do {
		var kap5 = Math.floor(Math.random() * 100);
		var kap6 = Math.floor(Math.random() * 4) + 1;
	} while(kap6 === kap2 || kap6 === kap4);
} while(kap5 === kap3 || kap5 === kap1)
console.log("[[{" + '"p"' + ":" + '"' + kap5 + '"' + "," + '"n":' + '"' + kap6 + '","v":"' + '0"}]');
console.log(" ");
do {
	do {
		var kap7 = Math.floor(Math.random() * 100);
		var kap8 = Math.floor(Math.random() * 4) + 1;
	} while(kap8 === kap2 || kap8 === kap4 || kap8 === kap6);
} while(kap7 === kap5 || kap7 === kap3 || kap7 === kap1)
console.log("[[{" + '"p"' + ":" + '"' + kap7 + '"' + "," + '"n":' + '"' + kap8 + '","v":"' + '0"}]');
console.log(" ");

console.log("Bateaux 2 cases : ");
do {
	var bat2_1_1 = Math.floor(Math.random() * 100)
	var bat2_1_1n = 5
} while(bat2_1_1 === kap1 || bat2_1_1 === kap3 || bat2_1_1 === kap5 || bat2_1_1 === kap7)
console.log("[[{" + '"p"' + ":" + '"' + bat2_1_1 + '"' + "," + '"n":' + '"' + bat2_1_1n + '","v":"' + '0"}]');
do {
	random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) {
		var bat2_1_2 = bat2_1_1 + 1
	} else {
		var bat2_1_2 = bat2_1_1 + 10
	}
} while(bat2_1_2 === bat2_1_1 || bat2_1_2 === kap1 || bat2_1_2 === kap3 || bat2_1_2 === kap5 || bat2_1_2 === kap7)
	var bat2_1_2n = 5
console.log("[[{" + '"p"' + ":" + '"' + bat2_1_2 + '"' + "," + '"n":' + '"' + bat2_1_2n + '","v":"' + '0"}]]');
console.log(" ")
do {
	var bat2_2_1 = Math.floor(Math.random() * 100)
	var bat2_2_1n = 6
} while(bat2_2_1 === kap1 || bat2_2_1 === kap3 || bat2_2_1 === kap5 || bat2_2_1 === kap7)
console.log("[[{" + '"p"' + ":" + '"' + bat2_2_1 + '"' + "," + '"n":' + '"' + bat2_2_1n + '","v":"' + '0"}]');
do {
	random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) {
		var bat2_2_2 = bat2_2_1 + 1
	} else {
		var bat2_2_2 = bat2_2_1 + 10
	}
} while(bat2_2_2 === bat2_2_1 || bat2_2_2 === bat2_1_2 || bat2_2_2 === bat2_1_1|| bat2_2_2 === kap1 || bat2_2_2 === kap3 || bat2_2_2 === kap5 || bat2_2_2 === kap7)
	var bat2_2_2n = 6
console.log("[[{" + '"p"' + ":" + '"' + bat2_2_2 + '"' + "," + '"n":' + '"' + bat2_2_2n + '","v":"' + '0"}]]');
console.log("")
do {
	var bat2_3_1 = Math.floor(Math.random() * 100)
	var bat2_3_1n = 7
} while(bat2_3_1 === kap1 || bat2_3_1 === kap3 || bat2_3_1 === kap5 || bat2_3_1 === kap7 || bat2_3_1 === bat2_1_2 || bat2_3_1 === bat2_1_1 || bat2_3_1 === bat2_2_1 || bat2_3_1 === bat2_2_2)
console.log("[[{" + '"p"' + ":" + '"' + bat2_3_1 + '"' + "," + '"n":' + '"' + bat2_3_1n + '","v":"' + '0"}]');
do {
	random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) {
		var bat2_3_2 = bat2_3_1 + 1
	} else {
		var bat2_3_2 = bat2_3_1 + 10
	}
} while(bat2_3_2 === bat2_3_1 || bat2_3_2 === kap1 || bat2_3_2 === kap3 || bat2_3_2 === kap5 || bat2_3_2 === kap7)
	var bat2_3_2n = 7
console.log("[[{" + '"p"' + ":" + '"' + bat2_3_2 + '"' + "," + '"n":' + '"' + bat2_3_2n + '","v":"' + '0"}]]');
console.log(" ")
console.log("Bateaux 3 cases : ")
do {
	var bat3_1_1 = Math.floor(Math.random() * 100)
	var bat3_1_1n = 8
} while(bat3_1_1 === kap1 || bat3_1_1 === kap3 || bat3_1_1 === kap5 || bat3_1_1 === kap7)
console.log("[[{" + '"p"' + ":" + '"' + bat3_1_1 + '"' + "," + '"n":' + '"' + bat3_1_1n + '","v":"' + '0"}]');
do {
	random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) {
		var bat3_1_2 = bat3_1_1 + 1
		var bat3_1_3 = bat3_1_2 + 1
	} else {
		var bat3_1_2 = bat3_1_1 + 10
		var bat3_1_3 = bat3_1_2 + 10
	}
} while(bat3_1_2 === bat2_3_1 || bat3_1_2 === bat2_3_2 || bat3_1_2 === bat2_2_1 || bat3_1_2 === bat2_1_2 || bat3_1_2 === bat2_1_1 || bat3_1_2 === bat2_2_2 || bat3_1_2 === kap1 || bat3_1_2 === kap3 || bat3_1_2 === kap5 || bat3_1_2 === kap7)
	var bat3_1_2n = 8
console.log("[[{" + '"p"' + ":" + '"' + bat3_1_2 + '"' + "," + '"n":' + '"' + bat3_1_2n + '","v":"' + '0"}]]');
do {
	var bat3_1_3 = Math.floor(Math.random() * 100)
	var bat3_1_3n = 8
} while(bat3_1_3 === kap1 || bat3_1_3 === kap3 || bat3_1_3 === kap5 || bat3_1_3 === kap7 || bat3_1_3 === bat2_3_1 || bat3_1_3 === bat2_3_2 || bat3_1_3 === bat2_2_1 || bat3_1_3 === bat2_1_2 || bat3_1_3 === bat2_1_1 || bat3_1_3 === bat2_2_2)
/*do {
	random = Math.floor(Math.random() * 2) + 1;
	if (random === 1) {
	} else {
		var bat3_1_3 = bat3_1_2 + 10
	}
} while(bat3_1_3 === bat2_3_1 || bat3_1_3 === bat2_3_2 || bat3_1_3 === bat2_2_1 || bat3_1_3 === bat2_1_2 || bat3_1_3 === bat2_1_1 || bat3_1_3 === bat2_2_2 || bat3_1_3 === bat3_1_2 || bat3_1_3 === bat3_1_1 || bat3_1_3 === kap1 || bat3_1_3 === kap3 || bat3_1_3 === kap5 || bat3_1_3 === kap7) */
console.log("[[{" + '"p"' + ":" + '"' + bat3_1_3 + '"' + "," + '"n":' + '"' + bat3_1_3n + '","v":"' + '0"}]]');


