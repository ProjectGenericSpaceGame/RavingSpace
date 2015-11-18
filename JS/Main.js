
var game;
const SET_GUNS = 4;//DO NOT MODIFY OR GAME WILL BREAK
const SET_ABILITIES = 4;//DO NOT MODIFY OR GAME WILL BREAK
var rnd; 

$(document).ready(function(){
// kirjautumisruutu / rekisteröitymisruutu
    $('.login').click(function(){
        var other =  $('.signupDialog').css("display");
        if(other == "block"){
            $('.signupDialog').css("display","none");
        }
        $('.loginDialog').css("display","block");
    });

    $('.cancelLogin').click(function(){
        $('.loginDialog').css("display","none");
        $('.signupDialog').css("display","none");
    });

    $('.loginCheck').click(function(){
        var pss =  $('.password').val();
        var user = $('.username').val();
        //console.log(lel);
        var getFromDB = $.ajax({
            method:"POST",
            async:false,//poistetaan myöhemmin kun implementoidaan latausruutu pyörimään siksi aikaa että vastaa
            url:"PHP/CryptoHandler/serveSalt.php",
            data:{playerName:user}
        });
        getFromDB.done(function(returnValue){
            var genSalt = getRandom();
            var saltyhash = pss + returnValue;
            var sh = hashPass(saltyhash);
            var ssh = hashPass((pss+genSalt)) + genSalt; 
        
            var putToDB = $.ajax({
                method:"POST",
                async:false,
                url:"PHP/CryptoHandler/loginHandler.php",
                data:{data:{givenHash:sh,newHash:ssh,userName:user}}
            });
            putToDB.done(function(returnValue){
                if(returnValue == true){
                    makeGame();
                    $('.loginDialog').css("display","none");
                    $('.signupDialog').css("display","none");
                } else if (returnValue == "credsFirst") {
                    console.log('salis on väärin tai käyttäjä nimi on väärin');
					makeGame();
                } else if(returnValue == "lock"){
                    console.log("olet yrittänyt kirjautumista liian monta kertaa! yritä 200vuoden päästä uudestaan");
					makeGame();
                } else if(returnValue == "creds") {
                    console.log("jotain");
					makeGame();
                } else{ // demoamiseen
                    makeGame();
                     $('.loginDialog').css("display","none");
                    $('.signupDialog').css("display","none");
                }
            });
            putToDB.fail(function(){
                console.log("username or password is incorrect or database unreachable");
            });
        
        });
        getFromDB.fail(function(){
            alert("database unreachable!")
        });
    }); 

    // hankitaan uusi suola
    function getRandom(){
        var possible = "b8EFGHdefMNTUXYZVghiOC#¤%KaIJP)=?@56opA£QRL\"&WtSjklmyncu/(\$\^\*\'vw34sxD79Bqrz012\!";
        var length = 10;
        var rnd = new Nonsense();
        var toPick = [];
        var randString = "";
        for(var j = 0;j < length;j++){
            toPick = [];
            for(var i = 0;i < length;i++){
                toPick.push(possible.charAt(rnd.integerInRange(0,possible.length-1)));
            }
            randString += rnd.pick(toPick);
        }
    return randString;
    }

    function hashPass(pss){
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(pss);
        var hash = shaObj.getHash("HEX");
        console.log(hash);
        return hash;
    }
    
    $('.password-retype').on('input', function() {
        // tarkistetaan, että salasanat täsmäävät
        var check = checkRegisterInfo();
        if(check == false){
            $('.password-retype').css("border","2px solid #a50716");
            $('.password-retype').css("margin","26px 48px 0px 20px");
        } else{
            $('.password-retype').css("border","2px solid #07a547");
            $('.password-retype').css("margin","26px 48px 0px 20px");
        }
    });
    // login -painike rekisteröitymisruudussa
    $('.register').click(function(){
        var givenUserName = $('.username-register').val();
        console.log(givenUserName);
        var check = checkRegisterInfo();
        // tarkistetaan, että salanat ovat samat ja käyttäjänimeksi on syötetty jotain
        if(check == true && givenUserName.length != 0){
            console.log('tadaa');
            $('.signupDialog').css("display","none");
            makeGame();
        } else {
            console.log('noTadaa');
        }
    });
    // salasana kenttien tarkistus
    function checkRegisterInfo(){
        var first = $('.password-register').val();
        var second = $('.password-retype').val();
        if(first != second){
            return false;
        } else{
            return true;
        }
    }
    
    $('.signUp').click(function(){
        var other =  $('.loginDialog').css("display");
        if(other == "block"){
            $('.loginDialog').css("display","none");
        }
        $('.signupDialog').css("display","block");
    });

    $('.info').hover(function(){
        $('.infoDialog').css("display","block");
    });

    $('.info').mouseout(function(){
        $('.infoDialog').css("display","none");
    });
    // kirjautumis/rekisteröitymisruutu loppuu
});

