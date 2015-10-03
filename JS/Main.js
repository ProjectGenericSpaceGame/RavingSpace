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
var enemies;
var enemy1;
var enemy2;
var enemy3;
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
var lap = 1;
var spawnNext = "undefined";
var waiter;
//Väliaikaiset demomuuttujat
//Nämä ovat esimerkiksi tietokannasta tulevia arvoja ennen kuin itse tietokantaa on tehty
var attackInfo = "231509'302112'352713"; //jaetaan kahden sarjoihin ja kuuden sarjoihin, 23, 15, 09|30,21,12|35,27,13

function randNumber(){
		var randNumbers =[]; // [0] vihollinen , [1] vihollisen spawninopeus
		var x = 0;
	    var y = 0;
	
		switch(lap) {
		case 1: do {
			x = Math.round(Math.random() * 100) /10;
		} while( x <= 1.0 || x >= 5.9 ); 
			break;
		
		case 2: do {
			x = Math.round(Math.random() * 100) /10;
		} while( x <= 1.0 || x >= 4.9 ); 
			break; 
		
		case 3: do {
			x = Math.round(Math.random() * 100) /10;
		} while( x <= 1.0 || x >= 3.9 ); 
			break;
		};
	
		randNumbers[1] = x; 
	 
	 // Generoi randomilla vihollisen väliltä 1 -3 
	 do {
		 y = Math.floor((Math.random() * 10) + 1);
	 } while(
		y != 1 &&
		y != 2 &&
		y != 3 
	 );
	 randNumbers[0] = y; 
	 console.log(randNumbers[0], randNumbers[1]);
	 return randNumbers; 
}
//Luodaan uusi vihollinen ja tarkistetaan onko kierros loppu
function spawnEnemy(randNumbers){
	if(enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false)!= null){//jos poolissa on vielä aluksia
		enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false).reset((ship.body.x+100),ship.body.y);
	}
	if(enemy1.length == 0 && enemy2.length == 0 && enemy2.length == 0) //jos kaikki viholliset on tuhottu (peli käyttää destroyta)
	{
		lap++;
		enemy1 = enemies.getChildAt(lap-1).getChildAt(0);//tällä hetkellä kaatuu kun kierros kolme ohi koska tapahtuu outOfBounds, käytetään lap arvo 4:jää pelin päättymisen seuraamiseen
		enemy2 = enemies.getChildAt(lap-1).getChildAt(1);
		enemy3 = enemies.getChildAt(lap-1).getChildAt(2);
	}
	spawnNext = true;
}

