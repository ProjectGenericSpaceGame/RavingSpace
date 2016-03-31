

var game;
const SET_GUNS = 4;//DO NOT MODIFY OR GAME WILL BREAK
const SET_ABILITIES = 4;//DO NOT MODIFY OR GAME WILL BREAK
var rnd; 
var points = 0;
var enemiesKilled;
var deaths;
var totalTime;
var volumes = {
    master:0.5,
    music:0.5,
    sounds:0.5
};
var songName;
var stateChange = false; //we use this prevent end of song event during state change
mute = false;

//Pelin funktio
function makeGame(){
    
    $('.loginDialog').css("display","none");
    $('.signupDialog').css("display","none");
    $('.cont').css("display","none");
	$('.loginDialog').css("display","none");
    $('.signupDialog').css("display","none");
    $('main').css("position","relative");
    $('main').css("top","-75px");
    sessionStorage.setItem("startOrReturn","start");
    game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'phaserGame');
    $("main").css({height:"100%",width:"100%"});
    $("#phaserGame").css({height:"inherit"});
    $("canvas").css({height:"inherit",width:"inherit"});
rnd = game.rnd;   
game.state.add('mainMenu', mainMenu);
game.state.add('menuLoad', menuLoad);
game.state.add('setMenuLoader', setMenuLoader);
game.state.add("accountSettings", accountSettings);
game.state.add('settings', settingsSubMenu);
game.state.add('soundMenu', soundMenu);
game.state.add('scores', scoresSubMenu);
game.state.add('custom', customSubMenu);
game.state.add('shopMenu', shopMenu);
game.state.add('waveMenu', waveMenu);
game.state.add('workShop', workShop);
game.state.add('gamePreload', preload);
game.state.add('gameLoad', gameLoad);
game.state.add('mainGame', mainGame);
game.state.add('endGame', endGame);
game.state.add('loadoutMenu', loadoutMenu);

game.state.start('setMenuLoader');

    game.state.add('test',test);
   
}

