// tämä on kauppa

var shopMenu = function(game){

};

shopMenu.prototype = {
    init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some murdering here
       this.buttonGroup.removeAll();
     

    },
    create:function(){
        
        var styleA = { font:'25px cyber', fill:'white'};
        var styleB = { font:'20px cyber', fill:'black'};

        //alustetaan takaisin nappula
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        //otsikko
        this.surroundings.menuLabel.text = "Shop";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);      
        
        // Aseet
        this.weaponsLabel = this.game.add.text(220, 260, 'Weapons', styleA);
        this.weaponTray = this.game.add.sprite(250, 300,  'menuHeader');
        this.weaponTray.scale.setTo(0.6, 2);
        this.weaponTray.tint = 0x858585;
        this.weaponTray.alpha = 0.7;
        this.weaponsGroup = this.game.add.group();
        this.weaponsGroup.x = 250;
        this.weaponsGroup.y = 300;
        
        // perusase
        this.basicIcon = this.game.add.sprite(85, 15,  'bullet');
        this.basicIcon.scale.setTo(2, 2);
        this.basicLabel = this.game.add.text(40, 60, 'Basic Gun', styleB);
        this.basicpriceLabel = this.game.add.text(70, 100, 'Free', styleB);
        this.basicGroup = this.game.add.group();
        this.weaponsGroup.add(this.basicGroup);
        this.basicGroup.x = 10;
        this.basicGroup.y = 10;
        this.basicGroup.add(this.basicIcon);
        this.basicGroup.add(this.basicLabel);
        this.basicGroup.add(this.basicpriceLabel);
        
        // haulikko
        this.shotgunIcon = this.game.add.sprite(45, 10,  'shotgun');
        this.shotgunIcon.scale.setTo(1.5, 1.5);
        this.shotgunLabel = this.game.add.text(10, 60, 'Shotgun', styleB);
        this.shotgunpriceLabel = this.game.add.text(35, 100, '200', styleB);
        this.shotgunGroup = this.game.add.group();
        this.weaponsGroup.add(this.shotgunGroup);
        this.shotgunGroup.x = 270;
        this.shotgunGroup.y = 10;
        this.shotgunGroup.add(this.shotgunIcon);
        this.shotgunGroup.add(this.shotgunLabel);
        this.shotgunGroup.add(this.shotgunpriceLabel);
        
        // laser
        this.laserIcon = this.game.add.sprite(30, 5,  'laser');
        this.laserIcon.scale.setTo(0.5, 0.5);
        this.laserLabel = this.game.add.text(10, 60, 'Laser', styleB);
        this.laserpriceLabel = this.game.add.text(20, 100, '600', styleB);
        this.laserGroup = this.game.add.group();
        this.weaponsGroup.add(this.laserGroup);
        this.laserGroup.x = 480;
        this.laserGroup.y = 10;
        this.laserGroup.add(this.laserIcon);
        this.laserGroup.add(this.laserLabel);
        this.laserGroup.add(this.laserpriceLabel);
        
        // miinat
        this.minesIcon = this.game.add.sprite(17, 5,  'mines');
        this.minesIcon.scale.setTo(0.2, 0.2);
        this.minesLabel = this.game.add.text(10, 60, 'Mines', styleB);
        this.minespriceLabel = this.game.add.text(17, 100, '1000', styleB);
        this.minesGroup = this.game.add.group();
        this.weaponsGroup.add(this.minesGroup);
        this.minesGroup.x = 650;
        this.minesGroup.y = 10;
        this.minesGroup.add(this.minesIcon);
        this.minesGroup.add(this.minesLabel);
        this.minesGroup.add(this.minespriceLabel);
        
        // Tehosteet
        this.abilityLabel = this.game.add.text(220, 460, 'Abilities', styleA);
        this.abilityTray = this.game.add.sprite(250, 500,  'menuHeader');
        this.abilityTray.scale.setTo(0.6, 2);
        this.abilityTray.tint = 0x858585;
        this.abilityTray.alpha = 0.7;
        this.abilitiesGroup = this.game.add.group();
        this.abilitiesGroup.x = 250;
        this.abilitiesGroup.y = 500;

        this.buttonGroup.add(this.weaponsLabel);
        this.buttonGroup.add(this.abilityLabel);
        this.buttonGroup.add(this.abilityTray);
        this.buttonGroup.add(this.weaponTray);
        this.buttonGroup.add(this.backButton);
        

        },
        

        back: function(){
        this.weaponsGroup.removeAll();
        this.abilitiesGroup.removeAll();
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
         
        
        }
    
    
};