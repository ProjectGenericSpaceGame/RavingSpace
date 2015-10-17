//Pelin funktio
var game = new Phaser.Game(1280, 800, Phaser.AUTO, '');
//Kommentoitu että käynnistää pelin demolua varten
//game.stop();

game.state.add('mainMenu', mainMenu);
game.state.add('menuLoad', menuLoad);
//game.state.add("customMenu", customMenu);
game.state.add("settings", settingsSubMenu);
game.state.add('scores', scoresSubMenu);
game.state.add('custom', customSubMenu);
game.state.add('gameLoad', gameLoad);
game.state.add('mainGame', mainGame);

game.state.start('menuLoad');
// game.state.start("gameLoad");
/*
//globaalit muuttujat
var asteroids;
var ship;
var gun;
var bullets;
var fireRate = 450;
var nextFire = 0;
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
*/
function randNumber(lap){
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

//Ampumisfunktio
function fire(bullets,gun,fireRate) {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(gun.world.x, gun.world.y);

        game.physics.arcade.moveToPointer(bullet, 330);
    }

}
function hitDetector(bullet, enemy, enemyAmount,lap){
	bullet.kill()
	console.log("got this far?");
	if((enemy.health-0.25) <= 0){
		enemy.kill();
		enemyAmount[lap-1]--;
	} else {
		enemy.health -= 0.25;
	}
}
//Luodaan uusi vihollinen ja tarkistetaan onko kierros loppu
function spawnEnemy(spawnPool,enemyAmount,enemies,lap,ship){
	var randNumbers = randNumber();
	var repeat = true;
	if(spawnPool[lap-1] > 0){//jos poolissa on vielä aluksia
		while(repeat){
			if (enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false) != null)
			{
				enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false).reset((ship.body.x+100),ship.body.y);
				spawnPool[lap-1]--;
				repeat = false;
			} else {
				randNumbers = randNumber();
			}
		}
	}
	if(enemyAmount[lap-1] == 0) //jos kaikki viholliset on tuhottu (peli käyttää destroyta)
	{
                spawnNext = true;
                return "next";
	}
	spawnNext = true;
}

