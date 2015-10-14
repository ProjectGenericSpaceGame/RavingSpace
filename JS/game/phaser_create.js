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
gameLoad.prototype = {
	preload: function(){
		//Maailman raja
		this.game.world.setBounds(0, 0, 1600, 1000);
		//Ladataan tausta ja asteroidit
		this.game.load.image('background', 'assets/sprites/VS_background_purple.png');
		this.game.load.image('asteroid1', 'assets/sprites/VS_peli_asteroid1.png');
		this.game.load.image('asteroid2', 'assets/sprites/VS_peli_asteroid2.png');
		this.game.load.image('asteroid3', 'assets/sprites/VS_peli_asteroid3.png');
		//Ladataan alus
		this.game.load.image('ship', 'assets/sprites/VS_peli_ship.png');
		//ladataan viholliset
		this.game.load.spritesheet('enemies', 'assets/sprites/enemies.png',97,113);
		//this.game.load.spritesheet('enemy2', 'assets/sprites/enemies.png',97,195);
		//this.game.load.spritesheet('enemy3', 'assets/sprites/enemies.png',195,290);
		//Ladataan trail-partikkelit
		this.game.load.image('trail6', 'assets/particles/VS_peli_trail6.png');
		this.game.load.image('trail7', 'assets/particles/VS_peli_trail7.png');
		//ladataan ammus
		this.game.load.image('bullet', 'assets/sprites/bullet.png');
	},
	create: function(){
                this.attackInfo = "031509'302112'352713";
            
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.bg = this.game.add.sprite(0, 0, 'background');
		this.bg.scale.setTo(1,1.1);
		this.asteroids = this.game.add.group();
		this.asteroids.create(300, 156, 'asteroid1');
		this.asteroids.create(400, 800, 'asteroid2');
		this.asteroids.create(1360, 650, 'asteroid3');
		
		//asteroids.anchor.setTo(0.5, 0.5); 
		this.asteroids.forEach(function(item){
		item.scale.setTo(0.5,0.5);
		});
		//luodaan alus ja moottorivana
		this.ship = this.game.add.sprite(650, 400, 'ship');
		this.ship.scale.setTo(0.3,0.3);
		this.gun = this.game.add.image(0,-90);
		this.shipTrail = this.game.add.group();
		var trail1 = this.game.add.emitter(0,90,1000);
		var trail2 = this.game.add.emitter(0,90,1000);
		trail1.width = 20;
		trail2.width = 6;
		trail1.makeParticles("trail6");
		trail2.makeParticles("trail7");
		trail2.lifespan = 100;
		trail1.lifespan = 250;
		this.shipTrail.add(trail1);
		this.shipTrail.add(trail2);
		this.shipTrail.forEach(function(em){
			em.setXSpeed(30, -30);
			em.setYSpeed(200, 180);
			em.setRotation(0);
		});
		this.ship.addChild(this.shipTrail);
		this.ship.addChild(this.gun);
		
		// luodaan aluksen ammusryhmä
		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(50, 'bullet', 0, false);
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);
		
		//käsitellään hyökkäystieto
		this.attackInfo = this.attackInfo.split("'");
		var enemyAmount = [0,0,0];

		for(var i = 0;i < 3;i++){
			enemyAmount[i] = (parseInt((this.attackInfo[i].substring(0,2)))+(parseInt(this.attackInfo[i].substring(2,4)))+(parseInt(this.attackInfo[i].substring(4,6))));
		}
		var spawnPool = [(enemyAmount[0]+1-1),(enemyAmount[1]+1-1),(enemyAmount[2]+1-1)];
		
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
			tEnemy1.createMultiple(parseInt(this.attackInfo[i].substring(0,2)),"enemies", 0);
			this.game.physics.p2.enable(tEnemy1);
			this.enemies.getChildAt(i).add(tEnemy1);
			
			var tEnemy2 = this.game.add.group();
			tEnemy2.createMultiple(parseInt(this.attackInfo[i].substring(2,4)),"enemies",1);
			this.game.physics.p2.enable(tEnemy2);
			this.enemies.getChildAt(i).add(tEnemy2);
			
			var tEnemy3 = this.game.add.group();
			tEnemy3.createMultiple(parseInt(this.attackInfo[i].substring(4,6)),"enemies",2);
			this.game.physics.p2.enable(tEnemy3);
			this.enemies.getChildAt(i).add(tEnemy3);
		};
		//alustetaan kerran
		this.enemy1 = this.enemies.getChildAt(0).getChildAt(0);
		this.enemy2 = this.enemies.getChildAt(0).getChildAt(1);
		this.enemy3 = this.enemies.getChildAt(0).getChildAt(2);
		var X = this.game.world.centerX;
                var Y = this.game.world.centerY;
		text = this.game.add.text(X, Y, "blaa",{fill:"white"});
                text2 = this.game.add.text(X-25, Y+25, "blaa",{fill:"white"});
		
		//asetetaan näppäimet
		this.cursors = this.game.input.keyboard.addKeys( 
			{ 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } 
		);
                this.lap = 1;
		this.game.state.start("mainGame",false,false,
			 this.asteroids,
			 this.ship,
			 this.gun,
			 this.bullets,
			 this.enemies,
			 this.enemy1,
			 this.enemy2,
			 this.enemy3,
			 this.cursors,
			 this.bg,
			 this.text,
			 this.shipTrail,
			 this.attackInfo,
			 enemyAmount,
			 spawnPool,
             this.lap
		);
	}
};