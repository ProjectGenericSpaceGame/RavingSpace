function preload(){
	//Maailman raja
	game.world.setBounds(0, 0, 1600, 1000);
	//Ladataan tausta ja asteroidit
    game.load.image('background', 'assets/sprites/VS_background_purple.png');
    game.load.image('asteroid1', 'assets/sprites/VS_peli_asteroid1.png');
    game.load.image('asteroid2', 'assets/sprites/VS_peli_asteroid2.png');
    game.load.image('asteroid3', 'assets/sprites/VS_peli_asteroid3.png');
	//Ladataan alus
	game.load.image('ship', 'assets/sprites/VS_peli_ship.png');
	//ladataan viholliset
	game.load.spritesheet('enemies', 'assets/sprites/enemies.png',97,113);
	//game.load.spritesheet('enemy2', 'assets/sprites/enemies.png',97,195);
	//game.load.spritesheet('enemy3', 'assets/sprites/enemies.png',195,290);
	//Ladataan trail-partikkelit
	game.load.image('trail6', 'assets/particles/VS_peli_trail6.png');
	game.load.image('trail7', 'assets/particles/VS_peli_trail7.png');
}