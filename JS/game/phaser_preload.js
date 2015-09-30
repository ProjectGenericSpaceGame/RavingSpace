function preload(){
	//Maailman raja
	game.world.setBounds(0, 0, 1600, 1000);
	//Ladataan tausta ja asteroidit
    game.load.image('background', 'assets/sprites/VS_background_purple.png');
    game.load.image('asteroid1', 'assets/sprites/VS_peli_asteroidi4.png');
    game.load.image('asteroid2', 'assets/sprites/VS_peli_asteroidi2.png');
    game.load.image('asteroid3', 'assets/sprites/VS_peli_asteroidi3.png');
	//Ladataan alus
	game.load.image('ship', 'assets/sprites/PlayerShip.png');
}