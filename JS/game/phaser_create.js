function create(){
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
	
	ship = game.add.sprite(650, 400, 'ship');
	ship.scale.setTo(0.5,0.5);
	
	text = game.add.text(game.world.centerX, game.world.centerY, "blaa");

	game.camera.follow(ship); 
	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.defaultRestitution = 0.8;
	game.physics.p2.enable(ship, true);
	
	game.physics.p2.enable(asteroids);
	asteroids.forEach(function(item){
		item.body.clearCollision();
	});
	
	cursors = game.input.keyboard.addKeys( 
		{ 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } 
	);
}