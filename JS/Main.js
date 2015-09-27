
var game = new Phaser.Game(1280, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update });
game.paused = true;
var menu = new Phaser.Game(1280, 800, Phaser.AUTO, '', { preload: menu_preload, create: menu_create, update: menu_update });