var mainGame = function(game){
	//muuttujien luonti
	nextFire = 0;
	deg = "0"; //deg on radiaani arvo
	degWas = 0; //last mouse position
	pi = Math.PI;
	execTime = 0;
	spawnNext = "undefined";
    waiter = null;
};
mainGame.prototype = {
	//Latausvaiheessa alustetut muuttujat tuodaan tähän 
	init: function(asteroids, ship, gun, bullets, enemies, enemy1,enemy2, enemy3, cursors, bg, text, shipTrail,attackInfo,enemyAmount,spawnPool,lap){
		this.asteroids = asteroids;//
		this.ship = ship;//
		this.gun = gun;//
		this.bullets = bullets;//
		this.enemies = enemies;;//
		this.enemy1 = enemy1;//
		this.enemy2 = enemy2;//
		this.enemy3 = enemy3;//
		this.cursors = cursors;//
		this.bg = bg;//
		this.text = text;
		this.shipTrail = shipTrail;//
		this.attackInfo = attackInfo;
		this.enemyAmount = enemyAmount;
		this.spawnPool = spawnPool;
                this.lap = lap;
                //Loput muuttujat
                this.fireRate = 450;
                this.direct = "";
                this.flipped = false;
                this.IntMouseTrack = -1;
                this.moving = false;
		
	},
	create: function(){
		//fysiikat voidaan sallia vain pyörivässä statessa
		this.game.physics.p2.enable(this.ship);
		this.game.camera.follow(this.ship); 
		this.game.physics.p2.defaultRestitution = 0.8;
		this.game.physics.p2.enable(this.asteroids);
		this.asteroids.forEach(function(item){
			item.body.clearCollision();
		});
	},
	update: function(){
		var self = this;
                
		var benchmark = performance.now();
		this.ship.body.mass = 0.7;
		this.ship.body.damping = 0.7;
		//pyörittää asteroideja
		var suunta = 0;
		this.asteroids.forEach(function(item){
			if (suunta == 0){
				item.body.rotateLeft(0.6);
				suunta = 1;
			} else if (suunta == 1){
				item.body.rotateRight(0.7);
				suunta = 2;
			} else {
				item.body.rotateLeft(0.8);
				suunta = 0;
			}
			
		});
		
		this.game.physics.arcade.overlap(this.bullets, this.enemy1, hitDetector, null, this);
                this.game.physics.arcade.overlap(this.bullets, this.enemy2, hitDetector, null, this);
                this.game.physics.arcade.overlap(this.bullets, this.enemy3, hitDetector, null, this);
		var Ycoord;
                var Xcoord;
		//calculate deg
		//otetaan huomioon kameran ja kentän koon erotus
		if(this.ship.body.y <= 400){
			Ycoord = (this.ship.body.y)-this.game.input.mousePointer.y;
		} 
		else {
			Ycoord = (this.ship.body.y-this.game.camera.y)-this.game.input.mousePointer.y;
		}
		if (this.ship.body.x <= 600){
			Xcoord = this.game.input.mousePointer.x-(this.ship.body.x);
		}
		else {
			Xcoord = this.game.input.mousePointer.x-(this.ship.body.x-this.game.camera.x);
		}
		//console.log(Ycoord+"ja X:"+Xcoord);
		//console.log(this.ship.body.y+"ja hiiri:"+this.game.input.mousePointer.y);
		//console.log(this.game.camera.width);
		var X2 = Xcoord*Xcoord;
		var Y2 = Ycoord*Ycoord;
		var YX2 = X2+Y2;
		//Yksikköympyrä arvoja joihin lisätään tarvittaessa edelliset
		switch(true){
		case (Xcoord > 0 && Ycoord > 0):
			deg = Math.atan(Ycoord/Xcoord);
			break;
		case (Xcoord < 0 && Ycoord > 0):
			deg = (Math.atan(((Xcoord/Ycoord)*(0-1))))+(pi/2);
			break;
		case (Xcoord < 0 && Ycoord < 0):
			deg = (Math.atan(Ycoord/Xcoord))+pi;
			break;
		case (Xcoord > 0 && Ycoord < 0):
			deg = (Math.atan((Xcoord/Ycoord)*(0-1)))+((3*pi)/2);
			break;
		default:
			//console.log("lol");
		}
		//console.log(this.ship.body.rotation);
		//rotation arvo yli ~7.8 tai alle ~-7.8
		if(this.ship.body.rotation > 2*pi+(pi/2) || this.ship.body.rotation < -1*((2*pi)+(pi/2))){
			this.ship.body.rotation = pi/2;
			this.flipped = true;
			//console.log("nollattu"+(2*pi));
		}//mikäli raja-arvojen sisällä mutta negatiivinen 
		else if(this.ship.body.rotation < pi/2){
			this.ship.body.rotation = 2*pi-(this.ship.body.rotation*-1); 
			this.flipped = true;
		}
		var shipRot = this.ship.body.rotation;
		//console.log(this.ship.body.rotation);
		//console.log(shipRot+"####"+deg+"###"+(2*pi-deg));
		//Pyöristetään
		var corDeg = Math.round(((2*pi-deg)+(pi/2))*10)/10;
		var corRot = Math.round(this.ship.body.rotation*10)/10;
		if(corDeg == 7.9){
			corDeg -= 0.1;
		}
		
		//tutkitaan hiiren liikkeen suuntaa
		if(((corDeg < degWas && this.direct == "right")||(corDeg > degWas && this.direct == "left"))&& !((degWas > 7.5 && corDeg < 2)||(degWas < 2 && corDeg > 7.5))){
				this.IntMouseTrack = corDeg; //Tallennetaan se kulma missä hiiren liike vaihtaa suuntaa
		}
		
		if(corDeg > degWas && !(degWas < 2 && corDeg > 7.5 )){
			this.direct = "right";
		}
		else if (corDeg < degWas && !(degWas > 7.5 && corDeg < 2)){
			this.direct = "left";
		} 
			
		if(this.IntMouseTrack != -1 && corDeg > corRot && corDeg <= this.IntMouseTrack){
			this.direct = "right";
		} else if(this.IntMouseTrack != -1 && corDeg < corRot && corDeg >= this.IntMouseTrack){
			this.direct = "left";
		} 
		
		//mikäli aluksen kulma on tavoitellussa pisteessä
		if(corRot == corDeg){
			this.ship.body.setZeroRotation();
			this.moving = false;
		}
		//Mikäli hiiri ei ole liikkeessä mutta ei myöskään tavoitteessa
		else if(corRot != corDeg){
			if(this.direct == "right"){
				for(var i = 0;i<=3;i++){
					if(corRot != corDeg){
						//console.log("runned"+i);
						this.ship.body.rotation = corRot+0.1;
					}
					else {
						break;
					}
				}
			} 
			else if (this.direct == "left"){
				for(var i = 0;i<=3;i++){
					if(corRot != corDeg){
						//console.log("runned"+i);
						this.ship.body.rotation = corRot-0.1;
					}
					else {
						break;
					}
				}
			}
		}
		
		//console.log(corRot+"...."+corDeg);
		degWas = corDeg;
		lastRot = Math.round(this.ship.body.rotation*100)/100;
		
		text.text = String(this.IntMouseTrack+"+"+this.direct+"+"+corDeg+"+"+this.flipped+"+"+this.lap);
		text2.text = String(this.enemyAmount+"+"+this.spawnPool+"+"+this.attackInfo);
		//cursors
		if (this.cursors.up.isDown)
		{
			this.ship.body.thrust(250);
			this.shipTrail.forEach(function(em){
			em.emitParticle();
			em.emitParticle();
			});
		}
		else if (this.cursors.down.isDown)
		{
			this.ship.body.reverse(250);
		}
		if(this.cursors.left.isDown){
			//tämä kohdistaa alukseen voimavektorin joka lasketaan aluksen kulman perusteella
			this.ship.body.applyForce([Math.cos(this.ship.body.rotation)*7,Math.sin(this.ship.body.rotation)*7],0,0);
		}
		else if(this.cursors.right.isDown){
			this.ship.body.applyForce([-Math.cos(this.ship.body.rotation)*7,-Math.sin(this.ship.body.rotation)*7],0,0);
		}
		//ampuminen
		if (this.game.input.activePointer.isDown)
		{
			fire(this.bullets,this.gun,this.fireRate);
		}
		
		//Hyökkäyksen hallinta
		//alert(enemy1.countLiving);
		if (spawnNext == true || spawnNext == "undefined"){
			var randNumbers = randNumber(this.lap);
			waiter = this.game.time.create();
			waiter.add((randNumbers[1]*1000),function(){
				var next = spawnEnemy(this.spawnPool,this.enemyAmount,this.enemies,this.lap,this.ship);
                                if(next === "next"){
                                    this.lap++;
                                    this.enemy1 = this.enemies.getChildAt(this.lap-1).getChildAt(0);//tällä hetkellä kaatuu kun kierros kolme ohi koska tapahtuu outOfBounds, käytetään lap arvo 4:jää pelin päättymisen seuraamiseen
                                    this.enemy2 = this.enemies.getChildAt(this.lap-1).getChildAt(1);
                                    this.enemy3 = this.enemies.getChildAt(this.lap-1).getChildAt(2);
                                }
			},this);
			waiter.start();
			spawnNext = false;
		}
		var boundsBullet;
		var groups = [this.enemy1,this.enemy2,this.enemy3];
                var bullets = this.bullets;
                var enemyAmount = this.enemyAmount;
		for(var i = 0;i<3;i++){
			//console.log(i);
			groups[i].forEachAlive(function(en){
				bullets.forEachAlive(function(b){
					boundsBullet = b.world;
					var array = this.game.physics.p2.hitTest(boundsBullet,[en]);
					if(array.length != 0){
						hitDetector(b,en,self.enemyAmount,self.lap);
					}
				});	
			});
		 } 
		
		
		
		
		var benchmark2 = performance.now();
		execTime = benchmark2-benchmark;
	}
};