document.addEventListener( "contextmenu", function(e) {
    e.preventDefault();
});
$(document).ready(function() {
    var time = new Date();
    var time2 = time.getTime();
    var delay = time+1;
        function logOff() {
            while(delay-time2 < 100){
                delay = time.getTime();
            }
            $.ajax({
                method: "POST",
                async: false,
                url: "PHP/SQLcontroller/updateData.php",
                data: {
                    playerRelatedData: sessionStorage.getItem("playerID"),
                    loginFollowID: sessionStorage.getItem("loginFollowID"),
                    location: window.location.href,
                    usage: 5
                }
            });
            return null;
        }

        document.getElementsByTagName("BODY")[0].onbeforeunload = logOff;



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
    return randNumbers;
}

//Ampumisfunktio
function fire(bullets,gun,fireRate,deg,ship,enemiesCollisonGroup,speedBonus) {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead(true);
        bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
        if(gun.name == "laser"){
            //gun.revive();
            //bullet.scale.setTo(1,4);
            bullet.rotation = ship.rotation;
            bullet.name = "laser";
            game.physics.arcade.moveToPointer(bullet, gun.bulletSpeed);

        } else if(gun.name == 'mines'){
            bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet.name = "mine";

        } else if (gun.name == 'shotgun'){
            var speed = gun.bulletSpeed*speedBonus;
            var x = game.input.worldX;
            var y = game.input.worldY;
            var distance = game.math.distance(x,y,gun.world.x,gun.world.y);
            var offsetX = (x+distance-x)*0.2;
            var offsetY = (y+distance-y)*0.2;
            bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet.scale.setTo(1,1);
            bullet.name = "shotgun";
            game.physics.arcade.moveToXY(bullet, x, y, speed);

            var bullet2 = bullets.getFirstDead();
            bullet2.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet2.scale.setTo(1,1);
            bullet2.name = "shotgun";
            game.physics.arcade.moveToXY(bullet2, x-(0.25*distance)-offsetX, y-(0.25*distance)-offsetY, speed);

            var bullet3 = bullets.getFirstDead();
            bullet3.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet3.scale.setTo(1,1);
            bullet3.name = "shotgun";
            game.physics.arcade.moveToXY(bullet3, x-(0.5*distance)-offsetX, y-(0.25*distance)-offsetY, speed);

            var bullet4 = bullets.getFirstDead();
            bullet4.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet4.scale.setTo(1,1);
            bullet4.name = "shotgun";
            game.physics.arcade.moveToXY(bullet4, x+(0.25*distance)+offsetX, y+(0.25*distance)+offsetY, speed);

            var bullet5 = bullets.getFirstDead();
            bullet5.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet5.scale.setTo(1,1);
            bullet5.name = "shotgun";
            game.physics.arcade.moveToXY(bullet5, x+(0.5*distance)+offsetX, y+(0.5*distance)+offsetY, speed);

        } else {/*basic*/
            bullet.reset(Math.round(gun.world.x*10)/10, Math.round(gun.world.y*10)/10);
            bullet.scale.setTo(1,1);
            bullet.name = "basic";
            game.physics.arcade.moveToPointer(bullet, gun.bulletSpeed*speedBonus);
        }
        return true;
    } else {
        return false;
    }

}
function enemyFire(user,gun,enemyBullets,fireRate,target,destroyerBullets){
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
            bullet.alpha = 1;
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    } else if(user.key == 'destroyer'){
        if(game.time.now > user.nextFire && enemyBullets.countDead() > 0){
            user.nextFire = game.time.now + fireRate;
            bullet.reset(user.body.x, user.body.y);
            bullet.alpha = 0;
            destroyerBullets.push(bullet);
            game.physics.arcade.moveToObject(bullet,target,200);
        }
    }
}
function hitDetector(bullet, enemy, enemyAmount,lap,HPbar,dropBoom,dropAbi,playerRelatedData){
    var dmg;
    if(bullet.name == "laser" || bullet.name == "shotgun" || bullet.name == "basic"){
        dmg = playerRelatedData.shipRelatedItems.attachments[bullet.name].basedmg*playerRelatedData.shipStats.guns.gunDmgBoost/1000;
        if(bullet.name != "laser"){
            bullet.kill();
        }
    } else if(bullet.name == "mine") {
        bullet.kill();
    } else if(bullet.key == "boom") {
        dmg = playerRelatedData.shipRelatedItems.attachments["mines"].basedmg;
    } else if(bullet.name != "drop"){
        bullet.kill();
        dmg = 0.25;//enemy
    } else{
        bullet.kill();
    }
    if(((enemy.health-dmg) <= 0 && enemy.health != 0.001) && enemy.name != "drop"){
        enemy.health = 0.001;

        if(enemyAmount != null) {//enemyAmount on null jos kutsuja oli playerHit funktio (eli pelaajaan osuttiin)
            enemyAmount[lap - 1]--;
            enemiesKilled++;
            points += enemy.worth;
        } else if(enemyAmount == null){
            deaths++;
            points = points*0.9;
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
        boom2.x = rnd.integerInRange(-3,3);
        boom2.y = rnd.integerInRange(-3,3);
        boom2.scale.setTo(0.1,0.1);
        enemy.addChild(boom2);
        var tween2 = game.add.tween(boom2);
        tween2.frameBased = true;
        var to2 = rnd.realInRange(7,5);
        tween2.to({height:boom2.height*to2,y:boom2.y-(boom2.height*to2-boom2.height)/2,width:boom2.width*to2,x:boom2.x-(boom2.width*to2-boom2.width)/2}, rnd.integerInRange(300,600), "Linear", true, 150);
        musics.sounds.shipBoom[musics.nextFreeBoom].play();
        if(musics.nextFreeBoom < 2){//we pool boom sounds because there can be multiple explosion at once
            musics.nextFreeBoom++;
        } else {
            musics.nextFreeBoom = 0;
        }
        tween2.onComplete.add(function(){
            boom2.destroy();
            enemy.kill();
            var random = rnd.integerInRange(1,13);
            if((random == 10 || random == 5) && enemy.key != "ship"){
                if(random == 5){
                    dropBoom.getFirstDead().reset(enemy.x,enemy.y);
                } else if(random == 10){
                    dropAbi.getFirstDead().reset(enemy.x,enemy.y).ability = rnd.integerInRange(0,3);
                }
            }
            if((enemy.name == 0 || enemy.name == 1 || enemy.name == 2) && enemy.name !== ""){
                if(enemy.ray !== null){
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
        else if(enemy.name != "drop"){
            HPbar.renderable = true;
            HPbar.alpha = 1;
            HPbar.lastHit = Date.now();
            game.time.events.add(2000, function(){
                if(Date.now()-HPbar.lastHit>1500){
                    HPbar.renderable = false;
                    HPbar.alpha = 0;
                }
            });
            HPbar.getChildAt(1).width = HPbar.fullHealthLength*(enemy.health/enemy.maxHealth);
        }
    } else if(enemy.name == "drop"){//tätä ei ajeta ikinä
        enemy.health = 0.001;
        enemy.kill();
    }
}
function asteroidHitDetector(bullet, asteroid, asteroidAmmount){
    bullet.kill();
    if((asteroid.health-0.25) <= 0 ){
        asteroid.kill();
        asteroidAmmount--;
        if(asteroidAmmount == 0){
            return 0;
        }
        else{
            return 1;
        }
    } else {
        asteroid.health -= 0.25;
        return 2;
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
                    enemy.getChildAt(0).getChildAt(2).anchor.x = 0;
                    enemy.getChildAt(0).getChildAt(2).width = enemy.getChildAt(0).fullHealthLength;
                    enemy.getChildAt(0).getChildAt(2).x = -(enemy.getChildAt(0).getChildAt(1).width/2);//mitä helvettiä
                    enemy.getChildAt(0).getChildAt(2).body.x = -(enemy.getChildAt(0).getChildAt(1).width/2);
                    enemy.getChildAt(0).getChildAt(2).y = 0;//mitä helvettiä
                    enemy.getChildAt(0).getChildAt(2).body.y = 0;

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

// Resize the game based on the window size

function resizeGame() {

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var widthScale = windowWidth/1280;
    var heightScale = windowHeight/800;
    game.scale.scaleMode = 0;
}	// By Roni 2015
function formatWave(data){
    //muodostetaan objekti
    var formatted = {"waveStruct":"","waveStatus":"Unused","profit":0};
    var struct = "";
    //kasataan
    for(var i = 0;i<3;i++){
        for(var j = 0;j<3;j++){
            var amount = ""+data[i][j];
            if(amount.length < 2){ //tarkistetaan ettei hyökkäystiedosta tule liian lyhyt
                amount = "0"+amount;
            }
            struct += amount;
        }
        if(i != 2) {
            struct += "'";
        }
    }
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
    }
    degr = pi*(2+1/2)-degr;
    Ycoord = null;
    Xcoord = null;
    return parseFloat(degr+1-1);
}
function reload(reloadSprite,clips,pos,HUD,gun,usage,reloading,reloadBonus){
    if(usage == 1) {
        //vaihdetaan kursori
        if (reloadSprite.alive == false) {
            reloadSprite.reset();
            reloadSprite.body.rotation = 0;
            reloadSprite.rotation = 0;
            reloadSprite.y = game.input.activePointer.worldY + reloadSprite.height / 2;
            reloadSprite.x = game.input.activePointer.worldX + reloadSprite.width / 2;
        }
        var reloadTween = game.add.tween(reloadSprite.body);
        reloadTween.frameBased = true;
        reloadTween.to({rotation: 2 * pi}, gun.reload, "Linear", true, 0, 1);
        //lisätään latausanimaatio HUDiin
        var tray = HUD.webTray.getChildAt(1).getChildAt((HUD.webTray.trayPosition) * 2 - 1);
        tray.alpha = 1;
        var trayTween = game.add.tween(tray);
        trayTween.frameBased = true;
        trayTween.to({y: (tray.y + tray.height)}, gun.reload/reloadBonus, "Linear", true, 0);
        trayTween.onComplete.add(function () {
            tray.y = 22;
            tray.alpha = 0;
        });
        game.time.events.add(gun.reload, function () {
            clips[pos] = gun.clip;
            reloading[pos] = false;
            reloadSprite.kill();
            $("canvas").css("cursor", "url('assets/sprites/cursor.png'),none");
        }, this);
        reloading[pos] = true;
        $("canvas").css("cursor", "none");
    } else if(usage == 2){
        /*Ei asetettu kannassa, arvona -999 joka ylikirjoitetaan. TODO: poista */
        reloadBonus = 1;
        /**/
        var trayAb = HUD.abTray.getChildAt(1).getChildAt((HUD.abTray.trayPosition) * 2 - 1);
        trayAb.alpha = 1;
        var trayTweenAb = game.add.tween(trayAb);
        trayTweenAb.frameBased = true;
        trayTweenAb.to({y: (trayAb.y + trayAb.height)}, gun.reload/reloadBonus, "Linear", true, 0);
        trayTweenAb.onComplete.add(function () {
            trayAb.y = 22;
            trayAb.alpha = 0;
            reloading[pos] = false;
        });
        reloading[pos] = true;
    }
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
function centerButtonTest(btn,txt){
    return [btn.width/2-txt.width/2,btn.height/2-txt.height/2];
}

