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

        //otsikko
        this.surroundings.menuLabel.text = "Main Menu";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);

        // tästä painikkeesta päästään peliin
        this.playButton = this.game.add.button(425, 200, 'buttonSprite', this.loadoutStart, this, 1, 0, 2);
        var playLabel = this.game.add.text(175,20,"Play");
        this.playButton.addChild(playLabel);
        //tästä asetuksiin 
        this.settingsButton = this.game.add.button(425, 300, 'buttonSprite', this.settingsStart, this, 1, 0, 2);
        var settingsLabel = this.game.add.text(150,20,"Settings");
        this.settingsButton.addChild(settingsLabel);
        // tästä pistetaulukkoon
        this.scoresButton = this.game.add.button(425, 400, 'buttonSprite', this.scoresStart, this, 1, 0, 2);
        var scroreLabel = this.game.add.text(125,20,"High Scores");
        this.scoresButton.addChild(scroreLabel);
        // tästä kustomointi -valikkoon
        this.customButton = this.game.add.button(425, 500, 'buttonSprite', this.customStart, this, 1, 0, 2);
        var customLabel = this.game.add.text(140,20,"Customize");
        this.customButton.addChild(customLabel);

        this.buttonGroup.add(this.playButton);
        this.buttonGroup.add(this.settingsButton);
        this.buttonGroup.add(this.scoresButton);
        this.buttonGroup.add(this.customButton);
    },
    
    loadoutStart: function(){
        // kutsutaan loadout -tilaa
        this.game.state.start('loadoutMenu',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
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

