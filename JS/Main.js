//Pelin funktio
var game = new Phaser.Game(1280, 800, Phaser.CANVAS, '');
var rnd = game.rnd;
const SET_GUNS = 4;//DO NOT MODIFY OR GAME WILL BREAK
const SET_ABILITIES = 4;//DO NOT MODIFY OR GAME WILL BREAK


game.state.add('mainMenu', mainMenu);
game.state.add('menuLoad', menuLoad);
//game.state.add("customMenu", customMenu);
game.state.add('settings', settingsSubMenu);
game.state.add('soundMenu', soundMenu);
game.state.add('scores', scoresSubMenu);
game.state.add('custom', customSubMenu);
game.state.add('shopMenu', shopMenu);
game.state.add('waveMenu', waveMenu);
game.state.add('gameLoad', gameLoad);
game.state.add('mainGame', mainGame);
game.state.add('loadoutMenu', loadoutMenu);

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
    var spawnCoordX;
    var spawnCoordY;

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
    }

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
    //generoidaan random dataa vihollisen syntyä varten
    switch(rnd.integerInRange(1,4)){
        case 1://top
            spawnCoordX = rnd.integerInRange(100,game.world.width-100);
            spawnCoordY = -50;
            break;
        case 2://left
            spawnCoordX = game.world.width+50;
            spawnCoordY = rnd.integerInRange(100,game.world.height-100);
            break;
        case 3://bottom
            spawnCoordX = rnd.integerInRange(100,game.world.width-100);
            spawnCoordY = game.world.height+50;
            break;
        case 4://right
            spawnCoordX = -50;
            spawnCoordY = rnd.integerInRange(100,game.world.height-100);
            break;
    }
    randNumbers[2] = spawnCoordX;
    randNumbers[3] = spawnCoordY;
    //console.log(randNumbers[0], randNumbers[1]);
    return randNumbers;
}

