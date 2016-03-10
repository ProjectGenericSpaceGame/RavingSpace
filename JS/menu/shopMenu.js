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
        // valitun tehosteen muuttuja
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
            this.availableWeapons[i] = this.playerData.shipGuns[i];
        }
        // lajitellaan pelaajan ostamat tehosteet
        this.availableAbilities = [];
        for(var i = 0; i <= SET_ABILITIES-1; i++){
            this.availableAbilities[i] = this.playerData.shipPowers[i];
        }
        // console.log("available wep: "+this.availableWeapons);
        // console.log("available ab: "+this.availableAbilities);
        
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
        this.basicIcon = this.game.add.sprite(75, 25, 'bullet');
        this.basicIcon.scale.setTo(2, 2);
        this.basicLabel = this.game.add.text(30, 70, 'Basic Gun', styleB);
        this.basicpriceLabel = this.game.add.text(60, 110, 'Free', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect', this.wepSelected, this, 1, 0, 2);
        this.button.name = 'weapon'+0;
        this.button.alpha = 0.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.basicGroup = this.game.add.group();
        this.weaponsGroup.add(this.basicGroup);
        this.basicGroup.name = "basic";
        this.basicGroup.x = 10;
        this.basicGroup.y = 0;
        this.basicGroup.add(this.basicIcon);
        this.basicGroup.add(this.basicLabel);
        this.basicGroup.add(this.basicpriceLabel);
        this.basicGroup.add(this.button);
        
        // laser
        this.laserIcon = this.game.add.sprite(70, 15, 'laser');
        this.laserIcon.scale.setTo(0.5, 0.5);
        this.laserLabel = this.game.add.text(50, 70, 'Laser', styleB);
        this.laserpriceLabel = this.game.add.text(60, 110, '600', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.wepSelected, this, 1, 0, 2);
        this.button.name = 'weapon'+1;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.laserGroup = this.game.add.group();
        this.weaponsGroup.add(this.laserGroup);
        this.laserGroup.name = "laser";
        this.laserGroup.x = 400;
        this.laserGroup.y = 0;
        this.laserGroup.add(this.laserIcon);
        this.laserGroup.add(this.laserLabel);
        this.laserGroup.add(this.laserpriceLabel);
        this.laserGroup.add(this.button);
        
        // haulikko
        this.shotgunIcon = this.game.add.sprite(80, 20, 'shotgun');
        this.shotgunIcon.scale.setTo(1.5, 1.5);
        this.shotgunLabel = this.game.add.text(40, 70, 'Shotgun', styleB);
        this.shotgunpriceLabel = this.game.add.text(65, 110, '200', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.wepSelected, this, 1, 0, 2);
        this.button.name = 'weapon'+2;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.shotgunGroup = this.game.add.group();
        this.weaponsGroup.add(this.shotgunGroup);
        this.shotgunGroup.name = "shotgun";
        this.shotgunGroup.x = 205;
        this.shotgunGroup.y = 0;
        this.shotgunGroup.add(this.shotgunIcon);
        this.shotgunGroup.add(this.shotgunLabel);
        this.shotgunGroup.add(this.shotgunpriceLabel);
        this.shotgunGroup.add(this.button);
        
        // miinat
        this.minesIcon = this.game.add.sprite(65, 15, 'mines');
        //this.minesIcon.scale.setTo(0.2, 0.2);
        this.minesLabel = this.game.add.text(50, 70, 'Mines', styleB);
        this.minespriceLabel = this.game.add.text(56, 110, '1000', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.wepSelected, this, 1, 0, 2);
        this.button.name = 'weapon'+3;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.minesGroup = this.game.add.group();
        this.weaponsGroup.add(this.minesGroup);
        this.minesGroup.name = "mines";
        this.minesGroup.x = 590;
        this.minesGroup.y = 0;
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
        this.speedIcon = this.game.add.sprite(65, 15, 'ability_SuperSpeed');
        this.speedIcon.scale.setTo(0.5, 0.5);
        this.speedLabel = this.game.add.text(55, 70, 'Dash', styleB);
        this.speedpriceLabel = this.game.add.text(60, 110, '250', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.abSelected, this, 1, 0, 2);
        this.button.name = 'ability'+0;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.speedGroup = this.game.add.group();
        this.abilitiesGroup.add(this.speedGroup);
        this.speedGroup.name = "SuperSpeed";
        this.speedGroup.x = 10;
        this.speedGroup.y = 0;
        this.speedGroup.add(this.speedIcon);
        this.speedGroup.add(this.speedLabel);
        this.speedGroup.add(this.speedpriceLabel);
        this.speedGroup.add(this.button);
        
        // EMP tehoste
        this.empIcon = this.game.add.sprite(65, 15, 'ability_EMP');
        this.empIcon.scale.setTo(0.5, 0.5);
        this.empLabel = this.game.add.text(62, 70, 'EMP', styleB);
        this.emppriceLabel = this.game.add.text(65, 110, '450', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.abSelected, this, 1, 0, 2);
        this.button.name = 'ability'+1;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.empGroup = this.game.add.group();
        this.abilitiesGroup.add(this.empGroup);
        this.empGroup.name = "EMP";
        this.empGroup.x = 205;
        this.empGroup.y = 0;
        this.empGroup.add(this.empIcon);
        this.empGroup.add(this.empLabel);
        this.empGroup.add(this.emppriceLabel);
        this.empGroup.add(this.button);
        
        // Suoja tehoste
        this.shieldIcon = this.game.add.sprite(58, 15, 'shopshield');
        this.shieldIcon.scale.setTo(0.35, 0.35);
        this.shieldLabel = this.game.add.text(50, 70, 'Shield', styleB);
        this.shieldpriceLabel = this.game.add.text(65, 110, '700', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.abSelected, this, 1, 0, 2);
        this.button.name = 'ability'+2;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.shieldGroup = this.game.add.group();
        this.abilitiesGroup.add(this.shieldGroup);
        this.shieldGroup.name = "Shield";
        this.shieldGroup.x = 400;
        this.shieldGroup.y = 0;
        this.shieldGroup.add(this.shieldIcon);
        this.shieldGroup.add(this.shieldLabel);
        this.shieldGroup.add(this.shieldpriceLabel);
        this.shieldGroup.add(this.button);
        
        // SF tehoste
        this.sfIcon = this.game.add.sprite(60, 15, 'ability_FireRateBoost');
        this.sfIcon.scale.setTo(0.5, 0.5);
        this.sfLabel = this.game.add.text(65, 70, 'SF', styleB);
        this.sfpriceLabel = this.game.add.text(60, 110, '900', styleB);
        this.button = this.game.add.button(0, 0, 'shopselect',this.abSelected, this, 1, 0, 2);
        this.button.name = 'ability'+3;
        this.button.alpha = 1.0;
        this.button.setFrames(1,0,2);
        this.button.scale.setTo(0.6, 0.58);
        this.sfGroup = this.game.add.group();
        this.abilitiesGroup.add(this.sfGroup);
        this.sfGroup.name = "FireRateBoost";
        this.sfGroup.x = 590;
        this.sfGroup.y = 0;
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

        // ajetaan ostettujen aseiden ja kykyjen tarkastus
        this.boughtCheck();

        },
        // ostettujen aseiden tarkastus
        boughtCheck: function(){
        for (i = 0; i < this.weaponsGroup.length; i++){
            for(var i = 0; i < this.availableWeapons.length;i++){
                if (this.availableWeapons[i] == this.weaponsGroup.getChildAt(i).name){
                    //console.log("Aseita ostettu: "+i);
                    //asetetaan ostetut aseet läpinäkyväksi
                    this.weaponsGroup.getChildAt(i).getChildAt(0).alpha = 0.5;
                    this.weaponsGroup.getChildAt(i).getChildAt(1).alpha = 0.5;
                    this.weaponsGroup.getChildAt(i).getChildAt(2).alpha = 0.5;
                    this.weaponsGroup.getChildAt(i).getChildAt(3).alpha = 0.5;
                    this.weaponsGroup.getChildAt(i).getChildAt(3).setFrames(2,2,2);

                }
            }
            // tarkistetaan onko pelaaja ostanut aseen

        }

        for (j = 0; j < this.abilitiesGroup.length; j++){
            // tarkistetaan onko pelaaja ostanut abilityn
            for(i = 0;i < this.availableAbilities.length;i++){
                if (this.availableAbilities[i] == this.abilitiesGroup.getChildAt(j).name){
                    //console.log("Kykyja ostettu: "+j);
                    //asetetaan ostetut kyvyt läpinäkyväksi
                    this.abilitiesGroup.getChildAt(j).getChildAt(0).alpha = 0.5;
                    this.abilitiesGroup.getChildAt(j).getChildAt(1).alpha = 0.5;
                    this.abilitiesGroup.getChildAt(j).getChildAt(2).alpha = 0.5;
                    this.abilitiesGroup.getChildAt(j).getChildAt(3).alpha = 0.5;
                    this.abilitiesGroup.getChildAt(j).getChildAt(3).setFrames(2,2,2);
                }
            }

        }
        },
        // kun ase valittu, selvitetään sen index arvo ja sijoitetaan se windex muuttujaan
        wepSelected: function(button){
            this.aindex = null;
            this.wep = button;
            var p = this.wep.name.replace( /^\D+/g, '');
            this.windex = parseInt(p);
            // vaihdetaan painikkeiden framet jos ei ostettu, jotta uusi valinta erottuu muista
            for (i = 0; i <= 3; i++){
                if (this.weaponsGroup.getChildAt(i).getChildAt(3).alpha == 1.0){
                this.weaponsGroup.getChildAt(i).getChildAt(3).setFrames(1,0,2);
                }
            } for (j = 0; j <= 3; j++){
                if (this.abilitiesGroup.getChildAt(j).getChildAt(3).alpha == 1.0){
                this.abilitiesGroup.getChildAt(j).getChildAt(3).setFrames(1,0,2);
                }
            }
            this.weaponsGroup.getChildAt(p).getChildAt(3).setFrames(2,2,2);
            if (this.weaponsGroup.getChildAt(p).getChildAt(3).alpha == 0.5) {
                    this.weaponsGroup.getChildAt(p).getChildAt(3).setFrames(2,2,2);
                    this.windex = null;
                }
            console.log(this.windex);
        },
        // kun tehoste valittu, selvitetään sen index arvo ja sijoitetaan se aindex muuttujaan
        abSelected: function(button) {
            this.windex = null;
            this.ab = button;
            var p = this.ab.name.replace( /^\D+/g, '');
            this.aindex = parseInt(p);
            // vaihdetaan painikkeiden framet jos ei ostettu, jotta uusi valinta erottuu muista
            for (i = 0; i <= 3; i++){
                if (this.abilitiesGroup.getChildAt(i).getChildAt(3).alpha == 1.0){
                this.abilitiesGroup.getChildAt(i).getChildAt(3).setFrames(1,0,2);
                }
            } for (j = 0; j <= 3; j++){
                if (this.weaponsGroup.getChildAt(j).getChildAt(3).alpha == 1.0){
                this.weaponsGroup.getChildAt(j).getChildAt(3).setFrames(1,0,2);
                }
            }
            this.abilitiesGroup.getChildAt(p).getChildAt(3).setFrames(2,2,2);
            if (this.abilitiesGroup.getChildAt(p).getChildAt(3).alpha == 0.5) {
                    this.abilitiesGroup.getChildAt(p).getChildAt(3).setFrames(2,2,2);
                    this.aindex = null;
                }
            console.log(this.aindex);
        },
        
        // osto-painikkeen toiminto
        purchase: function() {
             var i = this.windex;
             var j = this.aindex;
                if (i == 2) {
                 if (this.playerData.playerData.money >= 200){
                    this.playerData.playerData.money -= 200;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    this.playerData.shipData[i] = 1;
                    console.log("Weapon "+i+" bought.");
                    this.windex = null;
                    }
             } else if (i == 1) {
                 if (this.playerData.playerData.money >= 600) {
                    console.log("Weapon "+i+" bought.");
                    this.playerData.playerData.money -= 600;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    this.playerData.shipData[i] = 1;
                    this.windex = null;
                 }
             } else if (i == 3){
                 if (this.playerData.playerData.money >= 1000) {
                    console.log("Weapon "+i+" bought.");
                    this.playerData.playerData.money -= 1000;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    this.playerData.shipData[i] = 1;
                    this.windex = null;
                 }
             } else if (j == 0) {
                 if (this.playerData.playerData.money >= 250) {
                    this.playerData.playerData.money -= 250;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    console.log("Ability "+j+" bought.");
                    this.playerData.shipData[j+10] = 1;
                    this.aindex = null;
                 }
             } else if (j == 1) {
                 if (this.playerData.playerData.money >= 450) {
                    this.playerData.playerData.money -= 450;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    console.log("Ability "+j+" bought.");
                    this.playerData.shipData[j+10] = 1;
                    this.aindex = null;
                 }
             } else if (j == 2) {
                 if (this.playerData.playerData.money >= 700) {
                    this.playerData.playerData.money -= 700;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    console.log("Ability "+j+" bought.");
                    this.playerData.shipData[j+10] = 1;
                    this.aindex = null;
                 }
             } else if (j == 3) {
                 if (this.playerData.playerData.money >= 900) {
                    this.playerData.playerData.money -= 900;
                    this.surroundings.menuheader.getChildAt(2).text = "Money: "+this.playerData.playerData.money;
                    console.log("Ability "+j+" bought.");
                    this.playerData.shipData[j+10] = 1;
                    this.aindex = null;
                 }
             }
            // päivitetään ostetut aseet/kyvyt jotta grafiikka vaihtuu heti ostettaessa
            console.log(this.windex+" & "+this.aindex);
            for(var i = 0; i <= SET_GUNS-1; i++){
                this.availableWeapons[i] = this.playerData.shipData[i];
            }
            for(var i = 10; i <= 10+SET_ABILITIES-1; i++){
            this.availableAbilities[i-10] = this.playerData.shipData[i];
            }
            this.boughtCheck();
            // lähetetään oston tiedot php-tiedostoon
            var thingBought = $.ajax({
                        method:"POST",
                        url:"PHP/SQLcontroller/updateData.php",
                        data:{
                            usage:3,
                            location:window.location.href,
                            loginFollowID: this.playerData.loginFollowID,
                            playerName:this.playerData.playerData.playerName,
                            money:this.playerData.playerData.money,
                            shipData:this.playerData.shipData
                        }
                    });
            thingBought.done(function(returnValue){
                        alert("Purchase completed successfully");
                    });
            thingBought.fail(function(returndata){
                        alert("Couldn't finish the purchase, database unreachable");
                    });
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