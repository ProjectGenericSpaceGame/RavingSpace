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
        this.goButton = this.game.add.button(425, 200, 'buttonSprite', this.gameStart, this, 1, 0, 2);
        var goLabel = this.game.add.text(175,20,"Go!");
        this.goButton.addChild(goLabel);     
        
        var style = { font:'25px calibri', fill:'black'};
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",style);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);

        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.goButton);
       
        
    },
    
    gameStart: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    
    },
 
    back:function(){
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