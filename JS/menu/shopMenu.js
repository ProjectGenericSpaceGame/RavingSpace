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
        
        // tyylimäärittelyt teksteille
        var styleA = { font:'25px cyber', fill:'white'};
        var styleB = { font:'20px cyber', fill:'black'};
        
        // valitun aseen muuttuja
        this.windex = null;
        // valitun tehsoteen muuttuja
        this.aindex = null;
        
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
        
        console.log("available wep: "+this.availableWeapons);
        console.log("available ab: "+this.availableAbilities);
        
        

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
        this.button = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.button.name = 'weapon'+0;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.basicGroup = this.game.add.group();
        this.weaponsGroup.add(this.basicGroup);
        this.basicGroup.x = 10;
        this.basicGroup.y = 10;
        this.basicGroup.add(this.basicIcon);
        this.basicGroup.add(this.basicLabel);
        this.basicGroup.add(this.basicpriceLabel);
        this.basicGroup.add(this.button);
        
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
        this.button = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.button.name = 'weapon'+2;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.laserGroup = this.game.add.group();
        this.weaponsGroup.add(this.laserGroup);
        this.laserGroup.x = 400;
        this.laserGroup.y = 10;
        this.laserGroup.add(this.laserIcon);
        this.laserGroup.add(this.laserLabel);
        this.laserGroup.add(this.laserpriceLabel);
        this.laserGroup.add(this.button);
        
        // miinat
        this.minesIcon = this.game.add.sprite(60, 5, 'mines');
        this.minesIcon.scale.setTo(0.2, 0.2);
        this.minesLabel = this.game.add.text(55, 60, 'Mines', styleB);
        this.minespriceLabel = this.game.add.text(60, 100, '1000', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.wepSelected, this, 0, 1, 2);
        this.button.name = 'weapon'+3;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.minesGroup = this.game.add.group();
        this.weaponsGroup.add(this.minesGroup);
        this.minesGroup.x = 590;
        this.minesGroup.y = 10;
        this.minesGroup.add(this.minesIcon);
        this.minesGroup.add(this.minesLabel);
        this.minesGroup.add(this.minespriceLabel);
        this.minesGroup.add(this.button);
        
        // Tehosteet
        this.abilityLabel = this.game.add.text(220, 460, 'Abilities', styleA);
        this.abilityTray = this.game.add.sprite(250, 500,  'menuHeader');
        this.abilityTray.scale.setTo(0.6, 2);
        this.abilityTray.tint = 0x858585;
        this.abilityTray.alpha = 0.7;
        this.abilitiesGroup = this.game.add.group();
        this.abilitiesGroup.x = 250;
        this.abilitiesGroup.y = 500;
        
        // Nopeus tehoste
        this.speedIcon = this.game.add.sprite(70, 5, 'abSpeed');
        this.speedIcon.scale.setTo(0.5, 0.5);
        this.speedLabel = this.game.add.text(20, 60, 'Speed Boost', styleB);
        this.speedpriceLabel = this.game.add.text(65, 100, '250', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.abSelected, this, 0, 1, 2);
        this.button.name = 'ability'+0;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.speedGroup = this.game.add.group();
        this.abilitiesGroup.add(this.speedGroup);
        this.speedGroup.x = 10;
        this.speedGroup.y = 10;
        this.speedGroup.add(this.speedIcon);
        this.speedGroup.add(this.speedLabel);
        this.speedGroup.add(this.speedpriceLabel);
        this.speedGroup.add(this.button);
        
        // EMP tehoste
        this.empIcon = this.game.add.sprite(65, 5, 'ability1');
        this.empIcon.scale.setTo(0.5, 0.5);
        this.empLabel = this.game.add.text(62, 60, 'EMP', styleB);
        this.emppriceLabel = this.game.add.text(65, 100, '450', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.abSelected, this, 0, 1, 2);
        this.button.name = 'ability'+1;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.empGroup = this.game.add.group();
        this.abilitiesGroup.add(this.empGroup);
        this.empGroup.x = 205;
        this.empGroup.y = 10;
        this.empGroup.add(this.empIcon);
        this.empGroup.add(this.empLabel);
        this.empGroup.add(this.emppriceLabel);
        this.empGroup.add(this.button);
        
        // Suoja tehoste
        this.shieldIcon = this.game.add.sprite(65, 5, 'ability2');
        this.shieldIcon.scale.setTo(0.5, 0.5);
        this.shieldLabel = this.game.add.text(50, 60, 'Shield', styleB);
        this.shieldpriceLabel = this.game.add.text(65, 100, '700', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.abSelected, this, 0, 1, 2);
        this.button.name = 'ability'+2;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.shieldGroup = this.game.add.group();
        this.abilitiesGroup.add(this.shieldGroup);
        this.shieldGroup.x = 400;
        this.shieldGroup.y = 10;
        this.shieldGroup.add(this.shieldIcon);
        this.shieldGroup.add(this.shieldLabel);
        this.shieldGroup.add(this.shieldpriceLabel);
        this.shieldGroup.add(this.button);
        
        // SF tehoste
        this.sfIcon = this.game.add.sprite(60, 5, 'ability3');
        this.sfIcon.scale.setTo(0.5, 0.5);
        this.sfLabel = this.game.add.text(65, 60, 'SF', styleB);
        this.sfpriceLabel = this.game.add.text(60, 100, '900', styleB);
        this.button = this.game.add.button(0, 0, 'menuHeader',this.abSelected, this, 0, 1, 2);
        this.button.name = 'ability'+3;
        this.button.tint = 0x858585;
        this.button.alpha = 0.0;
        this.button.scale.setTo(0.13, 1.7);
        this.sfGroup = this.game.add.group();
        this.abilitiesGroup.add(this.sfGroup);
        this.sfGroup.x = 590;
        this.sfGroup.y = 10;
        this.sfGroup.add(this.sfIcon);
        this.sfGroup.add(this.sfLabel);
        this.sfGroup.add(this.sfpriceLabel);
        this.sfGroup.add(this.button);

        this.buttonGroup.add(this.weaponsLabel);
        this.buttonGroup.add(this.abilityLabel);
        this.buttonGroup.add(this.abilityTray);
        this.buttonGroup.add(this.weaponTray);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.purchaseButton); 
        
        for (i = 0; i <= 3; i++){
            // tarkistetaan onko pelaaja ostanut aseen
            if (this.availableWeapons[i] == 1){
                console.log("Aseita ostettu: "+i);
                this.weaponsGroup.getChildAt(i).getChildAt(3).alpha = 0.5;
                
            } 
        }
        
        for (j = 0; j <= 3; j++){
            // tarkistetaan onko pelaaja ostanut abilityn
            if (this.availableAbilities[j] == 1){
                console.log("Kykyja ostettu: "+j);
                this.abilitiesGroup.getChildAt(j).getChildAt(3).alpha = 0.5;
            }
        }

        },
        // kun ase valittu, selvitetään sen index arvo ja sijoitetaan se windex muuttujaan
        wepSelected: function(button){
            this.aindex = null;
            this.wep = button;
            var p = this.wep.name.replace( /^\D+/g, '');
            this.windex = parseInt(p);
            console.log(this.windex);
        },
        // kun tehoste valittu, selvitetään sen index arvo ja sijoitetaan se aindex muuttujaan
        abSelected: function(button) {
            this.windex = null;
            this.ab = button;
            var p = this.ab.name.replace( /^\D+/g, '');
            this.aindex = parseInt(p);
            console.log(this.aindex);
        },
        
        // osto-painikkeen toiminto
        purchase: function() {
             var i = this.windex;
             var j = this.aindex;
            if(j == null) {
                if (this.weaponsGroup.getChildAt(i).getChildAt(3).alpha == 0.5)
                {
                    this.windex = null;
                    console.log(this.windex);
                }
            }
               else if (i == 0){
                 console.log("You already own that weapon.");
             } else if (i == 1) {
                 console.log("Weapon "+i+" bought.");
                 this.playerData.playerData.money -= 200;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 this.playerData.shipData[i] = 1;              
             } else if (i == 2) {
                 console.log("Weapon "+i+" bought.");
                 this.playerData.playerData.money -= 600;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 this.playerData.shipData[i] = 1;
             } else if (i == 3){
                 console.log("Weapon "+i+" bought.");
                 this.playerData.playerData.money -= 1000;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 this.playerData.shipData[i] = 1;
             } else if (j == 0) {
                this.playerData.playerData.money -= 250;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 console.log("Ability "+j+" bought.");
                 this.playerData.shipData[i+10] = 1;
             } else if (j == 1) {
                this.playerData.playerData.money -= 450;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 console.log("Ability "+j+" bought.");
                 this.playerData.shipData[i+10] = 1;
             } else if (j == 2) {
                this.playerData.playerData.money -= 700;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 console.log("Ability "+j+" bought.");
                 this.playerData.shipData[i+10] = 1;
             } else if (j == 3) {
                this.playerData.playerData.money -= 900;
                 this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                 console.log("Ability "+j+" bought.");
                 this.playerData.shipData[i+10] = 1;
             }
            i = null;
            j = null;
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