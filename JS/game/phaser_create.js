var gameLoad = function(game){
    var asteroids;//
    var ship;//
    var gun;//
    var bullets;//
    var enemies;//
    var enemy1;//
    var enemy2;//
    var enemy3;//
    var cursors;//
    var bg;//
    var text;
    var text2;
    var shipTrail;//
    //attackInfo = "031509'302112'352713"; //jaetaan kahden sarjoihin ja kuuden sarjoihin, 23, 15, 09|30,21,12|35,27,13
};
var loadBreakerFix = 1;
var deedug = 0;
gameLoad.prototype = {
    preload: function () {
        //Maailman raja
        this.game.world.setBounds(0, 0, 1600, 1000);
        //Ladataan tausta ja asteroidit
        this.game.load.image('background', 'assets/sprites/VS_background_purple.png');
        this.game.load.image('asteroid1', 'assets/sprites/VS_peli_asteroid1_FIX.png');
        this.game.load.image('asteroid2', 'assets/sprites/VS_peli_asteroid2.png');
        this.game.load.image('asteroid3', 'assets/sprites/VS_peli_asteroid3.png');
        //Ladataan alus
        this.game.load.image('ship', 'assets/sprites/VS_peli_ship.png');
        //ladataan viholliset
        this.game.load.spritesheet('destroyer', 'assets/sprites/fighter.png');
        this.game.load.image('hunter', 'assets/sprites/playerHunter.png');
        this.game.load.image('commander', 'assets/sprites/hunterFinal.png');
        //Ladataan trail-partikkelit
        this.game.load.image('trail6', 'assets/particles/VS_peli_trail6.png');
        this.game.load.image('trail7', 'assets/particles/VS_peli_trail7.png');
        //ladataan ammus
        this.game.load.image('bullet', 'assets/sprites/bullet.png');
        this.game.load.image('bullet2', 'assets/sprites/bullet2.png');
        this.game.load.image('bullet3', 'assets/sprites/bullet3.png');
        this.game.load.image('mine', 'assets/sprites/mine.png');
        //explosion
        this.game.load.image('boom', 'assets/particles/explosion3.png');
        this.game.load.image('boom2', 'assets/particles/explosion2.png');
        //reloadkursori
        this.game.load.image('reloadTray', 'assets/sprites/reloadWhite.png');
        //HP elementit
        this.game.load.image('healthbar', 'assets/GUI/healthbar.png');
        this.game.load.image('health', 'assets/GUI/health.png');
        this.game.load.image('respawnTimer', 'assets/GUI/respawn.png');
        //ladataan bannerit ja weapon-/ability trayt
        this.game.load.spritesheet('banner', 'assets/GUI/banners.png', 1280, 179);
        this.game.load.image('wepTray', 'assets/GUI/wepTray_new.png');
        this.game.load.image('abTray', 'assets/GUI/abTray_new.png');
        this.game.load.image('trayChoser', 'assets/GUI/trayChosen.png');
        //lataamisen näyttämistray
        this.game.load.image('trayReloading', 'assets/GUI/trayReloading.png');
        //buffausikonit
        this.game.load.image('healed', 'assets/GUI/healed.png');
        this.game.load.image('boosted', 'assets/GUI/boosted.png');
        //asteroidin tappajien laser
        this.game.load.image('laser1', 'assets/particles/laser1.png');
        this.game.load.image('laser2', 'assets/particles/laser2.png');
        this.game.load.image('laser3', 'assets/particles/laser3.png');
        // aseet
        this.game.load.image('weapon0', 'assets/placeholders/weapon0_final.png');
        this.game.load.image('weapon1', 'assets/placeholders/weapon1_final.png');
        this.game.load.image('weapon2', 'assets/placeholders/weapon2_final.png');
        this.game.load.image('weapon3', 'assets/sprites/mine.png');
        // tehosteet
        this.game.load.image('ability0', 'assets/placeholders/ability0_final.png');
        this.game.load.image('ability1', 'assets/placeholders/ability1_final.png');
        this.game.load.image('ability2', 'assets/placeholders/ability2_final.png');
        this.game.load.image('ability3', 'assets/placeholders/ability3_final.png');
        //abilityjen visuaaliy
        this.game.load.image('shield', 'assets/particles/shield.png');
        this.game.load.image('EMP', 'assets/particles/EMPfield.png');
        //dropit
        this.game.load.image('this.dropBoom', 'assets/sprites/BoomDrop.png');
        this.game.load.image('this.dropApi', 'assets/sprites/ApiDrop.png');
        //pausemenun elementit
        this.game.load.image('needle', 'assets/menuelements/needle.png');
        this.game.load.image('slider', 'assets/menuelements/slider.png');
        this.game.load.image('menuHeader', 'assets/placeholders/header3.png');
        this.game.load.image('menuButtonBG', 'assets/placeholders/menuBG_dark.png');
        //tausta lopetusnäytölle
        this.game.load.spritesheet('buttonSprite', 'assets/placeholders/menuBG_dark.png', 400, 70);
        this.game.load.spritesheet('backToMenuButton', 'assets/placeholders/menuButtonSpriteEmpty2.png', 400, 70);


    },
    init: function (loadout, playerRelatedData, loader, surroundings) {
        this.loadout = loadout;
        this.playerRelatedData = playerRelatedData;
        this.loader = loader;
        this.surroundings = surroundings;
    },
    create: function () {
        //this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.start,this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).onDown.add(this.back, this);
        var self = this;
        var loadertrail1 = this.game.add.emitter(645, 480, 1000);
        var loadertrail2 = this.game.add.emitter(645, 480, 1000);
        loadertrail1.width = 15;
        loadertrail2.width = 4;
        loadertrail1.makeParticles("trail6");
        loadertrail2.makeParticles("trail7");
        loadertrail1.gravity = 300;
        loadertrail2.gravity = 300;
        loadertrail1.setYSpeed(200, 210);
        loadertrail1.setXSpeed(30, -30);
        loadertrail2.setYSpeed(200, 210);
        loadertrail2.setXSpeed(30, -30);
        loadertrail1.start(false, 400, 20);
        loadertrail2.start(false, 550, 20);
        this.loaderTrail = this.game.add.group();
        this.loaderTrail.add(loadertrail1);
        this.loaderTrail.add(loadertrail2);
        //lisätään musiikit
        for (var i = 0; i < musics.gameTracks.length; i++) {
            musics.gameTracks[i].volume = volumes.music;
            musics.gameTracks[i].onended = this.nextSong;
        }
        waiter = this.game.time.create();
        this.clipSizes = [35, 30, 5, 1];
        //tähän AJAX
        var getWave = $.ajax({
            method: "POST",
            async: false,
            url: "PHP/SQLcontroller/getWave.php",
            data: {
                playername: self.playerRelatedData.playerData.playerName,
                loginFollow: self.playerRelatedData.loginFollowID,
                location: window.location.href
            }
        });
        getWave.done(function (returnData) {
            JSONform = JSON.parse(returnData);
            self.attackInfo = JSONform.attackInfo;
            self.attackID = JSONform.attackID;
        });
        getWave.fail(function () {
            alert("can't start game because can't reach database to fetch a attack wave");
            self.game.state.start('menuLoad');
        });
        //AJAX Loppuu

        //this.attackInfo = "051006'302112'352713";
        //this.attackInfo = "000006'000905'000008";
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bg = this.game.add.sprite(0, 0, 'background');
        this.bg.scale.setTo(1, 1.1);

        // asteroidit
        this.asteroids = this.game.add.group();
        this.asteroids.create(300, 156, 'asteroid1');
        this.asteroids.create(400, 800, 'asteroid2');
        this.asteroids.create(1360, 650, 'asteroid3');

        this.asteroids.forEach(function (item) {
            item.scale.setTo(0.5, 0.5);
        });

        this.asteroid1 = this.asteroids.getChildAt(0);
        this.asteroid1.health = 25;

        this.asteroid2 = this.asteroids.getChildAt(1);
        this.asteroid2.health = 25;

        this.asteroid3 = this.asteroids.getChildAt(2);
        this.asteroid3.health = 25;

        //luodaan alus ja moottorivana
        this.shipAccessories = this.game.add.group();
        this.ship = this.game.add.sprite(650, 400, 'ship');
        this.ship.scale.setTo(0.5, 0.5);
        //aluksen moottoritrail
        this.shipTrail = this.game.add.group();
        var trail1 = this.game.add.emitter(0, 60, 1000);
        var trail2 = this.game.add.emitter(0, 60, 1000);
        trail1.width = 15;
        trail2.width = 4;
        trail1.makeParticles("trail6");
        trail2.makeParticles("trail7");
        trail2.lifespan = 100;
        trail1.lifespan = 250;
        this.shipTrail.add(trail1);
        this.shipTrail.add(trail2);
        this.shipTrail.forEach(function (em) {
            em.setXSpeed(30, -30);
            em.setYSpeed(200, 180);
            em.setRotation(0);
        });
        // luodaan ryhmä aseille js abiltyille
        this.guns = this.game.add.group();
        var abilities = this.game.add.group();
        // perusaseen tiedot
        this.gun = this.game.add.image(0, -90);
        this.gun.name = "basic";
        this.gun.reload = this.playerRelatedData.shipRelatedItems.attachments.basic.reload;
        this.gun.fireRate = 450;
        this.gun.bulletSpeed = this.playerRelatedData.shipRelatedItems.attachments.basic.bulletSpeed;
        this.gun.clip = this.playerRelatedData.shipRelatedItems.attachments.basic.clip;
        // laserin tiedot
        this.laser = this.game.add.image(0, -70);
        this.laser.name = "laser";
        this.laser.fireRate = 0.1;
        this.laser.bulletSpeed = this.playerRelatedData.shipRelatedItems.attachments.laser.bulletSpeed;
        this.laser.reload = this.playerRelatedData.shipRelatedItems.attachments.laser.reload;
        this.laser.clip = this.playerRelatedData.shipRelatedItems.attachments.laser.clip;
        // haulikon tiedot
        this.shotgun = this.game.add.image(0, -90);
        this.shotgun.name = "shotgun";
        this.shotgun.fireRate = 1500;
        this.shotgun.bulletSpeed = this.playerRelatedData.shipRelatedItems.attachments.shotgun.bulletSpeed;
        this.shotgun.reload = this.playerRelatedData.shipRelatedItems.attachments.shotgun.reload;
        this.shotgun.clip = this.playerRelatedData.shipRelatedItems.attachments.shotgun.clip;
        // miinojen tiedot
        this.mines = this.game.add.image(0, 40);
        this.mines.name = "mines";
        this.mines.fireRate = 0;
        this.mines.reload = this.playerRelatedData.shipRelatedItems.attachments.mines.reload;
        this.mines.clip = this.playerRelatedData.shipRelatedItems.attachments.mines.clip;
        this.guns.laserLocation = null;
        //supernopeus
        this.superSpeed = this.game.add.image(0, 0);
        this.superSpeed.name = "superSpeed";//kyvyillä ei ole omaa ammusryhmää joten niille luodaan sprite suoraan isäksi
        this.superSpeed.reload = 5000;
        this.superSpeed.clip = 0.7;//clips on abilityillä lähtöarvo johon palataan, nimetty näin että voidaan hyödyntää samaa reload funktiota sekä aseille että abilityille
        this.superSpeed.isTemp = false;
        //EMP
        this.EMP = this.game.add.sprite(0, 0, "EMP");
        this.game.physics.p2.enable(this.EMP);
        this.EMP.body.kinematic = true;
        this.EMP.anchor.x = 0.5;
        this.EMP.anchor.y = 0.5;
        this.EMP.scale.setTo(0.01, 0.01);
        this.EMP.reload = 20000;
        this.EMP.name = "EMP";
        this.EMP.isTemp = false;
        this.EMP.kill();
        //Kilpi
        this.shield = this.game.add.sprite(0, 0, "shield");
        this.game.physics.enable(this.shield, Phaser.Physics.ARCADE);
        this.shield.anchor.x = 0.5;
        this.shield.anchor.y = 0.5;
        this.shield.reload = 10000;
        this.shield.name = "shield";
        this.shield.isTemp = false;
        this.shield.kill();
        //ampumanopeus
        this.fireRate = this.game.add.image(0, 0);
        this.fireRate.name = "fireRateBoost";//kyvyillä ei ole omaa ammusryhmää joten niille luodaan sprite suoraan isäksi
        this.fireRate.reload = 9000;
        this.fireRate.clip = 0; //clips on abilityillä lähtöarvo johon palataan, nimetty näin että voidaan hyödyntää samaa reload funktiota sekä aseille että abilityille
        this.fireRate.boostedGun = 0;//gun that received buff
        this.fireRate.isTemp = false;

        this.clips = [];
        this.reloading = [];
        this.abilityReloading = [];
        //kasataan pelaajan loadout joka tulee peliin
        for (var o = 0; o < 5; o++) { //tässä on viisi koska pelaajalle mahtuu mukaan yhteensä kolme asetta ja kaksi abilitya = 5
            if (this.loadout[o] != null) {
                //aseet
                if (this.loadout[o] == "weapon0") {
                    this.guns.add(this.gun);
                    this.clips.push(this.clipSizes[0]);
                    this.reloading.push(false);
                } else if (this.loadout[o] == "weapon1") {
                    this.guns.add(this.laser);
                    this.guns.laserLocation = this.guns.length - 1;
                    this.clips.push(this.clipSizes[1]);
                    this.reloading.push(false);
                } else if (this.loadout[o] == "weapon2") {
                    this.guns.add(this.shotgun);
                    this.clips.push(this.clipSizes[2]);
                    this.reloading.push(false);
                } else if (this.loadout[o] == "weapon3") {
                    this.guns.add(this.mines);
                    this.clips.push(this.clipSizes[3]);
                    this.reloading.push(false);
                } //tästä alkaa abilityt
                else if (this.loadout[o] == "ability0") {
                    abilities.add(this.superSpeed);
                    this.abilityReloading.push(false);
                }
                else if (this.loadout[o] == "ability1") {
                    abilities.add(this.EMP);
                    this.abilityReloading.push(false);
                }
                else if (this.loadout[o] == "ability2") {
                    abilities.add(this.shield);
                    this.abilityReloading.push(false);
                    this.shipAccessories.shieldPos = abilities.length - 1;
                }
                else if (this.loadout[o] == "ability3") {
                    abilities.add(this.fireRate);
                    this.abilityReloading.push(false);
                }
            }
        }
        this.ship.addChild(this.shipTrail);
        this.ship.addChild(this.guns);
        this.shipAccessories.add(abilities);
        var pickUpAbilities = this.game.add.group();//vihujen tiputtamat dropit valitsevat tästä
        pickUpAbilities.add(jQuery.extend(true, {}, this.superSpeed));
        pickUpAbilities.add(jQuery.extend(true, {}, this.EMP));
        pickUpAbilities.add(jQuery.extend(true, {}, this.shield));
        pickUpAbilities.add(jQuery.extend(true, {}, this.fireRate));

        this.game.physics.p2.enable(pickUpAbilities.getChildAt(1));
        //pickUpAbilities[1].x = 50;
        //pickUpAbilities[1].y = 50;
        pickUpAbilities.getChildAt(1).kill();
        this.game.physics.enable(pickUpAbilities.getChildAt(2), Phaser.Physics.ARCADE);
        /*pickUpAbilities[2].x = 50;
         pickUpAbilities[2].y = 50;*/
        pickUpAbilities.getChildAt(2).kill();
        this.shipAccessories.add(pickUpAbilities);
        this.shipAccessories.pickUpStartSlotIndex = abilities.length;//tästä tiedetään mistä eteenpäin HUDissa on poimittu tehoste
        this.ship.health = 3;
        this.ship.dying = false;
        this.ship.shield = false;

        // luodaan aluksen ammusryhmät
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet', 0);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.laserBul = this.game.add.group();
        this.laserBul.enableBody = true;
        this.laserBul.physicsBodyType = Phaser.Physics.ARCADE;
        this.laserBul.createMultiple(30, 'laser1', 0);
        this.laserBul.forEach(function (b) {
            b.scale.setTo(0.3, 0.6);
        });
        this.laserBul.setAll('anchor.x', 0.5);
        this.laserBul.setAll('anchor.y', 0.5);
        this.laserBul.setAll('outOfBoundsKill', true);
        this.laserBul.setAll('checkWorldBounds', true);

        this.minesBul = this.game.add.group();
        this.minesBul.enableBody = true;
        this.minesBul.physicsBodyType = Phaser.Physics.ARCADE;
        this.minesBul.createMultiple(20, 'mine', 0);
        this.minesBul.setAll('anchor.x', 0.5);
        this.minesBul.setAll('anchor.y', 0.5);
        this.minesBul.setAll('outOfBoundsKill', true);
        this.minesBul.setAll('checkWorldBounds', true);
        this.minesExpl = this.game.add.group();
        this.minesExpl.createMultiple(5, 'boom', 0);
        this.game.physics.p2.enable(this.minesExpl);
        this.minesExpl.forEach(function (i) {
            i.scale.setTo(0.1, 0.1);
            i.body.kinematic = true;
        }, this);

        //luodaan pelaajan abilityjen ryhmä

        //luodaan vihujen ammusryhmä
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(500, 'bullet3', 0, false);
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 0.5);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        //vihujen dropit
        this.dropBoom = this.game.add.group();
        this.dropBoom.enableBody = true;
        this.dropBoom.physicsBodyType = Phaser.Physics.ARCADE;
        this.dropBoom.createMultiple(20, 'this.dropBoom', 0);
        this.dropBoom.setAll("anchor.x", 0.5);
        this.dropBoom.setAll("anchor.y", 0.5);
        this.dropBoom.setAll("name", "drop");

        this.dropApi = this.game.add.group();
        this.dropApi.createMultiple(20, 'this.dropApi', 0);
        this.dropApi.enableBody = true;
        this.dropApi.physicsBodyType = Phaser.Physics.ARCADE;
        this.dropApi.setAll("anchor.x", 0.5);
        this.dropApi.setAll("anchor.y", 0.5);
        this.dropApi.setAll("name", "drop");
        this.dropApi.setAll("ability", "");


        //käsitellään hyökkäystieto
        this.attackInfo = this.attackInfo.split("'");
        this.enemyAmount = [0, 0, 0];

        for (var i = 0; i < 3; i++) {
            this.enemyAmount[i] = (parseInt((this.attackInfo[i].substring(0, 2))) + (parseInt(this.attackInfo[i].substring(2, 4))) + (parseInt(this.attackInfo[i].substring(4, 6))));
        }
        this.spawnPool = [(this.enemyAmount[0] + 1 - 1), (this.enemyAmount[1] + 1 - 1), (this.enemyAmount[2] + 1 - 1)];

        var enemyFireRates = [500, 600, 1500];
        //Luodaan viholliset
        this.enemies = this.game.add.group();
        var lap1 = this.game.add.group();
        var lap2 = this.game.add.group();
        var lap3 = this.game.add.group();
        this.enemies.add(lap1);
        this.enemies.add(lap2);
        this.enemies.add(lap3);


        for(var i=0,j=this.enemies.length; i<j; i++){
            var tEnemy1 = this.game.add.group();
            var l = 0;
            var k = 0;
            var m = 0;
           /* var confEnemy1 = function(enemy){
                //enemy.scale.setTo(0.45,0.45);
                enemy.ray = null;
                enemy.nextFire = 0;
                enemy.maxHealth = 1;
                enemy.wait = 0;
                enemy.targetOff = rnd.integerInRange(0,60);
                enemy.name = ".";
                enemy.fireRate  = enemyFireRates[0];
                enemy.worth = 100;
                enemy.isStunned = false;
                var healthbar = self.HPbar();
                healthbar.scale.setTo(0.25,0.1);
                healthbar.renderable = false;
                healthbar.alpha = 0;
                healthbar.lastHit = 0;
                healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                healthbar.zeroPosition = healthbar.width;
                healthbar.y = -120;
                healthbar.getChildAt(1).anchor.x = 0;
                healthbar.getChildAt(1).x = 0;
                healthbar.getChildAt(2).x = 0;
                healthbar.getChildAt(1).y = 0;
                healthbar.getChildAt(2).y = 0;
                enemy.addChild(healthbar);
                var gun = game.add.image(0,-70);
                enemy.addChild(gun);
                var laser = game.add.emitter(-8,-125,10);
                laser.makeParticles('laser1');
                laser.lifespan = 200;
                laser.setXSpeed(-30, 30);
                laser.setYSpeed(-200, -180);
                laser.setRotation(0);
                laser.scale.setTo(0.2,0.5);
                enemy.addChild(laser);
                if(l < self.attackInfo[i].substring(0,2)){
                    setTimeout(function(){
                        confEnemy1(tEnemy1.getChildAt(l));
                    },5);
                }
                l++;
            }*/
            tEnemy1.createMultiple(parseInt(this.attackInfo[i].substring(0,2)),"destroyer");
            tEnemy1.forEach(function(enemy){
                 enemy.scale.setTo(0.45,0.45);
                 enemy.ray = null;
                 enemy.nextFire = 0;
                 enemy.maxHealth = 1;
                 enemy.wait = 0;
                 enemy.targetOff = rnd.integerInRange(0,60);
                 enemy.name = ".";
                 enemy.fireRate  = enemyFireRates[0];
                 enemy.worth = 100;
                 enemy.isStunned = false;
                 var healthbar = HPbar();
                 healthbar.scale.setTo(0.25,0.1);
                 healthbar.renderable = false;
                 healthbar.alpha = 0;
                 healthbar.lastHit = 0;
                 healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                 healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                 healthbar.zeroPosition = healthbar.width;
                 healthbar.y = -120;
                 healthbar.getChildAt(1).anchor.x = 0;
                 healthbar.getChildAt(1).x = 0;
                 healthbar.getChildAt(2).x = 0;
                 healthbar.getChildAt(1).y = 0;
                 healthbar.getChildAt(2).y = 0;
                 enemy.addChild(healthbar);
                 var gun = this.game.add.image(0,-70);
                 enemy.addChild(gun);
                 var laser = this.game.add.emitter(-8,-125,10);
                 laser.makeParticles('laser1');
                 laser.lifespan = 200;
                 laser.setXSpeed(-30, 30);
                 laser.setYSpeed(-200, -180);
                 laser.setRotation(0);
                 laser.scale.setTo(0.2,0.5);
                 enemy.addChild(laser);
            /*if(this.attackInfo[i].substring(0,2) != 0){
                confEnemy1(tEnemy1.getChildAt(0));
            }*/
            },this);

            tEnemy1.fireRate = enemyFireRates[0];
            this.game.physics.p2.enable(tEnemy1);
            this.enemies.getChildAt(i).add(tEnemy1);

            var tEnemy2 = this.game.add.group();
            /*var confEnemy2 = function(enemy){
                //enemy.scale.setTo(0.4,0.4);
                enemy.nextFire = 0;
                enemy.health = 0.5;
                enemy.maxHealth = 0.5;
                enemy.fireRate  = enemyFireRates[1];
                enemy.worth = 125;
                enemy.isStunned = false;
                var healthbar = self.HPbar();
                healthbar.scale.setTo(0.25,0.1);
                healthbar.renderable = false;
                healthbar.alpha = 0;
                healthbar.lastHit = 0;
                healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                healthbar.zeroPosition = healthbar.width;
                healthbar.y = -120;
                healthbar.getChildAt(1).anchor.x = 0;
                healthbar.getChildAt(1).x = 0;
                healthbar.getChildAt(2).x = 0;
                healthbar.getChildAt(1).y = 0;
                healthbar.getChildAt(2).y = 0;
                var enemyGun1 = game.add.image(0,-70);
                enemy.addChild(healthbar);
                enemy.addChild(enemyGun1);
                if(k < self.attackInfo[i].substring(2,4)){
                    setTimeout(function(){
                        confEnemy2(tEnemy2.getChildAt(k));
                    },5);
                }
                k++;
            }*/
            tEnemy2.createMultiple(parseInt(this.attackInfo[i].substring(2,4)),"hunter");
            tEnemy2.forEach(function(enemy){
                 enemy.scale.setTo(0.4,0.4);
                 enemy.nextFire = 0;
                 enemy.health = 0.5;
                 enemy.maxHealth = 0.5;
                 enemy.fireRate  = enemyFireRates[1];
                 enemy.worth = 125;
                 enemy.isStunned = false;
                 var healthbar = HPbar();
                 healthbar.scale.setTo(0.25,0.1);
                 healthbar.renderable = false;
                 healthbar.alpha = 0;
                 healthbar.lastHit = 0;
                 healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                 healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                 healthbar.zeroPosition = healthbar.width;
                 healthbar.y = -120;
                 healthbar.getChildAt(1).anchor.x = 0;
                 healthbar.getChildAt(1).x = 0;
                 healthbar.getChildAt(2).x = 0;
                 healthbar.getChildAt(1).y = 0;
                 healthbar.getChildAt(2).y = 0;
                 var enemyGun1 = this.game.add.image(0,-70);
                 enemy.addChild(healthbar);
                 enemy.addChild(enemyGun1);
           /* if(this.attackInfo[i].substring(2,4) != 0){
                confEnemy2(tEnemy2.getChildAt(0));
            }*/

            },this);

            tEnemy2.fireRate = enemyFireRates[1];
            this.game.physics.p2.enable(tEnemy2);
            this.enemies.getChildAt(i).add(tEnemy2);

            var tEnemy3 = this.game.add.group();
           /* var confEnemy3 = function(enemy){
                enemy.health = 2.5;
                enemy.maxHealth = 2.5;
                //enemy.scale.setTo(0.55,0.55);
                enemy.nextFire = 0;
                enemy.barrel = 1;
                enemy.altTarget = rnd.integerInRange(0,2);
                enemy.fireRate  = enemyFireRates[2];
                enemy.worth = 350;
                enemy.isStunned = false;
                var healthbar = self.HPbar();
                healthbar.scale.setTo(0.25,0.1);
                healthbar.renderable = false;
                healthbar.alpha = 0;
                healthbar.lastHit = 0;
                healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                healthbar.zeroPosition = healthbar.width;
                healthbar.y = -120;
                healthbar.getChildAt(1).anchor.x = 0;
                healthbar.getChildAt(1).x = 0;
                healthbar.getChildAt(2).x = 0;
                healthbar.getChildAt(1).y = 0;
                healthbar.getChildAt(2).y = 0;
                //enemy.healthbar = healthbar;
                var enemyGun1 = game.add.image(35,-50);
                var enemyGun2 = game.add.image(-35,-50);
                enemy.addChild(healthbar);
                enemy.addChild(enemyGun1);//pidÃ¤ nÃ¤mÃ¤ aina viimeisenÃ¤
                enemy.addChild(enemyGun2);
                if(m < self.attackInfo[i].substring(4,6)){
                    setTimeout(function(){
                        deedug++;
                        confEnemy3(tEnemy1.getChildAt(m));
                    },5);
                }
                m++;
            }*/
            var ij = 0;
            console.log(this.attackInfo[i].substring(4,6));
            tEnemy3.createMultiple(parseInt(this.attackInfo[i].substring(4,6)),"commander");
            tEnemy3.forEach(function(enemy){
                 enemy.health = 2.5;
                 enemy.maxHealth = 2.5;
                 enemy.scale.setTo(0.55,0.55);
                 enemy.nextFire = 0;
                 enemy.barrel = 1;
                 enemy.altTarget = rnd.integerInRange(0,2);
                 enemy.fireRate  = enemyFireRates[2];
                 enemy.worth = 350;
                 enemy.isStunned = false;
                 var healthbar = HPbar();
                 console.log("called HPbar..."+ij);
                 healthbar.scale.setTo(0.25,0.1);
                 console.log("line 1");
                 healthbar.renderable = false;
                 console.log("line 2");
                 healthbar.alpha = 0;
                console.log("line 3");
                 healthbar.lastHit = 0;
                console.log("line 4");
                 healthbar.getChildAt(0).width = 0; //respawn, tÃ¤tÃ¤ ei kÃ¤ytetÃ¤ vihulla
                console.log("line 5");
                 healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
                console.log("line 6");
                 healthbar.zeroPosition = healthbar.width;
                console.log("line 7");
                 healthbar.y = -120;
                console.log("line 8");
                 healthbar.getChildAt(1).anchor.x = 0;
                console.log("line 9");
                 healthbar.getChildAt(1).x = 0;
                console.log("line 10");
                 healthbar.getChildAt(2).x = 0;
                console.log("line 11");
                 healthbar.getChildAt(1).y = 0;
                console.log("line 12");
                 healthbar.getChildAt(2).y = 0;
                console.log("line 13");
                 //enemy.healthbar = healthbar;
                 var enemyGun1 = this.game.add.image(35,-50);
                 var enemyGun2 = this.game.add.image(-35,-50);
                 enemy.addChild(healthbar);
                 enemy.addChild(enemyGun1);//pidÃ¤ nÃ¤mÃ¤ aina viimeisenÃ¤
                 enemy.addChild(enemyGun2);
           /* if(this.attackInfo[i].substring(4,6) != 0){
                confEnemy3(tEnemy3.getChildAt(0));

            }*/
                ij++;
            },this);

            tEnemy3.fireRate = enemyFireRates[2];
            this.game.physics.p2.enable(tEnemy3);
            this.enemies.getChildAt(i).add(tEnemy3);
        }

        //alustetaan kerran
        this.enemy1 = this.enemies.getChildAt(0).getChildAt(0);
        this.enemy2 = this.enemies.getChildAt(0).getChildAt(1);
        this.enemy3 = this.enemies.getChildAt(0).getChildAt(2);
        var X = this.game.world.centerX;
        var Y = this.game.world.centerY;
        text = this.game.add.text(X, Y, "", {fill: "white"});
        text2 = this.game.add.text(X - 25, Y + 25, "", {fill: "white"});
        this.clipText = this.game.add.text(0, 0, "35", {fill: "white", font: "20px cyber"});//panosten määrä

        //asetetaan näppäimet
        this.cursors = this.game.input.keyboard.addKeys(
            {
                'up': Phaser.Keyboard.W,
                'down': Phaser.Keyboard.S,
                'left': Phaser.Keyboard.A,
                'right': Phaser.Keyboard.D,
                'reload': Phaser.Keyboard.R,
                'abil1': Phaser.Keyboard.Z,
                'abil2': Phaser.Keyboard.X,
                'abil3': Phaser.Keyboard.C,
                'wep1': Phaser.Keyboard.ONE,
                'wep2': Phaser.Keyboard.TWO,
                'wep3': Phaser.Keyboard.THREE,
                'pause': Phaser.Keyboard.ESC
            }
        );
        this.cursors.abilChangeHotkeys = {//tällä päästään vaihtamaan this.HUDin paikka helposti ilman pitkiä if-lauseita, ks gameLoop changethis.HUDposition
            90: 1,
            88: 2,
            67: 3
        };
        //kierrosmuuttuja kertoo mikä kierros menossa
        this.lap = 1;
        //asetetaan ääneet
        //this.music = this.game.add.audio('soldier');
        this.music = null;
        console.log("Am i problem?");
        //pelaajan HP kenttä
        this.playerhealth = HPbar();
        console.log("Must test");
        this.playerhealth.fixedToCamera = true;
        this.playerhealth.cameraOffset.setTo(1100, 180);
        this.playerhealth.scale.setTo(0.4, 0.3);
        this.playerhealth.fullHealthLength = this.playerhealth.getChildAt(1).width;//health palkki
        this.playerhealth.getChildAt(0).width = 0; //respawn palkki

        //kasataan this.HUD
        var wepTray = this.game.add.image(0, 0, 'wepTray');
        wepTray.fixedToCamera = true;
        wepTray.cameraOffset.setTo(1115, 20);//100 korkea
        var choserWeps = this.game.add.image(-108, 0, 'trayChoser');
        wepTray.addChild(choserWeps);
        wepTray.trayPosition = 1;
        var icons = this.game.add.group();
        for (var i = 0; i < 3; i++) {
            if (this.loadout[i] != null) {
                var gun = this.game.add.sprite(0, 22, this.loadout[i]);
                if (icons.length == 0) {
                    gun.x = 12.5;
                } else {
                    gun.x = 54 * i + 12.5;
                }
                gun.scale.setTo(0.4, 0.4);
                icons.addChild(gun);
                var reloadTray = this.game.add.sprite(0, 22, 'trayReloading');
                if (icons.length == 1) {
                    reloadTray.x = 12.5;
                } else {
                    reloadTray.x = 54 * i + 12.5;
                }
                reloadTray.alpha = 0;
                icons.addChild(reloadTray);
            }
        }
        wepTray.addChild(icons);
        var mask = this.game.add.graphics(0, 0);
        mask.beginFill(0xFFFFFF, 1);
        mask.drawRect(0, 22, wepTray.width, 36);
        icons.addChild(mask);
        icons.mask = mask;

        var abTray = this.game.add.image(0, 0, 'abTray');
        abTray.fixedToCamera = true;
        abTray.cameraOffset.setTo(1115, 100);
        var choserAbs = this.game.add.image(-108, 0, 'trayChoser');
        abTray.addChild(choserAbs);
        abTray.trayPosition = 1;
        var abIcons = this.game.add.group();
        for (var i = 3; i < 5; i++) {
            if (this.loadout[i] != null) {
                var abil = this.game.add.sprite(0, 22, this.loadout[i]);
                if (abIcons.length == 0) {
                    abil.x = 12.5;
                } else {
                    abil.x = 54 * (i - 3) + 12.5;
                }
                abil.scale.setTo(0.4, 0.4);
                abIcons.addChild(abil);
                var reloadTrayAb = this.game.add.sprite(0, 22, 'trayReloading');
                if (abIcons.length == 1) {
                    reloadTrayAb.x = 12.5;
                } else {
                    reloadTrayAb.x = 54 * (i - 3) + 12.5;
                }
                reloadTrayAb.alpha = 0;
                abIcons.addChild(reloadTrayAb);
            }
        }
        abTray.addChild(abIcons);
        var mask2 = this.game.add.graphics(0, 0);
        mask2.beginFill(0xFFFFFF, 1);
        mask2.drawRect(0, 22, abTray.width, 36);
        abIcons.addChild(mask2);
        abIcons.mask = mask2;

        //Alustetaan muut osat kuten vihujen buff kuvakkeet ja kierrosten välissä olevat bannerit
        var banner = this.game.add.image(0, 0, 'banner', 2);
        banner.fixedToCamera = true;
        banner.cameraOffset.setTo(0, this.game.camera.height / 2 - banner.height / 2);

        var buffTrays1 = this.game.add.group();
        buffTrays1.createMultiple(10, 'healed');
        buffTrays1.forEach(function (tray) {
            tray.kill();
            tray.scale.setTo(0.7, 0.7);
        });
        var buffTrays2 = this.game.add.group();
        buffTrays2.createMultiple(10, 'boosted');
        buffTrays2.forEach(function (tray) {
            tray.kill();
            tray.scale.setTo(0.7, 0.7);
        });
        var pointsText = this.game.add.text(20, 20, "Points: ", {fill: "white", font: "20px cyber"});
            
        pointsText.fixedToCamera = true;

        //kasataan this.HUD
        this.HUD = {
            banner: banner,
            webTray: wepTray,
            abTray: abTray,
            buffTrays1: buffTrays1,
            buffTrays2: buffTrays2,
            points: pointsText
        };

        //pause valikko
        var styleA = {font: '25px cyber', fill: 'white'};
        var styleB = {font: '20px cyber', fill: 'black'};
        this.pauseMenu = this.game.add.group();
        // mastervolumen säädin
        this.pausebbg = this.game.add.sprite(150, 100, "menuButtonBG");
        this.mastervolLabel = this.game.add.text(330, 300, 'Master volume', styleA);
        this.masterGroup = this.game.add.group();
        this.masterGroup.x = 630;
        this.masterGroup.y = 300;
        this.masterslider = this.game.add.sprite(0, 0, 'slider');
        this.masterslider.scale.setTo(1, 2);
        this.masterneedle = this.game.add.sprite(170, 1, 'needle');
        this.masterneedle.inputEnabled = true;
        this.masterneedle.input.enableDrag();
        this.masterneedle.input.boundsSprite = this.masterslider;
        this.masterneedle.input.allowVerticalDrag = false;
        this.masterneedle.events.onDragUpdate.add(this.masterVolume, this);
        this.masterGroup.add(this.masterslider);
        this.masterGroup.add(this.masterneedle);

        // musiikkivolumen säädin
        this.musicvolLabel = this.game.add.text(330, 370, 'Music volume', styleA);
        this.musicGroup = this.game.add.group();
        this.musicGroup.x = 630;
        this.musicGroup.y = 370;
        this.musicslider = this.game.add.sprite(0, 0, 'slider');
        this.musicslider.scale.setTo(1, 2);
        this.musicneedle = this.game.add.sprite(170, 1, 'needle');
        this.musicneedle.inputEnabled = true;
        this.musicneedle.input.enableDrag();
        this.musicneedle.input.boundsSprite = this.musicslider;
        this.musicneedle.input.allowVerticalDrag = false;
        this.musicneedle.events.onDragUpdate.add(this.musicVolume, this);
        this.musicGroup.add(this.musicslider);
        this.musicGroup.add(this.musicneedle);

        // efektivolumen säädin
        this.effectsvolLabel = this.game.add.text(330, 440, 'Effects volume', styleA);
        this.fxGroup = this.game.add.group();
        this.fxGroup.x = 630;
        this.fxGroup.y = 440;
        this.fxslider = this.game.add.sprite(0, 0, 'slider');
        this.fxslider.scale.setTo(1, 2);
        this.fxneedle = this.game.add.sprite(170, 1, 'needle');
        this.fxneedle.inputEnabled = true;
        this.fxneedle.input.enableDrag();
        this.fxneedle.input.boundsSprite = this.fxslider;
        this.fxneedle.input.allowVerticalDrag = false;
        this.fxneedle.events.onDragUpdate.add(this.fxVolume, this);
        this.fxGroup.add(this.fxslider);
        this.fxGroup.add(this.fxneedle);

        // alustetaan äänten on/off painike
        this.onoffButton = this.game.add.button(530, 620, 'menuHeader', this.onOff, this);
        this.onoffButton.scale.setTo(0.08, 0.5);
        var onoffText = this.game.add.text(210, 20, "On/Off", styleB);
        this.onoffButton.addChild(onoffText);
        this.onoffButton.getChildAt(0).scale.setTo(10, 1.5);

        // alustetaan äänien resetointi painike
        this.resetButton = this.game.add.button(660, 620, 'menuHeader', this.reset, this);
        this.resetButton.scale.setTo(0.08, 0.5);
        var resetText = this.game.add.text(400, 20, "Reset", styleB);
        this.resetButton.addChild(resetText);
        this.resetButton.getChildAt(0).scale.setTo(10, 1.5);

        //alustetaan takaisin nappula
        this.backButton = this.game.add.button(590, 560, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.25, 0.5);
        this.backButton.x = this.pausebbg.width / 2;
        var backText = this.game.add.text(400, 25, "Return to main menu", styleB);
        backText.x = this.backButton.width / 2;
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo((1 / 0.25), 1.1);

        this.pauseMenu.add(this.pausebbg);
        this.pauseMenu.add(this.mastervolLabel);
        this.pauseMenu.add(this.masterGroup);
        this.pauseMenu.add(this.musicvolLabel);
        this.pauseMenu.add(this.musicGroup);
        this.pauseMenu.add(this.effectsvolLabel);
        this.pauseMenu.add(this.fxGroup);
        this.pauseMenu.add(this.onoffButton);
        this.pauseMenu.add(this.backButton);
        this.pauseMenu.add(this.resetButton);
        this.pauseMenu.forEach(function (item) {
            if (item.name != "group") {
                item.kill();
            } else {
                item.forEach(function (itemitem) {
                    itemitem.kill();
                })
            }
        });

        points = 0;
        enemiesKilled = 0;
        deaths = 0;
        spawnNext = "undefined";
        var date = new Date();
        totalTime = date.getTime();
        date = null;
        console.log("da fak is happening");
        this.loader.bringToTop();
        this.game.world.bringToTop(this.loaderTrail);
        this.enterText = this.game.add.text(1000, 700, "Press ENTER to start", {fill: "white", font: "20px cyber"});
        this.backToMenuText = this.game.add.text(50, 700, "Press BACKSPACE to get back to the menu", {
            fill: "white",
            font: "20px cyber"
        });
        console.log("am i here?");
        game.input.onDown.addOnce(this.checkStart, this);
        game.paused = true;
        //this.checkStart();
        /*var toPlay = rnd.integerInRange(0, musics.gameTracks.length - 1);
        musics.gameTracks[toPlay].play();
        musics.isPlaying = toPlay;
        this.loader.destroy();
        this.loaderTrail.destroy();
        this.enterText.destroy();
        this.backToMenuText.destroy();
        game.state.start("test", true, true,
            this.asteroids,
            this.ship,
            this.shipAccessories,
            this.guns,
            this.bullets,
            this.enemies,
            this.enemy1,
            this.enemy2,
            this.enemy3,
            this.asteroid1,
            this.asteroid2,
            this.asteroid3,
            this.cursors,
            this.bg,
            this.text,
            this.shipTrail,
            this.attackInfo,
            this.attackID,
            this.enemyAmount,
            this.spawnPool,
            this.lap,
            this.enemyBullets,
            this.music,
            this.clipText,
            this.playerhealth,
            this.HUD,
            this.laserBul,
            this.clips,
            this.reloading,
            this.minesBul,
            this.minesExpl,
            this.dropBoom,
            this.dropApi,
            this.playerRelatedData,
            this.abilityReloading,
            this.pauseMenu,
            this.pickUpAbilities
        );*/
    },
    checkStart: function () {
        //if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            var toPlay = rnd.integerInRange(0, musics.gameTracks.length - 1);
            musics.gameTracks[toPlay].play();
            musics.isPlaying = toPlay;
            this.loader.destroy();
            this.loaderTrail.destroy();
            this.enterText.destroy();
            this.backToMenuText.destroy();
            game.paused = false;
            game.state.start("mainGame", false, false,
                this.asteroids,
                this.ship,
                this.shipAccessories,
                this.guns,
                this.bullets,
                this.enemies,
                this.enemy1,
                this.enemy2,
                this.enemy3,
                this.asteroid1,
                this.asteroid2,
                this.asteroid3,
                this.cursors,
                this.bg,
                this.text,
                this.shipTrail,
                this.attackInfo,
                this.attackID,
                this.enemyAmount,
                this.spawnPool,
                this.lap,
                this.enemyBullets,
                this.music,
                this.clipText,
                this.playerhealth,
                this.HUD,
                this.laserBul,
                this.clips,
                this.reloading,
                this.minesBul,
                this.minesExpl,
                this.dropBoom,
                this.dropApi,
                this.playerRelatedData,
                this.abilityReloading,
                this.pauseMenu,
                this.pickUpAbilities
            );
       // }
    },

    masterVolume: function () {
        //console.log(this.masterneedle.x);
        //console.log(this.mastervolume);
        volumes.master = this.masterneedle.x * (1 / this.masterslider.width);
        this.musicVolume();
        this.fxVolume();
    }, // säädetään musiikkivolume musiikkisliderin neulan x:n mukaan
    musicVolume: function () {
        //console.log(this.musicneedle.x);
        //console.log(this.sound.volume);
        volumes.music = this.musicneedle.x * (1 / this.musicslider.width) * volumes.master;
        for (var i = 0; i < musics.gameTracks.length; i++) {
            musics.gameTracks[i].volume = volumes.music;
        }
        for(var i = 0;i<musics.menuTracks.length;i++){
            musics.menuTracks[i].volume = volumes.music;
        }
    }, // säädetään efektivolume efektisliderin neulan x:n mukaan
    fxVolume: function () {
        //console.log(this.fxneedle.x);
        console.log(this.sound.volume);
        volumes.sounds = this.fxneedle.x * (1 / this.fxslider.width) * volumes.master;
        for (var property in musics.sounds) {
            musics.sounds[property].volume = volumes.sounds;
        }
    },
    // asettaa sliderit takaisin keskelle ja ajaa volume funktiot
    reset: function () {
        this.masterneedle.x = this.masterslider.width / 2;
        this.masterVolume();
        this.musicneedle.x = this.masterslider.width / 2;
        this.musicVolume();
        this.fxneedle.x = this.fxslider.width / 2;
        this.fxVolume();
    },
    // vaihda mute on/off
    onOff: function () {
        mute = !mute;
        for (var property in musics.sounds) {
            musics.sounds[property].muted = true;;
        }
        for (var i = 0; i < musics.menuTracks.length; i++) {
            musics.menuTracks[i].muted = mute;
        }
        for (var i = 0; i < musics.gameTracks.length; i++) {
            musics.gameTracks[i].muted = mute;
        }
    },
    // back-painike takaisin päävalikkoon
    back: function () {
        stateChange = true;
        for(var k = 0;k<musics.gameTracks.length;k++){
            musics.gameTracks[k].pause();
            musics.gameTracks[k].currentTime = 0;
        }

        this.masterGroup.removeAll();
        this.musicGroup.removeAll();
        this.fxGroup.removeAll();
        this.cache.destroy();
        this.game.state.start('setMenuLoader', true, true);
    },
    nextSong: function () {
        if (!stateChange) {
            musics.lastIndex = musics.isPlaying;
            if(musics.gameTracks.length != 1) {
                while (true) {
                    var toPlay = rnd.integerInRange(0, musics.gameTracks.length - 1);
                    if (toPlay != musics.lastIndex) {
                        break;
                    }
                }
            } else {
                toPlay = 0;
            }
            musics.gameTracks[toPlay].play();
            musics.isPlaying = toPlay;
        }
    }
};
function HPbar () {
    //pelaajan HP kenttä
    console.log("create group");
    var HPbar = game.add.group();
    console.log("create first sprite");
    var container = game.add.sprite(0, 0, 'healthbar');
    console.log("create second sprite");
    var health = game.add.sprite(0, 0, 'health');
    console.log("set x");
    health.x = container.width / 2 - health.width / 2;
    console.log("set y");
    health.y = container.height / 2 - health.height / 2;
    console.log("create third sprite");
    var respawn = game.add.sprite(0, 0, 'respawnTimer');
    console.log("set x again");
    respawn.x = container.width / 2 - respawn.width / 2;
    console.log("set y again");
    respawn.y = container.height / 2 - respawn.height / 2;
    console.log("start adding to groups");
    HPbar.add(respawn,true);
    HPbar.add(health,true);
    HPbar.add(container,true);
    return HPbar;
}