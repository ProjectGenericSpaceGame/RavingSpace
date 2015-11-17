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
        
        this.windex = 5;
        
        //alustetaan takaisin nappula
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",styleB);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        
        //alustetaan osto nappula
        this.purchaseButton = this.game.add.button(900, 120, 'menuHeader', this.purchase, this, 1, 0, 2);
        this.purchaseButton.scale.setTo(0.12, 0.5);
        var purchaseText = this.game.add.text(300,20,"Purchase",styleB);
        this.purchaseButton.addChild(purchaseText);
        this.purchaseButton.getChildAt(0).scale.setTo(6, 1.5);

        //otsikko
        this.surroundings.menuLabel.text = "Shop";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);
        
        // lajitellaan pelaajan ostamat aseet
        this.availableWeapons = [];
        for(var i = 0; i <= SET_GUNS-1; i++){
            this.availableWeapons[i] = this.playerData.shipData[i];
        }
        // lajitellaan pelaajan ostamat tehosteet
        this.availableAbilities = [];
        for(var i = 10; i <= 10+SET_ABILITIES-1; i++){
            this.availableAbilities[i-10] = this.playerData.shipData[i];
        }
        this.WSA = []; // weapons still available
        this.ASA = []; // abilities still available
        
        // näihin taulukoihin tallennetaan tieto siitä onko ase valittu. 0 = ei valittu, 1 = on valittu 
        for(var g = 0;g < SET_GUNS;g++) {
            this.WSA.push(0);
        }
        for(var h = 0;h < SET_ABILITIES;h++) {
            this.ASA.push(0);
        }
        
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
        this.basicIcon = this.game.add.sprite(75, 15, 'bullet');
        this.basicIcon.scale.setTo(2, 2);
        this.basicLabel = this.game.add.text(30, 60, 'Basic Gun', styleB);
        this.basicpriceLabel = this.game.add.text(60, 100, 'Free', styleB);
        this.weapon0 = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.weapon0.tint = 0x858585;
        this.weapon0.alpha = 0.0;
        this.weapon0.scale.setTo(0.13, 1.7);
        this.basicGroup = this.game.add.group();
        this.weaponsGroup.add(this.basicGroup);
        this.basicGroup.x = 10;
        this.basicGroup.y = 10;
        this.basicGroup.add(this.basicIcon);
        this.basicGroup.add(this.basicLabel);
        this.basicGroup.add(this.basicpriceLabel);
        this.basicGroup.add(this.weapon0);
        
        // haulikko
        this.shotgunIcon = this.game.add.sprite(80, 10, 'shotgun');
        this.shotgunIcon.scale.setTo(1.5, 1.5);
        this.shotgunLabel = this.game.add.text(40, 60, 'Shotgun', styleB);
        this.shotgunpriceLabel = this.game.add.text(65, 100, '200', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.button.name = 'weapon'+1;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.shotgunGroup = this.game.add.group();
        this.weaponsGroup.add(this.shotgunGroup);
        this.shotgunGroup.x = 205;
        this.shotgunGroup.y = 10;
        this.shotgunGroup.add(this.shotgunIcon);
        this.shotgunGroup.add(this.shotgunLabel);
        this.shotgunGroup.add(this.shotgunpriceLabel);
        this.shotgunGroup.add(this.button);
        
        // laser
        this.laserIcon = this.game.add.sprite(70, 5, 'laser');
        this.laserIcon.scale.setTo(0.5, 0.5);
        this.laserLabel = this.game.add.text(50, 60, 'Laser', styleB);
        this.laserpriceLabel = this.game.add.text(60, 100, '600', styleB);
        this.weapon2 = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.weapon2.tint = 0x858585;
        this.weapon2.alpha = 0.0;
        this.weapon2.scale.setTo(0.13, 1.7);
        this.laserGroup = this.game.add.group();
        this.weaponsGroup.add(this.laserGroup);
        this.laserGroup.x = 400;
        this.laserGroup.y = 10;
        this.laserGroup.add(this.laserIcon);
        this.laserGroup.add(this.laserLabel);
        this.laserGroup.add(this.laserpriceLabel);
        this.laserGroup.add(this.weapon2);
        
        // miinat
        this.minesIcon = this.game.add.sprite(60, 5, 'mines');
        this.minesIcon.scale.setTo(0.2, 0.2);
        this.minesLabel = this.game.add.text(55, 60, 'Mines', styleB);
        this.minespriceLabel = this.game.add.text(60, 100, '1000', styleB);
        this.weapon3 = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.weapon3.tint = 0x858585;
        this.weapon3.alpha = 0.0;
        this.weapon3.scale.setTo(0.13, 1.7);
        this.minesGroup = this.game.add.group();
        this.weaponsGroup.add(this.minesGroup);
        this.minesGroup.x = 590;
        this.minesGroup.y = 10;
        this.minesGroup.add(this.minesIcon);
        this.minesGroup.add(this.minesLabel);
        this.minesGroup.add(this.minespriceLabel);
        this.minesGroup.add(this.weapon3);
        
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
        this.buttonGroup.add(this.purchaseButton);        

        },
        
        wepSelected: function(button){
            this.wep = button;
            var p = this.wep.name.replace( /^\D+/g, '');
            console.log(p);
            this.windex = parseInt(p);
            console.log(this.windex);
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