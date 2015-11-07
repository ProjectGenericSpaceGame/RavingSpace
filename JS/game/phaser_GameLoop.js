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
    init: function (asteroids, ship, gun, bullets, enemies, enemy1, enemy2, enemy3, asteroid1, asteroid2, asteroid3, cursors, bg, text, shipTrail, attackInfo, enemyAmount, spawnPool, lap,enemyFireRates,enemyBullets,music,clipText) {
        this.asteroids = asteroids;//
        this.ship = ship;//
        this.gun = gun;//
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
        this.enemyFireRates = enemyFireRates;
        this.enemyBullets = enemyBullets;
        this.music = music;
		this.clipText = clipText;
        //Loput muuttujat
        this.asteroidAmmount = 3;
        this.fireRate = 450;
        this.direct = "";
        this.flipped = false;
        this.IntMouseTrack = -1;
        this.moving = "";
        this.clips = [35, 0, 0, 0];
        this.reloading = false;
        this.frameSkip = 0;
        this.timers = [0,60];//custom ajastimet, tällä hetkellä: peruscombo,pomon buff
		this.text3 = this.game.add.text(0,0,"");

        this.fixed = false;//dedug, to be removed

    },
    create: function () {
        //fysiikat voidaan sallia vain pyörivässä statessa
        this.game.physics.p2.enable(this.ship);
        this.game.camera.follow(this.ship);
        this.game.physics.p2.defaultRestitution = 0.8;
        this.game.physics.p2.enable(this.asteroids);
        this.game.physics.p2.setImpactEvents(true);
        this.asteroids.forEach(function (item) {
            item.body.clearCollision();
        });
        //this.game.physics.p2.setBounds(0,0,this.game.world.width,this.game.world.height,true,true,true,true,true);
        this.playerCollisonGroup = this.game.physics.p2.createCollisionGroup();
        this.enemiesCollisonGroup = this.game.physics.p2.createCollisionGroup();
        //this.game.physics.p2.setBounds(0,0,1600,1000,true,true,true,true,true);
        this.game.physics.p2.updateBoundsCollisionGroup();
        this.ship.body.setCollisionGroup(this.playerCollisonGroup);
        this.ship.body.collides([this.enemiesCollisonGroup]);
        //this.ship.body.collideWorldBounds = true;
        //this.music.play();
    },
    update: function () {
        var self = this;

        var benchmark = performance.now();
        this.ship.body.mass = 0.7;
        this.ship.body.damping = 0.7;
        //this.ship.body.collideWorldBounds = true;
        //pyörittää asteroideja
        var suunta = 0;
        this.asteroids.forEach(function (item) {
            if (suunta == 0) {
                item.body.rotateLeft(0.6);
                suunta = 1;
            } else if (suunta == 1) {
                item.body.rotateRight(0.7);
                suunta = 2;
            } else {
                item.body.rotateLeft(0.8);
                suunta = 0;
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
        var X2 = Xcoord * Xcoord;
        var Y2 = Ycoord * Ycoord;
        var YX2 = X2 + Y2;
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
            //console.log("lol");
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

        var shipRot = this.ship.body.rotation;
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
            this.moving = false;
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
                for (var i = 0; i <= 3; i++) {
                    if (corRot != corDeg) {
                        //console.log("runned"+i);
                        this.ship.body.rotation = Math.round((corRot - 0.1)*10)/10;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        text.text = String(this.IntMouseTrack+"+"+this.direct+"+"+corDeg+"+"+this.flipped+"+"+this.lap+"+"+corRot+"+"+lastRot+"+"+this.ship.rotation);
        //text.text = String(this.clips[0] + "+" + this.reloading + "+" + this.ship.health);
        //text.text = String("");
		//text2.text = String("");
		//text2.text = String(this.fixed);
		text2.text = String(this.enemyAmount + "+" + this.spawnPool + "+" + this.attackInfo);
		this.clipText.text  = this.clips[0];
		this.clipText.x = this.game.input.activePointer.worldX+40;
		this.clipText.y = this.game.input.activePointer.worldY+5;
        if (execTime > 10) {
            //alert("performance issue: " + execTime);
        }
       

        if (corRot >= 6.0 && lastRot <= 3.0) {
            this.flipped = false;
        }
        if (corRot <= 3.0 && lastRot >= 6.0) {
            this.flipped = false;
        }
        //console.log(corRot+"...."+corDeg);
        degWas = Math.round((corDeg + 1 - 1)*10)/10;
        lastRot = Math.round(this.ship.body.rotation * 10) / 10;


        //cursors
        if (this.cursors.up.isDown) {
            this.ship.body.thrust(250);
            this.shipTrail.forEach(function (em) {
                em.emitParticle();
                em.emitParticle();
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
		if(this.cursors.reload.isDown){
			this.reload();
		}
        //ampuminen
        if (this.game.input.activePointer.isDown && this.clips[0] > 0 && !this.reloading && this.ship.alive) {
            if (fire(this.bullets, this.gun, this.fireRate, corRot, this.ship)) {
                this.clips[0]--;
            }
        } else if (!this.reloading && this.clips[0] == 0) {
            this.reload();
        }

        //Hyökkäyksen hallinta
        //alert(enemy1.countLiving);
        if (spawnNext == true || spawnNext == "undefined") {
            var randNumbers = randNumber(this.lap);
            this.game.time.events.add((randNumbers[1] * 1000), function () {
                var next = spawnEnemy(this.spawnPool, this.enemyAmount, this.enemies, this.lap, this.ship, this.playerCollisonGroup, this.enemiesCollisonGroup);
                if (next === "next") {
                    this.lap++;
                    this.enemy1 = this.enemies.getChildAt(this.lap - 1).getChildAt(0);//tällä hetkellä kaatuu kun kierros kolme ohi koska tapahtuu outOfBounds, käytetään lap arvo 4:jää pelin päättymisen seuraamiseen
                    this.enemy2 = this.enemies.getChildAt(this.lap - 1).getChildAt(1);
                    this.enemy3 = this.enemies.getChildAt(this.lap - 1).getChildAt(2);
                }
            }, this);
            //waiter.start();
            spawnNext = false;
        }
        //panokset
        if (this.frameSkip == 0) {
            var boundsBullet;
            var groups = [this.enemy1, this.enemy2, this.enemy3];
            var rocks = [this.asteroid1, this.asteroid2, this.asteroid3];
            var bullets = this.bullets;
            var enemyAmount = this.enemyAmount;
            for (var iter = 0; iter < 3; iter++) {
                this.enemies.getChildAt(this.lap-1).getChildAt(iter).forEachAlive(function (en) {
                    bullets.forEachAlive(function (b) {
                        boundsBullet = b.world;
                        var array = this.game.physics.p2.hitTest(boundsBullet, [en]);
                        if (array.length != 0) {
                            hitDetector(b, en, self.enemyAmount, self.lap);
                        }
                    });
                });
            }
            //nyt toistetaan pelaajalle
            this.enemyBullets.forEachAlive(function(b){
               boundsBullet = b.world;
                if( this.game.physics.p2.hitTest(boundsBullet, [this.ship]).length > 0 && this.ship.alive){
                    hitDetector(b, this.ship, null, null);
                } 
            },this);
            
            // --------------testi---------------------
             this.enemyBullets.forEachAlive(function(b){
                 this.asteroids.forEachAlive(function (a) {
               boundsBullet = b.world;
                if( this.game.physics.p2.hitTest(boundsBullet, [a]).length > 0 && a.alive){
                    asteroidHitDetector(b, a, this.asteroidAmmount);
                } 
                 },this);    
            },this);
            //------------- testi------------------
           
            
            this.frameSkip = 1;
        } else {
            this.frameSkip = 0;
        }
        this.fixed = "";

        // Asteroidin jahtaajan tekoäly
       this.enemy1.forEachAlive(function(enemy){
           
           var num;
           
           if(enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000){
                enemy.name = "fresh";
              
            } else if(enemy.name == "fresh"){
                // uudelle viholliselle valitaan kohde
                var targetAsteroid = this.asteroids.getRandom();
                // suodatetaan nimestä pois kirjaimet
                num = targetAsteroid.key.replace( /^\D+/g, '');
                // nimetään vihollinen
                if(num == 1){
                    enemy.name = 0.1;
                }
                if(num == 2){
                    enemy.name = 1.1;
                }
                if(num == 3){
                    enemy.name = 2.1;
                }
            }
            var dir;
           
           // seuraavalla kierroksella tarkistetaan vihollisen sijainti ja nimi
            if(enemy.body.y > 100 && enemy.body.x < this.game.world.width-100
                && enemy.body.y > 100 && enemy.body.y < this.game.world.height-100
                && enemy.name == 0.1 || enemy.name == 1.1 || enemy.name == 2.1) {//tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                    enemy.body.mass = rnd.realInRange(0.8, 0.92);
                    enemy.body.damping = rnd.realInRange(0.8, 0.92);
                    // suunnataan vihollisen alus kohti kohde aseteroidia
                    var target = this.asteroids.getChildAt(enemy.name-0.1);
                    dir = acquireTarget(target, enemy);
                    enemy.body.rotation = dir;
                    enemy.body.thrust(60);
                    // listätään alukselle massa ja hidastetaan sen vauhtia
                    this.game.time.events.add(1000,function() {
                        enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup]);
                        enemy.body.mass = 0.7;
                        enemy.body.damping = 0.7;
                    },this);
                    //Muutetaan vihollisen nimi jotta se ei tule enään tähän silmukkaan
                    enemy.name = enemy.name - 0.1;
            
            //Tämä ajetaan kohteen ja massan saaneellee viholliselle normaalisti
            }else if(enemy.name == 0 || enemy.name == 1 || enemy.name == 2 ){
                if (this.asteroids.getChildAt(enemy.name).alive == true ){
                    enemy.body.rotation = acquireTarget(this.asteroids.getChildAt(enemy.name), enemy);
                    enemy.body.thrust(60);
                } else {
                    var targetAsteroid = this.asteroids.getRandom();
                    num = targetAsteroid.key.replace( /^\D+/g, '');
                    if(num == 1){ enemy.name = 0.1; }
                    if(num == 2){ enemy.name = 1.1; }
                    if(num == 3){ enemy.name = 2.1; }
                }
              
            } 
        }, this); // Asteroidin jahtaajan tekoäly loppuu
        
        // Pelaajan jahtaajan tekoäly
        this.enemy2.forEachAlive(function (enemy) {
                
                if (enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000) {
                    enemy.name = "fresh";
                }else if (enemy.name == "fresh") {
                    enemy.name = "free";
                }
            var dir;
            if (enemy.name == "inPlay") {//tämä ajetaan normaalisti koko ajan
                dir = acquireTarget(this.ship, enemy);
                enemy.body.rotation = dir;

                if(this.checkRange(this.ship.x,this.ship.y,enemy.x,enemy.y,1 && this.ship.alive)){
                    enemy.body.thrust(0);
                    var gun;
                    gun = enemy.getChildAt(enemy.children.length-1);
                    enemyFire(enemy,gun,this.enemyBullets,this.enemyFireRates[1],this.ship);

                } else if(!this.ship.alive){
                    enemy.body.rotation = enemy.body.x/10;
                    enemy.body.thrust(200);
                } else {
                    enemy.body.thrust(200);
                }
            }
            
            else if (enemy.body.y > 100 && enemy.body.x < this.game.world.width - 100
                && enemy.body.y > 100 && enemy.body.y < this.game.world.height - 100
                && enemy.name == "free") {//tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                enemy.body.mass = rnd.realInRange(0.85, 1.25);
                enemy.body.damping = rnd.realInRange(0.8, 0.99);
               
				if(enemy.body.force.destination[0] == 0){
                enemy.name = "inPlay";
				enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup]);
				enemy.body.mass = 0.7;
                enemy.body.damping = 0.7;
				}
            }
            if(this.frameSkip == 0) {
                enemy.rendeable = false;
            }
        }, this);  // Pelaajan jahtaajan tekoäly loppuu 

		//Pomon tekoäly
        this.enemy3.forEachAlive(function (enemy) {
                
                if (enemy.x > 1600 || enemy.x < 0 || enemy.y < 0 || enemy.y > 1000) {
                    enemy.name = "fresh";
                }else if (enemy.name == "fresh") {
                    enemy.name = "free";
                    enemy.buffTimer = 60;
                }
            var dir;
            if (enemy.name == "inPlay") {//tämä ajetaan normaalisti koko ajan
                dir = acquireTarget(this.ship, enemy);
                enemy.body.rotation = dir;

                var inRange = false;
                if(enemy.buffTimer <= 0) {
                    while(!inRange){
                        this.enemy1.forEach(function(en){
                            if(this.checkRange(en.x,en.y,enemy.x,enemy.y,1)){
                                inRange = true;
                                this.tryBuff(en);
                            }
                        },this);
                        this.enemy2.forEach(function(en){
                            if(this.checkRange(en.x,en.y,enemy.x,enemy.y,1)){
                                inRange = true;
                                this.tryBuff(en);
                            }
                        },this);
                        inRange = true;
                    }
                    enemy.buffTimer = 60;

                }
                enemy.buffTimer--;

                if(this.checkRange(this.ship.x,this.ship.y,enemy.x,enemy.y,2 && this.ship.alive)){
                    enemy.body.thrust(0);
                    var gun;
                    if(enemy.barrel == 1){
                        gun = enemy.getChildAt(enemy.children.length-1);
                        enemy.barrel = 2 ;
                    } else {
                        gun = enemy.getChildAt(enemy.children.length-2);
                        enemy.barrel = 1;
                    }
                    enemyFire(enemy,gun,this.enemyBullets,this.enemyFireRates[2],this.ship);

                } else if(!this.ship.alive){
                    enemy.body.rotation = enemy.body.x/10;
                    enemy.body.thrust(60);
                } else {
                    enemy.body.thrust(60);
                }


            }
            else if (enemy.body.y > 100 && enemy.body.x < this.game.world.width - 100
                && enemy.body.y > 100 && enemy.body.y < this.game.world.height - 100
                && enemy.name == "free") {//tämä ajetaan kun vihollinen päässyt tarpeeksi kauas maailman rajasta
                enemy.body.mass = rnd.realInRange(0.85, 1.25);
                enemy.body.damping = rnd.realInRange(0.8, 0.99);
                //dir = acquireTarget(this.ship, enemy);
                //enemy.body.rotation = dir;
                //enemy.body.thrust(60);
               
				if(enemy.body.force.destination[0] == 0){
                enemy.name = "inPlay";
				enemy.body.collides([this.enemiesCollisonGroup, this.playerCollisonGroup]);
				enemy.body.mass = 1.9;
                enemy.body.damping = 0.7;
				}
            }
            if(this.frameSkip == 0) {
                enemy.rendeable = false;
            }
        }, this);

        var benchmark2 = performance.now();
        var wholeLoop = benchmark2 - testBM;
        testBM = performance.now();
        execTime = benchmark2 - benchmark;
        if (execTime > 0.5) {
            console.log(execTime);
            console.log(wholeLoop);
        }
    },
    checkRange: function(x,y,x2,y2,usage){
        var dist = this.game.math.distance(x,y,x2,y2);
        if(dist < 350 && usage == 1){
            return true;
        } else if(dist < 400 && usage == 2){
            return true;
        }
        else {
            return false;
        }
    },
    tryBuff: function(en){
        if(rnd.integerInRange(0,10) == 1){
            if(en.health < 1){
                en.health += 0.25;
                //alert("heal"+en.health);
            } else {
                en.fireRate = en.fireRate*0.6;
                this.game.time.events.add(5000, function(){
                    en.fireRate = this.enemyFireRates[2];
                },this);
            }
        }
    }, // trybuff
	reload:function(){
		this.game.time.events.add(3000, function () {
                this.clips[0] = 35;
                this.reloading = false
            }, this);
            //waiter.start();
            this.reloading = true;
	}
} // prototype
