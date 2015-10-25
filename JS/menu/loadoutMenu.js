// tästä valitaan aseet ja tehosteet mukaan

var loadoutMenu = function(game){
   
};

loadoutMenu.prototype = {
    
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
        
        thingsGroup = this.game.add.group();
        am = false;
        
        this.surroundings.menuLabel.text = 'Loadout';
        var style = { font:'25px calibri', fill:'black'};
        this.goButton = this.game.add.button(975, 680, 'buttonSprite', this.gameStart, this, 1, 0, 2);
        this.goButton.scale.setTo(0.3, 0.9);
        var goLabel = this.game.add.text(120,20,"Go!");
        this.goButton.addChild(goLabel);
        this.goButton.getChildAt(0).scale.setTo(3, 1);
        
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20, 'Back',style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.goButton);
       
        // weapon slots/ aseitten paikat
        this.wepslot1 = this.game.add.button(450, 250, 'slot', this.selectWeapon);
        this.wepslot2 = this.game.add.button(600, 250, 'slot', this.selectWeapon);
        this.wepslot3 = this.game.add.button(750, 250, 'slot', this.selectWeapon);
        
        this.buttonGroup.add(this.wepslot1);
        this.buttonGroup.add(this.wepslot2);
        this.buttonGroup.add(this.wepslot3);
        
        // ability slots / tehosteiden paikat
        this.abslot1 = this.game.add.button(450, 600, 'slot', this.selectAbility);
        this.abslot2 = this.game.add.button(600, 600, 'slot', this.selectAbility);
        this.abslot3 = this.game.add.button(750, 600, 'slot', this.selectAbility);
        
        this.buttonGroup.add(this.abslot1);
        this.buttonGroup.add(this.abslot2);
        this.buttonGroup.add(this.abslot3);

        
    },
    
    selectWeapon: function(){
        console.log('Selecting weapon');
        if (am === false){
            this.sweapon = this.game.add.sprite(900, 200, 'availableTray');
            thingsGroup.add(this.sweapon);
            am = true;
        } else {
            this.sweapon.kill();
            am = false;
        }
    },
    
    selectAbility: function(){
        console.log('Selecting ability');
        
    },
    
    gameStart: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    
    },
 
    back:function(){
        
        thingsGroup.removeAll();
        // palataan takaisin päävalikkoon
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
       thingsGroup.removeAll();
    }
}