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
        
        this.thingsGroup = this.game.add.group();
        this.am = false;
        this.im = false;
        
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
        this.wepslot1 = this.game.add.button(450, 250, 'slot', this.selectWeapon,this);
        this.wepslot2 = this.game.add.button(600, 250, 'slot', this.selectWeapon,this);
        this.wepslot3 = this.game.add.button(750, 250, 'slot', this.selectWeapon,this);
        
        this.buttonGroup.add(this.wepslot1);
        this.buttonGroup.add(this.wepslot2);
        this.buttonGroup.add(this.wepslot3);
        
        // ability slots / tehosteiden paikat
        this.abslot1 = this.game.add.button(450, 600, 'slot', this.selectAbility,this);
        this.abslot2 = this.game.add.button(600, 600, 'slot', this.selectAbility,this);
        this.abslot3 = this.game.add.button(750, 600, 'slot', this.selectAbility,this);
        
        this.buttonGroup.add(this.abslot1);
        this.buttonGroup.add(this.abslot2);
        this.buttonGroup.add(this.abslot3);

        
    },
    
    selectWeapon: function(){
        console.log('Selecting weapon');
        
        this.x = 905;
        this.y = 205; 
        if (this.am == false){
            this.sweapon = this.game.add.sprite(900, 200, 'availableTray');
            this.thingsGroup.add(this.sweapon);
            for ( var i = 0; i <= 3; i++){
                if (this.playerData.shipData[i] == 1){
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    console.log(i);
                    this.thingsGroup.add(this.game.add.button(this.x, this.y, 'weapon1'));
                    this.x += 92.5;
                } else {
                    console.log(i);
                }
            }
            
            this.am = true;
        } else {
            this.thingsGroup.removeAll();
            this.am = false;
        }
        
    },
    
    selectAbility: function(){
        console.log('Selecting ability');
          this.x = 905;
        this.y = 405; 
        if (this.im == false){
            this.sweapon = this.game.add.sprite(900, 400, 'availableTray');
            this.thingsGroup.add(this.sweapon);
            for ( var i = 4; i <= 7; i++){
                if (this.playerData.shipData[i] == 1){
                    if(this.x > 905 + (92.5 * 2)){
                        this.y += 95;
                        this.x = 905;
                    }
                    console.log(i);
                    this.thingsGroup.add(this.game.add.button(this.x, this.y, 'ability1'));
                    this.x += 92.5;
                } else {
                    console.log(i);
                }
            }
            
            this.im = true;
        } else {
            this.thingsGroup.removeAll();
            this.im = false;
        }
    },
    
    gameStart: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    
    },
 
    back:function(){
        
        this.thingsGroup.removeAll();
        // palataan takaisin päävalikkoon
        this.game.state.start('mainMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );

    }
}