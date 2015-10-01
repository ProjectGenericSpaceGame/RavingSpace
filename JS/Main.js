//Pelin funktio
var game = new Phaser.Game(1280, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//Kommentoitu että käynnistää pelin demolua varten
//game.stop();
//Päävalikko
var menu = new Phaser.Game(1280, 800, Phaser.AUTO, '', { preload: menu_preload, create: menu_create, update: menu_update });
//Ettei aja päävalikkoa demoiluaikana
menu.stop;
//globaalit muuttujat
var asteroids;
var ship;
var cursors;
var bg;
var Ycoord;
var Xcoord;
var r;
var deg = "0"; //deg on radiaani arvo
var degWas = 0; //last mouse position
var text;
var style;
var pi = Math.PI;
var shipRot;
var direct;
var corRot;
var corDeg;
var flipped = false;
var execTime = 0;
var IntMouseTrack = -1;
var moving = false;
var genRand;
var shipTrail;