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
        this.x = 450;
        this.ax = 450;
        
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
        for (var i = 0; i <= 2; i++){
        this.button = this.game.add.button(this.x, 250, 'slot', this.selectWeapon,this);
        this.button.name = 'wepslot' + i;
        this.buttonGroup.add(this.button);
        this.x += 150;
        }
        
        
        // ability slots / tehosteiden paikat
        for (var i = 0; i <= 2; i++){
        this.button = this.game.add.button(this.ax, 600, 'slot', this.selectAbility,this);
        this.button.name = 'abslot' + i;
        this.buttonGroup.add(this.button);
        this.ax += 150;
        }
        
       
        

        
    },
    
    selectWeapon: function(button){
        console.log('Selecting weapon');
        this.prewep = button;
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
                    this.button = this.game.add.button(this.x, this.y, 'weapon1', this.weppressed, this);
                    this.button.name = 'weapon' + i;
                    this.thingsGroup.add(this.button);
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
    
    selectAbility: function(button){
        console.log('Selecting ability');
        this.preab = button;
    
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
                    this.button = this.game.add.button(this.x, this.y, 'ability1', this.abpressed, this);
                    this.button.name = 'ability' + i;
                    this.thingsGroup.add(this.button);
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
    
    weppressed: function(button){
        var p = button;
        var icon = this.game.add.sprite(3,3, p.key);
        this.prewep.addChild(icon);
        
     }, 
    
    abpressed: function(button){
        var p = button;
        var icon = this.game.add.sprite(3,3, p.key);
        this.preab.addChild(icon);
        
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