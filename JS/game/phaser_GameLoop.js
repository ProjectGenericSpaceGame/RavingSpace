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
	//muuttujien luonti
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
        Hyökkäyksen hallinta
        Panosten osuminen
        Asteroidin jahtaajan tekoäly
        pomon tekoäly
    checkRange
    tryBuff
    reload
     */
};
mainGame.prototype = {
    //Latausvaiheessa alustetut muuttujat tuodaan tähän
    init: function (asteroids, ship, gun, bullets, enemies, enemy1, enemy2, enemy3, asteroid1, asteroid2, asteroid3, cursors, bg, text, shipTrail, attackInfo, enemyAmount, spawnPool, lap,enemyBullets,music,clipText,HPbar,HUD,laserBul,clips,reloadingAr,minesBul,minesExpl,dropBoom,dropApi,playerData) {
        this.asteroids = asteroids;
        this.ship = ship;//
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
        reloading = reloadingAr;
        this.minesBul = minesBul;
        this.minesExpl = minesExpl;
		this.dropBoom = dropBoom;
		this.dropApi = dropApi;
		this.playerData = playerData;
        //Loput muuttujat
        this.asteroidAmmount = 3;
        this.fireRate = 450;
        this.direct = "";
        this.flipped = false;
        this.IntMouseTrack = -1;
        this.kick = 60;

        this.clipSizes = [35, 30, 5, 1];
        //reloading = false;
        this.frameSkip = 0;
        this.timers = [0,60,300,0,1,0];//custom ajastimet, tällä hetkellä: peruscombo,pomon buff,aaltojen delay,scrolldelay,panosten hallinta bullet collision limitter
		//this.text3 = this.game.add.text(0,0,"");
        this.reloadSprite = game.add.sprite(0, 0, "reloadTray");
        this.fixed = false;//dedug, to be removed
    },
    create: function () {
        var self = this;
        //fysiikat voidaan sallia vain pyörivässä statessa
		//this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.enable(this.ship);
        this.game.camera.follow(this.ship);
        this.game.physics.p2.defaultRestitution = 0.8;
        this.game.physics.p2.enable(this.asteroids);
        this.asteroids.forEach(function (item) {
            item.body.clearCollision();
        });
        //this.game.physics.p2.setBounds(0,0,this.game.world.width,this.game.world.height,true,true,true,true,true);
        this.playerCollisonGroup = this.game.physics.p2.createCollisionGroup();
        this.enemiesCollisonGroup = this.game.physics.p2.createCollisionGroup();
        this.boomCollisonGroup = this.game.physics.p2.createCollisionGroup();

        //this.game.physics.p2.setBounds(0,0,1600,1000,true,true,true,true,true);
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.ship.body.setCollisionGroup(this.playerCollisonGroup);
        this.ship.body.collides([this.enemiesCollisonGroup]);
        this.minesExpl.forEach(function(i){
            i.body.setCollisionGroup(this.boomCollisonGroup);
            i.body.collides([this.enemiesCollisonGroup]);
        },this);

		/*if(this.guns.laserLocation != null){
			this.guns.getChildAt(this.guns.laserLocation).body.setCollisionGroup(this.laserColGroup);
			this.guns.getChildAt(this.guns.laserLocation).body.collides([this.enemiesCollisonGroup]);
			//this.guns.getChildAt(this.guns.laserLocation).body.onBeginContact.add(this.laserHit,this);
		}*/
        //this.ship.body.collideWorldBounds = true;
        //this.music.play();
        this.game.input.mouse.mouseWheelCallback = function(){self.changeHUDSlot()};
        $("canvas").css("cursor","url('assets/sprites/cursor.png'),none");//asetetaan kursori, ei toimi jos tekee createssa
        this.game.physics.p2.enableBody(this.reloadSprite);
        this.reloadSprite.kill();
    },
    update: function () {
        testi = 0;
        var self = this;
        var benchmark = performance.now();
        this.ship.body.mass = 0.7;
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
        //tutkii onko panoksia osumassa vihollisiin
        /*this.game.physics.arcade.overlap(this.bullets, this.enemy1, hitDetector, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.enemy2, hitDetector, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.enemy3, hitDetector, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.ship, hitDetector, null, this);*/
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
        //console.log(Ycoord+"ja X:"+Xcoord);
        //console.log(this.ship.body.y+"ja hiiri:"+this.game.input.mousePointer.y);
        //console.log(this.game.camera.width);
        //var X2 = Xcoord * Xcoord;
        //var Y2 = Ycoord * Ycoord;
        //var YX2 = X2 + Y2;
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
            this.ship.body.rotation = Math.round((pi / 2)*10)/10;
            //this.flipped = true;
            //console.log("nollattu"+(2*pi));
        }//mikäli raja-arvojen sisällä mutta negatiivinen
        else if (this.ship.body.rotation < pi / 2) {
            this.ship.body.rotation = Math.round((2 * pi - (this.ship.body.rotation * -1))*10)/10;
            //this.flipped = true;
        }

        //var shipRot = this.ship.body.rotation;
        //console.log(this.ship.body.rotation);
        //console.log(shipRot+"####"+deg+"###"+(2*pi-deg));
        //Pyöristetään ja korreloidaan
        var corDeg = Math.round(((2 * pi - deg) + (pi / 2)) * 10) / 10;//hiiren arvo
        var corRot = Math.round(this.ship.body.rotation * 10) / 10;//aluksen arvo
        if (corDeg == 7.9) {
            corDeg -= 0.1;
            corDeg = Math.round(corDeg*10)/10;
        }
        if ((corDeg >= 6 && degWas <= 3.0) || (corDeg <= 3 && degWas >= 6)){
            if(this.flipped == false) {
                this.flipped = true;
            } else {
                this.flipped = false;
            }
        }
        this.ship.body.rotation = ((2 * pi - deg) + (pi / 2));
        /*
        //tutkitaan hiiren liikkeen suuntaa
        if (((corDeg < degWas && this.direct == "right")
            || (corDeg > degWas && this.direct == "left"))
            && !((degWas > 6.0 && corDeg < 3.0)
            || (degWas < 3.0 && corDeg > 6.0))
            && this.flipped != true
        ) {
            //Tallennetaan se kulma missä hiiren liike vaihtaa suuntaa
            this.IntMouseTrack = corDeg;
        }

        if (corDeg > degWas && !(degWas < 2 && corDeg > 6 )) {
            this.direct = "right";
        }
        else if (corDeg < degWas && !(degWas > 7.5 && corDeg < 3)) {
            this.direct = "left";
        }
        //Tämä korjaa direct muuttujan jos nykyisellä suunnalla on lyhyempi matka kohteeseen kuin vaihtamalla suuntaa

        if (this.IntMouseTrack != -1 && corDeg > corRot && corDeg <= this.IntMouseTrack && this.flipped == false) {
            this.direct = "right";
            this.fixed = "normal fix";
        } else if (this.IntMouseTrack != -1 && corDeg < corRot && corDeg >= this.IntMouseTrack && this.flipped == false) {
            this.direct = "left";
            this.fixed = "normal fix";
        } else if (this.IntMouseTrack != -1 && corDeg < corRot && corDeg <= this.IntMouseTrack && this.flipped == true && this.direct == "left") {
            this.direct = "right";
            this.fixed = "flip fix";
        } else if (this.IntMouseTrack != -1 && corDeg > corRot && corDeg >= this.IntMouseTrack && this.flipped == true && this.direct == "right") {
            this.direct = "left";
            this.fixed = "flip fix";
        }
        //mikäli aluksen kulma on tavoitellussa pisteessä
        if (corRot == corDeg) {
            this.ship.body.setZeroRotation();
            //this.moving = false;
        }
        //Mikäli hiiri ei ole liikkeessä mutta ei myöskään tavoitteessa
        else if (corRot != corDeg) {
            if (this.direct == "right") {
                for (var i = 0; i <= 3; i++) {
                    if (corRot != corDeg) {
                        //console.log("runned"+i);
                        this.ship.body.rotation = Math.round((corRot + 0.1)*10)/10;
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.direct == "left") {
                        this.ship.body.rotation = Math.round((corRot - 0.1)*10)/10;
            }
        }*/
        //text.text = String(this.IntMouseTrack+"+"+this.direct+"+"+corDeg+"+"+this.flipped+"+"+this.lap+"+"+corRot+"+"+lastRot+"+"+this.ship.rotation);
        //text.text = String(this.clips[0] + "+" + reloading[this.HUD.webTray.trayPosition-1] + "+" + this.ship.health);
        //text.text = String("");
		//text2.text = String("");
		//text2.text = String(this.fixed);
		text2.text = String(this.enemyAmount + "+" + this.spawnPool + "+" + this.attackInfo);
        this.HUD.points.text = points;
        this.clipText.text  = this.clips[this.HUD.webTray.trayPosition-1];
        //liikutetaan hiiren viereen
		this.clipText.x = parseFloat(this.game.input.activePointer.worldX+40);
		this.clipText.y = parseFloat(this.game.input.activePointer.worldY+5);
        //mikäli lataus tray pelissä, liikutetaan sitäkin
        if(this.reloadSprite.alive) {
            this.reloadSprite.body.y = this.game.input.activePointer.worldY + this.reloadSprite.height / 2;
            this.reloadSprite.body.x = this.game.input.activePointer.worldX + this.reloadSprite.width / 2;
        }
        if (execTime > 10) {
            //alert("performance issue: " + execTime);
        }
       
        /*
        if (corRot >= 6.0 && lastRot <= 3.0) {
            this.flipped = false;
        }
        if (corRot <= 3.0 && lastRot >= 6.0) {
            this.flipped = false;w
        }*/
        //console.log(corRot+"...."+corDeg);
        degWas = Math.round((corDeg + 1 - 1)*10)/10;
        lastRot = Math.round(this.ship.body.rotation * 10) / 10;


        //cursors
        if (this.cursors.up.isDown) {
            this.ship.body.thrust(250);
            this.shipTrail.forEach(function (em) {
                em.emitParticle();
                ///em.emitParticle();
            });
        }
        else if (this.cursors.down.isDown) {
            this.ship.body.reverse(250);
        }
        if (this.cursors.left.isDown) {
            //tämä kohdistaa alukseen voimavektorin joka lasketaan aluksen kulman perusteella
            this.ship.body.applyForce([Math.cos(this.ship.body.rotation) * 7, Math.sin(this.ship.body.rotation) * 7], 0, 0);
        }
        else if (this.cursors.right.isDown) {
            this.ship.body.applyForce([-Math.cos(this.ship.body.rotation) * 7, -Math.sin(this.ship.body.rotation) * 7], 0, 0);
        }
		if(this.cursors.reload.isDown && !reloading[this.HUD.webTray.trayPosition-1]){
			reload(this.reloadSprite,this.clips,this.HUD.webTray.trayPosition-1, this.HUD,this.guns.getChildAt(this.HUD.webTray.trayPosition-1));
		}
        //ampuminen
		var laserFire = function(){
			if (fire(self.laserBul, self.guns.getChildAt(self.HUD.webTray.trayPosition-1), self.guns.getChildAt(self.HUD.webTray.trayPosition-1).fireRate, corRot, self.ship)) {
                self.clips[self.HUD.webTray.trayPosition-1]--;
			}
			if (fire(self.laserBul, self.guns.getChildAt(self.HUD.webTray.trayPosition-1), self.guns.getChildAt(self.HUD.webTray.trayPosition-1).fireRate, corRot, self.ship)) {
                self.clips[self.HUD.webTray.trayPosition-1]--;
			}
			if(self.clips[self.HUD.webTray.trayPosition-1] > 0){
			self.game.time.events.add(5,function(){
				laserFire();
			},self);
			} /*else {
				reload(self.reloadSprite,self.clips,self.HUD,self.HUD.webTray.trayPosition-1,self.clipSizes);
			}*/
		};
        if (this.game.input.activePointer.isDown && this.clips[this.HUD.webTray.trayPosition-1] > 0 && !reloading[this.HUD.webTray.trayPosition-1] && this.ship.alive) {
			if(this.guns.getChildAt(this.HUD.webTray.trayPosition-1).name == "basic"){
            if (fire(this.bullets, this.guns.getChildAt(this.HUD.webTray.trayPosition-1), this.guns.getChildAt(this.HUD.webTray.trayPosition-1).fireRate, corRot, this.ship)) {
                this.clips[this.HUD.webTray.trayPosition-1]--;
            }
			} else if(this.guns.getChildAt(this.HUD.webTray.trayPosition-1).name == "laser"){
				laserFire();
			} else if(this.guns.getChildAt(this.HUD.webTray.trayPosition-1).name == "mines"){
                if (fire(this.minesBul, this.guns.getChildAt(this.HUD.webTray.trayPosition-1), this.guns.getChildAt(this.HUD.webTray.trayPosition-1).fireRate, corRot, this.ship)) {
                    this.clips[this.HUD.webTray.trayPosition-1]--;
                }
            // ari lisäsi 24.11.2015    
            } else if(this.guns.getChildAt(this.HUD.webTray.trayPosition-1).name == "shotgun"){
                if (fire(this.bullets, this.guns.getChildAt(this.HUD.webTray.trayPosition-1), this.guns.getChildAt(this.HUD.webTray.trayPosition-1).fireRate, corRot, this.ship)) {
                    this.clips[this.HUD.webTray.trayPosition-1]--;
                }   
            }
                
            
        } else if (!reloading[this.HUD.webTray.trayPosition-1] && this.clips[this.HUD.webTray.trayPosition-1] <= 0) {
            reload(this.reloadSprite,this.clips,this.HUD.webTray.trayPosition-1,this.HUD, this.guns.getChildAt(this.HUD.webTray.trayPosition-1));
        }
		

        //Hyökkäyksen hallinta
        //alert(enemy1.countLiving);
        if ((spawnNext == true || spawnNext == "undefined") && this.timers[2] <= 0) {
            var randNumbers = randNumber(this.lap);
            this.game.time.events.add((randNumbers[1] * 1000), function () {
                var next = spawnEnemy(this.spawnPool, this.enemyAmount, this.enemies, this.lap, this.enemiesCollisonGroup);
                if (next === "next" && this.lap != 3) {
                    this.lap++;
                    this.enemy1 = this.enemies.getChildAt(this.lap - 1).getChildAt(0);
                    //tällä hetkellä kaatuu kun kierros kolme ohi koska tapahtuu outOfBounds, käytetään lap arvo 4:jää pelin päättymisen seuraamiseen
                    this.enemy2 = this.enemies.getChildAt(this.lap - 1).getChildAt(1);
                    this.enemy3 = this.enemies.getChildAt(this.lap - 1).getChildAt(2);
                    this.timers[2] = 460;
                    this.HUD.banner.frame = this.HUD.banner.frame-1;
                    this.HUD.banner.revive();
                    this.game.add.tween(this.HUD.banner).to({alpha:1},400,"Linear",true,1000);
                } else if(this.lap >= 3 && this.asteroids.countLiving() > 0 && next === "next"){
                    this.game.state.start('endGame',false,false,this.HUD,this.ship);
                }
            }, this);
            if(this.timers[2]-1 <= 0){
                this.game.add.tween(this.HUD.banner).to({alpha:0},200,"Linear",true,5000).onComplete.add(function(){this.HUD.banner.kill()},this);
            }
            //waiter.start();
            spawnNext = false;
        } else {
            this.timers[2]--;
        }
        //panokset
        var eachEnemyAliveFn;
        var commanderAI;
        var hunterAI;
        var destroyerAI;
        var boundsBullet;
        if (this.frameSkip == 0) {
            eachEnemyAliveFn = function(){};
            commanderAI = function(){};
            hunterAI = function(){};
            destroyerAI = function(){};
            this.frameSkip = 1;
        } else {
            this.frameSkip = 2;
            var enm;
            var eachBulletAliveFn = function(b) {
                boundsBullet = b.world;
                self.bulletArray = self.game.physics.p2.hitTest(boundsBullet, [enm]);//droppi kaatuu tähän, bullet ja drop molemmat arcade
                if (self.bulletArray.length != 0 && self.timers[4] == 1) {
                    hitDetector(b, enm, self.enemyAmount, self.lap, enm.getChildAt(0),self.dropBoom,self.dropApi);
                    if(b.name == "mine"){
                        var boom = self.minesExpl.getFirstDead();
                        boom.reset(b.x,b.y);
                        var tween = self.game.add.tween(boom.scale);
                        tween.to({x:1.5,y:1.5},500,"Linear",true);
                        tween.onComplete.add(function(){
                            boom.kill();
                            boom.scale.setTo(0.1,0.1);
                        });
                    }
                } else if(self.bulletArray.length != 0 && self.timers[4] == 2){//jos pelaajaan osumista tutkitaan
                    hitDetector(b, enm, null, self.lap, self.HPbar);
                }
            };
            eachEnemyAliveFn = function(en) {
                enm = en;
                if(self.timers[4] == 1){
                    self.bullets.forEachAlive(eachBulletAliveFn);
                    self.laserBul.forEachAlive(eachBulletAliveFn);
                    self.minesBul.forEachAlive(eachBulletAliveFn);
                } else {
                    self.enemyBullets.forEachAlive(eachBulletAliveFn);
					self.dropApi.forEachAlive(eachBulletAliveFn);
                }
            };
            // asteroidien tuhoajien AI
            destroyerAI = function(enemy){
                var num;
                if(this.timers[5] >= 5) {
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
                    enemy.body.rotation = dir+1-1;
                    dir = null;
                    target1 = null;
                    enemy.body.thrust(60);
                    // listätään alukselle massa ja hidastetaan sen vauhtia
                    this.game.time.events.add(1000, function () {
                        enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup,this.boomCollisonGroup]);
                        enemy.body.onBeginContact.add(this.boomCollision, this);
                        enemy.body.mass = 0.7;
                        enemy.body.damping = 0.7;
                    }, this);
                    //Muutetaan vihollisen nimi jotta se ei tule enään tähän silmukkaan
                    enemy.name = Math.round((enemy.name - 0.1)*10)/10;

                    //Tämä ajetaan kohteen ja massan saaneellee viholliselle normaalisti
                } else if (enemy.name == 0 || enemy.name == 1 || enemy.name == 2) {
                    if (this.asteroids.getChildAt(enemy.name).alive == true) {
                        var target = this.asteroids.getChildAt(enemy.name);
                        var dir = acquireTarget(target, enemy);
                        enemy.body.rotation = dir+1-1;
                        dir = null;
                        if (!checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1,enemy.targetOff)) {
                            enemy.body.thrust(100);
                        }
                        if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1,enemy.targetOff) && enemy.ray == null && enemy.wait == 0) {
                            enemy.getChildAt(2).emitParticle();
                            var gun = null;
                            enemyFire(enemy, gun, this.enemyBullets, enemy.fireRate, this.asteroids.getChildAt(enemy.name));
                            enemy.ray = "g";
                        } else if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 1,enemy.targetOff) && enemy.wait < 2) {
                            enemy.wait += 1;
                        } else if (enemy.wait >= 2 && enemy.ray !== null) {
                            enemy.ray = null;
                            enemy.wait = 0;
                        } else if (checkRange(enemy.body.x, enemy.body.y, target.x, target.y, 2,enemy.targetOff) && enemy.ray !== null) {
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
            };
            hunterAI = function(enemy) {

                if(this.timers[5] >= 5) {
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
                    if(enemy.body.mass < 0.85) {
                        enemy.body.mass = rnd.realInRange(0.85, 1.25);
                        enemy.body.damping = rnd.realInRange(0.8, 0.99);
                    }

                    if (enemy.body.force.destination[0] == 0) {
                        enemy.name = "inPlay";
                        enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup,this.boomCollisonGroup]);
                        enemy.body.onBeginContact.add(this.boomCollision, this);
                        enemy.body.mass = 0.7;
                        enemy.body.damping = 0.7;
                    }
                }
                if (this.frameSkip == 0) {
                    enemy.rendeable = false;
                }
            };// Pelaajan jahtaajan tekoäly loppuu
            commanderAI = function(enemy) {
                if(this.timers[5] >= 5) {
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
                    enemy.body.rotation = dir+1-1;
                    dir = null;

                    var inRange = false;
                    if (enemy.buffTimer <= 0) {
                        var buff = function(en){
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
                    if (!this.asteroids.getChildAt(enemy.altTarget).alive) {
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
                    } else if (!this.ship.alive && checkRange(altTargetX, altTargetY, enemy.x, enemy.y, 3)) {
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
                    if(enemy.body.mass < 0.85) {
                        enemy.body.mass = rnd.realInRange(0.85, 1.25);
                        enemy.body.damping = rnd.realInRange(0.8, 0.99);
                    }
                    //dir = acquireTarget(this.ship, enemy);
                    //enemy.body.rotation = dir;
                    //enemy.body.thrust(60);

                    if (enemy.body.force.destination[0] == 0) {
                        enemy.name = "inPlay";
                        
						enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup,this.boomCollisonGroup]);
                        enemy.body.onBeginContact.add(this.boomCollision, this);
                        enemy.body.mass = 1.9;
                        enemy.body.damping = 0.7;
                    }
                }
                if (this.frameSkip == 0) {
                    enemy.rendeable = false;
                }
            };//pomon tekoälyloppuu
        }

        this.fixed = "";
        if(this.frameSkip == 2) {
            // Asteroidin jahtaajan tekoäly
            this.enemy1.forEachAlive(destroyerAI, this); // Asteroidin jahtaajan tekoäly loppuu
            // Pelaajan jahtaajan tekoäly
            this.enemy2.forEachAlive(hunterAI, this);

            //Pomon tekoäly
            this.enemy3.forEachAlive(commanderAI,this);
			
			//tiputettujen räjähteiden osumat
            if(this.dropBoom.countLiving() > 0) {
                this.game.physics.arcade.overlap(this.dropBoom, this.laserBul, this.dropBoomStarter, null, this);
                this.game.physics.arcade.overlap(this.dropBoom, this.bullets, this.dropBoomStarter, null, this);
            }
            this.frameSkip = 0;
        }
        self.timers[4]++;
        //tutkitaan vihujen panosten osumista pelaajaan
        if(!this.ship.dying) {
            eachEnemyAliveFn(this.ship);
        }
        eachBulletAliveFn = null;
        eachEnemyAliveFn = null;
        self.timers[4] = 1;
        if(this.timers[5] >= 5) {
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
    },
    tryBuff: function(en){
		var chance = rnd.integerInRange(0,6);
        if(chance == 1){
            if(en.health < en.maxHealth){
                en.health += 0.25;
				var healed  = this.HUD.buffTrays1.getFirstDead();
				healed.revive();
				healed.x = en.x;
				healed.y = en.y;
				var tween = this.game.add.tween(healed);
				tween.to({y:healed.y-100},3000,"Linear",true);
				tween.onComplete.add(function(){
					healed.kill();
				});
                //alert("heal"+en.health);
            } else if(en.fireRate == en.parent.fireRate){
                en.fireRate = en.fireRate/2;
				var boosted  = this.HUD.buffTrays2.getFirstDead();
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
    changeHUDSlot: function(){
        if(!this.game.input.activePointer.isDown) {
            if (this.game.input.mouse.wheelDelta == 1 && this.HUD.webTray.trayPosition < this.guns.length && this.timers[3] == 0) {
                this.HUD.webTray.getChildAt(0).x += 54;
                this.HUD.webTray.trayPosition++;
                this.timers[4]++;
                this.game.time.events.add(75, function () {
                    this.timers[4] = 0
                }, this);
            } else if (this.game.input.mouse.wheelDelta == -1 && this.HUD.webTray.trayPosition > 1 && this.timers[3] == 0) {
                this.HUD.webTray.getChildAt(0).x -= 54;
                this.HUD.webTray.trayPosition--;
                this.timers[4]++;
                this.game.time.events.add(75, function () {
                    this.timers[4] = 0
                }, this);
            }
        } else if(this.game.input.activePointer.rightButton.isDown){
            if (this.game.input.mouse.wheelDelta == 1 && this.HUD.abTray.trayPosition < 3 && this.timers[3] == 0) {
                this.HUD.abTray.getChildAt(0).x += 54;
                this.HUD.abTray.trayPosition++;
                this.timers[4]++;
                this.game.time.events.add(75, function () {
                    this.timers[4] = 0
                }, this);
            } else if (this.game.input.mouse.wheelDelta == -1 && this.HUD.abTray.trayPosition > 1 && this.timers[3] == 0) {
                this.HUD.abTray.getChildAt(0).x -= 54;
                this.HUD.abTray.trayPosition--;
                this.timers[4]++;
                this.game.time.events.add(75, function () {
                    this.timers[4] = 0
                }, this);
            }
        }
    },
    boomCollision : function(a,b,shapeCaller,shapeCollided,c){
        if(a != null) {
            if (shapeCollided.body.parent.sprite.key == "boom") {
                shapeCaller.body.mass = 9999;
                shapeCaller.body.damping = 0.999;
                hitDetector(shapeCollided.body.parent.sprite, shapeCaller.body.parent.sprite, this.enemyAmount, this.lap, shapeCaller.body.parent.sprite.getChildAt(0),this.dropBoom,this.dropApi);
            }
        }
    },
    dropBoomStarter: function(drop,bullet){
        hitDetector(bullet,drop,1,this.lap,null);
        if(drop.health == 0.001){
            var boom = this.minesExpl.getFirstDead();
            boom.reset(drop.x,drop.y);
            var tween = this.game.add.tween(boom.scale);
            tween.to({x:1.5,y:1.5},500,"Linear",true);
            tween.onComplete.add(function(){
                boom.kill();
                boom.scale.setTo(0.1,0.1);
            });
        }
    }
} // prototype
