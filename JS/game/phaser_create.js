function create(){
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	bg = game.add.sprite(0, 0, 'background');
	bg.scale.setTo(1,1.1);
    asteroids = game.add.group();
    
    asteroids.create(300, 156, 'asteroid1');
    asteroids.create(400, 800, 'asteroid2');
    asteroids.create(1360, 650, 'asteroid3');
    
    //asteroids.anchor.setTo(0.5, 0.5); 
	asteroids.forEach(function(item){
    item.scale.setTo(0.5,0.5);
	});
	//luodaan alus ja moottorivana
	ship = game.add.sprite(650, 400, 'ship');
	ship.scale.setTo(0.5,0.5);
	shipTrail = game.add.group();
	var trail1 = game.add.emitter(0,55,1000);
	var trail2 = game.add.emitter(0,55,1000);
	trail1.width = 20;
	trail2.width = 6;
	trail1.makeParticles("trail6");
	trail2.makeParticles("trail7");
	trail2.lifespan = 100;
	trail1.lifespan = 300;
	shipTrail.add(trail1);
	shipTrail.add(trail2);
	shipTrail.forEach(function(em){
		em.setXSpeed(30, -30);
    	em.setYSpeed(200, 180);
		em.setRotation(0);
	});
	ship.addChild(shipTrail);
	
	//käsitellään hyökkäystieto
	attackInfo = attackInfo.split("'");
	
	//Luodaan viholliset
	enemies = game.add.group();
	var lap1 = game.add.group();
	var lap2 = game.add.group();
	var lap3 = game.add.group();
	enemies.add(lap1);
	enemies.add(lap2);
	enemies.add(lap3);
	for(var i=0,j=enemies.length; i<j; i++){
		var tEnemy1 = game.add.group();
		tEnemy1.createMultiple(parseInt(attackInfo[i].substring(0,2)),"enemies", 0);
		game.physics.p2.enable(tEnemy1);
		enemies.getChildAt(i).add(tEnemy1);
		
		var tEnemy2 = game.add.group();
		tEnemy2.createMultiple(parseInt(attackInfo[i].substring(2,4)),"enemies",1);
		game.physics.p2.enable(tEnemy2);
		enemies.getChildAt(i).add(tEnemy2);
		
		var tEnemy3 = game.add.group();
		tEnemy3.createMultiple(parseInt(attackInfo[i].substring(4,6)),"enemies",2);
		game.physics.p2.enable(tEnemy3);
		enemies.getChildAt(i).add(tEnemy3);
	};
	//alustetaan kerran
	enemy1 = enemies.getChildAt(0).getChildAt(0);
	enemy2 = enemies.getChildAt(0).getChildAt(1);
	enemy3 = enemies.getChildAt(0).getChildAt(2);
	
	text = game.add.text(game.world.centerX, game.world.centerY, "blaa");
	//asetetaan kamera ja sallitaan fysiikat
	game.camera.follow(ship); 
    game.physics.p2.defaultRestitution = 0.8;
	game.physics.p2.enable(ship, true);
	
	game.physics.p2.enable(asteroids);
	asteroids.forEach(function(item){
		item.body.clearCollision();
	});
	
	//asetetaan näppäimet
	cursors = game.input.keyboard.addKeys( 
		{ 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } 
	);
}