//Pelin funktio
function makeGame(){
    $('.loginDialog').css("display","none");
    $('.signupDialog').css("display","none");
    $('.cont').css("display","none");
	$('.loginDialog').css("display","none");
    $('.signupDialog').css("display","none");
    $('main').css("position","relative");
    $('main').css("top","-76px");
//$('header').css("display","none");
game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'phaserGame');
rnd = game.rnd;   
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
}
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
document.addEventListener( "contextmenu", function(e) {
    e.preventDefault();
});
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
    randNumbers[2] = parseInt(spawnCoordX+1-1);
    randNumbers[3] = parseInt(spawnCoordY+1-1);
    spawnCoordX = null;
    spawnCoordY = null;
    //console.log(randNumbers[0], randNumbers[1]);
    return randNumbers;
}

//Ampumisfunktio
function fire(bullets,gun,fireRate,deg,ship,enemiesCollisonGroup) {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();
        bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
        if(gun.name == "laser"){
			//gun.revive();
			//bullet.scale.setTo(1,4);
			bullet.rotation = ship.rotation;
			bullet.name = "laser";
            game.physics.arcade.moveToPointer(bullet, 2000);
			/*game.time.events.add(250,function(){
				gun.kill();
				gun.renderable = false;
			},this);*/
        } else if(gun.name == 'mines'){
            bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet.name = "mine";
        }
        else {
			bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
			bullet.scale.setTo(1,1);
            bullet.name = "basic";
            game.physics.arcade.moveToPointer(bullet, 330);
        }





        /*var pointX;
        var pointY;
        if(deg < 1.6+pi/2){//right bottom
            pointX = ship.x+50;
            if(deg != 1.6) {
                pointY = ship.y + (Math.tan(deg - pi / 2) * 50)+0.1;//+0.1 on virheen korjausta
            } else {
                pointY = ship.y+2.5;//tämä korjaa phaserin bugisuutta koska laskee luodin sijainnin jostain syystä siihen mihin sen pitäisi mennä
                bullet.x = ship.x+25; //korjataan luodin sijaintia (JS matematiikka virhe tekee kepposiaan)
            }
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
            if(deg != 7.8) {
                pointY = ship.y - 50 / (Math.tan(deg - pi * 2));
            } else {
                pointY = ship.y-2.5;//tämä korjaa phaserin bugisuutta koska laskee luodin sijainnin jostain syystä siihen mihin sen pitäisi mennä
                bullet.x = ship.x+25; //korjataan luodin sijaintia (JS matematiikka virhe tekee kepposiaan)
            }
        }
        game.physics.arcade.moveToXY(bullet, pointX,pointY,330);*/
        //ship.body.x = pointX;
        //ship.body.y = pointY;
        return true;
    } else {
        return false;
    }

}
function enemyFire(user,gun,enemyBullets,fireRate,target){
    var bullet = enemyBullets.getFirstDead();
    if(user.key == 'commander'){
        if(game.time.now > user.nextFire && enemyBullets.countDead() > 0){
            user.nextFire = game.time.now + fireRate;
            bullet.reset(gun.world.x, gun.world.y);
            bullet.alpha = 1;
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    }
    else if(user.key == 'hunter') {
        if(game.time.now > user.nextFire && enemyBullets.countDead() > 0){
            user.nextFire = game.time.now + fireRate;
            var bullet = enemyBullets.getFirstExists(false);
            bullet.reset(gun.world.x, gun.world.y);
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    } else if(user.key == 'destroyer'){
        if(game.time.now > user.nextFire && enemyBullets.countDead() > 0){
            user.nextFire = game.time.now + fireRate;
            bullet.reset(user.body.x, user.body.y);
            bullet.alpha = 0;
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    }
}
function hitDetector(bullet, enemy, enemyAmount,lap,HPbar){
    var dmg;
    if(bullet.name == "laser"){
        dmg = 0.1;
    } else if(bullet.name == "mine") {
        bullet.kill();
    } else if(bullet.key == "boom") {
        dmg = 2.5;
    } else {
        dmg  = 0.25;
        bullet.kill();
    }

    //console.log("got this far?");
    if((enemy.health-dmg) <= 0 && enemy.health != 0.001){
        enemy.health = 0.001;

        if(enemyAmount != null) {//enemyAmount on null jos kutsuja oli playerHit funktio (eli pelaajaan osuttiin)
            enemyAmount[lap - 1]--;
        } else {
            enemy.dying = true;
            HPbar.getChildAt(1).width = 0;
            game.time.events.add(10000,function(){
                enemy.reset(game.world.width/2,game.world.height/2,3);
                enemy.dying = false;
            },this);
            var tweenHealth = game.add.tween(HPbar.getChildAt(1));
            tweenHealth.frameBased = true;
            tweenHealth.to({width:HPbar.fullHealthLength},1000,"Linear",true,9000);
            var tweenRespawn = game.add.tween(HPbar.getChildAt(0));
            tweenRespawn.frameBased = true;
            tweenRespawn.to({width:HPbar.fullHealthLength},10000,"Linear",true);
            tweenRespawn.onComplete.add(function(){HPbar.getChildAt(0).width = 0;},this);
        }

        //räjähdys kuolessa
        var boom = game.add.sprite(0,0,'boom');
        //boom.x = enemy.body.x-boom.width*0.1/2;
        //boom.y = enemy.body.y-boom.height*0.1/2;
        boom.scale.setTo(0.1,0.1);
        enemy.addChild(boom);
        var tween = game.add.tween(boom);
        tween.frameBased = true;
        var to = rnd.realInRange(9,11);
        tween.to({height:boom.height*to,y:boom.y-(boom.height*to-boom.height)/2,width:boom.width*to,x:boom.x-(boom.width*to-boom.width)/2}, 300, "Linear", true, 0,1);
        tween.onComplete.add(function(){
            boom.destroy();
        },this);
        var boom2 = game.add.sprite(0,0,'boom2');//Toinen räjähdys samaan
        //boom2.x = enemy.body.x-boom.width*0.1/2+rnd.integerInRange(-3,3);
        boom2.x = rnd.integerInRange(-3,3);
        //boom2.y = enemy.body.y-boom.height*0.1/2+rnd.integerInRange(-3,3);
        boom2.y = rnd.integerInRange(-3,3);
        boom2.scale.setTo(0.1,0.1);
        enemy.addChild(boom2);
        var tween2 = game.add.tween(boom2);
        tween2.frameBased = true;
        var to2 = rnd.realInRange(7,5);
        tween2.to({height:boom2.height*to2,y:boom2.y-(boom2.height*to2-boom2.height)/2,width:boom2.width*to2,x:boom2.x-(boom2.width*to2-boom2.width)/2}, rnd.integerInRange(300,600), "Linear", true, 150);
        tween2.onComplete.add(function(){
            boom2.destroy();
            enemy.kill();
            if((enemy.name == 0 || enemy.name == 1 || enemy.name == 2) && enemy.name !== ""){
                if(enemy.ray !== null){
                    //enemy.ray.clear();
                    enemy.ray = null;
                    enemy.wait = 0;
                }
            }
        },this);
    } else if(enemy.health > dmg){
        enemy.health -= dmg;
            if(enemy.key == 'ship'){
                HPbar.getChildAt(1).width = HPbar.fullHealthLength*(enemy.health/3);
            }
			else{
                HPbar.renderable = true;
				HPbar.alpha = 1;
				HPbar.lastHit = Date.now();
				game.time.events.add(2000, function(){
					if(Date.now()-HPbar.lastHit>1500){
						HPbar.renderable = false;
						HPbar.alpha = 0;
					}
				});
                //alert(HPbar.getChildAt(1).width);
                //HPbar.getChildAt(1).body.x = 10.6;
                //HPbar.getChildAt(1).body.offset = 0;
                //HPbar.getChildAt(1).x = HPbar.zeroPosition;
                //HPbar.getChildAt(1).x = 10.6;
                //HPbar.getChildAt(1).anchor.x = 0;
                //HPbar.getChildAt(1).x -= 33.4;
                //HPbar.getChildAt(1).body.width = HPbar.fullHealthLength*(enemy.health/2.5);
                HPbar.getChildAt(1).width = HPbar.fullHealthLength*(enemy.health/enemy.maxHealth);
                //HPbar.getChildAt(1).anchor.x = 1;
                //alert(HPbar.zeroPosition);
                //alert(HPbar.getChildAt(1).x+""+HPbar.getChildAt(1).anchor);
                //alert(HPbar.x);
            }
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
function spawnEnemy(spawnPool,enemyAmount,enemies,lap,enColGrp){
    var randNumbers = randNumber();
    var repeat = true;
    if(spawnPool[lap-1] > 0){//jos poolissa on vielä aluksia
        while(repeat){
            if (enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstExists(false) != null)
            {
                var enemy = enemies.getChildAt(lap-1).getChildAt((randNumbers[0]-1)).getFirstDead();
                enemy.reset(randNumbers[2],randNumbers[3]);
					
					enemy.health = enemy.maxHealth;
                    enemy.getChildAt(0).getChildAt(1).anchor.x = 0;
                    enemy.getChildAt(0).getChildAt(1).width = enemy.getChildAt(0).fullHealthLength;
					enemy.getChildAt(0).getChildAt(1).x = -(enemy.getChildAt(0).getChildAt(1).width/2);//mitä helvettiä
                    enemy.getChildAt(0).getChildAt(1).body.x = -(enemy.getChildAt(0).getChildAt(1).width/2);
					enemy.getChildAt(0).getChildAt(1).y = 0;//mitä helvettiä
                    enemy.getChildAt(0).getChildAt(1).body.y = 0;
                    

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
    if(enemyAmount[lap-1] == 0) //jos kaikki viholliset on tuhottu
    {
        spawnNext = true;
        randNumbers = null;
        repeat = null;
        return "next";
    }
    spawnNext = true;
    randNumbers = null;
    repeat = null;
    return null;
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
    Ycoord = null;
    Xcoord = null;
    return parseFloat(degr+1-1);
}
function reload(reloadSprite,clips,pos,HUD,gun){
    if (reloadSprite.alive == false) {
        reloadSprite.reset();
        reloadSprite.body.rotation = 0;
        reloadSprite.rotation = 0;
        reloadSprite.y = game.input.activePointer.worldY+reloadSprite.height/2;
        reloadSprite.x = game.input.activePointer.worldX+reloadSprite.width/2;
    }
    var reloadTween = game.add.tween(reloadSprite.body);
    reloadTween.frameBased = true;
    reloadTween.to({rotation: 2*pi}, gun.reload, "Linear", true, 0, 1);
    reloadTween.frameBased = true;
    var tray  = HUD.webTray.getChildAt(1).getChildAt((HUD.webTray.trayPosition)*2-1);
    tray.alpha = 1;
    var trayTween = game.add.tween(tray);
    trayTween.frameBased = true;
    trayTween.to({y:(tray.y+tray.height)},gun.reload,"Linear",true,0);
    trayTween.onComplete.add(function(){
        tray.y = 22;
        tray.alpha = 0;
    });
    game.time.events.add(gun.reload, function (){
        clips[pos] = gun.clip;
        reloading[pos] = false;
        //reloadTween.stop();
        reloadSprite.kill();
        $("canvas").css("cursor","url('assets/sprites/cursor.png'),none");
    }, this);
    //waiter.start();
    reloading[pos] = true;
    $("canvas").css("cursor","none");
    //return reloadSprite;

    //$("canvas").css("cursor","url('assets/sprites/reload.png'),none");

}
function checkRange(x,y,x2,y2,usage,off){
    if(!off > 0){off = 0}
    var dist = this.game.math.distance(x,y,x2,y2);//x2  &y2 = target
    if(dist-off < 100 && usage == 1){
        dist = null;
        usage = null;
        return true;
    } else if(dist < 200 && usage == 4){
        dist = null;
        usage = null;
        return true;
    } 
	else if(dist < 300 && usage == 2){
        dist = null;
        usage = null;
        return true;
    } else if(dist < 400 && usage == 3){
        dist = null;
        usage = null;
        return true;
    }
    else {
        dist = null;
        usage = null;
        return false;
    }
}

