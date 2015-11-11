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
		this.game.load.spritesheet('destroyer', 'assets/sprites/enemies.png',97,113);
		this.game.load.image('hunter', 'assets/sprites/playerHunter.png');
		this.game.load.image('commander', 'assets/sprites/hunterFinal.png');
		//this.game.load.spritesheet('enemy2', 'assets/sprites/enemies.png',97,195);
		//this.game.load.spritesheet('enemy3', 'assets/sprites/enemies.png',195,290);
		//Ladataan trail-partikkelit
		this.game.load.image('trail6', 'assets/particles/VS_peli_trail6.png');
		this.game.load.image('trail7', 'assets/particles/VS_peli_trail7.png');
		//ladataan ammus
		this.game.load.image('bullet', 'assets/sprites/bullet.png');
		this.game.load.image('bullet2', 'assets/sprites/bullet2.png');
		this.game.load.image('bullet3', 'assets/sprites/bullet3.png');
        //Musiikkia
		//this.game.load.audio('soldier', 'assets/sounds/extar.opus');
		//explosion
		this.game.load.image('boom', 'assets/particles/explosion3.png');
		this.game.load.image('boom2', 'assets/particles/explosion2.png');
        //reloadkursori
		this.game.load.image('reloadTray', 'assets/sprites/reload3.png');
        //HP elementit
        this.game.load.image('healthbar', 'assets/GUI/healthbar.png');
        this.game.load.image('health', 'assets/GUI/health.png');
        this.game.load.image('respawnTimer', 'assets/GUI/respawn.png');
	},
	create: function(){
        waiter = this.game.time.create();

		this.attackInfo = "101005'302112'352713";
        //this.game.scale.scaleMode = 0;
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
        
        this.asteroid1 = this.asteroids.getChildAt(0);
        this.asteroid1.health = 25;
        
        this.asteroid2 = this.asteroids.getChildAt(1);
        this.asteroid2.health = 25;
        
        this.asteroid3 = this.asteroids.getChildAt(2);
        this.asteroid3.health = 25;
        
		//luodaan alus ja moottorivana
		this.ship = this.game.add.sprite(650, 400, 'ship');
		this.ship.scale.setTo(0.5,0.5);
		this.gun = this.game.add.image(0,-90);
		this.shipTrail = this.game.add.group();
		var trail1 = this.game.add.emitter(0,60,1000);
		var trail2 = this.game.add.emitter(0,60,1000);
		trail1.width = 15;
		trail2.width = 4;
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
        this.ship.health = 3;
        this.ship.dying = false;
		
		// luodaan aluksen ammusryhmä
		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(50, 'bullet', 0, false);
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		//luodaan vihujen ammusryhmä
		this.enemyBullets = this.game.add.group();
		this.enemyBullets.enableBody = true;
		this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemyBullets.createMultiple(500, 'bullet3', 0, false);
		this.enemyBullets.setAll('anchor.x', 0.5);
		this.enemyBullets.setAll('anchor.y', 0.5);
		this.enemyBullets.setAll('outOfBoundsKill', true);
		this.enemyBullets.setAll('checkWorldBounds', true);
		
		//käsitellään hyökkäystieto
		this.attackInfo = this.attackInfo.split("'");
		var enemyAmount = [0,0,0];

		for(var i = 0;i < 3;i++){
			enemyAmount[i] = (parseInt((this.attackInfo[i].substring(0,2)))+(parseInt(this.attackInfo[i].substring(2,4)))+(parseInt(this.attackInfo[i].substring(4,6))));
		}
		var spawnPool = [(enemyAmount[0]+1-1),(enemyAmount[1]+1-1),(enemyAmount[2]+1-1)];

        this.enemyFireRates = [500,500,1500];
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
			tEnemy1.createMultiple(parseInt(this.attackInfo[i].substring(0,2)),"destroyer");
            tEnemy1.forEach(function(enemy){
                enemy.ray = null;
				enemy.nextFire = 0;
				enemy.maxHealth = 1;
                enemy.wait = 0;
				enemy.targetOff = rnd.integerInRange(0,60);
				var gun = this.game.add.image(0,-70);
				enemy.addChild(gun);
            }); 
			this.game.physics.p2.enable(tEnemy1);
			this.enemies.getChildAt(i).add(tEnemy1);
			
			var tEnemy2 = this.game.add.group();
			tEnemy2.createMultiple(parseInt(this.attackInfo[i].substring(2,4)),"hunter");
            tEnemy2.forEach(function(enemy){
                enemy.scale.setTo(0.4,0.4);
                enemy.nextFire = 0;
				enemy.health = 0.5;
				enemy.maxHealth = 0.5;
				var enemyGun1 = this.game.add.image(0,-70);
				enemy.addChild(enemyGun1);
            });
            this.game.physics.p2.enable(tEnemy2);
			this.enemies.getChildAt(i).add(tEnemy2);
			
			var tEnemy3 = this.game.add.group();
			tEnemy3.createMultiple(parseInt(this.attackInfo[i].substring(4,6)),"commander");
            tEnemy3.forEach(function(enemy){
                enemy.health = 2.5;
                enemy.scale.setTo(0.55,0.55);
                enemy.nextFire = 0;
                enemy.barrel = 1;
                enemy.altTarget = rnd.integerInRange(0,2);
				var healthbar = this.HPbar();
				healthbar.scale.setTo(0.3,0.2);
				//healthbar.renderable = false;
				//healthbar.alpha = 0;
				healthbar.getChildAt(0).width = 0; //respawn, tätä ei käytetä vihulla
				healthbar.fullHealthLength = healthbar.getChildAt(1).width;//hp palkki
				healthbar.zeroPosition = healthbar.width;
				healthbar.y = -120;
				healthbar.getChildAt(1).anchor.x = 0;
				//enemy.healthbar = healthbar;
				var enemyGun1 = this.game.add.image(35,-50);
				var enemyGun2 = this.game.add.image(-35,-50);
				enemy.addChild(healthbar);
				enemy.addChild(enemyGun1);//pidä nämä aina viimeisenä
				enemy.addChild(enemyGun2);
            },this);
			this.game.physics.p2.enable(tEnemy3);
			this.enemies.getChildAt(i).add(tEnemy3);
		};
		//alustetaan kerran
		this.enemy1 = this.enemies.getChildAt(0).getChildAt(0);
		this.enemy2 = this.enemies.getChildAt(0).getChildAt(1);
		this.enemy3 = this.enemies.getChildAt(0).getChildAt(2);
		var X = this.game.world.centerX;
		var Y = this.game.world.centerY;
		text = this.game.add.text(X, Y, "",{fill:"white"});
		text2 = this.game.add.text(X-25, Y+25, "",{fill:"white"});
		this.clipText = this.game.add.text(0, 0, "35",{fill:"white",font:"20px cyber"});//panosten määrä
		
		//asetetaan näppäimet
		this.cursors = this.game.input.keyboard.addKeys( 
			{ 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D,'reload':Phaser.Keyboard.R } 
		);
        //kierrosmuuttuja kertoo mikä kierros menossa
        this.lap = 1;
        //asetetaan ääneet
        //this.music = this.game.add.audio('soldier');
		this.music = null;

        //pelaajan HP kenttä
		var playerhealth = this.HPbar();
        playerhealth.fixedToCamera = true;
        playerhealth.cameraOffset.setTo(1100,100);
        playerhealth.scale.setTo(0.4,0.3);
        playerhealth.fullHealthLength = playerhealth.getChildAt(1).width;//health palkki
        playerhealth.getChildAt(0).width = 0; //respawn palkki

		this.game.state.start("mainGame",false,false,
            this.asteroids,
            this.ship,
            this.gun,
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
            enemyAmount,
            spawnPool,
            this.lap,
            this.enemyFireRates,
            this.enemyBullets,
            this.music,
			this.clipText,
            playerhealth
		);
	},
	HPbar: function(){
		//pelaajan HP kenttä
        var HPbar = this.game.add.group();
        var container = this.game.add.sprite(0,0,'healthbar');
        var health = this.game.add.sprite(0,0,'health');
        health.x = container.width/2-health.width/2;
        health.y = container.height/2-health.height/2;
        var respawn = this.game.add.sprite(0,0,'respawnTimer');
        respawn.x = container.width/2-respawn.width/2;
        respawn.y = container.height/2-respawn.height/2;
        HPbar.addChild(respawn);
        HPbar.addChild(health);
        HPbar.addChild(container);
		return HPbar;
	} 
};