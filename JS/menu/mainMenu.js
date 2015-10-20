// tämä on päävalikko josta siirrytään sovelluksen eri osiin.
var mainMenu = function(game){

};

mainMenu.prototype = {
    
    init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
        
    },
    
    create: function(){
        var self = this;
        //do some murdering
        this.buttonGroup.removeAll();


        // tästä painikkeesta päästään peliin
        this.playButton = this.game.add.button(425, 100, 'menuButton', this.startGame, this, 1, 0, 2);
        var playLabel = this.game.add.text(150,50,"Play");
        this.playButton.addChild(playLabel);
        //tästä asetuksiin 
        this.settingsButton = this.game.add.button(425, 250, 'menuButton', this.settingsStart, this, 1, 0, 2);
        var settingsLabel = this.game.add.text(125,50,"Settings");
        this.settingsButton.addChild(settingsLabel);
        // tästä pistetaulukkoon
        this.scoresButton = this.game.add.button(425, 400, 'menuButton', this.scoresStart, this, 1, 0, 2);
        var scroreLabel = this.game.add.text(125,50,"High Scores");
        this.scoresButton.addChild(scroreLabel);
        // tästä kustomointi -valikkoon
        this.customButton = this.game.add.button(425, 550, 'menuButton', this.customStart, this, 1, 0, 2);
        var customLabel = this.game.add.text(125,50,"Customize");
        this.customButton.addChild(customLabel);

        this.buttonGroup.add(this.playButton);
        this.buttonGroup.add(this.settingsButton);
        this.buttonGroup.add(this.scoresButton);
        this.buttonGroup.add(this.customButton);
    },
    
    startGame: function(){
        // kutsutaan gameLoad -tilaa
        this.game.state.start('gameLoad');
    },
    settingsStart: function(){
        this.game.state.start('settings',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    scoresStart: function(){
        this.game.state.start('scores',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    },
    customStart: function(){
        this.game.state.start('custom',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    }

};

