var reloading;
var deg;
var degWas;
var lastRot;
var execTime;
var testBM;
var nextFire;
var pi;
var spawnNext;
var testi;
var mainGame = function(game){
	//muuttujien luonti(globaaleja)
	nextFire = 0;
	deg = "0"; //deg on radiaani arvo
	degWas = 0; //last mouse position
	pi = Math.PI;
	execTime = 0;
	spawnNext = "undefined";
	lastRot = 0;
    testBM = 0;
    //sisällys
    /*
    init
    create
        sallitaan fysiikat
        asetetaan törmäykset
    update
        Asteroidien pyöritys
        Hiiren sijainnista lasketaan kulma
        Aluksen pyörittäminen
        Panosmäärän sijainti
        Kontrollit
        Ampuminen
        Tehosteet
        Hyökkäyksen hallinta
        Panosten osuminen
        Asteroidin jahtaajan tekoäly
        Pelaajan jahtaajan tekoäly
        pomon tekoäly
    tryBuff
    changeHUDslot
    boomCollision
    dropBoomStarter
    shieldHit
    pause
     */
};
mainGame.prototype = {
    //Latausvaiheessa alustetut muuttujat tuodaan tähän
    //tämän funktion parametreistä ei tarvitse tietää muuta kuin että ne kaikki ovat createssa luodut muuttujat
    init: function (asteroids, ship, shipAccessories, gun, bullets, enemies, enemy1, enemy2, enemy3, asteroid1, asteroid2, asteroid3, cursors, bg, text, shipTrail, attackInfo, attackID, enemyAmount, spawnPool, lap,enemyBullets,music,clipText,HPbar,HUD,laserBul,clips,reloadingAr,minesBul,minesExpl,dropBoom,dropApi,playerRelatedData,abilityReloading,pauseMenu) {
        this.asteroids = asteroids;
        this.ship = ship;//
        this.shipAccessories = shipAccessories;
        this.guns = gun;//
        this.bullets = bullets;//
        this.enemies = enemies;//
        this.enemy1 = enemy1;//
        this.enemy2 = enemy2;//
        this.enemy3 = enemy3;//
        this.asteroid1 = asteroid1;
        this.asteroid2 = asteroid2;
        this.asteroid3 = asteroid3;
        this.cursors = cursors;//
        this.bg = bg;//
        this.text = text;
        this.shipTrail = shipTrail;//
        this.attackInfo = attackInfo;
        this.attackID = attackID;
        this.enemyAmount = enemyAmount;//enemyAmount on elossa olevien vihollisten määrä
        this.spawnPool = spawnPool; //spawnpool on syntyvien vihollisten määrä per aalto
        this.lap = lap;
        this.enemyBullets = enemyBullets;
        this.music = music;
        this.clipText = clipText;
        this.HPbar = HPbar;
        this.HUD = HUD;
        this.laserBul = laserBul;
        this.clips = clips;
        this.reloading = reloadingAr;
        this.minesBul = minesBul;
        this.minesExpl = minesExpl;
        this.dropBoom = dropBoom;
        this.dropApi = dropApi;
        this.playerRelatedData = playerRelatedData;
        this.abilityReloading = abilityReloading;
        this.pauseMenu = pauseMenu;
        //Loput muuttujat
        this.isOnPaused = false;
        this.asteroidAmmount = 3;
        this.fireRate = 450;
        this.direct = "";
        this.flipped = false;
        this.IntMouseTrack = -1;
        this.kick = 60;
        this.pickedAbilityExists = false;
        this.pickedAbilityShield = false;
        this.attackLoot = 0;
        this.bulletSpeedBonus = this.playerRelatedData.shipStats.guns.gunSpeedBoost;
        this.HUDchangeEvent = false; //mahdollistaa tehoste HUDin käytön hiiren rullalla ilman että tehoste laukeaa

        this.clipSizes = [35, 30, 5, 1];
        this.frameSkip = 0;
        this.timers = [0,60,300,0,1,0];//custom ajastimet, tällä hetkellä: peruscombo,pomon buff,aaltojen delay,scrolldelay,panosten hallinta bullet collision limitter
        this.reloadSprite = game.add.sprite(0, 0, "reloadTray");
        this.fixed = false;//debug, to be removed
    },
    create: function () {
        // It's extreme important that this check is made in this state or browser will freeze!!
            if(game.physics.p2.paused){
                game.physics.p2.resume();
             }
        // Please read the note above
        var self = this;
        //fysiikat voidaan sallia vain pyörivässä statessa
        this.game.physics.p2.enable(this.ship);
        this.game.camera.follow(this.ship);
        this.game.physics.p2.defaultRestitution = 0.8;
        this.game.physics.p2.enable(this.asteroids);
        this.asteroids.forEach(function (item) {
            item.body.clearCollision();
        });
        //luodaan törmäysryhmät
        this.playerCollisonGroup = this.game.physics.p2.createCollisionGroup();
        this.enemiesCollisonGroup = this.game.physics.p2.createCollisionGroup();
        this.boomCollisonGroup = this.game.physics.p2.createCollisionGroup();

        this.game.physics.p2.updateBoundsCollisionGroup();
        this.ship.body.setCollisionGroup(this.playerCollisonGroup);
        this.ship.body.collides([this.enemiesCollisonGroup]);
        this.minesExpl.forEach(function(i){
            i.body.setCollisionGroup(this.boomCollisonGroup);
            i.body.collides([this.enemiesCollisonGroup]);
        },this);
        this.shipAccessories.getChildAt(0).forEach(function(item){
            if(item.name == "EMP"){
                item.body.setCollisionGroup(this.boomCollisonGroup);
                item.body.collides([this.enemiesCollisonGroup]);
            }
        },this);
        this.shipAccessories.getChildAt(1).getChildAt(1).body.setCollisionGroup(this.boomCollisonGroup);
        this.shipAccessories.getChildAt(1).getChildAt(1).body.collides([this.enemiesCollisonGroup]);
        //lisätään kuuntelija hiiren rullalle
        this.game.input.mouse.mouseWheelCallback = function(){self.changeHUDSlot()};
        $("canvas").css("cursor","url('assets/sprites/cursor.png'),none");//asetetaan kursori, ei toimi jos tekee createssa
        this.game.physics.p2.enableBody(this.reloadSprite);
        this.reloadSprite.kill();
        this.ship.body.mass = 0.7;
        //tästä avataan pausevalikko
        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.pause,this);
    },
    update: function () {
        //mikäli pause menu ei ole auki
        if(!this.isOnPaused) {
            testi = 0;
            var self = this;
            var benchmark = performance.now();
            this.ship.body.damping = 0.7;
            //this.ship.body.collideWorldBounds = true;
            //pyörittää asteroideja
            var dir = 0;
            this.asteroids.forEachAlive(function (item) {
                if (dir == 0) {
                    item.body.rotateLeft(0.6);
                    dir = 1;
                } else if (dir == 1) {
                    item.body.rotateRight(0.7);
                    dir = 2;
                } else {
                    item.body.rotateLeft(0.8);
                    dir = 0;
                }

            });
            var Ycoord;
            var Xcoord;
            //calculate deg
            //otetaan huomioon kameran ja kentän koon erotus
            if (this.ship.body.y <= 400) {
                Ycoord = (this.ship.body.y) - this.game.input.mousePointer.y;
            }
            else {
                Ycoord = (this.ship.body.y - this.game.camera.y) - this.game.input.mousePointer.y;
            }
            if (this.ship.body.x <= 600) {
                Xcoord = this.game.input.mousePointer.x - (this.ship.body.x);
            }
            else {
                Xcoord = this.game.input.mousePointer.x - (this.ship.body.x - this.game.camera.x);
            }
            //Yksikköympyrä arvoja joihin lisätään tarvittaessa edelliset
            switch (true) {
                case (Xcoord > 0 && Ycoord > 0):
                    deg = Math.atan(Ycoord / Xcoord);
                    break;
                case (Xcoord < 0 && Ycoord > 0):
                    deg = (Math.atan(((Xcoord / Ycoord) * (0 - 1)))) + (pi / 2);
                    break;
                case (Xcoord < 0 && Ycoord < 0):
                    deg = (Math.atan(Ycoord / Xcoord)) + pi;
                    break;
                case (Xcoord > 0 && Ycoord < 0):
                    deg = (Math.atan((Xcoord / Ycoord) * (0 - 1))) + ((3 * pi) / 2);
                    break;
                default:
            }
            //console.log(this.ship.body.rotation);
            //rotation arvo yli ~7.8 tai alle ~-7.8
            if (this.ship.body.rotation > 2 * pi + (pi / 2) || this.ship.body.rotation < -1 * ((2 * pi) + (pi / 2))) {
                this.ship.body.rotation = Math.round((pi / 2) * 10) / 10;
            }//mikäli raja-arvojen sisällä mutta negatiivinen
            else if (this.ship.body.rotation < pi / 2) {
                this.ship.body.rotation = Math.round((2 * pi - (this.ship.body.rotation * -1)) * 10) / 10;
            }

            //Pyöristetään ja korreloidaan
            var corDeg = Math.round(((2 * pi - deg) + (pi / 2)) * 10) / 10;//hiiren arvo
            var corRot = Math.round(this.ship.body.rotation * 10) / 10;//aluksen arvo
            if (corDeg == 7.9) {
                corDeg -= 0.1;
                corDeg = Math.round(corDeg * 10) / 10;
            }
            if ((corDeg >= 6 && degWas <= 3.0) || (corDeg <= 3 && degWas >= 6)) {
                if (this.flipped == false) {
                    this.flipped = true;
                } else {
                    this.flipped = false;
                }
            }
            this.ship.body.rotation = ((2 * pi - deg) + (pi / 2));

            text2.text = "";
            this.HUD.points.text = "Points: " + points;
            this.clipText.text = this.clips[this.HUD.webTray.trayPosition - 1];
            if (this.ship.shield && !this.pickedAbilityShield) {
                this.shipAccessories.getChildAt(0).getChildAt(this.shipAccessories.shieldPos).x = this.ship.x;
                this.shipAccessories.getChildAt(0).getChildAt(this.shipAccessories.shieldPos).y = this.ship.y;
            }
            else if(this.ship.shield && this.pickedAbilityShield){
                this.shipAccessories.getChildAt(1).getChildAt(2).x = this.ship.x;
                this.shipAccessories.getChildAt(1).getChildAt(2).y = this.ship.y;
            }
            //liikutetaan hiiren viereen
            this.clipText.x = parseFloat(this.game.input.activePointer.worldX + 40);
            this.clipText.y = parseFloat(this.game.input.activePointer.worldY + 5);
            //mikäli lataus tray pelissä, liikutetaan sitäkin
            if (this.reloadSprite.alive) {
                this.reloadSprite.body.y = this.game.input.activePointer.worldY + this.reloadSprite.height / 2;
                this.reloadSprite.body.x = this.game.input.activePointer.worldX + this.reloadSprite.width / 2;
            }
            if (execTime > 10) {
                //alert("performance issue: " + execTime);
            }

            degWas = Math.round((corDeg + 1 - 1) * 10) / 10;
            lastRot = Math.round(this.ship.body.rotation * 10) / 10;


            //cursors
            if (this.cursors.up.isDown) {
                this.ship.body.thrust(this.ship.speed);
                this.shipTrail.forEach(function (em) {
                    em.emitParticle();
                    ///em.emitParticle();
                });
            }
            else if (this.cursors.down.isDown) {
                this.ship.body.reverse(this.ship.speed);
            }
            if (this.cursors.left.isDown) {
                //tämä kohdistaa alukseen voimavektorin joka lasketaan aluksen kulman perusteella
                this.ship.body.applyForce([Math.cos(this.ship.body.rotation) * 7, Math.sin(this.ship.body.rotation) * 7], 0, 0);
            }
            else if (this.cursors.right.isDown) {
                this.ship.body.applyForce([-Math.cos(this.ship.body.rotation) * 7, -Math.sin(this.ship.body.rotation) * 7], 0, 0);
            }
            //lataus
            if (this.cursors.reload.isDown && !this.reloading[this.HUD.webTray.trayPosition - 1]) {
                reload(this.reloadSprite, this.clips, this.HUD.webTray.trayPosition - 1, this.HUD, this.guns.getChildAt(this.HUD.webTray.trayPosition - 1), 1, this.reloading,this.playerRelatedData.shipStats.guns.gunReloadBoost);
            }
            //aseen&abilityn vaihto
            if (this.cursors.abil1.isDown || this.cursors.abil2.isDown || this.cursors.abil3.isDown || this.cursors.wep1.isDown || this.cursors.wep2.isDown || this.cursors.wep3.isDown) {
                this.changeHUDSlot(true, this.game.input.keyboard.lastKey.event.which);
            }

            //ampuminen
            //laserFire kutsuu itseään niin kauan että lipas on tyhjä
            var laserFire = function () {
                if (fire(self.laserBul, self.guns.getChildAt(self.HUD.webTray.trayPosition - 1), self.guns.getChildAt(self.HUD.webTray.trayPosition - 1).fireRate, corRot, self.ship)) {
                    self.clips[self.HUD.webTray.trayPosition - 1]--;
                }
                if (fire(self.laserBul, self.guns.getChildAt(self.HUD.webTray.trayPosition - 1), self.guns.getChildAt(self.HUD.webTray.trayPosition - 1).fireRate, corRot, self.ship)) {
                    self.clips[self.HUD.webTray.trayPosition - 1]--;
                }
                if(self.clips[self.HUD.webTray.trayPosition - 1] <= 0){
                    self.game.time.events.add(1000, function () {
                        musics.sounds.playerLaser.currentTime = 0;
                    }, self);
                }
                if (self.clips[self.HUD.webTray.trayPosition - 1] > 0) {
                    self.game.time.events.add(5, function () {
                        laserFire();
                    }, self);
                }
            };
            //mikäli valitussa aseessa on panoksia, sitä ei ladata ja pelaaja on hengissä
            //fire palauttaa true mikäli ammutiin panos
            if (this.game.input.activePointer.leftButton.isDown && this.clips[this.HUD.webTray.trayPosition - 1] > 0 && !this.reloading[this.HUD.webTray.trayPosition - 1] && this.ship.alive) {
                if (this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).name == "basic") {
                    if (fire(this.bullets, this.guns.getChildAt(this.HUD.webTray.trayPosition - 1), this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate, corRot, this.ship,null,this.bulletSpeedBonus)) {
                        this.clips[this.HUD.webTray.trayPosition - 1]--;
                        musics.sounds.playerBasic.currentTime = 0;
                        musics.sounds.playerBasic.play();
                    }
                } else if (this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).name == "laser") {
                    if(!musics.sounds.playerLaser.currentTime > 0) {
                        musics.sounds.playerLaser.play();
                    }
                    laserFire();
                } else if (this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).name == "mines") {
                    if (fire(this.minesBul, this.guns.getChildAt(this.HUD.webTray.trayPosition - 1), this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate, corRot, this.ship,null,this.bulletSpeedBonus)) {
                        this.clips[this.HUD.webTray.trayPosition - 1]--;
                    }
                 
                } else if (this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).name == "shotgun") {
                    if (fire(this.bullets, this.guns.getChildAt(this.HUD.webTray.trayPosition - 1), this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate, corRot, this.ship,null,this.bulletSpeedBonus)) {
                        this.clips[this.HUD.webTray.trayPosition - 1]--;
                        musics.sounds.playerShotgun.currentTime = 0;
                        musics.sounds.playerShotgun.play();
                    }
                }
                //mikäli panokset loppuivat, aktivoidaan lataus
            } else if (!this.reloading[this.HUD.webTray.trayPosition - 1] && this.clips[this.HUD.webTray.trayPosition - 1] <= 0) {
                reload(this.reloadSprite, this.clips, this.HUD.webTray.trayPosition - 1, this.HUD, this.guns.getChildAt(this.HUD.webTray.trayPosition - 1), 1, this.reloading,this.playerRelatedData.shipStats.guns.gunReloadBoost);
            }
            //tehosteet
            if (this.game.input.activePointer.rightButton.justReleased(40) && !this.abilityReloading[this.HUD.abTray.trayPosition - 1] && !this.HUDchangeEvent && this.shipAccessories.getChildAt(0).length != 0) {
                var tempFired = false;
                var mass = this.ship.body.mass + 1 - 1;
                if(this.HUD.abTray.trayPosition <= this.shipAccessories.pickUpStartSlotIndex){
                    if (this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1).name == "superSpeed") {
                        //superspeed pienentää aluksen massaa tietyksi aikaa
                        this.game.time.events.add(1000, function () {
                            this.ship.body.mass = mass + 1 - 1;
                            mass = null;
                            reload(null, null, this.HUD.abTray.trayPosition - 1, this.HUD, this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1), 2, this.abilityReloading,this.playerRelatedData.shipStats.powers.powerReloadBonus);
                        }, this);
                        this.ship.body.mass *= 0.1;
                        this.abilityReloading[this.HUD.abTray.trayPosition - 1] = true;
                    } else if (this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1).name == "shield") {
                        //kilpi luo aluksen ympärille spriten johon panokset kuolevat ennen osumista pelaajaan
                        this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1).revive();
                        this.game.time.events.add(5000, function () {
                            this.shipAccessories.getChildAt(0).getChildAt(this.shipAccessories.shieldPos).kill();
                            this.ship.shield = false;
                            reload(null, null, this.HUD.abTray.trayPosition - 1, this.HUD, this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1), 2, this.abilityReloading);
                        }, this);
                        this.ship.shield = true;
                    }
                    else if (this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1).name == "EMP") {
                        //EMP asettaa viholliselle sen isStuunned arvon kohtaan true mikäli se osuu viholliseen
                        var EMP = this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1);
                        EMP.reset(this.ship.x, this.ship.y);
                        reload(null, null, this.HUD.abTray.trayPosition - 1, this.HUD, this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1), 2, this.abilityReloading);
                        var tween = this.game.add.tween(EMP.scale).to({x: 3, y: 3}, 500, "Linear", true);
                        tween.onComplete.add(function () {
                            EMP.scale.setTo(0.01, 0.01);
                            EMP.kill();
                        }, this);
                    }
                    else if (this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1).name == "fireRateBoost") {
                        //fireRate pienentää aseiden odotusaikaa ennen seuraavaa panosta
                        var returnValue = this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate;
                        var buffedGun = this.HUD.webTray.trayPosition - 1;
                        this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate /= 2;
                        reload(null, null, this.HUD.abTray.trayPosition - 1, this.HUD, this.shipAccessories.getChildAt(0).getChildAt(this.HUD.abTray.trayPosition - 1), 2, this.abilityReloading);
                        this.game.time.events.add(3500, function () {
                            this.guns.getChildAt(buffedGun).fireRate = returnValue;
                        }, this)
                    }
                }
                else if(this.pickedAbilityExists && this.HUD.abTray.trayPosition > this.shipAccessories.pickUpStartSlotIndex) {
                    //sama juttu mutta kerta käyttöisille
                    console.log("starting ability...");
                    if (this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is).name == "superSpeed") {
                        var abil = this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is);
                        this.game.time.events.add(1000, function () {
                            this.ship.body.mass = mass + 1 - 1;
                            mass = null;
                        }, this);
                        this.ship.body.mass *= 0.1;
                        this.abilityReloading[this.HUD.abTray.trayPosition - 1] = true;
                        tempFired = true;
                    } else if (this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is).name == "shield") {
                        var abil = this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is);
                        abil.revive();
                        this.game.time.events.add(5000, function () {
                            abil.kill();
                            this.ship.shield = false;
                            this.pickedAbilityShield = false;
                        }, this);
                        this.ship.shield = true;
                        this.pickedAbilityShield = true;
                        tempFired = true;
                    }
                    else if (this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is).name == "EMP") {
                        var EMPtemp = this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is);
                        EMPtemp.reset(this.ship.x, this.ship.y);
                        EMPtemp.x = this.ship.x;
                        EMPtemp.body.x = this.ship.x;
                        EMPtemp.body.y = this.ship.y;
                        var tween = this.game.add.tween(EMPtemp.scale).to({x: 3, y: 3}, 500, "Linear", true);
                        tween.onComplete.add(function () {
                            EMPtemp.scale.setTo(0.01, 0.01);
                            EMPtemp.kill();
                        }, this);
                        tempFired = true;
                    }
                    else if (this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is).name == "fireRateBoost") {
                        var abil = this.shipAccessories.getChildAt(1).getChildAt(this.HUD.abTray.getChildAt(1).getChildAt(this.shipAccessories.pickUpStartSlotIndex*2+1).is);
                        var returnValue = parseInt(this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate)+1-1;
                        var buffedGun = this.HUD.webTray.trayPosition - 1;
                        this.guns.getChildAt(this.HUD.webTray.trayPosition - 1).fireRate /= 2;
                        this.game.time.events.add(3500, function () {
                            this.guns.getChildAt(buffedGun).fireRate = returnValue;
                        }, this);
                        tempFired = true;
                    }
                }
                //kertakäyttöinen poistetaan käytön jälkeen
                if(tempFired){
                    console.log("removing ability...");
                    var rem = this.abilityReloading.splice(this.HUD.abTray.trayPosition-1,1);
                    rem = null;
                    this.pickedAbilityExists = false;
                    console.log(this.shipAccessories.pickUpStartSlotIndex * 2+2);
                    var removed1 = this.HUD.abTray.getChildAt(1).removeChildAt(this.shipAccessories.pickUpStartSlotIndex * 2+2);
                    var removed2 = this.HUD.abTray.getChildAt(1).removeChildAt(this.shipAccessories.pickUpStartSlotIndex * 2+1);
                    removed1.destroy();
                    removed2.destroy();

                }
            }//mikäli tehosteen käyttö estettiin HUDchangeEventillä, se asetetaan takasin falseksi tässä
            else if (this.HUDchangeEvent && !this.game.input.activePointer.rightButton.isDown && !this.game.input.activePointer.rightButton.justReleased(40)) {
                this.HUDchangeEvent = false;
            }

            //Hyökkäyksen hallinta
            //alert(enemy1.countLiving);
            if ((spawnNext == true || spawnNext == "undefined") && this.timers[2] <= 0) {
                var randNumbers = randNumber(this.lap);
                this.game.time.events.add((randNumbers[1] * 1000), function () {
                    //spawnEnemy muuttaa spawnNext muuttujan trueksi kun se on saanut luotua vihollisen
                    var next = spawnEnemy(this.spawnPool, this.enemyAmount, this.enemies, this.lap, this.enemiesCollisonGroup);//palauttaa next jos on aika aloittaa seuraava kierros
                    if (next === "next" && this.lap != 3) {
                        this.lap++;
                        this.enemy1 = this.enemies.getChildAt(this.lap - 1).getChildAt(0);
                        //käytetään lap arvo 4:jää pelin päättymisen seuraamiseen
                        this.enemy2 = this.enemies.getChildAt(this.lap - 1).getChildAt(1);
                        this.enemy3 = this.enemies.getChildAt(this.lap - 1).getChildAt(2);
                        this.timers[2] = 460;
                        this.HUD.banner.frame = this.HUD.banner.frame - 1;
                        this.HUD.banner.revive();
                        this.game.add.tween(this.HUD.banner).to({alpha: 1}, 400, "Linear", true, 1000);
                    } else if (this.lap >= 3 && this.asteroids.countLiving() > 0 && next == "next") {
                        this.game.time.events.add(5000,function(){
                            this.game.state.start('endGame', false, false, this.HUD, this.ship, this.playerRelatedData, this.attackLoot, this.attackID,this.musics,1);
                        },this);
                    }
                }, this);
                //poistetaan banneri tietyn ajan kuluttua
                if (this.timers[2] <= 0 && this.HUD.banner.alive) {
                    this.game.add.tween(this.HUD.banner).to({alpha: 0}, 200, "Linear", true).onComplete.add(function () {
                        this.HUD.banner.kill()
                    }, this);
                }
                //waiter.start();
                spawnNext = false;
            } else {
                this.timers[2]--;
            }
            //panokset
            var eachEnemyAliveFn;
            var eachBulletAliveFn;
            var destroyerBullets = [];
            var commanderAI;
            var hunterAI;
            var destroyerAI;
            var boundsBullet;
          
            if(this.frameSkip == 0 ||this.frameSkip == 1){
                if(this.frameSkip == 1){
                    this.frameSkip = 2;
                } else if(this.frameSkip == 0){
                    this.frameSkip = 1;
                }

                var enm;
                //tässä tutkitaan panoksen osumista käyttökohteen mukaan
                eachBulletAliveFn = function (b) {
                    boundsBullet = b.world;
                    //tämä tutkii annettusta pisteesta osuuko se P2 bodyyn
                    self.bulletArray = self.game.physics.p2.hitTest(boundsBullet, [enm]);
                    if (self.bulletArray.length != 0 && self.timers[4] == 1) {
                        hitDetector(b, enm, self.enemyAmount, self.lap, enm.getChildAt(0), self.dropBoom, self.dropApi,self.playerRelatedData);
                        if (b.name == "mine") {
                            var boom = self.minesExpl.getFirstDead();
                            boom.reset(b.x, b.y);
                            var tween = self.game.add.tween(boom.scale);
                            tween.to({x: 1.5, y: 1.5}, 500, "Linear", true);
                            tween.onComplete.add(function () {
                                boom.kill();
                                boom.scale.setTo(0.1, 0.1);
                            });
                        }
                    } else if (self.bulletArray.length != 0 && self.timers[4] == 2) {//jos pelaajaan osumista tutkitaan
                            hitDetector(b, enm, null, self.lap, self.HPbar, null, null,self.playerRelatedData);
                            if (self.ship.health == 0.001) {
                                self.attackLoot += 300;
                            }
                            if (b.name == "drop" && !(self.pickedAbilityExists)) {//jos pelaaja osui poimittavaan abilityyn
                                var abil = game.add.sprite(0, 22, "ability" + b.ability);
                                abil.x = 54 * 2 + 12.5;
                                abil.scale.setTo(0.4, 0.4);
                                abil.is = b.ability;
                                self.HUD.abTray.getChildAt(1).addChild(abil);
                                var reloadTrayAb = game.add.sprite(0, 22, 'trayReloading');
                                reloadTrayAb.x = 54 * 2 + 12.5;
                                reloadTrayAb.alpha = 0;
                                self.HUD.abTray.getChildAt(1).addChild(reloadTrayAb);
                                self.pickedAbilityExists = true;
                                self.abilityReloading.push(false);
                            }

                    } else if (self.bulletArray.length != 0 && self.timers[4] == 3) {
                        //asteroidHitDetector palauttaa 0 jos ei ole enää asteroideja, 1 jos asteroidi tuhottiin, 2 jos vain osuma
                        var whatHappens = asteroidHitDetector(b, enm, self.asteroidAmmount);
                        if (whatHappens == 0) {
                            this.game.time.events.add(2000,function(){
                                self.game.state.start('endGame', false, false, self.HUD, self.ship, self.playerRelatedData, self.attackLoot, self.attackID,self.musics,2);
                            },this);
                        } else if(whatHappens == 1){
                            self.asteroidAmmount--;
                            self.attackLoot += 350;
                        } else {
                            self.attackLoot += 10;
                        }
                    }
                };
                eachEnemyAliveFn = function (en) {//jokainen vihollinen ja pelaaja kutsuu tätä. Tämä asettaa
                    enm = en;
                    if (self.timers[4] == 1) {
                        self.bullets.forEachAlive(eachBulletAliveFn);
                        self.laserBul.forEachAlive(eachBulletAliveFn);
                        self.minesBul.forEachAlive(eachBulletAliveFn);
                    } else if (self.timers[4] == 2) {
                        self.enemyBullets.forEachAlive(eachBulletAliveFn);
                        self.dropApi.forEachAlive(eachBulletAliveFn);
                    } else {//tämä tutkii asteroidin tuhoajien panokset
                        for (var u = 0; u < destroyerBullets.length; u++) {
                            eachBulletAliveFn(destroyerBullets[u]);
                        }
                        if(!self.ship.alive){
                            self.enemyBullets.forEachAlive(eachBulletAliveFn);
                        }
                    }
                };
                // asteroidien tuhoajien AI
                destroyerAI = function (enemy) {
                    if(!enemy.isStunned) {
                        var num;
                        if (this.timers[5] >= 5) {//tutkitaan panosten osumista
                            eachEnemyAliveFn(enemy);
                        }
                        if (enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000 || enemy.name == "r") {
                            enemy.name = "fresh";
                            enemy.body.mass = 1;
                            enemy.body.damping = 0.5;

                        } else if (enemy.name == "fresh") {
                            // uudelle viholliselle valitaan kohde
                            var targetAsteroid = this.asteroids.getRandom();
                            // suodatetaan nimestä pois kirjaimet
                            num = targetAsteroid.key.replace(/^\D+/g, '');
                            // nimetään vihollinen
                            if (num == 1) {
                                enemy.name = 0.1;
                            }
                            if (num == 2) {
                                enemy.name = 1.1;
                            }
                            if (num == 3) {
                                enemy.name = 2.1;
                            }
                        }
                        // seuraavalla kierroksella tarkistetaan vihollisen sijainti ja nimi
                        if (enemy.body.y > 100 && enemy.body.x < this.game.world.width - 100
                            && enemy.body.y > 100 && enemy.body.y < this.game.world.height - 100
                            && enemy.name == 0.1 || enemy.name == 1.1 || enemy.name == 2.1) {
                            //tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                            enemy.body.mass = rnd.realInRange(0.8, 0.92);
                            enemy.body.damping = rnd.realInRange(0.8, 0.92);
                            // suunnataan vihollisen alus kohti kohde aseteroidia
                            var target1 = this.asteroids.getChildAt(enemy.name - 0.1);
                            dir = acquireTarget(target1, enemy);
                            enemy.body.rotation = dir + 1 - 1;
                            dir = null;
                            target1 = null;
                            enemy.body.thrust(60);
                            // listätään alukselle massa ja hidastetaan sen vauhtia
                            this.game.time.events.add(1000, function () {
                                enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup, this.boomCollisonGroup]);
                                enemy.body.onBeginContact.add(this.boomCollision, this);
                                enemy.body.mass = 0.7;
                                enemy.body.damping = 0.7;
                            }, this);
                            //Muutetaan vihollisen nimi jotta se ei tule enään tähän silmukkaan
                            enemy.name = Math.round((enemy.name - 0.1) * 10) / 10;

                            //Tämä ajetaan kohteen ja massan saaneellee viholliselle normaalisti
                        } else if (enemy.name == 0 || enemy.name == 1 || enemy.name == 2) {
                            if (this.asteroids.getChildAt(enemy.name).alive == true) {//jos kohde hengissä
                                var target = this.asteroids.getChildAt(enemy.name);
                                var dir = acquireTarget(target, enemy);
                                enemy.body.rotation = dir + 1 - 1;
                                dir = null;
                                if (!checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1, enemy.targetOff)) {
                                    enemy.body.thrust(100);
                                }
                                if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1, enemy.targetOff) && enemy.ray == null && enemy.wait == 0) {
                                    //vihollisen panokset ovat näkymättömiä, laser on vain efekti
                                    enemy.getChildAt(2).emitParticle();
                                    var gun = null;
                                    enemyFire(enemy, gun, this.enemyBullets, enemy.fireRate, this.asteroids.getChildAt(enemy.name), destroyerBullets);
                                    enemy.ray = "g";
                                } else if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1, enemy.targetOff) && enemy.wait < 2) {
                                    enemy.wait += 1;
                                } else if (enemy.wait >= 2 && enemy.ray !== null) {
                                    enemy.ray = null;
                                    enemy.wait = 0;
                                } else if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 2, enemy.targetOff) && enemy.ray !== null) {
                                    enemy.ray = null;
                                    enemy.wait = 0;
                                }
                            } else {
                                if (enemy.ray !== null) {
                                    enemy.ray = null;
                                    enemy.wait = 0;
                                }
                                num = this.asteroids.getRandom().key.replace(/^\D+/g, '');
                                if (num == 1) {
                                    enemy.name = 0.1;
                                }
                                if (num == 2) {
                                    enemy.name = 1.1;
                                }
                                if (num == 3) {
                                    enemy.name = 2.1;
                                }
                                num = null;
                                target = null;
                            }
                        }
                    } else {//jos vihollinen on osunut EMP pulssiin
                        enemy.body.setZeroVelocity();
                        if (this.timers[5] >= 5) {
                            eachEnemyAliveFn(enemy);
                        }
                    }
                };
                hunterAI = function (enemy) {
                    if(!enemy.isStunned) {
                        if (this.timers[5] >= 5) {//tutkitaan panosten osumista
                            eachEnemyAliveFn(enemy);
                        }
                        if (enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000 || enemy.name == "") {
                            enemy.name = "fresh";
                            enemy.body.mass = 1;
                            enemy.body.damping = 0.5;
                        } else if (enemy.name == "fresh") {
                            enemy.name = "free";
                        }
                        var dir;
                        if (enemy.name == "inPlay") {//tämä ajetaan normaalisti koko ajan
                            dir = acquireTarget(this.ship, enemy);
                            enemy.body.rotation = dir;
                            dir = null;

                            if (checkRange(this.ship.x, this.ship.y, enemy.x, enemy.y, 2) && this.ship.alive) {
                                enemy.body.thrust(0);
                                enemyFire(enemy, enemy.getChildAt(enemy.children.length - 1), this.enemyBullets, enemy.fireRate, this.ship);

                            } else if (!this.ship.alive) {
                                enemy.body.rotation = enemy.body.x / 10;
                                enemy.body.thrust(250);
                            } else {
                                enemy.body.thrust(250);
                            }
                        }

                        else if (enemy.body.y > 100 && enemy.body.x < this.game.world.width - 100
                            && enemy.body.y > 100 && enemy.body.y < this.game.world.height - 100
                            && enemy.name == "free") {//tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                            if (enemy.body.mass < 0.85) {
                                enemy.body.mass = rnd.realInRange(0.85, 1.25);
                                enemy.body.damping = rnd.realInRange(0.8, 0.99);
                            }

                            if (enemy.body.force.destination[0] == 0) {
                                enemy.name = "inPlay";
                                enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup, this.boomCollisonGroup]);
                                enemy.body.onBeginContact.add(this.boomCollision, this);
                                enemy.body.mass = 0.7;
                                enemy.body.damping = 0.7;
                            }
                        }
                        if (this.frameSkip == 0) {
                            enemy.rendeable = false;
                        }
                    } else {
                        enemy.body.setZeroVelocity();
                        if (this.timers[5] >= 5) {
                            eachEnemyAliveFn(enemy);
                        }
                    }
                };// Pelaajan jahtaajan tekoäly loppuu
                //isojen vihujen tekoäly alkaa
                commanderAI = function (enemy) {
                    if(!enemy.isStunned) {
                        if (this.timers[5] >= 5) {//tutkitaan panosten osumista
                            eachEnemyAliveFn(enemy);
                        }
                        if (enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000 || enemy.name == "") {
                            enemy.name = "fresh";
                            enemy.body.mass = 1;
                            enemy.body.damping = 0.5;
                        } else if (enemy.name == "fresh") {
                            enemy.name = "free";
                            enemy.buffTimer = 60;
                        }
                        var dir;
                        if (enemy.name == "inPlay") {//tämä ajetaan normaalisti koko ajan
                            dir = acquireTarget(this.ship, enemy);
                            enemy.body.rotation = dir + 1 - 1;
                            dir = null;

                            var inRange = false;
                            if (enemy.buffTimer <= 0) {//mikäli aika yrittää buffia
                                var buff = function (en) {
                                    if (checkRange(en.x, en.y, enemy.x, enemy.y, 4)) {
                                        inRange = true;
                                        this.tryBuff(en);
                                    }
                                };
                                while (!inRange) {
                                    this.enemy1.forEachAlive(buff, this);
                                    this.enemy2.forEachAlive(buff, this);
                                    inRange = true;
                                }
                                enemy.buffTimer = 60;
                            }
                            enemy.buffTimer -= 2;
                            if (!this.asteroids.getChildAt(enemy.altTarget).alive) {//mikäli vaihtoehtoinen kohde ei ole hengissä
                                var newTarget = -1;
                                while (newTarget == enemy.altTarget || newTarget == -1) {
                                    newTarget = rnd.integerInRange(0, 2);
                                }
                                enemy.altTarget = newTarget;
                            }
                            var altTargetX = this.asteroids.getChildAt(enemy.altTarget).x;
                            var altTargetY = this.asteroids.getChildAt(enemy.altTarget).y;
                            if (checkRange(this.ship.x, this.ship.y, enemy.x, enemy.y, 2) && this.ship.alive) {
                                enemy.body.thrust(0);
                                var gun2;
                                if (enemy.barrel == 1) {
                                    gun2 = enemy.getChildAt(enemy.children.length - 1);
                                    enemy.barrel = 2;
                                } else {
                                    gun2 = enemy.getChildAt(enemy.children.length - 2);
                                    enemy.barrel = 1;
                                }
                                enemyFire(enemy, gun2, this.enemyBullets, enemy.fireRate, this.ship);
                                gun2 = null;

                            } else if (!this.ship.alive && !checkRange(altTargetX, altTargetY, enemy.x, enemy.y, 3)) {
                                enemy.body.rotation = acquireTarget(this.asteroids.getChildAt(enemy.altTarget), enemy);
                                enemy.body.thrust(100);
                            } else if (!this.ship.alive && checkRange(altTargetX, altTargetY, enemy.x, enemy.y, 3)) {///mikäli pelaaja on kuollut, hyökätäänasteroidien kimppuun
                                enemy.body.thrust(0);
                                enemy.body.rotation = acquireTarget(this.asteroids.getChildAt(enemy.altTarget), enemy);
                                var gun;
                                if (enemy.barrel == 1) {
                                    gun = enemy.getChildAt(enemy.children.length - 1);
                                    enemy.barrel = 2;
                                } else {
                                    gun = enemy.getChildAt(enemy.children.length - 2);
                                    enemy.barrel = 1;
                                }
                                enemyFire(enemy, gun, this.enemyBullets, enemy.fireRate, this.asteroids.getChildAt(enemy.altTarget));
                                gun = null;
                            }
                            else {
                                enemy.body.thrust(100);
                            }


                        }
                        else if (enemy.body.y > 100 && enemy.body.x < this.game.world.width - 100
                            && enemy.body.y > 100 && enemy.body.y < this.game.world.height - 100
                            && enemy.name == "free") {//tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                            if (enemy.body.mass < 0.85) {
                                enemy.body.mass = rnd.realInRange(0.85, 1.25);
                                enemy.body.damping = rnd.realInRange(0.8, 0.99);
                            }

                            if (enemy.body.force.destination[0] == 0) {
                                enemy.name = "inPlay";

                                enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup, this.boomCollisonGroup]);
                                enemy.body.onBeginContact.add(this.boomCollision, this);
                                enemy.body.mass = 1.9;
                                enemy.body.damping = 0.7;
                            }
                        }
                        if (this.frameSkip == 0) {
                            enemy.rendeable = false;
                        }
                    }
                    else{
                        enemy.body.setZeroVelocity();
                        if (this.timers[5] >= 5) {
                            eachEnemyAliveFn(enemy);
                        }
                    }
                };//pomon tekoälyloppuu
            }

            this.fixed = "";
            //frameSkip rajoittaa raskaiden funktioiden ajamista joka toiseen ruutuun
            if (this.frameSkip == 2||this.frameSkip == 1) {
                // Asteroidin jahtaajan tekoäly
                this.enemy1.forEachAlive(destroyerAI, this); // Asteroidin jahtaajan tekoäly loppuu
                // Pelaajan jahtaajan tekoäly
                this.enemy2.forEachAlive(hunterAI, this);

                //Pomon tekoäly
                this.enemy3.forEachAlive(commanderAI, this);

                //tiputettujen räjähteiden osumat
                if (this.dropBoom.countLiving() > 0) {
                    this.game.physics.arcade.overlap(this.dropBoom, this.laserBul, this.dropBoomStarter, null, this);
                    this.game.physics.arcade.overlap(this.dropBoom, this.bullets, this.dropBoomStarter, null, this);
                }
                this.frameSkip = 0;
            }
            self.timers[4]++;
            //tutkitaan vihujen panosten osumista pelaajaan
            if (!this.ship.dying && !this.ship.shield) {
                eachEnemyAliveFn(this.ship);
            } else if (!this.ship.dying && this.ship.shield) {
                this.game.physics.arcade.overlap(this.shipAccessories.getChildAt(0).getChildAt(this.shipAccessories.shieldPos), this.enemyBullets, this.shieldHit, null, this);
            }
            self.timers[4]++;
            this.asteroids.forEachAlive(eachEnemyAliveFn);
            eachBulletAliveFn = null;
            eachEnemyAliveFn = null;
            self.timers[4] = 1;
            if (this.timers[5] >= 5) {
                this.timers[5] = 0;
            } else {
                this.timers[5]++;
            }

            var benchmark2 = performance.now();
            var wholeLoop = benchmark2 - testBM;
            testBM = performance.now();
            execTime = benchmark2 - benchmark;
            if (execTime > 0.5) {
                //console.log(execTime);
                //console.log(wholeLoop);
            }
        }
    },
    tryBuff: function(en){
		var chance = rnd.integerInRange(0,6); //1/6 mahdollisuus buffille
        if(chance == 1){
            if(en.health < en.maxHealth){//oletus buff on parantaminen
                en.health += 0.25;
				var healed  = this.HUD.buffTrays1.getFirstDead(true);
				healed.revive();
				healed.x = en.x;
				healed.y = en.y;
				var tween = this.game.add.tween(healed);
				tween.to({y:healed.y-100},3000,"Linear",true);
				tween.onComplete.add(function(){
					healed.kill();
				});
            } else if(en.fireRate == en.parent.fireRate){//vaihtoehto on tulitusnopeuden kasvatus
                en.fireRate = en.fireRate/2;
				var boosted  = this.HUD.buffTrays2.getFirstDead(true);
				boosted.revive();
				boosted.x = en.x;
				boosted.y = en.y;
				var tween = this.game.add.tween(boosted);
				tween.to({y:boosted.y-100},3000,"Linear",true);
				tween.onComplete.add(function(){
					boosted.kill();
				});
                this.game.time.events.add(5000, function(){
                    en.fireRate = en.parent.fireRate;
                },this);
            }
        }
    }, // trybuff
    changeHUDSlot: function(wasKeyboard,key){
        if(wasKeyboard){
            var to;
            if(key == 49||key == 50|| key == 51) { //jos vaihdetaan asetta
                var actualKeys = {
                    49:1,
                    50:2,
                    51:3
                };
                to = actualKeys[key] - this.HUD.webTray.trayPosition;
                if (this.guns.getChildAt(actualKeys[key]-1) != null){
                this.HUD.webTray.trayPosition = actualKeys[key];
                this.HUD.webTray.getChildAt(0).x += 54 * to;
                this.timers[3]++;
                this.game.time.events.add(175, function () {//tällä rajoitetaan rullaa jolloin HUDia on helpompi käyttää
                    this.timers[3] = 0
                }, this);
                }
            } else {//jos vaihdetaan tehostetta
                if (this.cursors.abilChangeHotkeys[key] < 4) {
                    to = this.cursors.abilChangeHotkeys[key] - this.HUD.abTray.trayPosition;
                    this.HUD.abTray.trayPosition = this.cursors.abilChangeHotkeys[key];
                    this.HUD.abTray.getChildAt(0).x += 54 * to;
                    this.timers[3]++;
                    this.game.time.events.add(175, function () {
                        this.timers[3] = 0
                    }, this);
                }
            }
        } else {//tällöin oletetaan että kutsu tuli hiiren rullan kuuntelijasta
            if (!this.game.input.activePointer.isDown) {
                if (this.game.input.mouse.wheelDelta == 1 && this.HUD.webTray.trayPosition < this.guns.length && this.timers[3] == 0) {
                    this.HUD.webTray.getChildAt(0).x += 54;
                    this.HUD.webTray.trayPosition++;
                    this.timers[3]++;
                    this.game.time.events.add(175, function () {
                        this.timers[3] = 0
                    }, this);
                } else if (this.game.input.mouse.wheelDelta == -1 && this.HUD.webTray.trayPosition > 1 && this.timers[3] == 0) {
                    this.HUD.webTray.getChildAt(0).x -= 54;
                    this.HUD.webTray.trayPosition--;
                    this.timers[3]++;
                    this.game.time.events.add(175, function () {
                        this.timers[3] = 0
                    }, this);
                }
            } else if (this.game.input.activePointer.rightButton.isDown) {
                this.HUDchangeEvent = true;
                if (this.game.input.mouse.wheelDelta == 1 && this.HUD.abTray.trayPosition < 3 && this.timers[3] == 0) {
                    this.HUD.abTray.getChildAt(0).x += 54;
                    this.HUD.abTray.trayPosition++;
                    this.timers[3]++;
                    this.game.time.events.add(175, function () {
                        this.timers[3] = 0
                    }, this);
                } else if (this.game.input.mouse.wheelDelta == -1 && this.HUD.abTray.trayPosition > 1 && this.timers[3] == 0) {
                    this.HUD.abTray.getChildAt(0).x -= 54;
                    this.HUD.abTray.trayPosition--;
                    this.timers[3]++;
                    this.game.time.events.add(175, function () {
                        this.timers[3] = 0
                    }, this);
                }
            }
        }
    },
    boomCollision : function(a,b,shapeCaller,shapeCollided,c){//tätä hyödynnetään kun täytyy ajaa logiikkaa kahden P2 bodyn törmätessä
        if(a != null) {//tämä callback ajetaan myös silloin kun vihut törmäävät toisiinsa
            if (shapeCollided.body.parent.sprite.key == "boom") {
                shapeCaller.body.mass = 9999;
                shapeCaller.body.damping = 0.999;
                hitDetector(shapeCollided.body.parent.sprite, shapeCaller.body.parent.sprite, this.enemyAmount, this.lap, shapeCaller.body.parent.sprite.getChildAt(0),this.dropBoom,this.dropApi,this.playerRelatedData);
            } else if(shapeCollided.body.parent.sprite.key == "EMP"){
                shapeCaller.body.parent.sprite.isStunned = true;
                this.game.time.events.add(6000,function(){
                    shapeCaller.body.parent.sprite.isStunned = false;
                },this)
            }
        }
    },
    dropBoomStarter: function(drop,bullet){//tämä hoitaa räjähtävät dropit ja sen räjähdyksen aktivoinnin. Räjähdyn on P2 fysiikoilla ja funktio yläpuolella hoitaa sen
        hitDetector(bullet,drop,1,this.lap,null,null,null,this.playerRelatedData);
        if(drop.health == 0.001){//kuolleiden asioiden healtiksi asetetaan 0.001
            var boom = this.minesExpl.getFirstDead();
            boom.reset(drop.x,drop.y);
            var tween = this.game.add.tween(boom.scale);
            tween.to({x:1.5,y:1.5},500,"Linear",true);
            tween.onComplete.add(function(){
                boom.kill();
                boom.scale.setTo(0.1,0.1);
            });
        }
    },
    shieldHit:function(shield,bullet){
        bullet.kill();
    },
    pause:function(){
            if(this.isOnPaused){
                this.isOnPaused = false;
                this.pauseMenu.forEach(function(item){
                    if(item.name != "group") {
                        item.kill();
                    } else {
                        item.forEach(function(itemitem){
                            itemitem.kill();
                        })
                    }
                });
                game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
                game.physics.p2.resume();
            } else {
               //laitetaan molemman fysiikka moottorit pauselle
                game.physics.p2.pause();
                game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
                //merkataan peli pauselle (estää update loopin logiikan)
                this.isOnPaused = true;
                //herätetään pause -menu
                this.pauseMenu.forEach(function(item){
                    if(item.name != "group") {
                        item.revive();
                    } else {
                        item.forEach(function(itemitem){
                            itemitem.revive();
                        })
                    }
                });
                this.pauseMenu.x = this.game.camera.x;
                this.pauseMenu.y = this.game.camera.y;
            }
    }
} // prototype