//Ampumisfunktio
function fire(bullets,gun,fireRate,deg,ship) {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);

        bullet.reset(gun.world.x, gun.world.y);

        //game.physics.arcade.moveToPointer(bullet, 330);
        var pointX;
        var pointY;
        if(deg < 1.6+pi/2){//right bottom
            pointX = ship.x+50;
            pointY = ship.y+(Math.tan(deg-pi/2)*50);
        } else if(deg < 1.6+pi){//left bottom
            pointX = ship.x-50;
            pointY = ship.y+50/(Math.tan(deg-pi));
        } else if(deg < 1.6+3*pi/2){//upper left
            pointX = ship.x-50;
            if(deg != 6.3) {
                pointY = ship.y - (Math.tan(deg - 3 * pi / 2) * 50);
            } else {
                pointY = ship.y - (Math.tan(1.57) * 50);//Tästä tulisi normaalisti taniin 1.5755 joka antaa negatiivisia arvoja (1.5755 on asteina 90.1)
            }

        } else {//upper right
            pointX = ship.x+50;
            pointY = ship.y-50/(Math.tan(deg-pi*2));
        }
        game.physics.arcade.moveToXY(bullet, pointX,pointY,330);
        //ship.body.x = pointX;
        //ship.body.y = pointY;
        return true;
    } else {
        return false;
    }

}
function enemyFire(user,gun,enemyBullets,fireRate,target){
    if(user.key == 'commander'){
        if(game.time.now > user.nextFire && enemyBullets.countDead() > 0){
            user.nextFire = game.time.now + fireRate;
            var bullet = enemyBullets.getFirstExists(false);
            bullet.reset(gun.world.x, gun.world.y);
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    }
}
function hitDetector(bullet, enemy, enemyAmount,lap){
    bullet.kill();
    //console.log("got this far?");
    if((enemy.health-0.25) <= 0){
        if(enemyAmount != null) {
            enemyAmount[lap - 1]--;
        } else {
            game.time.events.add(10000,function(){
                enemy.reset(600,500,3);
            },this);
        }
        var boom = game.add.sprite(0,0,'boom');
        boom.x = enemy.body.x-boom.width*0.1/2;
        boom.y = enemy.body.y-boom.height*0.1/2;
        boom.scale.setTo(0.1,0.1);
        var tween = game.add.tween(boom);
        var to = rnd.realInRange(5,7);
        //tween.to({height:boom.height*to,y:boom.y-(boom.height*to-boom.height),width:boom.width*to,x:boom.x-(boom.width*to-boom.width)}, 300, "Linear", true, 0);
        tween.to({height:boom.height*to,y:boom.y-(boom.height*to-boom.height)/2,width:boom.width*to,x:boom.x-(boom.width*to-boom.width)/2}, 300, "Linear", true, 0,1);
        //tween.to({height:boom.height*to,width:boom.width*to}, 300, "Linear", true, 0);
        tween.onComplete.add(function(){boom.destroy();enemy.kill();},this);
        var boom2 = game.add.sprite(0,0,'boom2');
        boom2.x = enemy.body.x-boom.width*0.1/2+rnd.integerInRange(-3,3);
        boom2.y = enemy.body.y-boom.height*0.1/2+rnd.integerInRange(-3,3);
        boom2.scale.setTo(0.1,0.1);
        var tween2 = game.add.tween(boom2);
        var to2 = rnd.realInRange(3,5);
        //tween.to({height:boom.height*to,y:boom.y-(boom.height*to-boom.height),width:boom.width*to,x:boom.x-(boom.width*to-boom.width)}, 300, "Linear", true, 0);
        tween2.to({height:boom2.height*to2,y:boom2.y-(boom2.height*to2-boom2.height)/2,width:boom2.width*to2,x:boom2.x-(boom2.width*to2-boom2.width)/2}, 300, "Linear", true, 150);
        //tween.to({height:boom.height*to,width:boom.width*to}, 300, "Linear", true, 0);
        tween2.onComplete.add(function(){boom2.destroy()},this);
    } else {
        enemy.health -= 0.25;
    }
}


function asteroidHitDetector(bullet, asteroid, asteroidAmmount){
    bullet.kill();
    if((asteroid.health-0.25) <= 0 ){
        asteroid.kill();
        asteroidAmmount -= 1;
        if(asteroidAmmount == null){
            console.log("Game Over");
        }

    } else {
        asteroid.health -= 0.25;
    }
}

//Luodaan uusi vihollinen ja tarkistetaan onko kierros loppu
function spawnEnemy(spawnPool,enemyAmount,enemies,lap,ship,plrColGrp,enColGrp){
    var randNumbers = randNumber();
    var repeat = true;
    if(spawnPool[lap-1] > 0){//jos poolissa on vielä aluksia
        while(repeat){
            if (enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false) != null)
            {
                var enemy = enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false);
                enemy.reset(randNumbers[2],randNumbers[3]);
                if(enemy.key == "commander"){enemy.health = 2.5;}
                enemy.body.setCollisionGroup(enColGrp);
                //enemy.body.collides([enColGrp,plrColGrp]);//törmäykset asetetaan kun vihu on päässyt pelialueelle
                //enemy.body.collideWorldBounds = false; //salli tämä rivi kun tekoäly paikallaan, estää kolmioiden lentämisen pelialueelle suurella nopeudella
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


// Resisez the game based on the window size

function resizeGame() {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var widthScale = windowWidth/1280;
    var heightScale = windowHeight/800;
    /*if (windowWidth <= PELIMAAILMAN KOKO){
     //if (game.scale > 1) game.scale = 1;

     //if (windowWidth !== game.width){
     //game.width = windowWidth*widthScale;
     //game.height = windowHeight*heightScale;
     game.camera.width = windowWidth;
     game.camera.height = windowHeight;

     game.world.setBounds(0,0,windowWidth*widthScale,windowHeight*heightScale)
     //game.height = windowHeight*heightScale;

     if (game.renderType === Phaser.WEBGL){
     game.renderer.resize(windowWidth, windowHeight);
     }
     //}
     //}*/
    game.scale.scaleMode = 0;
}	// By Roni 2015
function formatWave(data){
    var formatted = {"waveStruct":"","waveStatus":"Unused","profit":0};
    var struct = ""+data[0][0]+""+data[0][1]+""+""+data[0][2]+"'"+data[1][0]+""+data[1][1]+""+""+data[1][2]+"'"+data[2][0]+""+data[2][1]+""+""+data[2][2]+"";
    formatted.waveStruct = struct;
    return formatted;
}
function acquireTarget(target,enemy){

    var Ycoord = enemy.body.y-target.body.y;
    var Xcoord = target.body.x-enemy.body.x;
    if(Xcoord == 0){Xcoord+=0.1}
    if(Ycoord == 0){Ycoord+=0.1}
    var degr;
    switch(true){
        case (Xcoord > 0 && Ycoord > 0):
            degr = Math.atan(Ycoord/Xcoord);
            break;
        case (Xcoord < 0 && Ycoord > 0):
            degr = (Math.atan(((Xcoord/Ycoord)*(0-1))))+(pi/2);
            break;
        case (Xcoord < 0 && Ycoord < 0):
            degr = (Math.atan(Ycoord/Xcoord))+pi;
            break;
        case (Xcoord > 0 && Ycoord < 0):
            degr = (Math.atan((Xcoord/Ycoord)*(0-1)))+((3*pi)/2);
            break;
        default:
        ////console.log("lol");
    }
    degr = pi*(2+1/2)-degr;
    return degr;

}

